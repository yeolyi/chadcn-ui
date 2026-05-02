import { ArrowUpIcon } from "lucide-react"

import type { ButtonComponent } from "@/lib/types"

export function ButtonRounded({ Button }: { Button: ButtonComponent }) {
  return (
    <Button className="rounded-full" size="icon" variant="outline">
      <ArrowUpIcon />
    </Button>
  )
}
