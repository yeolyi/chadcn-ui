import Link from "next/link"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { createMetadata } from "@/lib/og"

import { RootComponents } from "../(root)/components"

const title = "아름답게 디자인됨. 잊을 수 없는 인터랙션."
const description =
  "어디서나 똑같은 웹사이트. 이용자가 진짜 기억할 컴포넌트로 차별화하세요."

export const dynamic = "force-static"
export const revalidate = false

export const metadata = createMetadata({
  title,
  description,
})

export default function KoIndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm" className="h-[31px] rounded-lg">
            <Link href="/ko/docs">시작하기</Link>
          </Button>
          <Button asChild size="sm" variant="ghost" className="rounded-lg">
            <Link href="/ko/docs/components/button">컴포넌트 보기</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="container-wrapper flex-1 section-soft pb-6">
        <div className="container">
          <section className="theme-container">
            <RootComponents locale="ko" />
          </section>
        </div>
      </div>
    </div>
  )
}
