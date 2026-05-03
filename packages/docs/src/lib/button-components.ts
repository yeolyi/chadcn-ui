// Single source of truth for Button variants.
//
// To add a new variant:
//   1. packages/ui/src/button/<slug>.tsx (+ tsup entry, package.json#exports)
//   2. Add an entry below with tagline & description per locale.

import { type ComponentType, createElement, type MouseEvent } from "react"
import { toast } from "sonner"

import { Button as Thanos } from "@chadcn/ui/button/thanos"
import { Button as Thanos2 } from "@chadcn/ui/button/thanos2"
import { Button as Mash } from "@chadcn/ui/button/mash"
import { Button as Minesweeper } from "@chadcn/ui/button/minesweeper"
import { Button as Freeze } from "@chadcn/ui/button/freeze"
import { Button as Sponsored } from "@chadcn/ui/button/sponsored"
import { Button as Gacha } from "@chadcn/ui/button/gacha"
import { Button as Paranoia } from "@chadcn/ui/button/paranoia"
import { Button as Page } from "@chadcn/ui/button/page"
import { Button as Benjamin } from "@chadcn/ui/button/benjamin"
import { Button as Lottery } from "@chadcn/ui/button/lottery"
import { Button as Follow } from "@chadcn/ui/button/follow"
import { Button as Drag } from "@chadcn/ui/button/drag"
import { Button as Mirage } from "@chadcn/ui/button/mirage"
import { Button as Dodge } from "@chadcn/ui/button/dodge"
import { Button as Patient } from "@chadcn/ui/button/patient"
import { Button as Baljak } from "@chadcn/ui/button/baljak"
import { Button as Shy } from "@chadcn/ui/button/shy"

import type { Locale } from "@/i18n/strings"

type LocalizedText = { ko: string; en: string }

type Support = "all" | "desktop" | "mobile"

interface ButtonVariantInfo {
  tagline: LocalizedText
  description: LocalizedText
  support?: Support
}

type ButtonProps = Parameters<typeof Shy>[0]

// Demo-only: variants where the click reaching onClick is the punchline (and
// otherwise invisible) get a toast so visitors see when the gimmick finally
// lets a click through. Variants that already telegraph success/failure
// visually (movement, disappearance, morph) don't need it.
function withToast(C: ComponentType<ButtonProps>): ComponentType<ButtonProps> {
  return function ButtonWithToast(props: ButtonProps) {
    const handle = (e: MouseEvent<HTMLButtonElement>) => {
      toast("Button clicked")
      props.onClick?.(e)
    }
    return createElement(C, { ...props, onClick: handle })
  }
}

// Slug → React component. Demos hydrate via this map (small bundle, just refs).
export const buttonComponents = {
  shy: Shy,
  thanos: Thanos,
  thanos2: Thanos2,
  mash: withToast(Mash),
  minesweeper: withToast(Minesweeper),
  freeze: Freeze,
  sponsored: withToast(Sponsored),
  gacha: withToast(Gacha),
  paranoia: withToast(Paranoia),
  page: Page,
  benjamin: Benjamin,
  lottery: withToast(Lottery),
  drag: withToast(Drag),
  follow: Follow,
  mirage: Mirage,
  dodge: Dodge,
  patient: withToast(Patient),
  baljak: withToast(Baljak),
} satisfies Record<string, ComponentType<ButtonProps>>

