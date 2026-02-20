# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio/marketing website built with **Astro** v5 based on the Astroship starter template. It's customized with a personal branding (APalevich.Pro) for showcasing technical solutions for marketing leaders.

**Key Site Details:**
- Site URL: https://apalevich.pro
- Built with: Astro, TailwindCSS, MDX
- Package Manager: pnpm (recommended, but npm/yarn also work)
- Node/npm requirement: `.npmrc` has `engine-strict=true`

## Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:4321)
npm run build        # Production build
npm run preview      # Preview built site locally

# Package management
npm install          # Install dependencies

# Astro utilities
npm run astro add    # Add new Astro integrations
npm run astro [cmd]  # Run other Astro CLI commands
```

The project recommends **pnpm** for disk space efficiency, but npm works fine. Dev server automatically tries different ports if 4321 is in use.

## Project Architecture

### Directory Structure

```
src/
├── (components)/        # New Astro route groups - shared components with naming convention
├── (layouts)/          # New Astro route groups - layout components
├── (pages)/            # New Astro route groups - website pages
├── (styles)/           # Global styles directory
├── components/         # Legacy components (being phased out)
├── layouts/            # Legacy layouts (being phased out)
├── pages/              # Legacy pages (being phased out)
├── content/            # Content collections
│   ├── blog/          # Blog posts (markdown/mdx)
│   ├── team/          # Team member data
│   ├── config.ts      # Content collection schemas
│   └── LandingCopy.ts # Landing page copy constants
├── images/            # Image assets and icons
├── utils/             # Utility functions
├── interfaces/        # TypeScript interfaces
├── consts.ts          # Global constants (SITE_TITLE, SITE_DESCRIPTION)
└── env.d.ts           # Astro environment type declarations
```

**Important Note:** The project is in transition between two organizational patterns. New work should use parentheses-based route groups `(components)/`, `(layouts)/`, `(pages)/` rather than the flat structure. Both currently coexist.

### Core Integrations & Features

1. **TailwindCSS** - Utility-first CSS
   - Custom color palette: `primary` (dark red) and `secondary` (teal)
   - Custom fonts: Bricolage Grotesque Variable, Inter Variable
   - Typography plugin enabled

2. **Content Collections** (Astro 3+)
   - `blog` - Blog posts with draft status, tags, categories
   - `team` - Team member profiles
   - Schema validation via Zod

3. **MDX** - Markdown with JSX components in pages
4. **Sitemap** - Auto-generated XML sitemap
5. **Astro Icons** - Icon library integration

### Path Aliases

Configured in `tsconfig.json` for cleaner imports:
```typescript
@lib/*        → src/lib/*
@utils/*      → src/utils/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@assets/*     → src/assets/*
@pages/*      → src/pages/*
```

### Routing

Astro routes are file-based:
- Files in `src/pages/` (or `src/(pages)/`) become routes
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/(pages)/blog/[...slug].astro` → Dynamic blog routing

## Configuration Files

- **astro.config.mjs** - Astro configuration with integrations
- **tailwind.config.mjs** - TailwindCSS customization (colors, fonts)
- **tsconfig.json** - TypeScript config with strict null checks and path aliases
- **.prettierrc.json** - Code formatting (2-space tabs, no semicolons on same line)

## Code Style

- **Formatting**: Prettier with custom config (2-space indentation, `bracketSameLine: true`)
- **TypeScript**: Strict null checks enabled
- **No ESLint/Stylelint**: Not configured in this project

## Important Known Issues & Patterns

### GithubWidget Component
The `src/(components)/GithubWidget.astro` component has optional chaining in script blocks. If modifying this file, ensure proper null-checking instead of using `?.` on assignment targets (e.g., `document.getElementById("message")?.innerHTML =` is invalid syntax).

### Component Duplication
Both `src/(components)/` and `src/components/` may contain similar components. This is due to design updates. Prefer using parentheses-based versions for new work.

## Content Management

### Adding Blog Posts
1. Create `.md` or `.mdx` file in `src/content/blog/`
2. Include required frontmatter: `draft`, `title`, `snippet`, `image` (src/alt), `publishDate`, `author`, `category`, `tags`
3. Query with `getCollection('blog')` in pages

### Adding Team Members
1. Create file in `src/content/team/`
2. Include: `draft`, `name`, `title`, `avatar` (src/alt), `publishDate`

## Deployment

The project includes deployment utilities:
- `deploy.sh` - Deployment script
- `rollback.sh` - Rollback script

Reference these for deployment procedures.

## Static Assets

Place images and static files in the `public/` directory. They're served at the root of the site.
