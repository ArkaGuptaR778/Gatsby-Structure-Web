import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Coin from "../components/ui/Coin"

/** Page not found. Gatsby writes it to /404.html, which GitHub Pages serves for any unknown address (noindex). */
const NotFoundPage: React.FC = () => (
  <Layout>
    <section className="page-hero container" style={{ paddingBlock: "clamp(60px,10vw,120px)" }}><Coin className="rs-coin--hero-l" uid={1} /><Coin className="rs-coin--hero-r" uid={2} /><h1 className="giant">404</h1><p className="page-hero__sub">This page has moved or doesn’t exist.</p>
      <p className="page-hero__lede">Try one of these instead.</p><div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "28px" }}><a className="btn btn-gradient" href="/">Go to homepage</a><a className="btn btn-outline" href="/insights/">Browse insights</a><a className="btn btn-outline" href="/contact/">Contact us</a></div></section>
  </Layout>
)
export default NotFoundPage

export const Head: HeadFC = () => (
  <Seo title="Page not found" description="The page you’re looking for doesn’t exist." path="/404.html" noindex />
)
