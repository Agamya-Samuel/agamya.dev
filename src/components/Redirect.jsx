import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import redirects from '../config/redirects.json';

const trackRedirect = async (path, url, type) => {
	try {
		await fetch('/api/analytics/redirect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				path,
				destinationUrl: url,
				type, // 'click' or 'view'
				timestamp: new Date().toISOString(),
				referrer: document.referrer,
				userAgent: navigator.userAgent,
			}),
		});
	} catch (error) {
		console.error('Failed to track redirect:', error);
	}
};

const Redirect = () => {
	const { path } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const redirect = redirects.redirects.find((r) => r.path === path);

		if (redirect) {
			// Track the view
			trackRedirect(path, redirect.url, 'view');

			// Track the click and redirect
			trackRedirect(path, redirect.url, 'click').then(() => {
				window.location.href = redirect.url;
			});
		} else {
			navigate('/');
		}
	}, [path, navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-primary">
			<div className="text-white text-xl">Redirecting...</div>
		</div>
	);
};

export default Redirect;
