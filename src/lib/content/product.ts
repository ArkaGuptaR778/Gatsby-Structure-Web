/* Product pages: content/products/<page>/shared.md + <region>.md → the data the product template renders.
   Build time only (used by gatsby-node.ts). Ported from gen/p_products.py; the wording lives in the Markdown files.

   shared.md      everything every region sees: page title, hero, dashboard, live demo, participants, closing, know-more
   <region>.md    intro, metrics and the Why section per region. global.md is required: it is what search engines,
                  no-JS visitors and regions without their own file see. The header region picker
                  (static/assets/js/main.js → applyRegion) shows the matching version. */
import * as fs from "fs"
import * as path from "path"
import * as md from "../md"

/** Design values only (accent colour, hero tint, logo). Every word lives in content/products/<slug>/. */
export const PRODUCT_PAGES = [
  { key: "billedge", slug: "bill-edge", color: "#EA6C00", tint: "#f4b774", logo: { src: "logo-billedge.webp", alt: "RS Bill@Edge™", width: 411, height: 64 }, srName: "RS Bill@Edge™" },
  { key: "payabbhi", slug: "payabbhi", color: "#A8397F", tint: "#ecc0e2", logo: { src: "logo-payabbhi.webp", alt: "", width: 275, height: 60 }, srName: "Payabbhi®" },
  { key: "digitaledge", slug: "digitaledge", color: "#0F766E", tint: "#b5e9e0", logo: { src: "logo-digitaledge.webp", alt: "RS DigitalEdge™", width: 440, height: 64 }, srName: "RS DigitalEdge™" },
  { key: "intelliedge", slug: "intelliedge", color: "#6D28D9", tint: "#e2d4fb", logo: { src: "logo-intelliedge.webp", alt: "RS IntelliEdge™", width: 420, height: 64 }, srName: "RS IntelliEdge™" },
] as const
export type ProductPage = (typeof PRODUCT_PAGES)[number]

export const REGION_ORDER = ["global", "india", "canada", "usa", "nordic"]

/** Strings ending in "Html" are small HTML fragments rendered from Markdown (bold, accent phrases, links). */
export type Metric = { value: string; labelHtml: string; descHtml: string }
export type Cap = { titleHtml: string; descHtml: string }
/** One audience tab. whyTitleHtml / whyParasHtml are the optional second heading and text (## tab-<key>-why). */
export type Tab = { key: string; label: string; titleHtml: string; parasHtml: string[]; whyTitleHtml: string; whyParasHtml: string[]; metrics: Metric[]; metricsPlaceholder: string; caps: Cap[] }
export type RegionContent = {
  region: string
  introTitleHtml: string; introHtml: string
  metrics: Metric[]; metricsPlaceholder: string
  whyEyebrowHtml: string; whyTitleHtml: string; whyHtml: string
  capsLabel: string; caps: Cap[]; closingHtml: string
  tabs: Tab[]
}
export type SharedContent = ReturnType<typeof sharedContent>
export type ProductData = { page: ProductPage; shared: SharedContent; regions: RegionContent[] }

/** Markdown inline → HTML, with *one phrase* rendered in the page's accent style. */
const accent = (text: string, cls = "accent") => md.inline(text).replace(/<em>/g, `<span class="${cls}">`).replace(/<\/em>/g, "</span>")
const paragraphs = (body: string) => md.blocks(body).filter(b => b[0] === "p").map(b => b[1] as string)
const sec = (S: Record<string, md.Section>, k: string): md.Section => S[k] ?? { settings: {}, body: "" }
/** '- **value** — label — optional description' → metrics */
const metrics = (s: md.Section): Metric[] => md.items(s.body).map(([t, l]) => {
  const i = l.indexOf(" — ")
  return { value: md.unescapeHtml(t), labelHtml: i < 0 ? l : l.slice(0, i), descHtml: i < 0 ? "" : l.slice(i + 3) }
})
const caps = (s: md.Section): Cap[] => md.items(s.body).map(([t, d]) => ({ titleHtml: t, descHtml: d }))

