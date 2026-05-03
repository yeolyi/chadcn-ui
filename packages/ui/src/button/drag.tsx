"use client"

import * as React from "react"

import { cn } from "../lib/utils"
import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const SHAKE_KEYFRAMES = `
@keyframes drag-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
`

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (React.isValidElement(node)) {
    return extractText(
      (node.props as { children?: React.ReactNode }).children,
    )
  }
  return ""
}

const isFillable = (c: string) => /\p{L}|\p{N}/u.test(c)

export function Button({
  onClick,
  children,
  asChild,
  className,
  style,
  ...props
}: ButtonBaseProps) {
  const goalText = React.useMemo(
    () => extractText(children).normalize("NFC"),
    [children],
  )
  const goalChars = React.useMemo(() => [...goalText], [goalText])

  const [filled, setFilled] = React.useState<boolean[]>(() =>
    goalChars.map((c) => !isFillable(c)),
  )

  // Reset whenever the goal text changes
  React.useEffect(() => {
    setFilled(goalChars.map((c) => !isFillable(c)))
  }, [goalText])

  const [dragOver, setDragOver] = React.useState(false)
  const [shaking, setShaking] = React.useState(false)
  const shakeTimerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (shakeTimerRef.current) window.clearTimeout(shakeTimerRef.current)
    }
  }, [])

  const allFilled = filled.every(Boolean)
  const hasGoal = goalChars.length > 0

  const triggerShake = () => {
    if (shakeTimerRef.current) window.clearTimeout(shakeTimerRef.current)
    setShaking(false)
    requestAnimationFrame(() => {
      setShaking(true)
      shakeTimerRef.current = window.setTimeout(() => setShaking(false), 350)
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    if (allFilled) return
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => setDragOver(false)

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (allFilled || !hasGoal) return

    const text = e.dataTransfer.getData("text/plain").normalize("NFC")
    const chars = [...text].filter((c) => isFillable(c))
    if (chars.length !== 1) {
      triggerShake()
      return
    }
    const dropped = chars[0]

    const target = goalChars.findIndex(
      (c, i) =>
        !filled[i] &&
        isFillable(c) &&
        c.toLowerCase() === dropped.toLowerCase(),
    )
    if (target === -1) {
      triggerShake()
      return
    }
    setFilled((prev) => {
      const next = [...prev]
      next[target] = true
      return next
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!allFilled) {
      triggerShake()
      return
    }
    onClick?.(e)
  }

  if (!hasGoal) {
    return (
      <ButtonBase
        asChild={asChild}
        onClick={onClick}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </ButtonBase>
    )
  }

  const slotSpans = goalChars.map((c, i) => (
    <span
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      className={cn(
        "transition-opacity duration-200",
        filled[i] ? "opacity-100" : "opacity-30",
      )}
    >
      {c}
    </span>
  ))

  const labelContent = allFilled ? children : slotSpans

  // asChild requires Slot to receive a single element child
  const buttonChildren =
    asChild && React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<{ children?: React.ReactNode }>,
          undefined,
          labelContent,
        )
      : labelContent

  return (
    <>
      <style>{SHAKE_KEYFRAMES}</style>
      <ButtonBase
        asChild={asChild}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          !allFilled && "cursor-not-allowed",
          dragOver && "ring-2 ring-ring ring-offset-2",
          className,
        )}
        style={
          shaking
            ? { ...style, animation: "drag-shake 0.35s ease-in-out" }
            : style
        }
        {...props}
      >
        {buttonChildren}
      </ButtonBase>
    </>
  )
}

export { buttonVariants }
