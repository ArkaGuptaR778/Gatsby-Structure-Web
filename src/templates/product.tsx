import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import { ProductHero, Intro, LiveDemo, Metrics, Why, TabbedWhy, Closing, KnowMore } from "../components/sections/product/ProductSections"
import type { ProductData } from "../lib/content/product"

type Ctx = { data: ProductData }

/** Product page (/products/<slug>/). Wording from content/products/<slug>/ (shared.md + one file per region). */
const ProductTemplate: React.FC<PageProps<object, Ctx>> = ({ pageContext: { data } }) => {
  const tabbed = data.regions.some(r => r.region === "global" && r.tabs.length > 0)
  return (
    <Layout active="products">
      <div className="pp" style={{ "--c": data.page.color } as React.CSSProperties}>
        <ProductHero d={data} />
        <Intro d={data} />
        <LiveDemo d={data} />
        {!tabbed && <Metrics d={data} />}
        {tabbed ? <TabbedWhy d={data} /> : <Why d={data} />}
        <Closing d={data} />
        <KnowMore d={data} />
      </div>
    </Layout>
  )
}
export default ProductTemplate

export const Head: HeadFC<object, Ctx> = ({ pageContext: { data } }) => (
  <Seo title={data.shared.title} description={data.shared.description} path={`/products/${data.page.slug}/`} />
)
