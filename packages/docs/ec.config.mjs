import { defineEcConfig } from "astro-expressive-code"

export default defineEcConfig({
  themes: ["github-light", "github-dark"],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => (theme.type === "dark" ? ".dark" : false),
  styleOverrides: {
    borderRadius: "0.75rem",
    borderWidth: "0px",
    codeFontFamily: "var(--font-mono)",
  },
})
