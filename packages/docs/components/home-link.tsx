"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function HomeLink() {
  const pathname = usePathname()
  const isKo = pathname.startsWith("/ko")

  return (
    <Button asChild variant="ghost" size="icon" className="hidden size-9 lg:inline-flex">
      <Link href={isKo ? "/ko" : "/"}>
        <Image
          src="/logo.png"
          alt={siteConfig.name}
          width={32}
          height={32}
          className="size-8"
        />
        <span className="sr-only">{siteConfig.name}</span>
      </Link>
    </Button>
  )
}
