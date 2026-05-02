import { ClipboardIcon, PackageIcon, TerminalIcon } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

const packageManagers = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
} as const

type PM = keyof typeof packageManagers

export function InstallTabs({
  pkg,
  comingSoon,
  comingSoonLabel = "Coming Soon",
  comingSoonDescription = "Package not yet published on npm.",
  copySuccessMessage = "Copied to clipboard",
}: {
  pkg: string
  comingSoon?: boolean
  comingSoonLabel?: string
  comingSoonDescription?: string
  copySuccessMessage?: string
}) {
  const [active, setActive] = React.useState<PM>("pnpm")

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
      <div
        className={
          "flex items-center gap-2 border-b border-border/50 px-3 py-1" +
          (comingSoon ? " pointer-events-none select-none opacity-40 blur-[1px]" : "")
        }
      >
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
      <div
        className={
          "no-scrollbar overflow-x-auto px-4 py-3.5" +
          (comingSoon ? " pointer-events-none select-none opacity-40 blur-[1px]" : "")
        }
      >
        <pre>
          <code className="relative font-mono text-sm leading-none" data-language="bash">
            {tabs[active]}
          </code>
        </pre>
      </div>
      {!comingSoon && (
        <button
          type="button"
          data-slot="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(tabs[active])
            toast(copySuccessMessage)
          }}
          className="absolute top-2 right-2 z-10 inline-flex size-7 items-center justify-center rounded-md opacity-70 hover:bg-accent hover:opacity-100"
          aria-label="Copy"
        >
          <ClipboardIcon className="size-3.5" />
        </button>
      )}
    </div>
  )
}
