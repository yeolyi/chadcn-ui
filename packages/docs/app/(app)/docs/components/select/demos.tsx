"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@chadcn/ui"
import { useState } from "react"

export function SelectMainDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="flex flex-col items-center gap-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
      {value && (
        <p className="text-xs text-muted-foreground">
          You selected: <code className="rounded bg-muted px-1.5 py-0.5">{value}</code>
        </p>
      )}
    </div>
  )
}

export function SelectScrollableDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
        <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>

        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
        <SelectItem value="cet">Central European Time (CET)</SelectItem>
        <SelectItem value="eet">Eastern European Time (EET)</SelectItem>

        <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
        <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
        <SelectItem value="ist">India Standard Time (IST)</SelectItem>

        <SelectItem value="awst">Australian Western Time (AWST)</SelectItem>
        <SelectItem value="acst">Australian Central Time (ACST)</SelectItem>
        <SelectItem value="aest">Australian Eastern Time (AEST)</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function SelectDisabledDemo() {
  return (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}
