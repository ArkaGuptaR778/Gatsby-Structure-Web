/* Home page sections (markup mirrors the static site so assets/css/rs.css applies unchanged).
   Text arrives as small HTML strings rendered from content/home.md (bold, accent phrases, links). */
import * as React from "react"
import Icon from "../../ui/Icon"
import Coin from "../../ui/Coin"
import { BrandFilm } from "../../ui/LoopVideo"
import { MediaSlot, MediaImg, useMedia, mediaAttrs, isReplaced } from "../../ui/Media"
import type { MediaEntry as MediaEntryLike } from "../../../lib/content/media"
import { PRODUCTS, asset } from "../../../lib/site"
import { HWW_ARCH, HWW_TERM, HWW_AI } from "../../../lib/illustrations"
import type { IconName } from "../../../lib/icons"
import type { HomeData } from "../../../lib/content/home"

const html = (s: string) => ({ __html: s })
type P = { d: HomeData }

export const Hero: React.FC<P> = ({ d }) => (
  <section className="hero container" aria-labelledby="hero-h">
    <div className="hero__badge reveal"><span className="dot"><img src={asset("img/favicon-32.png")} alt="" /></span><span><b dangerouslySetInnerHTML={html(d.hero.badgeTitle)} /><span dangerouslySetInnerHTML={html(d.hero.badgeText)} /></span></div>
    <h1 id="hero-h" className="reveal" dangerouslySetInnerHTML={html(d.hero.title + (d.hero.subtitle ? ` <span class="hero__h1-sub">${d.hero.subtitle}</span>` : ""))} />
    <p className="hero__lede reveal" dangerouslySetInnerHTML={html(d.hero.lede)} />
    <div className="hero__cta reveal">
      <form className="capture" action="/contact/" method="get" role="search" aria-label="Talk to an expert">
        <label className="sr-only" htmlFor="hero-email">Email address</label>
        <input id="hero-email" type="email" name="email" placeholder={d.hero.emailPlaceholder} autoComplete="email" />
        <button type="submit">{d.hero.button}</button>
      </form>
    </div>
  </section>
)

/** Client marquee: the list is repeated once (hidden from screen readers) so the loop is seamless. */
export const Trusted: React.FC<P> = ({ d }) => {
  const track = d.clients.map((c, i) =>
    c.logo
      ? <li key={i} className="logo-chip"><img src={asset(c.logo)} alt={c.name} height={c.height} style={{ height: `${c.height}px` }} loading="lazy" decoding="async" />{c.beside && <small>{c.name}</small>}</li>
      : <li key={i} className="logo-chip logo-chip--name"><b>{c.name}</b></li>)
  return (
    <section className="trusted container" aria-label="Trusted by">
      <Coin className="rs-coin--trust" uid={3} />
      <p className="trusted__label" dangerouslySetInnerHTML={html(d.clientsLabel)} />
      <div className="marquee" data-marquee=""><ul className="marquee__track" aria-label="Clients and partners">{track}</ul><ul className="marquee__track" aria-hidden="true">{track}</ul></div>
    </section>
  )
}

export const Years: React.FC<P> = ({ d }) => (
  <section className="section container" id="brand-film">
    <div className="split">
      <div className="timeline reveal">
        <div className="years" data-count={d.years.years}>{d.years.years}</div>
        <span className="years-pill" dangerouslySetInnerHTML={html(d.years.pill)} />
        <p className="years-note" dangerouslySetInnerHTML={html(d.years.note)} />
        <p className="statement statement--sm mt-48" dangerouslySetInnerHTML={html(d.years.statement)} />
      </div>
      <BrandFilm />
    </div>
  </section>
)

/** Metrics band under the 30 Years section: the product-page metrics style (full-width band, three figures that count up). */
export const ImpactStats: React.FC<P> = ({ d }) => d.impact.length === 0 ? null : (
  <section className="p-stats" data-observe=""><div className="container">
    <div className="grid grid-3">{d.impact.map((m, i) => (
      <div key={i} className="reveal">
        <div className="stat__val" style={{ color: IMPACT_COLOURS[i % IMPACT_COLOURS.length] }} data-count={m.value}>{m.value}</div>
        <div className="stat__lab" dangerouslySetInnerHTML={html(m.labelHtml)} />
        <div className="stat__desc" dangerouslySetInnerHTML={html(m.descHtml)} />
      </div>
    ))}</div>
    {d.impactClosing && <p className="center mt-32" style={HINT_STYLE} dangerouslySetInnerHTML={html(d.impactClosing)} />}
  </div></section>
)

const FEATURE_ICONS: IconName[] = ["doc", "calendar", "scan", "route"]
/** Small centred caption (the "Select your role…" hint style), also used for the one-line closings. */
const HINT_STYLE: React.CSSProperties = { color: "var(--rs-text-muted)", fontSize: "14px" }
const IMPACT_COLOURS = ["var(--rs-status-success)", "#1f6fc4", "#8b3fe0"]

