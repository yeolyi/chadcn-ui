"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const FADE_DISTANCE = 160
const FADE_TRANSITION = "opacity 120ms ease-out"

function distanceToRect(x: number, y: number, r: DOMRect): number {
  const dx = Math.max(r.left - x, 0, x - r.right)
  const dy = Math.max(r.top - y, 0, y - r.bottom)
  return Math.sqrt(dx * dx + dy * dy)
}

export function Button({
  onClick,
  ref,
  asChild,
  style,
  children,
  ...props
}: ButtonBaseProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [enabled, setEnabled] = React.useState(false)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useEffect(() => {
    if (asChild) return
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(pointer: fine)")
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [asChild])

  React.useEffect(() => {
    if (!enabled) return
    const btn = buttonRef.current
    if (!btn) return

    const onMove = (e: PointerEvent) => {
      const rect = btn.getBoundingClientRect()
      const dist = distanceToRect(e.clientX, e.clientY, rect)
      const opacity = Math.min(1, dist / FADE_DISTANCE)
      btn.style.opacity = `${opacity}`
      btn.style.pointerEvents = opacity < 0.05 ? "none" : ""
    }

    window.addEventListener("pointermove", onMove)
    return () => {
      window.removeEventListener("pointermove", onMove)
      btn.style.opacity = ""
      btn.style.pointerEvents = ""
    }
  }, [enabled])

  if (asChild) {
    return (
      <ButtonBase ref={setRefs} asChild onClick={onClick} style={style} {...props}>
        {children}
      </ButtonBase>
    )
  }

  return (
    <ButtonBase
      ref={setRefs}
      onClick={onClick}
      style={{
        transition: enabled ? FADE_TRANSITION : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  )
}

export { buttonVariants }
