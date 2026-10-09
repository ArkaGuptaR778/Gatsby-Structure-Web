import * as React from "react"
import { iconHtml } from "./Icon"
import { asset } from "../../lib/site"
import { useMedia } from "./Media"

type Props = { full: string; loop: string[]; poster: string; aria: string; label: string; duration: string; className?: string; style?: React.CSSProperties; mediaId?: string }

/** Site-wide video pattern: a silent loop autoplays in place; clicking opens the full video with sound in the overlay
 *  player (assets/js/main.js). The <video> is written as HTML so `muted`/`autoplay` are in the server-rendered markup.
 *  Paths are relative to /assets/ (video/rs-film.mp4, img/sky.webp). */
const LoopVideo: React.FC<Props> = ({ full, loop, poster, aria, label, duration, className = "film reveal", style, mediaId }) => {
  const sources = loop.map(s => `<source src="${asset(s)}" type="${s.endsWith(".webm") ? "video/webm" : "video/mp4"}">`).join("")
  const inner = `
        <video class="film__loop"${poster ? ` poster="${asset(poster)}"` : ""} autoplay muted loop playsinline preload="metadata" aria-hidden="true" tabindex="-1">${sources}</video>
        <span class="film__cta" aria-hidden="true"><span class="film__play">${iconHtml("play")}</span><span class="film__label">${label} <span>${duration}</span></span></span>
      `
  return (
    <button className={className} type="button" data-film={asset(full)} style={style} aria-haspopup="dialog" aria-label={aria}
      data-media={mediaId} dangerouslySetInnerHTML={{ __html: inner }} />
  )
}

/** A film slot from content/media.md (video=…, poster=…, duration=…). */
export const MediaFilm: React.FC<{ id: string; label: string; className?: string; style?: React.CSSProperties }> = ({ id, label, className, style }) => {
  const m = useMedia(id)
  if (!m.video) return null
  return <LoopVideo full={m.video.full} loop={m.video.loop} poster={m.video.poster} aria={m.alt} label={label} duration={m.video.duration}
    className={className} style={style} mediaId={id} />
}

/** RS Software brand film (home page): content/media.md → home.film */
export const BrandFilm: React.FC = () => <MediaFilm id="home.film" label="Watch the film" />

/** Founder's message (About Us → about.founder, Our Culture → culture.founder) */
export const FounderVideo: React.FC<{ id?: string }> = ({ id = "about.founder" }) => (
  <MediaFilm id={id} label="<em>Watch the message</em>" className="film film--poster reveal" style={{ aspectRatio: "41/30" }} />
)

export default LoopVideo
