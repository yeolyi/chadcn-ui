import type { ComponentProps } from "react"

import type { Button as EscapeButton } from "@chadcn/ui/button/escape"

export type ButtonComponent = typeof EscapeButton
export type ButtonProps = ComponentProps<typeof EscapeButton>
