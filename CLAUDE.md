# chadcn/ui

A parody UI library based on shadcn/ui. Same components, same API, terrible UX
disguised as legitimate features.

## Stack

- **Astro 5** (SSG) + React islands for interactive demos
- **Tailwind v4** via `@tailwindcss/vite`
- **shiki** for code blocks (custom `CodeBlock.astro`, dual theme via media query)
- **MDX** content collections for variant page bodies
- **Radix UI** primitives in `packages/ui`
- **i18n**: Korean default at `/`, English at `/en/` (`prefixDefaultLocale: false`)
- **Theme**: OS preference only — no toggle
- **lucide-react** for all icons

## Project layout

```
packages/
  ui/                              # @chadcn/ui npm package
    src/
      button/
        base.tsx                   # CVA + Radix Slot, no chad behavior
        shy.tsx                    # variant: dodges hover (current escape rename)
        # <slug>.tsx               # one file per variant
      lib/utils.ts                 # cn()
      index.ts                     # top-level Button = first/canonical variant
    tsup.config.ts                 # multi-entry: dist/index + dist/<comp>/<slug>
  docs/                            # Astro site
    src/
      content/
        pages/                     # MDX page bodies (button.<locale>.mdx)
          button.snippets.ts       # code shown in <CodeBlock> (see Footguns)
        config.ts                  # zod schema, custom generateId for .ko/.en
      i18n/
        strings.ts                 # ko + en chrome labels
        locale.ts                  # getLocale, tFor helpers
      layouts/                     # Site, Docs
      pages/                       # ko (default) + en/ mirror, body inline
      components/
        chrome/                    # Site header/footer, mobile nav, icons
        docs/                      # Sidebar, Toc, ExamplePreview, InstallTabs,
                                   #   VariantSelector, CodeBlock
        ui/                        # shadcn primitives (Button) used by chrome
        demos/<comp>/              # variant runtime demos (take {slug})
      lib/
        button-components.ts       # slug → component + variantInfo (tagline,
                                   #   description per locale)
.github/workflows/publish.yml      # OIDC trusted publish on v* tag push
```

## Tone

The single most important rule, and the only one not enforceable by code.

**Every variant is presented as if it were a serious, useful feature.** The
tagline, description, and any prose read like a sincere product pitch — never
break the fourth wall.

- ❌ "도망가는 버튼" / "Catch me if you can"
- ✅ "잘못된 클릭을 막아주는 버튼" / "A button that prevents accidental clicks"

The `slug` (filename, dropdown label) can be playful (`shy`, `whack-a-mole`,
`jealous`) — that's for devs. The user-facing tagline + description must be
deadpan.

## Adding a new Button variant

Mechanical, ~10 minutes:

1. **Library component**: `packages/ui/src/button/<slug>.tsx`
   - Import `ButtonBase` from `./base` so the new variant inherits CVA + Radix
     Slot. Add chad behavior via event handlers / style.
   - Add `"use client"` at top (uses hooks).
2. **Library exports**:
   - `packages/ui/tsup.config.ts` — add `"button/<slug>": "src/button/<slug>.tsx"`
   - `packages/ui/package.json#exports` — add `./button/<slug>` block
3. **Docs map**: `packages/docs/src/lib/button-components.ts`
   - Import the new component
   - Add to `buttonComponents` map (slug → component reference)
   - Add to `variantInfo` map with `tagline` + `description` (both `ko` and
     `en` required — type-enforced)

Routes (`/docs/components/button/<slug>` ko + en), dropdown, sidebar link,
OG image and install command all auto-derive from these. No template edits.

If a new example (not just a variant) is added to the Button page itself,
update `packages/docs/src/content/pages/button.snippets.ts` too — see the MDX
indent footgun below.

## Adding a brand new component (Input, Select, etc.)

The repo currently only has Button. Several pieces are Button-specific and
need generalizing first. Concretely:

- `lib/button-components.ts` — duplicate as `lib/<comp>-components.ts`
- `lib/listButtonSlugs` / `getButtonVariant` — duplicate or generalize via a
  registry indexed by component name
- `components/docs/VariantSelector.astro` — currently calls `listButtonSlugs()`;
  needs a `component` prop to know which list
- `components/docs/Sidebar.astro` — `components` array is hardcoded; add the
  new entry, point to first slug of new component
- `components/chrome/MobileNav.tsx` — same hardcoded list
- `pages/docs/components/<comp>/[variant].astro` (ko + en) — copy from button
  variant route, swap component name, swap `listButtonSlugs` → new helper
- `pages/docs/components/<comp>/index.astro` (ko + en) — redirect to first slug
- `content/pages/<comp>.{ko,en}.mdx` — the shared page body
- `content/pages/<comp>.snippets.ts` — code samples (slug-interpolated)
- `components/demos/<comp>/<Name>.tsx` — runtime demo islands taking `{slug}`

Recommended sequence: first generalize the Button-specific helpers (rename
`listButtonSlugs` to `listSlugsFor("button")` etc.), then add the new component.
Resist creating Button-only abstractions — assume more components will land.

## Release flow

