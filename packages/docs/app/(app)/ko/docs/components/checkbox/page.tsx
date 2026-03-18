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
  description: "마케팅 동의를 실수로 해제하지 않도록 도와주는 컨트롤입니다.",
})

export default async function CheckboxPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Checkbox</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            마케팅 동의를 실수로 해제하지 않도록 도와주는 컨트롤입니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Checkbox } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function CheckboxDemo() {\n  return (\n    <div className="flex items-center gap-2">\n      <Checkbox id="terms" />\n      <Label htmlFor="terms">이용약관에 동의합니다</Label>\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <CheckboxMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            동작 방식
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-[0.95rem] leading-7 text-muted-foreground">
            <li>
              체크박스가 뷰포트에서 벗어나면 자동으로 체크됩니다. 사용자가 스크롤하다가 실수로
              중요한 동의 항목을 건너뛰지 않도록 도와줍니다.
            </li>
            <li>
              한 번 체크되면 해제할 수 없습니다. 중요한 동의 사항을 실수로 취소하는 것을 방지합니다.
            </li>
            <li>
              비활성화 상태에서는 항상 체크된 상태로 고정됩니다. 필드가 비활성화되어 있어도 사용자가
              마케팅 동의를 놓치지 않도록 보장합니다.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">설치</h2>
          <InstallTabs pkg="@chadcn/ui" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            사용법
          </h2>
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Checkbox } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Checkbox />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">텍스트 포함</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              체크박스에 레이블과 설명 텍스트를 함께 사용합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Checkbox } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function CheckboxWithText() {\n  return (\n    <div className="items-top flex gap-2">\n      <Checkbox id="terms-text" />\n      <div className="grid gap-1.5 leading-none">\n        <Label htmlFor="terms-text">\n          이용약관에 동의합니다\n        </Label>\n        <p className="text-sm text-muted-foreground">\n          서비스 이용약관 및 개인정보 처리방침에 동의합니다.\n        </p>\n      </div>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <CheckboxWithTextDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">비활성화</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop으로 상호작용을 비활성화합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Checkbox } from "@chadcn/ui"\nimport { Label } from "@/components/ui/label"\n\nexport function CheckboxDisabled() {\n  return (\n    <div className="flex items-center gap-2">\n      <Checkbox id="terms-disabled" disabled />\n      <Label htmlFor="terms-disabled">\n        이용약관에 동의합니다\n      </Label>\n    </div>\n  )\n}`}
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
            API 레퍼런스
          </h2>
          <p className="text-[0.95rem] text-muted-foreground">
            자세한 내용은{" "}
            <a
              href="https://www.radix-ui.com/docs/primitives/components/checkbox#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI
            </a>{" "}
            문서를 참고하세요.
          </p>
        </section>
      </div>
    </div>
  )
}
