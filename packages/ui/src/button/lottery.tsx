"use client"

import { CheckIcon, XIcon } from "lucide-react"
import * as React from "react"

import { cn } from "../lib/utils"
import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const PICK_COUNT = 5
const REVEAL_MS = 1000

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
        <span className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 gap-1.5 [perspective:600px]">
          {Array.from({ length: PICK_COUNT }).map((_, i) => {
            const isPicked = picked === i
            const flipped = phase === "revealing" && isPicked
            const isWinnerCard = i === winner
            return (
              <button
                key={i}
                type="button"
                onClick={pick(i)}
                disabled={phase !== "picking"}
                aria-label={`추첨 ${i + 1}`}
                className="size-9 cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span
                  className="relative block size-full transition-transform duration-500 [transform-style:preserve-3d]"
                  style={{
                    transform: flipped ? "rotateY(180deg)" : undefined,
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center rounded-md border bg-card text-sm font-medium text-card-foreground shadow-xs [backface-visibility:hidden]">
                    ?
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center rounded-md border bg-card shadow-xs [backface-visibility:hidden] [transform:rotateY(180deg)]",
                      isWinnerCard
                        ? "border-green-500 text-green-500"
                        : "border-red-500 text-red-500",
                    )}
                  >
                    {isWinnerCard ? (
                      <CheckIcon className="size-4" />
                    ) : (
                      <XIcon className="size-4" />
                    )}
                  </span>
                </span>
              </button>
            )
          })}
        </span>
      )}
    </span>
  )
}

export { buttonVariants }
