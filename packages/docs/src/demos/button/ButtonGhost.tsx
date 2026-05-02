import { buttonComponents } from "@/lib/button-components"

export function ButtonGhost({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return <Button variant="ghost">Ghost</Button>
}
