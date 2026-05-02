import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Strip only .mdx so the `.ko`/`.en` suffix survives in entry id.
const keepLocaleDot = ({ entry }: { entry: string }) => entry.replace(/\.mdx$/, "")

const variants = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/variants",
    generateId: keepLocaleDot,
  }),
  schema: z.object({
    tagline: z.string(),
  }),
})

// Shared page bodies, one per locale per page (e.g. button.ko.mdx).
// Variant pages render this with the current slug so the page can
// interpolate `{props.slug}` in import paths and demo props.
const pages = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/pages",
    generateId: keepLocaleDot,
  }),
  schema: z.object({}).passthrough(),
})

export const collections = { variants, pages }
