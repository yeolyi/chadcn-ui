import { buttonComponents } from "@/lib/button-components"

export function ButtonOutline({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return <Button variant="outline">Outline</Button>
}
