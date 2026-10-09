import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import Portrait from "../components/ui/Portrait"
import { html } from "../lib/html"
import type { PersonPage } from "../lib/content/team"

type Ctx = { data: PersonPage }

/** Leadership profile (/people/<slug>/), one per content/team/<slug>.md. Previous / next follow the About page order. */
const PersonTemplate: React.FC<PageProps<object, Ctx>> = ({ pageContext: { data: { person: p, prev, next, groups, first } } }) => (
  <Layout active="about">
    <article className="profile">
      <div className="profile__cover"><div className="container profile__wrap"><a className="back-link profile__back" href="/about/#leadership">← Back to Leadership</a></div></div>
      <div className="container profile__wrap">
        <header className="profile__head">
          <Portrait name={p.name} photo={p.photo} className="profile__photo" />
          <div className="profile__id">
            <span className="eyebrow">{groups}</span>
            <h1>{p.name}</h1>
            <p className="profile__role">{`${p.role}, RS Software`}</p>
            {p.linkedin && <a className="profile__li" href={p.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>}
          </div>
        </header>
        <section className="profile__about" aria-labelledby="about-h">
          <h2 id="about-h" className="title">About <em>{first}</em></h2><div className="bar"></div>
          <div className="profile__bio" dangerouslySetInnerHTML={html(p.bioHtml)} />
        </section>
        <nav className="profile__pager" aria-label="More leaders">
          <a href={`/people/${prev.slug}/`}><small>← Previous</small><b>{prev.name}</b></a>
          <a href={`/people/${next.slug}/`} className="is-next"><small>Next →</small><b>{next.name}</b></a>
        </nav>
      </div>
    </article>
  </Layout>
)
export default PersonTemplate

export const Head: HeadFC<object, Ctx> = ({ pageContext: { data: { person: p } } }) => (
  <Seo title={`${p.name} — ${p.role}`} description={`${p.name}, ${p.role} at RS Software. ${p.bioText.slice(0, 140)}…`}
    path={`/people/${p.slug}/`} ogImage={p.photo ? `assets/img/team/${p.photo}` : "assets/img/about-rails.svg"} />
)
