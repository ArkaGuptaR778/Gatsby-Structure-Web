import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Icon from "../components/ui/Icon"
import Coin from "../components/ui/Coin"
import HeadBlock from "../components/ui/HeadBlock"
import { html } from "../lib/html"
import { FAQ, COMMS } from "../lib/content/investor"
import type { IconName } from "../lib/icons"

/* Investor Relations (/investor/). Ported from gen/p_company.py investor().
   The three document libraries (div.lib[data-lib]) are filled by static/assets/js/investors.js from investors-data.js,
   which gatsby-browser.js loads on this page. Links with data-open="<library>:<tab>" open a library tab. */

const NAV: [string, string][] = [["overview", "Overview"], ["financials", "Financials"], ["governance", "Governance"], ["compliance", "Compliance"], ["communication", "Communication"], ["faqs", "FAQs"], ["contact", "Contact"]]
const QUICK: [string, IconName, string, string][] = [
  ["financials:quarterly", "chart", "Quarterly results", "Latest: Q1 FY2026-27"],
  ["financials:annual", "book", "Annual reports", "2008-09 to 2025-26"],
  ["governance:shareholding", "users", "Shareholding pattern", "Quarterly filings"],
  ["compliance:reg30", "bell", "Stock exchange disclosures", "Regulation 30 announcements"],
]

