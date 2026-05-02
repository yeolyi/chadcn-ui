export const strings = {
  ko: {
    siteDescription:
      "shadcn/ui와 동일한 컴포넌트, 동일한 API, 잊을 수 없는 인터랙션. shadcn/ui의 드롭인 대체품.",

    // Header / mobile nav
    menu: "메뉴",
    home: "홈",
    sections: "섹션",
    components: "컴포넌트",
    introduction: "소개",
    installation: "설치",
    toggleMenu: "메뉴 토글",

    // Right rail TOC
    onThisPage: "목차",

    // ExamplePreview "View Code" toggle
    viewCode: "코드 보기",
  },
  en: {
    siteDescription:
      "Same components as shadcn/ui, same API, unforgettable interactions. A drop-in replacement for shadcn/ui.",

    menu: "Menu",
    home: "Home",
    sections: "Sections",
    components: "Components",
    introduction: "Introduction",
    installation: "Installation",
    toggleMenu: "Toggle Menu",

    onThisPage: "On This Page",

    viewCode: "View Code",
  },
} as const

export type Locale = keyof typeof strings
export type Strings = (typeof strings)["ko"]

export function t(locale: Locale | string | undefined): Strings {
  return strings[(locale as Locale) in strings ? (locale as Locale) : "ko"]
}
