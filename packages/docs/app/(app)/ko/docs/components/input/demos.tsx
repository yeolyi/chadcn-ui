"use client"

import { Input } from "@chadcn/ui"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupText } from "@/components/ui/input-group"

export function InputMainDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>API 키</FieldLabel>
        <Input
          type="password"
          placeholder="API 키를 입력하세요..."
          onChange={(e) => setValue(e.target.value)}
        />
        <FieldDescription>API 키는 암호화되어 안전하게 저장됩니다.</FieldDescription>
      </Field>
      {value && (
        <p className="mt-3 text-xs text-muted-foreground">
          수신된 값: <code className="rounded bg-muted px-1.5 py-0.5">{value}</code>
        </p>
      )}
    </div>
  )
}

export function InputBasicDemo() {
  return (
    <div className="w-full max-w-sm">
      <Input type="email" placeholder="이메일" />
    </div>
  )
}

export function InputFieldDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>사용자 이름</FieldLabel>
        <Input placeholder="chadcn" />
        <FieldDescription>계정에 사용할 고유한 사용자 이름을 선택하세요.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputFieldGroupDemo() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FieldGroup>
          <Field>
            <FieldLabel>이름</FieldLabel>
            <Input placeholder="이름" />
          </Field>
          <Field>
            <FieldLabel>이메일</FieldLabel>
            <Input type="email" placeholder="이메일" />
            <FieldDescription>이 주소로 업데이트를 보내드립니다.</FieldDescription>
          </Field>
        </FieldGroup>
        <div className="flex gap-2">
          <Button variant="outline" type="reset">
            초기화
          </Button>
          <Button type="submit">제출</Button>
        </div>
      </form>
    </div>
  )
}

export function InputDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field data-disabled>
        <FieldLabel>이메일</FieldLabel>
        <Input disabled type="email" placeholder="이메일" />
        <FieldDescription>이 필드는 현재 비활성화되어 있습니다.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputInvalidDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field data-invalid>
        <FieldLabel>유효하지 않은 입력</FieldLabel>
        <Input aria-invalid type="email" placeholder="이메일" />
        <FieldDescription>이 필드에 유효성 검사 오류가 있습니다.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputFileDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>사진</FieldLabel>
        <Input type="file" />
        <FieldDescription>업로드할 사진을 선택하세요.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputInlineDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <Input placeholder="검색..." />
        <Button type="submit">검색</Button>
      </div>
    </div>
  )
}

export function InputGridDemo() {
  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>성</FieldLabel>
          <Input placeholder="성" />
        </Field>
        <Field>
          <FieldLabel>이름</FieldLabel>
          <Input placeholder="이름" />
        </Field>
      </div>
    </div>
  )
}

export function InputRequiredDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>
          필수 필드 <span className="text-destructive">*</span>
        </FieldLabel>
        <Input required placeholder="이 필드는 필수입니다" />
        <FieldDescription>이 필드는 반드시 채워야 합니다.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputBadgeDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel className="flex items-center gap-2">
          웹훅 URL <Badge variant="secondary">베타</Badge>
        </FieldLabel>
        <Input placeholder="https://example.com/webhook" />
      </Field>
    </div>
  )
}

export function InputGroupDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>웹사이트 URL</FieldLabel>
        <InputGroup>
          <InputGroupText>https://</InputGroupText>
          <Input placeholder="example.com" />
        </InputGroup>
      </Field>
    </div>
  )
}
