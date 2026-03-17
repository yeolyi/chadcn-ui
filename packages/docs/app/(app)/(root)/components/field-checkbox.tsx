import { Checkbox } from "@chadcn/ui"
import { Field, FieldLabel } from "@/components/ui/field"
import { type Locale, translations } from "./translations"

export function FieldCheckbox({ locale = "en" }: { locale?: Locale }) {
  const t = translations.fieldCheckbox[locale]
  return (
    <FieldLabel htmlFor="checkbox-demo">
      <Field orientation="horizontal">
        <Checkbox id="checkbox-demo" defaultChecked />
        <FieldLabel htmlFor="checkbox-demo" className="line-clamp-1">
          {t.label}
        </FieldLabel>
      </Field>
    </FieldLabel>
  )
}
