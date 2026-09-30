import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * GitHub Pages serves 404.html for unknown paths. Copying index.html there
 * lets deep links like /number/3 load the app instead of a 404 page.
 */
function spaFallback(): Plugin {
	let outDir = 'dist';
	return {
		name: 'spa-fallback-404',
		apply: 'build',
		configResolved(config) {
			outDir = config.build.outDir;
		},
		closeBundle() {
			copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`);
		}
	};
}

// https://vite.dev/config/
export default defineConfig({
	// Served from https://<user>.github.io/multiplication-table/
	base: '/multiplication-table/',
	resolve: {
		// "@/..." -> "src/..." (mirrored in tsconfig.app.json "paths")
		alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
	},
	plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss(), spaFallback()]
});
