"use client"

import { Textarea } from "@chadcn/ui"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function TextareaMainDemo() {
  return (
    <div className="w-full max-w-sm">
      <Textarea placeholder="Type your message here." />
    </div>
  )
}

export function TextareaWithLabelDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." />
      <p className="text-sm text-muted-foreground">
        Your message will be sent to our support team.
      </p>
    </div>
  )
}

export function TextareaDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <Textarea placeholder="Type your message here." disabled />
    </div>
  )
}

export function TextareaWithButtonDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
