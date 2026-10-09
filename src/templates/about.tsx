import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Icon, { iconHtml } from "../components/ui/Icon"
import HeadBlock from "../components/ui/HeadBlock"
import Portrait from "../components/ui/Portrait"
import { FounderVideo } from "../components/ui/LoopVideo"
import { MediaImg } from "../components/ui/Media"
import { asset } from "../lib/site"
import { esc, html } from "../lib/html"
import type { AboutData, PersonCard } from "../lib/content/about"

type Ctx = { data: AboutData }
const pad = { padding: "clamp(24px,3vw,40px)" }

/** "Read more about …" link to a section of Our Culture (HTML, because it shares an element with Markdown text). */
const readMore = (href: string, label: string) => `<a class="read-more" href="${href}">${esc(label)} ${iconHtml("arrow")}</a>`

const People: React.FC<{ list: PersonCard[] }> = ({ list }) => (
  <div className="people">{list.map(p => (
    <a key={p.slug} className="person reveal" href={`/people/${p.slug}/`} aria-label={`${p.name}, ${p.role} — view profile`}>
      <Portrait name={p.name} photo={p.photo} className="person__photo" /><b>{p.name}</b><span>{p.role}</span>
    </a>
  ))}</div>
)

/** About Us (/about/). Wording from content/about.md; leadership cards from content/team/. */
const AboutPage: React.FC<PageProps<object, Ctx>> = ({ pageContext: { data: d } }) => {
  const c = d.culture, ph = d.philosophy, cm = d.community, pt = d.patent, l = d.leadership
  const author = `<div class="testi__who mt-24"><span style="width:48px;height:48px;border-radius:50%;background:#e5e7eb;display:grid;place-items:center;font-weight:600">${esc(c.authorInitials)}</span><div><div style="font-weight:500">${esc(c.author)}</div><div style="font-size:13px;color:var(--rs-text-muted)">${esc(c.authorRole)}</div></div></div>`
  return (
    <Layout active="about">
      <section className="about-hero">
        <div className="container split">
          <div className="reveal" dangerouslySetInnerHTML={html(`<h1>${esc(d.hero.title)}</h1>${d.hero.html}`)} />
          <MediaImg id="about.hero" className="media media--5x4 reveal" width={1100} height={880} lazy={false} />
        </div>
      </section>

      <section className="section" id="what-we-do">
        <div className="container">
          <HeadBlock eyebrow={d.what.eyebrow} title={d.what.title} lede={d.what.ledeHtml} />
          <div className="grid grid-2">{d.what.cards.map((w, i) => (
            <div key={i} className="card card--hover reveal"><span className="icon-tile"><Icon name={w.icon} /></span>
              <h3 style={{ fontWeight: 500, fontSize: "19px", margin: "16px 0 8px", color: "var(--rs-navy-deep)" }} dangerouslySetInnerHTML={html(w.titleHtml)} />
              <p style={{ fontSize: "14.5px", color: "var(--rs-text-secondary)" }} dangerouslySetInnerHTML={html(w.descHtml)} /></div>
          ))}</div>
        </div>
      </section>

      <section className="section bg-warm" id="culture">
        <div className="container">
          <HeadBlock eyebrow={c.eyebrow} title={c.title} lede={c.ledeHtml} />
          <div className="split">
            <div className="card reveal" style={pad} dangerouslySetInnerHTML={html(c.html + author + readMore("/our-culture/#founder", c.link))} />
            <FounderVideo />
          </div>
        </div>
      </section>

      <section className="section" id="philosophy" style={{ overflow: "hidden" }}>
        <div className="container">
          <HeadBlock eyebrow={ph.eyebrow} title={ph.title} />
          <div className="split">
            <div className="card quote-card reveal" style={pad} dangerouslySetInnerHTML={html(`<span class="big-q">“</span>${ph.html}<div class="bar mt-24"></div>${readMore("/our-culture/#philosophy", ph.link)}`)} />
            <MediaImg id="about.philosophy" className="media media--5x4 reveal" width={1000} height={778} />
          </div>
        </div>
      </section>

      <section className="section bg-warm" id="values">
        <div className="container">
          <HeadBlock eyebrow={d.values.eyebrow} title={d.values.title} lede={d.values.ledeHtml} />
          <div className="values">{d.values.items.map((v, i) => (
            <div key={i} className="value reveal"><div className="value__dot" style={{ background: v.color }}><Icon name={v.icon} /></div><b dangerouslySetInnerHTML={html(v.titleHtml)} /></div>
          ))}</div>
        </div>
      </section>

      <section className="section" id="leadership">
        <div className="container">
          <HeadBlock eyebrow={l.eyebrow} title={l.boardTitle} />
          <People list={l.board} />
          <div className="mt-48" id="executives"><HeadBlock eyebrow={l.eyebrow} title={l.executiveTitle} /></div>
          <People list={l.executives} />
        </div>
      </section>

      <section className="section bg-subtle" id="community">
        <div className="container">
          <HeadBlock eyebrow={cm.eyebrow} title={cm.title} />
          <div className="split">
            <div className="card reveal" dangerouslySetInnerHTML={html(cm.html + readMore("/our-culture/#community", cm.link))} />
            <MediaImg id="about.community" className="media media--4x3 reveal" width={1100} height={825} />
          </div>
        </div>
      </section>

      <section className="section" id="patent">
        <div className="container">
          <HeadBlock eyebrow={pt.eyebrow} title={pt.title} />
          <div className="patent reveal">
            <div dangerouslySetInnerHTML={html(`<h3>${esc(pt.heading)}</h3><p class="sub">${esc(pt.subtitle)}</p>${pt.html}<a class="btn btn-white mt-24" href="${esc(pt.buttonLink)}">${esc(pt.button)}</a>`)} />
            <MediaImg id="about.patent" width={1000} height={778} />
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default AboutPage

export const Head: HeadFC<object, Ctx> = ({ pageContext: { data } }) => (
  <Seo title={data.title} description={data.description} path="/about/" ogImage="assets/img/about-rails.svg" />
)
