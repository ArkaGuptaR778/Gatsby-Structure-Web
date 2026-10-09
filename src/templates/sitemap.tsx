import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import type { SitemapSection } from "../lib/content/sitemap"

type Ctx = { data: SitemapSection[] }

/** All pages (/sitemap/), built from src/lib/content/sitemap.ts. */
const SitemapTemplate: React.FC<PageProps<object, Ctx>> = ({ pageContext: { data } }) => (
  <Layout>
    <section className="simple-top"><div className="container"><div className="head" style={{ margin: 0 }}><span className="eyebrow">Sitemap</span><h1 className="title">All <em>pages</em></h1><div className="bar"></div></div></div></section>
    <section className="section"><div className="container"><div className="sitemap-cols">{data.map(s => (
      <div key={s.name}><h2>{s.name}</h2><ul>{s.links.map(([u, t], i) => u
        ? <li key={i}><a href={u}>{t}</a></li>
        : <li key={i} className="mt-16"><span className="eyebrow">Leadership</span></li>)}</ul></div>
    ))}</div></div></section>
  </Layout>
)
export default SitemapTemplate

export const Head: HeadFC = () => <Seo title="Sitemap" description="All pages on the RS Software website." path="/sitemap/" />
