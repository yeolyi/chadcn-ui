"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

export function Button({
  onMouseEnter,
  onClick: _onClick,
  disabled,
  style,
  tabIndex,
  ...props
}: ButtonBaseProps) {
  const [flinched, setFlinched] = React.useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(e)
    setFlinched(true)
  }

  const sealed = disabled || flinched

  return (
    <ButtonBase
      onMouseEnter={handleMouseEnter}
      disabled={sealed}
      aria-disabled={sealed || undefined}
      tabIndex={sealed ? -1 : tabIndex}
      style={sealed ? { ...style, pointerEvents: "none", opacity: 0.5 } : style}
      {...props}
    />
  )
}

export { buttonVariants }
