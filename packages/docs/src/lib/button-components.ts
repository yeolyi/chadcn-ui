// Single source of truth for Button variants.
//
// To add a new variant:
//   1. packages/ui/src/button/<slug>.tsx (+ tsup entry, package.json#exports)
//   2. Add an entry below with tagline & description per locale.

import type { ComponentType } from "react"

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
