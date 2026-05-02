# chadcn/ui

A parody UI library based on shadcn/ui. Same components, same API, terrible UX
disguised as legitimate features.

## Tone & Editorial Voice

This is the most important rule and easiest to miss in code review.

**Every chad component is presented as if it were a serious, useful feature.**
The page subtitle, body copy, even the docs prose should sound like a sincere
product pitch — never break the fourth wall by saying "this button runs away".

Examples of the right tone:
- ❌ "도망가는 버튼" / "Catch me if you can"
- ✅ "잘못된 클릭을 막아주는 버튼" / "A button that prevents accidental clicks"

When you write copy for a new variant:
- Tagline: deadpan feature description, like a Notion/Linear changelog entry
- Body: explain what it does technically, but framed as benefit (not joke)
- The component name (slug) can be playful (`escape`, `whack-a-mole`, `jealous`) —
  the slug is for devs, the user-facing copy is the disguise

## Stack

- **Astro 5** (SSG) + React islands for interactive demos
- **Tailwind v4** via `@tailwindcss/vite`
- **expressive-code** for code blocks (uses `prefers-color-scheme` media query
  for theme switching — no class toggle)
- **Radix UI** primitives
- **i18n**: Korean default at `/`, English at `/en/` (`prefixDefaultLocale: false`)
- **Theme**: OS preference only via `@media (prefers-color-scheme: dark)` — no
  toggle UI

## Project Structure

```
packages/
  ui/                              # @chadcn/ui npm package
    src/
      button/
        base.tsx                   # CVA + Radix Slot, no chad behavior
        escape.tsx                 # base + escape behavior (hover dodge)
        # <slug>.tsx               # one file per variant
      lib/utils.ts                 # cn()
      index.ts                     # top-level exports (Button = escape alias)
    tsup.config.ts                 # multi-entry: dist/index + dist/button/<slug>
  docs/                            # Astro docs site
    src/
      content/variants/<component>/<slug>.<locale>.mdx
      content.config.ts            # zod schema, custom generateId preserves dot
      i18n/strings.ts              # ko + en string catalog
      layouts/                     # Site, Docs
      page-bodies/                 # shared bodies for ko + en route shims
      pages/
        <route>.astro              # ko (default), 5-line shim → page-body
        en/<route>.astro           # en mirror, same shim
      demos/button/<Name>.tsx      # take {slug}, look up Button from map
      lib/
        button-components.ts       # static slug → Button component map
        variants.ts                # parseVariantId, listVariantsForComponent
        types.ts                   # ButtonComponent type
      components/
        Sidebar, SiteHeader, SiteFooter, Toc, ExamplePreview, ...
        VariantSelector.astro      # top-right dropdown on variant pages
        LocaleSwitcher.astro       # 한 / EN
```

## Conventions Not Visible From Code

### Astro hydration boundary

**Demos must NOT take `Button` (a function/component) as prop.** Astro
serializes island props via JSON; functions can't cross that boundary, the
island silently fails to mount, the button vanishes.

Instead demos take `{ slug: string }` and look up the component from
`buttonComponents` map at runtime. The slug is serializable.

```tsx
// ✅ Correct
export function ButtonMain({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return <Button>Click</Button>
}
```

### Demo source displayed in docs

Demos are imported as `?raw` strings and shown via expressive-code `<Code/>`.
The displayed code IS the demo file content — including the `slug` parameter.
That's fine for chadcn's audience (looking at structure, not copy-pasting).

### Demo labels are universal English

Even on Korean pages, demo button labels stay English (`"Button"`, `"Default"`).
Matches shadcn convention. Only docs chrome (headings, paragraphs) is localized.

### MDX locale convention

Files: `<slug>.<locale>.mdx`. Korean is required (`escape.ko.mdx`); English is
optional (`escape.en.mdx`). When `.en.mdx` is missing, the English page falls
back to Korean content with a banner ("This entry is only available in Korean").

`content.config.ts` uses a custom `generateId` so the locale dot survives
Astro's default slugifier (which would turn `escape.ko` into `escapeko`).

### Variant URLs always include slug

The sidebar/header/mobile-nav link **directly** to
`/docs/components/button/<first-variant-slug>`, never to
`/docs/components/button`. The latter exists as a redirect to the first variant
but causes a visible flash. Compute `buttonVariants[0].slug` at build time and
use it in nav links.

### `tagline` vs `slug` in MDX frontmatter

Two distinct concepts:
- `slug` (filename) — short identifier shown in dropdown (`escape`)
- `tagline` (frontmatter) — descriptive subtitle in deadpan-product tone
  (`잘못된 클릭을 막아주는 버튼`)

Author/credit fields are intentionally absent — the project doesn't credit
individual variants on the page.

### Top-level Button is the escape alias

`import { Button } from "@chadcn/ui"` resolves to the escape variant for
backward compatibility. Explicit subpath imports
(`import { Button } from "@chadcn/ui/button/escape"`) are preferred but both work.

### Build chain

`packages/docs` build script runs `pnpm -F @chadcn/ui build` first because docs
imports the lib's `dist/`. CI builds will fail otherwise — `dist/` is not
checked in.

### Theme follows OS, no toggle

There is no light/dark toggle button. CSS variables are gated by
`@media (prefers-color-scheme: dark)`. expressive-code uses its default
`useDarkModeMediaQuery: true`. Don't reintroduce a `.dark` class system.

### Page bodies for ko/en parity

Each shared page (Landing, Installation, etc.) has the body in
`src/page-bodies/<Name>.astro`. The `pages/<path>.astro` and
`pages/en/<path>.astro` are 5-line shims that just `<Body />`. The body reads
`Astro.currentLocale` and routes copy through `t(locale)` from
`src/i18n/strings.ts`.

## Adding a New Button Variant

1. **Library**: create `packages/ui/src/button/<slug>.tsx` using `ButtonBase`
   from `./base`. Add chad behavior in event handlers / `style`.
2. **Library exports**: add entry to `packages/ui/tsup.config.ts` and a subpath
   to `packages/ui/package.json#exports`.
3. **Library top-level**: leave `src/index.ts` alone (it aliases `escape` only).
4. **Build lib**: `pnpm -F @chadcn/ui build` (the docs build does this anyway).
5. **Docs map**: add the new component to
   `packages/docs/src/lib/button-components.ts`.
6. **MDX (Korean, required)**: `src/content/variants/button/<slug>.ko.mdx`
   ```yaml
   ---
   tagline: <feature-pitch one-liner>
   ---

   <body — describe behavior as a feature, deadpan>
   ```
7. **MDX (English, optional)**: same with `<slug>.en.mdx`.
8. Done. Routes, dropdown entry, sidebar link, OG, install command (`pnpm add
   @chadcn/ui/button/<slug>`) all auto-update from these files.

## Commands

```bash
pnpm dev              # docs dev (port 4000)
pnpm build            # docs build (also builds @chadcn/ui first)
pnpm -F @chadcn/ui build   # lib only
```

## Backup

Pre-Astro Next.js implementation lives on the `backup/nextjs-docs` branch.
Reference for original English/Korean copy and shadcn-style component pages.
