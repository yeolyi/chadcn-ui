import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// One MDX per page per locale (e.g. button.ko.mdx, button.en.mdx).
// Variant pages render this with the current slug so the page can
// interpolate `{props.slug}` in import paths and demo props.
const pages = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/pages",
    // Strip only .mdx so the `.ko`/`.en` suffix survives in entry id.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: z.object({}).passthrough(),
})

export const collections = { pages }
