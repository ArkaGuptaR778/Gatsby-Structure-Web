/* Product page sections (markup mirrors the static site so assets/css/rs.css applies unchanged).
   Text arrives as small HTML strings rendered from content/products/<slug>/*.md. */
import * as React from "react"
import Icon from "../../ui/Icon"
import { asset } from "../../../lib/site"
import { MediaSlot, useMedia, mediaAttrs } from "../../ui/Media"
import { STAKE_SVG, CAP_ICONS } from "../../../lib/illustrations"
import type { IconName } from "../../../lib/icons"
import type { ProductData, RegionContent, Metric, Cap } from "../../../lib/content/product"

const html = (s: string) => ({ __html: s })
const cssVars = (v: Record<string, string>) => v as React.CSSProperties

/** One wrapper per region: Global visible, the others hidden until the header region picker selects them
 *  (static/assets/js/main.js → applyRegion). A product with only global.md needs no wrappers. */
const Variants: React.FC<{ group: string; regions: RegionContent[]; render: (r: RegionContent) => React.ReactNode }> = ({ group, regions, render }) => {
  if (regions.length === 1 && regions[0].region === "global") return <>{render(regions[0])}</>
  return <>{regions.map(r => (
    <div key={r.region} data-region-group={group} data-region-content={r.region} hidden={r.region !== "global"}>{render(r)}</div>
  ))}</>
}

const STAT_COLOURS = ["var(--rs-status-success)", "#1f6fc4", "#8b3fe0"]
/** Three metrics. `placeholder` (from the content file) marks figures that still need verifying. */
export const Stats: React.FC<{ metrics: Metric[]; placeholder?: string }> = ({ metrics, placeholder }) => (
  <div className="grid grid-3" {...(placeholder ? { "data-placeholder": "product-kpis" } : {})}>
    {metrics.map((m, i) => (
      <div key={i} className="reveal">
        <div className="stat__val" style={{ color: STAT_COLOURS[i] }} data-count={m.value}>{m.value}</div>
        <div className="stat__lab" dangerouslySetInnerHTML={html(m.labelHtml)} />
        <div className="stat__desc" dangerouslySetInnerHTML={html(m.descHtml)} />
      </div>
    ))}
  </div>
)

export const Caps: React.FC<{ caps: Cap[]; color: string }> = ({ caps, color }) => (
  <div className="caps">
    {caps.map((c, i) => (
      <div key={i} className="cap reveal" style={cssVars({ "--c": color })}>
        <div className="cap__top"><span className="cap__ico"><Icon name={CAP_ICONS[i % CAP_ICONS.length] as IconName} /></span><b dangerouslySetInnerHTML={html(c.titleHtml)} /></div>
        <p dangerouslySetInnerHTML={html(c.descHtml)} />
      </div>
    ))}
  </div>
)

/** Illustrative dashboard beside the hero (visual slot product.<slug>.dashboard in content/media.md) (figures from shared.md → ## dashboard). */
const Dash: React.FC<{ d: ProductData["shared"]["dash"]; mediaId: string }> = ({ d, mediaId }) => {
  const k = [...d.kpis, ...Array(Math.max(0, 4 - d.kpis.length)).fill({ valueHtml: "", labelHtml: "", deltaHtml: "" })]
  const Up = ({ x }: { x: string }) => (x ? <span className="up" dangerouslySetInnerHTML={html(x)} /> : null)
  return (
    <div className="dash reveal" aria-hidden="true" data-media={mediaId} {...(d.placeholder ? { "data-placeholder": "product-dashboard" } : {})}>
      <div className="dash__win"><div className="dash__dots"><i style={{ background: "#ff5f57" }}></i><i style={{ background: "#febc2e" }}></i><i style={{ background: "#28c840" }}></i></div>
        <div className="dash__head" dangerouslySetInnerHTML={html(`${d.titleHtml}<small>${d.monthHtml}</small>`)} />
        <div className="dash__kpis">
          <div className="kpi kpi--solid"><b dangerouslySetInnerHTML={html(k[0].valueHtml)} /><small dangerouslySetInnerHTML={html(k[0].labelHtml)} /><Up x={k[0].deltaHtml} /></div>
          <div className="kpi"><b dangerouslySetInnerHTML={html(k[1].valueHtml)} /><small dangerouslySetInnerHTML={html(k[1].labelHtml)} /><Up x={k[1].deltaHtml} /></div>
        </div>
        <div className="chart"><div className="chart__t" dangerouslySetInnerHTML={html(d.chartHtml)} /><div className="bars">{[55, 72, 76, 86, 79, 62, 48].map((h, i) => <span key={i} style={cssVars({ "--h": `${h}%` })}></span>)}</div>
          <div className="bars-x">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(x => <span key={x}>{x}</span>)}</div></div></div>
      <div className="float-kpi float-kpi--a"><b dangerouslySetInnerHTML={html(k[2].valueHtml)} /><small dangerouslySetInnerHTML={html(k[2].labelHtml)} /><Up x={k[2].deltaHtml} /></div>
      <div className="float-kpi float-kpi--b"><b dangerouslySetInnerHTML={html(k[3].valueHtml)} /><small dangerouslySetInnerHTML={html(k[3].labelHtml)} /><Up x={k[3].deltaHtml} /></div>
    </div>
  )
}

