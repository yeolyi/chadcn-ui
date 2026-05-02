import { getCollection } from "astro:content"
import type { CollectionEntry } from "astro:content"

import type { Locale } from "@/i18n/strings"

export type VariantEntry = CollectionEntry<"variants">

export interface ParsedVariantId {
  component: string
  slug: string
  locale: Locale
}

export function parseVariantId(id: string): ParsedVariantId | null {
  const m = id.match(/^([^/]+)\/(.+)\.(ko|en)$/)
  if (!m) return null
  return { component: m[1], slug: m[2], locale: m[3] as Locale }
}

/**
 * For a given component, list each unique variant slug along with
 * its entry in the requested locale (or the Korean fallback).
 *
 * Korean is required: a variant only exists if its .ko.mdx is present.
 * English is optional: if missing, falls back to the Korean entry and
 * `isFallback` is true.
 */
export async function listVariantsForComponent(
  component: string,
  locale: Locale,
): Promise<Array<{ slug: string; entry: VariantEntry; isFallback: boolean }>> {
  const all = await getCollection("variants")
  const byComponent = all
    .map((e) => ({ entry: e, parsed: parseVariantId(e.id) }))
    .filter(({ parsed }) => parsed?.component === component)

  const koBySlug = new Map<string, VariantEntry>()
  const enBySlug = new Map<string, VariantEntry>()
  for (const { entry, parsed } of byComponent) {
    if (!parsed) continue
    if (parsed.locale === "ko") koBySlug.set(parsed.slug, entry)
    if (parsed.locale === "en") enBySlug.set(parsed.slug, entry)
  }

  return Array.from(koBySlug.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, ko]) => {
      if (locale === "en") {
        const en = enBySlug.get(slug)
        return { slug, entry: en ?? ko, isFallback: !en }
      }
      return { slug, entry: ko, isFallback: false }
    })
}

export async function findVariant(
  component: string,
  slug: string,
  locale: Locale,
): Promise<{ entry: VariantEntry; isFallback: boolean } | null> {
  const list = await listVariantsForComponent(component, locale)
  return list.find((v) => v.slug === slug) ?? null
}
