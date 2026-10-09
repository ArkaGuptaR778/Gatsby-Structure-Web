import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Icon from "../components/ui/Icon"
import { InsightCard, InsightTags } from "../components/sections/insights/InsightCard"
import { asset } from "../lib/site"
import { MediaImg, MediaBanner, slotImage, useMedia, mediaAttrs } from "../components/ui/Media"
import type { MediaMap } from "../lib/content/media"
import { MediaFilm } from "../components/ui/LoopVideo"
import { CASE_STUDY, TYPES, PNAME, type Insight } from "../lib/content/insights"

type Ctx = { slug: string; it: Insight; related: Insight[]; media?: MediaMap }

const NextStep: React.FC<{ title: string; text: string; href: string; label: string }> = ({ title, text, href, label }) => (
  <div className="gated reveal" id="next"><h3>{title}</h3><p>{text}</p><a className="btn btn-gradient" href={href}>{label}</a></div>
)

/** Whitepaper download (no form). Drop the PDF at static/assets/docs/<slug>.pdf and the button goes live (assets/js/main.js checks it). */
const PdfBlock: React.FC<{ it: Insight }> = ({ it }) => (
  <div className="doc-dl reveal" id="download" data-doc={asset(`docs/${it.slug}.pdf`)}>
    <span className="doc-dl__ico"><Icon name="doc" /></span>
    <div className="doc-dl__text"><h3>{it.title}</h3><p data-doc-status="">Whitepaper · PDF</p></div>
    <a className="btn btn-primary" href={asset(`docs/${it.slug}.pdf`)} download="" data-doc-link="">Download PDF</a></div>
)

/** Terminal-style preview that plays on click (assets/js/main.js, [data-lines]). */
const VideoSim: React.FC<{ it: Insight }> = ({ it }) => {
  /* Visual slot insight.<slug> (content/media.md): give it video=name and the real film replaces this preview */
  const m = useMedia(`insight.${it.slug}`)
  if (m.video) return <MediaFilm id={m.id} label="Watch the video" className="film reveal" />
  const lines = [["info", "▶ " + it.title], ["dim", "  chapter 1 — the problem"], ["info", "→ 10,000 concurrent transactions replayed"], ["ok", "✓ p50 decision latency 71ms"], ["ok", "✓ p99 decision latency 184ms"], ["warn", "! 37 high-risk transactions interdicted"], ["ok", "✓ zero added latency on the payment rail"], ["dim", "  chapter 3 — how it works"], ["info", "→ Request a live walkthrough with our team"]]
  return (
    <div className="sim video-box" {...mediaAttrs(m)} data-lines={JSON.stringify(lines)} role="region" aria-label="Video preview">
      <div className="sim__log" style={{ padding: "clamp(20px,4vw,48px)" }}><div className="dim on">{`LIVE DEMO — ${it.dur}`}</div><div className="on" style={{ fontFamily: "var(--rs-font-body)", fontSize: "clamp(20px,3vw,34px)", fontWeight: 700, color: "#fff" }}>{it.title}</div><div className="on" style={{ fontFamily: "var(--rs-font-body)", color: "#94a3b8", maxWidth: "560px" }}>{it.summary}</div></div>
      <button className="sim__play" type="button" aria-label="Play preview"><Icon name="play" /></button><button className="sim__replay" type="button">↺ Replay</button></div>
  )
}

const Toc: React.FC<{ items: [string, string][] }> = ({ items }) => (
  <nav className="toc" aria-label="On this page"><ol>{items.map(([id, t], k) => <li key={id}><a href={`#${id}`} className={k === 0 ? "is-active" : undefined}>{t}</a></li>)}</ol></nav>
)

