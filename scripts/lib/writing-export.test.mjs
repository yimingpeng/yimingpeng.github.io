import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import matter from 'gray-matter';

import { prepareArticle, publishArticle } from './writing-export.mjs';

function fixture() {
	const root = fs.mkdtempSync(path.join(os.tmpdir(), 'writing-export-'));
	const vaultPath = path.join(root, 'vault');
	const sourceDirectory = path.join(vaultPath, '020 - Projects', 'Writing');
	const contentDirectory = path.join(root, 'repo', 'src', 'content', 'writing');
	const publicDirectory = path.join(root, 'repo', 'public');
	fs.mkdirSync(sourceDirectory, { recursive: true });
	fs.mkdirSync(contentDirectory, { recursive: true });

	return { root, vaultPath, sourceDirectory, contentDirectory, publicDirectory };
}

function sourceFrontmatter(overrides = {}) {
	return {
		status: 'ready',
		title: 'A Test Article',
		description: 'A useful description.',
		slug: 'a-test-article',
		articleTags: ['testing'],
		publishedAt: '2026-07-12',
		...overrides
	};
}

test('publishes portable Markdown and Obsidian image embeds', () => {
	const paths = fixture();
	const sourcePath = path.join(paths.sourceDirectory, 'A Test Article.md');
	const imagePath = path.join(paths.sourceDirectory, 'Diagram Image.png');
	fs.writeFileSync(imagePath, 'image fixture');
	fs.writeFileSync(
		sourcePath,
		matter.stringify(
			'# A Test Article\n\nAn introduction.\n\n![[Diagram Image.png|Architecture diagram]]\n',
			sourceFrontmatter()
		)
	);

	const result = publishArticle({
		sourcePath,
		vaultPath: paths.vaultPath,
		contentDirectory: paths.contentDirectory,
		publicDirectory: paths.publicDirectory
	});
	const snapshot = fs.readFileSync(result.targetPath, 'utf8');

	assert.doesNotMatch(snapshot, /^# A Test Article/m);
	assert.match(
		snapshot,
		/!\[Architecture diagram\]\(\/writing\/a-test-article\/diagram-image\.png\)/
	);
	assert.equal(
		fs.existsSync(
			path.join(paths.publicDirectory, 'writing', 'a-test-article', 'diagram-image.png')
		),
		true
	);
});

test('converts wikilinks only when their target is already published', () => {
	const paths = fixture();
	fs.writeFileSync(
		path.join(paths.contentDirectory, 'existing-article.md'),
		matter.stringify('Existing body.\n', {
			title: 'Existing Article',
			description: 'Existing description.',
			slug: 'existing-article',
			publishedAt: '2026-07-01',
			tags: ['testing']
		})
	);
	const sourcePath = path.join(paths.sourceDirectory, 'A Test Article.md');
	fs.writeFileSync(
		sourcePath,
		matter.stringify('Read [[Existing Article|the earlier article]].\n', sourceFrontmatter())
	);

	const prepared = prepareArticle({
		sourcePath,
		vaultPath: paths.vaultPath,
		contentDirectory: paths.contentDirectory
	});

	assert.match(prepared.output, /\[the earlier article\]\(\/writing\/existing-article\)/);
});

test('rejects drafts and unsupported Obsidian blocks', () => {
	const paths = fixture();
	const draftPath = path.join(paths.sourceDirectory, 'Draft.md');
	fs.writeFileSync(
		draftPath,
		matter.stringify('Draft body.\n', sourceFrontmatter({ status: 'draft' }))
	);

	assert.throws(
		() =>
			prepareArticle({
				sourcePath: draftPath,
				vaultPath: paths.vaultPath,
				contentDirectory: paths.contentDirectory
			}),
		/status "ready"/
	);

	const dataviewPath = path.join(paths.sourceDirectory, 'Dataview.md');
	fs.writeFileSync(
		dataviewPath,
		matter.stringify('```dataview\nTABLE file.name\n```\n', sourceFrontmatter())
	);

	assert.throws(
		() =>
			prepareArticle({
				sourcePath: dataviewPath,
				vaultPath: paths.vaultPath,
				contentDirectory: paths.contentDirectory
			}),
		/Unsupported Obsidian block/
	);
});

test('rejects source files outside the configured vault', () => {
	const paths = fixture();
	const outsidePath = path.join(paths.root, 'outside.md');
	fs.writeFileSync(outsidePath, matter.stringify('Outside.\n', sourceFrontmatter()));

	assert.throws(
		() =>
			prepareArticle({
				sourcePath: outsidePath,
				vaultPath: paths.vaultPath,
				contentDirectory: paths.contentDirectory
			}),
		/must be inside/
	);
});
