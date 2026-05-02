import { GitBranchIcon } from "lucide-react"

import type { ButtonComponent } from "@/lib/types"

export function ButtonWithIcon({ Button }: { Button: ButtonComponent }) {
  return (
    <Button>
      <GitBranchIcon data-icon="inline-start" />
      New Branch
    </Button>
  )
}
