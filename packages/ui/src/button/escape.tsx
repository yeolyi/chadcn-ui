"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

export function Button({ onMouseEnter, style, ref, ...props }: ButtonBaseProps) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const internalRef = React.useRef<HTMLButtonElement>(null)
  const mouseRef = React.useRef({ x: 0, y: 0 })
  const attemptsRef = React.useRef(0)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      internalRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const escape = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(e)
      if (attemptsRef.current >= 2) {
        setOffset({ x: 0, y: 0 })
        return
      }
      attemptsRef.current += 1
      const btn = internalRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const radius = Math.max(rect.width, rect.height) + 10
      const mouse = mouseRef.current

      for (let i = 0; i < 16; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = radius * (0.5 + Math.random() * 0.5)
        const nx = Math.cos(angle) * dist
        const ny = Math.sin(angle) * dist

        const origCx = rect.left + rect.width / 2 - offset.x
        const origCy = rect.top + rect.height / 2 - offset.y
        const newCx = origCx + nx
        const newCy = origCy + ny

        const distToMouse = Math.sqrt((newCx - mouse.x) ** 2 + (newCy - mouse.y) ** 2)
        if (distToMouse > radius * 0.6) {
          setOffset({ x: nx, y: ny })
          return
        }
      }

      const origCx = rect.left + rect.width / 2 - offset.x
      const origCy = rect.top + rect.height / 2 - offset.y
      const dx = origCx - mouse.x
      const dy = origCy - mouse.y
      const len = Math.sqrt(dx * dx + dy * dy) || 1
      setOffset({ x: (dx / len) * radius, y: (dy / len) * radius })
    },
    [offset, onMouseEnter],
  )

  return (
    <ButtonBase
      ref={setRefs}
      onMouseEnter={escape}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.15s ease-out",
        position: "relative",
        zIndex: 50,
        ...style,
      }}
      {...props}
    />
  )
}

export { buttonVariants }
