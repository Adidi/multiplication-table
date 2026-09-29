import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Route, Router, Switch } from "wouter";
import { ScrollToTop } from "./components/scroll-to-top";
import { SiteHeader } from "./components/site-header";
import { LocaleProvider, useLocale } from "./lib/i18n";
import { ThemeProvider } from "./lib/theme";
import { Home } from "./pages/home";
import { MixPage } from "./pages/mix";
import { NotFound } from "./pages/not-found";
import { NumberPage } from "./pages/number";

// Vite's base path ("/multiplication-table/" on GitHub Pages, "/" in dev), without the trailing slash.
const ROUTER_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function Shell() {
  const { dir } = useLocale();
  return (
    <DirectionProvider direction={dir}>
      <Router base={ROUTER_BASE}>
        <ScrollToTop />
        <SiteHeader />
        <main className="flex flex-1 flex-col">
          <Switch>
            <Route path="/" component={Home} />
            {/* Keyed by number so prev/next remounts the page: fresh order, cards face up, deal-in replays */}
            <Route path="/number/:n">{(params) => <NumberPage key={params.n} />}</Route>
            <Route path="/mix" component={MixPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    </DirectionProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Shell />
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
