// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://yimingpeng.github.io',
	base: '/',
	output: 'static',
	build: {
		assets: 'assets'
	}
});
