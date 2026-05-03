import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.SUPABASE_URL ?? "",
  import.meta.env.SUPABASE_SECRET_KEY ?? "",
  { auth: { persistSession: false } },
)

export async function fetchLikeCounts(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("chadcn_likes")
    .select("slug")
  const counts: Record<string, number> = {}
  if (!error) {
    for (const row of data ?? []) {
      counts[row.slug] = (counts[row.slug] ?? 0) + 1
    }
  }
  return counts
}
