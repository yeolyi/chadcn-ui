"use client"

import { Slider as SliderPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "./lib/utils"

// --- Physics constants ---
const DAMPING = 0.96
const BOUNCE = 0.7
const HIT_RADIUS = 12

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
  // --- Value management (take over from Radix for physics) ---
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

  const onValueChangeRef = React.useRef(onValueChange)
  onValueChangeRef.current = onValueChange

  // --- Physics state per thumb ---
  const physics = React.useRef(initArray.map(() => ({ vx: 0 })))
  const cursor = React.useRef({ x: 0, vx: 0, t: 0, on: false })
  const rootRef = React.useRef<HTMLElement>(null)
  const raf = React.useRef(0)
  const lt = React.useRef(0)

  // --- Ref forwarding ---
  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      ;(rootRef as React.MutableRefObject<HTMLElement | null>).current = node
      if (typeof ref === "function") ref(node as never)
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
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
      onValueChangeRef.current?.(c)
    },
    [min, max, isControlled]
  )

  // --- Physics loop ---
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

      let changed = false
      const nv = [...vs]

      for (let i = 0; i < vs.length; i++) {
        const p = ps[i]

        // Cursor collision: transfer cursor velocity to thumb
        if (cursor.current.on) {
          const thumbPx = ((vs[i] - min) / (max - min)) * trackW
          if (Math.abs(thumbPx - cursor.current.x) < HIT_RADIUS) {
            p.vx += cursor.current.vx * ((max - min) / trackW) * 0.5
          }
        }

        // Damping
        p.vx *= Math.pow(DAMPING, dt * 60)
        if (Math.abs(p.vx) < 0.05) p.vx = 0
        if (p.vx === 0) continue

        // Integrate
        nv[i] += p.vx * dt
        changed = true

        // Bounce off boundaries
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

  // --- Pointer tracking (capture phase to not interfere with Radix drag) ---
  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const now = performance.now()
      const x = e.clientX - rect.left
      const c = cursor.current
      const cdt = (now - c.t) / 1000
      if (cdt > 0.001 && cdt < 0.1) c.vx = (x - c.x) / cdt
      c.x = x
      c.t = now
      c.on = true
    },
    []
  )

  const handlePointerLeave = React.useCallback(() => {
    cursor.current.on = false
    cursor.current.vx = 0
  }, [])

  // Block Radix drag: stop pointerdown from reaching Radix internals
  const blockDrag = React.useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }, [])

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
      onPointerDownCapture={blockDrag}
      onPointerMoveCapture={handlePointerMove}
      onPointerLeave={handlePointerLeave}
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