/** Full case-study text (the insight marked `full`). */
const CaseStudy: React.FC<{ it: Insight }> = ({ it }) => (
  <>
    <Toc items={[["intro", it.title], ...CASE_STUDY.filter(([, t]) => t).map(([id, t]) => [id, t as string] as [string, string])]} />
    <div className="article-body">
      {CASE_STUDY.map(([id, t, paras]) => (
        <React.Fragment key={id}>
          {t ? <h2 id={id}>{t}</h2> : <div id="intro" style={{ scrollMarginTop: "120px" }}></div>}
          {paras.map((p, i) => p === "IMG"
            ? <MediaImg key={i} id="insights.case-study-image" width={1400} height={613} />
            : <p key={i} className={id === "intro" ? "intro" : undefined}>{p}</p>)}
        </React.Fragment>
      ))}
      <p className="mt-48" style={{ fontFamily: "var(--rs-font-body)", fontSize: "15px", color: "var(--rs-text-muted)" }}>{`Published ${it.date} · ${TYPES[it.type]} · ${PNAME[it.product]}`}</p>
      <div className="gated"><h3>Planning a similar programme?</h3><p>Talk to our payments specialists about scheme connectivity and orchestration.</p><a className="btn btn-gradient" href={`/request-demo/?product=${it.product}`}>Talk to an expert</a></div>
    </div>
  </>
)

/** Summary-only article (RS-PLACEHOLDER: full text pending; the read/view count is a sample. Owner: marketing). */
const Summary: React.FC<{ it: Insight }> = ({ it }) => (
  <>
    <Toc items={it.type === "whitepaper" ? [["summary", "Summary"], ["download", "Download PDF"]] : [["summary", "Summary"]]} />
    <div className="article-body"><div id="summary" style={{ scrollMarginTop: "120px" }}></div><p className="intro">{it.summary}</p>
      {it.type === "whitepaper"
        ? <PdfBlock it={it} />
        : <NextStep title="Want to go deeper?" text="Talk to our payments specialists about how this applies to your organisation." href="/contact/?topic=sales" label="Talk to an expert" />}
    </div>
  </>
)

/** Insight article (/insights/<slug>/): video preview, full case study, or summary with a next step / PDF download; then related insights. */
const InsightTemplate: React.FC<PageProps<object, Ctx>> = ({ pageContext: { it, related } }) => {
  const video = it.type === "video"
  return (
    <Layout active="insights">
      <div className="article-top"><div className="container">
        <a className="back-link" href="/insights/">← All insights</a>
        <div className="article-head mt-16"><div><h1>{it.title}</h1><p className="article-date">{`Published ${it.date} · ${it.metric}`}</p></div><div className="icard__tags"><InsightTags it={it} /></div></div>
        {video ? <VideoSim it={it} /> : <MediaBanner id={`insight.${it.slug}.banner`} fallback={`${it.img}.webp`} className="article-hero-img" width={1600} height={744} />}
      </div></div>
      <div className="container"><div className="article" data-placeholder={it.full ? undefined : "article-text"}>
        {video
          ? <div className="article-body" style={{ gridColumn: "1/-1", maxWidth: "820px" }}><p className="intro">{`${it.summary} This session is presented by RS Software engineers and runs on production-grade infrastructure.`}</p>
              <NextStep title="See it on your own rails" text="Book a live walkthrough with our engineers, tailored to your payment flows." href={`/request-demo/?product=${it.product}`} label="Book a live demo" /></div>
          : it.full ? <CaseStudy it={it} /> : <Summary it={it} />}
      </div></div>
      <section className="section-compact bg-subtle"><div className="container"><h2 className="title" style={{ fontSize: "24px", marginBottom: "24px" }}>Related insights</h2><ul className="grid grid-3 rel-scroll" style={{ listStyle: "none" }}>{related.map(r => <InsightCard key={r.slug} it={r} />)}</ul></div></section>
    </Layout>
  )
}
export default InsightTemplate

export const Head: HeadFC<object, Ctx> = ({ pageContext: { it, media } }) => (
  <Seo title={it.title} description={it.summary} path={`/insights/${it.slug}/`} ogImage={slotImage(media, `insight.${it.slug}.banner`, `${it.img || "clocks"}.webp`)} />
)
