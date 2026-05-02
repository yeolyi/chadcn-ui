// Chad components (modified behavior)
// Top-level Button is an alias for the "shy" variant.
// Use subpath imports for explicit variant selection: @chadcn/ui/button/<slug>
export { Button, buttonVariants } from "./button/shy"
export { Input } from "./input"
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

// Re-exported components (original behavior, chad versions coming soon)
export { Checkbox } from "./checkbox"
export { RadioGroup, RadioGroupItem } from "./radio-group"
export { Slider } from "./slider"
export { Switch } from "./switch"
export { Textarea } from "./textarea"
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
