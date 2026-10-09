import * as React from "react"
import { FOOTER_COLUMNS, asset } from "../../lib/site"

const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="container footer__top">
      <div className="footer__brand"><img src={asset("img/logo-rs-white.webp")} alt="RS Software" width={178} height={44} loading="lazy" /><p>Payments-only software, delivered globally — from national rails to AI-native fraud and risk platforms.</p></div>
      {FOOTER_COLUMNS.map(([h, links]) => (
        <div key={h} className="footer__col"><h3>{h}</h3><ul>{links.map(([t, u]) => <li key={t}><a href={u}>{t}</a></li>)}</ul></div>
      ))}
    </div>
    <div className="footer__bar"><div className="container"><span>© <span data-year="">2026</span> RS Software. Payments-only. Globally.</span>
      <nav aria-label="Legal"><a href="/legal/#terms">Terms</a><a href="/legal/#privacy">Privacy (Updated 08/2022)</a><a href="/sitemap/">Sitemap</a></nav></div></div>
  </footer>
)
export default Footer
