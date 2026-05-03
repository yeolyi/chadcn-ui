import { HeartIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

interface State {
  count: number
  liked: boolean
}

export function HeartButton({ slug }: { slug: string }) {
  const [state, setState] = React.useState<State | null>(null)
  const [pending, setPending] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d: State) => {
        if (!cancelled) setState(d)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slug])

  const toggle = async () => {
    if (pending || !state) return
    setPending(true)
    const previous = state
    const optimistic: State = {
      liked: !state.liked,
      count: state.count + (state.liked ? -1 : 1),
    }
    setState(optimistic)
    try {
      const r = await fetch(`/api/likes/${slug}`, { method: "POST" })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const d: State = await r.json()
      setState(d)
      window.dispatchEvent(
        new CustomEvent("chadcn:like", { detail: { slug, count: d.count } }),
      )
    } catch {
      setState(previous)
    } finally {
      setPending(false)
    }
  }

  const liked = state?.liked ?? false
  const count = state?.count

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending || !state}
      aria-pressed={liked}
      aria-label={liked ? "Unlike this variant" : "Like this variant"}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border bg-background px-2.5 text-sm font-medium tabular-nums transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60",
        liked && "border-red-500/40 text-red-500 hover:text-red-500",
      )}
    >
      <HeartIcon
        className="size-3.5"
        fill={liked ? "currentColor" : "none"}
        strokeWidth={2}
      />
      <span>{count ?? "—"}</span>
    </button>
  )
}
