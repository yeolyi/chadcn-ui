import { Popover } from "radix-ui"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileNavStrings {
  menu: string
  home: string
  sections: string
  components: string
  introduction: string
  installation: string
  toggleMenu: string
}

interface Props {
  basePath: string
  strings: MobileNavStrings
}

export function MobileNav({ basePath, strings }: Props) {
  const [open, setOpen] = React.useState(false)
  const homeHref = basePath || "/"
  const sections = [
    { name: strings.introduction, href: `${basePath}/docs` },
    { name: strings.installation, href: `${basePath}/docs/installation` },
  ]
  const components = [{ name: "Button", href: `${basePath}/docs/components/button` }]

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
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
            <span className="sr-only">{strings.toggleMenu}</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">{strings.menu}</span>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="no-scrollbar z-50 h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-[state=open]:animate-none!"
          align="start"
          side="bottom"
          alignOffset={-16}
          sideOffset={14}
        >
          <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-muted-foreground">{strings.menu}</div>
              <div className="flex flex-col gap-3">
                <MobileLink href={homeHref} onClose={() => setOpen(false)}>
                  {strings.home}
                </MobileLink>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-muted-foreground">{strings.sections}</div>
              <div className="flex flex-col gap-3">
                {sections.map(({ name, href }) => (
                  <MobileLink key={href} href={href} onClose={() => setOpen(false)}>
                    {name}
                  </MobileLink>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-muted-foreground">{strings.components}</div>
              <div className="flex flex-col gap-3">
                {components.map(({ name, href }) => (
                  <MobileLink key={href} href={href} onClose={() => setOpen(false)}>
                    {name}
                  </MobileLink>
                ))}
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

function MobileLink({
  href,
  onClose,
  children,
}: {
  href: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      onClick={onClose}
      className="flex items-center gap-2 text-2xl font-medium"
    >
      {children}
    </a>
  )
}
