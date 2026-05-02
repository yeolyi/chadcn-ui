import type { ButtonComponent } from "@/lib/types"

export function ButtonLink({ Button }: { Button: ButtonComponent }) {
  return <Button variant="link">Link</Button>
}
