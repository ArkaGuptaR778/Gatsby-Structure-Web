/* The human-readable sitemap (/sitemap/): every page, grouped like the site's sections. Built at build time from the
   same data that creates the pages, so a new person, story, insight or role appears automatically. Ported from
   sitemap_and_404() in gen/p_misc.py. */
import { PRODUCT_PAGES, sharedContent } from "./product"
import { loadTeam, profileOrder } from "./team"
import { NEWS } from "./news"
import { INSIGHTS } from "./insights"
import { JOBS } from "./careers"

/** [url, title] — a title of "" with url "" is the "Leadership" label inside About Us */
export type SitemapLink = [string, string]
export type SitemapSection = { name: string; links: SitemapLink[] }

const unamp = (s: string) => s.replace(/&amp;/g, "&")

export const loadSitemap = (): SitemapSection[] => [
  { name: "About Us", links: [["/about/", "About Us"], ["/our-culture/", "Our Culture"], ["", ""],
    ...profileOrder(loadTeam()).map((p): SitemapLink => [`/people/${p.slug}/`, `${p.name} — ${p.role}`])] },
  { name: "Products", links: PRODUCT_PAGES.map((p): SitemapLink => [`/products/${p.slug}/`, sharedContent(p).title]) },
  { name: "News", links: [["/news/", "News"], ...NEWS.map((n): SitemapLink => [`/news/${n.slug}/`, unamp(n.title)])] },
  { name: "Investor Relations", links: [["/investor/", "Investor Relations"]] },
  { name: "Insights", links: [["/insights/", "RS Insights"], ...INSIGHTS.map((i): SitemapLink => [`/insights/${i.slug}/`, i.title])] },
  { name: "Careers", links: [["/careers/", "Careers"], ...JOBS.map((j): SitemapLink => [`/careers/${j.slug}/`, j.title]), ["/careers/apply/", "Apply"]] },
  { name: "Contact", links: [["/contact/", "Contact Us"], ["/request-demo/", "Request a Demo"], ["/sandbox/", "Access the Sandbox"]] },
  { name: "Legal", links: [["/legal/#terms", "Terms of use"], ["/legal/#privacy", "Privacy policy"]] },
]
