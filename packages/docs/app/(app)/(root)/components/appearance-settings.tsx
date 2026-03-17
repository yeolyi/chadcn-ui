"use client"

import { IconMinus, IconPlus } from "@tabler/icons-react"
import * as React from "react"
import { Button } from "@chadcn/ui"
import { type Locale, translations } from "./translations"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@chadcn/ui"
import { RadioGroup, RadioGroupItem } from "@chadcn/ui"
import { Switch } from "@chadcn/ui"

export function AppearanceSettings({ locale = "en" }: { locale?: Locale }) {
  const t = translations.appearanceSettings[locale]
  const [gpuCount, setGpuCount] = React.useState(8)

  const handleGpuAdjustment = React.useCallback((adjustment: number) => {
    setGpuCount((prevCount) => Math.max(1, Math.min(99, prevCount + adjustment)))
  }, [])

  const handleGpuInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!Number.isNaN(value) && value >= 1 && value <= 99) {
      setGpuCount(value)
    }
  }, [])

  return (
    <FieldSet>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>{t.computeEnvironment}</FieldLegend>
          <FieldDescription>{t.computeEnvironmentDesc}</FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{t.kubernetes}</FieldTitle>
                  <FieldDescription>
                    {t.kubernetesDesc}
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" aria-label="Kubernetes" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{t.virtualMachine}</FieldTitle>
                  <FieldDescription>
                    {t.virtualMachineDesc}
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="vm" id="vm-z4k" aria-label="Virtual Machine" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="number-of-gpus-f6l">{t.numberOfGpus}</FieldLabel>
            <FieldDescription>{t.numberOfGpusDesc}</FieldDescription>
          </FieldContent>
          <ButtonGroup>
            <Input
              type="password"
              id="number-of-gpus-f6l"
              value={gpuCount}
              onChange={handleGpuInputChange}
              size={3}
              className="h-8 w-14! font-mono"
              maxLength={3}
            />
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              aria-label="Decrement"
              onClick={() => handleGpuAdjustment(-1)}
              disabled={gpuCount <= 1}
            >
              <IconMinus />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              aria-label="Increment"
              onClick={() => handleGpuAdjustment(1)}
              disabled={gpuCount >= 99}
            >
              <IconPlus />
            </Button>
          </ButtonGroup>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="tinting">{t.wallpaperTinting}</FieldLabel>
            <FieldDescription>{t.wallpaperTintingDesc}</FieldDescription>
          </FieldContent>
          <Switch id="tinting" defaultChecked />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
