/* About Us: content/about.md (+ content/team/ for the leadership cards) → the data the about template renders.
   Ported from gen/p_company.py about(). Build time only. Strings ending in "Html" are HTML rendered from Markdown;
   section eyebrows and titles are HTML-escaped here because <HeadBlock> renders HTML (other pages put <em> in titles). */
import * as md from "../md"
import { loadTeam, board, executives, initials, type Person } from "./team"
import type { IconName } from "../icons"

const sec = (S: Record<string, md.Section>, k: string): md.Section => S[k] ?? { settings: {}, body: "" }

export const loadAbout = () => {
  const [meta, text] = md.frontMatter(md.read("about.md"))
  const S = md.sections(text)
  const hero = sec(S, "hero"), what = sec(S, "what-we-do"), cult = sec(S, "culture"), phil = sec(S, "philosophy")
  const vals = sec(S, "values"), lead = sec(S, "leadership").settings, comm = sec(S, "community"), pat = sec(S, "patent")
  const people = loadTeam()
  const strip = (p: Person) => ({ slug: p.slug, name: p.name, role: p.role, photo: p.photo })
  return {
    title: meta.page_title || "About Us", description: meta.description || "",
    hero: { title: hero.settings.title || "About Us", html: md.toHtml(hero.body) },
    what: {
      eyebrow: md.esc(what.settings.eyebrow || ""), title: md.esc(what.settings.title || ""), ledeHtml: md.inline(what.settings.lede || ""),
      cards: md.items(what.body).map(([t, d, o]) => ({ titleHtml: t, descHtml: d, icon: (o.icon || "link") as IconName })),
    },
    culture: {
      eyebrow: md.esc(cult.settings.eyebrow || ""), title: md.esc(cult.settings.title || ""), ledeHtml: md.inline(cult.settings.lede || ""),
      html: md.toHtml(cult.body, "about-lead"), author: cult.settings.author || "", authorRole: cult.settings.author_role || "",
      authorInitials: initials(cult.settings.author || "RS"), link: cult.settings.link_text || "Read more",
    },
    philosophy: {
      eyebrow: md.esc(phil.settings.eyebrow || ""), title: md.esc(phil.settings.title || ""), html: md.toHtml(phil.body, "about-quote"),
      link: phil.settings.link_text || "Read more",
    },
    values: {
      eyebrow: md.esc(vals.settings.eyebrow || ""), title: md.esc(vals.settings.title || ""), ledeHtml: md.inline(vals.settings.lede || ""),
      items: md.items(vals.body).map(([t, , o]) => ({ titleHtml: t, color: o.color || "#c6f06b", icon: (o.icon || "users") as IconName })),
    },
    leadership: {
      eyebrow: md.esc(lead.eyebrow || "Leadership"), boardTitle: md.esc(lead.board_title || "Board of Directors"), executiveTitle: md.esc(lead.executive_title || "Key Executives"),
      board: board(people).map(strip), executives: executives(people).map(strip),
    },
    community: {
      eyebrow: md.esc(comm.settings.eyebrow || ""), title: md.esc(comm.settings.title || ""), html: md.toHtml(comm.body, "about-body"),
      link: comm.settings.link_text || "Read more",
    },
    patent: {
      eyebrow: md.esc(pat.settings.eyebrow || ""), title: md.esc(pat.settings.title || ""), heading: pat.settings.heading || "", subtitle: pat.settings.subtitle || "",
      html: md.toHtml(pat.body), button: pat.settings.button || "Talk To Expert", buttonLink: md.cleanUrl(pat.settings.button_link || "contact.html"),
    },
  }
}
export type AboutData = ReturnType<typeof loadAbout>
export type PersonCard = AboutData["leadership"]["board"][number]
