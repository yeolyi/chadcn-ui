import { ArrowUpIcon } from "lucide-react"

import type { ButtonComponent } from "@/lib/types"

export function ButtonMain({ Button }: { Button: ButtonComponent }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
