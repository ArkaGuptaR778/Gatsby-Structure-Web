import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import LeadPage from "../components/forms/LeadPage"

const LEDE = "See how RS Software’s platforms orchestrate real-time payments, fraud decisioning, and reconciliation on a single stack. Our team will tailor a walkthrough to your organization."

/** Request a Demo (/request-demo/). */
const RequestDemoPage: React.FC = () => (
  <Layout>
    <LeadPage title="Request a Demo" eyebrow="See it live" headingHtml="Request a <em>Demo</em>" lede={LEDE} formName="demo-request" button="Request demo"
      bullets={["A 30–45 minute session tailored to your rails and use cases", "Live walkthrough of the platform, not slides", "Architecture and integration Q&amp;A with a solutions engineer", "A follow-up summary with next steps and indicative timelines"]} />
  </Layout>
)
export default RequestDemoPage

export const Head: HeadFC = () => <Seo title="Request a Demo" description={LEDE} path="/request-demo/" />
