"use client"

import { CheckIcon, ClipboardIcon, PackageIcon, TerminalIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const packageManagers = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
}

export function InstallTabs({
  pkg,
  comingSoon,
  comingSoonLabel = "Coming Soon",
  comingSoonDescription = "Package not yet published on npm.",
}: {
  pkg: string
  comingSoon?: boolean
  comingSoonLabel?: string
  comingSoonDescription?: string
}) {
  const [active, setActive] = React.useState<string>("pnpm")
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const tabs = React.useMemo(() => {
    return Object.fromEntries(
      Object.entries(packageManagers).map(([key, cmd]) => [key, `${cmd} ${pkg}`]),
    )
  }, [pkg])

  return (
    <div data-rehype-pretty-code-figure="" className="relative overflow-x-auto">
      {comingSoon && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/90 px-4 py-2 shadow-sm backdrop-blur-sm">
            <PackageIcon className="size-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{comingSoonLabel}</span>
              <span className="text-xs text-muted-foreground">{comingSoonDescription}</span>
            </div>
          </div>
        </div>
      )}
      <Tabs value={active} className={`gap-0${comingSoon ? " pointer-events-none select-none opacity-40 blur-[1px]" : ""}`} onValueChange={setActive}>
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1">
          <div className="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
            <TerminalIcon className="size-3 text-[var(--color-code)]" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.keys(tabs).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-7 border border-transparent pt-0.5 shadow-none! data-[state=active]:border-input data-[state=active]:bg-background!"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => (
            <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
              <pre>
                <code className="relative font-mono text-sm leading-none" data-language="bash">
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <Button
        data-slot="copy-button"
        size="icon"
        variant="ghost"
        className={`absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100${comingSoon ? " hidden" : ""}`}
        onClick={() => {
          navigator.clipboard.writeText(tabs[active])
          setHasCopied(true)
        }}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon className="size-3.5" /> : <ClipboardIcon className="size-3.5" />}
      </Button>
    </div>
  )
}
