# chadcn/ui

Beautifully designed components with terrible UX. A drop-in replacement for [shadcn/ui](https://ui.shadcn.com).

## Components

- **Button** — Runs away from your cursor. Surrenders after 7 attempts, then requires 3 confirmation dialogs.
- **Input** — Every character you type is replaced with a random one. `type="password"` shows cleartext.
- **Select** — Options shuffle on open. 15% chance of selecting the wrong item. Auto-closes after 1.5s.

## Install

```bash
npm install @chadcn/ui
```

## Usage

```tsx
import { Button } from "@chadcn/ui"
import { Input } from "@chadcn/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@chadcn/ui"
```

Same props, same look, different experience.

## Development

```bash
pnpm install
pnpm dev        # docs site at http://localhost:4000
```

## License

MIT
