"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const nav = {
  en: {
    menuLabel: "Menu",
    homeLabel: "Home",
    sectionsLabel: "Sections",
    componentsLabel: "Components",
    sections: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
    ],
    components: [
      { name: "Button", href: "/docs/components/button" },
      { name: "Checkbox", href: "/docs/components/checkbox" },
      { name: "Input", href: "/docs/components/input" },
      { name: "Radio Group", href: "/docs/components/radio-group" },
      { name: "Select", href: "/docs/components/select" },
      { name: "Slider", href: "/docs/components/slider" },
      { name: "Switch", href: "/docs/components/switch" },
      { name: "Textarea", href: "/docs/components/textarea" },
      { name: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  ko: {
    menuLabel: "메뉴",
    homeLabel: "홈",
    sectionsLabel: "섹션",
    componentsLabel: "컴포넌트",
    sections: [
      { name: "소개", href: "/ko/docs" },
      { name: "설치", href: "/ko/docs/installation" },
    ],
    components: [
      { name: "Button", href: "/ko/docs/components/button" },
      { name: "Checkbox", href: "/ko/docs/components/checkbox" },
      { name: "Input", href: "/ko/docs/components/input" },
      { name: "Radio Group", href: "/ko/docs/components/radio-group" },
      { name: "Select", href: "/ko/docs/components/select" },
      { name: "Slider", href: "/ko/docs/components/slider" },
      { name: "Switch", href: "/ko/docs/components/switch" },
      { name: "Textarea", href: "/ko/docs/components/textarea" },
      { name: "Tooltip", href: "/ko/docs/components/tooltip" },
    ],
  },
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const isKo = pathname.startsWith("/ko")
  const { menuLabel, homeLabel, sectionsLabel, componentsLabel, sections, components } = isKo
    ? nav.ko
    : nav.en

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent lg:hidden dark:hover:bg-transparent"
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5",
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            {menuLabel}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-open:animate-none!"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">{menuLabel}</div>
            <div className="flex flex-col gap-3">
              <MobileLink href={isKo ? "/ko" : "/"} onOpenChange={setOpen}>
                {homeLabel}
              </MobileLink>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">{sectionsLabel}</div>
            <div className="flex flex-col gap-3">
              {sections.map(({ name, href }) => (
                <MobileLink key={href} href={href} onOpenChange={setOpen}>
                  {name}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">{componentsLabel}</div>
            <div className="flex flex-col gap-3">
              {components.map(({ name, href }) => (
                <MobileLink key={href} href={href} onOpenChange={setOpen}>
                  {name}
                </MobileLink>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("flex items-center gap-2 text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
