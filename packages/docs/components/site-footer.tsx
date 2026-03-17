"use client"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  const pathname = usePathname()
  const isKo = pathname.startsWith("/ko")

  return (
    <footer className="group-has-[.docs-nav]/body:pb-20 group-has-[.section-soft]/body:bg-surface/40 group-has-[[data-slot=designer]]/body:hidden group-has-[[data-slot=docs]]/body:hidden group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent dark:group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="w-full px-1 text-center text-xs leading-loose text-muted-foreground sm:text-sm">
            {isKo ? (
              <>
                <a
                  href="https://github.com/shadcn-ui/ui"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  shadcn/ui
                </a>
                를 기반으로 제작되었습니다. 소스 코드는{" "}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                에서 확인할 수 있습니다.
              </>
            ) : (
              <>
                Built on{" "}
                <a
                  href="https://github.com/shadcn-ui/ui"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  shadcn/ui
                </a>
                . The source code is available on{" "}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                .
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
