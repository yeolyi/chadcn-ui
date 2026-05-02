import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "button/escape": "src/button/escape.tsx",
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
