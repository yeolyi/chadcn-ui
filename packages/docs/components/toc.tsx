"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

import { cn } from "@/lib/utils"

export function TableOfContents({ className }: { className?: string }) {
  const pathname = usePathname()
  const [toc, setToc] = React.useState<{ id: string; text: string; depth: number }[]>([])
  const [activeId, setActiveId] = React.useState<string>("")

  // Collect headings on page change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only re-run on pathname change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll("h2, h3")
      const items: { id: string; text: string; depth: number }[] = []

      headings.forEach((el) => {
        if (!el.id) {
          el.id =
            el.textContent
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\p{L}\p{N}_-]/gu, "") ?? ""
        }
        items.push({
          id: el.id,
          text: el.textContent ?? "",
          depth: el.tagName === "H2" ? 2 : 3,
        })
      })

      setToc(items)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  // Track active heading via scroll position
  React.useEffect(() => {
    if (toc.length === 0) return

    function onScroll() {
      const scrollY = window.scrollY + 100
      let current = ""

      for (const item of toc) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollY) {
          current = item.id
        }
      }

      setActiveId(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [toc])

  if (toc.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="sticky top-0 h-6 bg-background text-xs font-medium text-muted-foreground">
        On This Page
      </p>
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-[0.8rem] leading-relaxed text-muted-foreground/60 no-underline transition-colors hover:text-foreground data-[active=true]:font-semibold data-[active=true]:text-foreground data-[depth=3]:pl-4"
          data-active={item.id === activeId}
          data-depth={item.depth}
        >
          {item.text}
        </a>
      ))}
    </div>
  )
}
