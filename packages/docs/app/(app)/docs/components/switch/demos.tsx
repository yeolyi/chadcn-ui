"use client"

import { Switch } from "@chadcn/ui"
import { Label } from "@/components/ui/label"

export function SwitchMainDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

export function SwitchDisabledDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="disabled-switch" disabled />
      <Label htmlFor="disabled-switch">Disabled</Label>
    </div>
  )
}
