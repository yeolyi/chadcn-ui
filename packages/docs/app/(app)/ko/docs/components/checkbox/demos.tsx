"use client"

import { Checkbox } from "@chadcn/ui"
import { Label } from "@/components/ui/label"

export function CheckboxMainDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">이용약관에 동의합니다</Label>
    </div>
  )
}

export function CheckboxDisabledDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-disabled" disabled />
      <Label htmlFor="terms-disabled">이용약관에 동의합니다</Label>
    </div>
  )
}

export function CheckboxWithTextDemo() {
  return (
    <div className="items-top flex gap-2">
      <Checkbox id="terms-text" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms-text">이용약관에 동의합니다</Label>
        <p className="text-sm text-muted-foreground">
          서비스 이용약관 및 개인정보 처리방침에 동의합니다.
        </p>
      </div>
    </div>
  )
}
