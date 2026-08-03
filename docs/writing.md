# Writing Workflow

The portfolio owns the canonical copy of each article. Obsidian is the private authoring source, and
the repository stores only reviewed publication snapshots.

## Configure the Vault

Copy `.env.example` to `.env` and set the absolute path to the Obsidian vault:

```bash
OBSIDIAN_VAULT_PATH=/absolute/path/to/My_Notes
```

`.env` is ignored by Git. The export command also accepts `--vault` when a one-off override is more
convenient.

## Source Article Frontmatter

The Obsidian note keeps normal vault metadata and adds these publishing fields:

```yaml
status: draft
title: A Portfolio Is a Product, Not a Page
description: A concise description for article lists and search metadata.
slug: portfolio-is-a-product-not-a-page
articleTags:
  - portfolio
  - astro
publishedAt:
updatedAt:
series:
  slug: portfolio-as-product
  title: Portfolio as Product
  order: 1
mediumUrl:
```

Keep `status: draft` while writing. Before export, set `status: ready` and add `publishedAt` in
`YYYY-MM-DD` format. The exporter removes Obsidian-only metadata and maps `articleTags` to the public
Astro `tags` field.

## Supported Markdown

Publication sources may use:

- standard Markdown;
- fenced code blocks;
- wikilinks to Articles that are already published;
- Obsidian image embeds such as `![[diagram.png|Architecture diagram]]`.

The exporter rejects unresolved wikilinks, note transclusions, callouts, Dataview, Tasks blocks,
Obsidian comments, ambiguous images, and source paths outside the configured vault.

## Export an Article

Validate without writing:

```bash
npm run writing:publish -- \
  --note "020 - Projects/path/to/Article.md" \
  --dry-run
```

Create or update the publication snapshot:

```bash
npm run writing:publish -- \
  --note "020 - Projects/path/to/Article.md"
```

The command writes `src/content/writing/<slug>.md` and copies local images to
`public/writing/<slug>/`. Generated snapshots contain a warning and must not be edited directly.

Run the normal checks before committing:

```bash
npm run writing:test
npm run format:check
npm run lint
npm run build
```

## Medium Cross-post

After the portfolio deployment is live:

1. Open Medium's **Import a story** tool.
2. Import the canonical `/writing/<slug>` URL.
3. Review formatting and publish the Medium copy.
4. Verify that Medium's canonical link points back to the portfolio.
5. Add the Medium URL to the private Source Article and export again if the portfolio should display
   the cross-post link.
