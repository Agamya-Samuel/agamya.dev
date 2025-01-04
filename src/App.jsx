import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

import {
	About,
	Contact,
	Experience,
	Feedbacks,
	Hero,
	Navbar,
	Tech,
	StarsCanvas,
	Projects,
	WorkExperience,
} from './components';

const App = () => {
	useEffect(() => {
		// Handle initial load and hash changes
		const handleScroll = () => {
			const hash = window.location.hash;
			if (hash) {
				const element = document.getElementById(hash.slice(1));
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}
		};

		// Handle the initial load
		handleScroll();

		// Listen for hash changes
		window.addEventListener('hashchange', handleScroll);

		// Cleanup
		return () => window.removeEventListener('hashchange', handleScroll);
	}, []);

	return (
		<BrowserRouter>
			<div className="relative z-0 bg-primary">
				<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
					<Navbar />
					<Hero />
				</div>
				<About />
				<Experience />
				{/* <Tech /> */}
				{/* <WorkExperience /> */}
				<Projects />
				{/* <Feedbacks /> */}
				<div className="relative z-0">
					<Contact />
					<StarsCanvas />
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
