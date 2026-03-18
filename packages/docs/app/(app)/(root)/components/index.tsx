import { FieldSeparator } from "@/components/ui/field"

import { AppearanceSettings } from "./appearance-settings"
import { ButtonGroupNested } from "./button-group-nested"
import { EmptyAvatarGroup } from "./empty-avatar-group"
import { FieldCheckbox } from "./field-checkbox"
import { FieldDemo } from "./field-demo"
import { FieldHear } from "./field-hear"
import { FieldSlider } from "./field-slider"
import { type Locale, translations } from "./translations"

export function RootComponents({ locale = "en" }: { locale?: Locale }) {
  const t = translations.index[locale]
  return (
    <div className="mx-auto grid gap-8 py-1 theme-container lg:grid-cols-3 xl:gap-6 2xl:gap-8">
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <EmptyAvatarGroup locale={locale} />
        <FieldSlider locale={locale} />
        <FieldHear locale={locale} />
      </div>
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <FieldDemo locale={locale} />
      </div>
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <FieldCheckbox locale={locale} />
        <ButtonGroupNested />
        <FieldSeparator className="my-4">{t.appearanceSettings}</FieldSeparator>
        <AppearanceSettings locale={locale} />
      </div>
    </div>
  )
}
