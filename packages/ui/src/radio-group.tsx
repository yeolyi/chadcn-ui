"use client"

import { CircleIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "./lib/utils"

const DisabledContext = React.createContext(false)

function RadioGroup({
  className,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { disabled?: boolean }) {
  return (
    <DisabledContext.Provider value={disabled}>
      <div
        role="radiogroup"
        data-slot="radio-group"
        className={cn("grid gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </DisabledContext.Provider>
  )
}

function RadioGroupItem({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const groupDisabled = React.useContext(DisabledContext)

  return (
    <CheckboxPrimitive.Root
      data-slot="radio-group-item"
      disabled={disabled || groupDisabled}
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
