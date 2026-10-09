import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Icon from "../components/ui/Icon"
import { InsightCard, Dropdown } from "../components/sections/insights/InsightCard"
import { INSIGHTS, TYPES, PNAME } from "../lib/content/insights"

/** RS Insights listing (/insights/) with keyword, type and product filters (assets/js/main.js; ?type=blog preselects).
 *  Items live in src/lib/content/insights.ts; each has a page at /insights/<slug>/ (src/templates/insight.tsx).
 *  RS-PLACEHOLDER: read/view/download counts are samples; 11 of 12 articles have no full text yet. Owner: marketing. */
const InsightsPage: React.FC = () => (
  <Layout active="insights">
    <div className="insights-top">
      <section className="page-hero container" style={{ paddingBottom: "10px" }}><h1 className="giant giant--light">RS Insights</h1></section>
      <section className="container" aria-labelledby="all-h">
        <h2 id="all-h" style={{ fontFamily: "var(--rs-font-ui)", fontSize: "22px", color: "#0b1f3a" }}>All Insight posts</h2>
        <div className="filters" role="search" aria-label="Filter insights">
          <div className="search"><Icon name="search" /><label className="sr-only" htmlFor="f-q">Filter by keyword</label><input id="f-q" type="text" placeholder="Filter by keyword..." autoComplete="off" /><button type="button" className="search__clear" id="f-q-clear" aria-label="Clear keyword" hidden><Icon name="x" /></button></div>
          <Dropdown id="f-type" label="Content type" allLabel="All content types" options={TYPES} />
          <Dropdown id="f-product" label="Product" allLabel="All products" options={Object.fromEntries(Object.entries(PNAME).filter(([k]) => k))} />
          <button type="button" className="filters__clear" id="f-clear" hidden><Icon name="x" /> Clear</button>
        </div>
        <p className="results-count" id="f-count" aria-live="polite">{INSIGHTS.length} results</p>
      </section>
    </div>
    <section className="section-compact" style={{ paddingTop: "12px" }}>
      <div className="container">
        <ul className="grid grid-3" id="insight-list" style={{ listStyle: "none" }} data-placeholder="insight-metrics">{INSIGHTS.map(it => <InsightCard key={it.slug} it={it} />)}</ul>
        <div className="empty" id="f-empty"><p>No insights match those filters.</p><button className="btn btn-outline mt-16" type="button" id="f-reset">Clear filters</button></div>
        <div className="cta-band mt-48 reveal"><div><h2>Ready to integrate?</h2><p>Documentation, API reference, and sandbox access to start building with RS DigitalEdge today.</p></div>
          <div className="actions"><a className="btn btn-pill-ghost" href="/sandbox/">Sandbox</a><a className="btn btn-mint" href="/sandbox/#docs">Read the docs →</a></div></div>
      </div>
    </section>
  </Layout>
)
export default InsightsPage

export const Head: HeadFC = () => (
  <Seo title="RS Insights" description="Case studies, whitepapers, videos and perspectives from RS Software on real-time payments, fraud, ISO 20022 and payment modernisation." path="/insights/" />
)
