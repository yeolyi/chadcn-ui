import { ArrowUpRightIcon } from "lucide-react"

import type { ButtonComponent } from "@/lib/types"

export function ButtonSize({ Button }: { Button: ButtonComponent }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="xs" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="sm">Small</Button>
      <Button size="sm" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="default">Default</Button>
      <Button size="default" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="lg">Large</Button>
      <Button size="lg" variant="outline">
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
}
