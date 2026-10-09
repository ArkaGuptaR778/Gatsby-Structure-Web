import * as React from "react"
import Icon from "../ui/Icon"
import { PRODUCTS, INVESTOR_MENU, asset } from "../../lib/site"

export type NavKey = "home" | "about" | "products" | "news" | "investor" | "insights" | "careers" | "contact" | ""

/** Floating header card: logo, main navigation with the Products and Investor menus, region selector, mobile menu button.
 *  Menus, the region list and the mobile drawer are driven by assets/js/main.js (regions come from assets/js/config.js). */
const Header: React.FC<{ active: NavKey }> = ({ active }) => {
  const cur = (k: NavKey) => (active === k ? { "aria-current": "page" as const } : {})
  const cls = (k: NavKey) => `nav__link${active === k ? " is-active" : ""}`
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="nav" aria-label="Main">
          <a className="nav__logo" href="/" aria-label="RS Software — home"><img src={asset("img/logo-rs.webp")} alt="RS Software" width={121} height={30} /></a>
          <ul className="nav__links" id="nav-links">
            <li><a className={cls("home")} href="/" {...cur("home")}>Home</a></li>
            <li><a className={cls("about")} href="/about/" {...cur("about")}>About Us</a></li>
            <li className="nav__item"><button className={cls("products")} type="button" aria-expanded="false" aria-controls="dd-products">Products <Icon name="chev" className="chev" /></button>
              <div className="dropdown" id="dd-products"><div className="dropdown__label">Our products</div>
                {PRODUCTS.map(p => (
                  <a key={p.key} className="dd-row" style={{ "--c": p.color } as React.CSSProperties} href={p.url}>
                    <span className="dd-row__icon"><img src={asset("img/" + p.mark)} alt="" width={24} height={24} /></span>
                    <span><span className="dd-row__title">{p.name}</span><span className="dd-row__desc">{p.desc}</span></span>
                  </a>
                ))}
              </div></li>
            <li><a className={cls("news")} href="/news/" {...cur("news")}>News</a></li>
            <li className="nav__item"><button className={cls("investor")} type="button" aria-expanded="false" aria-controls="dd-investor">Investor <Icon name="chev" className="chev" /></button>
              <div className="dropdown" id="dd-investor"><div className="dropdown__label">Investor relations</div>
                {INVESTOR_MENU.map(([a, i, t, d]) => (
                  <a key={a} className="dd-row" href={`/investor/#${a}`}>
                    <span className="dd-row__icon"><Icon name={i} /></span>
                    <span><span className="dd-row__title">{t}</span><span className="dd-row__desc">{d}</span></span>
                  </a>
                ))}
              </div></li>
            <li><a className={cls("insights")} href="/insights/" {...cur("insights")}>Insights</a></li>
            <li><a className={cls("careers")} href="/careers/" {...cur("careers")}>Careers</a></li>
            <li><a className={cls("contact")} href="/contact/" {...cur("contact")}>Contact Us</a></li>
          </ul>
          <div className="region">
            <button className="region__btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Choose region"><Icon name="globe" /><span className="region__label" data-region="label">India</span><Icon name="chev" /></button>
            <ul className="region__menu" role="listbox" aria-label="Regions"></ul>
          </div>
          <button className="nav__toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links"><Icon name="menu" /></button>
        </nav>
      </header>
    </>
  )
}
export default Header
