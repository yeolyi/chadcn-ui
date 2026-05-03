"use client"

import { Dialog } from "radix-ui"
import * as React from "react"

import { cn } from "../lib/utils"
import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"
import { sponsoredAvatar } from "./sponsored.avatar"

const COUNTDOWN_SECONDS = 5
const INSTAGRAM_URL = "https://instagram.com/yeol.dev"

export function Button({
  onClick,
  children,
  asChild,
  className,
  ...props
}: ButtonBaseProps) {
  const [adOpen, setAdOpen] = React.useState(false)
  const [watched, setWatched] = React.useState(false)
  const [secondsLeft, setSecondsLeft] = React.useState(COUNTDOWN_SECONDS)
  const pendingRef = React.useRef<(() => void) | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (watched) {
      onClick?.(e)
      return
    }
    e.preventDefault()
    pendingRef.current = onClick ? () => onClick(e) : null
    setSecondsLeft(COUNTDOWN_SECONDS)
    setAdOpen(true)
  }

  React.useEffect(() => {
    if (!adOpen || secondsLeft <= 0) return
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(id)
  }, [adOpen, secondsLeft])

  const close = () => {
    if (secondsLeft > 0) return
    const cb = pendingRef.current
    pendingRef.current = null
    setAdOpen(false)
    setWatched(true)
    cb?.()
  }

  // Block Radix's auto-dismiss until countdown finishes
  const blockIfCounting = (e: Event) => {
    if (secondsLeft > 0) e.preventDefault()
  }

  return (
    <>
      <ButtonBase
        onClick={handleClick}
        asChild={asChild}
        className={cn("relative", className)}
        {...props}
      >
        {asChild && React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<{ children?: React.ReactNode }>,
              undefined,
              (children as React.ReactElement<{ children?: React.ReactNode }>).props
                .children,
              <SponsoredBadge watched={watched} />,
            )
          : (
              <>
                {children}
                <SponsoredBadge watched={watched} />
              </>
            )}
      </ButtonBase>
      <Dialog.Root
        open={adOpen}
        onOpenChange={(open) => {
          if (!open) close()
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
          <Dialog.Content
            onEscapeKeyDown={blockIfCounting}
            onPointerDownOutside={blockIfCounting}
            onInteractOutside={blockIfCounting}
            className="fixed left-1/2 top-1/2 z-[101] grid w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border bg-background p-5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                스폰서
              </span>
              <button
                type="button"
                onClick={close}
                disabled={secondsLeft > 0}
                aria-label={
                  secondsLeft > 0 ? `${secondsLeft}초 후 건너뛰기` : "광고 닫기"
                }
                className="flex h-7 min-w-[2rem] items-center justify-center rounded-full px-2 text-xs font-medium text-muted-foreground tabular-nums hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                {secondsLeft > 0 ? `${secondsLeft}초 후 건너뛰기` : "✕"}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={sponsoredAvatar}
                alt=""
                aria-hidden
                className="size-12 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <Dialog.Title className="truncate text-sm font-semibold">
                  개발자 성열
                </Dialog.Title>
                <Dialog.Description className="truncate text-xs text-muted-foreground">
                  @yeol.dev
                </Dialog.Description>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              개발 관련된 다양한 내용을 공유합니다.
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-md bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              팔로우하기
            </a>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

function SponsoredBadge({ watched }: { watched: boolean }) {
  if (watched) return null
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-2 -top-2 inline-flex items-center rounded-md border-transparent bg-amber-400 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wider text-amber-950 ring-2 ring-background dark:bg-amber-300"
    >
      AD
    </span>
  )
}

export { buttonVariants }
