import { CheckIcon, ClipboardIcon, TerminalIcon } from "lucide-react"
import * as React from "react"

const packageManagers = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
} as const

type PM = keyof typeof packageManagers

export function InstallTabs({ pkg }: { pkg: string }) {
  const [active, setActive] = React.useState<PM>("pnpm")
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const tabs = React.useMemo(() => {
    const out = {} as Record<PM, string>
    for (const k of Object.keys(packageManagers) as PM[]) out[k] = `${packageManagers[k]} ${pkg}`
    return out
  }, [pkg])

  return (
    <div
      data-rehype-pretty-code-figure=""
      className="relative overflow-x-auto rounded-xl border bg-code text-code-foreground"
    >
      <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1">
        <div className="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
          <TerminalIcon className="size-3 text-[var(--color-code)]" />
        </div>
        <div className="flex">
          {(Object.keys(tabs) as PM[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              data-state={key === active ? "active" : "inactive"}
              className="h-7 rounded-md border border-transparent px-2 pt-0.5 text-sm font-medium text-foreground/60 hover:text-foreground data-[state=active]:border-input data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="no-scrollbar overflow-x-auto px-4 py-3.5">
        <pre>
          <code className="relative font-mono text-sm leading-none" data-language="bash">
            {tabs[active]}
          </code>
        </pre>
      </div>
      <button
        type="button"
        data-slot="copy-button"
        onClick={() => {
          navigator.clipboard.writeText(tabs[active])
          setCopied(true)
        }}
        className="absolute top-2 right-2 z-10 inline-flex size-6 items-center justify-center rounded-md opacity-70 hover:bg-accent hover:opacity-100"
        aria-label="Copy"
      >
        {copied ? <CheckIcon className="size-3" /> : <ClipboardIcon className="size-3" />}
      </button>
    </div>
  )
}
