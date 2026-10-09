import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import JobForm from "../components/sections/careers/JobForm"
import { BENEFITS, type Job } from "../lib/content/careers"

type Ctx = { slug: string; job: Job }

/** Job description + application form (/careers/<slug>/), one per entry in JOBS (src/lib/content/careers.ts). */
const JobTemplate: React.FC<PageProps<object, Ctx>> = ({ pageContext: { job: j } }) => (
  <Layout active="careers">
    <div className="jd-page">
      <p className="jd-back"><a href="/careers/#open-roles">← Back to Careers</a></p>
      <article className="jd-card">
        <header className="jd-head"><h1>{j.title}</h1><p className="jd-meta">{`${j.type} `}<span aria-hidden="true">·</span>{` ${j.loc}`}</p>
          <p className="jd-lead">{j.short}</p></header>
        <div className="jd-body">
          <h2>Company description</h2><p>RS Software is a payments-only software company. For three decades we have designed, built and run mission-critical payment ecosystems — from national rails like UPI and BBPS to AI-native fraud and risk platforms — for central banks, schemes, banks, billers and fintechs worldwide.</p>
          <h2>About the role</h2><p>{j.role}</p>
          <h2>Requirements</h2><ul>{j.reqs.map(r => <li key={r}>{r}</li>)}</ul>
          <h2>Company benefits</h2><ul>{BENEFITS.map(b => <li key={b}>{b}</li>)}</ul>
        </div>
        <h2 className="jd-cta">Ready to help build the<br />future of Payment intelligence?</h2>
        <JobForm fid="form-apply" role={j.title} loc={j.loc} />
      </article>
    </div>
  </Layout>
)
export default JobTemplate

export const Head: HeadFC<object, Ctx> = ({ pageContext: { job: j } }) => (
  <Seo title={`${j.title} — Careers`} description={j.short} path={`/careers/${j.slug}/`} />
)
