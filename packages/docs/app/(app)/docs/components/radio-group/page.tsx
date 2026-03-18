import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import { RadioGroupDisabledDemo, RadioGroupMainDemo } from "./demos"

export const metadata = createMetadata({
  title: "Radio Group",
  description:
    "A set of checkable buttons — known as radio buttons — where you can check as many as you want.",
})

export default async function RadioGroupPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Radio Group</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            A set of checkable buttons&mdash;known as radio buttons&mdash;where you can check as many
            as you want.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { RadioGroup, RadioGroupItem } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function RadioGroupDemo() {\n  return (\n    <RadioGroup defaultValue="comfortable">\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="default" id="r1" />\n        <Label htmlFor="r1">Default</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="comfortable" id="r2" />\n        <Label htmlFor="r2">Comfortable</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="compact" id="r3" />\n        <Label htmlFor="r3">Compact</Label>\n      </div>\n    </RadioGroup>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <RadioGroupMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            Looks like a normal radio group, but you can select multiple options. Clicking an
            already-selected option deselects it. Because why should radio buttons limit your
            choices?
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
            code={`import "@chadcn/ui/styles.css"\nimport { RadioGroup, RadioGroupItem } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"`}
            lang="tsx"
          />
          <CodeBlock
            code={`<RadioGroup defaultValue="option-one">\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="option-one" id="option-one" />\n    <Label htmlFor="option-one">Option One</Label>\n  </div>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="option-two" id="option-two" />\n    <Label htmlFor="option-two">Option Two</Label>\n  </div>\n</RadioGroup>`}
            lang="tsx"
          />
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
              prop to disable the entire radio group.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { RadioGroup, RadioGroupItem } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function RadioGroupDisabled() {\n  return (\n    <RadioGroup defaultValue="comfortable" disabled>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="default" id="rd1" />\n        <Label htmlFor="rd1">Default</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="comfortable" id="rd2" />\n        <Label htmlFor="rd2">Comfortable</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="compact" id="rd3" />\n        <Label htmlFor="rd3">Compact</Label>\n      </div>\n    </RadioGroup>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <RadioGroupDisabledDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/radio-group#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI Radio Group
            </a>{" "}
            documentation.
          </p>
        </section>
      </div>
    </div>
  )
}
