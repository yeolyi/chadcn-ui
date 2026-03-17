"use client"

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "./lib/utils"

const ChadSelectContext = React.createContext<{
  valuesRef: React.MutableRefObject<string[]>
  openCount: number
} | null>(null)

function Select({
  onValueChange,
  onOpenChange,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const allValuesRef = React.useRef<string[]>([])
  const [openCount, setOpenCount] = React.useState(0)

  // 15% chance of selecting a different item
  const handleValueChange = React.useCallback(
    (value: string) => {
      const values = allValuesRef.current
      if (Math.random() < 0.15 && values.length > 1) {
        const others = values.filter((v) => v !== value)
        onValueChange?.(others[Math.floor(Math.random() * others.length)])
      } else {
        onValueChange?.(value)
      }
    },
    [onValueChange],
  )

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) setOpenCount((c) => c + 1)
      onOpenChange?.(open)
    },
    [onOpenChange],
  )

  const ctx = React.useMemo(() => ({ valuesRef: allValuesRef, openCount }), [openCount])

  return (
    <ChadSelectContext.Provider value={ctx}>
      <SelectPrimitive.Root
        data-slot="select"
        onValueChange={handleValueChange}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </ChadSelectContext.Provider>
  )
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function shuffleChildren(children: React.ReactNode): React.ReactNode[] {
  const childArray = React.Children.toArray(children)
  return childArray.map((child) => {
    if (!React.isValidElement(child)) return child
    const childProps = child.props as Record<string, any>
    if (!childProps.children) return child

    const groupChildren = React.Children.toArray(childProps.children)
    const items: { index: number; node: React.ReactNode }[] = []
    const result: React.ReactNode[] = []

    for (let i = 0; i < groupChildren.length; i++) {
      const gc = groupChildren[i]
      const gcProps = React.isValidElement(gc) ? (gc.props as Record<string, any>) : null
      if (
        gcProps &&
        gcProps["data-slot"] !== "select-label" &&
        gcProps["data-slot"] !== "select-separator"
      ) {
        items.push({ index: i, node: gc })
      }
    }

    // Shuffle items
    const shuffled = [...items]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // Rebuild: place labels/separators in original positions, fill items with shuffled
    let itemIdx = 0
    for (let i = 0; i < groupChildren.length; i++) {
      const gc = groupChildren[i]
      const gcProps = React.isValidElement(gc) ? (gc.props as Record<string, any>) : null
      if (
        gcProps &&
        gcProps["data-slot"] !== "select-label" &&
        gcProps["data-slot"] !== "select-separator"
      ) {
        result.push(shuffled[itemIdx].node)
        itemIdx++
      } else {
        result.push(gc)
      }
    }

    return React.cloneElement(child, { children: result } as any)
  })
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const chadCtx = React.useContext(ChadSelectContext)
  // Shuffle every time the dropdown opens
  // biome-ignore lint/correctness/useExhaustiveDependencies: openCount triggers reshuffle on open
  const shuffledChildren = React.useMemo(() => shuffleChildren(children), [children, chadCtx?.openCount])

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {shuffledChildren}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const chadCtx = React.useContext(ChadSelectContext)
  React.useEffect(() => {
    if (chadCtx && props.value) {
      const v = props.value
      if (!chadCtx.valuesRef.current.includes(v)) chadCtx.valuesRef.current.push(v)
      return () => {
        chadCtx.valuesRef.current = chadCtx.valuesRef.current.filter((x) => x !== v)
      }
    }
  }, [chadCtx, props.value])

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
