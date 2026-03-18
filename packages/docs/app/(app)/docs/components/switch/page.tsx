import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import { SwitchDisabledDemo, SwitchMainDemo } from "./demos"

export const metadata = createMetadata({
  title: "Switch",
  description: "A control that allows the user to toggle between checked and not checked.",
})

export default async function SwitchPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Switch</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            A control that allows the user to toggle between checked and not checked.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Switch } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function SwitchDemo() {\n  return (\n    <div className="flex items-center gap-2">\n      <Switch id="airplane-mode" />\n      <Label htmlFor="airplane-mode">Airplane Mode</Label>\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <SwitchMainDemo />
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
          <InstallTabs pkg="@chadcn/ui" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Switch } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Switch />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop to disable the switch.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Switch } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function SwitchDisabled() {\n  return (\n    <div className="flex items-center gap-2">\n      <Switch id="disabled-switch" disabled />\n      <Label htmlFor="disabled-switch">Disabled</Label>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SwitchDisabledDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/switch#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix Switch
            </a>{" "}
            documentation.
          </p>
        </section>
      </div>
    </div>
  )
}
