/* RS Insights: case studies, videos, whitepapers and blog posts (/insights/ and /insights/<slug>/). Ported from gen/p_insights.py.
   Plain text (no HTML). Read/view/download counts are samples (RS-PLACEHOLDER); only the first case study has full text.
   Whitepapers: drop the PDF at static/assets/docs/<slug>.pdf and the download button goes live. */
import type { ProductKey } from "../site"

export type InsightType = "casestudy" | "video" | "whitepaper" | "blog"
export type Insight = {
  slug: string; type: InsightType; product: ProductKey | ""; date: string; metric: string
  title: string; summary: string
  /** Starting hero image static/assets/img/<img>.webp (not used by videos). Change pictures in content/media.md
   *  (insight.<slug>.banner and insight.<slug>.thumb), not here. */
  img?: string
  /** Video running time */
  dur?: string
  /** Has the full case-study text (CASE_STUDY) */
  full?: boolean
}

export const TYPES: Record<InsightType, string> = { casestudy: "Case Study", video: "Video", whitepaper: "Whitepaper", blog: "Blog" }
/** Short product names used on insight tags and filters ("" = company-wide) */
export const PNAME: Record<string, string> = { billedge: "Bill@Edge", intelliedge: "IntelliEdge", digitaledge: "DigitalEdge", payabbhi: "Payabbhi", "": "RS Software" }
/** Card thumbnail gradient per type */
export const THUMB: Record<InsightType, [string, string]> = { casestudy: ["#ec4899", "#f472b6"], video: ["#0075b7", "#14b8a6"], whitepaper: ["#f97316", "#eab308"], blog: ["#8b5cf6", "#06b6d4"] }
export const TICON = { casestudy: "briefcase", whitepaper: "book", blog: "pen", video: "video" } as const

export const INSIGHTS: Insight[] = [
  { slug: "tier-1-bank-scheme-integration", type: "casestudy", product: "digitaledge", date: "10 Feb 2025", metric: "Reads · 4.2k", img: "clocks",
    title: "Tier-1 bank cuts scheme integration time by 40%", summary: "A leading European bank modernised payment orchestration using an API-first connectivity layer, setting a new benchmark for the industry.", full: true },
  { slug: "regional-processor-false-positives", type: "casestudy", product: "intelliedge", date: "14 Jan 2025", metric: "Reads · 3.1k", img: "ops-room",
    title: "Regional processor reduces false-positive fraud alerts by 63%", summary: "Real-time ML scoring models trained on network-specific velocity data cut false positives without affecting approval rates." },
  { slug: "fraud-interdiction-live-demo", type: "video", product: "intelliedge", date: "10 Feb 2025", metric: "Views · 9.8k", dur: "4:32",
    title: "Fraud interdiction in under 200ms — live demo", summary: "Our engineering team demonstrates sub-200ms transaction scoring across 10,000 concurrent live transactions." },
  { slug: "multi-rail-orchestration-explained", type: "video", product: "digitaledge", date: "28 Jan 2025", metric: "Views · 6.3k", dur: "6:05",
    title: "Multi-rail orchestration explained", summary: "How DigitalEdge routes transactions across Visa, Mastercard, and local schemes with real-time waterfall logic." },
  { slug: "iso-20022-before-migrating", type: "whitepaper", product: "digitaledge", date: "10 Feb 2025", metric: "Downloads · 2.7k", img: "ops-room",
    title: "ISO 20022: what banks need to know before migrating", summary: "Message translation, timeline planning, compliance risk, and hidden costs of deferred migration explained in detail." },
  { slug: "state-of-real-time-payments-2026", type: "whitepaper", product: "digitaledge", date: "15 Jan 2025", metric: "Downloads · 1.9k", img: "clocks",
    title: "The state of real-time payments in 2026", summary: "Global survey of 200 payment executives on instant rails adoption, fraud rates, and infrastructure maturity across 34 markets." },
  { slug: "request-to-pay-walkthrough", type: "blog", product: "billedge", date: "18 Feb 2025", metric: "Reads · 5.5k", img: "ops-room",
    title: "Request-to-pay: a practical walkthrough", summary: "Breaking down the R2P message flow and what it means for how banks present payment requests to retail customers." },
  { slug: "three-decades-of-impact", type: "blog", product: "", date: "03 Dec 2024", metric: "Reads · 8.1k", img: "community",
    title: "RS Software recognised by Finacom for three decades of impact", summary: "A 30-year journey from a Calcutta-based startup to a globally recognised payments engineering organisation." },
  { slug: "generative-ai-point-to-point-integration", type: "blog", product: "intelliedge", date: "02 Mar 2025", metric: "Reads · 7.2k", img: "patent",
    title: "IntelliEdge adds generative AI to point-to-point integration", summary: "Using LLMs to auto-generate adapters and accelerate scheme certification from 18 months to under 6." },
  { slug: "iso-20022-migration-guide", type: "video", product: "digitaledge", date: "05 Dec 2024", metric: "Views · 4.4k", dur: "8:47",
    title: "ISO 20022 migration guide — step by step", summary: "A structured walkthrough of migrating from MT to MX message formats without disrupting existing payment flows." },
  { slug: "open-banking-interoperability", type: "whitepaper", product: "payabbhi", date: "22 Nov 2024", metric: "Downloads · 3.3k", img: "clocks",
    title: "Open banking interoperability: the infrastructure gap", summary: "Why 70% of open banking initiatives stall at year two and what payments middleware can close the connectivity gap." },
  { slug: "building-trust-fednow-era", type: "blog", product: "intelliedge", date: "11 Jan 2025", metric: "Reads · 2.8k", img: "ops-room",
    title: "Building trust in the FedNow era", summary: "How real-time payment fraud patterns are shifting with instant rails — and what banks should embed in their risk stack." },
]

