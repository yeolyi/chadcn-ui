"use client"

import { Switch } from "@chadcn/ui"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { useMetaColor } from "@/hooks/use-meta-color"
import * as React from "react"

export function SwitchMainDemo() {
  const { setTheme, resolvedTheme } = useTheme()
  const { setMetaColor, metaColor } = useMetaColor()
  const isDark = resolvedTheme === "dark"

  React.useEffect(() => {
    setMetaColor(metaColor)
  }, [metaColor, setMetaColor])

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="dark-mode"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Label htmlFor="dark-mode">다크 모드</Label>
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
