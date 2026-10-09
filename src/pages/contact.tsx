import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Coin from "../components/ui/Coin"
import { Field, Select, Hidden, Consent, Success, same } from "../components/forms/Fields"

/* Contact Us (/contact/). Ported from gen/p_misc.py contact(). ?topic=, ?product= and ?email= prefill the form
   (assets/js/main.js). The office list is static (not tied to the header region picker). */

const FID = "form-contact"
const INTERESTS: [string, string][] = [["sales", "Sales"], ["demo", "Product demo"], ["partnership", "Partnership"], ["support", "Support"], ["investor", "Investor relations"], ["general", "General enquiry"]]
const PRODUCTS: [string, string][] = [["billedge", "RS Bill@Edge™"], ["payabbhi", "Payabbhi®"], ["digitaledge", "RS DigitalEdge™"], ["intelliedge", "RS IntelliEdge™"], ["multiple", "Several / not sure"]]
const SIZES = ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"]
const ORGS = ["Central bank / scheme", "Bank / PSP", "Fintech", "Biller / merchant", "Other"]
const COUNTRIES = ["India", "United States", "Canada", "United Kingdom", "Nordics", "Europe (other)", "Singapore", "Middle East", "Africa", "Other"]

/** [name, city, address lines, phones: [label, display, tel or null]] */
type Office = [string, string, string[], [string, string, string | null][]]
const OFFICES: [string, Office[]][] = [
  ["North America", [
    ["United States", "Milpitas, California", ["1900 McCarthy Boulevard,", "Suite #101, Milpitas,", "CA 95035"], [["Ph", "408 382 1200", "+14083821200"], ["Fax", "408 382 0083", null]]],
    ["Canada", "Toronto, Ontario", ["181 University Ave,", "Suite 2100, Toronto,", "Ontario M5H 3M7"], []],
  ]],
  ["India", [
    ["Development Center", "Kolkata", ["Martin Burn Business Park,", "16th Floor, Plot 3, Salt Lake Bypass,", "BP Block, Sector V,", "Kolkata 700091, India"], [["Board", "+91 33 6601 8899", "+913366018899"], ["Fax", "+91 33 2367 4469", null]]],
    ["Corporate Office", "Kolkata", ["A-2, FMC Fortuna,", "234/3A, A.J.C. Bose Road,", "Kolkata 700020, India"], [["Board", "+91 33 2287 5746", "+913322875746"], ["", "+91 33 2281 0106", "+913322810106"], ["Fax", "+91 33 2287 6256", null]]],
  ]],
  ["Europe", [
    ["Denmark", "Copenhagen", ["Applebys Pl. 7,", "1411 København"], []],
  ]],
]
const SUBSIDIARIES: [string, string][] = [["Responsive Solutions Inc.", "California, US"], ["Paypermint Pvt. Ltd.", "India"]]

const OfficeCard: React.FC<{ o: Office }> = ({ o: [name, city, addr, phones] }) => (
  <div className="ci-off"><b className="ci-off__name">{name}</b><span className="ci-off__city">{city}</span>
    <address>{addr.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>)}</address>
    {phones.length > 0 && <ul className="ci-off__ph">{phones.map(([k, v, t], i) => <li key={i}><span>{k}</span>{t ? <a href={`tel:${t}`}>{v}</a> : v}</li>)}</ul>}
  </div>
)

const ContactPage: React.FC = () => (
  <Layout active="contact">
    <section className="page-hero container"><Coin className="rs-coin--hero-r" uid={1} /><h1 className="giant">Contact Us</h1>
      <p className="page-hero__sub">Talk to our payments specialists</p>
      <p className="page-hero__lede">Whether you’re modernising national rails, tackling real-time fraud, or launching new payment products, our team can help.</p></section>

    <section className="ci-page" id="message">
      <div className="ci">
        <aside className="ci-card ci-info" id="offices">
          <h2 className="ci-info__h">Global offices</h2>
          <p className="ci-info__lead">Reach the RS Software team nearest to you, or send us a message and we’ll route it to the right people.</p>
          {OFFICES.map(([g, list]) => <div key={g} className="ci-grp"><h3 className="ci-info__k">{g}</h3><div className="ci-grp__list">{list.map(o => <OfficeCard key={o[0]} o={o} />)}</div></div>)}
          <div className="ci-grp"><h3 className="ci-info__k">Subsidiaries</h3><ul className="ci-subs">{SUBSIDIARIES.map(([n, w]) => <li key={n}><b>{n}</b><span>{w}</span></li>)}</ul></div>
          <p className="ci-social" id="socials">Follow RS Software on <a href="https://www.linkedin.com/company/rs-software/" rel="noopener" target="_blank">LinkedIn ↗</a></p>
        </aside>

        <div className="ci-card ci-main">
          <section className="jf" aria-labelledby={`${FID}-h`}>
            <h3 id={`${FID}-h`} className="jf__title">Contact form</h3><p className="jf__sub">Tell us about your project</p>
            <form className="form js-form jf__form" id={FID} name="contact" method="POST" data-success={`${FID}-ok`} data-title="Contact">
              <Hidden name="contact" />
              <div className="form__row"><Field label="Full Name" name="name" required autoComplete="name" placeholder="Enter full name" /><Field label="Work Email" name="email" type="email" required autoComplete="email" placeholder="name@company.com" /></div>
              <div className="form__row"><Field label="Company" name="company" required autoComplete="organization" placeholder="Company name" /><Field label="Job Title" name="position" autoComplete="organization-title" placeholder="e.g. Head of Payments" /></div>
              <div className="form__row"><Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" /><Select label="Country / Region" name="country" first="Select country" options={same(COUNTRIES)} /></div>
              <div className="form__row"><Select label="Enquiry Type" name="interest" first="Select enquiry type" options={INTERESTS} required /><Select label="Product of Interest" name="product" first="Select product" options={PRODUCTS} /></div>
              <div className="form__row"><Select label="Organisation Type" name="orgtype" first="Select organisation type" options={same(ORGS)} /><Select label="Company Size" name="size" first="Select company size" options={same(SIZES)} /></div>
              <Field label="Message" name="message" type="textarea" placeholder="Tell us about your rails, volumes, timelines or the problem you’re solving." />
              <Consent textHtml='I agree that RS Software may process my data as described in the <a href="/legal/#privacy">privacy policy</a>.' />
              <Consent name="marketing" required={false} textHtml="Send me occasional product news and insights from RS Software." />
              <div className="form__status" role="alert"></div>
              <div><button className="jf__submit" type="submit">Send message</button></div>
            </form>
            <Success id={`${FID}-ok`} title="Message received" message="Thank you — a payments specialist will get back to you within one business day." formId={FID} />
          </section>
        </div>
      </div>
    </section>
  </Layout>
)
export default ContactPage

export const Head: HeadFC = () => (
  <Seo title="Contact Us" description="Contact RS Software payments specialists — national rails, real-time fraud, bill payments and merchant acceptance." path="/contact/" />
)
