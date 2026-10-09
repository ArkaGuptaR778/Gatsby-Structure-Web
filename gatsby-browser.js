import "./src/styles/global.css"
import "./src/styles/tokens.css"
import "./src/styles/rs.css"
import * as React from "react"
import { registerForms } from "./src/lib/forms"
import { MediaContext } from "./src/components/ui/Media"

/* The site's interactions (menus, region picker, tabs, steppers, carousels, live demo, forms, Ask AI, globe…) are the
   proven vanilla scripts in static/assets/js. They run once React has rendered the page, so they never fight hydration.
   Links between pages are plain <a> tags (full page loads), so each page starts fresh, as on the static site. */
const SCRIPTS = ["config.js", "main.js", "askai.js"]
const PAGE_SCRIPTS = [["[data-globe]", "globe.js"], ["[data-lib]", "investors-data.js"], ["[data-lib]", "investors.js"]]

export const onInitialClientRender = () => {
  registerForms() // forms submit through the adapter in src/lib/forms
  const list = SCRIPTS.concat(PAGE_SCRIPTS.filter(([sel]) => document.querySelector(sel)).map(([, f]) => f))
  list.forEach(f => {
    if (document.querySelector(`script[data-rs="${f}"]`)) return
    const s = document.createElement("script")
    s.src = `/assets/js/${f}`
    s.async = false // keep order: config → main → askai → page scripts
    s.dataset.rs = f
    document.body.appendChild(s)
  })
}

/* The media list (content/media.md, passed in every page's context) for useMedia(); same as gatsby-ssr.tsx. */
export const wrapPageElement = ({ element, props }) =>
  React.createElement(MediaContext.Provider, { value: (props.pageContext && props.pageContext.media) || {} }, element)
