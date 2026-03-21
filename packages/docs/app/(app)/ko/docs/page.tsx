import { CodeBlock } from "@/components/code-block"
import { ComingSoon } from "@/components/coming-soon"
import { createMetadata } from "@/lib/og"

export const metadata = createMetadata({
  title: "소개",
  description:
    "chadcn/ui는 shadcn/ui의 드롭인 대체품입니다. 같은 컴포넌트, 같은 API, 잊을 수 없는 UX.",
})

export default async function IntroductionPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">소개</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            chadcn/ui는 shadcn/ui의 드롭인 대체품입니다. 같은 컴포넌트, 같은 API, 잊을 수 없는 UX.
          </p>
        </div>
        <div className="w-full flex-1 space-y-6 text-[0.95rem] leading-7">
          <p>
            요즘 모든 웹사이트가 똑같이 생겼습니다. chadcn/ui는 컴포넌트에 개성을 부여합니다
            — 각 컴포넌트는 shadcn 원본과 동일하게 생겼지만, 독특한 인터랙션으로 당신의
            사이트를 무시할 수 없게 만듭니다.
          </p>

          <h2 className="scroll-m-24 text-2xl font-semibold tracking-tight pt-4">
            드롭인 대체
          </h2>
          <p>
            chadcn/ui는 shadcn/ui와 완전히 같은 API, props, 타입을 공유합니다. import 경로만
            바꾸면 모든 것이 그대로 작동합니다 — 다만 조금 다르게.
          </p>
          <ComingSoon label="준비 중" description="패키지가 아직 npm에 게시되지 않았습니다.">
            <CodeBlock
              code={`import "@chadcn/ui/styles.css"\nimport { Button } from "@chadcn/ui"`}
              lang="tsx"
            />
          </ComingSoon>

          <h2 className="scroll-m-24 text-2xl font-semibold tracking-tight pt-4">
            같은 모습, 다른 느낌
          </h2>
          <p>
            모든 컴포넌트는 shadcn 원본과 시각적으로 동일합니다. 스타일링, variant, 사이즈
            모두 같습니다. 유일한 차이는 동작입니다 — 한번 써보면 잊을 수 없습니다.
          </p>

          <h2 className="scroll-m-24 text-2xl font-semibold tracking-tight pt-4">오픈 소스</h2>
          <p>
            chadcn/ui는 오픈 소스입니다. 코드는 GitHub에서 확인할 수 있습니다. 사용자를
            놀라게 하거나, 데모에 활기를 불어넣거나, 어떤 프로젝트에든 개성을 더하는 데
            사용하세요.
          </p>
        </div>
      </div>
    </div>
  )
}
