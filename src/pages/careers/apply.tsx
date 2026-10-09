import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../../components/layout/Layout"
import Seo from "../../components/layout/Seo"
import JobForm from "../../components/sections/careers/JobForm"

/** Open application (/careers/apply/). ?role=… preselects a position (assets/js/main.js). */
const ApplyPage: React.FC = () => (
  <Layout active="careers">
    <div className="jd-page">
      <p className="jd-back"><a href="/careers/#open-roles">← Back to Careers</a></p>
      <article className="jd-card">
        <header className="jd-head"><h1 data-role-title="">Open application</h1><p className="jd-meta">Full-time <span aria-hidden="true">·</span> Kolkata / Global</p>
          <p className="jd-lead">Don’t see your exact role? Submit an open application and tell us where you can make an impact. We’re always looking for people who want to build mission-critical payment systems.</p></header>
        <h2 className="jd-cta">Ready to help build the<br />future of Payment intelligence?</h2>
        <JobForm fid="form-apply" role={null} loc="Kolkata, India" />
      </article>
    </div>
  </Layout>
)
export default ApplyPage

export const Head: HeadFC = () => (
  <Seo title="Apply — Careers" description="Apply for a role at RS Software or submit an open application." path="/careers/apply/" />
)
