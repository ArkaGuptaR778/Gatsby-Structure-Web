import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/layout/Seo"
import { NewsCard, NewsTags } from "../components/sections/news/NewsCard"
import { asset } from "../lib/site"
import { esc, html } from "../lib/html"
import { MediaBanner, slotImage } from "../components/ui/Media"
import type { MediaMap } from "../lib/content/media"
import type { NewsStory } from "../lib/content/news"

type Ctx = { slug: string; story: NewsStory; more: NewsStory[]; media?: MediaMap }

/** Story body as HTML: lead, highlights, full text, newspaper clipping. The clipping keeps its inline onerror
 *  fallback ("coming soon") so it works before any script runs. */
const storyHtml = (n: NewsStory): [string, [string, string][]] => {
  const toc: [string, string][] = [["summary", "Summary"]]
  let s = `<div id="summary" style="scroll-margin-top:120px"></div><p class="intro">${n.dateline ? n.dateline + " — " : ""}${n.summary}</p>`
  if (n.points.length) {
    toc.push(["highlights", "Highlights"])
    s += `<h2 id="highlights">Highlights</h2><ul class="news-points">${n.points.map(p => `<li>${p}</li>`).join("")}</ul>`
  }
  if (n.body.length) {
    toc.push(["story", "Full story"])
    s += `<h2 id="story">Full story</h2>${n.body.map(p => `<p>${p}</p>`).join("")}`
  }
  if (n.clipping) {
    toc.push(["coverage", "Coverage"])
    s += `<figure class="news-clip" id="coverage"><img src="${asset(`img/news/${n.slug}.webp`)}" alt="Newspaper clipping: ${esc(n.title)}" loading="lazy" onerror="this.parentNode.classList.add('is-empty')"><figcaption>${n.source}, ${n.date}</figcaption><p class="news-clip__empty">Clipping image coming soon.</p></figure>`
  }
  return [s, toc]
}

/** News story (/news/<slug>/): teal article top, contents list + body, then more news. */
const NewsTemplate: React.FC<PageProps<object, Ctx>> = ({ pageContext: { story: n, more } }) => {
  const [body, toc] = storyHtml(n)
  return (
    <Layout active="news">
      <div className="article-top"><div className="container">
        <a className="back-link" href="/news/">← All news</a>
        <div className="article-head mt-16"><div><h1 dangerouslySetInnerHTML={html(n.title)} /><p className="article-date" dangerouslySetInnerHTML={html(`${n.date} · ${n.source}`)} /></div><div className="icard__tags"><NewsTags n={n} /></div></div>
        <MediaBanner id={`news.${n.slug}.banner`} fallback={`${n.img}.webp`} className="article-hero-img" width={1600} height={744} />
      </div></div>
      <div className="container"><div className="article">
        <nav className="toc" aria-label="On this page"><ol>{toc.map(([id, t], k) => <li key={id}><a href={`#${id}`} className={k === 0 ? "is-active" : undefined}>{t}</a></li>)}</ol></nav>
        <div className="article-body" dangerouslySetInnerHTML={html(body)} />
      </div></div>
      {more.length > 0 && (
        <section className="section-compact bg-subtle"><div className="container"><h2 className="title" style={{ fontSize: "24px", marginBottom: "24px" }}>More news</h2><div className="grid grid-3 rel-scroll">{more.map(r => <NewsCard key={r.slug} n={r} />)}</div></div></section>
      )}
    </Layout>
  )
}
export default NewsTemplate

export const Head: HeadFC<object, Ctx> = ({ pageContext: { story: n, media } }) => (
  <Seo title={n.title.replace(/&amp;/g, "&")} description={n.summary} path={`/news/${n.slug}/`} ogImage={slotImage(media, `news.${n.slug}.banner`, `${n.img}.webp`)} />
)
