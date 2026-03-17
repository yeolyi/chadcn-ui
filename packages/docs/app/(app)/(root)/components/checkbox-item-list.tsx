import { Button, Checkbox } from "@chadcn/ui"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { type Locale, translations } from "./translations"

// Replaces ItemDemo — same height (2 stacked bordered items)
export function CheckboxItemList({ locale = "en" }: { locale?: Locale }) {
  const t = translations.checkboxItemList[locale]
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
        <FieldContent className="flex-1">
          <FieldTitle>{t.twoFactor}</FieldTitle>
          <FieldDescription className="text-pretty xl:hidden 2xl:block">
            {t.twoFactorDesc}
          </FieldDescription>
        </FieldContent>
        <Button size="sm">{t.enable}</Button>
      </div>
      <FieldLabel htmlFor="verified-check" className="cursor-pointer">
        <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
          <div className="flex size-5 items-center justify-center rounded-full bg-primary">
            <CheckIcon className="size-3 text-white" />
          </div>
          <FieldContent className="flex-1">
            <FieldTitle>{t.profileVerified}</FieldTitle>
          </FieldContent>
          <ChevronRightIcon className="size-4 text-muted-foreground" />
        </div>
      </FieldLabel>
    </div>
  )
}
