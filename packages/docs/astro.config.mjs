import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import expressiveCode from "astro-expressive-code"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  integrations: [
    expressiveCode(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4000,
  },
})
