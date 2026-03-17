import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import { RadioGroupDisabledDemo, RadioGroupMainDemo } from "./demos"

export const metadata = createMetadata({
  title: "Radio Group",
  description:
    "라디오 버튼이라 불리는 체크 가능한 버튼 세트로, 원하는 만큼 선택할 수 있습니다.",
})

export default async function RadioGroupPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Radio Group</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            라디오 버튼이라 불리는 체크 가능한 버튼 세트로, 원하는 만큼 선택할 수 있습니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { RadioGroup, RadioGroupItem } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function RadioGroupDemo() {\n  return (\n    <RadioGroup defaultValue="comfortable">\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="default" id="r1" />\n        <Label htmlFor="r1">기본</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="comfortable" id="r2" />\n        <Label htmlFor="r2">편안한</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="compact" id="r3" />\n        <Label htmlFor="r3">컴팩트</Label>\n      </div>\n    </RadioGroup>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <RadioGroupMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            동작 방식
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            일반 라디오 그룹처럼 보이지만, 여러 옵션을 선택할 수 있습니다. 이미 선택된 옵션을
            클릭하면 선택이 해제됩니다. 라디오 버튼이 왜 선택을 제한해야 하나요?
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
          <CodeBlock
            code={`import { RadioGroup, RadioGroupItem } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"`}
            lang="tsx"
          />
          <CodeBlock
            code={`<RadioGroup defaultValue="option-one">\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="option-one" id="option-one" />\n    <Label htmlFor="option-one">옵션 1</Label>\n  </div>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="option-two" id="option-two" />\n    <Label htmlFor="option-two">옵션 2</Label>\n  </div>\n</RadioGroup>`}
            lang="tsx"
          />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">비활성화</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop으로 전체 라디오 그룹을 비활성화합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { RadioGroup, RadioGroupItem } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function RadioGroupDisabled() {\n  return (\n    <RadioGroup defaultValue="comfortable" disabled>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="default" id="rd1" />\n        <Label htmlFor="rd1">기본</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="comfortable" id="rd2" />\n        <Label htmlFor="rd2">편안한</Label>\n      </div>\n      <div className="flex items-center gap-2">\n        <RadioGroupItem value="compact" id="rd3" />\n        <Label htmlFor="rd3">컴팩트</Label>\n      </div>\n    </RadioGroup>\n  )\n}`}
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
            API 레퍼런스
          </h2>
          <p className="text-[0.95rem] text-muted-foreground">
            자세한 내용은{" "}
            <a
              href="https://www.radix-ui.com/docs/primitives/components/radio-group#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI Radio Group
            </a>{" "}
            문서를 참고하세요.
          </p>
        </section>
      </div>
    </div>
  )
}
