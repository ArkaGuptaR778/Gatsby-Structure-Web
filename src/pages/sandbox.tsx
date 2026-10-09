import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import LeadPage from "../components/forms/LeadPage"

const LEDE = "Explore our API-first platform in a safe, fully-featured sandbox. Test real-time flows, tokenization, and ISO 20022 messaging before you go live."

/** Access the Sandbox (/sandbox/). The form section is #docs, the target of the footer "Docs" links. */
const SandboxPage: React.FC = () => (
  <Layout>
    <LeadPage title="Access the Sandbox" eyebrow="For developers" headingHtml="Access the <em>Sandbox</em>" lede={LEDE} formName="sandbox-access" button="Request sandbox access" sectionId="docs"
      bullets={["Sandbox credentials and API keys for your team", "API reference, Postman collections and sample payloads", "ISO 20022 and real-time flow test scenarios", "Developer support during your evaluation"]} />
  </Layout>
)
export default SandboxPage

export const Head: HeadFC = () => <Seo title="Access the Sandbox" description={LEDE} path="/sandbox/" />
