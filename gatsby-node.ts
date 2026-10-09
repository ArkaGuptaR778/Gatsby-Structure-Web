import * as fs from "fs"
import * as path from "path"
import type { GatsbyNode } from "gatsby"
import { loadHome } from "./src/lib/content/home"
import { PRODUCT_PAGES, loadProduct } from "./src/lib/content/product"
import { loadAbout } from "./src/lib/content/about"
import { loadPeoplePages } from "./src/lib/content/team"
import { NEWS, moreNews } from "./src/lib/content/news"
import { INSIGHTS, relatedInsights } from "./src/lib/content/insights"
import { JOBS } from "./src/lib/content/careers"
import { loadSitemap } from "./src/lib/content/sitemap"
import { REDIRECTS, redirectPage } from "./src/lib/redirects"
import { SITE_URL } from "./src/lib/site"
import { loadMedia } from "./src/lib/content/media"

/* Pages built from content. Fixed pages (Our Culture, News and Insights listings, Investor Relations, Careers, apply,
   Contact, Request demo, Sandbox, Legal, 404) are in src/pages/. */
export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  /* Every page also gets the media list (content/media.md), read by useMedia() in src/components/ui/Media.tsx. */
  const media = loadMedia()
  const createPage: typeof actions.createPage = page => actions.createPage({ ...page, context: { ...page.context, media } })
  const tpl = (name: string) => path.resolve(`src/templates/${name}.tsx`)

  createPage({ path: "/", component: tpl("home"), context: { data: loadHome() } })
  for (const p of PRODUCT_PAGES) {
    createPage({ path: `/products/${p.slug}/`, component: tpl("product"), context: { data: loadProduct(p) } })
  }

  createPage({ path: "/about/", component: tpl("about"), context: { data: loadAbout() } })
  for (const pp of loadPeoplePages()) {
    createPage({ path: `/people/${pp.person.slug}/`, component: tpl("person"), context: { data: pp } })
  }
  for (const n of NEWS) {
    createPage({ path: `/news/${n.slug}/`, component: tpl("news"), context: { slug: n.slug, story: n, more: moreNews(n) } })
  }
  for (const it of INSIGHTS) {
    createPage({ path: `/insights/${it.slug}/`, component: tpl("insight"), context: { slug: it.slug, it, related: relatedInsights(it) } })
  }
  for (const j of JOBS) {
    createPage({ path: `/careers/${j.slug}/`, component: tpl("job"), context: { slug: j.slug, job: j } })
  }
  createPage({ path: "/sitemap/", component: tpl("sitemap"), context: { data: loadSitemap() } })
}

/* Fixed pages in src/pages/ get the media list too. */
export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  if ((page.context as { media?: unknown } | undefined)?.media) return
  actions.deletePage(page)
  actions.createPage({ ...page, context: { ...page.context, media: loadMedia() } })
}

/* Old static-site addresses (/about.html) → clean addresses (/about/): one redirect page per entry in src/lib/redirects.ts. */
/** The default share picture (content/media.md → site.share-image), available to Seo.tsx as __RS_SHARE_IMAGE__. */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, plugins }) => {
  const img = loadMedia()["site.share-image"]?.image || "about-hero.webp"
  actions.setWebpackConfig({ plugins: [plugins.define({ __RS_SHARE_IMAGE__: JSON.stringify(`assets/img/${img}`) })] })
}

export const onPostBuild: GatsbyNode["onPostBuild"] = async () => {
  for (const [from, to] of REDIRECTS) {
    const file = path.join("public", from)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, redirectPage(to, SITE_URL))
  }
  stripNulBytes("public")
}

/** Gatsby's HTML renderer can very occasionally leave a stray NUL byte in a page (seen on /sitemap/, where it would
 *  show as "�"). A NUL is never valid in HTML, so remove any from the built pages. */
const stripNulBytes = (dir: string): void => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) stripNulBytes(f)
    else if (e.name.endsWith(".html")) {
      const buf = fs.readFileSync(f)
      if (buf.includes(0)) fs.writeFileSync(f, Buffer.from(buf.filter(b => b !== 0)))
    }
  }
}
