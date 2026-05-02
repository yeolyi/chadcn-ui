import { GitBranchIcon } from "lucide-react"

import { buttonComponents } from "@/lib/button-components"

export function ButtonWithIcon({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return (
    <Button>
      <GitBranchIcon data-icon="inline-start" />
      New Branch
    </Button>
  )
}
