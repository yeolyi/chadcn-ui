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
          <SelectValue placeholder="과일 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
          <SelectItem value="blueberry">블루베리</SelectItem>
          <SelectItem value="grapes">포도</SelectItem>
          <SelectItem value="pineapple">파인애플</SelectItem>
        </SelectContent>
      </Select>
      {value && (
        <p className="text-xs text-muted-foreground">
          선택한 값: <code className="rounded bg-muted px-1.5 py-0.5">{value}</code>
        </p>
      )}
    </div>
  )
}

export function SelectScrollableDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="시간대 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="est">동부 표준시 (EST)</SelectItem>
        <SelectItem value="cst">중부 표준시 (CST)</SelectItem>
        <SelectItem value="mst">산악 표준시 (MST)</SelectItem>
        <SelectItem value="pst">태평양 표준시 (PST)</SelectItem>
        <SelectItem value="akst">알래스카 표준시 (AKST)</SelectItem>
        <SelectItem value="hst">하와이 표준시 (HST)</SelectItem>

        <SelectItem value="gmt">그리니치 표준시 (GMT)</SelectItem>
        <SelectItem value="cet">중앙유럽 시간 (CET)</SelectItem>
        <SelectItem value="eet">동유럽 시간 (EET)</SelectItem>

        <SelectItem value="kst">한국 표준시 (KST)</SelectItem>
        <SelectItem value="jst">일본 표준시 (JST)</SelectItem>
        <SelectItem value="cst_china">중국 표준시 (CST)</SelectItem>
        <SelectItem value="ist">인도 표준시 (IST)</SelectItem>

        <SelectItem value="awst">호주 서부시간 (AWST)</SelectItem>
        <SelectItem value="acst">호주 중부시간 (ACST)</SelectItem>
        <SelectItem value="aest">호주 동부시간 (AEST)</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function SelectDisabledDemo() {
  return (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="과일 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">사과</SelectItem>
        <SelectItem value="banana">바나나</SelectItem>
        <SelectItem value="blueberry">블루베리</SelectItem>
      </SelectContent>
    </Select>
  )
}
