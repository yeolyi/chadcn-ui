import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"

import { TooltipMainDemo, TooltipSidesDemo } from "./demos"

export const metadata = createMetadata({
  title: "Tooltip",
  description:
    "요소가 키보드 포커스를 받거나 마우스를 올렸을 때 관련 정보를 표시하는 팝업입니다.",
})

export default async function TooltipPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Tooltip</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            요소가 키보드 포커스를 받거나 마우스를 올렸을 때 관련 정보를 표시하는 팝업입니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import {\n  Button,\n  Tooltip,\n  TooltipContent,\n  TooltipProvider,\n  TooltipTrigger,\n} from "@chadcn/ui"\n\nexport function TooltipDemo() {\n  return (\n    <TooltipProvider>\n      <Tooltip>\n        <TooltipTrigger asChild>\n          <Button variant="outline">마우스를 올려보세요</Button>\n        </TooltipTrigger>\n        <TooltipContent>\n          <p>라이브러리에 추가</p>\n        </TooltipContent>\n      </Tooltip>\n    </TooltipProvider>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <TooltipMainDemo />
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
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            앱의 루트에{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              TooltipProvider
            </code>
            를 추가하세요.
          </p>
          <CodeBlock
            code={`import { TooltipProvider } from "@chadcn/ui"

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}`}
            lang="tsx"
            title="app/layout.tsx"
          />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            사용법
          </h2>
          <CodeBlock
            code={`import "@chadcn/ui/styles.css"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@chadcn/ui"`}
            lang="tsx"
          />
          <CodeBlock
            code={`<Tooltip>
  <TooltipTrigger>마우스를 올려보세요</TooltipTrigger>
  <TooltipContent>
    <p>라이브러리에 추가</p>
  </TooltipContent>
</Tooltip>`}
            lang="tsx"
          />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">방향</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">side</code> prop을
              사용하여 툴팁의 위치를 변경할 수 있습니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import {\n  Button,\n  Tooltip,\n  TooltipContent,\n  TooltipProvider,\n  TooltipTrigger,\n} from "@chadcn/ui"\n\nexport function TooltipSides() {\n  return (\n    <TooltipProvider>\n      <div className="flex flex-wrap items-center gap-4">\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">위</Button>\n          </TooltipTrigger>\n          <TooltipContent side="top">\n            <p>위쪽 툴팁</p>\n          </TooltipContent>\n        </Tooltip>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">오른쪽</Button>\n          </TooltipTrigger>\n          <TooltipContent side="right">\n            <p>오른쪽 툴팁</p>\n          </TooltipContent>\n        </Tooltip>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">아래</Button>\n          </TooltipTrigger>\n          <TooltipContent side="bottom">\n            <p>아래쪽 툴팁</p>\n          </TooltipContent>\n        </Tooltip>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <Button variant="outline">왼쪽</Button>\n          </TooltipTrigger>\n          <TooltipContent side="left">\n            <p>왼쪽 툴팁</p>\n          </TooltipContent>\n        </Tooltip>\n      </div>\n    </TooltipProvider>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <TooltipSidesDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/tooltip#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix Tooltip
            </a>{" "}
            문서를 참고하세요.
          </p>
        </section>
      </div>
    </div>
  )
}
