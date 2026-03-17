# chadcn/ui

A parody UI library based on shadcn/ui. Same components, same API, terrible UX.

## Project Structure

```
packages/
  ui/           # @chadcn/ui npm package (chad components)
    src/
      button.tsx    # Chad Button (runs away from cursor)
      input.tsx     # Chad Input (types random characters)
      select.tsx    # Chad Select (shuffles options, wrong selection)
      lib/utils.ts  # cn() utility
      index.ts      # Barrel export
    tsup.config.ts  # Build config (ESM + CJS + DTS)
  docs/         # Documentation site (Next.js 16, forked from shadcn/ui)
    app/(app)/
      (root)/       # Landing page with component showcase
      docs/         # English docs
      ko/docs/      # Korean docs
    components/
      ui/               # shadcn components installed via CLI (for docs UI only)
      code-block.tsx     # Syntax highlighted code (shiki)
      install-tabs.tsx   # pnpm/npm/yarn/bun tabs (based on original shadcn code-block-command.tsx)
      copy-button.tsx    # Copy to clipboard button (based on original shadcn copy-button.tsx)
      example-preview.tsx # Component preview with View Code (based on original component-preview-tabs.tsx)
      docs-sidebar.tsx   # Sidebar (locale-aware)
      locale-switcher.tsx # EN/KO toggle
      toc.tsx            # Table of contents (scroll-based active tracking)
```

## Adding a New Chad Component

1. **Get the original shadcn source** from [github.com/shadcn-ui/ui](https://github.com/shadcn-ui/ui) at `apps/v4/registry/new-york-v4/ui/<component>.tsx`. A reference clone is at `~/Developer/shadcn-reference/`.

2. **Copy to `packages/ui/src/<component>.tsx`** and modify:
   - Change `@/lib/utils` to `./lib/utils`
   - Change any `@/components/ui/X` inter-component imports to `./X`
   - Add "use client" if using hooks
   - Add the chad behavior (the fun part)
   - Keep the exact same props/API as the original

3. **Export from `packages/ui/src/index.ts`**

4. **Install shadcn version in docs** for docs UI usage:
   ```bash
   cd packages/docs
   pnpm dlx shadcn@latest add <component> --overwrite
   ```

5. **Create demo components** at `packages/docs/app/(app)/docs/components/<component>/demos.tsx`:
   - "use client" component
   - Import the chad version from `@chadcn/ui`
   - Other supporting components (Field, Badge etc.) from `@/components/ui/` (shadcn originals)
   - **Must match the original shadcn docs examples exactly** — same text, same component composition, same props. Only add chadcn-specific content (like "How it works" section).
   - Reference the original at `~/Developer/shadcn-reference/apps/v4/registry/new-york-v4/examples/` or via https://ui.shadcn.com/docs/components/radix/<component>

6. **Create Korean demo components** at `packages/docs/app/(app)/ko/docs/components/<component>/demos.tsx`:
   - Separate file with translated text (labels, placeholders, descriptions)
   - Code stays in English, UI text in Korean

7. **Create doc pages** (async server components):
   - English: `packages/docs/app/(app)/docs/components/<component>/page.tsx`
   - Korean: `packages/docs/app/(app)/ko/docs/components/<component>/page.tsx`
   - Use `ExamplePreview` with `code` prop (CodeBlock) for each example — matches shadcn's "View Code" pattern
   - Use `InstallTabs` for installation section
   - **Page structure must match the original shadcn docs**: same sections, same headings, same example order. Only additions are the "How it works" section explaining chad behavior.
   - Use `createMetadata` from `@/lib/og` for OG images

8. **Update sidebar** in `packages/docs/components/docs-sidebar.tsx` (add to both `en` and `ko` nav)

9. **Rebuild @chadcn/ui**: `cd packages/ui && pnpm build`

## Doc Page Content Rules

- **Match shadcn exactly** for all shared content: example names, descriptions, code samples, API reference tables
- **Add only chadcn-specific sections**: "How it works" (right after the main demo)
- **Do not add or remove examples** that exist in the original — if shadcn has "Disabled", "Invalid", "File" examples, include them all
- **Use original component text** in examples: e.g. shadcn Input demo says "Your API key is encrypted and stored securely." — keep that exact text
- **Reference `~/Developer/shadcn-reference/`** for original source code and content

## Key Design Decisions

- **Docs UI uses original shadcn** (from `@/components/ui/`), demos use `@chadcn/ui`
- **No Fumadocs/MDX** — plain TSX pages with shiki for syntax highlighting
- **No registry system** — shadcn components installed via CLI as normal dependency
- **@chadcn/ui is self-contained** — no `@/` path aliases, all deps bundled
- **Korean docs** at `/ko/docs/...` — same layout, separate demo files with translated text
- **Shared components** (ExamplePreview, InstallTabs, CopyButton) are based on shadcn originals to match design exactly

## Commands

```bash
pnpm dev              # Start docs dev server (port 4000)
pnpm build            # Build docs site
cd packages/ui
pnpm build            # Build @chadcn/ui package
```

## Chad Behavior Guidelines

Each chad component should:
- Accept the exact same props as the shadcn original
- Look visually identical
- Have one or more "chad" behaviors that make it harder to use
- Be funny, not malicious (no data destruction, no infinite loops)
- Maintain the same TypeScript types for IDE compatibility
