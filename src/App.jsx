import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
	About,
	Contact,
	Experience,
	Feedbacks,
	Hero,
	Navbar,
	Tech,
	Projects,
	WorkExperience,
	StarsCanvas,
} from './components';
import Dashboard from './components/Dashboard';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<div className="relative z-0 bg-primary">
								<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
									<Navbar />
									<Hero />
								</div>
								<About />
								<Experience />
								<Tech />
								<Projects />
								<WorkExperience />
								<Feedbacks />
								<div className="relative z-0">
									<Contact />
									<StarsCanvas />
								</div>
							</div>
						}
					/>
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
