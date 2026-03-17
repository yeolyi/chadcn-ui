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
        <FieldLabel>API Key</FieldLabel>
        <Input
          type="password"
          placeholder="Enter your API key..."
          onChange={(e) => setValue(e.target.value)}
        />
        <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
      </Field>
      {value && (
        <p className="mt-3 text-xs text-muted-foreground">
          Received: <code className="rounded bg-muted px-1.5 py-0.5">{value}</code>
        </p>
      )}
    </div>
  )
}

export function InputBasicDemo() {
  return (
    <div className="w-full max-w-sm">
      <Input type="email" placeholder="Email" />
    </div>
  )
}

export function InputFieldDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="chadcn" />
        <FieldDescription>Choose a unique username for your account.</FieldDescription>
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
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="Name" />
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="Email" />
            <FieldDescription>We&apos;ll send updates to this address.</FieldDescription>
          </Field>
        </FieldGroup>
        <div className="flex gap-2">
          <Button variant="outline" type="reset">
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}

export function InputDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field data-disabled>
        <FieldLabel>Email</FieldLabel>
        <Input disabled type="email" placeholder="Email" />
        <FieldDescription>This field is currently disabled.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputInvalidDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field data-invalid>
        <FieldLabel>Invalid Input</FieldLabel>
        <Input aria-invalid type="email" placeholder="Email" />
        <FieldDescription>This field contains validation errors.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputFileDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>Picture</FieldLabel>
        <Input type="file" />
        <FieldDescription>Select a picture to upload.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputInlineDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <Input placeholder="Search..." />
        <Button type="submit">Search</Button>
      </div>
    </div>
  )
}

export function InputGridDemo() {
  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input placeholder="First Name" />
        </Field>
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input placeholder="Last Name" />
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
          Required Field <span className="text-destructive">*</span>
        </FieldLabel>
        <Input required placeholder="This field is required" />
        <FieldDescription>This field must be filled out.</FieldDescription>
      </Field>
    </div>
  )
}

export function InputBadgeDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel className="flex items-center gap-2">
          Webhook URL <Badge variant="secondary">Beta</Badge>
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
        <FieldLabel>Website URL</FieldLabel>
        <InputGroup>
          <InputGroupText>https://</InputGroupText>
          <Input placeholder="example.com" />
        </InputGroup>
      </Field>
    </div>
  )
}
