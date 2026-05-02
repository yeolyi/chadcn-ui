// Single source of truth for Button variants.
//
// To add a new variant:
//   1. packages/ui/src/button/<slug>.tsx (+ tsup entry, package.json#exports)
//   2. Add an entry below with tagline & description per locale.

import type { ComponentType } from "react"

import { Button as Thanos } from "@chadcn/ui/button/thanos"
import { Button as Mash } from "@chadcn/ui/button/mash"
import { Button as Minesweeper } from "@chadcn/ui/button/minesweeper"
import { Button as Flinch } from "@chadcn/ui/button/flinch"
import { Button as Sponsored } from "@chadcn/ui/button/sponsored"
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
  minesweeper: Minesweeper,
  flinch: Flinch,
  sponsored: Sponsored,
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
  minesweeper: {
    tagline: {
      ko: "안전한 클릭만 받아들이는 버튼",
      en: "A button that only accepts safe clicks",
    },
    description: {
      ko: "버튼 표면에 작은 안전 점검 절차가 내장되어 있습니다. 폭탄을 피해 모든 안전 영역을 확인해야만 진짜 동작이 활성화됩니다.",
      en: "A small safety check is embedded across the button surface. Only after every safe region is verified — without striking a mine — does the real action become available.",
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
  sponsored: {
    tagline: {
      ko: "광고 시청을 통해 무료로 제공되는 버튼",
      en: "A button offered free of charge via sponsored content",
    },
    description: {
      ko: "이 버튼을 사용하기 위해서는 짧은 광고 시청에 동의하신 것으로 간주됩니다. 광고가 종료되면 원래 의도하신 동작이 정상적으로 실행됩니다.",
      en: "By using this button you are deemed to have consented to viewing a brief sponsored message. The originally intended action will execute normally once the ad concludes.",
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
