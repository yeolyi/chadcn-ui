"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const GAP_PX = 80
const FOLLOW_TRANSITION = "transform 140ms cubic-bezier(0.22, 1, 0.36, 1)"

function findContainer(el: HTMLElement): HTMLElement {
  let p: HTMLElement | null = el.parentElement
  while (p) {
    if (p === document.body) return p
    if (getComputedStyle(p).position !== "static") return p
    p = p.parentElement
  }
  return document.body
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
  const [locked, setLocked] = React.useState(false)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useEffect(() => {
    if (locked || asChild) return
    const btn = buttonRef.current
    if (!btn) return

    const container = findContainer(btn)

    let homeAbs = { x: 0, y: 0 }
    let size = { w: 0, h: 0 }

    const measure = () => {
      btn.style.transform = ""
      const r = btn.getBoundingClientRect()
      homeAbs = { x: r.left + window.scrollX, y: r.top + window.scrollY }
      size = { w: r.width, h: r.height }
    }
    measure()

    const onPointerMove = (e: PointerEvent) => {
      const homeViewportX = homeAbs.x - window.scrollX
      const homeViewportY = homeAbs.y - window.scrollY
      const homeCenterX = homeViewportX + size.w / 2
      const homeCenterY = homeViewportY + size.h / 2

      // Vector from cursor to home centre
      const dx = homeCenterX - e.clientX
      const dy = homeCenterY - e.clientY
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Cursor outside the personal-space radius — rest at home
      if (dist >= GAP_PX) {
        btn.style.transform = ""
        return
      }

      // Push button so its centre sits exactly GAP_PX from cursor along (dx,dy)
      const safeDist = Math.max(dist, 0.1)
      const scale = GAP_PX / safeDist
      const targetCenterX = e.clientX + dx * scale
      const targetCenterY = e.clientY + dy * scale

      const c = container.getBoundingClientRect()
      const targetLeft = Math.max(
        c.left,
        Math.min(c.right - size.w, targetCenterX - size.w / 2),
      )
      const targetTop = Math.max(
        c.top,
        Math.min(c.bottom - size.h, targetCenterY - size.h / 2),
      )

      const tx = targetLeft - homeViewportX
      const ty = targetTop - homeViewportY
      btn.style.transform = `translate(${tx}px, ${ty}px)`
    }

    const onResize = () => measure()

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
      btn.style.transform = ""
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
        transition: locked || asChild ? undefined : FOLLOW_TRANSITION,
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
