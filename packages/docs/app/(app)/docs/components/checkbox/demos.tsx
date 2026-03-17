"use client"

import { Checkbox } from "@chadcn/ui"
import { Label } from "@/components/ui/label"

export function CheckboxMainDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

export function CheckboxDisabledDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-disabled" disabled />
      <Label htmlFor="terms-disabled">Accept terms and conditions</Label>
    </div>
  )
}

export function CheckboxWithTextDemo() {
  return (
    <div className="items-top flex gap-2">
      <Checkbox id="terms-text" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms-text">Accept terms and conditions</Label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
