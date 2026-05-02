export const strings = {
  ko: {
    // Site / metadata
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
    toggleLocale: "언어 변경",
    githubAriaLabel: "GitHub",
    instagramAriaLabel: "Instagram",

    // Right rail TOC
    onThisPage: "목차",

    // Code preview / copy
    viewCode: "코드 보기",
    copySuccess: "코드가 복사되었습니다",
    comingSoon: "준비 중",
    comingSoonDescription: "패키지가 아직 npm에 게시되지 않았습니다.",

    // Landing
    landingTitle: "잊을 수 없게, 인터랙티브하게.",
    landingDescription:
      "다른 사이트와 똑같은 컴포넌트는 그만. 사용자가 진짜로 기억할 수 있는 컴포넌트를 쓰세요.",
    getStarted: "시작하기",
    viewComponents: "컴포넌트 보기",

    // Introduction page (chrome only — body is inline in DocsIndex.astro)
    introductionTitle: "소개",
    introductionDescription:
      "chadcn/ui는 shadcn/ui의 드롭인 대체품입니다. 같은 컴포넌트, 같은 API, 잊을 수 없는 UX.",

    // Installation page (chrome — body is inline)
    installationTitle: "설치",
    installationDescription: "프로젝트에 chadcn/ui를 설치하는 방법.",
    installLabel: "설치",
    usageLabel: "사용법",
    usageHelp: "스타일시트와 컴포넌트를 직접 import하세요. API는 shadcn/ui와 동일합니다.",

    // Variant page chrome (rest of variant content is in the variant MDX)
    fallbackBanner: "이 항목은 아직 한국어로만 제공됩니다.",
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
    toggleLocale: "Switch language",
    githubAriaLabel: "GitHub",
    instagramAriaLabel: "Instagram",

    onThisPage: "On This Page",

    viewCode: "View Code",
    copySuccess: "Copied to clipboard",
    comingSoon: "Coming Soon",
    comingSoonDescription: "Package not yet published on npm.",

    landingTitle: "Beautifully designed. Unforgettably interactive.",
    landingDescription:
      "Every website looks the same. Stand out with components your users will actually remember.",
    getStarted: "Get Started",
    viewComponents: "View Components",

    introductionTitle: "Introduction",
    introductionDescription:
      "chadcn/ui is a drop-in replacement for shadcn/ui. Same components, same API, unforgettable UX.",

    installationTitle: "Installation",
    installationDescription: "How to install chadcn/ui in your project.",
    installLabel: "Install",
    usageLabel: "Usage",
    usageHelp:
      "Import the stylesheet and components directly. The API is identical to shadcn/ui.",

    fallbackBanner: "This entry is only available in Korean.",
  },
} as const

export type Locale = keyof typeof strings
export type Strings = (typeof strings)["ko"]

export function t(locale: Locale | string | undefined): Strings {
  return strings[(locale as Locale) in strings ? (locale as Locale) : "ko"]
}
