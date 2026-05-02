import { buttonComponents } from "@/lib/button-components"

export function ButtonAsChild({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  )
}
