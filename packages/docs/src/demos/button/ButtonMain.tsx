import { Button } from "@chadcn/ui"
import { ArrowUpIcon } from "lucide-react"

export function ButtonMain() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">버튼</Button>
      <Button variant="outline" size="icon" aria-label="제출">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
