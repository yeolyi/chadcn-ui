"use client"

import { Switch } from "@chadcn/ui"
import { Label } from "@/components/ui/label"

export function SwitchMainDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">비행기 모드</Label>
    </div>
  )
}

export function SwitchDisabledDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="disabled-switch" disabled />
      <Label htmlFor="disabled-switch">비활성화</Label>
    </div>
  )
}
