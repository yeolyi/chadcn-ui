import { Button } from "@chadcn/ui"
import { ButtonGroup } from "@/components/ui/button-group"
import { BotIcon, ChevronDownIcon } from "lucide-react"

// Replaces ButtonGroupPopover — same height (small button group, pairs with ButtonGroupNested)
export function ButtonGroupExtra() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        <BotIcon /> Copilot
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Options">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  )
}