export const WhoWeServe: React.FC<P> = ({ d }) => (
  <section className="section container" id="who-we-serve" aria-labelledby="serve-h">
    <div className="timeline timeline--blue reveal">
      <div className="section-icon"><span className="section-icon__dot"><Icon name="briefcase" /></span><h2 id="serve-h" dangerouslySetInnerHTML={html(d.serveHead.title)} /></div>
      <p className="statement statement--blue" dangerouslySetInnerHTML={html(d.serveHead.lead)} />
      <p className="statement mt-32" dangerouslySetInnerHTML={html(d.serveHead.statement)} />
    </div>
    <div className="mt-48 reveal">
      <div className="tabs" role="tablist" aria-label="Audiences" data-tabs="">
        {d.serve.map((s, i) => (
          <button key={i} className="tab" role="tab" id={`tab-s${i}`} aria-controls={`panel-s${i}`} aria-selected={i === 0 ? "true" : "false"} tabIndex={i === 0 ? 0 : -1} dangerouslySetInnerHTML={html(s.tab)} />
        ))}
      </div>
      {d.serve.map((s, i) => (
        <div key={i} className="tab-panel serve" role="tabpanel" id={`panel-s${i}`} aria-labelledby={`tab-s${i}`} hidden={i !== 0}>
          <div>{s.label && <div className="serve__label" dangerouslySetInnerHTML={html(s.label)} />}<h3 className="serve__h" dangerouslySetInnerHTML={html(s.title)} />
            {s.text && <p className="prose" style={{ color: "#475569", margin: "-6px 0 18px" }} dangerouslySetInnerHTML={html(s.text)} />}
            <a className="link-arrow" href={s.url} dangerouslySetInnerHTML={html(s.link)} /></div>
          <div className="feature-cards">{s.features.map((f, j) => (
            <div key={j} className="feature-card"><span className="icon-tile"><Icon name={FEATURE_ICONS[j % 4]} /></span><span dangerouslySetInnerHTML={html(f)} /></div>
          ))}</div>
        </div>
      ))}
    </div>
  </section>
)

export const WhatWeBuild: React.FC<P> = ({ d }) => (
  <section className="section" id="products" aria-labelledby="build-h" style={{ background: "linear-gradient(180deg,#dff6f3 0%,#fff 40%)" }}>
    <div className="container">
      <div className="split">
        <div className="timeline timeline--violet reveal">
          <div className="section-icon"><span className="section-icon__dot" style={{ color: "#6366f1" }}><Icon name="box" /></span><h2 id="build-h" dangerouslySetInnerHTML={html(d.build.title)} /></div>
          <p className="statement statement--blue" dangerouslySetInnerHTML={html(d.build.lead)} />
          {d.build.statement && <p className="statement mt-32" dangerouslySetInnerHTML={html(d.build.statement)} />}
          {d.build.parasHtml.map((x, i) => <p key={i} className="prose mt-24" style={{ color: "#1f2937" }} dangerouslySetInnerHTML={html(x)} />)}
        </div>
        {/* Visual slot home.flow (content/media.md): the payments-in / payments-out animation unless an image or video is given */}
        <MediaSlot id="home.flow" imgClassName="media reveal" videoClassName="media reveal" videoStyle={{ aspectRatio: "4 / 5", overflow: "hidden" }}>
        <div className="mt mt--col reveal" data-media="home.flow" data-mt={d.flow.json} role="img" aria-label={d.flow.description}>
          <span className="mt__label mt__label--in">{d.flow.inLabel}</span><span className="mt__label mt__label--out">{d.flow.outLabel}</span>
          <div className="mt__stage" aria-hidden="true"></div>
          <div className="mt__axis" aria-hidden="true"><span className="mt__beam"></span><span className="mt__glow"></span><span className="mt__tile"><img src={asset("img/favicon-180.png")} alt="" width={36} height={36} /></span></div>
        </div>
        </MediaSlot>
      </div>

      <p className="center mt-48" style={HINT_STYLE} dangerouslySetInnerHTML={html(d.build.hint)} />
      <div className="roles" role="group" aria-label="Filter products by role"><span className="roles__label" dangerouslySetInnerHTML={html(d.build.rolesLabel)} />
        {d.roles.map((r, i) => <button key={i} className="role" type="button" aria-pressed="false" data-products={r.products} dangerouslySetInnerHTML={html(r.label)} />)}
      </div>
      <div className="products reveal">
        {d.cards.map(c => {
          const p = PRODUCTS.find(x => x.key === c.key)
          if (!p) return null
          return (
            <a key={c.key} className={`pcard c-${c.key}`} data-product={c.key} href={p.url}>
              <div className="pcard__brand"><img className="pcard__logo" src={asset("img/" + p.logo.src)} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} /></div>
              <p className="pcard__h" dangerouslySetInnerHTML={html(c.title)} />
              <ul>{c.points.map((x, i) => <li key={i} dangerouslySetInnerHTML={html(x)} />)}</ul>
              <span className="pcard__more" dangerouslySetInnerHTML={html(d.build.more)} />
            </a>
          )
        })}
      </div>
    </div>
  </section>
)

