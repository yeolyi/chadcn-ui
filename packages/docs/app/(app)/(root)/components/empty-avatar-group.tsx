import { PlusIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@chadcn/ui"
import { type Locale, translations } from "./translations"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyAvatarGroup({ locale = "en" }: { locale?: Locale }) {
  const t = translations.emptyAvatarGroup[locale]
  return (
    <Empty className="flex-none border py-10">
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup className="grayscale">
            <Avatar>
              <AvatarImage src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachadd.jpg" alt="@gigachad" />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://en.meming.world/images/en/1/18/Giga_Chad.jpg" alt="@gigachad2" />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://en.meming.world/images/en/e/e9/Giga_Chad_%28alt%29.jpg" alt="@gigachad3" />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>{t.title}</EmptyTitle>
        <EmptyDescription>{t.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon />
          {t.inviteMembers}
        </Button>
      </EmptyContent>
    </Empty>
  )
}
