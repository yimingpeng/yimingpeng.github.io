import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seriesSchema = z.object({
	slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	title: z.string().min(1),
	order: z.number().int().positive()
});

const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		tags: z.array(z.string().min(1)).min(1),
		series: seriesSchema.optional(),
		mediumUrl: z.string().url().optional()
	})
});

export const collections = { writing };
