"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function HomeLink() {
  const pathname = usePathname()
  const isKo = pathname.startsWith("/ko")

  return (
    <Button asChild variant="ghost" size="icon" className="size-8">
      <Link href={isKo ? "/ko" : "/"}>
        <Icons.logo className="size-5" />
        <span className="sr-only">{siteConfig.name}</span>
      </Link>
    </Button>
  )
}
