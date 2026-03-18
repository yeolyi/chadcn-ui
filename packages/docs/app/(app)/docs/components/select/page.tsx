import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"

import { SelectDisabledDemo, SelectMainDemo, SelectScrollableDemo } from "./demos"

export const metadata = createMetadata({
  title: "Select",
  description: "An always-fair select component. The order changes every time you open it.",
})

export default async function SelectPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Select</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            An always-fair select component. The order changes every time you open it.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import {\n  Select,\n  SelectContent,\n  SelectItem,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"\n\nexport function SelectDemo() {\n  return (\n    <Select>\n      <SelectTrigger className="w-[180px]">\n        <SelectValue placeholder="Select a fruit" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectItem value="apple">Apple</SelectItem>\n        <SelectItem value="banana">Banana</SelectItem>\n        <SelectItem value="blueberry">Blueberry</SelectItem>\n        <SelectItem value="grapes">Grapes</SelectItem>\n        <SelectItem value="pineapple">Pineapple</SelectItem>\n      </SelectContent>\n    </Select>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <SelectMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            This component uses the same compound component API as shadcn/ui (
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Select</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectTrigger</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectContent</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectItem</code>
            ), but the options are shuffled every time you open the dropdown.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <InstallTabs pkg="@chadcn/ui" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
          <CodeBlock
            code={`import "@chadcn/ui/styles.css"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@chadcn/ui"`}
            lang="tsx"
          />
          <CodeBlock
            code={`<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`}
            lang="tsx"
          />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scrollable</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              The select content automatically becomes scrollable when the list of items exceeds the
              available height.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import {\n  Select,\n  SelectContent,\n  SelectItem,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"\n\nexport function SelectScrollable() {\n  return (\n    <Select>\n      <SelectTrigger className="w-[280px]">\n        <SelectValue placeholder="Select a timezone" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>\n        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>\n        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>\n        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>\n        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>\n        <SelectItem value="cet">Central European Time (CET)</SelectItem>\n        <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>\n        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>\n      </SelectContent>\n    </Select>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SelectScrollableDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop to prevent interaction.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import {\n  Select,\n  SelectContent,\n  SelectItem,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"\n\nexport function SelectDisabled() {\n  return (\n    <Select disabled>\n      <SelectTrigger className="w-[180px]">\n        <SelectValue placeholder="Select a fruit" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectItem value="apple">Apple</SelectItem>\n        <SelectItem value="banana">Banana</SelectItem>\n      </SelectContent>\n    </Select>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SelectDisabledDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/select#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI Select
            </a>{" "}
            documentation.
          </p>
        </section>
      </div>
    </div>
  )
}
