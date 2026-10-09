import * as React from "react"
import Icon from "../../ui/Icon"
import { useMedia, mediaAttrs } from "../../ui/Media"
import { TYPES, PNAME, THUMB, TICON, type Insight } from "../../../lib/content/insights"

/** Type tag, plus the product tag when the insight is about one product. */
export const InsightTags: React.FC<{ it: Insight }> = ({ it }) => (
  <>
    <span className={`tag tag--${it.type}`}>{TYPES[it.type]}</span>
    {it.product && <span className={`tag tag--${it.product}`}>{PNAME[it.product]}</span>}
  </>
)

/** Listing / related card. data-type and data-product drive the filters on /insights/ (assets/js/main.js). */
export const InsightCard: React.FC<{ it: Insight }> = ({ it }) => {
  const [a, b] = THUMB[it.type]
  /* Card picture: content/media.md → insight.<slug>.thumb (image=…); without one, the colour gradient */
  const t = useMedia(`insight.${it.slug}.thumb`)
  return (
    <li><a className="icard" href={`/insights/${it.slug}/`} data-type={it.type} data-product={it.product}>
      <div className={`icard__thumb${t.image ? " icard__thumb--img" : ""}`} style={{ background: `linear-gradient(135deg,${a},${b})` }} {...mediaAttrs(t)}>
        {t.image && <img className="icard__img" src={`/assets/img/${t.image}`} alt="" loading="lazy" />}
        {it.type === "video" ? <span className="icard__play"><Icon name="play" /></span> : <span className="icard__type-ico"><Icon name={TICON[it.type]} /></span>}
      </div>
      <div className="icard__body"><span className="icard__metric">{it.metric}</span><h3>{it.title}</h3><p>{it.summary}</p>
        <div className="icard__tags"><InsightTags it={it} /></div><span className="icard__date">{it.date}</span></div></a></li>
  )
}

/** Filter dropdown: white 12px-radius button, blue when active, popover list (behaviour in assets/js/main.js). */
export const Dropdown: React.FC<{ id: string; label: string; allLabel: string; options: Record<string, string> }> = ({ id, label, allLabel, options }) => (
  <div className="dd" id={id} data-dd="" data-value="">
    <button type="button" className="dd__btn" aria-haspopup="listbox" aria-expanded="false" aria-controls={`${id}-list`}><span className="dd__label" data-default={label}>{label}</span><Icon name="chev" className="dd__chev" /></button>
    <ul className="dd__menu" id={`${id}-list`} role="listbox" aria-label={label} hidden>
      <li role="option" tabIndex={-1} data-value="" aria-selected="true">{allLabel}</li>
      {Object.entries(options).map(([k, v]) => <li key={k} role="option" tabIndex={-1} data-value={k} aria-selected="false">{v}</li>)}
    </ul>
  </div>
)
