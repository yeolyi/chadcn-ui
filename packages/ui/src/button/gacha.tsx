"use client"

import { CrownIcon, DiamondIcon, HeartIcon, StarIcon } from "lucide-react"
import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const SYMBOLS = [StarIcon, HeartIcon, DiamondIcon, CrownIcon]
const REEL_COUNT = 3
const REEL_LEN = 30
const REEL_DURATIONS_MS = [900, 1200, 1500]
const SUCCESS_RATE = 0.2
const RESULT_HOLD_MS = 600

function rollTargets() {
  const success = Math.random() < SUCCESS_RATE
  if (success) {
    const idx = Math.floor(Math.random() * SYMBOLS.length)
    return { targets: Array.from({ length: REEL_COUNT }, () => idx), success: true }
  }
  while (true) {
    const t = Array.from({ length: REEL_COUNT }, () =>
      Math.floor(Math.random() * SYMBOLS.length),
    )
    if (!t.every((v) => v === t[0])) return { targets: t, success: false }
  }
}

function buildReel(target: number): number[] {
  const arr = Array.from({ length: REEL_LEN }, () =>
    Math.floor(Math.random() * SYMBOLS.length),
  )
  arr[arr.length - 1] = target
  return arr
}

export function Button({
  onClick,
  children,
  style,
  ref,
  asChild,
  ...props
}: ButtonBaseProps) {
  const [reels, setReels] = React.useState<number[][] | null>(null)
  const [reelH, setReelH] = React.useState(0)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const reelInnerRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const spinningRef = React.useRef(false)

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useLayoutEffect(() => {
    const btn = buttonRef.current
    if (!btn) return
    const measure = () => setReelH(btn.clientHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(btn)
    return () => ro.disconnect()
  }, [])

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (spinningRef.current || asChild) return
    spinningRef.current = true
    const { targets, success } = rollTargets()
    const newReels = targets.map(buildReel)
    reelInnerRefs.current = []
    setReels(newReels)

    await new Promise((r) => requestAnimationFrame(() => r(null)))
    await new Promise((r) => requestAnimationFrame(() => r(null)))

    const h = buttonRef.current?.clientHeight ?? reelH
    const anims = reelInnerRefs.current.map((el, i) => {
      if (!el) return Promise.resolve()
      const dist = (REEL_LEN - 1) * h
      const a = el.animate(
        [
          { transform: "translateY(0px)" },
          { transform: `translateY(-${dist}px)` },
        ],
        {
          duration: REEL_DURATIONS_MS[i] ?? REEL_DURATIONS_MS.at(-1),
          easing: "cubic-bezier(0.2, 0.85, 0.25, 1)",
          fill: "forwards",
        },
      )
      return a.finished
    })

    await Promise.all(anims)
    await new Promise((r) => setTimeout(r, RESULT_HOLD_MS))

    setReels(null)
    spinningRef.current = false

    if (success) onClick?.(e)
  }

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
      onClick={handleClick}
      style={{
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
        ...style,
      }}
      {...props}
    >
      <span
        style={{ visibility: reels ? "hidden" : "visible" }}
      >
        {children}
      </span>
      {reels && reelH > 0 && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${REEL_COUNT}, minmax(0, 1fr))`,
            gap: "1px",
            background: "rgba(0,0,0,0.25)",
            zIndex: 5,
          }}
        >
          {reels.map((reel, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: reel order is fixed
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "rgba(0,0,0,0.55)",
              }}
            >
              <span
                ref={(node) => {
                  reelInnerRefs.current[i] = node
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  display: "block",
                }}
              >
                {reel.map((symIdx, j) => {
                  const Sym = SYMBOLS[symIdx]
                  return (
                    <span
                      // biome-ignore lint/suspicious/noArrayIndexKey: reel cells are fixed
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: `${reelH}px`,
                        color: "rgba(255,255,255,0.95)",
                      }}
                    >
                      <Sym style={{ width: "60%", height: "60%" }} />
                    </span>
                  )
                })}
              </span>
            </span>
          ))}
        </span>
      )}
    </ButtonBase>
  )
}

export { buttonVariants }
