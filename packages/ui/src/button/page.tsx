"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const HOVER_SCALE = 0.994
const PRESS_SCALE = 0.982

const PRESS_EASE = "cubic-bezier(0.4, 0, 0.2, 1)"
const SPRING_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)"
const SOFT_EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

const PRESS_MS = 90
const HOVER_MS = 260
const RELEASE_MS = 220

export function Button({
  onClick,
  children,
  style,
  ref,
  asChild,
  ...props
}: ButtonBaseProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [hovering, setHovering] = React.useState(false)
  const [pressed, setPressed] = React.useState(false)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  const writeOrigin = React.useCallback(() => {
    const btn = buttonRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = rect.left + rect.width / 2 + window.scrollX
    const y = rect.top + rect.height / 2 + window.scrollY
    document.body.style.transformOrigin = `${x}px ${y}px`
  }, [])

  React.useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return

    let target = 1
    let duration = RELEASE_MS
    let easing = SOFT_EASE

    if (pressed) {
      target = PRESS_SCALE
      duration = PRESS_MS
      easing = PRESS_EASE
    } else if (hovering) {
      target = HOVER_SCALE
      duration = HOVER_MS
      easing = SPRING_EASE
    }

    if (hovering || pressed) writeOrigin()

    document.body.style.transition = `transform ${duration}ms ${easing}`
    document.body.style.transform = `scale(${target})`
    btn.style.transition = `transform ${duration}ms ${easing}`
    btn.style.transform = `scale(${1 / target})`
  }, [hovering, pressed, writeOrigin])

  React.useEffect(
    () => () => {
      document.body.style.transform = ""
      document.body.style.transformOrigin = ""
      document.body.style.transition = ""
    },
    [],
  )

  React.useEffect(() => {
    if (!pressed) return
    const release = () => setPressed(false)
    window.addEventListener("pointerup", release)
    window.addEventListener("pointercancel", release)
    return () => {
      window.removeEventListener("pointerup", release)
      window.removeEventListener("pointercancel", release)
    }
  }, [pressed])

  if (asChild) {
    return (
      <ButtonBase ref={setRefs} asChild style={style} {...props}>
        {children}
      </ButtonBase>
    )
  }

  return (
    <ButtonBase
      ref={setRefs}
      onClick={onClick}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onPointerDown={(e) => {
        if (e.button !== 0) return
        setPressed(true)
      }}
      style={{
        position: "relative",
        zIndex: 50,
        ...style,
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  )
}

export { buttonVariants }
