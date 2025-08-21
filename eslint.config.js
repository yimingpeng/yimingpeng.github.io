import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';

export default [
	// Base JavaScript configuration
	js.configs.recommended,

	// TypeScript files
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslint
		},
		rules: {
			...typescriptEslint.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }]
		}
	},

	// Extend Astro recommended configuration
	...astro.configs.recommended,

	// Global JavaScript/TypeScript rules
	{
		files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.astro'],
		rules: {
			'no-console': 'warn',
			'no-debugger': 'error',
			'prefer-const': 'error',
			'no-var': 'error',
			'object-shorthand': 'error',
			'prefer-arrow-callback': 'error',
			'arrow-spacing': 'error',
			'comma-dangle': ['error', 'never'],
			quotes: ['error', 'single', { allowTemplateLiterals: true }],
			semi: ['error', 'always'],
			indent: ['error', 'tab'],
			'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }]
		}
	},

	// Ignore patterns
	{
		ignores: ['dist/**', 'node_modules/**', '.astro/**']
	}
];
