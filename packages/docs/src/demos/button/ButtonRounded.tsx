import { ArrowUpIcon } from "lucide-react"

import { buttonComponents } from "@/lib/button-components"

export function ButtonRounded({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return (
    <Button className="rounded-full" size="icon" variant="outline">
      <ArrowUpIcon />
    </Button>
  )
}
