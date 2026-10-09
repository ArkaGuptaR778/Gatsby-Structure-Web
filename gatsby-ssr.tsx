import * as React from "react"
import type { GatsbySSR } from "gatsby"
import { MediaContext } from "./src/components/ui/Media"
import type { MediaMap } from "./src/lib/content/media"

/** Document-level markup shared by every page: language, the `no-js` hook used by the reveal animation,
 *  the body base path the site scripts read, and the Google Fonts the design system uses. */
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHtmlAttributes, setBodyAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en", className: "no-js" })
  setBodyAttributes({ "data-base": "/" } as React.HTMLAttributes<HTMLBodyElement>)
  setHeadComponents([
    /* Same start state as the static site: content marked .reveal fades in once assets/js/main.js runs. */
    <script key="nojs" dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />,
    <link key="pc1" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="pc2" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link key="fonts" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Radio+Canada+Big:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Source+Serif+4:wght@400;600&family=Outfit:wght@400;500;700&family=Arimo:wght@400;600;700&family=Noto+Sans:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap" />,
  ])
}

/** The media list (content/media.md, passed in every page's context) for useMedia(). */
export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element, props }) => (
  <MediaContext.Provider value={((props.pageContext as { media?: MediaMap }) || {}).media || {}}>{element}</MediaContext.Provider>
)
