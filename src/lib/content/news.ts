/* News: media mentions and press releases about RS Software (/news/ and /news/<slug>/). Ported from gen/p_news.py.
   Content follows the live newsroom (rssoftware.ai/home/news-list). Newest first.

   Per story (strings are HTML: write & as &amp;):
     summary   one-line standfirst (shown on the card and as the lead)
     points    optional highlights
     body      optional full text, one string per paragraph — paste the approved release here
     img       starting banner picture; change banners in content/media.md (news.<slug>.banner), not here
     clipping  true when there is a newspaper clipping image at static/assets/img/news/<slug>.webp
               (until the file exists the page shows "Clipping image coming soon") */
import type { ProductKey } from "../site"

export type NewsStory = {
  slug: string; cat: string; source: string; date: string; img: string; product: ProductKey | ""
  title: string; summary: string; dateline: string; points: string[]; body: string[]; clipping: boolean
}

export const NEWS: NewsStory[] = [
  {
    slug: "chainit-rs-software-alliance", cat: "Press release", source: "Joint press release · ChainIT &amp; RS Software",
    date: "3 Aug 2026", img: "ops-room", product: "intelliedge",
    title: "ChainIT and RS Software Form Alliance to Bring Risk-Based Authentication to Account-to-Account Payments",
    summary: "Joint offering assesses identity and fraud risk on transactions for instant payment networks.",
    dateline: "Scottsdale, Arizona",
    points: [
      "A product alliance to close fraud gaps in instant, irrevocable account-to-account payments, such as the FedNow® Service and the RTP® network.",
      "Identity and fraud risk are assessed continuously on every transaction, in under a second. RS IntelliEdge™ contributes behavioural, device and contextual signals; ChainIT adds biometric identity verification (ChainIT ID and ChainIT Organization ID) and Validated Data Tokens.",
      "Each decision returns a continuously updated risk score, a plain-language rationale and a signed, tamper-evident record of who authorised the payment.",
      "The framework feeds institutions’ existing fraud platforms — no core migration or system replacement — and the institution keeps control of every fraud decision.",
      "Integration is planned for ChainIT Pay, RS DigitalEdge™ and Payabbhi®.",
      "Proof-of-concept engagements of eight to twelve weeks are open to financial institutions, third-party service providers, credit union service organisations and payment service providers.",
    ],
    body: [], clipping: false,
  },
  {
    slug: "times-of-india-raj-jain-vision-tech", cat: "Media coverage", source: "The Times of India · Business Times",
    date: "15 Jul 2025", img: "about-hero", product: "",
    title: "The Times of India interviews our MD Raj Jain at the Vision-Tech event of Indian Chamber of Commerce",
    summary: "Interview with RS Software MD Raj Jain at the Indian Chamber of Commerce Vision-Tech event, published in The Times of India, Business Times, on 15 July 2025.",
    dateline: "", points: [], body: [], clipping: true,
  },
  {
    slug: "pre-diwali-gift", cat: "Media coverage", source: "The Times of India · Print, page 21",
    date: "13 Nov 2023", img: "community", product: "",
    title: "RS Software receives a pre-Diwali gift!",
    summary: "Coverage in The Times of India, published 11 November 2023 on page 21.",
    dateline: "", points: [], body: [], clipping: true,
  },
]

/** Up to three other stories for "More news". */
export const moreNews = (n: NewsStory) => NEWS.filter(x => x.slug !== n.slug).slice(0, 3)
