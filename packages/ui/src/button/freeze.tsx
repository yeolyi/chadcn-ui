"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

export function Button({
  onMouseEnter,
  onMouseLeave,
  onClick,
  disabled,
  style,
  ...props
}: ButtonBaseProps) {
  const [sealed, setSealed] = React.useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(e)
    setSealed(true)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e)
    setSealed(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sealed) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    onClick?.(e)
  }

  const inert = disabled || sealed

  return (
    <ButtonBase
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={inert || undefined}
      style={inert ? { ...style, opacity: 0.5 } : style}
      {...props}
    />
  )
}

export { buttonVariants }
