"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const HOLD_MS = 10_000

export function Button({
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  asChild,
  style,
  ...props
}: ButtonBaseProps) {
  const [holdStart, setHoldStart] = React.useState<number | null>(null)
  const [tick, setTick] = React.useState(0)
  const [armed, setArmed] = React.useState(false)
  const rafRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (holdStart === null) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    const loop = () => {
      const t = performance.now()
      setTick(t)
      if (t - holdStart >= HOLD_MS) {
        setArmed(true)
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [holdStart])

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(e)
    if (armed) return
    setHoldStart(performance.now())
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e)
    if (armed) return
    setHoldStart(null)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!armed) {
      e.preventDefault()
      return
    }
    onClick?.(e)
    // Reset for the next session
    setArmed(false)
    setHoldStart(null)
  }

  const elapsed = holdStart === null ? 0 : Math.max(0, tick - holdStart)
  const progress = armed ? 1 : Math.min(elapsed / HOLD_MS, 1)
  const remainingMs = armed ? 0 : Math.max(0, HOLD_MS - elapsed)
  const counting = holdStart !== null && !armed

  const originalLabel =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement<{ children?: React.ReactNode }>).props
          .children
      : children

  const inner = (
    <>
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: `${progress * 100}%`,
          background: "rgba(255,255,255,0.22)",
          transition: "width 80ms linear",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          ...(counting
            ? {
                display: "inline-block",
                minWidth: "3.2em",
                textAlign: "center",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontVariantNumeric: "tabular-nums",
              }
            : null),
        }}
      >
        {counting ? `${(remainingMs / 1000).toFixed(1)}s` : originalLabel}
      </span>
    </>
  )

  // asChild requires Slot to receive exactly one element child — so when
  // asChild is true, clone the user-provided element and inject our overlay
  // + label spans as its children. See CLAUDE.md "asChild + multi-child label".
  const buttonChildren =
    asChild && React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<{ children?: React.ReactNode }>,
          undefined,
          inner,
        )
      : inner

  return (
    <ButtonBase
      asChild={asChild}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-busy={counting || undefined}
      aria-disabled={!armed || undefined}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: armed ? undefined : "wait",
        ...style,
      }}
      {...props}
    >
      {buttonChildren}
    </ButtonBase>
  )
}

export { buttonVariants }
