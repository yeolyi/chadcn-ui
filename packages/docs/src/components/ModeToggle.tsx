import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = React.useCallback(() => {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.classList.toggle("light", !next)
    try {
      localStorage.theme = next ? "dark" : "light"
    } catch {}
    setIsDark(next)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("group/toggle extend-touch-target size-8", className)}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
      <span className="sr-only">Toggle theme ({isDark ? "dark" : "light"})</span>
    </Button>
  )
}
