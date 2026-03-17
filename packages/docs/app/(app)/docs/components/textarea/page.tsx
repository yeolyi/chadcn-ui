import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import {
  TextareaDisabledDemo,
  TextareaMainDemo,
  TextareaWithButtonDemo,
  TextareaWithLabelDemo,
} from "./demos"

export const metadata = createMetadata({
  title: "Textarea",
  description: "Displays a form textarea or a component that looks like a textarea.",
})

export default async function TextareaPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Textarea</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            Displays a form textarea or a component that looks like a textarea.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Textarea } from "@chadcn/ui"\n\nexport function TextareaDemo() {\n  return (\n    <div className="w-full max-w-sm">\n      <Textarea placeholder="Type your message here." />\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <TextareaMainDemo />
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
          <CodeBlock code={`import { Textarea } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Textarea />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Label</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Pair with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Label</code> to
              create a textarea with a label and description.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Textarea } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function TextareaWithLabel() {\n  return (\n    <div className="w-full max-w-sm space-y-2">\n      <Label htmlFor="message">Your message</Label>\n      <Textarea id="message" placeholder="Type your message here." />\n      <p className="text-sm text-muted-foreground">\n        Your message will be sent to our support team.\n      </p>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <TextareaWithLabelDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop to disable the textarea.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Textarea } from "@chadcn/ui"\n\nexport function TextareaDisabled() {\n  return (\n    <div className="w-full max-w-sm">\n      <Textarea placeholder="Type your message here." disabled />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <TextareaDisabledDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Button</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Pair with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Button</code> to
              create a textarea with a submit button.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Textarea } from "@chadcn/ui"\nimport { Button } from "@chadcn/ui"\n\nexport function TextareaWithButton() {\n  return (\n    <div className="w-full max-w-sm space-y-2">\n      <Textarea placeholder="Type your message here." />\n      <Button>Send message</Button>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <TextareaWithButtonDemo />
            </ExamplePreview>
          </div>
        </section>
      </div>
    </div>
  )
}