```bash
cd packages/ui
pnpm version minor          # bumps + creates commit + tag (e.g. v0.3.0)
git push --follow-tags
```

GitHub Actions (`.github/workflows/publish.yml`) handles the rest:
- Builds `@chadcn/ui` via tsup
- Publishes to npm via OIDC trusted publishing (no token, signed provenance)
- Creates GitHub release with auto-generated notes

No tokens, no OTP, no manual `npm publish` from local. See **Versioning** for
when to use major/minor/patch.

## Versioning

Pre-1.0 (current; until variant set + API are stable):
- New variant subpath = **MINOR** (0.2.0 → 0.3.0)
- Tweak / bug fix to existing variant = **PATCH** (0.3.0 → 0.3.1)
- Renames and removals are also fine inside pre-1.0 — bump as MINOR or PATCH
  depending on scope, no need to jump to 1.0.0 just to flag breakage

After 1.0.0 (API frozen):
- New variant = MINOR (1.1.0)
- Bug fix = PATCH (1.1.1)
- Breaking change = MAJOR (2.0.0)

## Footguns

These will silently break things if you don't know them.

### Demo hydration: pass `slug`, not `Button`

Astro serializes island props as JSON; functions/components can't cross that
boundary. Demos that take `Button` as a prop hydrate to nothing — button
disappears with no error.

Demos take `{ slug: string }` and look up the component from
`buttonComponents` at runtime.

### Displayed code is built as strings, not from runtime files

Runtime demo files use `{ slug }` + `buttonComponents` lookup for hydration.
Users would be confused seeing that boilerplate. The MDX page imports
`buttonSnippets(slug)` from `content/pages/button.snippets.ts` — that
function returns idiomatic standalone code with `${slug}` interpolated into
the import path.

So the user viewing the `shy` page sees
`import { Button } from "@chadcn/ui/button/shy"` — what they'd actually write.

### MDX strips indent in multi-line template literals

Upstream MDX bug ([mdx-js/mdx#2533](https://github.com/mdx-js/mdx/issues/2533)
family): a template literal embedded directly in an MDX JSX expression
(`<CodeBlock code={`...`} />`) gets its leading whitespace flattened.

**Workaround**: keep multi-line code samples in a sibling `.snippets.ts`
module — JS literals are untouched by MDX. Pass via
`code={buttonSnippets(slug).foo}`. Single-line snippets are safe inline.
Don't try to upstream-patch — the bug lives deep in MDX deps.

### Demo labels stay in English regardless of locale

Demo button text stays English (`"Button"`, `"Default"`) on Korean pages too.
Matches shadcn convention. Only docs chrome (headings, paragraphs) is localized.

### Both locales required for every variant

`tagline` + `description` in `lib/button-components.ts` must have both `ko`
and `en` — TypeScript enforces it. No fallback path.

For shared page bodies (`content/pages/button.{ko,en}.mdx`) both files must
exist or the variant pages won't build for the missing locale.

### Icons: lucide-react only

Use `lucide-react` for any icon, including inside `.astro` files (Astro
renders React components to static HTML at SSG, no `client:*` directive
needed). The only inline-SVG exception is the chad logo in
`components/chrome/icons.tsx`.

### asChild + multi-child label

`ButtonBase` uses Radix `Slot.Root` when `asChild` is true, and Slot enforces
`React.Children.only` on the element it wraps. This means **any variant that
wants to render more than one child inside the button** (e.g. an icon + label,
a progress overlay + label, a badge + label, a flip-card front+back) **will
crash with `React.Children.only` whenever the consumer uses `asChild`** — the
extra children land directly under Slot, which then sees an array.

The fix in every such variant:

1. Destructure `asChild` from the variant's props
2. Build the multi-child content as a fragment (or array) in a local var
3. If `asChild && React.isValidElement(children)`, clone the user-provided
   element and inject the multi-child content as **its** children — that way
   the cloned element is still a single React element when handed to Slot
4. Otherwise (regular button), pass the multi-child content directly

```tsx
const inner = (
  <>
    <Overlay />
    <Label>{counting ? "9.8s" : labelText}</Label>
  </>
)

const buttonChildren =
  asChild && React.isValidElement(children)
    ? React.cloneElement(children, undefined, inner)
    : inner

return (
  <ButtonBase asChild={asChild} ...>
    {buttonChildren}
  </ButtonBase>
)
```

Reference variants that already do this: `sponsored.tsx`, `assemble.tsx`,
`patient.tsx`. Copy the pattern. The error only shows up at SSR/hydrate time
of the `ButtonAsChild` demo, so it's easy to ship a regression — always check
the asChild example after touching label rendering in a variant.

### Don't reintroduce a theme toggle

Theme follows `prefers-color-scheme` only. CSS uses `@media` queries for
dark colors; shiki uses dual theme via the same media query. Adding a class
toggle requires changes in lockstep across globals.css, the shiki dual-theme
config, and probably HTML head — easy to half-do.

## Backup

Pre-Astro Next.js implementation lives on the `backup/nextjs-docs` branch.
Reference for original copy when needed.
