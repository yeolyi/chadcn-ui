"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ExamplePreview({
  children,
  code,
  className,
}: {
  children: React.ReactNode
  code?: React.ReactNode
  className?: string
}) {
  const [isCodeVisible, setIsCodeVisible] = React.useState(false)

  return (
    <div
      data-slot="component-preview"
      className="group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border"
    >
      <div
        className={cn(
          "preview relative flex h-72 w-full items-center justify-center p-10",
          className,
        )}
      >
        {children}
      </div>
      {code && (
        <div data-slot="code" className="relative overflow-hidden">
          {isCodeVisible ? (
            <div className="[&_[data-rehype-pretty-code-figure]]:m-0! [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t [&_pre]:max-h-72 **:data-[slot=copy-button]:flex">
              {code}
            </div>
          ) : (
            <div className="relative max-h-24 overflow-hidden">
              <div className="[&_[data-rehype-pretty-code-figure]]:m-0! [&_[data-rehype-pretty-code-figure]]:rounded-none [&_[data-rehype-pretty-code-figure]]:border-t **:data-[slot=copy-button]:hidden">
                {code}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)",
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="relative z-10 rounded-lg bg-background text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted"
                  onClick={() => setIsCodeVisible(true)}
                >
                  View Code
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
