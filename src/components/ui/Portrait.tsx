import * as React from "react"
import { asset } from "../../lib/site"

type Props = { name: string; photo: string; className: string }

const initials = (name: string): string => {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter(w => /^\p{L}/u.test(w))
  if (!parts.length) return ""
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()
}

/** Leadership portrait: the approved photo (static/assets/img/team/) if set, otherwise initials on the RS gradient in the same frame. */
const Portrait: React.FC<Props> = ({ name, photo, className }) =>
  photo
    ? <img className={className} src={asset(`img/team/${photo}`)} alt={name} width={480} height={480} loading="lazy" />
    : <span className={`${className} monogram`} role="img" aria-label={name}><span>{initials(name)}</span></span>
export default Portrait
