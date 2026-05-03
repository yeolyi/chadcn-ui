import type { APIRoute } from "astro"

import { createClient } from "@supabase/supabase-js"

export const prerender = false

const supabase = createClient(
  import.meta.env.SUPABASE_URL ?? "",
  import.meta.env.SUPABASE_SECRET_KEY ?? "",
  { auth: { persistSession: false } },
)

export const GET: APIRoute = async () => {
  const { data, error } = await supabase.from("chadcn_likes").select("slug")

  const counts: Record<string, number> = {}
  if (!error) {
    for (const row of data ?? []) {
      counts[row.slug] = (counts[row.slug] ?? 0) + 1
    }
  }

  return new Response(JSON.stringify(counts), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  })
}
