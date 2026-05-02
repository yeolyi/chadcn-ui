import { CircleFadingArrowUpIcon } from "lucide-react"

import type { ButtonComponent } from "@/lib/types"

export function ButtonIcon({ Button }: { Button: ButtonComponent }) {
  return (
    <Button variant="outline" size="icon" aria-label="Upload">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}
