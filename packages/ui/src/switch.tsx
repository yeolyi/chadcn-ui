"use client"

import * as React from "react"

import { cn } from "./lib/utils"

const DAMPING = 0.96
const BOUNCE = 0.9
const INERTIA = 1.2
const TILT_FORCE = 150

function Switch({
  className,
  size = "default",
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  name,
  value,
  id,
  ref,
  gyroPrompt = "Tap to use switch",
  ...props
}: Omit<React.ComponentProps<"button">, "checked" | "defaultChecked"> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: "sm" | "default"
  gyroPrompt?: string
}) {
  const thumbSize = size === "sm" ? 12 : 16
  const thumbR = thumbSize / 2
  const range = thumbSize - 2
  const mid = range / 2

  const trackRef = React.useRef<HTMLButtonElement>(null)
  const thumbRef = React.useRef<HTMLDivElement>(null)

  // Checked state
  const isControlled = controlledChecked !== undefined
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const checked = isControlled ? controlledChecked! : internalChecked
  const checkedRef = React.useRef(checked)
  checkedRef.current = checked
  const onChangeRef = React.useRef(onCheckedChange)
  onChangeRef.current = onCheckedChange

  const setChecked = React.useCallback(
    (v: boolean) => {
      if (v === checkedRef.current) return
      checkedRef.current = v
      if (!isControlled) setInternalChecked(v)
      onChangeRef.current?.(v)
    },
    [isControlled]
  )

  // Physics state
  const initialChecked = controlledChecked ?? defaultChecked
  const p = React.useRef({ x: initialChecked ? range : 0, vx: 0 })
  const tilt = React.useRef(0)
  const [gyroState, setGyroState] = React.useState<
    "idle" | "needs-permission" | "granted"
  >("idle")
  const prevScreenX = React.useRef(0)
  const raf = React.useRef(0)
  const lt = React.useRef(0)

  // Ref forwarding
  const setRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      ;(trackRef as React.MutableRefObject<HTMLButtonElement | null>).current =
        node
      if (typeof ref === "function") ref(node)
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref]
  )

  // Gyroscope
  const onOrientation = React.useCallback((e: DeviceOrientationEvent) => {
    tilt.current = e.gamma ?? 0
  }, [])

  React.useEffect(() => {
    if (disabled) return

    const doe = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>
    }

    if (typeof doe.requestPermission === "function") {
      // iOS: probe for existing permission
      const probe = (e: DeviceOrientationEvent) => {
        if (e.gamma !== null) {
          window.addEventListener("deviceorientation", onOrientation)
          setGyroState("granted")
        }
        window.removeEventListener("deviceorientation", probe)
      }
      window.addEventListener("deviceorientation", probe)
      const timer = setTimeout(() => {
        window.removeEventListener("deviceorientation", probe)
        setGyroState((s) => (s === "idle" ? "needs-permission" : s))
      }, 500)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("deviceorientation", probe)
        window.removeEventListener("deviceorientation", onOrientation)
      }
    } else if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation)
      setGyroState("granted")
    }

    return () => window.removeEventListener("deviceorientation", onOrientation)
  }, [disabled, onOrientation])

  const requestGyro = React.useCallback(async () => {
    const doe = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>
    }
    if (typeof doe.requestPermission !== "function") return
    const perm = await doe.requestPermission()
    if (perm === "granted") {
      window.addEventListener("deviceorientation", onOrientation)
      setGyroState("granted")
    }
  }, [onOrientation])

  // Disabled: static position
  React.useEffect(() => {
    if (!disabled || !thumbRef.current) return
    thumbRef.current.style.transform = `translateX(${checkedRef.current ? range : 0}px)`
  }, [disabled, range])

  // Physics loop
  React.useEffect(() => {
    if (disabled) return
    let running = true
    lt.current = 0
    prevScreenX.current = window.screenX

    const tick = (time: number) => {
      if (!running) return
      if (lt.current === 0) {
        lt.current = time
        raf.current = requestAnimationFrame(tick)
        return
      }
      const dt = Math.min((time - lt.current) / 1000, 0.033)
      lt.current = time
      const s = p.current

      // Window inertia (desktop)
      const screenX = window.screenX
      s.vx -= (screenX - prevScreenX.current) * INERTIA
      prevScreenX.current = screenX

      // Gyro tilt (mobile)
      s.vx += Math.max(-1, Math.min(1, tilt.current / 45)) * TILT_FORCE * dt

      // Damping
      s.vx *= Math.pow(DAMPING, dt * 60)
      if (Math.abs(s.vx) < 0.1) s.vx = 0

      // Integrate + bounce
      s.x += s.vx * dt
      if (s.x < 0) {
        s.x = 0
        s.vx = Math.abs(s.vx) * BOUNCE
      } else if (s.x > range) {
        s.x = range
        s.vx = -Math.abs(s.vx) * BOUNCE
      }

      // Update DOM
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translateX(${s.x}px)`
      }

      // Update state
      if (s.x > mid + 1 && !checkedRef.current) {
        setChecked(true)
        trackRef.current?.setAttribute("data-state", "checked")
        trackRef.current?.setAttribute("aria-checked", "true")
        thumbRef.current?.setAttribute("data-state", "checked")
      } else if (s.x < mid - 1 && checkedRef.current) {
        setChecked(false)
        trackRef.current?.setAttribute("data-state", "unchecked")
        trackRef.current?.setAttribute("aria-checked", "false")
        thumbRef.current?.setAttribute("data-state", "unchecked")
      }

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(raf.current)
    }
  }, [disabled, range, mid, setChecked])

  // Controlled value changed externally
  const hasSettled = React.useRef(false)
  React.useEffect(() => {
    if (!isControlled || disabled) return
    const s = p.current
    const wrongSide =
      (controlledChecked && s.x < mid) || (!controlledChecked && s.x > mid)
    if (!wrongSide) return

    if (!hasSettled.current) {
      s.x = controlledChecked ? range : 0
      s.vx = 0
      hasSettled.current = true
      if (thumbRef.current)
        thumbRef.current.style.transform = `translateX(${s.x}px)`
    } else {
      s.vx += controlledChecked ? 200 : -200
    }
  }, [controlledChecked, isControlled, mid, range, disabled])

  const state = checked ? "checked" : "unchecked"

  if (gyroState === "needs-permission") {
    return (
      <button
        type="button"
        id={id}
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/80 active:bg-muted/60",
          className
        )}
        onClick={requestGyro}
      >
        {gyroPrompt}
      </button>
    )
  }

  return (
    <>
      <button
        ref={setRef}
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={state}
        data-slot="switch"
        data-size={size}
        id={id}
        disabled={disabled}
        className={cn(
          "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          "data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
          className
        )}
        {...props}
      >
        <div
          ref={thumbRef}
          data-state={state}
          data-slot="switch-thumb"
          className="pointer-events-none block rounded-full bg-background ring-0 group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
          style={{
            transform: `translateX(${p.current.x}px)`,
            willChange: "transform",
          }}
        />
      </button>
      {name && (
        <input
          type="hidden"
          name={name}
          value={checked ? (value ?? "on") : ""}
        />
      )}
    </>
  )
}

export { Switch }
