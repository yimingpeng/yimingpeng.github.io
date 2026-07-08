# Yiming Peng Portfolio

Personal portfolio website for [Yiming Peng](https://www.linkedin.com/in/yiming-nz/), built with
[Astro](https://astro.build/) and deployed to GitHub Pages.

The site presents professional experience, selected projects, publications, community and speaking
activity, certifications, and contact links.

## Tech Stack

- **Astro 5** - Static site generator and component framework
- **TypeScript** - Typed data and project configuration
- **Tailwind CSS v4** - Utility-first styling through `@tailwindcss/vite`
- **ESLint + Prettier** - Linting and formatting, including Astro support
- **GitHub Actions** - Automatic build and deployment to GitHub Pages

## Development

### Prerequisites

- Node.js 20 
- npm

### Getting Started

```bash
npm install
npm run dev
```

The development server runs at [http://localhost:4321](http://localhost:4321) by default.

### Available Scripts

```bash
npm run dev           # Start the Astro development server
npm run build         # Build the static production site
npm run preview       # Preview the production build locally
npm run lint          # Check JavaScript, TypeScript, and Astro files with ESLint
npm run lint:fix      # Apply auto-fixable ESLint changes
npm run format        # Format the repository with Prettier
npm run format:check  # Check Prettier formatting without writing changes
```

## Project Structure

```text
.
├── public/
│   ├── files/                 # Static downloadable assets and certification images
│   ├── favicon.svg
│   ├── portrait.jpg
│   └── yiming_cv.pdf
├── src/
│   ├── components/            # Reusable Astro UI components
│   ├── data/                  # Typed content data for pages and preview sections
│   ├── layouts/               # Shared page layouts
│   ├── pages/                 # Route-based Astro pages
│   └── styles/                # Global, page, and component CSS
├── astro.config.mjs
├── eslint.config.js
├── package.json
└── tsconfig.json
```

## Routes

- `/` - Home page with profile summary, recent activity, selected projects, publications, writing,
  archive links, and contact links
- `/publications` - Full publications page backed by `src/data/publications.ts`
- `/community` - Community, speaking, and events page backed by `src/data/community.ts`
- `/archive` - Extended archive of projects, writing, certifications, and professional activity

## Architecture Notes

- `src/layouts/BaseLayout.astro` provides the shared HTML shell, metadata, global stylesheet import,
  and persisted light/dark theme initialization.
- `src/components/Header.astro` owns the main navigation, mobile menu, and theme toggle.
- Content-heavy sections are split into focused components such as `CommunityPreview.astro`,
  `Publications.astro`, `Experience.astro`, `Writing.astro`, and `Contact.astro`.
- Shared content data lives in `src/data/` so list-style pages and preview components can use typed
  source data instead of duplicating markup.
- Styling combines Tailwind utilities with CSS files in `src/styles/`, including page-specific styles
  for publications, archive, home sections, and the header.

## Deployment

The site deploys automatically to GitHub Pages from the `master` branch.

- Workflow: `.github/workflows/deploy.yml`
- Build action: `withastro/action@v2`
- Node version in CI: `20`
- Deployment action: `actions/deploy-pages@v4`
- Production URL: [https://yimingpeng.github.io](https://yimingpeng.github.io)

To configure GitHub Pages for this repository, set **Settings -> Pages -> Source** to
**GitHub Actions**.

Manual deployments can be triggered from the GitHub Actions tab via the `workflow_dispatch` event.

## Development Disclosure

This site has been built with AI-assisted development workflows. I use Claude Code with Opus 4.8 as
an advisor, Codex for implementation work, and Kilo for quick edits.
