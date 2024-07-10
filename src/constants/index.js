import {
	backend,
	creator,
	web,
	javascript,
	typescript,
	html,
	css,
	reactjs,
	redux,
	tailwind,
	nodejs,
	mongodb,
	git,
	figma,
	docker,
	meta,
	starbucks,
	tesla,
	shopify,
	amazonia,
	zoomify,
	threejs,
	nextjs,
	snapnexus,
	photofusion,
	trackmydeals,
} from '../assets';

export const navLinks = [
	{
		id: 'about',
		title: 'About',
	},
	{
		id: 'work',
		title: 'Work',
	},
	{
		id: 'contact',
		title: 'Contact',
	},
];

const services = [
	{
		title: 'Web Developer',
		icon: web,
	},
	// {
	// 	title: 'React Native Developer',
	// 	icon: mobile,
	// },
	{
		title: 'Backend Developer',
		icon: backend,
	},
	{
		title: 'Content Creator',
		icon: creator,
	},
];

const technologies = [
	{
		name: 'HTML 5',
		icon: html,
	},
	{
		name: 'CSS 3',
		icon: css,
	},
	{
		name: 'JavaScript',
		icon: javascript,
	},
	{
		name: 'TypeScript',
		icon: typescript,
	},
	{
		name: 'NextJS',
		icon: nextjs,
	},
	{
		name: 'React JS',
		icon: reactjs,
	},
	{
		name: 'Redux Toolkit',
		icon: redux,
	},
	{
		name: 'Tailwind CSS',
		icon: tailwind,
	},
	{
		name: 'Node JS',
		icon: nodejs,
	},
	{
		name: 'MongoDB',
		icon: mongodb,
	},
	{
		name: 'Three JS',
		icon: threejs,
	},
	{
		name: 'git',
		icon: git,
	},
	{
		name: 'figma',
		icon: figma,
	},
	{
		name: 'docker',
		icon: docker,
	},
];

const experiences = [
	{
		title: 'React.js Developer',
		company_name: 'Starbucks',
		icon: starbucks,
		iconBg: '#383E56',
		date: 'March 2020 - April 2021',
		points: [
			'Developing and maintaining web applications using React.js and other related technologies.',
			'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
			'Implementing responsive design and ensuring cross-browser compatibility.',
			'Participating in code reviews and providing constructive feedback to other developers.',
		],
	},
	{
		title: 'React Native Developer',
		company_name: 'Tesla',
		icon: tesla,
		iconBg: '#E6DEDD',
		date: 'Jan 2021 - Feb 2022',
		points: [
			'Developing and maintaining web applications using React.js and other related technologies.',
			'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
			'Implementing responsive design and ensuring cross-browser compatibility.',
			'Participating in code reviews and providing constructive feedback to other developers.',
		],
	},
	{
		title: 'Web Developer',
		company_name: 'Shopify',
		icon: shopify,
		iconBg: '#383E56',
		date: 'Jan 2022 - Jan 2023',
		points: [
			'Developing and maintaining web applications using React.js and other related technologies.',
			'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
			'Implementing responsive design and ensuring cross-browser compatibility.',
			'Participating in code reviews and providing constructive feedback to other developers.',
		],
	},
	{
		title: 'Full stack Developer',
		company_name: 'Meta',
		icon: meta,
		iconBg: '#E6DEDD',
		date: 'Jan 2023 - Present',
		points: [
			'Developing and maintaining web applications using React.js and other related technologies.',
			'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
			'Implementing responsive design and ensuring cross-browser compatibility.',
			'Participating in code reviews and providing constructive feedback to other developers.',
		],
	},
];

const testimonials = [
	{
		testimonial:
			'I thought it was impossible to make a website as beautiful as our product, but Agamya proved me wrong.',
		name: 'Sara Lee',
		designation: 'CFO',
		company: 'Acme Co',
		image: 'https://randomuser.me/api/portraits/women/4.jpg',
	},
	{
		testimonial:
			"I've never met a web developer who truly cares about their clients' success like Agamya does.",
		name: 'Chris Brown',
		designation: 'COO',
		company: 'DEF Corp',
		image: 'https://randomuser.me/api/portraits/men/5.jpg',
	},
	{
		testimonial:
			"After Agamya optimized our website, our traffic increased by 50%. We can't thank them enough!",
		name: 'Lisa Wang',
		designation: 'CTO',
		company: '456 Enterprises',
		image: 'https://randomuser.me/api/portraits/women/6.jpg',
	},
];

