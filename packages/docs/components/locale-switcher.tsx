"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

export function LocaleSwitcher() {
  const pathname = usePathname()
  const isKo = pathname.startsWith("/ko")
  const targetHref = isKo ? pathname.replace(/^\/ko/, "") || "/" : `/ko${pathname}`

  return (
    <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
      <Link href={targetHref}>{isKo ? "EN" : "KO"}</Link>
    </Button>
  )
}
