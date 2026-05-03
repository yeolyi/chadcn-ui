"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const PICK_COUNT = 5

type Phase = "idle" | "picking" | "gone"

export function Button({
  onClick,
  children,
  size,
  ...props
}: ButtonBaseProps) {
  const [phase, setPhase] = React.useState<Phase>("idle")
  const [winner, setWinner] = React.useState(0)

  const open = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setWinner(Math.floor(Math.random() * PICK_COUNT))
    setPhase("picking")
  }

  const pick = (idx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (idx === winner) {
      onClick?.(e)
      setPhase("idle")
    } else {
      setPhase("gone")
    }
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
      {phase === "picking" && (
        <span className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: PICK_COUNT }).map((_, i) => (
            <ButtonBase
              key={i}
              type="button"
              variant="outline"
              size="icon"
              onClick={pick(i)}
              aria-label={`추첨 ${i + 1}`}
            >
              ?
            </ButtonBase>
          ))}
        </span>
      )}
    </span>
  )
}

export { buttonVariants }
