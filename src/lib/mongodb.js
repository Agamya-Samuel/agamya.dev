import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	if (isConnected) return;

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		isConnected = true;
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw error;
	}
};

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true,
		minLength: [2, 'Name must be at least 2 characters long'],
		maxLength: [50, 'Name cannot be more than 50 characters long']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		trim: true,
		match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
	},
	message: {
		type: String,
		required: [true, 'Message is required'],
		trim: true,
		minLength: [10, 'Message must be at least 10 characters long'],
		maxLength: [1000, 'Message cannot be more than 1000 characters long']
	}
}, {
	timestamps: true
});

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema); 