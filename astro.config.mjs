// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
// https://astro.build/config
export default defineConfig({
	site: "https://blog.justfossa.lol",
	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		react(),
		mdx(),
		sitemap({
			xslURL: "/rss.xsl",
		}),
	],
	markdown: {
		remarkPlugins: [remarkGfm, [remarkToc, { maxDepth: 3 }]],
		syntaxHighlight: "shiki",
		shikiConfig: {
			theme: "one-dark-pro",
			wrap: true,
		},
	},
	outDir: "/var/www/blog",
});
