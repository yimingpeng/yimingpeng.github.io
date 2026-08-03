import path from 'node:path';
import process from 'node:process';
import { parseArgs } from 'node:util';

import { prepareArticle, publishArticle } from './lib/writing-export.mjs';

const { values } = parseArgs({
	options: {
		note: { type: 'string', short: 'n' },
		vault: { type: 'string', short: 'v' },
		'dry-run': { type: 'boolean', default: false }
	}
});

if (!values.note) {
	throw new Error('Pass the source note with --note "path/from/vault.md".');
}

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const vaultPath = path.resolve(values.vault || process.env.OBSIDIAN_VAULT_PATH || '');
if (!values.vault && !process.env.OBSIDIAN_VAULT_PATH) {
	throw new Error('Set OBSIDIAN_VAULT_PATH or pass --vault "/absolute/path/to/My_Notes".');
}

const options = {
	sourcePath: path.resolve(vaultPath, values.note),
	vaultPath,
	contentDirectory: path.join(repositoryRoot, 'src', 'content', 'writing'),
	publicDirectory: path.join(repositoryRoot, 'public')
};

if (values['dry-run']) {
	const prepared = prepareArticle(options);
	process.stdout.write(
		`Ready to publish ${prepared.metadata.title} with ${prepared.assets.size} asset(s).\n`
	);
} else {
	const result = publishArticle(options);
	process.stdout.write(
		`Published snapshot ${result.targetPath} with ${result.assetCount} asset(s).\n`
	);
}