/** Full text of the case study marked `full`: [section id, heading (null = intro), paragraphs ("IMG" = the operations photo)] */
export const CASE_STUDY: [string, string | null, string[]][] = [
  ["intro", null, ["For Tier-1 banks, integrating with payment schemes like Visa, Mastercard, and local networks has historically been a slow, resource-intensive process. One leading European bank recently achieved a 40% reduction in scheme integration time by adopting a modern API-first payment orchestration platform, setting a new benchmark for the industry."]],
  ["challenge", "The challenge of legacy integration", [
    "Traditional payment scheme integrations require banks to navigate complex certification processes, proprietary message formats, and bespoke connectivity requirements for each network. A single scheme integration could take 12–18 months, consuming significant engineering resources and delaying time-to-market for new payment products.",
    "Legacy middleware stacks compound the problem — tightly coupled systems mean that updating one integration often risks destabilising others. With the rise of instant payments, open banking mandates, and cross-border interoperability requirements, banks face mounting pressure to modernise their connectivity infrastructure.",
    "IMG"]],
  ["approach", "API-first approach to scheme connectivity", [
    "The bank partnered with a payment orchestration provider to implement a unified API abstraction layer that sits between their core banking systems and external scheme endpoints. This layer normalises message formats (ISO 20022, ISO 8583), handles certification workflows, and provides pre-built connectors for major card networks and local payment rails.",
    "By decoupling scheme-specific logic from core processing, the bank's engineering teams can now onboard new payment networks through configuration rather than custom development. The platform's sandbox environment enables parallel certification testing, eliminating the sequential bottlenecks that previously stretched timelines. Automated compliance checks and real-time transaction monitoring are built into the orchestration layer, reducing manual oversight."]],
  ["results", "Measurable results and ROI", [
    "Within the first year of deployment, the bank reduced average scheme integration time from 14 months to 8.5 months — a 40% improvement. Engineering teams previously allocated to maintenance were redeployed to innovation projects, including tokenisation services and real-time fraud detection capabilities.",
    "Transaction processing costs decreased by 22% due to intelligent routing across multiple acquirers, while authorization approval rates improved by 1.8 percentage points through optimised retry logic and network-specific formatting. The platform now processes over 2.3 billion transactions annually across 15 payment schemes in 23 markets."]],
  ["outlook", "Looking ahead: the future of payment infrastructure", [
    "The success of this integration model is driving broader industry adoption. As real-time payment schemes like EPI in Europe and FedNow in the US gain traction, banks that invest in flexible orchestration layers will be best positioned to rapidly onboard new rails without rebuilding core infrastructure.",
    "Emerging standards like ISO 20022 migration, network tokenisation, and request-to-pay frameworks will further reward institutions with modular, API-driven architectures. The bank plans to extend its orchestration platform to support embedded finance use cases and Banking-as-a-Service offerings, leveraging the same connectivity layer to serve fintech partners and corporate clients."]],
]

/** Up to three insights about the same product or of the same type. */
export const relatedInsights = (it: Insight) => INSIGHTS.filter(x => x.slug !== it.slug && (x.product === it.product || x.type === it.type)).slice(0, 3)
