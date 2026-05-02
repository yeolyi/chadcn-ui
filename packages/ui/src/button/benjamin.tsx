"use client"

import * as React from "react"

import { ButtonBase, type ButtonBaseProps, buttonVariants } from "./base"

// Each stage rewinds the button one design era backward, à la Benjamin Button.
// Stage 0 keeps shadcn's modern flat (2014-). Stages 1-6 regress through
// distinct OS UI epochs, ordered newest → oldest. Click 7 loops back to 0.

type StageStyle = {
  style: React.CSSProperties
}

const STAGES: StageStyle[] = [
  // Stage 1 — iOS 6 / Skeuomorphic UIButton (2010-2013)
  // • UIButtonTypeRoundedRect default corner radius ≈ 10pt
  // • Subtle linear gradient white → light gray (Apple HIG iOS 6)
  // • 1px mid-gray border, inset white top highlight (the classic "popping" highlight)
  // • Helvetica Neue (system font in iOS 4-8)
  {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      borderRadius: "10px",
      background: "linear-gradient(to bottom, #fefefe 0%, #cccccc 100%)",
      border: "1px solid #808080",
      boxShadow:
        "inset 0 1px 0 #ffffff, 0 1px 2px rgba(0,0,0,0.18)",
      color: "#1a1a1a",
      fontFamily:
        "-apple-system, 'Helvetica Neue', 'Helvetica', sans-serif",
      fontSize: "14px",
      fontWeight: 500,
      padding: "7px 16px",
      textShadow: "0 1px 0 rgba(255,255,255,0.6)",
      cursor: "pointer",
    },
  },

  // Stage 2 — Windows Aero / Vista & 7 (2006-2012)
  // • Translucent "glass" with cool-blue tint (Aero design language)
  // • ~3px corner radius — Microsoft favored small rounding over Apple's pills
  // • Segoe UI 9pt (the OS-default sans introduced with Vista)
  // • Refs: Microsoft "Windows User Experience Interaction Guidelines"
  {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      borderRadius: "3px",
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(231,238,250,0.95) 50%, rgba(196,213,236,0.95) 100%)",
      border: "1px solid #707070",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 1px rgba(0,0,0,0.12)",
      color: "#000",
      fontFamily: "'Segoe UI', 'Tahoma', sans-serif",
      fontSize: "12px",
      padding: "5px 14px",
      cursor: "pointer",
    },
  },

  // Stage 3 — Aqua / Mac OS X push button (2001-2010)
  // • Fully rounded (pill, border-radius: 9999px) — debuted at Macworld 2000
  // • Saturated blue gradient + glossy white reflection over top half
  // • Lucida Grande (system font in 10.0-10.9)
  // • Refs: Apple HIG (Aqua era); Steve Jobs keynote, Macworld 2000
  {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      borderRadius: "9999px",
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 48%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%), linear-gradient(to bottom, #7fb1ee 0%, #2a6fc8 55%, #1a4a8a 100%)",
      border: "1px solid #1a4a8a",
      boxShadow:
        "0 1px 3px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.25)",
      color: "white",
      fontFamily: "'Lucida Grande', 'Helvetica Neue', Helvetica, sans-serif",
      fontSize: "13px",
      fontWeight: "bold",
      padding: "5px 18px",
      textShadow: "0 -1px 0 rgba(0,0,0,0.45)",
      cursor: "pointer",
    },
  },

  // Stage 4 — Luna / Windows XP default (2001-2007)
  // • Subtle 50/50 split gradient with a horizontal ridge at midpoint (Luna trademark)
  // • Tahoma 8pt (the Win9x→XP system default)
  // • ~3px rounding — same Microsoft minimal-roundness convention
  // • Refs: Luna theme, default in WinXP
  {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",
      borderRadius: "3px",
      background:
        "linear-gradient(to bottom, #fafafa 0%, #f1f1f1 49%, #d4d4d4 50%, #d4d4d4 100%)",
      border: "1px solid #707070",
      boxShadow:
        "inset 0 0 0 1px rgba(255,255,255,0.5), 0 1px 1px rgba(0,0,0,0.18)",
      color: "#000",
      fontFamily: "'Tahoma', 'Microsoft Sans Serif', Geneva, sans-serif",
      fontSize: "11px",
      padding: "4px 12px",
      cursor: "pointer",
    },
  },

  // Stage 5 — Windows 95/98/Me classic 3D button (1995-2001)
  // • Background #C0C0C0 (COLOR_BTNFACE), the system "ButtonFace" color
  // • Iconic 4-step bevel:
  //     outer 1px white (COLOR_BTNHIGHLIGHT) + 1px black (COLOR_3DDKSHADOW)
  //     inner 1px #DFDFDF (COLOR_3DLIGHT) + 1px #808080 (COLOR_BTNSHADOW)
  // • Sharp 0-radius corners (no anti-aliasing in 16-color VGA era)
  // • MS Sans Serif 8pt
  // • Refs: Win95 UI Guidelines, Win32 system color constants
  {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",
      borderRadius: 0,
      background: "#c0c0c0",
      border: "0",
      boxShadow:
        "inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf",
      color: "#000",
      fontFamily:
        "'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, Geneva, sans-serif",
      fontSize: "11px",
      padding: "4px 14px",
      cursor: "default",
    },
  },

  // Stage 6 — Macintosh System 1 / 6 (1984-1991)
  // • White fill, 1px solid black border (1-bit B&W only — 9" 512×342)
  // • Rounded corners ~5px (Susan Kare's signature gentle radius)
  // • Pixel drop shadow: 2px right, 2px down, no blur, solid black
  // • Chicago 12pt (Susan Kare bitmap font); Silkscreen used as web revival
  // • Refs: "Macintosh User Interface Guidelines" (Apple, 1985); Susan Kare design archive
  {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",
      borderRadius: "5px",
      background: "#ffffff",
      border: "1px solid #000",
      boxShadow: "2px 2px 0 #000",
      color: "#000",
      fontFamily:
        "'Silkscreen', 'Chicago', 'ChicagoFLF', 'Charcoal', monospace",
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "0.5px",
      padding: "5px 16px",
      cursor: "default",
      WebkitFontSmoothing: "none",
      MozOsxFontSmoothing: "grayscale",
      textRendering: "geometricPrecision",
      imageRendering: "pixelated",
    },
  },
]

export function Button({
  onClick,
  children,
  disabled,
  ...props
}: ButtonBaseProps) {
  const [stage, setStage] = React.useState(0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    setStage((s) => (s + 1) % (STAGES.length + 1))
  }

  if (stage === 0) {
    return (
      <ButtonBase onClick={handleClick} disabled={disabled} {...props}>
        {children}
      </ButtonBase>
    )
  }

  const {
    variant: _variant,
    size: _size,
    asChild: _asChild,
    className: _className,
    ...rest
  } = props
  const stageStyle = STAGES[stage - 1]

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="[&_svg]:size-4 [&_svg]:shrink-0"
      style={stageStyle.style}
      {...rest}
    >
      {children}
    </button>
  )
}

export { buttonVariants }