export const sharedContent = (p: ProductPage) => {
  const [meta, text] = md.frontMatter(md.read(`products/${p.slug}/shared.md`))
  const S = md.sections(text)
  const hero = sec(S, "hero").settings, dash = sec(S, "dashboard"), live = sec(S, "live-demo"), part = sec(S, "participants"), close = sec(S, "closing"), know = sec(S, "know-more").settings
  const sim: [string, string][] = []
  for (const line of sec(S, "simulation").body.split(/\r?\n/)) {
    if (line.startsWith("- ") && line.includes(": ")) {
      const i = line.indexOf(": ")
      sim.push([line.slice(2, i).trim(), line.slice(i + 2)])
    }
  }
  return {
    name: meta.name || "", title: meta.title || "", description: meta.description || "",
    hero: { eyebrow: hero.eyebrow || "", taglineHtml: accent(hero.tagline || ""), pillHtml: accent(hero.pill || ""), demo: hero.demo_button || "Request Demo", sandbox: hero.sandbox_button || "Access Sandbox" },
    dash: {
      placeholder: dash.settings.placeholder || "", titleHtml: md.inline(dash.settings.title || ""), monthHtml: md.inline(dash.settings.month || ""), chartHtml: md.inline(dash.settings.chart || ""),
      kpis: md.items(dash.body).map(([t, l]) => { const i = l.indexOf(" — "); return { valueHtml: t, labelHtml: i < 0 ? l : l.slice(0, i), deltaHtml: i < 0 ? "" : l.slice(i + 3) } }),
    },
    live: { kicker: live.settings.kicker || "", titleHtml: accent(live.settings.title || ""), link: live.settings.link || "", pointsHtml: md.blocks(live.body).filter(b => b[0] === "ul").flatMap(b => (b[1] as string[]).map(md.inline)) },
    sim,
    stakeKicker: part.settings.kicker || "",
    stake: md.items(part.body).map(([t, d, o]) => ({ title: md.unescapeHtml(t), desc: md.unescapeHtml(d), color: o.color || "#0075b7", from: o.from || "#f0f7ff", to: o.to || "#e8f4fd" })),
    closeTitleHtml: accent(close.settings.title || ""), closeHtml: paragraphs(close.body).map(md.inline),
    know: { titleHtml: md.inline(know.title || ""), textHtml: md.inline(know.text || ""), button: know.button || "" },
  }
}

export const regionalContent = (p: ProductPage): RegionContent[] => {
  const dir = path.join(md.contentDir(), "products", p.slug)
  const out: RegionContent[] = []
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.endsWith(".md") || f === "shared.md") continue
    const [meta, text] = md.frontMatter(md.read(`products/${p.slug}/${f}`))
    const S = md.sections(text)
    const why = sec(S, "why").settings
    const tabs = (why.tabs || "").split(",").map(t => t.trim()).filter(Boolean)
    out.push({
      region: meta.region || f.slice(0, -3),
      introTitleHtml: accent(sec(S, "intro").settings.title || "", "t"), introHtml: md.toHtml(sec(S, "intro").body),
      metrics: metrics(sec(S, "metrics")), metricsPlaceholder: sec(S, "metrics").settings.placeholder || "",
      whyEyebrowHtml: md.inline(why.eyebrow || ""), whyTitleHtml: why.title ? accent(why.title) : "", whyHtml: md.toHtml(sec(S, "why").body),
      capsLabel: sec(S, "capabilities").settings.label || "", caps: caps(sec(S, "capabilities")), closingHtml: sec(S, "closing").body ? md.toHtml(sec(S, "closing").body) : "",
      tabs: tabs.map(t => {
        const ts = sec(S, `tab-${t}`)
        return {
          key: t, label: ts.settings.label || t.charAt(0).toUpperCase() + t.slice(1), titleHtml: accent(ts.settings.title || ""),
          parasHtml: paragraphs(ts.body).map(md.inline),
          whyTitleHtml: accent(sec(S, `tab-${t}-why`).settings.title || ""), whyParasHtml: paragraphs(sec(S, `tab-${t}-why`).body).map(md.inline),
          metrics: metrics(sec(S, `tab-${t}-metrics`)),
          metricsPlaceholder: sec(S, `tab-${t}-metrics`).settings.placeholder || "", caps: caps(sec(S, `tab-${t}-capabilities`)),
        }
      }),
    })
  }
  if (!out.some(r => r.region === "global")) throw new Error(`${dir}: global.md is required`)
  const rank = (r: string) => (REGION_ORDER.includes(r) ? REGION_ORDER.indexOf(r) : 99)
  return out.sort((a, b) => rank(a.region) - rank(b.region))
}

export const loadProduct = (p: ProductPage): ProductData => ({ page: p, shared: sharedContent(p), regions: regionalContent(p) })
