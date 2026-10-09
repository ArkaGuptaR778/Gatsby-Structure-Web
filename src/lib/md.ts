/**
 * Tiny, dependency-free Markdown reader for the content/ folder (build time only; uses node:fs).
 * A line-for-line port of gen/md.py from the static site, so every content file keeps its format.
 *
 *   front matter   ---\nkey: value\n---  at the top of a file
 *   sections       ## section-id   (each page's .md file is split on these)
 *   settings       key: value lines at the start of a section or a ### block
 *   blocks         paragraphs, - bullet lists, > quotes, ### headings
 *   inline         **bold**, *italic*, [link text](url)
 *   list options   {icon=link color=#c6f06b} at the end of a bullet
 *   comments       lines starting with "# " are notes for editors (see plain() / records())
 */
import * as fs from "fs"
import * as path from "path"

export const CONTENT = path.resolve(__dirname, "../../content")
/* gatsby-node is compiled into .cache, so __dirname is not reliable there: prefer the project root. */
const contentRoot = (): string => {
  const fromCwd = path.resolve(process.cwd(), "content")
  return fs.existsSync(fromCwd) ? fromCwd : CONTENT
}

export type Settings = Record<string, string>
export type Section = { settings: Settings; body: string }
export type Block = ["p", string] | ["ul", string[]] | ["quote", string] | ["h3", string]
export type Item = [title: string, text: string, opts: Settings]
export type RecordBlock = [heading: string, settings: Settings, bullets: string[], paragraphs: string[]]

/** html.escape(s, quote=False) */
export const esc = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/** html.unescape for the entities esc() and the content use */
export const unescapeHtml = (s: string): string =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&amp;/g, "&")

/** html.escape(s, quote=True) — for attribute values */
export const attr = (s: string): string => esc(s).replace(/"/g, "&quot;").replace(/'/g, "&#x27;")

/** **bold**, *italic*, [text](url). Site-relative links become root-relative clean URLs. */
export const inline = (s: string): string => {
  let out = esc(s)
  out = out.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
  // Python's \w is Unicode-aware; mirror it with \p{L}\p{N}_
  out = out.replace(/(?<![\p{L}\p{N}_*])\*(?!\s)(.+?)(?<!\s)\*(?![\p{L}\p{N}_*])/gu, "<em>$1</em>")
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text: string, url: string) => {
    const ext = url.startsWith("http")
    let href = url
    if (!ext && !/^(#|mailto:|tel:|\/)/.test(url)) href = cleanUrl(url)
    const attrs = ext ? ' target="_blank" rel="noopener"' : ""
    return `<a href="${attr(href)}"${attrs}>${text}</a>`
  })
  return out
}

/** Legacy site paths ("about.html", "products/bill-edge.html#x?y") → clean URLs ("/about/") */
export const cleanUrl = (p: string): string => {
  if (/^(https?:|mailto:|tel:|#)/.test(p)) return p
  const m = p.replace(/^\//, "").match(/^([^?#]*)(.*)$/) as RegExpMatchArray
  let pathPart = m[1]
  const rest = m[2]
  if (pathPart === "" || pathPart === "index.html") return "/" + rest
  pathPart = pathPart.replace(/\.html$/, "")
  if (pathPart.endsWith("/index")) pathPart = pathPart.slice(0, -6)
  return "/" + pathPart.replace(/\/$/, "") + "/" + rest
}

export const frontMatter = (text: string): [Settings, string] => {
  const meta: Settings = {}
  if (text.startsWith("---")) {
    const parts = text.split("---")
    const fm = parts[1]
    const body = parts.slice(2).join("---")
    for (const line of fm.trim().split(/\r?\n/)) {
      if (line.includes(":") && !line.trimStart().startsWith("#")) {
        const i = line.indexOf(":")
        meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
      }
    }
    return [meta, body.trim()]
  }
  return [meta, text.trim()]
}

/** 'Title — text {icon=link color=#abc}' → ['Title — text', {icon:'link', color:'#abc'}] */
export const options = (item: string): [string, Settings] => {
  const m = item.match(/\s*\{([^}]*)\}\s*$/)
  if (!m || m.index === undefined) return [item, {}]
  const opts: Settings = {}
  for (const p of m[1].split(/\s+/)) {
    if (!p.includes("=")) continue
    const i = p.indexOf("=")
    opts[p.slice(0, i)] = p.slice(i + 1)
  }
  return [item.slice(0, m.index), opts]
}

/** Markdown body → blocks: p | ul | quote | h3 */
export const blocks = (body: string): Block[] => {
  const out: Block[] = []
  let buf: string[] = [], lst: string[] = [], quote: string[] = []
  const flush = () => {
    if (buf.length) { out.push(["p", buf.join(" ")]); buf = [] }
    if (lst.length) { out.push(["ul", lst]); lst = [] }
    if (quote.length) { out.push(["quote", quote.join(" ")]); quote = [] }
  }
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) { flush(); continue }
    if (line.startsWith("### ")) { flush(); out.push(["h3", line.slice(4)]); continue }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (buf.length || quote.length) flush()
      lst.push(line.slice(2)); continue
    }
    if (line.startsWith(">")) {
      if (buf.length || lst.length) flush()
      quote.push(line.replace(/^[>\s]+/, "").trim()); continue
    }
    if (lst.length && (raw.startsWith("  ") || raw.startsWith("\t"))) { lst[lst.length - 1] += " " + line; continue }
    if (lst.length || quote.length) flush()
    buf.push(line)
  }
  flush()
  return out
}

