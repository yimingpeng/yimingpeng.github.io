// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://yimingpeng.github.io',
	base: '/',
	output: 'static',

	build: {
		assets: 'assets'
	},

	vite: {
		plugins: [tailwindcss()],
		server: {
			watch: {
				// Ignore machine/tooling state dirs so background writes don't
				// trigger endless full-page reloads in `npm run dev`.
				ignored: ['**/.omc/**', '**/.claude/**', '**/.git/**']
			}
		}
	}
});
