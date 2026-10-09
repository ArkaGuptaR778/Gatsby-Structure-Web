/* Leadership: content/team/<slug>.md, one file per person (ported from gen/team.py). Build time only.
   The file name is the profile address: team/raj-jain.md → /people/raj-jain/. */
import * as fs from "fs"
import * as path from "path"
import * as md from "../md"

export type Person = {
  slug: string; name: string; role: string
  board: number | null; executive: number | null
  /** File name in static/assets/img/team/, or "" (the card then shows initials) */
  photo: string; linkedin: string; bioHtml: string; bioText: string
}

const teamPhotos = () => path.resolve(process.cwd(), "static/assets/img/team")
const num = (v?: string) => (v && /^\d+$/.test(v) ? parseInt(v, 10) : null)

export const loadTeam = (): Person[] => {
  const dir = path.join(md.contentDir(), "team")
  return fs.readdirSync(dir).sort().filter(f => f.endsWith(".md") && !f.startsWith("_") && !f.startsWith("README")).map(f => {
    const [meta, body] = md.frontMatter(md.read(`team/${f}`))
    const slug = f.slice(0, -3)
    let photo = (meta.photo || "").trim()
    if (photo && !fs.existsSync(path.join(teamPhotos(), photo))) {
      console.warn(`  ! team/${f}: photo "${photo}" not found in static/assets/img/team/ — showing initials`)
      photo = ""
    }
    return {
      slug, name: meta.name || slug, role: meta.role || "", board: num(meta.board), executive: num(meta.executive),
      photo, linkedin: (meta.linkedin || "").trim(), bioHtml: md.toHtml(body),
      bioText: md.blocks(body).filter(b => b[0] === "p").map(b => b[1] as string).join(" "),
    }
  })
}

export const board = (people: Person[]) => people.filter(p => p.board).sort((a, b) => (a.board as number) - (b.board as number))
export const executives = (people: Person[]) => people.filter(p => p.executive).sort((a, b) => (a.executive as number) - (b.executive as number))

export const initials = (name: string): string => {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter(w => /^\p{L}/u.test(w))
  if (!parts.length) return ""
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()
}

/** Profile pages: board first, then executives, each person once; previous / next wrap around. */
export const profileOrder = (people: Person[]): Person[] => {
  const seen = new Set<string>()
  return [...board(people), ...executives(people)].filter(p => (seen.has(p.slug) ? false : (seen.add(p.slug), true)))
}

export type PersonPage = { person: Person; prev: Person; next: Person; groups: string; first: string }
export const loadPeoplePages = (): PersonPage[] => {
  const order = profileOrder(loadTeam())
  return order.map((p, i) => ({
    person: p,
    prev: order[(i - 1 + order.length) % order.length],
    next: order[(i + 1) % order.length],
    groups: [["Board of Directors", p.board], ["Key Executives", p.executive]].filter(([, on]) => on).map(([g]) => g).join(" · "),
    first: p.name.startsWith("R.") ? p.name : p.name.split(/\s+/)[0],
  }))
}
