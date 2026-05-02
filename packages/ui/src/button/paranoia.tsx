"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const CONFIRM_LABELS = [
  "정말 진행할까요?",
  "한 번 더 확인합니다",
  "되돌릴 수 없습니다",
  "최종 확인",
]

export function Button({
  onClick,
  children,
  size,
  ...props
}: ButtonBaseProps) {
  const [step, setStep] = React.useState(0)

  const advance =
    (idx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      if (idx !== step) return
      if (idx === CONFIRM_LABELS.length) {
        onClick?.(e)
        setStep(0)
        return
      }
      e.preventDefault()
      setStep(idx + 1)
    }

  return (
    <span className="relative inline-block">
      <ButtonBase
        size={size}
        onClick={advance(0)}
        disabled={step > 0}
        {...props}
      >
        {children}
      </ButtonBase>
      {step > 0 && (
        <span className="absolute left-0 top-full z-10 mt-2 flex flex-col items-start gap-2">
          {CONFIRM_LABELS.slice(0, step).map((label, i) => {
            const idx = i + 1
            return (
              <ButtonBase
                key={i}
                type="button"
                variant="outline"
                size={size}
                onClick={advance(idx)}
                disabled={step > idx}
              >
                {label}
              </ButtonBase>
            )
          })}
        </span>
      )}
    </span>
  )
}

export { buttonVariants }
