# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based marketing website with agency template design, using Tailwind CSS for styling. The site features multiple sections including hero, stats, services, pricing, team, blog, and CTA blocks. It includes JavaScript for interactive features (menu, countdown, counter-up animations).

**Tech Stack:**
- **Framework:** Astro 6.1.10
- **Styling:** Tailwind CSS 4.2.4 (with @tailwindcss/vite)
- **Node:** >=22.12.0
- **Module Type:** ES modules

## Development Commands

All commands are run from `/design-upgrade-2026/` directory:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local dev server at `http://localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally before deployment |
| `npm run astro` | Run Astro CLI directly |
| `npm run astro -- --help` | View Astro CLI documentation |

## Project Structure

```
design-upgrade-2026/
├── src/
│   ├── pages/
│   │   └── index.astro          # Homepage entry point
│   ├── components/
│   │   ├── layout/
│   │   │   └── BaseLayout.astro # Main layout wrapper (handles <head>, globals)
│   │   ├── site/
│   │   │   ├── SiteHeader.astro # Navigation header
│   │   │   └── SiteFooter.astro # Footer
│   │   ├── home/
│   │   │   ├── HeroSection.astro
│   │   │   ├── StatsSection.astro
│   │   │   ├── ContentSplitSection.astro
│   │   │   ├── ServicesSection.astro
│   │   │   ├── PricingSection.astro
│   │   │   ├── TeamSection.astro
│   │   │   ├── BlogSection.astro
│   │   │   └── CtaSection.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Icon.astro
│   │       ├── Section.astro
│   │       └── SectionHeading.astro
│   ├── data/
│   │   └── homepage.json        # Centralized homepage content
│   └── styles/
│       └── global.css
├── public/
│   ├── assets/
│   │   ├── img/                 # Images and SVGs
│   │   └── js/                  # JavaScript for interactivity
│   └── favicon.webp
├── design-requirements/         # Design system docs and extraction files
├── tailwind.config.mjs          # Custom colors, fonts, spacing
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Key Architecture Patterns

### Data-Driven Sections
Homepage is built from centralized `src/data/homepage.json`. Each section component accepts data props and renders content dynamically. Modify `homepage.json` to update content site-wide.

### Component Layers
- **Layout components** (`BaseLayout`): Wrap pages, manage `<head>`, inject global scripts
- **Site components** (`SiteHeader`, `SiteFooter`): Global reusable parts
- **Section components** (`HeroSection`, etc.): Homepage sections that consume data
- **UI components** (`Button`, `Section`): Low-level reusable elements

### Styling System
Tailwind extends configured in `tailwind.config.mjs`:

**Custom Colors:**
- `ColorBlack: #121212`
- `ColorDark: #0A102F`
- `ColorLight: #FDFBF9`
- `ColorLime: #C1FF00` / `ColorLimeAlt: #A6FF00`
- `ColorPurple: #6B3FF2`

**Custom Fonts:**
- `Inter` (body)
- `Public Sans` (headings)

**Border Radius:** `xs: 3px`, `sm: 5px`, `md: 10px`

**Responsive Container Padding:** DEFAULT `1rem`, `sm: 1.5rem`, `lg: 2rem`, `xl: 2.5rem`

### JavaScript Interactivity
Scripts in `/public/assets/js/` are loaded via `scripts` prop in `BaseLayout`:
- `menu.js` - Mobile navigation toggle
- `countdown.js` - Countdown timer functionality
- `counterup.js` - Animated counter animations
- `main.js` - General site interactivity

## Styling Conventions

- Use Astro's scoped styling when component-specific styles are needed
- Prefer Tailwind utility classes for layout and spacing
- Custom classes should be defined in `src/styles/global.css`
- Media queries use Tailwind's responsive prefixes (`md:`, `lg:`, `xl:`)
- Dark mode sections use `bg-ColorDark` with `text-ColorLight`

## Development Workflow

1. **Content updates:** Modify `src/data/homepage.json` → changes reflect instantly in dev server
2. **Component updates:** Edit `.astro` files, dev server hot-reloads
3. **Styling:** Update `tailwind.config.mjs` for new tokens or global CSS
4. **Adding new sections:** Create component in `src/components/home/`, import in `index.astro`, add data to `homepage.json`
5. **Build for production:** `npm run build` generates optimized site in `dist/`

## Build & Deployment Notes

- Astro pre-renders all pages to static HTML by default
- Production site lives in `./dist/` after build
- Environment: Node.js >=22.12.0 required
- No database or backend required (fully static)
