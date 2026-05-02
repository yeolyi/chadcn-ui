import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

// Project-wide rule: prefer lucide-react icons. The chad logo here is the
// only exception — it's our brand mark and isn't in lucide.
export const Icons = {
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line x1="48" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
      <line x1="64" y1="40" x2="216" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
    </svg>
  ),
}
