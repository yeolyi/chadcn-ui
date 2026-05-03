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
import { Button as Flinch } from "@chadcn/ui/button/flinch"
import { Button as Sponsored } from "@chadcn/ui/button/sponsored"
import { Button as Gacha } from "@chadcn/ui/button/gacha"
import { Button as Paranoia } from "@chadcn/ui/button/paranoia"
import { Button as Anchor } from "@chadcn/ui/button/anchor"
import { Button as Benjamin } from "@chadcn/ui/button/benjamin"
import { Button as Lottery } from "@chadcn/ui/button/lottery"
import { Button as Clingy } from "@chadcn/ui/button/clingy"
import { Button as Assemble } from "@chadcn/ui/button/assemble"
import { Button as Mirage } from "@chadcn/ui/button/mirage"
import { Button as Aloof } from "@chadcn/ui/button/aloof"
import { Button as Shy } from "@chadcn/ui/button/shy"

import type { Locale } from "@/i18n/strings"

type LocalizedText = { ko: string; en: string }

interface ButtonVariantInfo {
  tagline: LocalizedText
  description: LocalizedText
}

type ButtonProps = Parameters<typeof Shy>[0]

// Demo-only: every button click that actually reaches onClick fires a toast,
// so visitors can see which variants suppress, defer, or pass clicks through.
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
  shy: withToast(Shy),
  thanos: withToast(Thanos),
  thanos2: withToast(Thanos2),
  mash: withToast(Mash),
  minesweeper: withToast(Minesweeper),
  flinch: withToast(Flinch),
  sponsored: withToast(Sponsored),
  gacha: withToast(Gacha),
  paranoia: withToast(Paranoia),
  anchor: withToast(Anchor),
  benjamin: withToast(Benjamin),
  lottery: withToast(Lottery),
  assemble: withToast(Assemble),
  clingy: withToast(Clingy),
  mirage: withToast(Mirage),
  aloof: withToast(Aloof),
} satisfies Record<string, ComponentType<ButtonProps>>

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
  thanos2: {
    tagline: {
      ko: "페이지 전체에 균형을 가져오는 버튼",
      en: "A button that brings balance to the entire page",
    },
    description: {
      ko: "클릭 시 페이지의 모든 말단 요소가 각자 절반의 확률로 조용히 먼지가 되며, 누가 남고 누가 지워질지는 감정 없이 결정됩니다. 핑거 스냅은 공평하며, 무작위이며, 되돌릴 수 없습니다.",
      en: "On click, every leaf element on the page is quietly turned to dust with even odds — who remains and who is erased is decided without sentiment. The snap is impartial, random, and irreversible.",
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
      ko: "버튼 표면에 작은 안전 점검 절차가 내장되어 있습니다. 폭탄을 피해 모든 안전 영역을 확인해야만 진짜 동작이 활성화됩니다. 의심 영역에는 더블 클릭으로 깃발을 표시할 수 있습니다.",
      en: "A small safety check is embedded across the button surface. Only after every safe region is verified — without striking a mine — does the real action become available. Suspected regions can be flagged with a double click.",
    },
  },
  flinch: {
    tagline: {
      ko: "사용되지 않음으로써 가치를 보존하는 버튼",
      en: "A button that preserves its value by remaining unused",
    },
    description: {
      ko: "버튼의 가치는 눌릴 수 있다는 가능성 그 자체에 있습니다. 사용자가 누르려는 의도를 보이는 순간 그 가능성은 이미 충분히 전달되었으므로, 실제로 눌릴 필요 없이 버튼은 자신의 역할을 완수하고 봉인됩니다. 포인터가 떠나면 버튼은 다시 가능성의 상태로 복원됩니다.",
      en: "A button's worth lies in the very possibility of being pressed. The instant the user signals intent to press, that possibility has been sufficiently conveyed — the button fulfills its role without an actual press and seals itself. Once the pointer leaves, the button is restored to its state of possibility.",
    },
  },
  sponsored: {
    tagline: {
      ko: "광고 시청을 통해 무료로 제공되는 버튼",
      en: "A button offered free of charge via sponsored content",
    },
    description: {
      ko: "처음 클릭 시 짧은 스폰서 광고 시청에 동의하신 것으로 간주됩니다. 광고가 종료되면 원래 의도하신 동작이 실행되며, 이후로는 광고 없이 자유롭게 사용하실 수 있습니다.",
      en: "On the first click you are deemed to have consented to viewing a brief sponsored message. The originally intended action runs once the ad concludes, and the button is freely usable thereafter without further ads.",
    },
  },
  gacha: {
    tagline: {
      ko: "확률 기반으로 동작이 결정되는 버튼",
      en: "A button whose action is decided by chance",
    },
    description: {
      ko: "각 클릭마다 내장된 슬롯 머신이 동작 실행 여부를 결정합니다. 세 릴이 모두 일치하는 잭팟이 나올 경우에 한해 본래 의도하신 동작이 실행됩니다.",
      en: "Each click runs an embedded slot machine that decides whether the action goes through. The intended action only fires on a jackpot — all three reels matching.",
    },
  },
  anchor: {
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
      ko: "클릭이 발생할 때마다 추가 확인 단계가 뒤따릅니다. 사용자의 결정이 충분히 단호한지 다단계에 걸쳐 검증되며, 모든 단계를 통과할 때에 한해 본래 의도하신 동작이 실행됩니다. 이전 단계의 버튼은 진행과 함께 자동으로 비활성화됩니다.",
      en: "Each click is followed by an additional verification step. The user's decision is validated across a multi-stage cascade and the originally intended action runs only after every stage has been cleared. Earlier buttons disable themselves as the cascade advances.",
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
      ko: "클릭 시 다섯 개의 추첨 카드가 제시되며, 그중 단 하나만 본래 의도하신 동작을 실행합니다. 잘못된 카드를 선택하면 버튼은 영구적으로 사용이 중단됩니다.",
      en: "On click, five lottery cards are presented; only one will trigger the originally intended action. Selecting the wrong card permanently retires the button.",
    },
  },
  assemble: {
    tagline: {
      ko: "사용자가 직접 라벨을 조립해야 동작하는 버튼",
      en: "A button the user must assemble before it works",
    },
    description: {
      ko: "이 버튼은 자신의 라벨을 페이지의 다른 곳에서 직접 가져와야 활성화됩니다. 텍스트를 한 글자씩 선택해 버튼 위로 드래그하면 라벨에 필요한 글자가 차례로 채워지며, 모든 글자가 채워지면 버튼이 활성화됩니다.\n\n브라우저의 네이티브 드래그 동작에 의존하므로 데스크톱 환경에서만 동작합니다.",
      en: "This button must be assembled from text elsewhere on the page. Select one character at a time and drag it onto the button — each matching slot fills in turn, and the button activates only after every slot is filled.\n\nRelies on the browser's native drag behavior and is therefore desktop-only.",
    },
  },
  clingy: {
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
    tagline: {
      ko: "다가갈수록 멀어지는 버튼",
      en: "A button that recedes as you approach",
    },
    description: {
      ko: "버튼은 위치가 정확해질수록 옅어진다. 정확한 조준은 곧 그것의 부재로 보상된다.\n\n포인터 좌표에 의존하므로 데스크톱 환경에서만 동작합니다.",
      en: "The button fades as its position becomes precisely known. Aiming true is rewarded with its absence.\n\nRelies on pointer coordinates and is therefore desktop-only.",
    },
  },
  aloof: {
    tagline: {
      ko: "사용자와 일정 거리를 유지하는 버튼",
      en: "A button that maintains a steady distance from the user",
    },
    description: {
      ko: "포인터가 일정 반경 이내로 접근하면 버튼은 자동으로 반대 방향으로 이동하여 안전 거리를 유지합니다. 이 거리는 잘못된 클릭을 사전에 차단하기 위한 최소 안전 마진으로 설계되었습니다.\n\n포인터 좌표에 의존하므로 데스크톱 환경에서만 동작합니다.",
      en: "Whenever the pointer enters a fixed radius around the button, the button glides away in the opposite direction to preserve a safe gap. The radius is calibrated as the minimum safety margin to preclude unintended clicks.\n\nRelies on pointer coordinates and is therefore desktop-only.",
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
  return { tagline: info.tagline[locale], description: info.description[locale] }
}
