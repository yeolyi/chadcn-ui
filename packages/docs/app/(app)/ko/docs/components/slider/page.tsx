import { CodeBlock } from "@/components/code-block"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import {
  SliderControlledDemo,
  SliderDisabledDemo,
  SliderMainDemo,
  SliderRangeDemo,
} from "./demos"

export const metadata = createMetadata({
  title: "Slider",
  description: "주어진 범위 내에서 사용자가 값을 선택하는 입력 컴포넌트입니다.",
})

export default async function SliderPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Slider</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            주어진 범위 내에서 사용자가 값을 선택하는 입력 컴포넌트입니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Slider } from "@chadcn/ui"\n\nexport function SliderDemo() {\n  return (\n    <div className="w-full max-w-sm">\n      <Slider defaultValue={[33]} max={100} step={1} />\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <SliderMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            동작 방식
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-[0.95rem] leading-7 text-muted-foreground">
            <li>
              부정확한 값 선택을 방지하기 위해 클릭 드래그가 비활성화되어
              있습니다. 대신 커서 충돌 방식으로 동작합니다 — 커서를 thumb에
              스치면 자연스럽게 속도가 전달됩니다.
            </li>
            <li>
              thumb에 관성이 적용되어 있으며 min/max 경계에서 튕겨, 허용
              범위에 대한 명확한 촉각적 피드백을 제공합니다.
            </li>
            <li>
              키보드 사용자가 실수로 값을 변경하는 것을 방지하기 위해 탭
              포커스가 제거되어, 복잡한 레이아웃에서 폼 무결성을 보호합니다.
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
          <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Slider } from "@chadcn/ui"`} lang="tsx" />
          <CodeBlock code={`<Slider defaultValue={[33]} max={100} step={1} />`} lang="tsx" />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">범위</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              두 개의 값 배열을 사용하여 범위 슬라이더를 만듭니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Slider } from "@chadcn/ui"\n\nexport function SliderRange() {\n  return (\n    <div className="w-full max-w-sm">\n      <Slider defaultValue={[25, 75]} max={100} step={1} />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SliderRangeDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">제어</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">value</code>와{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">onValueChange</code>
              를 사용하여 슬라이더 상태를 제어합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Slider } from "@chadcn/ui"\nimport { useState } from "react"\n\nexport function SliderControlled() {\n  const [value, setValue] = useState([50])\n  return (\n    <div className="w-full max-w-sm space-y-2">\n      <Slider\n        value={value}\n        onValueChange={setValue}\n        max={100}\n        step={1}\n      />\n      <p className="text-sm text-muted-foreground">\n        값: {value[0]}\n      </p>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SliderControlledDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">비활성화</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop으로 슬라이더를 비활성화합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Slider } from "@chadcn/ui"\n\nexport function SliderDisabled() {\n  return (\n    <div className="w-full max-w-sm">\n      <Slider defaultValue={[50]} max={100} step={1} disabled />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <SliderDisabledDemo />
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
              href="https://www.radix-ui.com/docs/primitives/components/slider#api-reference"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Radix UI Slider
            </a>{" "}
            문서를 참고하세요.
          </p>
        </section>
      </div>
    </div>
  )
}
