import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "button/shy": "src/button/shy.tsx",
    "button/thanos": "src/button/thanos.tsx",
    "button/mash": "src/button/mash.tsx",
    "button/minesweeper": "src/button/minesweeper.tsx",
    "button/flinch": "src/button/flinch.tsx",
    "button/sponsored": "src/button/sponsored.tsx",
    "button/gacha": "src/button/gacha.tsx",
    "button/paranoia": "src/button/paranoia.tsx",
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
