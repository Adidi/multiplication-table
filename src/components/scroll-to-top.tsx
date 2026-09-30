import { useEffect } from 'react';
import { useLocation } from 'wouter';

/** Smoothly scrolls the page to the top whenever the route changes. */
export function ScrollToTop() {
	const [location] = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [location]);

	return null;
}
