import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Coin from "../components/ui/Coin"
import { Hero, Trusted, Years, ImpactStats, WhoWeServe, WhatWeBuild, WhyRS, HowWeWork, InsightsCta } from "../components/sections/home/HomeSections"
import type { HomeData } from "../lib/content/home"

type Ctx = { data: HomeData }

/** Home page (/). All wording comes from content/home.md (read in gatsby-node.ts). */
const HomePage: React.FC<PageProps<object, Ctx>> = ({ pageContext: { data } }) => (
  <Layout active="home">
    <div className="home-top">
      <Coin className="coin coin--a" uid={1} />
      <Coin className="coin coin--b" uid={2} />
      <Hero d={data} />
      <Trusted d={data} />
      <Years d={data} />
      <ImpactStats d={data} />
      <WhoWeServe d={data} />
    </div>
    <WhatWeBuild d={data} />
    <WhyRS d={data} />
    <HowWeWork d={data} />
    <InsightsCta d={data} />
  </Layout>
)
export default HomePage

export const Head: HeadFC<object, Ctx> = ({ pageContext: { data } }) => (
  <Seo title={data.title} description={data.description} path="/" ogImage="assets/img/globe.webp" />
)
