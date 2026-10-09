/* The media list: content/media.md → one entry per visual slot on the site (build time only).
   Every page gets the whole list in its page context (gatsby-node.ts), and components read their slot with
   useMedia("about.hero") (src/components/ui/Media.tsx). Guide: the comment block at the top of content/media.md. */
import * as fs from "fs"
import * as path from "path"
import * as md from "../md"

export type MediaStatus = "placeholder" | "approve" | "final" | ""
export type MediaEntry = {
  id: string
  /** What the visual shows (alt text / aria label). "" when the slot is decorative. */
  alt: string
  /** An image file under /assets/img/, if the slot uses (or is replaced by) an image */
  image?: string
  /** Several images (Careers accordion panels) */
  images?: string[]
  /** Replacement icons (product participants) */
  icons?: string[]
  /** A video: full film with sound, the silent loop sources, the poster still and the length label */
  video?: { full: string; loop: string[]; poster: string; duration: string }
  status: MediaStatus
}
export type MediaMap = Record<string, MediaEntry>

const staticDir = () => path.resolve(process.cwd(), "static/assets")
const exists = (rel: string) => fs.existsSync(path.join(staticDir(), rel))
const warn = (id: string, msg: string) => console.warn(`  ! content/media.md ${id}: ${msg}`)

export const loadMedia = (): MediaMap => {
  const out: MediaMap = {}
  const [, text] = md.frontMatter(md.read("media.md"))
  for (const sec of Object.values(md.sections(text))) {
    for (const [title, desc, o] of md.items(md.plain(sec.body))) {
      const id = md.unescapeHtml(title).trim()
      const alt = md.unescapeHtml(desc).trim()
      const e: MediaEntry = { id, alt: /^decorative\b/i.test(alt) ? "" : alt, status: (o.status || "") as MediaStatus }
      const list = (v?: string) => (v ? v.split(",").map(x => x.trim()).filter(Boolean) : undefined)
      if (o.image) { e.image = o.image; if (!exists(`img/${o.image}`)) warn(id, `image "${o.image}" not found in static/assets/img/`) }
      e.images = list(o.images)
      /* icons keep their positions: "-" (or an empty place) means "keep the built-in drawing here" */
      e.icons = o.icons ? o.icons.split(",").map(x => x.trim().replace(/^-$/, "")) : undefined
      for (const f of [...(e.images || []), ...(e.icons || []).filter(Boolean)]) if (!exists(`img/${f}`)) warn(id, `image "${f}" not found in static/assets/img/`)
      if (o.video) {
        const name = o.video.replace(/\.mp4$/, "")
        const full = `video/${name}.mp4`
        if (!exists(full)) warn(id, `video "${name}.mp4" not found in static/assets/video/`)
        const loop = [`video/${name}-loop.mp4`, `video/${name}-loop.webm`].filter(exists)
        e.video = { full, loop: loop.length ? loop : [full], poster: o.poster ? `img/${o.poster}` : "", duration: o.duration || "" }
        if (o.poster && !exists(`img/${o.poster}`)) warn(id, `poster "${o.poster}" not found in static/assets/img/`)
      }
      out[id] = e
    }
  }
  return out
}
