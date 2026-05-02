"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  rotation: number
  vr: number
}

const PAD = 200

type Rgb = [number, number, number]

function toRgb(color: string): Rgb | null {
  if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return null
  const c = document.createElement("canvas")
  c.width = c.height = 1
  const ctx = c.getContext("2d")
  if (!ctx) return null
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const d = ctx.getImageData(0, 0, 1, 1).data
  if (d[3] < 10) return null
  return [d[0], d[1], d[2]]
}

function rgbStr([r, g, b]: Rgb): string {
  return `rgb(${r},${g},${b})`
}

function pickColor(btn: HTMLElement): string {
  const cs = getComputedStyle(btn)
  const bg = toRgb(cs.backgroundColor)
  if (bg) return rgbStr(bg)
  const border = toRgb(cs.borderTopColor)
  if (border) return rgbStr(border)
  const text = toRgb(cs.color)
  if (text) return rgbStr(text)
  const dark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  return dark ? "#e5e5e5" : "#171717"
}

export function Button({
  onMouseEnter,
  onClick: _onClick,
  ref,
  style,
  tabIndex,
  ...props
}: ButtonBaseProps) {
  const [state, setState] = React.useState<{
    rect: DOMRect
    scrollX: number
    scrollY: number
    particles: Particle[]
    color: string
  } | null>(null)
  const internalRef = React.useRef<HTMLButtonElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      internalRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  const disintegrate = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(e)
      if (state) return
      const btn = internalRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      const particles: Particle[] = []
      const step = 1.5
      const cx = w / 2
      const cy = h / 2
      const maxDist = Math.sqrt(cx * cx + cy * cy)

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const dx = x - cx
          const dy = y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          // outward burst — farther pixels get faster ejection
          const speed = 0.8 + (dist / maxDist) * 1.6 + Math.random() * 0.8
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6
          particles.push({
            x: x + PAD,
            y: y + PAD,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.4,
            size: 1 + Math.random() * 1.2,
            alpha: 1,
            rotation: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.3,
          })
        }
      }

      setState({
        rect,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        particles,
        color: pickColor(btn),
      })
    },
    [onMouseEnter, state],
  )

  React.useEffect(() => {
    if (!state) return
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return

    const w = state.rect.width + PAD * 2
    const h = state.rect.height + PAD * 2
    const dpr = window.devicePixelRatio || 1
    c.width = w * dpr
    c.height = h * dpr
    ctx.scale(dpr, dpr)
    ctx.fillStyle = state.color

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      let alive = 0
      for (const p of state.particles) {
        if (p.alpha <= 0) continue
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.06
        p.vx *= 0.99
        p.rotation += p.vr
        p.alpha -= 0.009
        if (p.alpha <= 0) continue
        alive++
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }
      if (alive > 0) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [state])

  return (
    <>
      <ButtonBase
        ref={setRefs}
        onMouseEnter={disintegrate}
        aria-hidden={state ? true : undefined}
        tabIndex={state ? -1 : tabIndex}
        style={{
          ...style,
          ...(state
            ? { opacity: 0, pointerEvents: "none", visibility: "hidden" as const }
            : null),
        }}
        {...props}
      />
      {state && typeof document !== "undefined" && createPortal(
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "absolute",
            left: state.rect.left + state.scrollX - PAD,
            top: state.rect.top + state.scrollY - PAD,
            width: state.rect.width + PAD * 2,
            height: state.rect.height + PAD * 2,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />,
        document.body,
      )}
    </>
  )
}

export { buttonVariants }
