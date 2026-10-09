import * as React from "react"
import { RS_MARK } from "../../lib/coin"

/** Decorative animated coin bearing the official RS mark (paths unaltered). `uid` keeps gradient ids unique on the page. */
const Coin: React.FC<{ className?: string; uid: number }> = ({ className = "", uid }) => {
  const k = `c${uid}`
  const svg = `<defs><linearGradient id="${k}r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7dc92"/><stop offset=".45" stop-color="#c8963a"/><stop offset=".7" stop-color="#e8c26a"/><stop offset="1" stop-color="#9c6d22"/></linearGradient>
<radialGradient id="${k}f" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#f9e2a0"/><stop offset=".55" stop-color="#dcb05a"/><stop offset="1" stop-color="#b48434"/></radialGradient>
<linearGradient id="${k}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<clipPath id="${k}c"><circle cx="100" cy="100" r="92"/></clipPath></defs>
<circle cx="100" cy="100" r="96" fill="url(#${k}r)"/><circle cx="100" cy="100" r="86" fill="url(#${k}f)"/>
<circle cx="100" cy="100" r="79" fill="none" stroke="#fff5d6" stroke-opacity=".45" stroke-width="1.2"/>
<g transform="translate(50.2 49.95) scale(1.82)"><g transform="translate(.5 .6)" fill="#fff4cf" opacity=".55">${RS_MARK}</g><g fill="#a97a2c" opacity=".9">${RS_MARK}</g></g>
<g clip-path="url(#${k}c)"><g transform="rotate(20 100 100)"><rect class="rs-coin__shine" x="-60" y="-40" width="46" height="280" fill="url(#${k}s)"/></g></g>`
  return (
    <span className={`rs-coin ${className}`} aria-hidden="true">
      <span className="rs-coin__body"><svg viewBox="0 0 200 200" focusable="false" dangerouslySetInnerHTML={{ __html: svg }} /></span>
    </span>
  )
}
export default Coin
