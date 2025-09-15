import * as React from "react"
import { SVGProps } from "react"

const GeminiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="M232 128a104 104 0 1 1-208 0a104 104 0 0 1 208 0"
    />
  </svg>
)

export default GeminiIcon
