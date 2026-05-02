// Single source of truth for Button variants.
//
// To add a new variant:
//   1. packages/ui/src/button/<slug>.tsx (+ tsup entry, package.json#exports)
//   2. Add an entry below with tagline & description per locale.

import type { ComponentType } from "react"

import { Button as Thanos } from "@chadcn/ui/button/thanos"
import { Button as Mash } from "@chadcn/ui/button/mash"
import { Button as Flinch } from "@chadcn/ui/button/flinch"
import { Button as Shy } from "@chadcn/ui/button/shy"

import type { Locale } from "@/i18n/strings"

type LocalizedText = { ko: string; en: string }

interface ButtonVariantInfo {
  tagline: LocalizedText
  description: LocalizedText
}

// Slug → React component. Demos hydrate via this map (small bundle, just refs).
export const buttonComponents = {
  shy: Shy,
  thanos: Thanos,
  mash: Mash,
  flinch: Flinch,
} satisfies Record<string, ComponentType<Parameters<typeof Shy>[0]>>

// Slug → prose. Used at SSG only; not shipped to the client demos.
const variantInfo: Record<keyof typeof buttonComponents, ButtonVariantInfo> = {
  shy: {
    tagline: {
      ko: "잘못된 클릭을 막아주는 버튼",
      en: "A button that prevents accidental clicks",
    },
    description: {
      ko: "사용자가 실수로 클릭하기 전에 버튼이 안전한 위치로 이동합니다. 두 번 시도하면 의도된 클릭으로 판단하여 제자리에 머무릅니다.",
      en: "The button moves to a safer position before the user can misclick. After two attempts the click is treated as intentional and the button stays in place.",
    },
  },
  thanos: {
    tagline: {
      ko: "타노스의 손길이 들어간 버튼",
      en: "A button touched by Thanos",
    },
    description: {
      ko: "포인터가 닿는 순간 버튼 전체가 먼지로 분해됩니다. 균형을 위한 희생이며, 한 번 사라진 버튼은 다시 돌아오지 않습니다.",
      en: "The instant the pointer touches it, the entire button crumbles into dust. A sacrifice made for balance; once gone, it does not return.",
    },
  },
  mash: {
    tagline: {
      ko: "사용자의 의지를 확인하는 버튼",
      en: "A button that verifies the user's intent",
    },
    description: {
      ko: "사용자가 버튼을 누르겠다는 의지를 확실히 확인하기 위한 버튼입니다. 진행도는 시간이 흐르면 스스로 줄어들기에, 가득 채울 때까지 꾸준히 클릭해 의지를 증명해야 동작이 확정됩니다.",
      en: "A button that firmly verifies the user's intent to press it. The progress bar drains on its own, so the user must keep clicking to fill it — only sustained intent confirms the action.",
    },
  },
  flinch: {
    tagline: {
      ko: "사용되지 않음으로써 가치를 보존하는 버튼",
      en: "A button that preserves its value by remaining unused",
    },
    description: {
      ko: "버튼의 가치는 눌릴 수 있다는 가능성 그 자체에 있습니다. 포인터가 닿는 순간 그 가능성은 사용자에게 이미 충분히 전달되었으므로, 더 이상 눌릴 필요 없이 버튼은 자신의 역할을 완수하고 봉인됩니다.",
      en: "A button's worth lies in the very possibility of being pressed. The instant the pointer arrives, that possibility has been sufficiently conveyed to the user — the button has fulfilled its role without needing to be pressed, and seals itself.",
    },
  },
}

export type ButtonSlug = keyof typeof buttonComponents

export function listButtonSlugs(): ButtonSlug[] {
  return Object.keys(buttonComponents) as ButtonSlug[]
}

export function getButtonVariant(slug: string, locale: Locale) {
  if (!(slug in variantInfo)) return null
  const info = variantInfo[slug as ButtonSlug]
  return { tagline: info.tagline[locale], description: info.description[locale] }
}
