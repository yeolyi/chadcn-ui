# chadcn/ui

A parody UI library based on shadcn/ui. Same components, same API, terrible UX
disguised as legitimate features.

## Tone

The single most important rule, and the only one not enforceable by code.

**Every variant is presented as if it were a serious, useful feature.** Subtitle,
body copy, docs prose all read like a sincere product pitch — never break the
fourth wall.

- ❌ "도망가는 버튼" / "Catch me if you can"
- ✅ "잘못된 클릭을 막아주는 버튼" / "A button that prevents accidental clicks"

The `slug` (filename, dropdown label) can be playful (`escape`,
`whack-a-mole`) — that's for devs. The user-facing `tagline` and body must be
deadpan.

## Footguns

These will silently break things if you don't know them.

### Hydration: pass `slug`, not `Button`

Astro serializes island props as JSON; functions/components can't cross that
boundary. Demos that take `Button` as a prop hydrate to nothing — button
disappears with no error.

Demos take `{ slug: string }` and look up the component from
`buttonComponents` at runtime.

### Displayed code != runtime code

Runtime demo files use `{ slug }` + `buttonComponents` lookup for hydration.
The code shown in `<Code/>` blocks must NOT include this — users would see
internal docs plumbing. The page-body file builds the displayed code as
template strings with the variant slug interpolated into the import path:

```ts
const importPath = `@chadcn/ui/button/${slug}`
const mainSrc = `import { Button } from "${importPath}"
...
export function ButtonDemo() { ... }`
```

So a user viewing `whack-a-mole` sees `import { Button } from
"@chadcn/ui/button/whack-a-mole"` — the idiomatic standalone code they
would actually write.

### Demo labels are English regardless of locale

Demo button text stays English (`"Button"`, `"Default"`) even on Korean pages.
Matches shadcn convention. Only docs chrome (headings, paragraphs) is localized.

### MDX multi-line template literals strip indent

Upstream MDX bug ([mdx-js/mdx#2533](https://github.com/mdx-js/mdx/issues/2533)
family): a template literal embedded in a JSX expression
(`<CodeBlock code={`...`} />`) gets its leading whitespace re-flowed
across parse cycles. Result: the displayed code shows wrong indent.

**Workaround**: keep multi-line code samples in a sibling `.snippets.ts`
module (e.g. `content/pages/button.snippets.ts`) as plain JS template
literals — JS code is untouched by MDX. Import into MDX and pass via
`code={buttonSnippets(slug).foo}`. Single-line snippets are safe inline.
Do not try to upstream-patch — the bug is in deep MDX deps and not worth
the maintenance burden at this scale.

### Both locales required for every variant

When you add a variant, both `ko` and `en` strings (tagline + description in
`lib/button-components.ts`) are mandatory — the type system enforces it. No
fallback path. Same goes for `content/pages/button.{ko,en}.mdx`: both must
exist.

### Sidebar links go straight to a variant slug

Never link to `/docs/components/button` from chrome — it redirects to the
first variant and the flash is visible. Compute the first variant slug at
build time and link to `/docs/components/button/<slug>` directly.

### Icons: lucide-react only

Use `lucide-react` for any icon — including inside `.astro` files (Astro
renders React components to static HTML at SSG, no `client:*` needed).
The only inline-SVG exception is the chad logo in
`components/chrome/icons.tsx`; nothing else in lucide.

### Don't reintroduce a theme toggle

Theme is OS-only by design. If you add a `.dark` class system the
expressive-code config and the globals.css media queries will both have to
change in lockstep — easy to half-do.

## Versioning (`@chadcn/ui`)

Pre-1.0 phase (until variant set + API are stable):
- New variant subpath = MINOR bump (0.1.0 → 0.2.0)
- Tweak/fix to existing variant = PATCH (0.2.0 → 0.2.1)
- Removing/renaming a variant or changing the top-level Button alias =
  jump to 1.0.0 to flag the breaking change

After 1.0.0 (API frozen):
- New variant = MINOR (1.1.0)
- Bug fix = PATCH (1.1.1)
- Breaking change = MAJOR (2.0.0)

Each variant addition is its own version + git tag + GitHub release.

## Adding a New Button Variant

1. `packages/ui/src/button/<slug>.tsx` using `ButtonBase`
2. Entry in `tsup.config.ts` + subpath in `package.json#exports`
3. Add to `packages/docs/src/lib/button-components.ts`
4. `packages/docs/src/content/variants/button/<slug>.ko.mdx` with `tagline`
5. (optional) `<slug>.en.mdx`

Routes, dropdown, sidebar link, install command all auto-update.

## Backup

Pre-Astro Next.js implementation lives on the `backup/nextjs-docs` branch.
Reference for original copy when needed.
