# Yiming's Personal Portfolio Website

Hello, welcome to my personal portfolio website repository!

I am [Yiming](https://www.linkedin.com/in/yiming-nz/), currently working as a senior software engineer at WetaFx Ltd.

You might have seen my old home page built about 7 years ago, which is clearly much outdated, so I am currently working on rebuilding this new page with modern web technologies.

## Tech Stack

- **[Astro](https://astro.new/latest/)** - Modern static site generator for fast, content-focused websites
- **GitHub Actions** - Automated deployment and CI/CD pipeline
- **TypeScript** - Type-safe JavaScript development

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```text
/
├── public/          # Static assets (images, favicon, etc.)
├── src/
│   └── pages/       # Astro pages (routes)
│       └── index.astro
├── package.json
└── astro.config.mjs
```

## Deployment

This site is configured to deploy automatically to GitHub Pages using GitHub Actions when changes are pushed to the master branch.

### GitHub Pages Setup

1. **Repository Settings**: In your GitHub repository, go to Settings → Pages
2. **Source**: Select "GitHub Actions" as the source (NOT "Deploy from a branch")
3. **Branch**: The workflow will automatically deploy from the `master` branch
4. **URL**: Your site will be available at `https://yimingpeng.github.io`

### Automatic Deployment

The site will automatically build and deploy when you:

- Push changes to the `master` branch
- The GitHub Actions workflow (`.github/workflows/deploy.yml`) will handle the build and deployment process

### Manual Deployment

You can also trigger a manual deployment from the GitHub Actions tab in your repository.

## Project Status

🚧 **Currently under construction** - This is an active rebuild of my personal portfolio website using modern web technologies.
