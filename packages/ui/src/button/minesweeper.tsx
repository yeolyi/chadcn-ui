"use client"

import { shuffle } from "es-toolkit"
import { FlagIcon } from "lucide-react"
import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

const TARGET_CELL_PX = 7
const MIN_AXIS = 2
const MINE_RATIO = 0.2

type Grid = { cols: number; rows: number; mines: number }
type Cell = { mine: boolean; adjacent: number; revealed: boolean; flagged: boolean }

function deriveGrid(width: number, height: number): Grid {
  const cols = Math.max(MIN_AXIS, Math.round(width / TARGET_CELL_PX))
  const rows = Math.max(MIN_AXIS, Math.round(height / TARGET_CELL_PX))
  const total = cols * rows
  const mines = Math.min(total - 1, Math.max(1, Math.round(total * MINE_RATIO)))
  return { cols, rows, mines }
}

function neighbors(i: number, g: Grid): number[] {
  const r = Math.floor(i / g.cols)
  const c = i % g.cols
  const out: number[] = []
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const nr = r + dr
      const nc = c + dc
      if (nr < 0 || nr >= g.rows || nc < 0 || nc >= g.cols) continue
      out.push(nr * g.cols + nc)
    }
  }
  return out
}

function createBoard(g: Grid, firstClick: number): Cell[] {
  const total = g.cols * g.rows
  const indices = Array.from({ length: total }, (_, i) => i)
  const safeZone = new Set([firstClick, ...neighbors(firstClick, g)])
  const pool = indices.filter((i) => !safeZone.has(i))
  const mineCount = Math.min(g.mines, pool.length)
  const mineSet = new Set(shuffle(pool).slice(0, mineCount))
  const board: Cell[] = indices.map((i) => ({
    mine: mineSet.has(i),
    adjacent: 0,
    revealed: false,
    flagged: false,
  }))
  for (let i = 0; i < total; i++) {
    if (board[i].mine) continue
    board[i].adjacent = neighbors(i, g).filter((n) => board[n].mine).length
  }
  return board
}

function flood(board: Cell[], g: Grid, start: number): Cell[] {
  const next = board.map((c) => ({ ...c }))
  const queue = [start]
  while (queue.length > 0) {
    const i = queue.shift()!
    if (next[i].revealed || next[i].mine) continue
    next[i].revealed = true
    if (next[i].adjacent !== 0) continue
    for (const n of neighbors(i, g)) {
      if (!next[n].revealed) queue.push(n)
    }
  }
  return next
}

export function Button({
  onClick,
  children,
  style,
  ref,
  asChild,
  ...props
}: ButtonBaseProps) {
  const [grid, setGrid] = React.useState<Grid | null>(null)
  const [board, setBoard] = React.useState<Cell[] | null>(null)
  const [solved, setSolved] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const shakeAnimRef = React.useRef<Animation | null>(null)
  const pendingTapRef = React.useRef<{
    index: number
    timer: ReturnType<typeof setTimeout>
  } | null>(null)

  const clearPendingTap = React.useCallback(() => {
    if (pendingTapRef.current) {
      clearTimeout(pendingTapRef.current.timer)
      pendingTapRef.current = null
    }
  }, [])

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref],
  )

  React.useEffect(
    () => () => {
      shakeAnimRef.current?.cancel()
      clearPendingTap()
    },
    [clearPendingTap],
  )

  React.useLayoutEffect(() => {
    const btn = buttonRef.current
    if (!btn || solved) return
    const measure = () => {
      const next = deriveGrid(btn.clientWidth, btn.clientHeight)
      setGrid((prev) => {
        if (prev && prev.cols === next.cols && prev.rows === next.rows) return prev
        setBoard(null)
        return next
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(btn)
    return () => ro.disconnect()
  }, [solved])

  const shake = React.useCallback(() => {
    const btn = buttonRef.current
    if (!btn) return
    shakeAnimRef.current?.cancel()
    shakeAnimRef.current = btn.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-3px)" },
        { transform: "translateX(3px)" },
        { transform: "translateX(-2px)" },
        { transform: "translateX(2px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 280, easing: "ease-out" },
    )
  }, [])

  const toggleFlag = (i: number) => {
    setBoard((prev) => {
      if (!prev || prev[i].revealed) return prev
      return prev.map((c, j) => (j === i ? { ...c, flagged: !c.flagged } : c))
    })
  }

  const reveal = (i: number) => {
    if (!grid) return
    if (board?.[i]?.flagged) return
    const b = board ?? createBoard(grid, i)
    if (b[i].mine) {
      setBoard(null)
      shake()
      return
    }
    const next = flood(b, grid, i)
    const safe = grid.cols * grid.rows - grid.mines
    const revealed = next.filter((c) => c.revealed).length
    if (revealed >= safe) {
      setBoard(null)
      setSolved(true)
      return
    }
    setBoard(next)
  }

  const handleCellClick = (i: number) => (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const pending = pendingTapRef.current
    if (pending && pending.index === i) {
      clearPendingTap()
      toggleFlag(i)
      return
    }
    clearPendingTap()
    pendingTapRef.current = {
      index: i,
      timer: setTimeout(() => {
        pendingTapRef.current = null
        reveal(i)
      }, 220),
    }
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!solved) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  if (solved || asChild) {
    return (
      <ButtonBase
        ref={setRefs}
        onClick={handleButtonClick}
        asChild={asChild}
        style={style}
        {...props}
      >
        {children}
      </ButtonBase>
    )
  }

  return (
    <ButtonBase
      ref={setRefs}
      onClick={handleButtonClick}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        touchAction: "manipulation",
        ...style,
      }}
      {...props}
    >
      {children}
      {grid && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))`,
            gap: "1px",
            background: "rgba(0,0,0,0.35)",
            zIndex: 5,
          }}
        >
          {Array.from({ length: grid.cols * grid.rows }).map((_, i) => {
            const cell = board?.[i]
            const revealed = cell?.revealed ?? false
            const flagged = cell?.flagged ?? false
            const bg = revealed
              ? "rgba(255,255,255,0.35)"
              : "rgba(0,0,0,0.55)"
            return (
              <span
                key={i}
                role="button"
                tabIndex={-1}
                onClick={handleCellClick(i)}
                style={{
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "7px",
                  lineHeight: 1,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.95)",
                  cursor: "pointer",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                  touchAction: "manipulation",
                }}
              >
                {flagged && !revealed ? (
                  <FlagIcon
                    strokeWidth={2.5}
                    style={{
                      width: "70%",
                      height: "70%",
                      color: "rgb(248,113,113)",
                    }}
                  />
                ) : revealed && cell && cell.adjacent > 0 ? (
                  cell.adjacent
                ) : (
                  ""
                )}
              </span>
            )
          })}
        </span>
      )}
    </ButtonBase>
  )
}

export { buttonVariants }
