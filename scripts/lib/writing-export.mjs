import fs from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';

import matter from 'gray-matter';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const IMAGE_EXTENSIONS = new Set(['.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const UNSUPPORTED_FENCES = new Set(['dataview', 'dataviewjs', 'tasks']);

function requiredString(value, field) {
	if (typeof value !== 'string' || !value.trim()) {
		throw new Error(`Frontmatter field "${field}" is required.`);
	}

	return value.trim();
}

function optionalString(value, field) {
	if (value == null || value === '') return undefined;
	if (typeof value !== 'string') {
		throw new Error(`Frontmatter field "${field}" must be a string.`);
	}

	return value.trim() || undefined;
}

function validateDate(value, field) {
	const date = requiredString(value, field);
	if (!DATE_PATTERN.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
		throw new Error(`Frontmatter field "${field}" must use YYYY-MM-DD.`);
	}

	return date;
}

function validateSeries(value) {
	if (value == null) return undefined;
	if (typeof value !== 'object' || Array.isArray(value)) {
		throw new Error('Frontmatter field "series" must be an object.');
	}

	const slug = requiredString(value.slug, 'series.slug');
	if (!SLUG_PATTERN.test(slug)) {
		throw new Error('Frontmatter field "series.slug" must be a URL-safe slug.');
	}

	if (!Number.isInteger(value.order) || value.order < 1) {
		throw new Error('Frontmatter field "series.order" must be a positive integer.');
	}

	return {
		slug,
		title: requiredString(value.title, 'series.title'),
		order: value.order
	};
}

export function validateSourceMetadata(data, { requireReady = true } = {}) {
	if (requireReady && data.status !== 'ready') {
		throw new Error('Only an article with status "ready" can be published.');
	}

	const slug = requiredString(data.slug, 'slug');
	if (!SLUG_PATTERN.test(slug)) {
		throw new Error('Frontmatter field "slug" must be a URL-safe slug.');
	}

	if (!Array.isArray(data.articleTags) || data.articleTags.length === 0) {
		throw new Error('Frontmatter field "articleTags" must contain at least one tag.');
	}

	const tags = data.articleTags.map((tag, index) => requiredString(tag, `articleTags[${index}]`));
	const mediumUrl = optionalString(data.mediumUrl, 'mediumUrl');
	if (mediumUrl) {
		try {
			new URL(mediumUrl);
		} catch {
			throw new Error('Frontmatter field "mediumUrl" must be a valid URL.');
		}
	}

	return {
		title: requiredString(data.title, 'title'),
		description: requiredString(data.description, 'description'),
		slug,
		publishedAt: validateDate(data.publishedAt, 'publishedAt'),
		...(data.updatedAt ? { updatedAt: validateDate(data.updatedAt, 'updatedAt') } : {}),
		tags,
		...(data.series ? { series: validateSeries(data.series) } : {}),
		...(mediumUrl ? { mediumUrl } : {})
	};
}

function walkFiles(directory, output = []) {
	if (!fs.existsSync(directory)) return output;

	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		if (entry.name === '.git' || entry.name === '.obsidian' || entry.name === 'node_modules') {
			continue;
		}

		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) walkFiles(entryPath, output);
		else output.push(entryPath);
	}

	return output;
}

function publishedArticleLinks(contentDirectory) {
	const links = new Map();
	if (!fs.existsSync(contentDirectory)) return links;

	for (const filePath of walkFiles(contentDirectory)) {
		if (path.extname(filePath) !== '.md') continue;
		const parsed = matter(fs.readFileSync(filePath, 'utf8'));
		if (!parsed.data.title || !parsed.data.slug) continue;

		links.set(String(parsed.data.title).toLowerCase(), parsed.data.slug);
		links.set(path.basename(filePath, '.md').toLowerCase(), parsed.data.slug);
	}

	return links;
}

function safeAssetName(fileName) {
	const extension = path.extname(fileName).toLowerCase();
	const base = path
		.basename(fileName, path.extname(fileName))
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	if (!base || !IMAGE_EXTENSIONS.has(extension)) {
		throw new Error(`Unsupported image asset: ${fileName}`);
	}

	return `${base}${extension}`;
}

function resolveAsset(assetReference, sourceDirectory, vaultPath) {
	const decodedReference = decodeURIComponent(assetReference.trim());
	const directCandidates = [
		path.resolve(sourceDirectory, decodedReference),
		path.resolve(vaultPath, '040 - Resources', 'Attachments', decodedReference)
	].filter(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());

	if (directCandidates.length === 1) return directCandidates[0];
	if (directCandidates.length > 1) {
		throw new Error(`Image asset is ambiguous: ${assetReference}`);
	}

	const matches = walkFiles(vaultPath).filter(
		candidate => path.basename(candidate) === path.basename(decodedReference)
	);
	if (matches.length === 0) throw new Error(`Image asset was not found: ${assetReference}`);
	if (matches.length > 1) throw new Error(`Image asset is ambiguous: ${assetReference}`);

	return matches[0];
}

