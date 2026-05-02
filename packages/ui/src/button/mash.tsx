"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const REQUIRED_CLICKS = 15
const DRAIN_MS = 4500
const STEP = 1 / REQUIRED_CLICKS

export function Button({
  onClick,
  children,
  style,
  ref,
  asChild,
  ...props
}: ButtonBaseProps) {
  const overlayRef = React.useRef<HTMLSpanElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const animRef = React.useRef<Animation | null>(null)
  const pressAnimRef = React.useRef<Animation | null>(null)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useEffect(
    () => () => {
      animRef.current?.cancel()
      pressAnimRef.current?.cancel()
    },
    [],
  )

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const el = overlayRef.current
      const parent = el?.parentElement
      if (!el || !parent) return

      const parentW = parent.clientWidth
      const currentW = parseFloat(getComputedStyle(el).width)
      const current = parentW > 0 ? Math.min(1, currentW / parentW) : 0
      const next = Math.min(1, current + STEP)

      animRef.current?.cancel()

      if (next >= 1) {
        el.style.width = "0%"
        const btn = buttonRef.current
        if (btn) {
          pressAnimRef.current?.cancel()
          pressAnimRef.current = btn.animate(
            [{ transform: "scale(0.95)" }, { transform: "scale(1)" }],
            { duration: 200, easing: "ease-out" },
          )
        }
        onClick?.(e)
        return
      }

      el.style.width = `${next * 100}%`
      animRef.current = el.animate(
        [{ width: `${next * 100}%` }, { width: "0%" }],
        { duration: next * DRAIN_MS, easing: "linear", fill: "forwards" },
      )
    },
    [onClick],
  )

  if (asChild) {
    return (
      <ButtonBase ref={setRefs} onClick={handleClick} asChild style={style} {...props}>
        {children}
      </ButtonBase>
    )
  }

  return (
    <ButtonBase
      ref={setRefs}
      onClick={handleClick}
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        ...style,
      }}
      {...props}
    >
      <span
        ref={overlayRef}
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "0%",
          background: "currentColor",
          opacity: 0.25,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {children}
    </ButtonBase>
  )
}

export { buttonVariants }
