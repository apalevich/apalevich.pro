// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://apalevich.pro",
	integrations: [mdx(), sitemap(), tailwind()],
	experimental: {
		svg: true,
	},
});
