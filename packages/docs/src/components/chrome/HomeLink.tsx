import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function HomeLink({ href = "/" }: { href?: string }) {
  return (
    <Button asChild variant="ghost" size="icon" className="hidden size-9 lg:inline-flex">
      <a href={href}>
        <img src="/logo.png" alt={siteConfig.name} width={32} height={32} className="size-8" />
        <span className="sr-only">{siteConfig.name}</span>
      </a>
    </Button>
  )
}
