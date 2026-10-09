import * as React from "react"
import Icon from "../ui/Icon"
import { Field, Select, Hidden, Consent, Success } from "./Fields"
import { html } from "../../lib/html"

type Props = { title: string; eyebrow: string; headingHtml: string; lede: string; formName: string; button: string; bullets: string[]; sectionId?: string }

const PRODUCTS: [string, string][] = [["billedge", "RS Bill@Edge™"], ["payabbhi", "Payabbhi®"], ["digitaledge", "RS DigitalEdge™"], ["intelliedge", "RS IntelliEdge™"], ["multiple", "Several / not sure"]]
const ORG_TYPES: [string, string][] = [["central-bank", "Central bank / scheme"], ["bank", "Bank / PSP"], ["fintech", "Fintech"], ["biller", "Biller / merchant"], ["other", "Other"]]

/** Request a Demo / Access the Sandbox: heading, lead form and "What to expect" (ported from lead_page() in gen/p_misc.py).
 *  ?product= preselects the product (assets/js/main.js). */
const LeadPage: React.FC<Props> = ({ title, eyebrow, headingHtml, lede, formName, button, bullets, sectionId }) => {
  const fid = `form-${formName}`
  return (
    <>
      <section className="simple-top"><div className="container"><div className="head" style={{ margin: 0 }}><span className="eyebrow">{eyebrow}</span><h1 className="title" dangerouslySetInnerHTML={html(headingHtml)} /><div className="bar"></div><p className="lede mt-24">{lede}</p></div></div></section>
      <section className="section" id={sectionId} style={sectionId ? { scrollMarginTop: "90px" } : undefined}><div className="container"><div className="contact-grid">
        <div><form className="form js-form" id={fid} name={formName} method="POST" data-success={`${fid}-ok`} data-title={title}>
          <Hidden name={formName} />
          <div className="form__row"><Field label="Full Name" name="name" required autoComplete="name" /><Field label="Work Email" name="email" type="email" required autoComplete="email" /></div>
          <div className="form__row"><Field label="Company" name="company" required autoComplete="organization" /><Field label="Job Title" name="position" autoComplete="organization-title" /></div>
          <div className="form__row"><Select label="Product" name="product" options={PRODUCTS} required /><Select label="Organisation type" name="orgtype" options={ORG_TYPES} /></div>
          <Field label="What would you like to achieve?" name="message" type="textarea" />
          <Consent />
          <div className="form__status" role="alert"></div>
          <div><button className="btn btn-gradient" type="submit">{button}</button></div>
        </form>
          <Success id={`${fid}-ok`} title="Request received" message="Thank you — our team will contact you within one business day to confirm next steps." formId={fid} again="Submit another request" /></div>
        <aside><div className="card" style={{ background: "var(--g-success)", borderColor: "#d1fae5" }}><h2 style={{ fontFamily: "var(--rs-font-ui)", fontSize: "19px", color: "var(--rs-navy-deep)" }}>What to expect</h2>
          <ul className="benefits">{bullets.map(b => <li key={b}><Icon name="check-circle" /><span dangerouslySetInnerHTML={html(b)} /></li>)}</ul></div>
          <p className="mt-24" style={{ fontSize: "14px", color: "var(--rs-text-muted)" }}>Prefer email? Write to <a data-region="email" href="mailto:india@rssoftware.com">india@rssoftware.com</a>.</p></aside>
      </div></div></section>
    </>
  )
}
export default LeadPage
