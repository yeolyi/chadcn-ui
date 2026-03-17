"use client"

import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "./lib/utils"

function Checkbox({
  className,
  onCheckedChange,
  checked,
  defaultChecked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? checked ?? false)
  const ref = React.useRef<HTMLButtonElement>(null)

  // Sync with controlled value
  React.useEffect(() => {
    if (checked !== undefined) setInternalChecked(checked)
  }, [checked])

  // Toggle when scrolled out of viewport
  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setInternalChecked((prev) => {
            const next = prev === true ? false : true
            onCheckedChange?.(next)
            return next
          })
        }
      },
      { threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onCheckedChange])

  const handleCheckedChange = React.useCallback(
    (value: boolean | "indeterminate") => {
      setInternalChecked(value)
      onCheckedChange?.(value)
    },
    [onCheckedChange],
  )

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      checked={internalChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
