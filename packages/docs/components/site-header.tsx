import { GitHubLink } from "@/components/github-link"
import { HomeLink } from "@/components/home-link"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6 3xl:fixed:px-0">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! 3xl:fixed:container">
          <HomeLink />
          <div className="ml-auto flex items-center gap-2">
            <LocaleSwitcher />
            <Separator orientation="vertical" />
            <GitHubLink />
            <Separator orientation="vertical" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
