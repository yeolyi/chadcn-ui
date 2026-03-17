import { FieldSeparator } from "@/components/ui/field"

import { AppearanceSettings } from "./appearance-settings"
import { ButtonGroupExtra } from "./button-group-extra"
import { ButtonGroupNested } from "./button-group-nested"
import { ButtonToolbar } from "./button-toolbar"
import { ButtonVariantRow } from "./button-variant-row"
import { CheckboxItemList } from "./checkbox-item-list"
import { ContactForm } from "./contact-form"
import { EmptyAvatarGroup } from "./empty-avatar-group"
import { EmptySetup } from "./empty-setup"
import { FieldCheckbox } from "./field-checkbox"
import { FieldDemo } from "./field-demo"
import { FieldHear } from "./field-hear"
import { FieldSlider } from "./field-slider"
import { InputFormStack } from "./input-form-stack"
import { InputSubscribe } from "./input-subscribe"
import { InputUrl } from "./input-url"
import { type Locale, translations } from "./translations"

export function RootComponents({ locale = "en" }: { locale?: Locale }) {
  const t = translations.index[locale]
  return (
    <div className="mx-auto grid gap-8 py-1 theme-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <FieldDemo locale={locale} />
      </div>
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <EmptyAvatarGroup locale={locale} />
        <ButtonVariantRow locale={locale} />
        <InputSubscribe locale={locale} />
        <FieldSlider locale={locale} />
        <InputFormStack locale={locale} />
      </div>
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <InputUrl locale={locale} />
        <CheckboxItemList locale={locale} />
        <FieldSeparator className="my-4">{t.appearanceSettings}</FieldSeparator>
        <AppearanceSettings locale={locale} />
      </div>
      <div className="order-first flex flex-col gap-6 lg:hidden xl:order-last xl:flex *:[div]:w-full *:[div]:max-w-full">
        <ContactForm locale={locale} />
        <ButtonToolbar locale={locale} />
        <FieldCheckbox locale={locale} />
        <div className="flex justify-between gap-4">
          <ButtonGroupNested />
          <ButtonGroupExtra />
        </div>
        <FieldHear locale={locale} />
        <EmptySetup locale={locale} />
      </div>
    </div>
  )
}
