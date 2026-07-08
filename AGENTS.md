# AGENTS.md

This file provides shared project guidance for coding agents working in this repository. Keep it
tool-neutral: project facts, commands, architecture, conventions, and verification expectations belong
here. Tool-specific workflow rules belong in that tool's own instruction file, such as `CLAUDE.md`.

## Project Overview

This is Yiming Peng's personal portfolio website built with Astro, a modern static site generator. The
site showcases professional experience, projects, publications, and community/event activity. It's
configured for automatic deployment to GitHub Pages.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (opens on localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Linting and formatting
npm run lint          # Check for linting issues
npm run lint:fix      # Fix auto-fixable linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check if code is properly formatted
```

## Architecture

### Framework & Build System

- **Astro 5.13.2**: Static site generator with component-based architecture
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS v4** (`@tailwindcss/vite`): Utility-first styling, wired in via `astro.config.mjs`

### Project Structure

- `src/pages/`: Route-based pages — `index.astro` (home), `publications.astro`, `archive.astro`,
  `community.astro`
- `src/layouts/`: Reusable layout components (`BaseLayout.astro`, `PublicationsLayout.astro`)
- `src/components/`: Modular UI components organized by functionality
- `src/data/`: Typed content data consumed by pages/components (e.g. `community.ts` — the
  `CommunityEvent[]` list behind the Community & Events feature)
- `src/styles/`: CSS files split by concern, plus Tailwind's entry stylesheet
- `public/`: Static assets including images, favicon, and PDF files

### Component Architecture

The site follows a component-based architecture with clear separation. Current components in
`src/components/`:

- **Header.astro**: Navigation, mobile menu, and the light/dark theme toggle
- **Hero.astro**, **TerminalCLI.astro**: Homepage hero/intro
- **AIChatPlaceholder.astro**: Placeholder section reserved for a future AI-chat feature
- **ProjectsPreview.astro**, **Publications.astro**, **CommunityPreview.astro**: Homepage preview
  sections linking out to their full pages
- **Writing.astro**: Writing/blog placeholder section (future Obsidian integration)
- **Experience.astro**: Compact experience timeline
- **Contact.astro** / **ContactSimple.astro**: Full and simplified contact section variants
- **BaseLayout.astro** (in `src/layouts/`): Main layout template with TypeScript event handling for
  mobile navigation and smooth scrolling

### Theming

- Light and dark themes are both supported, toggled via `#theme-toggle` in `Header.astro`, with the
  choice persisted to `localStorage` (`theme: 'dark' | 'light'`)
- Catppuccin-inspired dark palette, paired with a minimalist light palette

### Styling System

- Tailwind CSS handles utility styling; component/page-specific CSS lives alongside it in
  `src/styles/` (`global.css`, `header.css`, `home-sections.css`, `publications.css`,
  `publications-page.css`, `archive-page.css`, `tailwind.css`)
- Responsive design with mobile-first approach

## Deployment

The site uses GitHub Actions for automatic deployment:

- **Trigger**: Pushes to `master` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Target**: GitHub Pages at `https://yimingpeng.github.io`
- **Node version**: 20
- **Package manager**: npm

The Astro config is set up for static generation with the correct base path for GitHub Pages deployment.

## Code Quality Tools

### Linting Configuration

- **ESLint**: Configured with TypeScript and Astro-specific rules
- **Line length**: Limited to 100 characters for better readability
- **Astro files**: Special parsing and linting rules for `.astro` components
- **TypeScript**: Strict linting with unused variable detection

### Formatting

- **Prettier**: Consistent code formatting across all file types
- **Astro plugin**: Proper formatting for Astro component files
- **Tab-based indentation**: 2-space tabs for consistency

## Key Files

- `eslint.config.js`: ESLint configuration with Astro and TypeScript rules
- `.prettierrc`: Prettier formatting configuration
- `astro.config.mjs`: Astro configuration with Tailwind plugin and GitHub Pages setup
- `src/layouts/BaseLayout.astro`: Contains critical JavaScript for mobile navigation and scroll effects
- `src/pages/index.astro`: Main homepage importing key components
- `src/data/community.ts`: Data source for the Community & Events feature
- `package.json`: Dependencies and build scripts
- `.github/workflows/deploy.yml`: Automated deployment pipeline
