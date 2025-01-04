import express from 'express';
import cors from 'cors';
import { connectToDB, Contact } from '../src/lib/mongodb.js';
import { getEmailTemplate } from '../src/utils/emailTemplates.js';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({
	path: path.resolve(__dirname, '../.env')
});

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'RESEND_API_KEY', 'PORT', 'FROM_EMAIL', 'FROM_NAME'];
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

// Contact form endpoint
app.post('/contact', async (req, res) => {
	try {
		const { name, email, message } = req.body;

		// Validate input
		if (!name || !email || !message) {
			return res.status(400).json({
				success: false,
				error: 'Name, email, and message are required'
			});
		}

		// Connect to MongoDB
		await connectToDB();
		console.log('Connected to MongoDB successfully');

		// Save to MongoDB
		const newContact = await Contact.create({
			name,
			email,
			message,
		});
		console.log('Contact saved to MongoDB:', newContact._id);

		try {
			// Send confirmation email to user
			const emailResponse = await resend.emails.send({
				from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
				to: email,
				subject: `Thank you for contacting me, ${name}!`,
				html: getEmailTemplate('user-confirmation.html', {
					name,
					message,
				}),
			});
			console.log('Email sent successfully:', emailResponse);
		} catch (emailError) {
			console.error('Error sending email:', emailError);
			// Don't fail the request if email fails, just log it
		}

		res.status(200).json({
			success: true,
			message: 'Message sent successfully',
			contactId: newContact._id
		});
	} catch (error) {
		console.error('Error processing contact form:', error);

		// Send appropriate error message based on error type
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

// Error handling middleware
app.use((err, req, res, next) => {
	console.error('Unhandled error:', err);
	res.status(500).json({
		success: false,
		error: 'An unexpected error occurred'
	});
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log('Environment:', process.env.NODE_ENV || 'development');
}); 