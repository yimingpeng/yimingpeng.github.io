# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Yiming Peng's personal portfolio website built with Astro, a modern static site generator. The site showcases professional experience, projects, publications, and contact information. It's configured for automatic deployment to GitHub Pages.

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
- **AOS 2.3.4**: Animation on scroll library for smooth interactions

### Project Structure

- `src/pages/`: Route-based pages (index.astro, projects.astro, experience.astro, publications.astro)
- `src/layouts/`: Reusable layout components (BaseLayout.astro, PublicationsLayout.astro)
- `src/components/`: Modular UI components organized by functionality
- `src/styles/`: CSS files split by concern (global, header, hero, components, publications)
- `public/`: Static assets including images, favicon, and PDF files

### Component Architecture

The site follows a component-based architecture with clear separation:

- **BaseLayout.astro**: Main layout template with TypeScript event handling for mobile navigation and smooth scrolling
- **Header.astro**: Navigation component with mobile menu support
- **Page-specific components**: Each major section (Hero, Skills, Contact, etc.) is componentized for reusability
- **Layout variants**: Both full and simplified versions of components (e.g., SkillsSimple.astro vs Skills.astro)

### Styling System

- CSS is organized by feature/component in separate files
- Global styles handle typography and base layout
- Component-specific CSS for header, hero, and publication sections
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
- `astro.config.mjs`: Astro configuration with GitHub Pages setup
- `src/layouts/BaseLayout.astro`: Contains critical JavaScript for mobile navigation and scroll effects
- `src/pages/index.astro`: Main homepage importing key components
- `package.json`: Dependencies and build scripts
- `.github/workflows/deploy.yml`: Automated deployment pipeline
