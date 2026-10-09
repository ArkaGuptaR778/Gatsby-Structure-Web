import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Coin from "../components/ui/Coin"
import { NewsCard } from "../components/sections/news/NewsCard"
import { NEWS } from "../lib/content/news"

/** News listing (/news/). Stories live in src/lib/content/news.ts; each has a page at /news/<slug>/ (src/templates/news.tsx). */
const NewsPage: React.FC = () => (
  <Layout active="news">
    <section className="page-hero container"><Coin className="rs-coin--hero-r" uid={1} />
      <h1 className="giant">News</h1>
      <p className="page-hero__sub">RS Software in the news</p>
      <p className="page-hero__lede">Press releases and media coverage of RS Software — partnerships, interviews and company milestones.</p>
    </section>
    <section className="section-compact" style={{ paddingBottom: "var(--sp-normal)" }}>
      <div className="container container-narrow"><div className="grid grid-3">{NEWS.map(n => <NewsCard key={n.slug} n={n} />)}</div>
        <div className="cta-band cta-band--navy mt-48 reveal"><div><h2>Media enquiries</h2><p>For press kits, interviews and company information, contact our communications team.</p></div><div className="actions"><a className="btn-mint btn" href="/contact/?topic=general#message">Contact press team</a></div></div>
      </div>
    </section>
  </Layout>
)
export default NewsPage

export const Head: HeadFC = () => (
  <Seo title="News" description="Press releases and media coverage of RS Software — partnerships, interviews and company milestones." path="/news/" />
)
