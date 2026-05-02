import type { AstroGlobal } from "astro"

import { strings, type Locale, type Strings } from "./strings"

export function getLocale(Astro: AstroGlobal): Locale {
  return ((Astro.currentLocale as Locale) ?? "ko") as Locale
}

export function tFor(Astro: AstroGlobal): Strings {
  return strings[getLocale(Astro)]
}
