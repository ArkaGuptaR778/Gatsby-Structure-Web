import * as React from "react"

type Props = { eyebrow: string; title: string; lede?: string; center?: boolean; extraClass?: string }

/** Sub-section heading: eyebrow + title + gradient bar (+ optional lede). All three strings are HTML
 *  (titles carry <em> accents, e.g. "Reports &amp; <em>results</em>"). Mirrors head_block() in the static site. */
const HeadBlock: React.FC<Props> = ({ eyebrow, title, lede = "", center = false, extraClass = "" }) => (
  <div className={`head${center ? " head--center" : ""} ${extraClass} reveal`}>
    <span className="eyebrow" dangerouslySetInnerHTML={{ __html: eyebrow }} />
    <h2 className="title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="bar"></div>
    {lede && <p className="lede" dangerouslySetInnerHTML={{ __html: lede }} />}
  </div>
)
export default HeadBlock
