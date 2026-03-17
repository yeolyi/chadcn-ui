import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@chadcn/ui"
import { type Locale, translations } from "./translations"

// Replaces InputGroupDemo — same height (4 stacked input rows in grid gap-6)
export function InputFormStack({ locale = "en" }: { locale?: Locale }) {
  const t = translations.inputFormStack[locale]
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Input placeholder={t.search} />
      <Select defaultValue="">
        <SelectTrigger>
          <SelectValue placeholder={t.selectCategory} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="bug">{t.bug}</SelectItem>
            <SelectItem value="feature">{t.feature}</SelectItem>
            <SelectItem value="docs">{t.docs}</SelectItem>
            <SelectItem value="other">{t.other}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Textarea placeholder={t.message} />
      <Input placeholder={t.username} />
    </div>
  )
}
