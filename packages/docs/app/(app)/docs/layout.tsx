import { DocsSidebar } from "@/components/docs-sidebar"
import { TableOfContents } from "@/components/toc"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper flex flex-1 flex-col px-2">
      <SidebarProvider
        className="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)] 3xl:fixed:container 3xl:fixed:px-3"
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <DocsSidebar />
        <div className="flex h-full w-full">
          <div className="min-w-0 flex-1">{children}</div>
          <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-[220px] shrink-0 overflow-y-auto px-6 pt-10 xl:block">
            <TableOfContents />
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
