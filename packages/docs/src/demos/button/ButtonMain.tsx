import { ArrowUpIcon } from "lucide-react"

import { buttonComponents } from "@/lib/button-components"

export function ButtonMain({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