function headingFragment(heading) {
	return heading
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

function stripMatchingTitle(body, title) {
	const lines = body.trimStart().split('\n');
	if (lines[0]?.trim() !== `# ${title}`) return body.trim();

	lines.shift();
	while (lines[0]?.trim() === '') lines.shift();
	return lines.join('\n').trim();
}

function transformBody(body, options) {
	const { metadata, sourcePath, vaultPath, contentDirectory } = options;
	const sourceDirectory = path.dirname(sourcePath);
	const articleLinks = publishedArticleLinks(contentDirectory);
	const assets = new Map();
	let inFence = false;
	let fenceMarker = '';

	const transformed = stripMatchingTitle(body, metadata.title)
		.split('\n')
		.map((originalLine, lineIndex) => {
			let line = originalLine;
			const fence = line.trim().match(/^(```|~~~)([^\s]*)/);
			if (fence) {
				if (!inFence) {
					const language = fence[2].toLowerCase();
					if (UNSUPPORTED_FENCES.has(language) || language.startsWith('ad-')) {
						throw new Error(`Unsupported Obsidian block on line ${lineIndex + 1}: ${language}`);
					}
					inFence = true;
					fenceMarker = fence[1];
				} else if (line.trim().startsWith(fenceMarker)) {
					inFence = false;
					fenceMarker = '';
				}
				return line;
			}

			if (inFence) return line;
			if (/^\s*>\s*\[!/.test(line)) {
				throw new Error(`Obsidian callouts are not supported on line ${lineIndex + 1}.`);
			}
			if (line.includes('%%')) {
				throw new Error(`Obsidian comments are not supported on line ${lineIndex + 1}.`);
			}

			line = line.replace(/!\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, reference, label) => {
				const extension = path.extname(reference).toLowerCase();
				if (!IMAGE_EXTENSIONS.has(extension)) {
					throw new Error(`Note transclusions are not supported: ${reference}`);
				}

				const sourceAsset = resolveAsset(reference, sourceDirectory, vaultPath);
				const destinationName = safeAssetName(reference);
				const existing = assets.get(destinationName);
				if (existing && existing !== sourceAsset) {
					throw new Error(`Two image assets would use the same name: ${destinationName}`);
				}
				assets.set(destinationName, sourceAsset);

				const alt = label && !/^\d+$/.test(label) ? label : path.basename(reference, extension);
				return `![${alt}](/writing/${metadata.slug}/${destinationName})`;
			});

			line = line.replace(/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
				const [articleName, heading] = target.split('#', 2);
				const slug = articleLinks.get(articleName.trim().toLowerCase());
				if (!slug) throw new Error(`Wikilink does not target a published article: ${target}`);

				const fragment = heading ? `#${headingFragment(heading)}` : '';
				return `[${label || articleName}](/writing/${slug}${fragment})`;
			});

			return line;
		})
		.join('\n');

	if (inFence) throw new Error('The article contains an unclosed code fence.');
	return { body: transformed.trim(), assets };
}

export function prepareArticle({ sourcePath, vaultPath, contentDirectory, requireReady = true }) {
	const resolvedVault = path.resolve(vaultPath);
	const resolvedSource = path.resolve(sourcePath);
	const relativeSource = path.relative(resolvedVault, resolvedSource);
	if (relativeSource.startsWith('..') || path.isAbsolute(relativeSource)) {
		throw new Error('The source note must be inside the configured Obsidian vault.');
	}
	if (!fs.existsSync(resolvedSource)) throw new Error(`Source note not found: ${resolvedSource}`);

	const parsed = matter(fs.readFileSync(resolvedSource, 'utf8'));
	const metadata = validateSourceMetadata(parsed.data, { requireReady });
	const transformed = transformBody(parsed.content, {
		metadata,
		sourcePath: resolvedSource,
		vaultPath: resolvedVault,
		contentDirectory
	});
	const generatedBody = [
		'<!-- Generated from the private Obsidian source. Do not edit this snapshot directly. -->',
		'',
		transformed.body,
		''
	].join('\n');

	return {
		metadata,
		output: matter.stringify(generatedBody, metadata),
		assets: transformed.assets,
		targetPath: path.join(contentDirectory, `${metadata.slug}.md`)
	};
}

export function publishArticle(options) {
	const prepared = prepareArticle(options);
	const publicDirectory = path.resolve(options.publicDirectory);
	const assetDirectory = path.join(publicDirectory, 'writing', prepared.metadata.slug);

	fs.mkdirSync(path.dirname(prepared.targetPath), { recursive: true });
	fs.rmSync(assetDirectory, { recursive: true, force: true });
	if (prepared.assets.size > 0) fs.mkdirSync(assetDirectory, { recursive: true });

	for (const [destinationName, sourceAsset] of prepared.assets) {
		fs.copyFileSync(sourceAsset, path.join(assetDirectory, destinationName));
	}

	const temporaryPath = `${prepared.targetPath}.tmp`;
	fs.writeFileSync(temporaryPath, prepared.output, 'utf8');
	fs.renameSync(temporaryPath, prepared.targetPath);

	return {
		targetPath: prepared.targetPath,
		assetCount: prepared.assets.size,
		slug: prepared.metadata.slug
	};
}
