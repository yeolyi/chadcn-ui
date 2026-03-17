import { Input } from "@chadcn/ui"
import { type Locale, translations } from "./translations"

// Replaces InputGroupButtonExample — same height (single input row)
export function InputUrl({ locale = "en" }: { locale?: Locale }) {
  const t = translations.inputUrl[locale]
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Input
        placeholder={t.placeholder}
        className="[border-radius:9999px]"
      />
    </div>
  )
}
