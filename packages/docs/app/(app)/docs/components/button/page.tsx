import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"

import {
  ButtonAsChildDemo,
  ButtonIconDemo,
  ButtonMainDemo,
  ButtonRoundedDemo,
  ButtonSizeDemo,
  ButtonVariantDemo,
  ButtonWithIconDemo,
} from "./demos"

export const metadata = createMetadata({
  title: "Button",
  description: "Displays a button with built-in misclick prevention.",
})

export default async function ButtonPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Button</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            Displays a button with built-in misclick prevention.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Button } from "@chadcn/ui"\nimport { ArrowUpIcon } from "lucide-react"\n\nexport function ButtonDemo() {\n  return (\n    <div className="flex flex-wrap items-center gap-2">\n      <Button variant="outline">Button</Button>\n      <Button variant="outline" size="icon" aria-label="Submit">\n        <ArrowUpIcon />\n      </Button>\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <ButtonMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            This component accepts the same props as the shadcn/ui Button (
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">variant</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">size</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">asChild</code>
            ), with built-in misclick prevention. The button repositions itself away from the
            cursor on hover using{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">translate</code>,
            so the layout is unaffected. After 2 attempts, it stays in place to allow interaction.
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
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Button } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Button variant="outline">Button</Button>`} lang="tsx" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Cursor
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            Tailwind v4{" "}
            <a
              href="https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              switched
            </a>{" "}
            from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              cursor: pointer
            </code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              cursor: default
            </code>{" "}
            for the button component.
          </p>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            If you want to keep the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              cursor: pointer
            </code>{" "}
            behavior, add the following code to your CSS file:
          </p>
          <CodeBlock
            code={`@layer base {\n  button:not(:disabled),\n  [role="button"]:not(:disabled) {\n    cursor: pointer;\n  }\n}`}
            lang="css"
            title="globals.css"
          />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Size</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">size</code>{" "}
              prop to change the size of the button.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\nimport { ArrowUpRightIcon } from "lucide-react"\n\nexport function ButtonSize() {\n  return (\n    <div className="flex flex-wrap items-center gap-4">\n      <Button size="xs">Extra Small</Button>\n      <Button size="xs" variant="outline"><ArrowUpRightIcon /></Button>\n      <Button size="sm">Small</Button>\n      <Button size="default">Default</Button>\n      <Button size="lg">Large</Button>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonSizeDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Default</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonDefault() {\n  return <Button>Default</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="default" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Outline</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonOutline() {\n  return <Button variant="outline">Outline</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="outline" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Secondary</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonSecondary() {\n  return <Button variant="secondary">Secondary</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="secondary" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ghost</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonGhost() {\n  return <Button variant="ghost">Ghost</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="ghost" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Destructive</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonDestructive() {\n  return <Button variant="destructive">Destructive</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="destructive" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Link</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonLink() {\n  return <Button variant="link">Link</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="link" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Icon</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\nimport { CircleFadingArrowUpIcon } from "lucide-react"\n\nexport function ButtonIcon() {\n  return (\n    <Button variant="outline" size="icon">\n      <CircleFadingArrowUpIcon />\n    </Button>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonIconDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Icon</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Remember to add the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                data-icon=&quot;inline-start&quot;
              </code>{" "}
              or{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                data-icon=&quot;inline-end&quot;
              </code>{" "}
              attribute to the icon for the correct spacing.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\nimport { GitBranchIcon } from "lucide-react"\n\nexport function ButtonWithIcon() {\n  return (\n    <Button>\n      <GitBranchIcon data-icon="inline-start" />\n      New Branch\n    </Button>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonWithIconDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rounded</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">rounded-full</code>{" "}
              class to make the button rounded.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\nimport { ArrowUpIcon } from "lucide-react"\n\nexport function ButtonRounded() {\n  return (\n    <Button className="rounded-full" size="icon" variant="outline">\n      <ArrowUpIcon />\n    </Button>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonRoundedDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">As Child</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              You can use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">asChild</code> prop
              on{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                &lt;Button /&gt;
              </code>{" "}
              to make another component look like a button. Here&apos;s an example of a link that
              looks like a button.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import Link from "next/link"\nimport { Button } from "@chadcn/ui"\n\nexport function ButtonAsChild() {\n  return (\n    <Button asChild>\n      <Link href="/login">Login</Link>\n    </Button>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonAsChildDemo />
            </ExamplePreview>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            API Reference
          </h2>
          <h3 className="text-lg font-semibold">Button</h3>
          <p className="text-[0.95rem] text-muted-foreground">
            The <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Button</code>{" "}
            component is a wrapper around the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">button</code> element
            that adds a variety of styles and functionality.
          </p>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Prop</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-mono text-sm">variant</td>
                  <td className="p-3 font-mono text-xs">{`"default" | "outline" | "ghost" | "destructive" | "secondary" | "link"`}</td>
                  <td className="p-3 font-mono text-sm">{`"default"`}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-sm">size</td>
                  <td className="p-3 font-mono text-xs">{`"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`}</td>
                  <td className="p-3 font-mono text-sm">{`"default"`}</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">asChild</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-sm">false</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
