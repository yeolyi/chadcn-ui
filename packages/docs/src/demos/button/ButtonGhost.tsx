import type { ButtonComponent } from "@/lib/types"

export function ButtonGhost({ Button }: { Button: ButtonComponent }) {
  return <Button variant="ghost">Ghost</Button>
}
