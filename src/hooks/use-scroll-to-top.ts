import { useEffect } from 'react';
import { useLocation } from 'wouter';

/** Smoothly scrolls the window to the top whenever the route changes. Call it inside the Router. */
export function useScrollToTop() {
	const [location] = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [location]);
}
