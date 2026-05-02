import { Button } from "@chadcn/ui"
import { CircleFadingArrowUpIcon } from "lucide-react"

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon" aria-label="업로드">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}
