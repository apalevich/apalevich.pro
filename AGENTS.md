# Repository Guidelines

## Project Structure & Module Organization

- `src/pages/` holds Astro routes. `src/pages/index.astro` composes the homepage from reusable sections.
- `src/components/` contains shared UI and page sections. Keep reusable primitives in `src/components/ui/`, layout wrappers in `src/components/layout/`, and page-specific sections in `src/components/home/`.
- `src/data/` stores copy and structured content, such as `src/data/homepage.json`.
- `src/styles/global.css` is the Tailwind entry point and holds shared base/component styles.
- `public/` contains static assets. Keep image and icon paths stable because sections reference them directly.
- `tailwind.config.mjs` defines project tokens such as colors, fonts, radius, and container sizing.

## Build, Test, and Development Commands

- `npm run dev` starts the Astro dev server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves the built output locally.
- `npm run astro` exposes the Astro CLI for framework-specific commands.

## Coding Style & Naming Conventions

- Use ES modules and Astro components with frontmatter for data imports.
- Prefer ASCII file names and descriptive component names, for example `SiteHeader.astro`, `HeroSection.astro`, `SectionHeading.astro`.
- Keep copy out of markup when it can live in JSON. Keep styling tokens in Tailwind config rather than repeating arbitrary values.
- Use two-space indentation and the repo’s existing utility-first Tailwind style.

## Testing Guidelines

- There is no dedicated test suite in this repository. Use `npm run build` as the primary validation step.
- After structural changes, verify the homepage in browser and check interactive hooks such as the mobile menu and counter-up sections.

## Commit & Pull Request Guidelines

- No Git history is available in this workspace, so there is no verified project-wide commit convention.
- Use short, imperative commit messages with a scoped subject, for example `refactor homepage sections` or `add shared button component`.
- Pull requests should summarize the change, list affected routes/components, and include screenshots for visual updates. Mention any new data files or token changes explicitly.

## Agent Notes

- Preserve existing selectors used by legacy scripts, especially `mobile-menu-trigger`, `menu-block`, `menu-overlay`, and `data-module="countup"`.
- Prefer small, reusable components over page-local duplication.
