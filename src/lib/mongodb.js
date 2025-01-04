import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	if (isConnected) {
		console.log('MongoDB is already connected');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		isConnected = true;
		console.log('MongoDB connected');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
};

// Contact form schema
const ContactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
	},
	message: {
		type: String,
		required: [true, 'Message is required'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema); 