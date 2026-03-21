import { PackageIcon } from "lucide-react"

export function ComingSoon({
  children,
  label = "Coming Soon",
  description = "Package not yet published on npm.",
}: {
  children: React.ReactNode
  label?: string
  description?: string
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-40 blur-[1px]">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/90 px-4 py-2 shadow-sm backdrop-blur-sm">
          <PackageIcon className="size-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
