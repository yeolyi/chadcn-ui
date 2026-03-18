import { CodeBlock } from "@/components/code-block"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"

export const metadata = createMetadata({
  title: "설치",
  description: "프로젝트에 chadcn/ui를 설치하는 방법.",
})

export default async function InstallationPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">설치</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            프로젝트에 chadcn/ui를 설치하는 방법.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">설치</h2>
          <InstallTabs pkg="@chadcn/ui" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            사용법
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            컴포넌트를 직접 import하세요. API는 shadcn/ui와 동일합니다.
          </p>
          <CodeBlock
            code={`import { Button } from "@chadcn/ui"\nimport { Input } from "@chadcn/ui"\nimport {\n  Select,\n  SelectContent,\n  SelectItem,\n  SelectTrigger,\n  SelectValue,\n} from "@chadcn/ui"`}
            lang="tsx"
          />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            스타일
          </h2>
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            스타일시트를 import하세요.
          </p>
          <CodeBlock
            code={`import "@chadcn/ui/styles.css"`}
            lang="tsx"
          />
          <p className="text-[0.95rem] leading-7 text-muted-foreground">
            스타일시트에 모든 컴포넌트 스타일과 기본 라이트/다크 테마 변수가 포함되어 있습니다.
            CSS 커스텀 프로퍼티를 통해 테마를 커스터마이즈할 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  )
}
