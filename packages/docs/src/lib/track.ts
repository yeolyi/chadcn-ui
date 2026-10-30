// Visits to chad-cn.com for yeolyi.com stats (stats.yeolyi.com). Posts to this site's own /api/track,
// which keeps the visitor id in a first-party cookie and forwards to the stats database.
// Copied from yeolyi.com's packages/track (pageviews, time on page, outbound links and downloads).
// Not sent on the dev server.

const DOWNLOAD = /\.(zip|pdf|dmg|exe|pkg|crx|xpi|apk|csv|xlsx?|docx?|pptx?|mp4|mp3)$/i

let path = ""

export function startTracking() {
  if (import.meta.env.DEV) return

  // Only the first page reached from outside has a referrer and UTM.
  let referrer = externalReferrer()
  let utm = utmParams()
  let shownAt = document.visibilityState === "visible" ? Date.now() : 0
  let shown = 0
  let sent = 0

  const engage = () => {
    const seconds = Math.round((shown + (shownAt ? Date.now() - shownAt : 0)) / 1000)
    if (!path || seconds <= sent) return
    sent = seconds
    send({ kind: "engage", path, seconds })
  }

  const view = () => {
    const next = normalize(location.pathname)
    if (next === path) return
    engage()
    path = next
    shown = 0
    sent = 0
    shownAt = document.visibilityState === "visible" ? Date.now() : 0
    send({ kind: "pageview", path, referrer, utm })
    referrer = null
    utm = null
  }

  view()
  addEventListener("popstate", view)
  const push = history.pushState
  history.pushState = function (...args) {
    push.apply(this, args)
    view()
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      shownAt = Date.now()
    } else {
      if (shownAt) shown += Date.now() - shownAt
      shownAt = 0
      engage()
    }
  })
  addEventListener("pagehide", engage)

  // Outbound links and downloads, including middle-click to a new tab.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.("a[href]")
    if (!(a instanceof HTMLAnchorElement)) return
    let url: URL
    try {
      url = new URL(a.href)
    } catch {
      return
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") return
    const at = path || normalize(location.pathname)
    if (a.hasAttribute("download") || DOWNLOAD.test(url.pathname))
      send({ kind: "event", path: at, name: "download", props: { file: decode(url.pathname) } })
    else if (url.hostname !== location.hostname)
      send({
        kind: "event",
        path: at,
        name: "outbound",
        props: { url: (url.hostname + url.pathname).replace(/\/$/, "") },
      })
  }
  document.addEventListener("click", onClick, { capture: true })
  document.addEventListener("auxclick", onClick, { capture: true })
}

// keepalive so it still goes out while leaving. The result is ignored.
function send(body: object) {
  fetch("/api/track", {
    method: "POST",
    keepalive: true,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {})
}

function normalize(p: string) {
  const s = p.replace(/\/+$/, "").replace(/\/{2,}/g, "/");
  return s === "" ? "/" : s;
}

function decode(s: string) {
  try {
    return decodeURI(s);
  } catch {
    return s;
  }
}

function externalReferrer() {
  if (!document.referrer) return null;
  try {
    const host = new URL(document.referrer).hostname;
    return host === location.hostname ? null : host;
  } catch {
    return null;
  }
}

// utm_source·utm_medium·utm_campaign·utm_content. ref 는 utm_source 가 없을 때 그 자리에.
// 인스타·스레드는 프로필 링크에 utm_content=link_in_bio 를 붙인다.
function utmParams() {
  const q = new URLSearchParams(location.search);
  const utm = {
    source: q.get("utm_source") ?? q.get("ref") ?? undefined,
    medium: q.get("utm_medium") ?? undefined,
    campaign: q.get("utm_campaign") ?? undefined,
    content: q.get("utm_content") ?? undefined,
  };
  return utm.source || utm.medium || utm.campaign || utm.content ? utm : null;
}
