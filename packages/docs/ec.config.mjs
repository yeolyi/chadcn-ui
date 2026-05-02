import { defineEcConfig } from "astro-expressive-code"

export default defineEcConfig({
  themes: ["github-light", "github-dark"],
  themeCssSelector: (theme) => `.${theme.type}`,
  styleOverrides: {
    borderRadius: "0.75rem",
    borderWidth: "0px",
    codeFontFamily: "var(--font-mono)",
  },
})
