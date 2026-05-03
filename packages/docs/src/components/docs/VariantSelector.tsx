"use client"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Item {
  slug: string
  href: string
}

interface Props {
  currentSlug: string
  items: Item[]
}

export function VariantSelector({ currentSlug, items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <span>{currentSlug}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={4} className="min-w-[12rem]">
        {items.map(({ slug, href }) => (
          <DropdownMenuItem key={slug} asChild>
            <a
              href={href}
              className={cn(
                slug === currentSlug && "bg-accent text-accent-foreground",
              )}
            >
              {slug}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
