"use client"

import * as React from "react"

import { cn } from "./lib/utils"

function Input({
  className,
  type,
  onChange,
  ...props
}: React.ComponentProps<"input">) {
  // Password fields are shown as text for user convenience
  const chadType = type === "password" ? "text" : type

  // Read each typed character aloud via Web Speech API
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      const value = e.target.value
      if (value.length > 0 && typeof window !== "undefined" && window.speechSynthesis) {
        const lastChar = value[value.length - 1]
        const utterance = new SpeechSynthesisUtterance(lastChar)
        utterance.rate = 1.2
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      }
    },
    [onChange],
  )

  return (
    <input
      type={chadType}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
      onChange={handleChange}
    />
  )
}

export { Input }
