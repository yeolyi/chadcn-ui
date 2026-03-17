"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const nav = {
  en: {
    sectionsLabel: "Sections",
    componentsLabel: "Components",
    sections: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
    ],
    components: [
      { name: "Button", href: "/docs/components/button" },
      { name: "Checkbox", href: "/docs/components/checkbox" },
      { name: "Input", href: "/docs/components/input" },
      { name: "Radio Group", href: "/docs/components/radio-group" },
      { name: "Select", href: "/docs/components/select" },
      { name: "Slider", href: "/docs/components/slider" },
      { name: "Switch", href: "/docs/components/switch" },
      { name: "Textarea", href: "/docs/components/textarea" },
      { name: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  ko: {
    sectionsLabel: "섹션",
    componentsLabel: "컴포넌트",
    sections: [
      { name: "소개", href: "/ko/docs" },
      { name: "설치", href: "/ko/docs/installation" },
    ],
    components: [
      { name: "Button", href: "/ko/docs/components/button" },
      { name: "Checkbox", href: "/ko/docs/components/checkbox" },
      { name: "Input", href: "/ko/docs/components/input" },
      { name: "Radio Group", href: "/ko/docs/components/radio-group" },
      { name: "Select", href: "/ko/docs/components/select" },
      { name: "Slider", href: "/ko/docs/components/slider" },
      { name: "Switch", href: "/ko/docs/components/switch" },
      { name: "Textarea", href: "/ko/docs/components/textarea" },
      { name: "Tooltip", href: "/ko/docs/components/tooltip" },
    ],
  },
}

export function DocsSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const isKo = pathname.startsWith("/ko")
  const { sectionsLabel, componentsLabel, sections, components } = isKo ? nav.ko : nav.en

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />
      <div className="absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs" />
      <div className="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent via-border to-transparent lg:flex" />
      <SidebarContent className="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2">
        <SidebarGroup className="pt-6">
          <SidebarGroupLabel className="font-medium text-muted-foreground">
            {sectionsLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map(({ name, href }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
                  >
                    <Link href={href}>{name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium text-muted-foreground">
            {componentsLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {components.map(({ name, href }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
                  >
                    <Link href={href}>{name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs" />
      </SidebarContent>
    </Sidebar>
  )
}
