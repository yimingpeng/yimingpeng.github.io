import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { getWritingArticles } from '../lib/writing';

export const GET: APIRoute = async context => {
	const articles = await getWritingArticles();
	if (!context.site)
		throw new Error('Astro site URL is required to generate the writing RSS feed.');

	return rss({
		title: 'Yiming Peng Writing',
		description: 'Engineering decisions, failures, and practical lessons from Yiming Peng.',
		site: context.site,
		items: articles.map(article => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: article.data.publishedAt,
			link: `/writing/${article.data.slug}`
		})),
		customData: '<language>en-nz</language>'
	});
};
