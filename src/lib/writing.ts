import { getCollection, type CollectionEntry } from 'astro:content';

export type WritingArticle = CollectionEntry<'writing'>;
const writingSources = import.meta.glob('../content/writing/**/*.md');

export async function getWritingArticles(): Promise<WritingArticle[]> {
	if (Object.keys(writingSources).length === 0) return [];

	const articles = await getCollection('writing');
	return articles.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function formatWritingDate(date: Date): string {
	return new Intl.DateTimeFormat('en-NZ', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	}).format(date);
}

export function estimateReadingMinutes(body: string | undefined): number {
	const words = body?.trim().split(/\s+/).filter(Boolean).length ?? 0;
	return Math.max(1, Math.ceil(words / 220));
}
