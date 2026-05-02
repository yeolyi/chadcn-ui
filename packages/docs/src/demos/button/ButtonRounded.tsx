import { Button } from "@chadcn/ui"
import { ArrowUpIcon } from "lucide-react"

export function ButtonRounded() {
  return (
    <Button className="rounded-full" size="icon" variant="outline">
      <ArrowUpIcon />
    </Button>
  )
}
