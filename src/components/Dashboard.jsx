import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import { HiMail, HiX } from 'react-icons/hi';
import { LuLoaderCircle } from 'react-icons/lu';

const TOKEN_KEY = 'dashboardToken';

const EmailDialog = ({ isOpen, onClose, recipient, recipientName, onSend }) => {
	const [subject, setSubject] = useState(
		`Re: Website Contact Form - ${recipientName}`
	);
	const [message, setMessage] = useState(
		`Dear ${recipientName},\n\nThank you for your message. `
	);
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');

	if (!isOpen) return null;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSending(true);
		setError('');

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				},
				body: JSON.stringify({
					to: recipient,
					subject,
					message,
				}),
			});

			const data = await response.json();
			if (data.success) {
				onClose();
			} else {
				setError(data.error || 'Failed to send email');
			}
		} catch (err) {
			setError('Failed to send email. Please try again.');
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="bg-black-100 p-6 rounded-2xl w-full max-w-2xl relative"
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-secondary hover:text-white"
				>
					<HiX className="text-2xl" />
				</button>

				<h3 className="text-white text-xl font-bold mb-4">
					Compose Email
				</h3>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label className="text-secondary mb-2 block">To:</label>
						<input
							type="text"
							value={recipient}
							disabled
							className="w-full bg-tertiary py-3 px-4 rounded text-white opacity-75"
						/>
					</div>

					<div>
						<label className="text-secondary mb-2 block">
							Subject:
						</label>
						<input
							type="text"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							className="w-full bg-tertiary py-3 px-4 rounded text-white"
							required
						/>
					</div>

					<div>
						<label className="text-secondary mb-2 block">
							Message:
						</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							rows={6}
							className="w-full bg-tertiary py-3 px-4 rounded text-white resize-none"
							required
						/>
					</div>

					<div className="flex justify-end gap-4 mt-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-600 py-2 px-6 rounded text-white hover:bg-gray-700"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSending}
							className="bg-tertiary py-2 px-6 rounded text-white hover:bg-tertiary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
						>
							{isSending ? (
								<>
									<span className="animate-spin">
										<LuLoaderCircle className="text-lg" />
									</span>
									Sending...
								</>
							) : (
								<>
									<HiMail className="text-lg" />
									Send Email
								</>
							)}
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

const Dashboard = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const token = localStorage.getItem(TOKEN_KEY);
		return !!token;
	});
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [serverStatus, setServerStatus] = useState('checking');
	const [emailDialog, setEmailDialog] = useState({
		isOpen: false,
		recipient: '',
		recipientName: '',
	});

	useEffect(() => {
		fetch('/api/health')
			.then((response) => response.json())
			.then(() => {
				setServerStatus('online');
			})
			.catch((error) => {
				setServerStatus('offline');
				setError('Cannot connect to server. Please try again later.');
			});
	}, []);

	const {
		data: submissions,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['submissions'],
		queryFn: async () => {
			const token = localStorage.getItem(TOKEN_KEY);
			if (!token) {
				throw new Error('No authentication token found');
			}

			const response = await fetch('/api/dashboard', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 401 || response.status === 403) {
				localStorage.removeItem(TOKEN_KEY);
				setIsAuthenticated(false);
				throw new Error('Authentication token expired');
			}

			if (!response.ok) {
				throw new Error('Failed to fetch submissions');
			}

			return response.json();
		},
		enabled: isAuthenticated,
		retry: false,
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');

		if (serverStatus !== 'online') {
			setError('Server is not accessible. Please try again later.');
			return;
		}

		try {
			const response = await fetch('/api/dashboard/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password }),
			});

			const data = await response.json();

			if (data.success && data.token) {
				localStorage.setItem(TOKEN_KEY, data.token);
				setIsAuthenticated(true);
				setError('');
				setPassword('');
				refetch();
			} else {
				setError(data.error || 'Invalid password');
			}
		} catch (error) {
			setError('Failed to authenticate. Please try again.');
		}
	};

	const handleLogout = () => {
		localStorage.removeItem(TOKEN_KEY);
		setIsAuthenticated(false);
		setPassword('');
	};

	const handleSendEmail = (email, name) => {
		setEmailDialog({
			isOpen: true,
			recipient: email,
			recipientName: name,
		});
	};

	const handleCloseEmailDialog = () => {
		setEmailDialog({ isOpen: false, recipient: '', recipientName: '' });
	};

	if (serverStatus === 'checking') {
		return (
			<div className="min-h-screen flex items-center justify-center bg-primary">
				<div className="text-white text-xl">
					Checking server status...
				</div>
			</div>
		);
	}

	if (serverStatus === 'offline') {
		return (
			<div className="min-h-screen flex items-center justify-center bg-primary">
				<div className="text-red-500 text-xl">
					Server is not accessible
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-primary">
				<motion.div
					variants={fadeIn('up', 'spring', 0.3, 0.75)}
					className="bg-black-100 p-8 rounded-2xl sm:w-[360px] w-full"
				>
					<h2 className={styles.sectionHeadText}>Dashboard Login</h2>
					<form
						onSubmit={handleLogin}
						className="mt-8 flex flex-col gap-4"
					>
						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
								{error}
							</div>
						)}
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter access code"
							className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
							required
						/>
						<button
							type="submit"
							className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-tertiary/80"
						>
							Access Dashboard
						</button>
					</form>
				</motion.div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-primary">
				<div className="text-white text-xl">Loading submissions...</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-primary">
				<div className="text-red-500 text-xl">
					Error loading submissions
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-screen bg-primary p-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-center mb-8">
						<h2 className={styles.sectionHeadText}>
							Contact Form Submissions
						</h2>
						<button
							onClick={handleLogout}
							className="bg-red-500 py-2 px-4 rounded text-white hover:bg-red-600"
						>
							Logout
						</button>
					</div>

					{submissions?.length === 0 ? (
						<motion.div
							variants={fadeIn('up', 'spring', 0.3, 0.75)}
							className="bg-black-100 p-8 rounded-2xl text-center"
						>
							<p className="text-white text-xl">
								No submissions yet
							</p>
							<p className="text-secondary mt-2">
								When users fill out the contact form, their
								messages will appear here.
							</p>
						</motion.div>
					) : (
						<div className="grid gap-6">
							{submissions?.map((submission) => (
								<motion.div
									key={submission._id}
									variants={fadeIn('up', 'spring', 0.3, 0.75)}
									className="bg-black-100 p-6 rounded-2xl"
								>
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-white font-bold text-[24px]">
												{submission.name}
											</h3>
											<div className="flex items-center gap-4">
												<p className="text-secondary">
													{submission.email}
												</p>
												<button
													onClick={() =>
														handleSendEmail(
															submission.email,
															submission.name
														)
													}
													className="flex items-center gap-2 bg-tertiary py-2 px-4 rounded text-white hover:bg-tertiary/80 transition-colors"
												>
													<HiMail className="text-lg" />
													Send Email
												</button>
											</div>
										</div>
										<p className="text-secondary text-sm">
											{new Date(
												submission.createdAt
											).toLocaleString()}
										</p>
									</div>
									<p className="mt-4 text-secondary">
										{submission.message}
									</p>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</div>

			<EmailDialog
				isOpen={emailDialog.isOpen}
				onClose={handleCloseEmailDialog}
				recipient={emailDialog.recipient}
				recipientName={emailDialog.recipientName}
			/>
		</>
	);
};

export default Dashboard;
