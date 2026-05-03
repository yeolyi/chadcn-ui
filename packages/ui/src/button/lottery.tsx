"use client"

import { CheckIcon, XIcon } from "lucide-react"
import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const PICK_COUNT = 5
const REVEAL_MS = 700

type Phase = "idle" | "picking" | "revealing" | "gone"

export function Button({
  onClick,
  children,
  size,
  ...props
}: ButtonBaseProps) {
  const [phase, setPhase] = React.useState<Phase>("idle")
  const [winner, setWinner] = React.useState(0)
  const [picked, setPicked] = React.useState<number | null>(null)
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const open = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setWinner(Math.floor(Math.random() * PICK_COUNT))
    setPicked(null)
    setPhase("picking")
  }

  const pick = (idx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (phase !== "picking") return
    e.preventDefault()
    setPicked(idx)
    setPhase("revealing")
    const isWinner = idx === winner
    timerRef.current = window.setTimeout(() => {
      if (isWinner) {
        onClick?.(e)
        setPhase("idle")
        setPicked(null)
      } else {
        setPhase("gone")
      }
    }, REVEAL_MS)
  }

  return (
    <span className="relative inline-block">
      <ButtonBase
        size={size}
        onClick={open}
        disabled={phase !== "idle"}
        style={
          phase === "gone"
            ? { visibility: "hidden", pointerEvents: "none" }
            : undefined
        }
        {...props}
      >
        {children}
      </ButtonBase>
      {(phase === "picking" || phase === "revealing") && (
        <span className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: PICK_COUNT }).map((_, i) => {
            const isPicked = picked === i
            const showResult = phase === "revealing" && isPicked
            const isWinnerCard = i === winner
            const colorClass = showResult
              ? isWinnerCard
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
              : ""
            return (
              <ButtonBase
                key={i}
                type="button"
                variant="outline"
                size="icon"
                onClick={pick(i)}
                disabled={phase !== "picking"}
                className={colorClass}
                aria-label={`추첨 ${i + 1}`}
              >
                {showResult ? (
                  isWinnerCard ? (
                    <CheckIcon />
                  ) : (
                    <XIcon />
                  )
                ) : (
                  "?"
                )}
              </ButtonBase>
            )
          })}
        </span>
      )}
    </span>
  )
}

export { buttonVariants }
