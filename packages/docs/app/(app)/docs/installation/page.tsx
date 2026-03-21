import { CodeBlock } from "@/components/code-block"
import { ComingSoon } from "@/components/coming-soon"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"

export const metadata = createMetadata({
  title: "Installation",
  description: "How to install chadcn/ui in your project.",
})

export default async function InstallationPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Installation</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            How to install chadcn/ui in your project.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Install
          </h2>
          <InstallTabs pkg="@chadcn/ui" comingSoon />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            Import the stylesheet and components directly. The API is identical to shadcn/ui.
          </p>
          <ComingSoon>
            <CodeBlock
              code={`import "@chadcn/ui/styles.css"

import { Button } from "@chadcn/ui"
import { Input } from "@chadcn/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@chadcn/ui"`}
              lang="tsx"
            />
          </ComingSoon>
        </section>
      </div>
    </div>
  )
}
