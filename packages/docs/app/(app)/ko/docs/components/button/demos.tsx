"use client"

import { Button } from "@chadcn/ui"
import { ArrowUpIcon, ArrowUpRightIcon, CircleFadingArrowUpIcon, GitBranchIcon } from "lucide-react"
import Link from "next/link"


export function ButtonMainDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">버튼</Button>
      <Button variant="outline" size="icon" aria-label="제출">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}

export function ButtonVariantDemo({ variant, label }: { variant: string; label: string }) {
  return <Button variant={variant as any}>{label}</Button>
}

export function ButtonSizeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">아주 작게</Button>
      <Button size="xs" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="sm">작게</Button>
      <Button size="sm" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="default">기본</Button>
      <Button size="default" variant="outline">
        <ArrowUpRightIcon />
      </Button>
      <Button size="lg">크게</Button>
      <Button size="lg" variant="outline">
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
}

export function ButtonIconDemo() {
  return (
    <Button variant="outline" size="icon" aria-label="업로드">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}

export function ButtonWithIconDemo() {
  return (
    <Button>
      <GitBranchIcon data-icon="inline-start" />새 브랜치
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
      <Link href="/login">로그인</Link>
    </Button>
  )
}
