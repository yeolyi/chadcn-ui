import { buttonComponents } from "@/lib/button-components"

export function ButtonDefault({ slug }: { slug: string }) {
  const Button = buttonComponents[slug]
  return <Button>Default</Button>
}
