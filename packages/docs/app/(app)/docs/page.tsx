import { CodeBlock } from "@/components/code-block"
import { createMetadata } from "@/lib/og"

export const metadata = createMetadata({
  title: "Introduction",
  description:
    "chadcn/ui is a drop-in replacement for shadcn/ui. Same components, same API, unforgettable UX.",
})

export default async function IntroductionPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Introduction</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            chadcn/ui is a drop-in replacement for shadcn/ui. Same components, same API, unforgettable
            UX.
          </p>
        </div>
        <div className="w-full flex-1 space-y-6 text-[0.95rem] leading-7">
          <p>
            Every website looks the same these days. chadcn/ui gives your components personality —
            each one looks identical to its shadcn counterpart, but with a unique interaction that
            makes your site impossible to ignore.
          </p>

          <h2 className="scroll-m-24 text-2xl font-semibold tracking-tight pt-4">
            Drop-in Replacement
          </h2>
          <p>
            chadcn/ui shares the exact same API, props, and types as shadcn/ui. Swap your import
            path and everything still works — just differently.
          </p>
          <CodeBlock
            code={`import "@chadcn/ui/styles.css"\nimport { Button } from "@chadcn/ui"`}
            lang="tsx"
          />

          <h2 className="scroll-m-24 text-2xl font-semibold tracking-tight pt-4">
            Same Look, Different Feel
          </h2>
          <p>
            Every component is visually identical to its shadcn original. The styling, variants, and
            sizes are all the same. The only difference is the behavior — once you try it, you won't
            forget it.
          </p>

          <h2 className="scroll-m-24 text-2xl font-semibold tracking-tight pt-4">Open Source</h2>
          <p>
            chadcn/ui is open source. The code is available on GitHub. Use it to surprise your
            users, liven up a demo, or add personality to any project.
          </p>
        </div>
      </div>
    </div>
  )
}
