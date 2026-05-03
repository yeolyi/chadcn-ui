"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

type Entry = { id: number }

const registry: Entry[] = []
let nextId = 0

const FOLLOW_RADIUS = 80
const LERP = 0.08
const ANGLE_OFFSET = Math.PI / 4

export function Button({
  onClick,
  ref,
  asChild,
  style,
  children,
  ...props
}: ButtonBaseProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [locked, setLocked] = React.useState(false)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useEffect(() => {
    if (locked || asChild) return
    const btn = buttonRef.current
    if (!btn) return

    const entry: Entry = { id: ++nextId }
    registry.push(entry)

    let homeAbs = { x: 0, y: 0 }
    let size = { w: 0, h: 0 }

    const measure = () => {
      btn.style.transform = ""
      const r = btn.getBoundingClientRect()
      homeAbs = { x: r.left + window.scrollX, y: r.top + window.scrollY }
      size = { w: r.width, h: r.height }
    }
    measure()

    let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let cursorVel = { x: 0, y: 0 }
    let pos = { x: homeAbs.x - window.scrollX, y: homeAbs.y - window.scrollY }
    let raf = 0

    const onPointerMove = (e: PointerEvent) => {
      cursorVel = { x: e.clientX - cursor.x, y: e.clientY - cursor.y }
      cursor = { x: e.clientX, y: e.clientY }
    }
    const onResize = () => measure()

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("resize", onResize)

    const tick = () => {
      const idx = registry.findIndex((r) => r.id === entry.id)
      const total = Math.max(1, registry.length)
      const angle = (idx / total) * Math.PI * 2 + ANGLE_OFFSET

      const target = {
        x: cursor.x + Math.cos(angle) * FOLLOW_RADIUS - size.w / 2,
        y: cursor.y + Math.sin(angle) * FOLLOW_RADIUS - size.h / 2,
      }

      const center = { x: pos.x + size.w / 2, y: pos.y + size.h / 2 }
      const toCursor = { x: cursor.x - center.x, y: cursor.y - center.y }
      const dot = cursorVel.x * toCursor.x + cursorVel.y * toCursor.y
      const approaching = dot > 0

      if (!approaching) {
        pos.x += (target.x - pos.x) * LERP
        pos.y += (target.y - pos.y) * LERP
      }

      cursorVel.x *= 0.85
      cursorVel.y *= 0.85

      const homeViewportX = homeAbs.x - window.scrollX
      const homeViewportY = homeAbs.y - window.scrollY
      const dx = pos.x - homeViewportX
      const dy = pos.y - homeViewportY

      btn.style.transform = `translate(${dx}px, ${dy}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
      const i = registry.findIndex((r) => r.id === entry.id)
      if (i !== -1) registry.splice(i, 1)
      btn.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)"
      btn.style.transform = ""
      window.setTimeout(() => {
        btn.style.transition = ""
      }, 260)
    }
  }, [locked, asChild])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!locked) setLocked(true)
    onClick?.(e)
  }

  return (
    <ButtonBase
      ref={setRefs}
      onClick={handleClick}
      asChild={asChild}
      style={{
        position: "relative",
        zIndex: 30,
        willChange: "transform",
        userSelect: "none",
        WebkitUserSelect: "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  )
}

export { buttonVariants }
