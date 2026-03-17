"use client"

import { Slider } from "@chadcn/ui"
import { useState } from "react"

export function SliderMainDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[33]} max={100} step={1} />
    </div>
  )
}

export function SliderRangeDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  )
}

export function SliderControlledDemo() {
  const [value, setValue] = useState([50])
  return (
    <div className="w-full max-w-sm space-y-2">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
    </div>
  )
}

export function SliderDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  )
}
