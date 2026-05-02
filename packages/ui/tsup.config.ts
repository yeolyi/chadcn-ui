import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "button/shy": "src/button/shy.tsx",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  clean: true,
  external: ["react", "react-dom", "radix-ui", "lucide-react", "cmdk"],
  banner: {
    js: '"use client";',
  },
})
