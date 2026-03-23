"use client"

import { RadioGroup, RadioGroupItem } from "@chadcn/ui"
import { Label } from "@/components/ui/label"

export function RadioGroupMainDemo() {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">혈액형</legend>
      <RadioGroup defaultValue="a">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="r1" />
          <Label htmlFor="r1">A형</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="r2" />
          <Label htmlFor="r2">B형</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="ab" id="r3" />
          <Label htmlFor="r3">AB형</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="o" id="r4" />
          <Label htmlFor="r4">O형</Label>
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
        <Label htmlFor="rd1">기본</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="rd2" />
        <Label htmlFor="rd2">편안한</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="rd3" />
        <Label htmlFor="rd3">컴팩트</Label>
      </div>
    </RadioGroup>
  )
}
