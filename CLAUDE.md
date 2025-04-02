# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm astro ...` - Run Astro CLI commands

## Code Style Guidelines
- **Formatting**: Use consistent indentation (2 spaces) and follow Astro component structure (frontmatter/markup)
- **TypeScript**: Enable strictNullChecks; use interfaces for component props
- **Imports**: Use aliased imports (@components, @layouts, @utils, etc.) defined in tsconfig.json
- **Naming**: Use PascalCase for components, camelCase for variables/functions, UPPER_CASE for constants
- **Components**: Define props interfaces at the top of frontmatter; use class:list for conditional classes
- **Tailwind**: Use Tailwind classes for styling; custom colors are defined in tailwind.config.mjs
- **Error Handling**: Provide fallbacks for optional props with default values

Always check existing code patterns in similar files when making changes. This is an Astro project with TailwindCSS for styling.