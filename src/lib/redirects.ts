/* Old addresses of the static site (…/about.html) → the clean addresses of this site (/about/).
   GitHub Pages has no server-side redirects, so gatsby-node.ts (onPostBuild) writes a small HTML page at each old
   address: meta refresh + canonical + a script that keeps ?query and #hash + a visible link. These are client-side
   redirects, not HTTP 301s (docs/deploy.md). /index.html needs no entry: it is the home page itself.
   This list is frozen history: keep entries even if a page is later removed (point them somewhere sensible). */

const LEGACY = [
  "about", "our-culture", "investor", "news", "insights", "careers", "contact", "request-demo", "sandbox", "legal", "sitemap",
  "products/bill-edge", "products/payabbhi", "products/digitaledge", "products/intelliedge",
  "people/abhishek-gupta", "people/aniruddha-rai-chaudhuri", "people/cs-mohan", "people/peter-sweers", "people/r-ramaraj",
  "people/raj-jain", "people/richard-launder", "people/samik-roy", "people/sarita-jain", "people/sujit-banerjee",
  "people/sumit-misra", "people/sunetra-bhattacharya", "people/vijendra-surana",
  "news/chainit-rs-software-alliance", "news/pre-diwali-gift", "news/times-of-india-raj-jain-vision-tech",
  "insights/building-trust-fednow-era", "insights/fraud-interdiction-live-demo", "insights/generative-ai-point-to-point-integration",
  "insights/iso-20022-before-migrating", "insights/iso-20022-migration-guide", "insights/multi-rail-orchestration-explained",
  "insights/open-banking-interoperability", "insights/regional-processor-false-positives", "insights/request-to-pay-walkthrough",
  "insights/state-of-real-time-payments-2026", "insights/three-decades-of-impact", "insights/tier-1-bank-scheme-integration",
  "careers/apply", "careers/data-scientist", "careers/payment-systems-engineer", "careers/product-manager",
]

/** [old path, new path] e.g. ["/about.html", "/about/"] */
export const REDIRECTS: [string, string][] = LEGACY.map(p => [`/${p}.html`, `/${p}/`])

/** The redirect page written at an old address. */
export const redirectPage = (to: string, siteUrl: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${siteUrl}${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head>
<body>
<p>This page has moved to <a href="${to}">${siteUrl}${to}</a>.</p>
</body>
</html>
`
