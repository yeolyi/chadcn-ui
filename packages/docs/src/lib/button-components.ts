// Static map of all Button variants — keys must match the variant slug used
// by the corresponding MDX file (e.g., src/content/variants/button/escape.ko.mdx).
//
// To add a new variant:
// 1. packages/ui/src/button/<slug>.tsx + tsup entry + package.json#exports
// 2. packages/docs/src/content/variants/button/<slug>.ko.mdx (and optionally .en.mdx)
// 3. Add a line to this map.

import { Button as Escape } from "@chadcn/ui/button/escape"

import type { ButtonComponent } from "@/lib/types"

export const buttonComponents: Record<string, ButtonComponent> = {
  escape: Escape,
}
