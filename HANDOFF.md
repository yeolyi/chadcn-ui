# Handoff: chadcn/ui

## Goal

Build **chadcn/ui** — a parody UI library based on shadcn/ui. Same components, same API, terrible UX. The project is a fork of shadcn/ui with a documentation site and an npm-publishable package (`@chadcn/ui`).

## Current Progress

### Project Structure (complete)
```
packages/
  ui/              # @chadcn/ui npm package
    src/
      button.tsx   # Chad: runs away from cursor (3 attempts), then stops
      input.tsx    # Chad: 5% random digit, type inversion (password↔text), 10% blur clear
      select.tsx   # Chad: shuffles items within groups, 15% wrong selection
      checkbox.tsx, command.tsx, dialog.tsx, dropdown-menu.tsx,
      popover.tsx, radio-group.tsx, slider.tsx, switch.tsx,
      textarea.tsx, tooltip.tsx   # Re-exported from shadcn (chad behavior TBD)
    tsup.config.ts
  docs/            # Documentation site (Next.js 16, Turbopack)
    app/(app)/
      (root)/      # Landing page with component showcase
      docs/        # English docs (15 pages)
      ko/          # Korean docs (16 pages including /ko root)
    components/
      ui/          # shadcn components via CLI (for docs UI)
      code-block.tsx, copy-button.tsx, example-preview.tsx,
      install-tabs.tsx, docs-sidebar.tsx, toc.tsx, locale-switcher.tsx
```

### What's Done
- **13 components** in @chadcn/ui (3 chad + 10 re-exported)
- **30 doc pages** (15 EN + 15 KO) with demos, ExamplePreview/View Code, InstallTabs, syntax highlighting (shiki), TOC
- **Korean i18n** — separate demo files with translated text, locale switcher in header
- **Root showcase** — original shadcn component demos, imports from @chadcn/ui where available
- **Biome** lint/format configured, passing clean
- **Cleanup** — removed Fumadocs, registry system, 570K+ lines of dead code. Project is ~140 files total
- **Reference repo** cloned at `~/Developer/shadcn-reference/` for comparing with original shadcn

### Git History (key commits)
```
99096b5  Add documentation for 10 new components (EN+KO)
99c108c  Add 10 new components to @chadcn/ui
d395f1a  Adjust chad behaviors for all 3 components
837c870  Add biome, clean .env, fix all lint issues
b2f78bc  Remove unused deps and configs
422f00c  Apply ExamplePreview to all pages, clean up project
42b9fba  Match original shadcn component designs exactly
5b4ac4e  Clean up project: rename, remove unused files and deps
e24fe24  Remove registry system, use shadcn as normal dependency
3da73d6  Remove Fumadocs, simplify docs to plain TSX pages
b89a244  Fork shadcn/ui as chadcn/ui with 3 chad components
```

## What Worked

- **Forking shadcn/ui** and stripping down worked much better than building from scratch — got the exact same design system for free
- **Plain TSX pages** instead of Fumadocs/MDX — simpler, no auto-generated files breaking
- **shadcn CLI** (`pnpm dlx shadcn@latest add <component>`) for docs UI components — clean separation from @chadcn/ui
- **ExamplePreview** component with View Code overlay matches shadcn original design (gradient + button pattern from `component-preview-tabs.tsx`)
- **InstallTabs** based on original `code-block-command.tsx` — uses shadcn Tabs component
- **Separate Korean demo files** — avoids prop drilling for translations
- **Reference repo** at `~/Developer/shadcn-reference/` — essential for matching original content exactly
- **Parallel agents** for creating multiple doc pages simultaneously

## What Didn't Work

- **Building from scratch** (first attempt) — too much work to match shadcn's design
- **Fumadocs** — added complexity, auto-generated `.source/index.ts` broke on every file change
- **Registry system** — massive overhead (170K+ lines), unnecessary without CLI
- **sed for bulk import changes** — broke `"use client"` directives and `})` closings. Use node scripts or manual edits instead
- **Re-exporting ALL shadcn components** from @chadcn/ui at once — too many inter-dependencies and TS errors. Better to add incrementally
- **Putting `"use client"` on button.tsx** — broke `buttonVariants` for server components. Solved by keeping chad behavior in the same file but accepting the trade-off
- **`@/registry/` paths** — caused issues everywhere. Use `@/components/ui/` (shadcn CLI) + `@chadcn/ui` (chad package) pattern

## Next Steps

### High Priority
1. **Add chad behavior to 10 re-exported components** — checkbox (random toggle), switch (delayed revert), slider (value drift), textarea (random chars), radio-group (wrong selection), dropdown-menu (shuffle), command (shuffled results), popover (offset position), tooltip (wrong text)
2. **Match original shadcn docs exactly** for each component — reference `~/Developer/shadcn-reference/` and https://ui.shadcn.com/docs/components/radix/<component>. Current new docs are simplified; they need the same examples/text as original
3. **npm publish test** — verify `@chadcn/ui` publishes correctly and works in a fresh Next.js project

### Medium Priority
4. **Add more components** — badge, avatar, card, separator, skeleton, tabs, label, etc. (currently only in docs UI, not in @chadcn/ui)
5. **Root showcase** — replace remaining `@/components/ui/` imports with `@chadcn/ui` as components are added
6. **Code highlighting dark mode** — verify shiki dark theme works correctly (uses `--shiki-dark` CSS variable)
7. **Mobile responsive** — docs sidebar is hidden on mobile, no hamburger menu

### Low Priority
8. **Deploy** — Vercel deployment for docs site
9. **GitHub repo setup** — public repo, CI/CD, npm publish workflow
10. **More i18n** — consider other languages

## Commands
```bash
pnpm dev              # Docs dev server (port 4000)
pnpm build            # Build docs
pnpm lint             # Biome check
pnpm lint:fix         # Biome auto-fix
cd packages/ui && pnpm build  # Build @chadcn/ui package
```

## Key Files
- `CLAUDE.md` — detailed project guide for AI agents
- `biome.json` — lint/format config
- `packages/ui/src/index.ts` — all @chadcn/ui exports
- `packages/docs/components/docs-sidebar.tsx` — sidebar nav (update when adding components)
- `packages/docs/components/example-preview.tsx` — View Code overlay component
- `~/Developer/shadcn-reference/` — original shadcn/ui source for reference
