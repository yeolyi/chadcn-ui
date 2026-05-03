import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "button/shy": "src/button/shy.tsx",
    "button/thanos": "src/button/thanos.tsx",
    "button/thanos2": "src/button/thanos2.tsx",
    "button/mash": "src/button/mash.tsx",
    "button/minesweeper": "src/button/minesweeper.tsx",
    "button/flinch": "src/button/flinch.tsx",
    "button/sponsored": "src/button/sponsored.tsx",
    "button/gacha": "src/button/gacha.tsx",
    "button/paranoia": "src/button/paranoia.tsx",
    "button/anchor": "src/button/anchor.tsx",
    "button/benjamin": "src/button/benjamin.tsx",
    "button/lottery": "src/button/lottery.tsx",
    "button/clingy": "src/button/clingy.tsx",
    "button/assemble": "src/button/assemble.tsx",
    "button/mirage": "src/button/mirage.tsx",
    "button/aloof": "src/button/aloof.tsx",
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
