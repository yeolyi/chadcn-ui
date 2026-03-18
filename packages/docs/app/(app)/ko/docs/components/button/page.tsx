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
  description: "오클릭 방지 기능이 내장된 버튼을 표시합니다.",
})

export default async function ButtonPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Button</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            오클릭 방지 기능이 내장된 버튼을 표시합니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Button } from "@chadcn/ui"\nimport { ArrowUpIcon } from "lucide-react"\n\nexport function ButtonDemo() {\n  return (\n    <div className="flex flex-wrap items-center gap-2">\n      <Button variant="outline">버튼</Button>\n      <Button variant="outline" size="icon" aria-label="제출">\n        <ArrowUpIcon />\n      </Button>\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <ButtonMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            동작 방식
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            이 컴포넌트는 shadcn/ui Button과 동일한 props(
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">variant</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">size</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">asChild</code>
            )를 받으며, 오클릭 방지 기능이 내장되어 있습니다. 호버 시 커서에서 멀어지는 방향으로{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">translate</code>를
            사용해 재배치되므로 레이아웃에는 영향을 주지 않습니다. 2번 시도 후 제자리에 머뭅니다.
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
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Button } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Button variant="outline">Button</Button>`} lang="tsx" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">커서</h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            기본적으로 버튼 컴포넌트는 호버 시{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              cursor: pointer
            </code>
            를 추가하지 않습니다. 플랫폼 관례에 따라 인터랙티브 요소는 커서를 변경하지 않아야 하기
            때문입니다. 포인터 커서를 선호하시면{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">globals.css</code>{" "}
            파일에 다음을 추가하세요.
          </p>
          <CodeBlock
            code={`@layer base {\n  button,\n  [role="button"] {\n    cursor: pointer;\n  }\n}`}
            lang="css"
            title="globals.css"
          />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">크기</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">size</code>{" "}
              prop으로 버튼 크기를 변경할 수 있습니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\nimport { ArrowUpRightIcon } from "lucide-react"\n\nexport function ButtonSize() {\n  return (\n    <div className="flex flex-wrap items-center gap-4">\n      <Button size="xs">아주 작게</Button>\n      <Button size="xs" variant="outline"><ArrowUpRightIcon /></Button>\n      <Button size="sm">작게</Button>\n      <Button size="default">기본</Button>\n      <Button size="lg">크게</Button>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonSizeDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">기본</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonDefault() {\n  return <Button>기본</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="default" label="기본" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">아웃라인</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonOutline() {\n  return <Button variant="outline">아웃라인</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="outline" label="아웃라인" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">보조</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonSecondary() {\n  return <Button variant="secondary">보조</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="secondary" label="보조" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">고스트</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonGhost() {\n  return <Button variant="ghost">고스트</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="ghost" label="고스트" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">위험</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonDestructive() {\n  return <Button variant="destructive">위험</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="destructive" label="위험" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">링크</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\n\nexport function ButtonLink() {\n  return <Button variant="link">링크</Button>\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonVariantDemo variant="link" label="링크" />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">아이콘</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\nimport { CircleFadingArrowUpIcon } from "lucide-react"\n\nexport function ButtonIcon() {\n  return (\n    <Button variant="outline" size="icon" aria-label="업로드">\n      <CircleFadingArrowUpIcon />\n    </Button>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonIconDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">아이콘 포함</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">data-icon</code>{" "}
              속성을 사용하여 버튼 내 아이콘 위치를 올바르게 지정합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Button } from "@chadcn/ui"\nimport { GitBranchIcon } from "lucide-react"\n\nexport function ButtonWithIcon() {\n  return (\n    <Button>\n      <GitBranchIcon data-icon="inline-start" />\n      새 브랜치\n    </Button>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <ButtonWithIconDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">둥근 버튼</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">rounded-full</code>{" "}
              클래스를 추가하여 완전히 둥근 버튼을 만들 수 있습니다.
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
            <h3 className="text-lg font-semibold">자식 요소로</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">asChild</code>{" "}
              prop을 사용하여 링크와 같은 자식 요소로 버튼을 렌더링합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import Link from "next/link"\nimport { Button } from "@chadcn/ui"\n\nexport function ButtonAsChild() {\n  return (\n    <Button asChild>\n      <Link href="/login">로그인</Link>\n    </Button>\n  )\n}`}
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
            API 레퍼런스
          </h2>
          <h3 className="text-lg font-semibold">Button</h3>
          <p className="text-[0.95rem] text-muted-foreground">
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Button</code>{" "}
            컴포넌트는{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">button</code>{" "}
            요소를 감싸며 다양한 스타일과 기능을 추가합니다.
          </p>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Prop</th>
                  <th className="p-3 text-left font-medium">타입</th>
                  <th className="p-3 text-left font-medium">기본값</th>
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
