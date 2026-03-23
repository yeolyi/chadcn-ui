"use client"

import { RadioGroup, RadioGroupItem } from "@chadcn/ui"
import { Label } from "@/components/ui/label"

export function RadioGroupMainDemo() {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">Blood Type</legend>
      <RadioGroup defaultValue="a">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="r1" />
          <Label htmlFor="r1">Type A</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="r2" />
          <Label htmlFor="r2">Type B</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="ab" id="r3" />
          <Label htmlFor="r3">Type AB</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="o" id="r4" />
          <Label htmlFor="r4">Type O</Label>
        </div>
      </RadioGroup>
    </fieldset>
  )
}

export function RadioGroupDisabledDemo() {
  return (
    <RadioGroup defaultValue="comfortable" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="rd1" />
        <Label htmlFor="rd1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="rd2" />
        <Label htmlFor="rd2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="rd3" />
        <Label htmlFor="rd3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
