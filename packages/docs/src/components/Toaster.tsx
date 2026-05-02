import { Toaster as SonnerToaster, toast } from "sonner"

if (typeof window !== "undefined") {
  ;(window as unknown as { __toast: typeof toast }).__toast = toast
}

export function Toaster() {
  return <SonnerToaster position="top-center" />
}