export const ProductHero: React.FC<{ d: ProductData }> = ({ d: { page: p, shared: C } }) => (
  <section className="p-hero" id="overview" style={cssVars({ "--c": p.color, "--tint": p.tint })}>
    <div className="container split">
      <div className="reveal">
        <span className="eyebrow">{C.hero.eyebrow}</span>
        <h1><img className="p-hero__logo" src={asset("img/" + p.logo.src)} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} /><span className="sr-only">{p.srName}</span></h1>
        <p className="p-hero__tag" dangerouslySetInnerHTML={html(C.hero.taglineHtml)} />
        <div className="p-hero__cta"><a className="btn btn-accent" href={`/request-demo/?product=${p.key}`}>{C.hero.demo} <Icon name="arrow" /></a><a className="btn btn-accent-outline" href={`/sandbox/?product=${p.key}`}>{C.hero.sandbox}</a></div>
        <span className="p-hero__pill" dangerouslySetInnerHTML={html(C.hero.pillHtml)} />
      </div>
      <MediaSlot id={`product.${p.slug}.dashboard`} imgClassName="media reveal" videoClassName="media reveal" videoStyle={{ aspectRatio: "4 / 3", overflow: "hidden" }}><Dash d={C.dash} mediaId={`product.${p.slug}.dashboard`} /></MediaSlot>
    </div>
  </section>
)

export const Intro: React.FC<{ d: ProductData }> = ({ d }) => (
  <section className="section p-intro" style={cssVars({ "--c": d.page.color })}><div className="container">
    <Variants group="intro" regions={d.regions} render={r => (
      <div className="timeline reveal" style={cssVars({ "--tl": d.page.color })}><h2 dangerouslySetInnerHTML={html(r.introTitleHtml)} /><div className="prose" dangerouslySetInnerHTML={html(r.introHtml)} /></div>
    )} />
  </div></section>
)

/** "See it in action": the terminal replays the steps in shared.md → ## simulation (static/assets/js/main.js). */
export const LiveDemo: React.FC<{ d: ProductData }> = ({ d: { page: p, shared: C } }) => (
  <div style={cssVars({ "--c": p.color })}>
    <section className="section-compact"><div className="container"><div className="action reveal">
      <MediaSlot id={`product.${p.slug}.demo`} imgClassName="media" videoClassName="media" videoStyle={{ aspectRatio: "16 / 10", overflow: "hidden" }}>
      <div className="sim" id="live-demo" data-media={`product.${p.slug}.demo`} data-lines={JSON.stringify(C.sim)} role="region" aria-label="Live transaction simulation">
        <div className="sim__log" aria-live="polite"><div className="dim on">{`// ${C.name} — live transaction simulation`}</div><div className="dim on">// press play to run</div></div>
        <button className="sim__play" type="button" aria-label="Play simulation"><Icon name="play" /></button>
        <button className="sim__replay" type="button">↺ Replay</button></div>
      </MediaSlot>
      <div><span className="kicker">{C.live.kicker}</span><h3 dangerouslySetInnerHTML={html(C.live.titleHtml)} /><ul>{C.live.pointsHtml.map((x, i) => <li key={i} dangerouslySetInnerHTML={html(x)} />)}</ul>
        <a className="link-arrow mt-24" style={{ color: "var(--c)" }} href={`/request-demo/?product=${p.key}`}>{C.live.link}</a></div>
    </div></div></section>
  </div>
)

