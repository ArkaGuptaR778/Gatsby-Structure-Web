import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Icon from "../components/ui/Icon"
import Coin from "../components/ui/Coin"
import { asset } from "../lib/site"
import { html } from "../lib/html"
import { useMedia, mediaAttrs } from "../components/ui/Media"
import { JOBS, TESTI_ALUMNI, TESTI_EMP, type Testimonial } from "../lib/content/careers"

/* Careers (/careers/). Ported from gen/p_misc.py careers(). Roles and testimonials: src/lib/content/careers.ts. */

/** Three pictures per panel, from content/media.md (careers.panel-1/2/3, images=a,b,c). */
const Imgs: React.FC<{ id: string }> = ({ id }) => {
  const m = useMedia(id)
  return <div className="acc__imgs" {...mediaAttrs(m)}>{(m.images || []).map((f, i) => <img key={i} src={`/assets/img/${f}`} alt={m.alt} width={700} height={740} loading="lazy" />)}</div>
}

/** RS-PLACEHOLDER: testimonials — sample names, quotes and stock portraits; replace with real, approved quotes. Owner: HR. */
const Testis: React.FC<{ list: Testimonial[] }> = ({ list }) => (
  <div className="grid grid-3" style={{ marginTop: "8px" }} data-placeholder="testimonials">{list.map(([q, n, r, img]) => (
    <figure key={n} className="testi" style={{ margin: 0 }}><blockquote className="testi__q" style={{ margin: 0 }}>{`“${q}”`}</blockquote><figcaption className="testi__who"><img src={asset(`img/${img}.webp`)} alt="" width={44} height={44} loading="lazy" /><div><div className="testi__name">{n}</div><div className="testi__role">{r}</div></div></figcaption></figure>
  ))}</div>
)

const ACC: [string, string, string, React.ReactNode][] = [
  ["where-your-work", "Where Your Work Powers", "Global Payments", <>
    <p className="acc__text" dangerouslySetInnerHTML={html("Technology here sits at the core of global payment systems. The solutions we build support banks, financial institutions, and payment networks across markets, enabling money to move securely, reliably, and at scale. The work spans markets and payment ecosystems worldwide, offering exposure to global programs, diverse teams, and complex cross-border challenges. Learning is continuous, ideas are encouraged, and ownership is valued.<br><br>If you are curious, committed, and ready to grow while building technology that truly matters, RS Software is a place where your work makes a difference.")} /><Imgs id="careers.panel-1" /></>],
  ["growth", "Your growth.", "Our commitment", <>
    <p className="acc__text" dangerouslySetInnerHTML={html("We believe your growth is our collective success. RS Software invests continuously in learning programs, mentorship pathways, and structured career development tracks. Every engineer, analyst, and manager has access to certifications, internal mobility, and leadership coaching. We do not just hire talent — we cultivate it.<br><br>From technical upskilling in emerging payment rails to leadership workshops and cross-functional rotations, the tools you need to grow are always within reach.")} /><Imgs id="careers.panel-2" /></>],
  ["journey", "Learn. Build. Grow.", "Your Journey at RS Software", <>
    <p className="acc__text" dangerouslySetInnerHTML={html("From your very first week, you will be contributing to systems that process billions of transactions across global markets. Our onboarding is immersive, our teams are deeply collaborative, and our culture rewards curiosity and initiative equally. You will work alongside payment architects, data scientists, compliance experts, and product leaders — all aligned to a common mission.<br><br>The journey here is yours to shape. Whether you want to deepen your technical craft, move into product leadership, or explore global markets — RS Software has a path for you.")} /><Imgs id="careers.panel-3" /></>],
  ["alumni", "Alumni", "Speak", <Testis list={TESTI_ALUMNI} />],
  ["employees", "Employee", "Speak", <Testis list={TESTI_EMP} />],
]

const CareersPage: React.FC = () => (
  <Layout active="careers">
    <section className="page-hero container"><Coin className="rs-coin--hero-l" uid={1} /><h1 className="giant">Careers</h1></section>
    <section className="section-compact" style={{ paddingTop: 0 }}><div className="container container-narrow">
      <div className="acc">{ACC.map(([id, a, b, c], i) => (
        <div key={id} className={`acc__item${i === 0 ? " is-open" : ""}`} id={id}><button className="acc__btn" type="button" aria-expanded={i === 0 ? "true" : "false"} aria-controls={`acc-${i}`}><span><span className="soft">{a}</span>{` ${b}`}</span><Icon name="chev" /></button>
          <div className="acc__panel" id={`acc-${i}`} role="region"><div><div className="acc__inner">{c}</div></div></div></div>
      ))}</div>
    </div></section>
    <section className="jobs-band" id="open-roles" aria-labelledby="roles-h">
      <div className="container"><h2 id="roles-h" className="sr-only">Open roles</h2>
        {/* RS-PLACEHOLDER: job listings — sample roles (src/lib/content/careers.ts); replace with live roles from the ATS. Owner: HR. */}
        <div className="jobs" data-placeholder="job-listings">
          {JOBS.map(j => (
            <article key={j.slug} className="job reveal"><div className="job__body"><h3 className="job__title">{j.title}</h3><p className="job__meta">{`${j.type} · ${j.loc}`}</p><p className="job__desc">{j.short}</p></div><a className="btn btn-primary" href={`/careers/${j.slug}/`} aria-label={`View role: ${j.title}`}>View role</a></article>
          ))}
          <article className="job job--dashed reveal"><div className="job__body"><h3 className="job__title">Open application</h3><p className="job__meta">Full-time · Kolkata / Global</p><p className="job__desc">Don’t see your role available? Apply for an open application!</p></div><a className="btn btn-primary" href="/careers/apply/">Apply now</a></article>
        </div></div>
    </section>
  </Layout>
)
export default CareersPage

export const Head: HeadFC = () => (
  <Seo title="Careers" description="Build technology at the core of global payment systems. Explore open roles and life at RS Software." path="/careers/" />
)
