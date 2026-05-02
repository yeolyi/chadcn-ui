import { GithubIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function GitHubLink({ stars }: { stars?: string }) {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <GithubIcon />
        {stars && <span className="w-fit text-xs text-muted-foreground tabular-nums">{stars}</span>}
      </a>
    </Button>
  )
}
