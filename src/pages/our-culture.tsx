import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Icon from "../components/ui/Icon"
import Coin from "../components/ui/Coin"
import { FounderVideo } from "../components/ui/LoopVideo"
import { MediaImg, useMedia, mediaAttrs } from "../components/ui/Media"

/* Our Culture (/our-culture/): long-form page in the leadership-profile layout (banner, then sections).
   Content follows rssoftware.ai/home/our_culture/. Ported from gen/p_company.py culture(). */

const GEM = ["RS School of Payments™", "RS Project Delivery Framework™", "RS Customer View™"]
const STATS: [string, string][] = [
  ["1991", "Supporting Veerayatan since the year RS Software was founded"],
  ["1973", "The year Veerayatan itself was established"],
  ["3", "Commitments — seva, shiksha and sadhana — that guide the work"],
]

const Flow: React.FC = () => (
  <div className="cul-flow reveal" aria-hidden="true"><MediaImg id="culture.divider" width={1694} height={218} /></div>
)

const CulturePage: React.FC = () => {
  const cover = useMedia("culture.cover")
  return (
  <Layout active="about">
    <article className="profile culture">
      <div className="profile__cover profile__cover--img" {...mediaAttrs(cover)} style={{ backgroundImage: `linear-gradient(120deg,rgba(11,37,69,.86),rgba(0,117,183,.72) 55%,rgba(20,184,166,.65))${cover.image ? `,url(/assets/img/${cover.image})` : ""}` }}>
        <div className="container profile__wrap"><a className="back-link profile__back" href="/about/#culture">← Back to About Us</a></div>
      </div>
      <div className="container profile__wrap">
        <header className="profile__head culture__head">
          <div className="profile__id">
            <span className="eyebrow">About RS Software</span>
            <h1>Our Culture</h1>
            <p className="profile__role">What we believe, how we work, and the communities we support.</p>
          </div>
        </header>

        <nav className="culture__nav" aria-label="On this page">
          <a href="#founder">Founder’s speak</a><a href="#philosophy">Philosophy</a><a href="#community">Community</a>
        </nav>

        <section className="profile__about" id="founder" aria-labelledby="founder-h">
          <h2 id="founder-h" className="title">Founder’s <em>speak</em></h2><div className="bar"></div>
          <div className="cul-split">
            <div>
              <div className="culture__quote reveal">
                <p className="culture__q">“RS Software’s exclusive focus on payments and proven track record of more than 28 years has made it the brand of choice for leading payments providers seeking to improve time to market for solutions that can generate additional revenues and save money.”</p>
                <p className="culture__who"><b>Raj Jain</b><span>CEO &amp; Managing Director</span></p>
              </div>
              <div className="profile__bio">
                <p>That focus shows in the work. RS Software has delivered end-to-end payment solutions for global networks such as Visa, and built national infrastructure in India — including platforms behind UPI and BBPS, and enterprise fraud and risk management at national scale.</p>
                <p>Our mission is to transform the lives of consumers, businesses and nations with the power of digital payments.</p>
              </div>
            </div>
            <aside className="cul-aside">
              <figure className="cul-figure reveal"><FounderVideo id="culture.founder" /><figcaption>A message from Raj Jain, CEO &amp; Managing Director (1:46)</figcaption></figure>
            </aside>
          </div>
        </section>

        <Flow />

        <section className="profile__about" id="philosophy" aria-labelledby="phil-h">
          <h2 id="phil-h" className="title">Our <em>philosophy</em></h2><div className="bar"></div>
          <div className="cul-split cul-split--rev">
            <aside className="cul-aside">
              <figure className="cul-figure reveal"><MediaImg id="culture.philosophy" width={1000} height={778} /><figcaption>Values and partnerships, the two signposts of RS GEM™</figcaption></figure>
              <div className="cul-note reveal"><Coin className="cul-coin" uid={1} /><p><b>Payments only.</b> An exclusive focus on payments for more than 28 years.</p></div>
            </aside>
            <div>
              <div className="profile__bio">
                <p>At RS Software we combine our core values with an emphasis on honesty, integrity, mutual respect and individual leadership. These form the guiding principles for our company and are the basis for long-lasting partnerships with some of the world’s leading payment brands.</p>
                <p>Those principles are put to work through the <b>RS Global Execution Methodology™ (RS GEM™)</b> — the practices that shape how our teams learn, build and deliver:</p>
              </div>
              <ul className="benefits culture__gem">{GEM.map(g => <li key={g}><Icon name="check-circle" /><span>{g}</span></li>)}</ul>
              <div className="profile__bio">
                <p>Underneath all of it is one principle we have kept through more than two decades of market change: <b>thinking of yourself as the customer</b>.</p>
              </div>
            </div>
          </div>
        </section>

        <Flow />

        <section className="profile__about" id="community" aria-labelledby="comm-h">
          <h2 id="comm-h" className="title">Our <em>community</em></h2><div className="bar"></div>
          <div className="cul-split">
            <div className="profile__bio">
              <p>At RS Software we take our responsibility to the community seriously. We believe in treating our employees, customers and shareholders with respect and compassion, and we strive to extend those same courtesies to everyone we meet.</p>
              <p>Our principal philanthropic partnership is with <b>Veerayatan</b>, which we have supported since the company was founded in 1991. Established in 1973 from the vision of the scholar Amar Muniji Maharaj and nurtured by Acharya Shri Chandanaji, Veerayatan is one of India’s leading development organisations, working to improve quality of life through three commitments: <b>seva</b> (service), <b>shiksha</b> (education) and <b>sadhana</b> (inner development).</p>
            </div>
            <aside className="cul-aside">
              <figure className="cul-figure reveal"><MediaImg id="culture.community" width={1100} height={825} /><figcaption>Veerayatan’s three commitments</figcaption></figure>
            </aside>
          </div>
          <div className="statband cul-stats reveal mt-32">{STATS.map(([v, l]) => <div key={v}><div className="stat__val">{v}</div><div className="stat__lab">{l}</div></div>)}</div>
          <div className="profile__bio mt-32">
            <p>Alongside that partnership, we work with NGOs and non-profits on disaster relief, contributing clothing, medicines, funds and resources for people affected by floods and earthquakes.</p>
          </div>
        </section>

        <nav className="profile__pager" aria-label="More about RS Software">
          <a href="/about/#leadership"><small>← Back</small><b>Leadership</b></a>
          <a href="/careers/" className="is-next"><small>Next →</small><b>Working at RS</b></a>
        </nav>
      </div>
    </article>
  </Layout>
  )
}
export default CulturePage

export const Head: HeadFC = () => (
  <Seo title="Our Culture" description="Founder’s speak, the RS Software philosophy and RS GEM™, and the communities we support — including our partnership with Veerayatan since 1991."
    path="/our-culture/" ogImage="assets/img/philosophy.webp" />
)
