import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import redirects from '../config/redirects.json';
import { HiExternalLink } from 'react-icons/hi';

const trackRedirectAction = async (path, url, action) => {
	try {
		await fetch('/api/analytics/redirect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				path,
				destinationUrl: url,
				type: action, // 'copy' or 'visit'
				timestamp: new Date().toISOString(),
				referrer: document.referrer,
				userAgent: navigator.userAgent,
			}),
		});
	} catch (error) {
		console.error('Failed to track redirect action:', error);
	}
};

const RedirectCard = ({ path, url }) => {
	const displayUrl = new URL(url).hostname;
	const fullPath = `${window.location.origin}/${path}`;

	const handleCopy = async () => {
		await navigator.clipboard.writeText(fullPath);
		trackRedirectAction(path, url, 'copy');
	};

	const handleVisit = () => {
		trackRedirectAction(path, url, 'visit');
	};

	return (
		<motion.div
			variants={fadeIn('up', 'spring', 0.3, 0.75)}
			className="bg-black-100 p-6 rounded-2xl"
		>
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<h3 className="text-white font-bold text-[20px] flex items-center gap-2">
						/{path}
						<button
							onClick={handleCopy}
							className="text-sm bg-tertiary px-2 py-1 rounded hover:bg-tertiary/80 transition-colors"
							title="Copy full URL"
						>
							Copy
						</button>
					</h3>
					<div className="flex items-center gap-4 mt-2">
						<p className="text-secondary">{displayUrl}</p>
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
							onClick={handleVisit}
						>
							<HiExternalLink className="text-lg" />
							Visit
						</a>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const RedirectList = () => {
	return (
		<div className="min-h-screen bg-primary p-8">
			<div className="max-w-7xl mx-auto">
				<motion.div variants={fadeIn('down', 'spring', 0.1, 0.75)}>
					<h2 className={styles.sectionHeadText}>
						Available Redirects
					</h2>
					<p className={`${styles.sectionSubText} mt-4`}>
						Quick links to various resources and services
					</p>
				</motion.div>

				<div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{redirects.redirects.map((redirect, index) => (
						<RedirectCard
							key={`${redirect.path}-${index}`}
							path={redirect.path}
							url={redirect.url}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default RedirectList;
