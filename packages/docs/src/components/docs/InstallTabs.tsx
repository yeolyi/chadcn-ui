import { CheckIcon, ClipboardIcon, TerminalIcon } from "lucide-react"
import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const packageManagers = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
} as const

type PM = keyof typeof packageManagers
const PM_KEYS = Object.keys(packageManagers) as PM[]

export function InstallTabs({ pkg }: { pkg: string }) {
  const [active, setActive] = React.useState<PM>("pnpm")
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const command = `${packageManagers[active]} ${pkg}`

  return (
    <div
      data-rehype-pretty-code-figure=""
      className="relative overflow-x-auto rounded-xl border bg-code text-code-foreground"
    >
      <Tabs value={active} onValueChange={(v) => setActive(v as PM)}>
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1">
          <div className="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
            <TerminalIcon className="size-3 text-[var(--color-code)]" />
          </div>
          <TabsList className="h-auto bg-transparent p-0 gap-0">
            {PM_KEYS.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-7 rounded-md px-2 text-sm font-medium text-foreground/60 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {PM_KEYS.map((key) => (
          <TabsContent key={key} value={key} className="m-0">
            <div className="no-scrollbar overflow-x-auto px-4 py-3.5">
              <pre>
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {`${packageManagers[key]} ${pkg}`}
                </code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <button
        type="button"
        data-slot="copy-button"
        onClick={() => {
          navigator.clipboard.writeText(command)
          setCopied(true)
        }}
        className="absolute top-2 right-2 z-10 inline-flex size-6 items-center justify-center rounded-md opacity-70 hover:bg-accent hover:opacity-100"
        aria-label="Copy"
      >
        {copied ? (
          <CheckIcon className="size-3" />
        ) : (
          <ClipboardIcon className="size-3" />
        )}
      </button>
    </div>
  )
}
