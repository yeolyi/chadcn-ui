import { buttonComponents } from "@/lib/button-components"

export function ButtonDestructive({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return <Button variant="destructive">Destructive</Button>
}
