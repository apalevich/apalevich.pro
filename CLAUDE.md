# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based marketing website with agency template design, using Tailwind CSS for styling. The site features multiple sections including hero, stats, services, pricing, team, blog, and CTA blocks. It includes JavaScript for interactive features (menu, countdown, counter-up animations).

**Tech Stack:**

- **Framework:** Astro 6.1.10
- **Styling:** Tailwind CSS 4.2.4 (bundled via @tailwindcss/vite, not CLI)
- **Node:** >=22.12.0
- **Module Type:** ES modules
- **TypeScript:** Strict mode (via `astro/tsconfigs/strict`)
- **Code Formatting:** Prettier (2-space indentation, configured in `.prettierrc.json`)

## Development Commands

| Command                   | Purpose                                           |
| ------------------------- | ------------------------------------------------- |
| `npm run dev`             | Start local dev server at `http://localhost:4321` |
| `npm run build`           | Build production site to `./dist/`                |
| `npm run preview`         | Preview built site locally before deployment      |
| `npm run astro`           | Run Astro CLI directly                            |
| `npm run astro -- --help` | View Astro CLI documentation                      |

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
│   │   │   ├── PricingSection.astro        # Currently disabled (commented out in index.astro)
│   │   │   ├── TeamSection.astro
│   │   │   ├── BlogSection.astro           # Currently disabled (commented out in index.astro)
│   │   │   └── CtaSection.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Icon.astro
│   │       ├── Section.astro
│   │       └── SectionHeading.astro
│   ├── data/
│   │   ├── homepage.json        # Centralized homepage content (site, navigation, hero, stats, story, speed, services, process, team, cta, footer)
│   │   └── refined_copy.json    # Legacy/unused copy reference
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

- `menu.js` - Mobile navigation toggle (requires: `mobile-menu-trigger`, `menu-block`, `menu-overlay` selectors)
- `countdown.js` - Countdown timer functionality
- `counterup.js` - Animated counter animations (requires: `data-module="countup"` attribute)
- `main.js` - General site interactivity

**Important:** Preserve these selector names when refactoring HTML—they're hardcoded in the scripts:

- `.mobile-menu-trigger` - Mobile menu button
- `.menu-block` - Menu container
- `.menu-overlay` - Menu overlay backdrop
- `[data-module="countup"]` - Counter animation elements

## Styling Conventions

- Use Astro's scoped `<style>` blocks in components—they're automatically scoped to that component only
- Prefer Tailwind utility classes for layout and spacing
- Custom classes and base styles should be defined in `src/styles/global.css`
- Media queries use Tailwind's responsive prefixes (`md:`, `lg:`, `xl:`)
- Dark mode sections use `bg-ColorDark` with `text-ColorLight`
- Two-space indentation (enforced by Prettier)

## Code Organization & DRY Principle

### Utility Functions

Extract reusable logic into `src/utils/` to avoid duplication across components.

**Example:** Image resolution utility (`src/utils/images.ts`)

When multiple components need the same helper function, centralize it:

```typescript
// src/utils/images.ts
export function resolveImage(src: string, mediaMap: Record<string, any>): any {
  return mediaMap[src] ?? src;
}
```

Then import and use in components:

```astro
---
import { resolveImage } from "../../utils/images";

const mediaImageMap = { /* component-specific mappings */ };
---
<Picture src={resolveImage(post.image, mediaImageMap)} ... />
```

Each component manages its own `mediaImageMap` (component-specific data), but the resolution logic is shared.

### When to Extract

- **Same function in 2+ files?** → Extract to `src/utils/`
- **Same import pattern in 3+ places?** → Consider a helper or constant
- **Logic that doesn't depend on component state?** → Good candidate for utils

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
- `npm run build` is the primary validation step; always run before pushing changes

## Additional Resources

- **AGENTS.md** - Repository guidelines for component organization, naming conventions, and selector preservation
- **src/data/homepage.json** - Complete homepage data structure with all configurable content keys
