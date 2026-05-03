import { createClient, type RealtimeChannel } from "@supabase/supabase-js"
import * as React from "react"

const STORAGE_KEY = "chadcn:cursors-disabled"
const TOGGLE_EVENT = "chadcn:cursors-toggle"
const SESSION_KEY = "chadcn:cursor-identity"
const BROADCAST_HZ = 30
const FADE_AFTER_MS = 4000

const NAME_POOL = [
  "Button", "Card", "Sheet", "Dialog", "Input", "Select", "Tabs", "Badge",
  "Avatar", "Toast", "Tooltip", "Popover", "Switch", "Slider", "Checkbox",
  "Radio", "Textarea", "Form", "Label", "Calendar", "Command", "Drawer",
  "Menubar", "Pagination", "Progress", "ScrollArea", "Separator",
  "Skeleton", "Sonner", "Table", "Toggle", "Carousel", "Alert", "Accordion",
  "Breadcrumb", "Collapsible", "HoverCard", "Resizable", "Combobox", "Chart",
]

interface Identity {
  id: string
  name: string
  hue: number
}

interface RemoteCursor extends Identity {
  x: number
  y: number
  lastSeen: number
}

function loadIdentity(): Identity {
  if (typeof window === "undefined") {
    return { id: "ssr", name: "Button", hue: 0 }
  }
  const cached = window.sessionStorage.getItem(SESSION_KEY)
  if (cached) {
    try {
      return JSON.parse(cached) as Identity
    } catch {}
  }
  const id = crypto.randomUUID()
  const name = NAME_POOL[Math.floor(Math.random() * NAME_POOL.length)]
  const hue = Math.floor(Math.random() * 360)
  const identity: Identity = { id, name, hue }
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(identity))
  return identity
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabasePublishable = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY

const supabase =
  supabaseUrl && supabasePublishable
    ? createClient(supabaseUrl, supabasePublishable, {
        auth: { persistSession: false },
      })
    : null

export function CursorOverlay({ channel: channelName }: { channel: string }) {
  const [cursors, setCursors] = React.useState<Map<string, RemoteCursor>>(
    new Map(),
  )
  const [active, setActive] = React.useState(true)
  const identityRef = React.useRef<Identity | null>(null)

  // Read enabled state + listen for toggle changes.
  React.useEffect(() => {
    const sync = () =>
      setActive(window.localStorage.getItem(STORAGE_KEY) !== "1")
    sync()
    window.addEventListener(TOGGLE_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(TOGGLE_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  React.useEffect(() => {
    if (!active || !supabase) return
    identityRef.current ??= loadIdentity()
    const me = identityRef.current
    const canBroadcast = window.matchMedia("(pointer: fine)").matches

    const channel: RealtimeChannel = supabase.channel(channelName, {
      config: { broadcast: { self: false } },
    })

    channel.on(
      "broadcast",
      { event: "cursor" },
      ({ payload }: { payload: RemoteCursor }) => {
        if (payload.id === me.id) return
        setCursors((prev) => {
          const next = new Map(prev)
          next.set(payload.id, { ...payload, lastSeen: Date.now() })
          return next
        })
      },
    )
    channel.on("broadcast", { event: "leave" }, ({ payload }: { payload: { id: string } }) => {
      setCursors((prev) => {
        const next = new Map(prev)
        next.delete(payload.id)
        return next
      })
    })

    channel.subscribe()

    let lastSent = 0
    let lastBroadcast: { x: number; y: number } | null = null
    const onMove = (e: PointerEvent) => {
      if (!canBroadcast) return
      const now = performance.now()
      if (now - lastSent < 1000 / BROADCAST_HZ) return
      lastSent = now
      lastBroadcast = { x: e.clientX, y: e.clientY }
      channel.send({
        type: "broadcast",
        event: "cursor",
        payload: {
          id: me.id,
          name: me.name,
          hue: me.hue,
          x: e.clientX,
          y: e.clientY,
        } satisfies RemoteCursor,
      })
    }
    if (canBroadcast) window.addEventListener("pointermove", onMove, { passive: true })

    const sweep = window.setInterval(() => {
      const cutoff = Date.now() - FADE_AFTER_MS
      setCursors((prev) => {
        let changed = false
        const next = new Map(prev)
        for (const [id, c] of next) {
          if (c.lastSeen < cutoff) {
            next.delete(id)
            changed = true
          }
        }
        return changed ? next : prev
      })
    }, 1000)

    const sayBye = () => {
      if (lastBroadcast)
        channel.send({ type: "broadcast", event: "leave", payload: { id: me.id } })
    }
    window.addEventListener("pagehide", sayBye)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pagehide", sayBye)
      window.clearInterval(sweep)
      sayBye()
      channel.unsubscribe()
      setCursors(new Map())
    }
  }, [active, channelName])

  if (!active || cursors.size === 0) return null

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {Array.from(cursors.values()).map((c) => (
        <Cursor key={c.id} cursor={c} />
      ))}
    </div>
  )
}

function Cursor({ cursor }: { cursor: RemoteCursor }) {
  const color = `hsl(${cursor.hue}, 75%, 50%)`
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${cursor.x}px, ${cursor.y}px)`,
        transition: "transform 80ms linear",
        willChange: "transform",
      }}
    >
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 22"
        fill={color}
        stroke="white"
        strokeWidth="1.2"
        style={{ display: "block", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
      >
        <path d="M2 2 L2 16 L6 12 L8.5 18 L11 17 L8.5 11 L14 11 Z" />
      </svg>
      <span
        style={{
          position: "absolute",
          left: 14,
          top: 18,
          padding: "2px 6px",
          borderRadius: 4,
          background: color,
          color: "white",
          fontSize: 10,
          fontWeight: 600,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      >
        {cursor.name}
      </span>
    </div>
  )
}
