import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@chadcn/ui"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { type Locale, translations } from "./translations"

export function FieldHear({ locale = "en" }: { locale?: Locale }) {
  const t = translations.fieldHear[locale]

  const options = [
    { label: t.socialMedia, value: "social-media" },
    { label: t.searchEngine, value: "search-engine" },
    { label: t.referral, value: "referral" },
    { label: t.other, value: "other" },
  ]

  return (
    <Card className="py-4 shadow-none">
      <CardContent className="px-4">
        <form>
          <FieldGroup>
            <FieldSet className="gap-4">
              <FieldLegend>{t.legend}</FieldLegend>
              <FieldDescription className="line-clamp-1">
                {t.description}
              </FieldDescription>
              <FieldGroup className="flex flex-row flex-wrap gap-2 [--radius:9999rem]">
                {options.map((option) => (
                  <FieldLabel htmlFor={option.value} key={option.value} className="w-fit!">
                    <Field
                      orientation="horizontal"
                      className="gap-1.5 overflow-hidden px-3! py-1.5! transition-all duration-100 ease-linear group-has-data-[state=checked]/field-label:px-2!"
                    >
                      <Checkbox
                        value={option.value}
                        id={option.value}
                        defaultChecked={option.value === "social-media"}
                        className="-ml-6 -translate-x-1 rounded-full transition-all duration-100 ease-linear data-[state=checked]:ml-0 data-[state=checked]:translate-x-0"
                      />
                      <FieldTitle>{option.label}</FieldTitle>
                    </Field>
                  </FieldLabel>
                ))}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
