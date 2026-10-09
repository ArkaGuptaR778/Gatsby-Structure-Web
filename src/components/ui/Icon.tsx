import * as React from "react"
import { ICON_PATHS, type IconName } from "../../lib/icons"

/** Stroke icon on the 24×24 grid (design system §1 Iconography). Decorative: aria-hidden. */
export const iconHtml = (name: IconName, cls = ""): string =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`

const Icon: React.FC<{ name: IconName; className?: string }> = ({ name, className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] }} />
)
export default Icon
