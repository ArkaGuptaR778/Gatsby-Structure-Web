/* Home page content: content/home.md → the data the home template renders (build time, used by gatsby-node.ts).
   Ported from gen/p_home.py; the wording lives in the Markdown file, not here. */
import * as fs from "fs"
import * as path from "path"
import * as md from "../md"
import { PRODUCTS, productByKey } from "../site"

export type HomeData = ReturnType<typeof loadHome>

/** Static assets folder (static/assets), used to check which client logo files exist. */
const staticAssets = () => path.resolve(process.cwd(), "static/assets")

export const loadHome = () => {
  const [meta, text] = md.frontMatter(md.read("home.md"))
  const S = md.sections(text)
  const st = (k: string, key: string, def = ""): string => (S[k]?.settings[key] ?? def)
  const acc = (t: string) => md.inline(t).replace(/<em>/g, '<span class="accent">').replace(/<\/em>/g, "</span>")

  // Clients and partners: official logo if its file is in assets/img/logos/, otherwise the name in RS type.
  const clients = md.items(md.plain(S["clients"].body)).map(([t, , o]) => {
    const slug = o.logo || ""
    const ext = ["svg", "png", "webp"].find(x => fs.existsSync(path.join(staticAssets(), "img/logos", `${slug}.${x}`)))
    return { name: md.unescapeHtml(t), logo: ext ? `img/logos/${slug}.${ext}` : "", height: parseInt(o.height || "24", 10), beside: o.beside === "yes" }
  })

  const serve = md.records(S["who-we-serve"].body).map(([h, o, bl]) => ({
    tab: md.inline(h), label: md.inline(o.label || ""), title: md.inline(o.title || ""), text: md.inline(o.text || ""), link: md.inline(o.link || ""),
    url: productByKey(o.product || "")?.url || "/", features: bl.map(md.inline),
  }))
  // Metrics band under the 30 Years section: '- **value** — label — description' (same shape as the product-page metrics)
  const impact = md.items(md.plain(S["impact-stats"]?.body || "")).map(([t, l]) => {
    const i = l.indexOf(" — ")
    return { value: md.unescapeHtml(t), labelHtml: i < 0 ? l : l.slice(0, i), descHtml: i < 0 ? "" : l.slice(i + 3) }
  })

  const roles = md.items(md.plain(S["roles"].body)).map(([t, d]) => ({ label: t, products: d.replace(/ /g, "") }))

  const cards = md.records(S["product-cards"].body).map(([h, o, bl]) => ({ key: h, title: md.inline(o.title || ""), points: bl.map(md.inline) }))

  const steps = md.records(S["how-we-work"].body).map(([h, o, , pa]) => ({ title: md.unescapeHtml(h), color: o.color || "#0075b7", desc: pa.map(md.unescapeHtml).join(" ") }))

  const color = Object.fromEntries(PRODUCTS.map(p => [p.key, p.color]))
  // "Payments in → Outcomes out" cards (plain text; assets/js/main.js renders them). Same JSON shape as the static site.
  const flow = md.records(S["flow"].body).map(([h, o, bl]) => ({
    p: h, c: color[h], k: o.kind || "", t: o.title || "", m: o.meta || "", rk: o.result || "", rv: o.time || "", rl: bl.map(b => md.unescapeHtml(md.inline(b))),
  }))

  return {
    title: meta.title || "", description: meta.description || "",
    hero: {
      badgeTitle: md.inline(st("hero", "badge_title")), badgeText: md.inline(st("hero", "badge_text")), title: md.inline(st("hero", "title")), subtitle: md.inline(st("hero", "subtitle")),
      lede: md.inline(md.plain(S["hero"].body)), emailPlaceholder: st("hero", "email_placeholder"), button: st("hero", "button"),
    },
    clientsLabel: md.inline(st("clients", "label")), clients,
    years: { years: st("thirty-years", "years"), pill: md.inline(st("thirty-years", "pill")), note: md.inline(st("thirty-years", "note")), statement: acc(st("thirty-years", "statement")) },
    impact, impactClosing: md.inline(st("impact-stats", "closing")),
    serveHead: { title: md.inline(st("who-we-serve", "title")), lead: md.inline(st("who-we-serve", "lead")), statement: acc(st("who-we-serve", "statement")) },
    serve,
    build: {
      title: md.inline(st("what-we-build", "title")), lead: md.inline(st("what-we-build", "lead")), statement: acc(st("what-we-build", "statement")),
      hint: md.inline(st("what-we-build", "hint")), rolesLabel: md.inline(st("what-we-build", "roles_label")), more: md.inline(st("what-we-build", "more")),
      parasHtml: md.blocks(md.plain(S["what-we-build"].body)).filter(b => b[0] === "p").map(b => md.inline(b[1] as string)),
    },
    flow: { json: JSON.stringify(flow), inLabel: st("flow", "in_label"), outLabel: st("flow", "out_label"), description: st("flow", "description") },
    roles, cards,
    why: { title: md.inline(st("why-rs", "title")), lead: md.inline(st("why-rs", "lead")), prose: md.toHtml(md.plain(S["why-rs"].body)).replace(/<\/p><p>/g, "</p>\n      <p>") },
    how: { kicker: st("how-we-work", "kicker"), steps },
    insights: { title: md.inline(st("insights-cta", "title")), text: md.inline(md.plain(S["insights-cta"].body)), button: st("insights-cta", "button"), globeLabel: st("insights-cta", "globe_label") },
  }
}
