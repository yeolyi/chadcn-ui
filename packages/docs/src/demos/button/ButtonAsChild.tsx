import { Button } from "@chadcn/ui"

export function ButtonAsChild() {
  return (
    <Button asChild>
      <a href="/login">로그인</a>
    </Button>
  )
}
