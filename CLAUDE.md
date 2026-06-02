# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based marketing website with agency template design, using Tailwind CSS for styling. The site features multiple sections including hero, stats, services, pricing, team, blog, and CTA blocks. It includes JavaScript for interactive features (menu, countdown, counter-up animations).

## Positioning

**Current (homepage).** The site leads with performance: *we make web apps and sites fast*. Every homepage section must reinforce that thesis. When updating homepage copy:

- Lead with the buyer's **outcome**, not the feature or service category.
- Prove with **concrete metrics** — milliseconds, Core Web Vitals (LCP, INP, CLS), conversion lift, infra cost reduction.
- Name the **risk of doing it badly** (loss aversion) — every service card on the homepage carries an `outcome` line and a `risk` line, rendered by `ServicesSection.astro`.
- Keep voice tight — cut hedges and adjectives. Prefer one sharp sentence over two soft ones.

The schema for `services.cards[]` in `src/data/homepage.json` is `{ title, outcome, risk, href }`. A top-level `services.riskLabel` controls the label shown above each risk line. Do not reintroduce the old generalist "fast, converting web apps" framing.

**Planned next step (service pages).** Service pages (`src/data/services/*.json`, `src/pages/[service].astro`, `it-recruitment.astro`) will be reworked to address **client types** rather than service categories — e.g., bootstrappers shipping vibecoded SaaS, eCommerce operators on Shopify, corporates with established audiences. The homepage rework is the stepping stone. When editing service pages, frame them around audience needs, not service taxonomy. Until the rework lands, service-page copy can stay as-is; do not invest in further service-category rewrites that the audience-first model will discard.

**Tech Stack:**

