import { ArrowUpRightIcon } from "lucide-react"

import { buttonComponents } from "@/lib/button-components"

export function ButtonSize({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
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
