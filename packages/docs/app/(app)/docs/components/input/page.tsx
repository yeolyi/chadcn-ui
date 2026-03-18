import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import {
  InputBadgeDemo,
  InputBasicDemo,
  InputDisabledDemo,
  InputFieldDemo,
  InputFieldGroupDemo,
  InputFileDemo,
  InputGridDemo,
  InputGroupDemo,
  InputInlineDemo,
  InputInvalidDemo,
  InputMainDemo,
  InputRequiredDemo,
} from "./demos"

export const metadata = createMetadata({
  title: "Input",
  description: "A text input that types whatever it wants.",
})

export default async function InputPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Input</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            A text input that types whatever it wants.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputDemo() {\n  return (\n    <div className="w-full max-w-sm">\n      <Field>\n        <FieldLabel>API Key</FieldLabel>\n        <Input type="password" placeholder="Enter your API key..." />\n        <FieldDescription>\n          Your API key is encrypted and stored securely.\n        </FieldDescription>\n      </Field>\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <InputMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-[0.95rem] leading-7 text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                type=&quot;password&quot;
              </code>{" "}
              fields are displayed as plain text for user convenience.
            </li>
            <li>
              Every character you type is read aloud using the Web Speech API, so you can confirm
              your input without looking at the screen.
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
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Input } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Input />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\n\nexport function InputBasic() {\n  return (\n    <div className="w-full max-w-sm">\n      <Input type="email" placeholder="Email" />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputBasicDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Field</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Field</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">FieldLabel</code>,
              and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                FieldDescription
              </code>{" "}
              to create an input with a label and description.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputField() {\n  return (\n    <div className="w-full max-w-sm">\n      <Field>\n        <FieldLabel>Username</FieldLabel>\n        <Input placeholder="chadcn" />\n        <FieldDescription>\n          Choose a unique username for your account.\n        </FieldDescription>\n      </Field>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputFieldDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Field Group</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">FieldGroup</code>{" "}
              to show multiple{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Field</code> blocks
              and to build forms.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Button } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription, FieldGroup } from "@chadcn/ui"\n\nexport function InputFieldGroup() {\n  return (\n    <form className="space-y-4">\n      <FieldGroup>\n        <Field>\n          <FieldLabel>Name</FieldLabel>\n          <Input placeholder="Name" />\n        </Field>\n        <Field>\n          <FieldLabel>Email</FieldLabel>\n          <Input type="email" placeholder="Email" />\n          <FieldDescription>\n            We'll send updates to this address.\n          </FieldDescription>\n        </Field>\n      </FieldGroup>\n      <div className="flex gap-2">\n        <Button variant="outline" type="reset">Reset</Button>\n        <Button type="submit">Submit</Button>\n      </div>\n    </form>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputFieldGroupDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop to disable the input.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputDisabled() {\n  return (\n    <Field data-disabled>\n      <FieldLabel>Email</FieldLabel>\n      <Input disabled type="email" placeholder="Email" />\n      <FieldDescription>\n        This field is currently disabled.\n      </FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputDisabledDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Invalid</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">aria-invalid</code>{" "}
              prop to mark the input as invalid.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputInvalid() {\n  return (\n    <Field data-invalid>\n      <FieldLabel>Invalid Input</FieldLabel>\n      <Input aria-invalid type="email" placeholder="Email" />\n      <FieldDescription>\n        This field contains validation errors.\n      </FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputInvalidDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">File</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                type=&quot;file&quot;
              </code>{" "}
              to create a file input.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputFile() {\n  return (\n    <Field>\n      <FieldLabel>Picture</FieldLabel>\n      <Input type="file" />\n      <FieldDescription>Select a picture to upload.</FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputFileDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inline</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Pair with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Button</code> to
              create a search input with a button.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Button } from "@chadcn/ui"\n\nexport function InputInline() {\n  return (\n    <div className="flex gap-2">\n      <Input placeholder="Search..." />\n      <Button type="submit">Search</Button>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputInlineDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Grid</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use a grid layout to place multiple inputs side by side.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel } from "@chadcn/ui"\n\nexport function InputGrid() {\n  return (\n    <div className="grid grid-cols-2 gap-4">\n      <Field>\n        <FieldLabel>First Name</FieldLabel>\n        <Input placeholder="First Name" />\n      </Field>\n      <Field>\n        <FieldLabel>Last Name</FieldLabel>\n        <Input placeholder="Last Name" />\n      </Field>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputGridDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">required</code>{" "}
              attribute to indicate required inputs.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputRequired() {\n  return (\n    <Field>\n      <FieldLabel>\n        Required Field <span className="text-destructive">*</span>\n      </FieldLabel>\n      <Input required placeholder="This field is required" />\n      <FieldDescription>This field must be filled out.</FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputRequiredDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Badge</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Badge</code> in
              the label to highlight a recommended field.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Badge } from "@chadcn/ui"\nimport { Field, FieldLabel } from "@chadcn/ui"\n\nexport function InputBadge() {\n  return (\n    <Field>\n      <FieldLabel className="flex items-center gap-2">\n        Webhook URL <Badge variant="secondary">Beta</Badge>\n      </FieldLabel>\n      <Input placeholder="https://example.com/webhook" />\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputBadgeDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Input Group</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              To add icons or text inside an input, use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">InputGroup</code>{" "}
              component.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel } from "@chadcn/ui"\nimport { InputGroup, InputGroupText } from "@chadcn/ui"\n\nexport function InputGroupDemo() {\n  return (\n    <Field>\n      <FieldLabel>Website URL</FieldLabel>\n      <InputGroup>\n        <InputGroupText>https://</InputGroupText>\n        <Input placeholder="example.com" />\n      </InputGroup>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputGroupDemo />
            </ExamplePreview>
          </div>
        </section>
      </div>
    </div>
  )
}