- **Framework:** Astro 6.3.1
- **Styling:** Tailwind CSS 4.2.4 (bundled via @tailwindcss/vite, not CLI)
- **Interactivity:** React 19 islands via `@astrojs/react` (used for stateful UI like the contact form)
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
apalevich.pro/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Homepage entry point
│   │   ├── contact.astro        # /contact (form + direct channels)
│   │   ├── it-recruitment.astro # Static service page
│   │   └── [service].astro      # Dynamic service pages (frontend-development, backend-development, ai, design, seo)
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
│   │   ├── service/             # Sections shared by service pages
│   │   │   ├── ServiceHeroSection.astro
│   │   │   ├── ServiceFeaturesSection.astro
│   │   │   ├── ProcessSection.astro
│   │   │   └── FaqSection.astro
│   │   ├── contact/
│   │   │   └── ContactForm.tsx  # React island, 4 submission states
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Icon.astro
│   │       ├── Section.astro
│   │       └── SectionHeading.astro
│   ├── data/
│   │   ├── homepage.json        # Centralized homepage content
│   │   ├── contact.json         # /contact hero, form labels/states, direct channels
│   │   ├── services/*.json      # Per-service page content
│   │   └── refined_copy.json    # Legacy/unused copy reference
│   ├── utils/
│   │   └── images.ts            # Shared image resolution helper
│   └── styles/
│       └── global.css
├── public/
│   ├── assets/
│   │   ├── img/                 # Images and SVGs
│   │   └── js/                  # JavaScript for interactivity
│   └── favicon.webp
├── design-requirements/         # Design system docs and extraction files
├── .env.example                 # Documents PUBLIC_BACKEND_BASE_URL
├── tailwind.config.mjs          # Custom colors, fonts, spacing
├── astro.config.mjs             # Registers @astrojs/react + Tailwind Vite plugin
├── tsconfig.json
└── package.json
```

## Key Architecture Patterns

### Data-Driven Sections

Pages are built from JSON in `src/data/`:

- `homepage.json` powers `index.astro` and feeds shared nav/footer data to every other page
- `contact.json` powers `contact.astro` (hero, form labels/states, channel links)
- `services/<slug>.json` powers `[service].astro` and `it-recruitment.astro`

Each section component accepts data props and renders content dynamically. Modify the relevant JSON to update content; no component code change is usually needed.

#### Copy tokens (line breaks & non-breaking spaces)

Prose strings in `src/data/*.json` are rendered through `renderCopy()` (`src/utils/copy.ts`), which HTML-escapes the input and then expands a whitelisted set of tokens into HTML. Use these to control wrapping per breakpoint without touching components:

| Token | Effect |
| --- | --- |
| `{br}` | Always-on line break |
| `{br-sm}` / `{br-md}` / `{br-lg}` / `{br-xl}` | Break visible at this breakpoint and up |
| `{br-below-sm}` / `{br-below-md}` / `{br-below-lg}` / `{br-below-xl}` | Break visible only below this breakpoint |
| `{br-only-sm}` / `{br-only-md}` / `{br-only-lg}` / `{br-only-xl}` | Break visible only within this single breakpoint range |
| `{nbsp}` | Non-breaking space |

Example: `"We Build Web Apps{br-lg}That Convert"` forces a wrap only on `lg+` viewports. Token names are case-sensitive. Unknown tokens render literally — add new ones to the map in `src/utils/copy.ts`.

### Component Layers

- **Layout components** (`BaseLayout`): Wrap pages, manage `<head>`, inject global scripts
- **Site components** (`SiteHeader`, `SiteFooter`): Global reusable parts
- **Section components** (`home/*`, `service/*`): Page-specific sections that consume data
- **Feature components** (`contact/*`): Page-specific interactive units (e.g., React islands)
- **UI components** (`Button`, `Section`, `Icon`, `SectionHeading`): Low-level reusable elements

### React Islands

React (`@astrojs/react`) is registered in `astro.config.mjs` and used only where state matters. Today that means `src/components/contact/ContactForm.tsx`, mounted in `contact.astro` with `client:load`. Pattern when adding new islands:

1. Create the `.tsx` component under a feature folder (e.g., `src/components/<feature>/`)
2. Import it in an `.astro` page and add a `client:*` directive (`client:load`, `client:idle`, `client:visible`)
3. Pass plain serializable props only (strings, numbers, objects, arrays) — Astro serializes them for hydration

Prefer pure Astro for static UI; reach for React only when local state, effects, or event-driven UI is required.

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

1. **Content updates:** Modify the relevant JSON in `src/data/` → changes reflect instantly in dev server
2. **Component updates:** Edit `.astro` or `.tsx` files, dev server hot-reloads
3. **Styling:** Update `tailwind.config.mjs` for new tokens or global CSS
4. **Adding new homepage sections:** Create component in `src/components/home/`, import in `index.astro`, add data to `homepage.json`
5. **Adding new pages:** Create `.astro` under `src/pages/`, source data from a dedicated JSON in `src/data/`, reuse `BaseLayout` + `SiteHeader` + `SiteFooter`
6. **Adding React islands:** Place `.tsx` under a feature folder in `src/components/`, mount with `client:*` directive, pass serializable props only
7. **Build for production:** `npm run build` generates optimized site in `dist/`

## Environment Variables

Astro exposes vars prefixed with `PUBLIC_` to client code. Document any new ones in `.env.example`.

| Variable                  | Used by              | Purpose                                                                                                |
| ------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------ |
| `PUBLIC_BACKEND_BASE_URL` | `contact.astro`      | Base URL of the backend that receives contact form submissions. Form posts JSON to `${BASE_URL}/leads`. Falls back to `/api/contact` (404 on the static site) when unset. |

## Build & Deployment Notes

- Astro pre-renders all pages to static HTML by default
- Production site lives in `./dist/` after build
- Environment: Node.js >=22.12.0 required
- Deploys to Cloudflare; configuration lives in `wrangler.jsonc`
- The contact form posts to an external backend (`PUBLIC_BACKEND_BASE_URL`); the site itself ships no server
- `npm run build` is the primary validation step; always run before pushing changes

## Additional Resources

- **AGENTS.md** - Repository guidelines for component organization, naming conventions, and selector preservation
