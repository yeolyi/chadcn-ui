import type { ButtonComponent } from "@/lib/types"

export function ButtonDestructive({ Button }: { Button: ButtonComponent }) {
  return <Button variant="destructive">Destructive</Button>
}
