"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  code,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  value?: string
  code?: string
}) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const textToCopy = value ?? code ?? ""

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      size="icon"
      variant="ghost"
      className={cn(
        "absolute top-3 right-2 z-10 size-7 bg-code hover:opacity-100 focus-visible:opacity-100",
        className,
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(textToCopy)
          setHasCopied(true)
        } catch {}
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
