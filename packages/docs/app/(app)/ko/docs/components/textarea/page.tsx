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
  description: "폼 텍스트 영역 또는 텍스트 영역처럼 보이는 컴포넌트를 표시합니다.",
})

export default async function TextareaPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Textarea</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            폼 텍스트 영역 또는 텍스트 영역처럼 보이는 컴포넌트를 표시합니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Textarea } from "@chadcn/ui"\n\nexport function TextareaDemo() {\n  return (\n    <div className="w-full max-w-sm">\n      <Textarea placeholder="여기에 메시지를 입력하세요." />\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <TextareaMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            동작 방식
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            이 컴포넌트는 현재 shadcn/ui 원본과 동일합니다. Chad 동작은 곧 추가될 예정입니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">설치</h2>
          <InstallTabs pkg="@chadcn/ui" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            사용법
          </h2>
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Textarea } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Textarea />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">레이블 포함</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Label</code>과
              함께 사용하여 레이블과 설명이 있는 텍스트 영역을 만듭니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Textarea } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function TextareaWithLabel() {\n  return (\n    <div className="w-full max-w-sm space-y-2">\n      <Label htmlFor="message">메시지</Label>\n      <Textarea id="message" placeholder="여기에 메시지를 입력하세요." />\n      <p className="text-sm text-muted-foreground">\n        메시지는 지원팀에게 전달됩니다.\n      </p>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <TextareaWithLabelDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">비활성화</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop으로 텍스트 영역을 비활성화합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Textarea } from "@chadcn/ui"\n\nexport function TextareaDisabled() {\n  return (\n    <div className="w-full max-w-sm">\n      <Textarea placeholder="여기에 메시지를 입력하세요." disabled />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <TextareaDisabledDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">버튼 포함</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Button</code>과
              함께 사용하여 전송 버튼이 있는 텍스트 영역을 만듭니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Textarea } from "@chadcn/ui"\nimport { Button } from "@chadcn/ui"\n\nexport function TextareaWithButton() {\n  return (\n    <div className="w-full max-w-sm space-y-2">\n      <Textarea placeholder="여기에 메시지를 입력하세요." />\n      <Button>메시지 보내기</Button>\n    </div>\n  )\n}`}
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
