import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import {
  SliderControlledDemo,
  SliderDisabledDemo,
  SliderMainDemo,
  SliderRangeDemo,
} from "./demos"

export const metadata = createMetadata({
  title: "Slider",
  description: "An input where the user selects a value from within a given range.",
})

export default async function SliderPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Slider</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            An input where the user selects a value from within a given range.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Slider } from "@chadcn/ui"\n\nexport function SliderDemo() {\n  return (\n    <div className="w-full max-w-sm">\n      <Slider defaultValue={[33]} max={100} step={1} />\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <SliderMainDemo />
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
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Slider } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Slider defaultValue={[33]} max={100} step={1} />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Range</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use an array with two values for a range slider.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Slider } from "@chadcn/ui"\n\nexport function SliderRange() {\n  return (\n    <div className="w-full max-w-sm">\n      <Slider defaultValue={[25, 75]} max={100} step={1} />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SliderRangeDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Controlled</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">value</code> and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">onValueChange</code>{" "}
              to control the slider state.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Slider } from "@chadcn/ui"\nimport { useState } from "react"\n\nexport function SliderControlled() {\n  const [value, setValue] = useState([50])\n  return (\n    <div className="w-full max-w-sm space-y-2">\n      <Slider\n        value={value}\n        onValueChange={setValue}\n        max={100}\n        step={1}\n      />\n      <p className="text-sm text-muted-foreground">\n        Value: {value[0]}\n      </p>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SliderControlledDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop to disable the slider.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Slider } from "@chadcn/ui"\n\nexport function SliderDisabled() {\n  return (\n    <div className="w-full max-w-sm">\n      <Slider defaultValue={[50]} max={100} step={1} disabled />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SliderDisabledDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/slider#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI Slider
            </a>{" "}
            documentation.
          </p>
        </section>
      </div>
    </div>
  )
}
