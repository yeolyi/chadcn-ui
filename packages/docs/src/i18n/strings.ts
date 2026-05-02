export const strings = {
  ko: {
    // Site
    siteDescription:
      "shadcn/ui와 동일한 컴포넌트, 동일한 API, 잊을 수 없는 인터랙션. shadcn/ui의 드롭인 대체품.",

    // Header / nav
    menu: "메뉴",
    home: "홈",
    sections: "섹션",
    components: "컴포넌트",
    introduction: "소개",
    installation: "설치",
    toggleMenu: "메뉴 토글",

    // Footer
    builtOn: "를 기반으로 제작되었습니다. 소스 코드는",
    sourceOnGithub: "에서 확인할 수 있습니다.",

    // TOC
    onThisPage: "목차",

    // Code preview
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

    // Introduction page
    introductionTitle: "소개",
    introductionDescription:
      "chadcn/ui는 shadcn/ui의 드롭인 대체품입니다. 같은 컴포넌트, 같은 API, 잊을 수 없는 UX.",

    // Installation page
    installationTitle: "설치",
    installationDescription: "프로젝트에 chadcn/ui를 설치하는 방법.",
    installLabel: "설치",
    usageLabel: "사용법",
    usageHelp: "스타일시트와 컴포넌트를 직접 import하세요. API는 shadcn/ui와 동일합니다.",

    // Variant page
    apiReference: "API 레퍼런스",
    examples: "예제",
    cursor: "커서",
    fallbackBanner: "이 항목은 아직 한국어로만 제공됩니다.",
    fallbackBannerEn: "This entry is only available in Korean.",

    // Misc
    githubAriaLabel: "GitHub",
    instagramAriaLabel: "Instagram",
    toggleLocale: "언어 변경",
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

    builtOn: ". The source code is available on",
    sourceOnGithub: ".",

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

    apiReference: "API Reference",
    examples: "Examples",
    cursor: "Cursor",
    fallbackBanner: "This entry is only available in Korean.",
    fallbackBannerEn: "This entry is only available in Korean.",

    githubAriaLabel: "GitHub",
    instagramAriaLabel: "Instagram",
    toggleLocale: "Switch language",
  },
} as const

export type Locale = keyof typeof strings
export type Strings = (typeof strings)["ko"]

export function t(locale: Locale | string | undefined): Strings {
  return strings[(locale as Locale) in strings ? (locale as Locale) : "ko"]
}
