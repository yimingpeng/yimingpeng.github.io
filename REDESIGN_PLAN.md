# Portfolio Redesign Plan

## Context

The current portfolio at yimingpeng.github.io is too heavy and reads like an online CV/resume. It exhaustively lists every skill (10 categories, 50+ technologies), every job (7 positions with detailed bullet points), and 9 projects — most without links to live work. The publications page is an empty placeholder. The result is information overload that dilutes impact.

The goal is to redesign it into a **lean, project-focused portfolio** that shows how Yiming thinks and solves problems, rather than listing everything he's ever done. Inspired by portfolios like Brittany Chiang's — minimal, curated, and narrative-driven.

---

## Honest Assessment: What to Cut

| Current Section                        | Verdict                         | Reason                                                                        |
| -------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| Skills (50+ items in 10 categories)    | **Remove entirely**             | Skill lists are meaningless without context. Let projects demonstrate skills. |
| Experience (7 jobs, detailed bullets)  | **Trim to ~3-4 lines per role** | Keep it brief — this isn't a CV. Link to full CV PDF for details.             |
| Education (3 degrees)                  | **Remove from main site**       | It's in the CV. PhD is impressive but can be mentioned in About.              |
| Research Interests                     | **Remove**                      | Fold into About section naturally.                                            |
| Publications placeholder               | **Replace with real content**   | This is actually valuable — published papers are a differentiator.            |
| Contact (duplicated in hero + section) | **Simplify to one location**    | Social links in one place only.                                               |

## What to Add/Elevate

| New Section                     | Why                                                                  |
| ------------------------------- | -------------------------------------------------------------------- |
| **Open Source Contributions**   | Airflow commits are a genuine differentiator — show them prominently |
| **Writing/Blog**                | Placeholder section for future Obsidian-published posts              |
| **Publications with real data** | Published papers are rare for data engineers — highlight them        |
| **Curated projects (3-5 max)**  | Each with problem → approach → impact narrative, not just tech lists |

---

## New Site Structure

### Single-page layout with anchor navigation

```
┌─────────────────────────────────────────┐
│  Header: Yiming Peng | Nav anchors      │
│  (About | Projects | Experience |       │
│   Writing | Publications | Contact)     │
├─────────────────────────────────────────┤
│  HERO / ABOUT                           │
│  - Name + one-line descriptor           │
│  - "I build data platforms that power   │
│    decisions at scale."                 │
│  - 2-3 sentence bio (PhD, 8+ yrs,      │
│    currently at Wētā FX)               │
│  - Social links (GitHub, LinkedIn,      │
│    Google Scholar, Medium, Email)       │
├─────────────────────────────────────────┤
│  FEATURED PROJECTS (3-5 curated)        │
│  Each project card:                     │
│  - Title + one-line problem statement   │
│  - 3-4 key tech tags                    │
│  - 1-2 sentence impact/outcome          │
│  - Link to detailed write-up or repo    │
│  Include: Airflow OSS contributions     │
│  as a "project" entry                   │
├─────────────────────────────────────────┤
│  EXPERIENCE (compact timeline)          │
│  - Role, Company, Date — one line each  │
│  - No bullet points or detailed desc    │
│  - Link to full CV PDF for details      │
├─────────────────────────────────────────┤
│  WRITING (placeholder for blog)         │
│  - "Coming soon" or link to Medium      │
│  - Will be populated from Obsidian      │
│    in future project                    │
├─────────────────────────────────────────┤
│  PUBLICATIONS                           │
│  - Real published papers with links     │
│  - Conference name, year, co-authors    │
│  - Google Scholar link for full list    │
├─────────────────────────────────────────┤
│  CONTACT                                │
│  - Simple CTA + email + social links    │
└─────────────────────────────────────────┘
```

---

## Confirmed Design Decisions

- **Keep**: Dark theme with Catppuccin colors, terminal aesthetic (distinctive, on-brand)
- **Keep**: Astro framework (already fast, SSG, perfect for this)
- **Keep**: Dark-only theme (no light mode toggle — keeps it simple and on-brand)
- **Layout**: Single page with anchor navigation
- **Remove**: AOS scroll animations (unnecessary weight, distracting)
- **Remove**: Multiple pages → consolidate to single page
- **Remove**: SkillsSimple, Skills, Education, Interests, ExperienceSimple components
- **Simplify**: Reduce CSS files, remove unused component styles
- **Projects**: 4 featured — DataOps Platform, Airflow OSS Contributions, Data Quality Monitoring, MLOps Pipeline
- **Publications & OSS links**: Placeholder content for now, user will fill in real data later

---

## Implementation Steps

### Step 1: Restructure Pages

- **Delete**: `src/pages/experience.astro`, `src/pages/projects.astro`
- **Modify**: `src/pages/index.astro` → single-page layout with all sections
- **Keep/Modify**: `src/pages/publications.astro` → populate with real data
- **Update**: Header navigation to use anchor links instead of page links

### Step 2: Component Cleanup

- **Delete unused components**: Skills.astro, SkillsSimple.astro, Education.astro, EducationSimple.astro, Interests.astro, ExperienceSimple.astro, PublicationsPreview.astro
- **Modify**: Hero.astro → shorter, punchier intro
- **Modify**: ProjectsPreview.astro → becomes main Projects section (3-5 cards)
- **Create**: Writing.astro → placeholder section for future blog
- **Create**: Publications section component with real paper data
- **Modify**: Experience.astro → compact one-line-per-role format
- **Modify**: Contact/ContactSimple → single clean contact section
- **Modify**: Header.astro → anchor-based nav for single page

### Step 3: Styling Cleanup

- Remove AOS dependency from package.json
- Consolidate CSS files (remove component styles for deleted components)
- Ensure responsive design still works

### Step 4: Polish

- Optimize images (342KB profile photo is large)
- Update meta tags and SEO
- Test all links and navigation
- Verify GitHub Pages deployment

---

## Files to Modify

- `src/pages/index.astro` — restructure as single-page
- `src/pages/publications.astro` — add real content
- `src/components/Header.astro` — anchor nav
- `src/components/Hero.astro` — simplify
- `src/components/Experience.astro` — compact format
- `src/components/Contact.astro` or `ContactSimple.astro` — simplify
- `src/components/ProjectsPreview.astro` — expand to full projects section
- `src/layouts/BaseLayout.astro` — remove AOS, update JS
- `src/styles/global.css`, `components.css` — cleanup
- `package.json` — remove AOS dependency

## Files to Delete

- `src/pages/experience.astro`
- `src/pages/projects.astro`
- `src/components/Skills.astro`
- `src/components/SkillsSimple.astro`
- `src/components/Education.astro`
- `src/components/EducationSimple.astro`
- `src/components/Interests.astro`
- `src/components/ExperienceSimple.astro`
- `src/components/PublicationsPreview.astro`

## New Files

- `src/components/Writing.astro` — blog placeholder section
- `src/components/Publications.astro` — real publications section (for index page)

---

## Verification

1. `npm run dev` — check site renders correctly on localhost:4321
2. Verify all anchor navigation works (smooth scroll)
3. Check mobile responsiveness (hamburger menu, layout)
4. `npm run build` — ensure clean production build
5. `npm run lint` — no linting errors
6. Verify all external links work (GitHub, LinkedIn, etc.)
