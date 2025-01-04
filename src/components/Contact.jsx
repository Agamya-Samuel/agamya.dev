import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
	const formRef = useRef();
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const mutation = useMutation({
		mutationFn: async (formData) => {
			try {
				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				const data = await response.json();

				if (!data.success) {
					throw new Error(data.error || 'Failed to send message');
				}

				return data;
			} catch (error) {
				console.error('API Error:', error);
				throw error;
			}
		},
		onSuccess: () => {
			setSuccessMessage(
				'Thank you. I will get back to you as soon as possible.'
			);
			setErrorMessage('');
			setForm({
				name: '',
				email: '',
				message: '',
			});

			// Clear success message after 5 seconds
			setTimeout(() => {
				setSuccessMessage('');
			}, 5000);
		},
		onError: (error) => {
			console.error('Mutation Error:', error);
			setErrorMessage(
				error.message || 'Something went wrong. Please try again.'
			);
			setSuccessMessage('');

			// Clear error message after 5 seconds
			setTimeout(() => {
				setErrorMessage('');
			}, 5000);
		},
	});

	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		setSuccessMessage('');
		mutation.mutate(form);
	};

	return (
		<div
			className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
		>
			<motion.div
				variants={slideIn('left', 'tween', 0.2, 1)}
				className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
			>
				<p className={styles.sectionSubText}>Get in touch</p>
				<h3 className={styles.sectionHeadText}>Contact.</h3>

				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="mt-12 flex flex-col gap-8"
				>
					{errorMessage && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{errorMessage}
						</div>
					)}
					{successMessage && (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
							{successMessage}
						</div>
					)}
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">
							Your Name
						</span>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="What's your good name?"
							className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
							required
							minLength={2}
							maxLength={50}
						/>
					</label>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">
							Your email
						</span>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							placeholder="What's your email address?"
							className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
							required
						/>
					</label>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">
							Your Message
						</span>
						<textarea
							rows={7}
							name="message"
							value={form.message}
							onChange={handleChange}
							placeholder="What would you like to say?"
							className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
							required
							minLength={10}
							maxLength={1000}
						/>
					</label>

					<button
						type="submit"
						className={`bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition-all duration-300 ${
							mutation.isPending
								? 'opacity-50 cursor-not-allowed'
								: 'hover:bg-tertiary/80'
						}`}
						disabled={mutation.isPending}
					>
						{mutation.isPending ? 'Sending...' : 'Send'}
					</button>
				</form>
			</motion.div>

			<motion.div
				variants={slideIn('right', 'tween', 0.2, 1)}
				className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
			>
				<EarthCanvas />
			</motion.div>
		</div>
	);
};

export default SectionWrapper(Contact, 'contact');
