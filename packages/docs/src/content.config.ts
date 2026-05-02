import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const variants = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/variants",
    // Default generateId slugifies the dot in `escape.ko.mdx` away, breaking
    // our locale convention. Strip only the .mdx extension, keep the dot.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    instagramUrl: z.string().url().optional(),
  }),
})

export const collections = { variants }