const projects = [
	{
		name: 'Amazonia - Ecommerce Platform',
		description:
			'Feature like: Viewing, searching, and filtering products, browsing by category, adding items to the cart, and making payments via PayPal, Stripe, or Cash on Delivery. The ADMIN Dashboard allows for updating inventory, managing orders, and overseeing user accounts efficiently, fully SEO Optimised.',
		tags: [
			{
				name: 'NextJS',
				color: 'blue-text-gradient',
			},
			{
				name: 'TypeScript',
				color: 'green-text-gradient',
			},
			{
				name: 'Tailwind CSS',
				color: 'pink-text-gradient',
			},
			{
				name: 'PostgreSQL',
				color: 'green-text-gradient',
			},
			{
				name: 'Drizzle ORM',
			},
			{
				name: 'Zod',
			},
		],
		image: amazonia,
		source_code_link:
			'https://github.com/Agamya-Samuel/Amazonia-Ecommerce-NextJS/',
		preview_link: 'https://amazonia.agamya.dev/',
	},
	{
		name: 'Zoomify - Video Conferencing',
		description:
			'Feature like: Creating New Meeting, Schedule Future Meetings, Past Meetings List, View Recorded Meetings, Personal Meeting Room, Join Meetings via Link, Secure Real-time Functionality, Responsive Design (both for Desktop and Mobile).',
		tags: [
			{
				name: 'NextJS',
				color: 'blue-text-gradient',
			},
			{
				name: 'Typescript',
				color: 'green-text-gradient',
			},
			{
				name: 'Tailwind CSS',
				color: 'pink-text-gradient',
			},
			{
				name: 'ShadCN',
			},
		],
		image: zoomify,
		source_code_link: 'https://github.com/Agamya-Samuel/Zoomify/',
		preview_link: 'https://zoomify.agamya.dev/',
	},
	{
		name: 'SnapNexus - Social Media',
		description:
			"Feature like: Viewing others' profiles, following or blocking users, adding stories, and managing posts by adding, deleting, or reposting them, Commenting and Liking post. Users can edit their profiles to customize their online presence.",
		tags: [
			{
				name: 'NextJS',
				color: 'blue-text-gradient',
			},
			{
				name: 'Typescript',
				color: 'green-text-gradient',
			},
			{
				name: 'Tailwind CSS',
				color: 'pink-text-gradient',
			},
			{
				name: 'MySQL',
				color: 'pink-text-gradient',
			},
			{
				name: 'Cloudinary',
				color: 'orange-text-gradient',
			},
			{
				name: 'Prisma ORM',
			},
			{
				name: 'Zod',
			},
		],
		image: snapnexus,
		source_code_link:
			'https://github.com/Agamya-Samuel/SnapNexus-SocialMediaApp-NextJS/',
		preview_link: 'https://snap-nexus.agamya.dev/',
	},
	{
		name: 'PhotoFusion - AI SaaS Platform',
		description:
			'Feature like: AI-based image manipulation app, offers powerful features such as image restoration, generative fill, object removal, and object recoloring. The homepage showcases recently edited images, and all functionalities are controlled by a Credits System. Users can purchase additional credits securely via Stripe.',
		tags: [
			{
				name: 'NextJS',
				color: 'blue-text-gradient',
			},
			{
				name: 'TypeScript',
				color: 'green-text-gradient',
			},
			{
				name: 'Tailwind CSS',
				color: 'pink-text-gradient',
			},
			{
				name: 'MongoDB',
				color: 'green-text-gradient',
			},
			{
				name: 'Stripe',
				color: 'purple-text-gradient',
			},
		],
		image: photofusion,
		source_code_link: 'https://github.com/Agamya-Samuel/PhotoFusion/',
		preview_link: 'https://photofusion-ai.agamya.dev/',
	},
	{
		name: 'TrackMyDeals - Price Tracker',
		description:
			'Feature like: Allowing users to track the price of Amazon products by entering the URL, Users can view current price, MRP, average price, and lowest price, and can submit their Email to get notified when the price drops.',
		tags: [
			{
				name: 'NextJS',
				color: 'blue-text-gradient',
			},
			{
				name: 'TypeScript',
				color: 'green-text-gradient',
			},
			{
				name: 'Tailwind CSS',
				color: 'pink-text-gradient',
			},
			{
				name: 'MongoDB',
				color: 'green-text-gradient',
			},
			{
				name: 'Cheerio',
				color: 'orange-text-gradient',
			},
			{
				name: 'Nodemailer',
				color: 'pink-text-gradient',
			},
			{
				name: 'BrightData Proxy ',
				color: 'blue-text-gradient',
			},
		],
		image: trackmydeals,
		source_code_link:
			'https://github.com/Agamya-Samuel/TrackMyDeals-NextJS/',
		preview_link: 'https://track-mydeals.agamya.dev/',
	},
];

export { services, technologies, experiences, testimonials, projects };
