import type { APIRoute } from "astro"

// Visits for yeolyi.com stats (stats.yeolyi.com), site name "chadcn". Mirrors yeolyi.com's
// apps/blog/src/pages/api/track.ts: the visitor is one random id in this site's own first-party cookie
// `vid` (set by the server, so Safari's 7-day cap on script-written storage doesn't apply), sent with
// the UA and Vercel's country header to the stats database's public.collect (service role only).
// The IP is not passed. chad-cn.com can't share yeolyi.com's cookie (different site), so the same
// person on both sites counts as two visitors.
// The browser posts here from the same origin (src/lib/track.ts), so no CORS.
export const prerender = false

const STATS_URL = "https://jfzhtdcyaqwgugipnmhs.supabase.co"
const STATS_KEY = import.meta.env.STATS_SUPABASE_SERVICE_ROLE_KEY
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const KINDS = new Set(["pageview", "event", "engage"])
// Chrome's maximum cookie lifetime (400 days). Re-set on every visit to extend it.
const MAX_AGE = 400 * 24 * 60 * 60

// Same-origin only. Compare with the Host header: inside the Vercel function, `url` is not the public
// address, so comparing with url.origin rejected every real request.
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  try {
    return !!origin && !!host && new URL(origin).host === host
  } catch {
    return false
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!sameOrigin(request)) return new Response(null, { status: 403 })

  let body: Record<string, unknown>
  try {
    body = JSON.parse(await request.text())
  } catch {
    return new Response(null, { status: 400 })
  }
  if (!KINDS.has(body.kind as string)) return new Response(null, { status: 400 })

  const old = cookies.get("vid")?.value
  const vid = old && UUID.test(old) ? old : crypto.randomUUID()
  cookies.set("vid", vid, {
    path: "/",
    maxAge: MAX_AGE,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  })

  // The function ends once it responds, so wait for the insert. Failures aren't reported back.
  if (STATS_KEY)
    await fetch(`${STATS_URL}/rest/v1/rpc/collect`, {
      method: "POST",
      headers: {
        apikey: STATS_KEY,
        authorization: `Bearer ${STATS_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        p_kind: body.kind,
        p_visitor: vid,
        p_ua: request.headers.get("user-agent"),
        p_country: request.headers.get("x-vercel-ip-country"),
        p_site: "chadcn",
        p_path: body.path,
        p_referrer: body.referrer ?? null,
        p_utm: body.utm ?? null,
        p_name: body.name ?? null,
        p_props: body.props ?? null,
        p_seconds: body.seconds ?? null,
      }),
    }).catch(() => {})

  return new Response(null, { status: 204 })
}
