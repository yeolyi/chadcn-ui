"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const FADE_MS = 700
const STAGGER_MAX = 800

export function Button({ onClick, ...props }: ButtonBaseProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)

    const leaves: Element[] = []
    const collect = (el: Element) => {
      if (el instanceof SVGSVGElement || el.children.length === 0) {
        leaves.push(el)
        return
      }
      for (const child of Array.from(el.children)) collect(child)
    }
    collect(document.body)
    const targets = leaves.filter(
      (el): el is HTMLElement | SVGElement =>
        (el instanceof HTMLElement || el instanceof SVGElement) && Math.random() < 0.5,
    )

    for (const el of targets) {
      const delay = Math.random() * STAGGER_MAX
      el.style.transition = `opacity ${FADE_MS}ms ease-out, transform ${FADE_MS}ms ease-out, filter ${FADE_MS}ms ease-out`
      window.setTimeout(() => {
        el.style.opacity = "0"
        el.style.transform = "translateY(20px) scale(0.96)"
        el.style.filter = "blur(8px)"
        window.setTimeout(() => el.remove(), FADE_MS)
      }, delay)
    }
  }

  return <ButtonBase onClick={handleClick} {...props} />
}

export { buttonVariants }