export const Metrics: React.FC<{ d: ProductData }> = ({ d }) => (
  <section className="p-stats" data-observe=""><div className="container">
    <Variants group="metrics" regions={d.regions} render={r => <Stats metrics={r.metrics} placeholder={r.metricsPlaceholder} />} />
  </div></section>
)

/** "Designed for every participant in the ecosystem" carousel (shared.md → ## participants). */
export const Participants: React.FC<{ d: ProductData }> = ({ d: { page: p, shared: C } }) => {
  const items = C.stake
  const m = useMedia(`product.${p.slug}.participants`)
  /* Icons: the built-in drawings, or the files given with icons=… in content/media.md (one per participant, in order) */
  const icon = (i: number) => (m.icons && m.icons[i] ? `<img src="/assets/img/${m.icons[i]}" alt="" style="width:min(460px,92%);height:auto">` : STAKE_SVG[i % 4])
  if (!items.length) return null
  const data = JSON.stringify(items.map(s => ({ title: s.title, desc: s.desc, color: s.color, bg: `linear-gradient(135deg,${s.from},${s.to})` })))
  return (
    <div className="stake reveal" id="participants" data-stepper={data} data-interval="3500">
      <div className="stake__text"><span className="hww__kicker">{C.stakeKicker}</span>
        <div className="hww__dots" role="tablist" aria-label="Participants">{items.map((s, i) => <button key={i} type="button" role="tab" data-step={i} aria-label={s.title}></button>)}</div>
        <span className="hww__num" data-field="num" style={{ color: "var(--sc)" }}>{`01 / 0${items.length}`}</span>
        <h3 className="stake__title" data-field="title">{items[0].title}</h3><p className="stake__desc" data-field="desc">{items[0].desc}</p>
        <div className="stake__nav">{items.map((s, i) => <button key={i} type="button" data-step={i}>{s.title}</button>)}</div></div>
      <div className="stake__visual" data-bg="" {...mediaAttrs(m)}>{items.map((s, i) => <div key={i} data-icon={i} style={{ color: s.color }} dangerouslySetInnerHTML={html(icon(i))} />)}</div>
    </div>
  )
}

const EYEBROW_STYLE: React.CSSProperties = { fontSize: "clamp(18px,1.8vw,22px)", color: "#4b5563" }
const WHY_TITLE_STYLE: React.CSSProperties = { fontWeight: 700, color: "#0b1f3a" }

/** Why section, regional (Bill@Edge, Payabbhi, DigitalEdge). */
export const Why: React.FC<{ d: ProductData }> = ({ d }) => (
  <div style={cssVars({ "--c": d.page.color })}>
    <section className="section"><div className="container">
      <Variants group="why" regions={d.regions} render={r => (
        <>
          <span className="eyebrow reveal" style={EYEBROW_STYLE} dangerouslySetInnerHTML={html(r.whyEyebrowHtml)} />
          <div className="timeline mt-16 reveal">
            {r.whyTitleHtml && <h2 className="statement statement--sm" style={WHY_TITLE_STYLE} dangerouslySetInnerHTML={html(r.whyTitleHtml)} />}
            <div className={`prose${r.whyTitleHtml ? " mt-24" : ""}`} style={{ color: "#475569" }} dangerouslySetInnerHTML={html(r.whyHtml)} />
          </div>
          {r.capsLabel && <span className="eyebrow mt-48 reveal">{r.capsLabel}</span>}
          <Caps caps={r.caps} color={d.page.color} />
          {r.closingHtml && <div className="prose mt-32 reveal" style={{ color: "#475569" }} dangerouslySetInnerHTML={html(r.closingHtml)} />}
        </>
      )} />
      <Participants d={d} />
    </div></section>
  </div>
)

