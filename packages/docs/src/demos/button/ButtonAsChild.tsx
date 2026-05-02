import type { ButtonComponent } from "@/lib/types"

export function ButtonAsChild({ Button }: { Button: ButtonComponent }) {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  )
}
