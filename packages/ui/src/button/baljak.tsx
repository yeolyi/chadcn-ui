"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const SPASM_DURATION_MS = 1500
const TICK_MS = 80

function glitchify(text: string): string {
  return [...text]
    .map((c) => (Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()))
    .join("")
}

export function Button({
  onClick,
  children,
  style,
  ...props
}: ButtonBaseProps) {
  const [spazzing, setSpazzing] = React.useState(false)
  const [tick, setTick] = React.useState(0)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const pendingRef = React.useRef<(() => void) | null>(null)
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  // Tick loop drives jitter / colour / glitch. Skipped under reduced-motion.
  React.useEffect(() => {
    if (!spazzing || reducedMotion) return
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS)
    return () => window.clearInterval(id)
  }, [spazzing, reducedMotion])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (spazzing) return
    e.preventDefault()
    pendingRef.current = onClick ? () => onClick(e) : null
    setSpazzing(true)
    timerRef.current = window.setTimeout(() => {
      setSpazzing(false)
      const cb = pendingRef.current
      pendingRef.current = null
      cb?.()
    }, SPASM_DURATION_MS)
  }

  // Constant lightness (55%) cycles through hue → no luminance flash, only
  // chromatic shift; far safer for photosensitive viewers than alternating
  // dark/bright frames. prefers-reduced-motion bypasses everything.
  const seizureStyle: React.CSSProperties =
    spazzing && !reducedMotion
      ? {
          transform: `translate(${(Math.random() - 0.5) * 6}px, ${
            (Math.random() - 0.5) * 6
          }px)`,
          backgroundColor: `hsl(${(tick * 47) % 360}, 78%, 55%)`,
          color: `hsl(${(tick * 47 + 180) % 360}, 78%, 22%)`,
          transition: "none",
        }
      : {}

  const displayChildren =
    spazzing && !reducedMotion && typeof children === "string"
      ? glitchify(children)
      : children

  return (
    <ButtonBase
      onClick={handleClick}
      style={{ ...style, ...seizureStyle }}
      {...props}
    >
      {displayChildren}
    </ButtonBase>
  )
}

export { buttonVariants }
