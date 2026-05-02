import { Button } from "@chadcn/ui"
import { ArrowUpRightIcon } from "lucide-react"

export function ButtonSize() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">아주 작게</Button>
      <Button size="xs" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="sm">작게</Button>
      <Button size="sm" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="default">기본</Button>
      <Button size="default" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="lg">크게</Button>
      <Button size="lg" variant="outline">
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
}
