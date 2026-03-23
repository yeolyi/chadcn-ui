"use client"

import { Slider as SliderPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "./lib/utils"

const DAMPING = 0.96
const BOUNCE = 0.7
const HIT_X = 14
const HIT_Y = 30
const PUSH = 800

function Slider({
  className,
  defaultValue,
  value: controlledValue,
  min = 0,
  max = 100,
  onValueChange,
  ref,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const isControlled = controlledValue !== undefined
  const [initArray] = React.useState(() => {
    const v = controlledValue ?? defaultValue ?? [min, max]
    return Array.isArray(v) ? v : [v]
  })
  const [values, setValues] = React.useState(initArray)
  const _values = isControlled
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue!]
    : values
  const valuesRef = React.useRef(_values)
  valuesRef.current = _values
  const onChangeRef = React.useRef(onValueChange)
  onChangeRef.current = onValueChange

  const physics = React.useRef(initArray.map(() => ({ vx: 0 })))
  const cursor = React.useRef({ x: 0, y: 0, vx: 0, t: 0, on: false })
  const rootRef = React.useRef<HTMLElement>(null)
  const raf = React.useRef(0)
  const lt = React.useRef(0)

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      ;(rootRef as React.MutableRefObject<HTMLElement | null>).current = node
      if (typeof ref === "function") ref(node as never)
      else if (ref)
        (ref as React.MutableRefObject<HTMLElement | null>).current = node
    },
    [ref]
  )

  const updateValues = React.useCallback(
    (nv: number[]) => {
      const c = nv.map((v) => Math.max(min, Math.min(max, v)))
      const cur = valuesRef.current
      if (c.every((v, i) => Math.abs(v - (cur[i] ?? 0)) < 0.01)) return
      valuesRef.current = c
      if (!isControlled) setValues(c)
      onChangeRef.current?.(c)
    },
    [min, max, isControlled]
  )

  // Physics loop
  React.useEffect(() => {
    let running = true
    lt.current = 0

    const tick = (time: number) => {
      if (!running) return
      if (lt.current === 0) {
        lt.current = time
        raf.current = requestAnimationFrame(tick)
        return
      }
      const dt = Math.min((time - lt.current) / 1000, 0.033)
      lt.current = time

      const el = rootRef.current
      if (!el) {
        raf.current = requestAnimationFrame(tick)
        return
      }
      const trackW = el.getBoundingClientRect().width
      if (trackW === 0) {
        raf.current = requestAnimationFrame(tick)
        return
      }

      const vs = valuesRef.current
      const ps = physics.current
      while (ps.length < vs.length) ps.push({ vx: 0 })
      const valPerPx = (max - min) / trackW

      let changed = false
      const nv = [...vs]

      for (let i = 0; i < vs.length; i++) {
        const p = ps[i]

        // Soft push (pre-integration)
        if (cursor.current.on) {
          const thumbPx = ((vs[i] - min) / (max - min)) * trackW
          const dx = thumbPx - cursor.current.x
          if (Math.abs(dx) < HIT_X) {
            const dir = dx >= 0 ? 1 : -1
            p.vx += dir * (HIT_X - Math.abs(dx)) * PUSH * valPerPx * dt
            p.vx += cursor.current.vx * valPerPx * 0.3
          }
        }

        p.vx *= Math.pow(DAMPING, dt * 60)
        if (Math.abs(p.vx) < 0.05) p.vx = 0
        if (p.vx === 0) continue

        nv[i] += p.vx * dt
        changed = true

        // Hard collision (post-integration): prevent tunneling
        if (cursor.current.on) {
          const thumbPx = ((nv[i] - min) / (max - min)) * trackW
          const dx = thumbPx - cursor.current.x
          if (Math.abs(dx) < HIT_X) {
            const dir = dx >= 0 ? 1 : -1
            nv[i] = min + (cursor.current.x + dir * HIT_X) * valPerPx
            if (dir * p.vx < 0) p.vx *= -BOUNCE
          }
        }

        // Bounce off min/max
        if (nv[i] < min) {
          nv[i] = min
          p.vx = Math.abs(p.vx) * BOUNCE
        } else if (nv[i] > max) {
          nv[i] = max
          p.vx = -Math.abs(p.vx) * BOUNCE
        }
      }

      if (changed) updateValues(nv)
      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(raf.current)
    }
  }, [min, max, updateValues])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={_values}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
      ref={setRef}
      onPointerDownCapture={(e) => e.stopPropagation()}
      onPointerMoveCapture={(e: React.PointerEvent) => {
        const el = rootRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const now = performance.now()
        const x = e.clientX - rect.left
        const y = e.clientY - (rect.top + rect.height / 2)
        const c = cursor.current
        const cdt = (now - c.t) / 1000
        if (cdt > 0.001 && cdt < 0.1) c.vx = (x - c.x) / cdt
        c.x = x
        c.y = y
        c.t = now
        c.on = Math.abs(y) < HIT_Y
      }}
      onPointerLeave={() => {
        cursor.current.on = false
        cursor.current.vx = 0
      }}
      onPointerUp={() => {
        cursor.current.on = false
        cursor.current.vx = 0
      }}
      onPointerCancel={() => {
        cursor.current.on = false
        cursor.current.vx = 0
      }}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          tabIndex={-1}
          className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
