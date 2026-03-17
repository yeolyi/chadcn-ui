"use client"

import { Switch as SwitchPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "./lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  const isDefault = size === "default"
  const circleR = isDefault ? 8 : 6
  const circleCx = isDefault ? 9 : 7
  const extraW = isDefault ? 14 : 10
  const mask = `radial-gradient(circle ${circleR}px at ${circleCx}px 50%, transparent ${circleR}px, black ${circleR}px)`

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center overflow-hidden rounded-full border border-transparent bg-background shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-full rounded-full ring-0 transition-transform data-[state=checked]:bg-primary data-[state=unchecked]:bg-input data-[state=unchecked]:translate-x-0 dark:data-[state=unchecked]:bg-input/80",
          isDefault
            ? "data-[state=checked]:-translate-x-3.5"
            : "data-[state=checked]:-translate-x-2.5",
        )}
        style={{
          width: `calc(100% + ${extraW}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
