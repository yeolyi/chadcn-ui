import { CodeBlock } from "@/components/code-block"
import { ComingSoon } from "@/components/coming-soon"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"

import { TooltipMainDemo, TooltipSidesDemo } from "./demos"

export const metadata = createMetadata({
  title: "Tooltip",
  description:
    "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
})

export default async function TooltipPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Tooltip</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            A popup that displays information related to an element when the element receives
            keyboard focus or the mouse hovers over it.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import {\n  Button,\n  Tooltip,\n  TooltipContent,\n  TooltipProvider,\n  TooltipTrigger,\n} from "@chadcn/ui"\n\nexport function TooltipDemo() {\n  return (\n    <TooltipProvider>\n      <Tooltip>\n        <TooltipTrigger asChild>\n          <Button variant="outline">Hover</Button>\n        </TooltipTrigger>\n        <TooltipContent>\n          <p>Add to library</p>\n        </TooltipContent>\n      </Tooltip>\n    </TooltipProvider>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <TooltipMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            This component is currently identical to the shadcn/ui original. Chad behavior coming
            soon.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <InstallTabs pkg="@chadcn/ui" comingSoon />
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            Add the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              TooltipProvider
            </code>{" "}
            to the root of your app.
          </p>
          <CodeBlock
            code={`import { TooltipProvider } from "@chadcn/ui"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}`}
            lang="tsx"
            title="app/layout.tsx"
          />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
          <ComingSoon>
            <CodeBlock
              code={`import "@chadcn/ui/styles.css"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@chadcn/ui"`}
              lang="tsx"
            />
            <CodeBlock
              code={`<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`}
              lang="tsx"
            />
          </ComingSoon>
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Side</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">side</code> prop
              to change the position of the tooltip.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import {\n  Button,\n  Tooltip,\n  TooltipContent,\n  TooltipProvider,\n  TooltipTrigger,\n} from "@chadcn/ui"\n\nexport function TooltipSides() {\n  return (\n    <TooltipProvider>\n      <div className="flex flex-wrap items-center gap-4">\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">Top</Button>\n          </TooltipTrigger>\n          <TooltipContent side="top">\n            <p>Top tooltip</p>\n          </TooltipContent>\n        </Tooltip>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">Right</Button>\n          </TooltipTrigger>\n          <TooltipContent side="right">\n            <p>Right tooltip</p>\n          </TooltipContent>\n        </Tooltip>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">Bottom</Button>\n          </TooltipTrigger>\n          <TooltipContent side="bottom">\n            <p>Bottom tooltip</p>\n          </TooltipContent>\n        </Tooltip>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">Left</Button>\n          </TooltipTrigger>\n          <TooltipContent side="left">\n            <p>Left tooltip</p>\n          </TooltipContent>\n        </Tooltip>\n      </div>\n    </TooltipProvider>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <TooltipSidesDemo />
            </ExamplePreview>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            API Reference
          </h2>
          <p className="text-[0.95rem] text-muted-foreground">
            See the{" "}
            <a
              href="https://www.radix-ui.com/docs/primitives/components/tooltip#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix Tooltip
            </a>{" "}
            documentation.
          </p>
        </section>
      </div>
    </div>
  )
}
