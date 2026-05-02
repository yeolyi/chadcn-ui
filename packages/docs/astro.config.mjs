import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import expressiveCode from "astro-expressive-code"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  i18n: {
    locales: ["ko", "en"],
    defaultLocale: "ko",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    expressiveCode(),
    mdx(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4000,
  },
})
