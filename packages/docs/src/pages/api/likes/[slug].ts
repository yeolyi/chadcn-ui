import type { APIRoute } from "astro"
import { createHash } from "node:crypto"

import { createClient } from "@supabase/supabase-js"

export const prerender = false

const SUPABASE_URL = import.meta.env.SUPABASE_URL
const SUPABASE_SECRET_KEY = import.meta.env.SUPABASE_SECRET_KEY
const LIKE_HASH_SALT = import.meta.env.LIKE_HASH_SALT

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY || !LIKE_HASH_SALT) {
  console.warn(
    "[likes API] missing env: SUPABASE_URL / SUPABASE_SECRET_KEY / LIKE_HASH_SALT",
  )
}

const supabase = createClient(SUPABASE_URL ?? "", SUPABASE_SECRET_KEY ?? "", {
  auth: { persistSession: false },
})

function hashUser(ip: string): string {
  return createHash("sha256").update(`${ip}:${LIKE_HASH_SALT}`).digest("hex")
}

function getClientIP(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

async function readState(slug: string, userHash: string) {
  const [{ count }, { data: own }] = await Promise.all([
    supabase
      .from("chadcn_likes")
      .select("*", { count: "exact", head: true })
      .eq("slug", slug),
    supabase
      .from("chadcn_likes")
      .select("id")
      .eq("slug", slug)
      .eq("user_hash", userHash)
      .maybeSingle(),
  ])
  return { count: count ?? 0, liked: !!own }
}

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      ...(init.headers ?? {}),
    },
  })
}

export const GET: APIRoute = async ({ params, request }) => {
  const slug = params.slug
  if (!slug) return json({ error: "missing slug" }, { status: 400 })
  const userHash = hashUser(getClientIP(request))
  const state = await readState(slug, userHash)
  return json(state)
}

export const POST: APIRoute = async ({ params, request }) => {
  const slug = params.slug
  if (!slug) return json({ error: "missing slug" }, { status: 400 })
  const userHash = hashUser(getClientIP(request))

  const { data: existing } = await supabase
    .from("chadcn_likes")
    .select("id")
    .eq("slug", slug)
    .eq("user_hash", userHash)
    .maybeSingle()

  if (existing) {
    await supabase.from("chadcn_likes").delete().eq("id", existing.id)
  } else {
    await supabase.from("chadcn_likes").insert({ slug, user_hash: userHash })
  }

  const state = await readState(slug, userHash)
  return json(state)
}
