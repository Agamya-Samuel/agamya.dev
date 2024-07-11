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
	domagamyadev,
	gdg,
	wikimedia,
	courseList,
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
		id: 'projects',
		title: 'Projects',
	},
	{
		id: 'https://r.agamya.dev',
		title: 'Resume',
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
	{
		title: 'Database Administrator',
		icon: web,
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
		title: 'Technical Lead and Design Lead',
		company_name: 'Google Developer Group, Prayagraj',
		icon: gdg,
		iconBg: '#fff',
		date: 'August 2023 -',
		points: [
			'Letter of Appreciation from Mr. Ankit Kumar Verma, GDG Prayagraj Organizer, for Active Contributions to GDG.',
			'https://drive.google.com/file/d/1d3qfb_kVBLd2k9fYWp8OtwJOocI0bBec/view?usp=sharing',
			'Led the "Design and development of multiple community-driven projects" and managed a "Team of Developers and Designers", enhancing collaboration, engagement within the tech community, ensuring timely delivery of high-quality projects, and fostering a collaborative work environment.',
			'Organized and facilitated "Technical Hands-on Workshops, Hack-a-thons, and Quizzes", and hosted community events, meetups, and conferences - providing guidance, mentorship, and promoting a culture of learning, networking, knowledge sharing, and collaboration among tech enthusiasts.',
			'Collaborated with industry experts and speakers to curate and deliver impactful sessions during events, contributing to the growth and learning of community members.',
		],
	},
	{
		title: 'Open Source Contribution',
		company_name: 'Wikimedia (Wikipedia)',
		icon: wikimedia,
		iconBg: '#fff',
		date: 'July 2024 - Present',
		points: [
			'Actively Contributing to the development of Wikimedia projects, including MediaWiki, Wikidata, and other related technologies.',
			'Wiki Phabricator Account (to track Bugs and Tasks) -',
			'https://phabricator.wikimedia.org/p/Agamyasamuel',
			'Wiki Gerrit Account (to track Commits) -',
			'https://gerrit.wikimedia.org/r/q/owner:wikimedia@agamya.dev',
			'4+ Merged Patches - in 1 Week',
			'Part of "Trusted-Contributors" Group on Wiki Developer Circle.',
			'https://phabricator.wikimedia.org/project/view/3104/',
		],
	},
	// {
	// 	title: 'Web Developer',
	// 	company_name: 'Shopify',
	// 	icon: shopify,
	// 	iconBg: '#383E56',
	// 	date: 'Jan 2022 - Jan 2023',
	// 	points: [
	// 		'Developing and maintaining web applications using React.js and other related technologies.',
	// 		'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
	// 		'Implementing responsive design and ensuring cross-browser compatibility.',
	// 		'Participating in code reviews and providing constructive feedback to other developers.',
	// 	],
	// },
	// {
	// 	title: 'Full stack Developer',
	// 	company_name: 'Meta',
	// 	icon: meta,
	// 	iconBg: '#E6DEDD',
	// 	date: 'Jan 2023 - Present',
	// 	points: [
	// 		'Developing and maintaining web applications using React.js and other related technologies.',
	// 		'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
	// 		'Implementing responsive design and ensuring cross-browser compatibility.',
	// 		'Participating in code reviews and providing constructive feedback to other developers.',
	// 	],
	// },
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
	{
		name: 'Sub Domains I manage - Portfolio',
		description:
			'A List of all the Projects I have worked on. Small, Big, Medium, Personal, or Professional. All are listed here. You can view the live preview of the project. The source code is also available on GitHub.',
		tags: [
			{
				name: 'NextJS',
				color: 'blue-text-gradient',
			},
			{
				name: 'Tailwind CSS',
				color: 'pink-text-gradient',
			},
			{
				name: 'NextAPI Routes',
				color: 'green-text-gradient',
			},
			{
				name: 'Cloudflare',
				color: 'orange-text-gradient',
			},
		],
		image: domagamyadev,
		source_code_link: 'https://github.com/Agamya-Samuel/dom.agamya.dev/',
		preview_link: 'https://dom.agamya.dev/',
	},
	{
		name: 'Course Selling App',
		description:
			'My First Project in React. A simple course selling app where you can view the courses and buy them. JWT Auth is used for authentication. MongoDB is used for storing the data. The backend is made in NodeJS.',
		tags: [
			{
				name: 'ReactJS',
				color: 'blue-text-gradient',
			},
			{
				name: 'NodeJS',
				color: 'green-text-gradient',
			},
			{
				name: 'JWT Auth',
				color: 'pink-text-gradient',
			},
			{
				name: 'MongoDB',
				color: 'green-text-gradient',
			},
		],
		image: courseList,
		source_code_link:
			'https://github.com/Agamya-Samuel/course-selling-app-react',
		preview_link: 'https://course-selling.agamya.dev/',
	},
];

const workExperience = [
	{
		name: 'Wikimedia Open Source Contribution',
		description:
			'Feature like: Viewing, searching, and filtering products, browsing by category, adding items to the cart, and making payments via PayPal, Stripe, or Cash on Delivery. The ADMIN Dashboard allows for updating inventory, managing orders, and overseeing user accounts efficiently, fully SEO Optimised.',
		tags: [
			{
				name: 'OpenSource',
				color: 'pink-text-gradient',
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
];

export {
	services,
	technologies,
	experiences,
	testimonials,
	projects,
	workExperience,
};
