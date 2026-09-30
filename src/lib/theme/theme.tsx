import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '@/lib/theme/context';

const STORAGE_KEY = 'mt-theme';
const DEFAULT_THEME: Theme = 'dark';

function readStoredTheme(): Theme {
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === 'light' || v === 'dark') return v;
	} catch {
		// storage unavailable
	}
	return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(readStoredTheme);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	function setTheme(next: Theme) {
		setThemeState(next);
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// ignore
		}
	}

	return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}
