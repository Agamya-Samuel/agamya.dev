import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import {
	HiOutlineEye,
	HiOutlineClipboard,
	HiOutlineExternalLink,
	HiOutlineCursorClick,
} from 'react-icons/hi';

const TOKEN_KEY = 'dashboardToken';

const ActionIcon = ({ type }) => {
	switch (type) {
		case 'view':
			return <HiOutlineEye className="text-blue-400" />;
		case 'copy':
			return <HiOutlineClipboard className="text-green-400" />;
		case 'visit':
			return <HiOutlineExternalLink className="text-purple-400" />;
		case 'click':
			return <HiOutlineCursorClick className="text-yellow-400" />;
		default:
			return null;
	}
};

const AnalyticsCard = ({ path, actions, totalInteractions }) => {
	const getActionCount = (type) => {
		const action = actions.find((a) => a.type === type);
		return action ? action.count : 0;
	};

	const getLastUsed = () => {
		const timestamps = actions.map((a) => new Date(a.lastUsed));
		return new Date(Math.max(...timestamps));
	};

	return (
		<motion.div
			variants={fadeIn('up', 'spring', 0.3, 0.75)}
			className="bg-black-100 p-6 rounded-2xl"
		>
			<div className="flex flex-col gap-4">
				<div>
					<h3 className="text-white font-bold text-[20px]">
						/{path}
					</h3>
					<p className="text-secondary text-sm">
						Last used: {getLastUsed().toLocaleString()}
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center gap-2">
						<ActionIcon type="view" />
						<span className="text-white">
							{getActionCount('view')} views
						</span>
					</div>
					<div className="flex items-center gap-2">
						<ActionIcon type="click" />
						<span className="text-white">
							{getActionCount('click')} clicks
						</span>
					</div>
					<div className="flex items-center gap-2">
						<ActionIcon type="copy" />
						<span className="text-white">
							{getActionCount('copy')} copies
						</span>
					</div>
					<div className="flex items-center gap-2">
						<ActionIcon type="visit" />
						<span className="text-white">
							{getActionCount('visit')} visits
						</span>
					</div>
				</div>

				<div className="mt-2 pt-4 border-t border-white/10">
					<div className="flex justify-between items-center">
						<span className="text-secondary">
							Total Interactions
						</span>
						<span className="text-white font-bold">
							{totalInteractions}
						</span>
					</div>
					<div className="mt-2 bg-tertiary rounded-full h-2">
						<div
							className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
							style={{
								width: `${Math.min(
									(totalInteractions / 100) * 100,
									100
								)}%`,
							}}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const AnalyticsDashboard = () => {
	const {
		data: analytics,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['analytics'],
		queryFn: async () => {
			const response = await fetch('/api/dashboard/analytics', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch analytics');
			}

			return response.json();
		},
	});

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-primary">
				<div className="text-white text-xl">Loading analytics...</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-primary">
				<div className="text-red-500 text-xl">
					Error loading analytics
				</div>
			</div>
		);
	}

	const totalRedirects = analytics.reduce(
		(sum, item) => sum + item.totalInteractions,
		0
	);

	return (
		<div className="min-h-screen bg-primary p-8">
			<div className="max-w-7xl mx-auto">
				<motion.div variants={fadeIn('down', 'spring', 0.1, 0.75)}>
					<h2 className={styles.sectionHeadText}>
						Analytics Dashboard
					</h2>
					<div className="flex justify-between items-end">
						<p className={`${styles.sectionSubText} mt-4`}>
							Track and analyze your redirect links usage
						</p>
						<div className="text-right">
							<p className="text-white text-2xl font-bold">
								{totalRedirects}
							</p>
							<p className="text-secondary">Total Interactions</p>
						</div>
					</div>
				</motion.div>

				<div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{analytics.map((item) => (
						<AnalyticsCard
							key={item._id}
							path={item._id}
							actions={item.actions}
							totalInteractions={item.totalInteractions}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AnalyticsDashboard;
