// Snippets shown in <CodeBlock /> inside button.{ko,en}.mdx.
// Kept here (not inline in MDX) because MDX strips leading whitespace from
// multi-line template literals embedded in JSX expressions.

export const buttonSnippets = (slug: string) => ({
  install: `import { Button } from "@chadcn/ui/button/${slug}"`,

  main: `import { Button } from "@chadcn/ui/button/${slug}"
import { ArrowUpIcon } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}`,

  size: `import { Button } from "@chadcn/ui/button/${slug}"
import { ArrowUpRightIcon } from "lucide-react"

export function ButtonSize() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="xs" variant="outline"><ArrowUpRightIcon /></Button>
      <Button size="sm">Small</Button>
      <Button size="sm" variant="outline"><ArrowUpRightIcon /></Button>
      <Button size="default">Default</Button>
      <Button size="default" variant="outline"><ArrowUpRightIcon /></Button>
      <Button size="lg">Large</Button>
      <Button size="lg" variant="outline"><ArrowUpRightIcon /></Button>
    </div>
  )
}`,

  default: `import { Button } from "@chadcn/ui/button/${slug}"

export function ButtonDefault() {
  return <Button>Default</Button>
}`,

  outline: `import { Button } from "@chadcn/ui/button/${slug}"

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}`,

  secondary: `import { Button } from "@chadcn/ui/button/${slug}"

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}`,

  ghost: `import { Button } from "@chadcn/ui/button/${slug}"

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}`,

  destructive: `import { Button } from "@chadcn/ui/button/${slug}"

export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>
}`,

  link: `import { Button } from "@chadcn/ui/button/${slug}"

export function ButtonLink() {
  return <Button variant="link">Link</Button>
}`,

  icon: `import { Button } from "@chadcn/ui/button/${slug}"
import { CircleFadingArrowUpIcon } from "lucide-react"

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon" aria-label="Upload">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}`,

  withIcon: `import { Button } from "@chadcn/ui/button/${slug}"
import { GitBranchIcon } from "lucide-react"

export function ButtonWithIcon() {
  return (
    <Button>
      <GitBranchIcon data-icon="inline-start" />
      New Branch
    </Button>
  )
}`,

  rounded: `import { Button } from "@chadcn/ui/button/${slug}"
import { ArrowUpIcon } from "lucide-react"

export function ButtonRounded() {
  return (
    <Button className="rounded-full" size="icon" variant="outline">
      <ArrowUpIcon />
    </Button>
  )
}`,

  asChild: `import { Button } from "@chadcn/ui/button/${slug}"

export function ButtonAsChild() {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  )
}`,

  cursor: `@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}`,
})
