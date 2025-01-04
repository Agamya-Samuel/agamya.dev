import express from 'express';
import cors from 'cors';
import { connectToDB, Contact, Analytics } from '../src/lib/mongodb.js';
import { getEmailTemplate } from '../src/utils/emailTemplates.js';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({
	path: path.resolve(__dirname, '../.env')
});

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'RESEND_API_KEY', 'PORT', 'FROM_EMAIL', 'FROM_NAME', 'DASHBOARD_PASSWORD', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`Missing required environment variable: ${envVar}`);
		process.exit(1);
	}
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
	origin: process.env.NODE_ENV === 'production'
		? 'https://agamya.dev'
		: ['http://localhost:5173', 'http://localhost:3000'],
	credentials: true
}));
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Authentication middleware
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ success: false, error: 'Access token required' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ success: false, error: 'Invalid token' });
		}
		req.user = user;
		next();
	});
};

// Dashboard login endpoint
app.post('/api/dashboard/login', async (req, res) => {
	try {
		const { password } = req.body;

		if (!password) {
			return res.status(400).json({ success: false, error: 'Password is required' });
		}

		if (password !== process.env.DASHBOARD_PASSWORD) {
			return res.status(401).json({ success: false, error: 'Invalid password' });
		}

		const token = jwt.sign({ authorized: true }, process.env.JWT_SECRET, { expiresIn: '24h' });
		res.json({ success: true, token });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ success: false, error: 'Authentication failed' });
	}
});

// Get submissions endpoint
app.get('/api/dashboard', authenticateToken, async (req, res) => {
	try {
		await connectToDB();
		const submissions = await Contact.find().sort({ createdAt: -1 });
		res.json(submissions);
	} catch (error) {
		console.error('Error fetching submissions:', error);
		res.status(500).json({ success: false, error: 'Failed to fetch submissions' });
	}
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
	try {
		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			return res.status(400).json({
				success: false,
				error: 'Name, email, and message are required'
			});
		}

		await connectToDB();
		const newContact = await Contact.create({ name, email, message });

		try {
			await resend.emails.send({
				from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
				to: email,
				subject: `Thank you for contacting me, ${name}!`,
				html: getEmailTemplate('user-confirmation.html', { name, message }),
			});
		} catch (emailError) {
			console.error('Error sending confirmation email:', emailError);
		}

		res.status(200).json({
			success: true,
			message: 'Message sent successfully',
			contactId: newContact._id
		});
	} catch (error) {
		console.error('Error processing contact form:', error);

		if (error.name === 'ValidationError') {
			return res.status(400).json({
				success: false,
				error: 'Invalid input data',
				details: error.message
			});
		}

		if (error.name === 'MongoError' || error.name === 'MongoServerError') {
			return res.status(500).json({
				success: false,
				error: 'Database error occurred',
				details: process.env.NODE_ENV === 'development' ? error.message : undefined
			});
		}

		res.status(500).json({
			success: false,
			error: 'An unexpected error occurred',
			details: process.env.NODE_ENV === 'development' ? error.message : undefined
		});
	}
});

// Send email endpoint
app.post('/api/send-email', authenticateToken, async (req, res) => {
	try {
		const { to, subject, message } = req.body;

		if (!to || !subject || !message) {
			return res.status(400).json({
				success: false,
				error: 'Email, subject, and message are required'
			});
		}

		const emailResponse = await resend.emails.send({
			from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
			to: to,
			subject: subject,
			text: message,
		});

		res.json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to send email',
			details: process.env.NODE_ENV === 'development' ? error.message : undefined
		});
	}
});

// Debug route to check if server is running
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error('Unhandled error:', err);
	res.status(500).json({
		success: false,
		error: 'An unexpected error occurred'
	});
});

// Analytics endpoint
app.post('/api/analytics/redirect', async (req, res) => {
	try {
		const { path, destinationUrl, type, timestamp, referrer, userAgent } = req.body;
		const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

		await connectToDB();
		await Analytics.create({
			path,
			destinationUrl,
			type,
			timestamp: new Date(timestamp),
			referrer,
			userAgent,
			ip
		});

		res.json({ success: true });
	} catch (error) {
		console.error('Error tracking analytics:', error);
		res.status(500).json({ success: false, error: 'Failed to track analytics' });
	}
});

// Add analytics to dashboard endpoint
app.get('/api/dashboard/analytics', authenticateToken, async (req, res) => {
	try {
		await connectToDB();

		// Get analytics summary
		const analytics = await Analytics.aggregate([
			{
				$group: {
					_id: {
						path: '$path',
						type: '$type'
					},
					count: { $sum: 1 },
					lastUsed: { $max: '$timestamp' }
				}
			},
			{
				$group: {
					_id: '$_id.path',
					actions: {
						$push: {
							type: '$_id.type',
							count: '$count',
							lastUsed: '$lastUsed'
						}
					},
					totalInteractions: { $sum: '$count' }
				}
			},
			{ $sort: { totalInteractions: -1 } }
		]);

		res.json(analytics);
	} catch (error) {
		console.error('Error fetching analytics:', error);
		res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
	}
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log('Environment:', process.env.NODE_ENV || 'development');
	console.log('Available endpoints:');
	console.log('- POST /api/contact');
	console.log('- POST /api/dashboard/login');
	console.log('- GET /api/dashboard');
	console.log('- GET /api/health');
}); 