export const toHtml = (body: string, pClass = ""): string => {
  const pc = pClass ? ` class="${pClass}"` : ""
  return blocks(body).map(([kind, val]) => {
    if (kind === "p") return `<p${pc}>${inline(val)}</p>`
    if (kind === "h3") return `<h3>${inline(val)}</h3>`
    if (kind === "quote") return `<blockquote>${inline(val)}</blockquote>`
    return "<ul>" + (val as string[]).map(i => `<li>${inline(options(i)[0])}</li>`).join("") + "</ul>"
  }).join("")
}

const SETTING = /^[a-z_]+:\s/

/** Page file → { section_id: { settings, body } } (order kept) */
export const sections = (text: string): Record<string, Section> => {
  const raw: Record<string, string[]> = {}
  let cur: string | null = null
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^##\s+([\w-]+)\s*$/)
    if (m) { cur = m[1]; raw[cur] = []; continue }
    if (cur) raw[cur].push(line)
  }
  const out: Record<string, Section> = {}
  for (const [k, lines] of Object.entries(raw)) {
    const settings: Settings = {}
    while (lines.length && !lines[0].trim()) lines.shift()
    // Settings are the key: value lines at the top (up to the first blank line); "# " editor notes may sit among them.
    while (lines.length && (lines[0].startsWith("# ") || SETTING.test(lines[0]))) {
      const l = lines.shift() as string
      if (!SETTING.test(l)) continue
      const i = l.indexOf(":")
      settings[l.slice(0, i).trim()] = l.slice(i + 1).trim()
    }
    out[k] = { settings, body: lines.join("\n").trim() }
  }
  return out
}

/** Bullet items of a section as [title, text, opts] from '- **Title** — text {opts}' (title and text are inline HTML). */
export const items = (body: string): Item[] => {
  const res: Item[] = []
  for (const [kind, val] of blocks(body)) {
    if (kind !== "ul") continue
    for (const raw of val as string[]) {
      const [it, opts] = options(raw)
      const m = it.match(/^\*\*(.+?)\*\*\s*(?:[—–-]\s*)?(.*)$/)
      const [title, text] = m ? [m[1], m[2]] : [it, ""]
      res.push([inline(title), inline(text), opts])
    }
  }
  return res
}

/** '### Heading' blocks inside a section → [heading, settings, bullets, paragraphs] */
export const records = (body: string): RecordBlock[] => {
  const found: [string, string[]][] = []
  let cur: [string, string[]] | null = null
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("### ")) { cur = [line.slice(4).trim(), []]; found.push(cur); continue }
    if (cur) cur[1].push(line)
  }
  return found.map(([head, lines]) => {
    const settings: Settings = {}
    while (lines.length && !lines[0].trim()) lines.shift()
    while (lines.length && SETTING.test(lines[0])) {
      const l = lines.shift() as string
      const i = l.indexOf(":")
      settings[l.slice(0, i).trim()] = l.slice(i + 1).trim()
    }
    const text = lines.filter(l => !l.startsWith("# ")).join("\n")
    const bl = blocks(text)
    const bullets = bl.filter(b => b[0] === "ul").flatMap(b => b[1] as string[])
    const paras = bl.filter(b => b[0] === "p").map(b => b[1] as string)
    return [head, settings, bullets, paras]
  })
}

/** Section body without editor comment lines ('# …') */
export const plain = (body: string): string => body.split(/\r?\n/).filter(l => !l.startsWith("# ")).join("\n")

export const read = (rel: string): string => fs.readFileSync(path.join(contentRoot(), rel), "utf8")
export const exists = (rel: string): boolean => fs.existsSync(path.join(contentRoot(), rel))
export const contentDir = contentRoot
