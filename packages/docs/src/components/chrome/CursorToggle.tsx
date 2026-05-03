import { MousePointer2Icon, MousePointerBanIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const STORAGE_KEY = "chadcn:cursors-disabled"
const TOGGLE_EVENT = "chadcn:cursors-toggle"

function readDisabled(): boolean {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(STORAGE_KEY) === "1"
}

export function CursorToggle() {
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    setDisabled(readDisabled())
    const sync = () => setDisabled(readDisabled())
    window.addEventListener(TOGGLE_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(TOGGLE_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  const toggle = () => {
    const next = !disabled
    if (next) window.localStorage.setItem(STORAGE_KEY, "1")
    else window.localStorage.removeItem(STORAGE_KEY)
    setDisabled(next)
    window.dispatchEvent(new Event(TOGGLE_EVENT))
  }

  const Icon = disabled ? MousePointerBanIcon : MousePointer2Icon

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={disabled}
      aria-label={disabled ? "Enable live cursors" : "Disable live cursors"}
      title={disabled ? "Enable live cursors" : "Disable live cursors"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        disabled && "text-foreground/40",
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}
