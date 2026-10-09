import * as React from "react"
import Icon from "../../ui/Icon"
import { productByKey } from "../../../lib/site"
import { html } from "../../../lib/html"
import type { NewsStory } from "../../../lib/content/news"

/** Category tag, plus the product tag when the story is about one product. */
export const NewsTags: React.FC<{ n: NewsStory }> = ({ n }) => (
  <>
    <span className="tag tag--news">{n.cat}</span>
    {n.product && <span className={`tag tag--${n.product}`}>{productByKey(n.product)?.name}</span>}
  </>
)

export const NewsCard: React.FC<{ n: NewsStory }> = ({ n }) => (
  <a className="news-card reveal" href={`/news/${n.slug}/`}>
    <div className="news-card__meta"><span className="news-card__cat">{n.cat.toUpperCase()}</span><span>{n.date}</span></div>
    <h3 dangerouslySetInnerHTML={html(n.title)} /><p className="news-card__src" dangerouslySetInnerHTML={html(n.source)} /><p dangerouslySetInnerHTML={html(n.summary)} />
    <span className="news-card__more">Read more <Icon name="arrow" /></span>
  </a>
)
