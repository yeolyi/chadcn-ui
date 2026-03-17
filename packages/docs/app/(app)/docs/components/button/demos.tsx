"use client"

import { Button } from "@chadcn/ui"
import { ArrowUpIcon, ArrowUpRightIcon, CircleFadingArrowUpIcon, GitBranchIcon } from "lucide-react"
import Link from "next/link"


export function ButtonMainDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}

export function ButtonVariantDemo({ variant }: { variant: string }) {
  return (
    <Button variant={variant as any}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
  )
}

export function ButtonSizeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="xs" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="sm">Small</Button>
      <Button size="sm" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="default">Default</Button>
      <Button size="default" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="lg">Large</Button>
      <Button size="lg" variant="outline">
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
}

export function ButtonIconDemo() {
  return (
    <Button variant="outline" size="icon" aria-label="Upload">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}

export function ButtonWithIconDemo() {
  return (
    <Button>
      <GitBranchIcon data-icon="inline-start" />
      New Branch
    </Button>
  )
}

export function ButtonRoundedDemo() {
  return (
    <Button className="rounded-full" size="icon" variant="outline">
      <ArrowUpIcon />
    </Button>
  )
}

export function ButtonAsChildDemo() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
