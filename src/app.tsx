import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Route, Router, Switch } from 'wouter';
import { ChalkBackdrop } from '@/components/chalk-backdrop';
import { SiteHeader } from '@/components/site-header';
import { useScrollToTop } from '@/hooks';
import { LocaleProvider, useLocale } from '@/providers/i18n';
import { ThemeProvider } from '@/providers/theme';
import { Home } from '@/pages/home';
import { MixPage } from '@/pages/mix';
import { NotFound } from '@/pages/not-found';
import { NumberPage } from '@/pages/number';

// Vite's base path ("/multiplication-table/" on GitHub Pages, "/" in dev), without the trailing slash.
const ROUTER_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Header + routed pages. Lives inside the Router so route hooks work. */
function Shell() {
	useScrollToTop();
	return (
		<>
			<SiteHeader />
			<main className="flex flex-1 flex-col">
				<Switch>
					<Route path="/" component={Home} />
					{/* Keyed by number so prev/next remounts the page: fresh order, cards face up, deal-in replays */}
					<Route path="/number/:n">{params => <NumberPage key={params.n} />}</Route>
					<Route path="/mix" component={MixPage} />
					<Route component={NotFound} />
				</Switch>
			</main>
		</>
	);
}

/** Needs the locale, so it sits below LocaleProvider. */
function Frame() {
	const { dir } = useLocale();
	return (
		<DirectionProvider direction={dir}>
			<ChalkBackdrop />
			<Router base={ROUTER_BASE}>
				<Shell />
			</Router>
		</DirectionProvider>
	);
}

function App() {
	return (
		<ThemeProvider>
			<LocaleProvider>
				<Frame />
			</LocaleProvider>
		</ThemeProvider>
	);
}

export default App;
