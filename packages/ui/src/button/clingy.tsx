"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

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
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
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
      const c = container.getBoundingClientRect()
      let tx = e.clientX - size.w / 2
      let ty = e.clientY - size.h / 2
      tx = Math.max(c.left, Math.min(c.right - size.w, tx))
      ty = Math.max(c.top, Math.min(c.bottom - size.h, ty))

      const homeViewportX = homeAbs.x - window.scrollX
      const homeViewportY = homeAbs.y - window.scrollY
      btn.style.transform = `translate(${tx - homeViewportX}px, ${ty - homeViewportY}px)`
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
