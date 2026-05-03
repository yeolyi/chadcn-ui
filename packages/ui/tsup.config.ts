import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "button/shy": "src/button/shy.tsx",
    "button/thanos": "src/button/thanos.tsx",
    "button/thanos2": "src/button/thanos2.tsx",
    "button/mash": "src/button/mash.tsx",
    "button/minesweeper": "src/button/minesweeper.tsx",
    "button/freeze": "src/button/freeze.tsx",
    "button/sponsored": "src/button/sponsored.tsx",
    "button/gacha": "src/button/gacha.tsx",
    "button/paranoia": "src/button/paranoia.tsx",
    "button/page": "src/button/page.tsx",
    "button/benjamin": "src/button/benjamin.tsx",
    "button/lottery": "src/button/lottery.tsx",
    "button/follow": "src/button/follow.tsx",
    "button/drag": "src/button/drag.tsx",
    "button/mirage": "src/button/mirage.tsx",
    "button/dodge": "src/button/dodge.tsx",
    "button/patient": "src/button/patient.tsx",
    "button/baljak": "src/button/baljak.tsx",
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
