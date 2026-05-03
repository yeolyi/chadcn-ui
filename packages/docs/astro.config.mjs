import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  adapter: vercel(),
  security: { checkOrigin: false },
  i18n: {
    locales: ["ko", "en"],
    defaultLocale: "ko",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), react()],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [".trycloudflare.com"],
    },
    ssr: {
      noExternal: ["perfect-cursors"],
    },
  },
  server: {
    port: 4000,
    host: true,
  },
})
