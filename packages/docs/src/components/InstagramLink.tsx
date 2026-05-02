import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function InstagramLink({ followers }: { followers?: string }) {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
        <Icons.instagram />
        {followers && (
          <span className="w-fit text-xs text-muted-foreground tabular-nums">{followers}</span>
        )}
      </a>
    </Button>
  )
}
