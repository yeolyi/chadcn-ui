import { Button, Input } from "@chadcn/ui"
import { type Locale, translations } from "./translations"

// Replaces ButtonGroupInputGroup — same height (single row: input + button)
export function InputSubscribe({ locale = "en" }: { locale?: Locale }) {
  const t = translations.inputSubscribe[locale]
  return (
    <div className="flex w-full gap-2">
      <Input placeholder={t.placeholder} className="flex-1" />
      <Button>{t.subscribe}</Button>
    </div>
  )
}
