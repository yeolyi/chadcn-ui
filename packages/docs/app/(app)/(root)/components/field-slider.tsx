"use client"

import { useState } from "react"
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field"
import { Slider } from "@chadcn/ui"
import { type Locale, translations } from "./translations"

export function FieldSlider({ locale = "en" }: { locale?: Locale }) {
  const t = translations.fieldSlider[locale]
  const [value, setValue] = useState([200, 800])
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldTitle>{t.title}</FieldTitle>
        <FieldDescription>
          {t.description} ($
          <span className="font-medium tabular-nums">{value[0]}</span> -{" "}
          <span className="font-medium tabular-nums">{value[1]}</span>).
        </FieldDescription>
        <Slider
          value={value}
          onValueChange={setValue}
          max={1000}
          min={0}
          step={10}
          className="mt-2 w-full"
          aria-label={t.title}
        />
      </Field>
    </div>
  )
}