// Slug → prose. Used at SSG only; not shipped to the client demos.
const variantInfo: Record<keyof typeof buttonComponents, ButtonVariantInfo> = {
  shy: {
    support: "desktop",
    tagline: {
      ko: "잘못된 클릭을 막아주는 버튼",
      en: "A button that prevents accidental clicks",
    },
    description: {
      ko: "포인터가 접근하면 버튼이 안전한 위치로 비켜섭니다. 두 번 연속으로 시도하면 의도된 클릭으로 인정해 제자리에 머무릅니다.",
      en: "The button steps aside when the pointer approaches. A second consecutive attempt is treated as intent and the button stays in place.",
    },
  },
  thanos: {
    tagline: {
      ko: "타노스의 손길이 들어간 버튼",
      en: "A button touched by Thanos",
    },
    description: {
      ko: "포인터가 닿는 순간 버튼이 먼지로 분해됩니다. 한 번 사라지면 돌아오지 않습니다.",
      en: "The instant the pointer touches it, the button crumbles into dust. Once gone, it does not return.",
    },
  },
  thanos2: {
    tagline: {
      ko: "페이지 전체에 균형을 가져오는 버튼",
      en: "A button that brings balance to the entire page",
    },
    description: {
      ko: "클릭하면 페이지의 모든 말단 요소가 각자 절반의 확률로 먼지가 됩니다. 공평하고 무작위이며, 되돌릴 수 없습니다.",
      en: "On click, every leaf element vanishes with even odds. Impartial, random, irreversible.",
    },
  },
  mash: {
    tagline: {
      ko: "사용자의 의지를 확인하는 버튼",
      en: "A button that verifies the user's intent",
    },
    description: {
      ko: "진행도는 시간이 흐르면 스스로 줄어듭니다. 가득 채울 때까지 꾸준히 클릭해 의지를 증명해야 동작이 확정됩니다.",
      en: "The progress bar drains on its own. Keep clicking to fill it — only sustained intent confirms the action.",
    },
  },
  minesweeper: {
    tagline: {
      ko: "안전한 클릭만 받아들이는 버튼",
      en: "A button that only accepts safe clicks",
    },
    description: {
      ko: "버튼 표면에 작은 지뢰찾기가 내장되어 있습니다. 폭탄을 피해 모든 안전 영역을 확인해야 활성화되며, 의심 영역은 더블 클릭으로 깃발을 표시할 수 있습니다.",
      en: "A small minesweeper is embedded across the surface. Reveal every safe cell without striking a mine to activate; suspected cells can be flagged with a double click.",
    },
  },
  freeze: {
    support: "desktop",
    tagline: {
      ko: "사용되지 않음으로써 가치를 보존하는 버튼",
      en: "A button that preserves its value by remaining unused",
    },
    description: {
      ko: "사용자가 누르려는 의도를 보이는 순간 그 가능성은 이미 전달되었으므로, 버튼은 봉인됩니다. 포인터가 떠나면 다시 가능성의 상태로 복원됩니다.",
      en: "The instant the user signals intent to press, that possibility has been conveyed — and the button seals itself. Once the pointer leaves, it is restored to its state of possibility.",
    },
  },
  sponsored: {
    tagline: {
      ko: "광고 시청을 통해 무료로 제공되는 버튼",
      en: "A button offered free of charge via sponsored content",
    },
    description: {
      ko: "처음 클릭 시 짧은 스폰서 광고가 노출됩니다. 광고가 종료되면 원래 동작이 실행되고, 이후로는 광고 없이 자유롭게 사용하실 수 있습니다.",
      en: "The first click presents a brief sponsored message; once it ends, the originally intended action runs and the button stays ad-free thereafter.",
    },
  },
  gacha: {
    tagline: {
      ko: "확률 기반으로 동작이 결정되는 버튼",
      en: "A button whose action is decided by chance",
    },
    description: {
      ko: "각 클릭마다 내장된 슬롯 머신이 돌아갑니다. 세 릴이 모두 일치하는 잭팟이 나올 때에만 동작이 실행됩니다.",
      en: "Each click spins the embedded slot machine. The action runs only on a jackpot — all three reels matching.",
    },
  },
  page: {
    tagline: {
      ko: "변하는 것이 자신이 아니라 페이지인 버튼",
      en: "A button where what changes is the page, not itself",
    },
    description: {
      ko: "사용자가 버튼을 누른다는 인상은 매우 일관된 환상일 뿐이다. 실제로 움직인 것은 버튼이 아니라 그것을 둘러싼 페이지다.",
      en: "The impression that the user presses the button is a very persistent illusion. What actually moves is not the button, but the page around it.",
    },
  },
  paranoia: {
    tagline: {
      ko: "잘못된 결정을 사전에 차단하는 버튼",
      en: "A button that intercepts misjudged decisions",
    },
    description: {
      ko: "클릭마다 확인 카드가 위에 쌓입니다. 모든 단계를 차례로 통과할 때에만 동작이 확정되며, 이전 단계는 자동으로 비활성화됩니다.",
      en: "Each click stacks a confirmation card above. The action commits only after every stage is cleared in turn; earlier stages auto-disable.",
    },
  },
  benjamin: {
    tagline: {
      ko: "시간을 거꾸로 거슬러 가는 버튼",
      en: "A button that travels backward in time",
    },
    description: {
      ko: "벤자민 버튼처럼, 클릭할 때마다 버튼은 한 시대씩 과거의 디자인으로 회귀합니다.",
      en: "Like Benjamin Button, each click rewinds the design by one era.",
    },
  },
  lottery: {
    tagline: {
      ko: "다섯 번의 기회 중 한 번만 성공하는 버튼",
      en: "A button where only one of five attempts succeeds",
    },
    description: {
      ko: "클릭하면 다섯 장의 추첨 카드가 펼쳐지며, 단 하나만 동작을 실행합니다. 잘못 선택하면 버튼은 영구히 사용이 중단됩니다.",
      en: "A click reveals five lottery cards; only one triggers the action. The wrong card permanently retires the button.",
    },
  },
  drag: {
    support: "desktop",
    tagline: {
      ko: "사용자가 직접 라벨을 조립해야 동작하는 버튼",
      en: "A button the user must assemble before it works",
    },
    description: {
      ko: "페이지 어디서든 텍스트를 한 글자씩 선택해 버튼 위로 드래그하면 라벨의 슬롯이 차례로 채워지며, 모든 슬롯이 채워지면 활성화됩니다.",
      en: "Drag a single character of text from anywhere on the page onto the button to fill the next slot. Once every slot is filled, the button activates.",
    },
  },
  follow: {
    support: "desktop",
    tagline: {
      ko: "사용자의 시선을 결코 놓치지 않는 버튼",
      en: "A button that never loses sight of the user",
    },
    description: {
      ko: "당신이 어디로 향하든, 이 버튼은 이미 그곳에 와 있다. 한 번 눌리고 나서야 비로소 자신의 자리로 돌아간다.",
      en: "Wherever you go, this button is already there. Only once it has been pressed does it return to its place.",
    },
  },
  mirage: {
    support: "desktop",
    tagline: {
      ko: "다가갈수록 멀어지는 버튼",
      en: "A button that recedes as you approach",
    },
    description: {
      ko: "버튼은 위치가 정확해질수록 옅어진다. 정확한 조준은 곧 그것의 부재로 보상된다.",
      en: "The button fades as its position becomes precisely known. Aiming true is rewarded with its absence.",
    },
  },
  dodge: {
    support: "desktop",
    tagline: {
      ko: "사용자와 일정 거리를 유지하는 버튼",
      en: "A button that maintains a steady distance from the user",
    },
    description: {
      ko: "포인터가 일정 반경 안으로 들어오면 버튼은 반대 방향으로 미끄러져 안전 거리를 유지합니다. 잘못된 클릭을 사전에 차단하기 위한 최소 마진으로 설계되었습니다.",
      en: "When the pointer enters a fixed radius, the button glides away to preserve a safe gap — calibrated as the minimum margin to preclude unintended clicks.",
    },
  },
  patient: {
    support: "desktop",
    tagline: {
      ko: "사용자의 인내심을 검증하는 버튼",
      en: "A button that verifies the user's patience",
    },
    description: {
      ko: "10초간 안정적으로 호버해야 활성화됩니다. 포인터가 떠나면 카운트다운은 처음부터 다시 시작됩니다.",
      en: "Activates only after a steady ten-second hover. Leaving the button restarts the countdown from zero.",
    },
  },
  baljak: {
    tagline: {
      ko: "발작 버튼",
      en: "Seizure button",
    },
    description: {
      ko: "발작 버튼입니다.",
      en: "A seizure button.",
    },
  },
}

export type ButtonSlug = keyof typeof buttonComponents

export function listButtonSlugs(): ButtonSlug[] {
  return (Object.keys(buttonComponents) as ButtonSlug[]).sort()
}

export function getButtonVariant(slug: string, locale: Locale) {
  if (!(slug in variantInfo)) return null
  const info = variantInfo[slug as ButtonSlug]
  return {
    tagline: info.tagline[locale],
    description: info.description[locale],
    support: info.support ?? "all",
  }
}
