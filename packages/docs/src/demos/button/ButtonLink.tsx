import { buttonComponents } from "@/lib/button-components"

export function ButtonLink({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return <Button variant="link">Link</Button>
}
