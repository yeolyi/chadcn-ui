import { Button } from "@chadcn/ui"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { RocketIcon } from "lucide-react"
import { type Locale, translations } from "./translations"

// Replaces SpinnerEmpty — same height (empty state card with icon, title, desc, button)
export function EmptySetup({ locale = "en" }: { locale?: Locale }) {
  const t = translations.emptySetup[locale]
  return (
    <Empty className="w-full border md:p-6">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RocketIcon />
        </EmptyMedia>
        <EmptyTitle>{t.title}</EmptyTitle>
        <EmptyDescription>{t.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          {t.getStarted}
        </Button>
      </EmptyContent>
    </Empty>
  )
}
