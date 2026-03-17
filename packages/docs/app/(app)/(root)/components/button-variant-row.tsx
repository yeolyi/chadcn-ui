import { Button } from "@chadcn/ui"
import { type Locale, translations } from "./translations"

// Replaces SpinnerBadge — same height (single row of small inline elements)
export function ButtonVariantRow({ locale = "en" }: { locale?: Locale }) {
  const t = translations.buttonVariantRow[locale]
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">{t.primary}</Button>
      <Button variant="secondary" size="sm">
        {t.secondary}
      </Button>
      <Button variant="outline" size="sm">
        {t.outline}
      </Button>
    </div>
  )
}
