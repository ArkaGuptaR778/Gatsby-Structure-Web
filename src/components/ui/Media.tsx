/* Visual slots from content/media.md. Every page receives the media list in its page context; gatsby-ssr.tsx and
   gatsby-browser.js put it in MediaContext, so any component can ask for its slot by name. */
import * as React from "react"
import type { MediaEntry, MediaMap } from "../../lib/content/media"

export const MediaContext = React.createContext<MediaMap>({})

/** The slot, or an empty entry (status "") when content/media.md doesn't list it. */
export const useMedia = (id: string): MediaEntry => {
  const map = React.useContext(MediaContext)
  return map[id] || { id, alt: "", status: "" }
}

/** True when an animation slot has been given a real image or video in content/media.md. */
export const isReplaced = (m: MediaEntry): boolean => Boolean(m.image || m.video)

/** data-media attributes: the slot name and, for placeholders, a marker the QA scripts can find. */
export const mediaAttrs = (m: MediaEntry) => ({ "data-media": m.id, ...(m.status === "placeholder" ? { "data-placeholder": "media" } : {}) })

/** A replacement video shown in place of an animation: silent, looping, poster first. */
export const InlineVideo: React.FC<{ m: MediaEntry; className?: string; style?: React.CSSProperties }> = ({ m, className, style }) => {
  if (!m.video) return null
  const v = m.video
  const sources = v.loop.map(s => `<source src="/assets/${s}" type="${s.endsWith(".webm") ? "video/webm" : "video/mp4"}">`).join("")
  const poster = v.poster ? ` poster="/assets/${v.poster}"` : ""
  return <div className={className} style={style} {...mediaAttrs(m)} role={m.alt ? "img" : undefined} aria-label={m.alt || undefined}
    dangerouslySetInnerHTML={{ __html: `<video autoplay muted loop playsinline preload="metadata"${poster} style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit" aria-hidden="true">${sources}</video>` }} />
}

type ImgProps = { id: string; className?: string; width?: number; height?: number; lazy?: boolean; style?: React.CSSProperties }

/** An image slot from content/media.md (image=…). The width/height are the layout's reserved size, not the file's. */
export const MediaImg: React.FC<ImgProps> = ({ id, className, width, height, lazy = true, style }) => {
  const m = useMedia(id)
  /* video=… on an image slot: a silent looping video in the same frame (same size as the picture it replaces) */
  if (m.video) return <InlineVideo m={m} className={className}
    style={{ ...(width && height ? { aspectRatio: `${width} / ${height}` } : {}), overflow: "hidden", ...style }} />
  if (!m.image) return null
  return <img className={className} src={`/assets/img/${m.image}`} alt={m.alt} width={width} height={height} style={style}
    {...(lazy ? { loading: "lazy" as const } : {})} {...mediaAttrs(m)} />
}

/** An animation slot: renders the built-in animation, or the image / video given in content/media.md instead. */
export const MediaSlot: React.FC<{ id: string; children: React.ReactNode; imgClassName?: string; videoClassName?: string; videoStyle?: React.CSSProperties; imgStyle?: React.CSSProperties }> =
  ({ id, children, imgClassName, videoClassName, videoStyle, imgStyle }) => {
    const m = useMedia(id)
    if (m.video) return <InlineVideo m={m} className={videoClassName} style={videoStyle} />
    if (m.image) return <img className={imgClassName} src={`/assets/img/${m.image}`} alt={m.alt} style={imgStyle} loading="lazy" {...mediaAttrs(m)} />
    return <>{children}</>
  }

/** A banner slot with a built-in fallback picture (news and insight banners): the slot's video or image from
 *  content/media.md, else the fallback file (relative to /assets/img/). Decorative, so alt is empty. */
export const MediaBanner: React.FC<{ id: string; fallback: string; className?: string; width: number; height: number }> = ({ id, fallback, className, width, height }) => {
  const m = useMedia(id)
  if (m.video) return <InlineVideo m={m} className={className} style={{ aspectRatio: `${width} / ${height}`, overflow: "hidden" }} />
  return <img className={className} src={`/assets/img/${m.image || fallback}`} alt={m.alt} width={width} height={height} {...mediaAttrs(m)} />
}

/** The picture a slot uses, for places outside the page body (share images in <Head>, which gets the media list
 *  through its pageContext). Returns "assets/img/<file>", or the fallback when the slot has no image. */
export const slotImage = (media: MediaMap | undefined, id: string, fallback: string): string =>
  `assets/img/${media?.[id]?.image || fallback}`
