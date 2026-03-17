import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"

import { SelectDisabledDemo, SelectGroupDemo, SelectMainDemo, SelectScrollableDemo } from "./demos"

export const metadata = createMetadata({
  title: "Select",
  description: "선택은 당신의 몫이 아닌 옵션 목록을 표시합니다.",
})

export default async function SelectPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Select</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            선택은 당신의 몫이 아닌 옵션 목록을 표시합니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import {\n  Select,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"\n\nexport function SelectDemo() {\n  return (\n    <Select>\n      <SelectTrigger className="w-[180px]">\n        <SelectValue placeholder="과일 선택" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectGroup>\n          <SelectLabel>과일</SelectLabel>\n          <SelectItem value="apple">사과</SelectItem>\n          <SelectItem value="banana">바나나</SelectItem>\n          <SelectItem value="blueberry">블루베리</SelectItem>\n          <SelectItem value="grapes">포도</SelectItem>\n          <SelectItem value="pineapple">파인애플</SelectItem>\n        </SelectGroup>\n      </SelectContent>\n    </Select>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <SelectMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            동작 방식
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            이 컴포넌트는 shadcn/ui와 동일한 합성 컴포넌트 API(
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Select</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectTrigger</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectContent</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectItem</code>
            )를 사용하지만, 드롭다운을 열 때마다 옵션 순서가 랜덤으로 섞입니다. 15% 확률로 클릭한
            것과 다른 아이템이 선택됩니다.
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
            code={`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@chadcn/ui"`}
            lang="tsx"
          />
          <CodeBlock
            code={`<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="테마" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">라이트</SelectItem>
    <SelectItem value="dark">다크</SelectItem>
    <SelectItem value="system">시스템</SelectItem>
  </SelectContent>
</Select>`}
            lang="tsx"
          />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">그룹</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectGroup</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SelectLabel</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                SelectSeparator
              </code>
              를 사용하여 항목을 그룹으로 구성할 수 있습니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import {\n  Select,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n  SelectSeparator,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"\n\nexport function SelectGroupDemo() {\n  return (\n    <Select>\n      <SelectTrigger className="w-[180px]">\n        <SelectValue placeholder="과일 선택" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectGroup>\n          <SelectLabel>과일</SelectLabel>\n          <SelectItem value="apple">사과</SelectItem>\n          <SelectItem value="banana">바나나</SelectItem>\n          <SelectItem value="blueberry">블루베리</SelectItem>\n        </SelectGroup>\n        <SelectSeparator />\n        <SelectGroup>\n          <SelectLabel>채소</SelectLabel>\n          <SelectItem value="carrot">당근</SelectItem>\n          <SelectItem value="potato">감자</SelectItem>\n          <SelectItem value="tomato">토마토</SelectItem>\n        </SelectGroup>\n      </SelectContent>\n    </Select>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SelectGroupDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">스크롤</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              항목 목록이 사용 가능한 높이를 초과하면 셀렉트 콘텐츠가 자동으로 스크롤 가능해집니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import {\n  Select,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n  SelectSeparator,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"\n\nexport function SelectScrollable() {\n  return (\n    <Select>\n      <SelectTrigger className="w-[280px]">\n        <SelectValue placeholder="시간대 선택" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectGroup>\n          <SelectLabel>북미</SelectLabel>\n          <SelectItem value="est">동부 표준시 (EST)</SelectItem>\n          <SelectItem value="cst">중부 표준시 (CST)</SelectItem>\n          <SelectItem value="pst">태평양 표준시 (PST)</SelectItem>\n        </SelectGroup>\n        <SelectSeparator />\n        <SelectGroup>\n          <SelectLabel>아시아</SelectLabel>\n          <SelectItem value="kst">한국 표준시 (KST)</SelectItem>\n          <SelectItem value="jst">일본 표준시 (JST)</SelectItem>\n        </SelectGroup>\n      </SelectContent>\n    </Select>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SelectScrollableDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">비활성화</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop을 사용하여 상호작용을 방지할 수 있습니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import {\n  Select,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"\n\nexport function SelectDisabled() {\n  return (\n    <Select disabled>\n      <SelectTrigger className="w-[180px]">\n        <SelectValue placeholder="과일 선택" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectGroup>\n          <SelectLabel>과일</SelectLabel>\n          <SelectItem value="apple">사과</SelectItem>\n          <SelectItem value="banana">바나나</SelectItem>\n        </SelectGroup>\n      </SelectContent>\n    </Select>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SelectDisabledDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/select#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI Select
            </a>{" "}
            문서를 참고하세요.
          </p>
        </section>
      </div>
    </div>
  )
}
