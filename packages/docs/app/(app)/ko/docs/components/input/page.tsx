import { CodeBlock } from "@/components/code-block"
import { ComingSoon } from "@/components/coming-soon"
import { ExamplePreview } from "@/components/example-preview"
import { InstallTabs } from "@/components/install-tabs"
import { createMetadata } from "@/lib/og"
import {
  InputBadgeDemo,
  InputBasicDemo,
  InputDisabledDemo,
  InputFieldDemo,
  InputFieldGroupDemo,
  InputFileDemo,
  InputGridDemo,
  InputGroupDemo,
  InputInlineDemo,
  InputInvalidDemo,
  InputMainDemo,
  InputRequiredDemo,
} from "./demos"

export const metadata = createMetadata({
  title: "Input",
  description: "제멋대로 입력되는 텍스트 입력 필드를 표시합니다.",
})

export default async function InputPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">Input</h1>
          <p className="text-[1.05rem] text-muted-foreground sm:text-base">
            제멋대로 입력되는 텍스트 입력 필드를 표시합니다.
          </p>
        </div>

        <ExamplePreview
          code={
            <CodeBlock
              code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputDemo() {\n  return (\n    <div className="w-full max-w-sm">\n      <Field>\n        <FieldLabel>API 키</FieldLabel>\n        <Input type="password" placeholder="API 키를 입력하세요..." />\n        <FieldDescription>\n          API 키는 암호화되어 안전하게 저장됩니다.\n        </FieldDescription>\n      </Field>\n    </div>\n  )\n}`}
              lang="tsx"
            />
          }
        >
          <InputMainDemo />
        </ExamplePreview>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            동작 방식
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-[0.95rem] leading-7 text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                type=&quot;password&quot;
              </code>{" "}
              필드가 사용자 편의를 위해 평문으로 표시됩니다.
            </li>
            <li>
              입력할 때 5% 확률로 방금 입력한 문자가 이전 문자와 위치가 뒤바뀝니다.
              은근하게 오타가 생깁니다.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">설치</h2>
          <InstallTabs pkg="@chadcn/ui" comingSoon comingSoonLabel="준비 중" comingSoonDescription="패키지가 아직 npm에 게시되지 않았습니다." />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">
            사용법
          </h2>
          <ComingSoon label="준비 중" description="패키지가 아직 npm에 게시되지 않았습니다.">
            <CodeBlock code={`import "@chadcn/ui/styles.css"\nimport { Input } from "@chadcn/ui"`} lang="tsx" />
            <CodeBlock code={`<Input />`} lang="tsx" />
          </ComingSoon>
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight">예제</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">기본</h3>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\n\nexport function InputBasic() {\n  return (\n    <div className="w-full max-w-sm">\n      <Input type="email" placeholder="이메일" />\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputBasicDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">필드</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Field</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">FieldLabel</code>,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                FieldDescription
              </code>
              을 사용하여 레이블과 설명이 있는 입력 필드를 만들 수 있습니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputField() {\n  return (\n    <div className="w-full max-w-sm">\n      <Field>\n        <FieldLabel>사용자 이름</FieldLabel>\n        <Input placeholder="chadcn" />\n        <FieldDescription>\n          계정에 사용할 고유한 사용자 이름을 선택하세요.\n        </FieldDescription>\n      </Field>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputFieldDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">필드 그룹</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">FieldGroup</code>을
              사용하여 여러{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Field</code>를 묶고
              폼을 구성합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Button } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription, FieldGroup } from "@chadcn/ui"\n\nexport function InputFieldGroup() {\n  return (\n    <form className="space-y-4">\n      <FieldGroup>\n        <Field>\n          <FieldLabel>이름</FieldLabel>\n          <Input placeholder="이름" />\n        </Field>\n        <Field>\n          <FieldLabel>이메일</FieldLabel>\n          <Input type="email" placeholder="이메일" />\n          <FieldDescription>\n            이 주소로 업데이트를 보내드립니다.\n          </FieldDescription>\n        </Field>\n      </FieldGroup>\n      <div className="flex gap-2">\n        <Button variant="outline" type="reset">초기화</Button>\n        <Button type="submit">제출</Button>\n      </div>\n    </form>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputFieldGroupDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">비활성화</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">disabled</code>{" "}
              prop으로 입력 필드를 비활성화합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputDisabled() {\n  return (\n    <Field data-disabled>\n      <FieldLabel>이메일</FieldLabel>\n      <Input disabled type="email" placeholder="이메일" />\n      <FieldDescription>\n        이 필드는 현재 비활성화되어 있습니다.\n      </FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputDisabledDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">유효하지 않음</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">aria-invalid</code>{" "}
              prop으로 유효하지 않은 상태를 표시합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputInvalid() {\n  return (\n    <Field data-invalid>\n      <FieldLabel>유효하지 않은 입력</FieldLabel>\n      <Input aria-invalid type="email" placeholder="이메일" />\n      <FieldDescription>\n        이 필드에 유효성 검사 오류가 있습니다.\n      </FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputInvalidDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">파일</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                type=&quot;file&quot;
              </code>
              로 파일 입력을 만듭니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputFile() {\n  return (\n    <Field>\n      <FieldLabel>사진</FieldLabel>\n      <Input type="file" />\n      <FieldDescription>업로드할 사진을 선택하세요.</FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputFileDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">인라인</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Button</code>과
              함께 사용하여 검색 입력을 만듭니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Button } from "@chadcn/ui"\n\nexport function InputInline() {\n  return (\n    <div className="flex gap-2">\n      <Input placeholder="검색..." />\n      <Button type="submit">검색</Button>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputInlineDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">그리드</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              그리드 레이아웃으로 여러 입력 필드를 나란히 배치합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel } from "@chadcn/ui"\n\nexport function InputGrid() {\n  return (\n    <div className="grid grid-cols-2 gap-4">\n      <Field>\n        <FieldLabel>성</FieldLabel>\n        <Input placeholder="성" />\n      </Field>\n      <Field>\n        <FieldLabel>이름</FieldLabel>\n        <Input placeholder="이름" />\n      </Field>\n    </div>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputGridDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">필수</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">required</code>{" "}
              속성으로 필수 입력 필드를 나타냅니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel, FieldDescription } from "@chadcn/ui"\n\nexport function InputRequired() {\n  return (\n    <Field>\n      <FieldLabel>\n        필수 필드 <span className="text-destructive">*</span>\n      </FieldLabel>\n      <Input required placeholder="이 필드는 필수입니다" />\n      <FieldDescription>이 필드는 반드시 채워야 합니다.</FieldDescription>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputRequiredDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">뱃지</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              레이블에{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Badge</code>를
              사용하여 추천 필드를 강조합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Badge } from "@chadcn/ui"\nimport { Field, FieldLabel } from "@chadcn/ui"\n\nexport function InputBadge() {\n  return (\n    <Field>\n      <FieldLabel className="flex items-center gap-2">\n        웹훅 URL <Badge variant="secondary">베타</Badge>\n      </FieldLabel>\n      <Input placeholder="https://example.com/webhook" />\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputBadgeDemo />
            </ExamplePreview>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">입력 그룹</h3>
            <p className="text-[0.95rem] text-muted-foreground">
              입력 필드에 아이콘이나 텍스트를 추가하려면{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">InputGroup</code>{" "}
              컴포넌트를 사용합니다.
            </p>
            <ExamplePreview
              code={
                <CodeBlock
                  code={`import { Input } from "@chadcn/ui"\nimport { Field, FieldLabel } from "@chadcn/ui"\nimport { InputGroup, InputGroupText } from "@chadcn/ui"\n\nexport function InputGroupDemo() {\n  return (\n    <Field>\n      <FieldLabel>웹사이트 URL</FieldLabel>\n      <InputGroup>\n        <InputGroupText>https://</InputGroupText>\n        <Input placeholder="example.com" />\n      </InputGroup>\n    </Field>\n  )\n}`}
                  lang="tsx"
                />
              }
            >
              <InputGroupDemo />
            </ExamplePreview>
          </div>
        </section>
      </div>
    </div>
  )
}
