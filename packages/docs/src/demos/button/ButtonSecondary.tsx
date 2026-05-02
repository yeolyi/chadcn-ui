import { buttonComponents } from "@/lib/button-components"

export function ButtonSecondary({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return <Button variant="secondary">Secondary</Button>
}