/** Why section with audience tabs (IntelliEdge: For Bank / For Central); its metrics band follows the selected tab. */
export const TabbedWhy: React.FC<{ d: ProductData }> = ({ d }) => {
  const sfx = (r: string) => (r === "global" ? "" : `-${r}`)
  return (
    <div style={cssVars({ "--c": d.page.color })}>
      <section className="section"><div className="container">
        <Variants group="why" regions={d.regions} render={r => (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap" }} className="reveal">
              <span className="eyebrow" style={{ ...EYEBROW_STYLE, margin: 0 }} dangerouslySetInnerHTML={html(r.whyEyebrowHtml)} />
              <div className="seg" role="tablist" data-tabs="" aria-label="Audience">
                {r.tabs.map((t, i) => (
                  <button key={t.key} role="tab" id={`t-${t.key}${sfx(r.region)}`} aria-controls={`w-${t.key}${sfx(r.region)} s-${t.key}${sfx(r.region)}`}
                    aria-selected={i === 0 ? "true" : "false"} {...(i === 0 ? {} : { tabIndex: -1 })}>{t.label}</button>
                ))}
              </div>
            </div>
            {r.tabs.map((t, i) => (
              <div key={t.key} id={`w-${t.key}${sfx(r.region)}`} role="tabpanel" hidden={i !== 0}>
                <div className="timeline mt-32" style={cssVars({ "--x": "0" })}>
                  <h2 className="statement statement--sm" style={WHY_TITLE_STYLE} dangerouslySetInnerHTML={html(t.titleHtml)} />
                  {t.parasHtml.map((x, j) => <p key={j} className="prose mt-24" style={{ color: "#475569" }} dangerouslySetInnerHTML={html(x)} />)}
                </div>
                {(t.whyTitleHtml || t.whyParasHtml.length > 0) && (
                  <div className="timeline mt-48" style={cssVars({ "--x": "0" })}>
                    {t.whyTitleHtml && <h3 className="statement statement--sm" style={WHY_TITLE_STYLE} dangerouslySetInnerHTML={html(t.whyTitleHtml)} />}
                    {t.whyParasHtml.map((x, j) => <p key={j} className={`prose${t.whyTitleHtml || j > 0 ? " mt-24" : ""}`} style={{ color: "#475569" }} dangerouslySetInnerHTML={html(x)} />)}
                  </div>
                )}
                <Caps caps={t.caps} color={d.page.color} />
              </div>
            ))}
          </>
        )} />
        <Participants d={d} />
      </div></section>
      <section className="p-stats" data-observe=""><div className="container">
        <Variants group="metrics" regions={d.regions} render={r => (
          <>{r.tabs.map((t, i) => (
            <div key={t.key} id={`s-${t.key}${sfx(r.region)}`} role="tabpanel" hidden={i !== 0}><Stats metrics={t.metrics} placeholder={t.metricsPlaceholder} /></div>
          ))}</>
        )} />
      </div></section>
    </div>
  )
}

export const Closing: React.FC<{ d: ProductData }> = ({ d: { shared: C } }) => (
  <section className="section-compact"><div className="container"><div className="timeline reveal" style={{ maxWidth: "900px" }}>
    <p className="statement statement--close" dangerouslySetInnerHTML={html(C.closeTitleHtml)} />
    {C.closeHtml.map((x, i) => <p key={i} className="prose mt-24" style={{ color: "#1f2937" }} dangerouslySetInnerHTML={html(x)} />)}
  </div></div></section>
)

export const KnowMore: React.FC<{ d: ProductData }> = ({ d: { page: p, shared: C } }) => (
  <section className="section"><div className="container"><div className="know reveal" style={cssVars({ "--c": p.color })}>
    <h2 dangerouslySetInnerHTML={html(C.know.titleHtml)} /><p dangerouslySetInnerHTML={html(C.know.textHtml)} />
    <a className="btn btn-white" href={`/insights/?product=${p.key}`}>{C.know.button} <Icon name="arrow" /></a>
  </div></div></section>
)