const InvestorPage: React.FC = () => (
  <Layout active="investor">
    <section className="inv-hero">
      <Coin className="rs-coin--inv-a" uid={1} /><Coin className="rs-coin--inv-b" uid={2} />
      <div className="container"><span className="eyebrow">Investor relations</span><h1>Building durable value in payments infrastructure</h1><p>Financial reports, corporate governance, and performance highlights for RS Software shareholders. Our focus remains payments-only software, delivered globally.</p>
        <div className="inv-ticks">
          <a className="inv-tick" href="https://www.bseindia.com/stock-share-price/rs-software-india-ltd/rssoftware/517447/" target="_blank" rel="noopener"><small>BSE</small><b>517447</b><span>Share price ↗</span></a>
          <a className="inv-tick" href="https://www.nseindia.com/get-quotes/equity?symbol=RSSOFTWARE" target="_blank" rel="noopener"><small>NSE</small><b>RSSOFTWARE</b><span>Share price ↗</span></a>
          <a className="inv-tick inv-tick--cta" href="#financials" data-open="financials:quarterly"><small>Latest</small><b>Q1 FY2026-27 results</b><span>View →</span></a>
        </div></div>
    </section>

    <section className="section-compact" aria-label="Highlights">
      <div className="container">
        <div className="statband reveal" data-observe="">
          <div><div className="stat__val" style={{ color: "var(--rs-status-success)" }}>₹589.84 L</div><div className="stat__lab">Standalone revenue</div><div className="stat__desc">Q1 FY2026-27</div></div>
          <div><div className="stat__val">₹2,544.72 L</div><div className="stat__lab">Standalone revenue</div><div className="stat__desc">FY2025-26</div></div>
          <div><div className="stat__val" style={{ color: "#7c3aed" }}>₹2,560.47 L</div><div className="stat__lab">Consolidated revenue</div><div className="stat__desc">FY2025-26</div></div>
          <div><div className="stat__val" style={{ color: "#0b1f3a" }}>40.88%</div><div className="stat__lab">Promoter holding</div><div className="stat__desc">Q1 FY2026-27</div></div>
        </div>
        <p className="inv-note">₹ in lakhs, as reported to the stock exchanges. Full statements are in <a href="#financials" data-open="financials:quarterly">quarterly results</a>.</p>
      </div>
    </section>

    <nav className="inv-nav" aria-label="Investor sections"><div className="container"><div className="inv-nav__track">
      {NAV.map(([a, t]) => <a key={a} href={`#${a}`}>{t}</a>)}
    </div></div></nav>

    <section className="section inv-sec" id="overview">
      <div className="container split" style={{ alignItems: "start" }}>
        <div className="timeline timeline--blue reveal">
          <span className="eyebrow">Investment of choice</span>
          <p className="statement statement--blue"><b>Invest, perform</b> and create.</p>
          <p className="prose mt-24">RS Software is strengthening its business around profitability and sustainability, guided by the principles of “invest, perform and create.” Digital payments are a regulatory priority worldwide for financial inclusion, and our focus is on enabling frictionless, seamless transactions at national scale.</p>
        </div>
        <div className="inv-quick reveal">
          {QUICK.map(([open, ico, t, s]) => (
            <a key={open} href={`#${open.split(":")[0]}`} data-open={open}><span className="inv-quick__ico"><Icon name={ico} /></span><span><b>{t}</b><small>{s}</small></span><Icon name="arrow" /></a>
          ))}
        </div>
      </div>
    </section>

    <section className="section inv-sec bg-subtle" id="financials">
      <div className="container"><HeadBlock eyebrow="Financials" title="Reports &amp; <em>results</em>" lede="Quarterly and annual results, board meeting notices, subsidiary accounts and ESOP schemes. Filter by financial year or search by keyword." />
        <div className="lib" data-lib="financials"><noscript><p>View all financial documents on the <a href="https://rssoftware.ai/home/investors">investor site</a>.</p></noscript></div></div>
    </section>

    <section className="section inv-sec" id="governance">
      <div className="container"><HeadBlock eyebrow="Corporate governance" title="Ownership &amp; <em>governance</em>" />
        <div className="shp reveal">
          <div className="shp__head"><div><h3>Shareholder composition</h3><p>As at quarter ended 30 Jun 2026 (Q1 FY2026-27)</p></div>
            <div className="shp__list"><span><small>Listed on</small>BSE · NSE</span><span><small>Depositories</small>NSDL · CDSL</span></div></div>
          <div className="shp__bar" role="img" aria-label="Promoters and promoter group 40.88 percent, public 59.12 percent">
            <span className="shp__seg" style={{ "--w": "40.88%", "--c": "#0075b7" } as React.CSSProperties}><b>40.88%</b></span><span className="shp__seg" style={{ "--w": "59.12%", "--c": "#14b8a6" } as React.CSSProperties}><b>59.12%</b></span></div>
          <table className="shp__table"><thead><tr><th scope="col">Category</th><th scope="col">Shareholding</th></tr></thead>
            <tbody><tr><td><i style={{ background: "#0075b7" }}></i>Promoters &amp; promoter group</td><td>40.88%</td></tr><tr><td><i style={{ background: "#14b8a6" }}></i>Public</td><td>59.12%</td></tr></tbody>
            <tfoot><tr><td>Total</td><td>100.00%</td></tr></tfoot></table>
        </div>
        <div className="lib mt-32" data-lib="governance"></div></div>
    </section>

    <section className="section inv-sec bg-subtle" id="compliance">
      <div className="container"><HeadBlock eyebrow="Compliance" title="Regulatory <em>filings</em>" lede="Disclosures under SEBI (LODR) Regulations and the Companies Act, 2013." />
        <div className="lib" data-lib="compliance"></div></div>
    </section>

    <section className="section inv-sec" id="communication">
      <div className="container"><HeadBlock eyebrow="Investor communication" title="Hear from our <em>leadership</em>" lede="AGM and investor call recordings, transcripts, and annual speeches by RS leadership." />
        <div className="media-grid">{COMMS.map(([ico, k, t, m], i) => (
          <a key={i} className="media-card" href="https://rssoftware.ai/home/investors" target="_blank" rel="noopener"><span className="media-card__ico"><Icon name={ico} /></span><span className="media-card__k">{k}</span><b dangerouslySetInnerHTML={html(t)} /><span className="media-card__m">{m}</span></a>
        ))}</div></div>
    </section>

    <section className="section inv-sec bg-subtle" id="faqs">
      <div className="container container-narrow"><HeadBlock eyebrow="Investor FAQs" title="Frequently asked <em>questions</em>" />
        {FAQ.map(g => (
          <React.Fragment key={g.group}>
            <h3 className="faq__group" dangerouslySetInnerHTML={html(g.group)} />
            <div className="acc">{g.items.map(f => (
              <div key={f.n} className="acc__item"><button className="acc__btn" type="button" aria-expanded="false" aria-controls={`faq-${f.n}`}><span><span className="faq__n">{`Q${f.n}`}</span>{` ${f.q}`}</span><Icon name="chev" /></button>
                <div className="acc__panel" id={`faq-${f.n}`} role="region"><div><div className="acc__inner"><p className="acc__text" dangerouslySetInnerHTML={html(f.a)} /></div></div></div></div>
            ))}</div>
          </React.Fragment>
        ))}
      </div>
    </section>

    <section className="section inv-sec" id="contact">
      <div className="container"><HeadBlock eyebrow="Investor contacts" title="Get in <em>touch</em>" />
        <div className="grid grid-4 inv-contact">
          <div className="card"><span className="icon-tile"><Icon name="briefcase" /></span><h3>Registered office</h3><p>RS Software (India) Limited<br />A-2, FMC Fortuna, 234/3A,<br />A.J.C. Bose Road, Kolkata 700020, India</p></div>
          <div className="card"><span className="icon-tile"><Icon name="users" /></span><h3>Registrar &amp; transfer agent</h3><p>C.B. Management Services (P) Ltd.<br />P-22, Bondel Road,<br />Kolkata, India</p></div>
          <div className="card"><span className="icon-tile"><Icon name="chart" /></span><h3>Listing</h3><p>BSE Ltd. — 517447<br />National Stock Exchange of India — RSSOFTWARE<br />Depositories: NSDL, CDSL</p></div>
          <div className="card"><span className="icon-tile"><Icon name="mail" /></span><h3>Investor queries</h3><p>Questions about shares, dividends or documents? Our investor relations team will respond.</p><a className="btn btn-primary mt-16" href="/contact/?topic=investor#message">Contact investor relations</a></div>
        </div></div>
    </section>
  </Layout>
)
export default InvestorPage

export const Head: HeadFC = () => (
  <Seo title="Investor Relations" description="Financial results, annual reports, shareholding pattern, corporate governance, compliance filings and investor FAQs for RS Software (India) Limited — BSE 517447, NSE RSSOFTWARE." path="/investor/" />
)
