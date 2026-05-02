import { CircleFadingArrowUpIcon } from "lucide-react"

import { buttonComponents } from "@/lib/button-components"

export function ButtonIcon({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return (
    <Button variant="outline" size="icon" aria-label="Upload">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}
