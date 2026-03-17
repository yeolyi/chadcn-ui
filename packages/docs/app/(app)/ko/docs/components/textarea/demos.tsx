"use client"

import { Textarea } from "@chadcn/ui"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function TextareaMainDemo() {
  return (
    <div className="w-full max-w-sm">
      <Textarea placeholder="여기에 메시지를 입력하세요." />
    </div>
  )
}

export function TextareaWithLabelDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="message">메시지</Label>
      <Textarea id="message" placeholder="여기에 메시지를 입력하세요." />
      <p className="text-sm text-muted-foreground">
        메시지는 지원팀에게 전달됩니다.
      </p>
    </div>
  )
}

export function TextareaDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <Textarea placeholder="여기에 메시지를 입력하세요." disabled />
    </div>
  )
}

export function TextareaWithButtonDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Textarea placeholder="여기에 메시지를 입력하세요." />
      <Button>메시지 보내기</Button>
    </div>
  )
}
