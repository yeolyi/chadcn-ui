import { Button } from "@chadcn/ui"
import { GitBranchIcon } from "lucide-react"

export function ButtonWithIcon() {
  return (
    <Button>
      <GitBranchIcon data-icon="inline-start" />
      새 브랜치
    </Button>
  )
}
