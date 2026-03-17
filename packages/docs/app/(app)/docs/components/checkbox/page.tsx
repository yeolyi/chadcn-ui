import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import {
  CheckboxDisabledDemo,
  CheckboxMainDemo,
  CheckboxWithTextDemo,
} from "./demos"

export const metadata = createMetadata({
  title: "Checkbox",
  description: "A control that prevents accidental unchecking of marketing preferences.",
})

export default async function CheckboxPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Checkbox</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            A control that prevents accidental unchecking of marketing preferences.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Checkbox } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function CheckboxDemo() {\n  return (\n    <div className="flex items-center gap-2">\n      <Checkbox id="terms" />\n      <Label htmlFor="terms">Accept terms and conditions</Label>\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <CheckboxMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-[0.95rem] leading-7 text-muted-foreground">
            <li>
              The checkbox automatically checks itself when scrolled out of the viewport. This ensures
              users don&apos;t accidentally skip important consent options.
            </li>
            <li>
              Once checked, the checkbox cannot be unchecked. This prevents accidental opt-outs from
              critical agreements.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <InstallTabs pkg="@chadcn/ui" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
          <CodeBlock code={`import { Checkbox } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Checkbox />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Text</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Pair the checkbox with a label and description text.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Checkbox } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function CheckboxWithText() {\n  return (\n    <div className="items-top flex gap-2">\n      <Checkbox id="terms-text" />\n      <div className="grid gap-1.5 leading-none">\n        <Label htmlFor="terms-text">\n          Accept terms and conditions\n        </Label>\n        <p className="text-sm text-muted-foreground">\n          You agree to our Terms of Service and Privacy Policy.\n        </p>\n      </div>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <CheckboxWithTextDemo />
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
                  code={`import { Checkbox } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function CheckboxDisabled() {\n  return (\n    <div className="flex items-center gap-2">\n      <Checkbox id="terms-disabled" disabled />\n      <Label htmlFor="terms-disabled">\n        Accept terms and conditions\n      </Label>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <CheckboxDisabledDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/checkbox#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI
            </a>{" "}
            documentation for more information.
          </p>
        </section>
      </div>
    </div>
  )
}
