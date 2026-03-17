import { Button } from "@chadcn/ui"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  ArchiveIcon,
  ArrowLeftIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import { type Locale, translations } from "./translations"

// Replaces ButtonGroupDemo — same height (single row of toolbar buttons)
export function ButtonToolbar({ locale = "en" }: { locale?: Locale }) {
  const t = translations.buttonToolbar[locale]
  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon-sm" aria-label="Go Back">
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          {t.archive}
        </Button>
        <Button variant="outline" size="sm">
          {t.report}
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          {t.snooze}
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="More Options">
          <MoreHorizontalIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
