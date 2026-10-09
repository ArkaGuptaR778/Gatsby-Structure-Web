import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"

/** Legal & Privacy (/legal/), with #terms, #privacy and #cookies.
 *  RS-PLACEHOLDER: legal text — replace with legal-approved terms, privacy and cookie text. Owner: legal. */
const LegalPage: React.FC = () => (
  <Layout>
    <section className="simple-top"><div className="container container-text"><div className="head" style={{ margin: 0 }}><span className="eyebrow">Legal</span><h1 className="title">Legal &amp; <em>Privacy</em></h1><div className="bar"></div><p className="lede mt-24">Terms of use and privacy information for the RS Software website.</p></div></div></section>
    <section className="section"><div className="container container-text legal" data-placeholder="legal-text">
      <h2 id="terms">Terms of use</h2>
      <p>This website is operated by RS Software (India) Limited. By using the site you agree to use it lawfully and not to interfere with its operation. Content on this site is provided for general information about our company and products and may change without notice. Product names, logos and marks are the property of their respective owners.</p>
      <h2 id="privacy">Privacy policy <small style={{ fontWeight: 400, color: "var(--rs-text-muted)" }}>(Updated 08/2022)</small></h2>
      <p>When you submit a form on this site we collect the details you provide — such as your name, email address, company and message — and use them only to respond to your request, provide the information you asked for and, where you have opted in, send you relevant communications.</p>
      <ul><li>We do not sell your personal data.</li><li>You can ask us to access, correct or delete your data at any time.</li><li>Careers applications are retained only for recruitment purposes.</li></ul>
      <p>For privacy requests, contact <a data-region="email" href="mailto:india@rssoftware.com">india@rssoftware.com</a>.</p>
      <h2 id="cookies">Cookies</h2>
      <p>This site does not use advertising or tracking cookies. It stores your selected region in your browser so the site can show local contact details.</p>
    </div></section>
  </Layout>
)
export default LegalPage

export const Head: HeadFC = () => (
  <Seo title="Legal & Privacy" description="Terms of use and privacy policy for the RS Software website." path="/legal/" />
)
