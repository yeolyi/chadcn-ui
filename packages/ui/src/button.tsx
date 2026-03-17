"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "./lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  onClick,
  children,
  ref,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const internalRef = React.useRef<HTMLButtonElement>(null)
  const mouseRef = React.useRef({ x: 0, y: 0 })
  const attemptsRef = React.useRef(0)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      internalRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const escape = React.useCallback(() => {
    if (attemptsRef.current >= 2) {
      setOffset({ x: 0, y: 0 })
      return
    }
    attemptsRef.current += 1
    const btn = internalRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const radius = Math.max(rect.width, rect.height) + 10
    const mouse = mouseRef.current

    // Try random angles to find a spot away from the cursor
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = radius * (0.5 + Math.random() * 0.5)
      const nx = Math.cos(angle) * dist
      const ny = Math.sin(angle) * dist

      // Where the button center would be after this offset
      const origCx = rect.left + rect.width / 2 - offset.x
      const origCy = rect.top + rect.height / 2 - offset.y
      const newCx = origCx + nx
      const newCy = origCy + ny

      const distToMouse = Math.sqrt((newCx - mouse.x) ** 2 + (newCy - mouse.y) ** 2)
      if (distToMouse > radius * 0.6) {
        setOffset({ x: nx, y: ny })
        return
      }
    }

    // Fallback: go opposite of cursor
    const origCx = rect.left + rect.width / 2 - offset.x
    const origCy = rect.top + rect.height / 2 - offset.y
    const dx = origCx - mouse.x
    const dy = origCy - mouse.y
    const len = Math.sqrt(dx * dx + dy * dy) || 1
    setOffset({ x: (dx / len) * radius, y: (dy / len) * radius })
  }, [offset])

  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      ref={setRefs}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      onMouseEnter={escape}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.15s ease-out",
        position: "relative",
        zIndex: 50,
      }}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