export const WhyRS: React.FC<P> = ({ d }) => (
  <section className="section why" aria-labelledby="why-h">
    <div className="container">
      <Coin className="rs-coin--why-a" uid={4} /><Coin className="rs-coin--why-b" uid={5} />
      <div className="timeline timeline--coral reveal" style={{ maxWidth: "900px" }}>
        <div className="section-icon"><span className="section-icon__dot" style={{ color: "#f97316" }}><Icon name="layers" /></span><h2 id="why-h" dangerouslySetInnerHTML={html(d.why.title)} /></div>
        <p className="statement statement--blue" dangerouslySetInnerHTML={html(d.why.lead)} />
        <div className="prose prose--lg mt-32" dangerouslySetInnerHTML={html(d.why.prose)} />
      </div>
    </div>
  </section>
)

/** A "How we work" pane: the built-in diagram, or the image / video given for the slot in content/media.md. */
const paneVisual = (m: MediaEntryLike, fallback: string): string => {
  /* fills the whole picture panel edge to edge (.hww__pane--media in rs.css) */
  const box = "position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover"
  if (m.video) {
    const src = m.video.loop.map(f => `<source src="/assets/${f}" type="${f.endsWith(".webm") ? "video/webm" : "video/mp4"}">`).join("")
    return `<video autoplay muted loop playsinline preload="metadata"${m.video.poster ? ` poster="/assets/${m.video.poster}"` : ""} style="${box}" aria-label="${m.alt.replace(/"/g, "&quot;")}">${src}</video>`
  }
  if (m.image) return `<img src="/assets/img/${m.image}" alt="${m.alt.replace(/"/g, "&quot;")}" loading="lazy" style="${box}">`
  return fallback
}

export const HowWeWork: React.FC<P> = ({ d }) => {
  const steps = d.how.steps
  const how1 = useMedia("home.how-1"), how2 = useMedia("home.how-2"), how3 = useMedia("home.how-3")
  const pad = (n: number) => String(n).padStart(2, "0")
  return (
    <section className="section-compact" id="how-we-work" aria-label="How we work">
      <div className="container">
        <div className="hww reveal" data-stepper={JSON.stringify(steps.map(s => ({ title: s.title, desc: s.desc, color: s.color })))} data-interval="5500">
          <div className="hww__text">
            <span className="hww__kicker">{d.how.kicker}</span>
            <div className="hww__dots" role="tablist" aria-label="Steps">{steps.map((_, i) => <button key={i} type="button" role="tab" data-step={i} aria-label={`Step ${i + 1}`}></button>)}</div>
            <span className="hww__num" data-field="num">01 / {pad(steps.length)}</span>
            <h3 className="hww__title" data-field="title">{steps[0]?.title}</h3>
            <p className="hww__desc" data-field="desc">{steps[0]?.desc}</p>
            <div className="hww__steps">{steps.map((s, i) => <button key={i} type="button" data-step={i}>{s.title}</button>)}</div>
          </div>
          <div className="hww__visual">
            {/* A pane given a picture or video in content/media.md shows only that, edge to edge (no label); otherwise the built-in diagram */}
            <div className={`hww__pane pane-arch is-active${isReplaced(how1) ? " hww__pane--media" : ""}`} data-pane="0" {...mediaAttrs(how1)} dangerouslySetInnerHTML={html(isReplaced(how1) ? paneVisual(how1, "") : `<span class="pane-label" style="color:#0075b7">Architecture</span>${HWW_ARCH}`)} />
            <div className={`hww__pane pane-build${isReplaced(how2) ? " hww__pane--media" : ""}`} data-pane="1" {...mediaAttrs(how2)} dangerouslySetInnerHTML={html(isReplaced(how2) ? paneVisual(how2, "") : `<span class="pane-label" style="color:var(--rs-status-success-text)">Production deploy</span>${HWW_TERM}`)} />
            <div className={`hww__pane pane-ai${isReplaced(how3) ? " hww__pane--media" : ""}`} data-pane="2" {...mediaAttrs(how3)} dangerouslySetInnerHTML={html(isReplaced(how3) ? paneVisual(how3, "") : `<span class="pane-label" style="color:#6d28d9">AI operations</span>${HWW_AI}`)} />
          </div>
        </div>
      </div>
    </section>
  )
}

export const InsightsCta: React.FC<P> = ({ d }) => (
  <section className="globe-cta" id="insights-cta" aria-labelledby="ins-h">
    <div className="container">
      <h2 id="ins-h" className="reveal" dangerouslySetInnerHTML={html(d.insights.title)} />
      <p className="reveal" dangerouslySetInnerHTML={html(d.insights.text)} />
      <a className="btn btn-primary" href="/insights/" style={{ fontFamily: "var(--rs-font-ui)", fontSize: "16px", padding: "14px 28px" }}>{d.insights.button}</a>
      <div className="globe-wrap"><MediaSlot id="home.globe" imgClassName="globe" videoClassName="globe" videoStyle={{ aspectRatio: "1", overflow: "hidden", borderRadius: "50%" }}><div className="rs-globe" data-globe="" data-media="home.globe" role="img" aria-label={d.insights.globeLabel}><canvas></canvas></div></MediaSlot><MediaImg id="home.astronaut" className="astro" width={400} height={403} /></div>
    </div>
  </section>
)
