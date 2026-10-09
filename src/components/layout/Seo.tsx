import * as React from "react"
import { SITE_URL, asset } from "../../lib/site"

type Props = { title: string; description: string; path: string; ogImage?: string; noindex?: boolean; children?: React.ReactNode }

/** <head> tags for Gatsby's Head API: title ("… | RS Software" unless it already starts with "RS Software"),
 *  description, canonical, Open Graph / Twitter, theme colour and icons. */
/* Default share picture: content/media.md → site.share-image (injected at build time by gatsby-node.ts) */
declare const __RS_SHARE_IMAGE__: string | undefined
const SHARE_IMAGE = typeof __RS_SHARE_IMAGE__ === "string" ? __RS_SHARE_IMAGE__ : "assets/img/about-hero.webp"

const Seo: React.FC<Props> = ({ title, description, path, ogImage = SHARE_IMAGE, noindex = false, children }) => {
  const full = title.startsWith("RS Software") ? title : `${title} | RS Software`
  const canon = SITE_URL + path
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={canon} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RS Software" />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canon} />
      <meta property="og:image" content={`${SITE_URL}/${ogImage.replace(/^\//, "")}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#0075b7" />
      <link rel="icon" href={asset("img/favicon-32.png")} type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" href={asset("img/favicon-180.png")} />
      {children}
    </>
  )
}
export default Seo
