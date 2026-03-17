import { Button, Input, Textarea } from "@chadcn/ui"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { type Locale, translations } from "./translations"

// Replaces NotionPromptForm — similar height (compact form with fields + textarea)
export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const t = translations.contactForm[locale]
  return (
    <form>
      <Field>
        <FieldLabel htmlFor="contact-prompt" className="sr-only">
          {t.message}
        </FieldLabel>
        <div className="rounded-xl border">
          <Textarea
            id="contact-prompt"
            placeholder={t.placeholder}
            className="border-0 shadow-none focus-visible:ring-0"
            rows={3}
          />
          <div className="flex items-center gap-2 border-t px-3 py-2">
            <Input
              placeholder={t.namePlaceholder}
              className="h-8 flex-1 border-0 shadow-none focus-visible:ring-0"
            />
            <Button size="sm">{t.send}</Button>
          </div>
        </div>
      </Field>
    </form>
  )
}
