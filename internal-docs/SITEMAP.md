# RS Software — sitemap

Every page of the site, its address, the file that renders it and where its words live.
Domain `https://www.rssoftware.com` · 47 indexed pages (in `sitemap-index.xml`) · plus `/sitemap/` (HTML sitemap) and `/404.html` (noindex).

Old addresses: every page except Home also answers at its old static-site address (`/about.html`, `/people/raj-jain.html`…), which redirects here (`src/lib/redirects.ts`).

## Home

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/` | RS Software — Payments-only software. Globally. | `src/templates/home.tsx` | `content/home.md` |

## About Us

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/about/` | About Us | `src/templates/about.tsx` | `content/about.md + content/team/` |
| `/people/r-ramaraj/` | R. Ramaraj — Chairman | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/raj-jain/` | Raj Jain — CEO & Managing Director | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/richard-launder/` | Richard Launder — Director | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/sarita-jain/` | Sarita Jain — Director | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/cs-mohan/` | Cedarampattu S Mohan — Director | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/peter-sweers/` | Peter Sweers — Director | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/samik-roy/` | Samik Roy — Chief Operating Officer | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/vijendra-surana/` | Vijendra Surana — CFO and Company Secretary | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/sumit-misra/` | Sumit Misra — Chief Innovation Officer | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/sunetra-bhattacharya/` | Sunetra Bhattacharya — Human Resources | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/sujit-banerjee/` | Sujit Shankar Banerjee — General Manager | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/abhishek-gupta/` | Abhishek Gupta — Global Head of Pre-sales & GTM Strategy (Digital Payment Products) | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/people/aniruddha-rai-chaudhuri/` | Aniruddha Rai Chaudhuri — General Manager | `src/templates/person.tsx` | `content/team/<slug>.md` |
| `/our-culture/` | Our Culture | `src/pages/our-culture.tsx` | in the page file |

## Products

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/products/bill-edge/` | RS Bill@Edge™ — Bill Presentment & Payment Platform | `src/templates/product.tsx` | `content/products/<slug>/` |
| `/products/payabbhi/` | Payabbhi® — Payment Acceptance & Acquiring Platform | `src/templates/product.tsx` | `content/products/<slug>/` |
| `/products/digitaledge/` | RS DigitalEdge™ — Unified Payment Modernization Platform | `src/templates/product.tsx` | `content/products/<slug>/` |
| `/products/intelliedge/` | RS IntelliEdge™ — AI Fraud & Risk Management | `src/templates/product.tsx` | `content/products/<slug>/` |

## News

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/news/chainit-rs-software-alliance/` | ChainIT and RS Software Form Alliance to Bring Risk-Based Authentication to Account-to-Account Payments | `src/templates/news.tsx` | `src/lib/content/news.ts` |
| `/news/times-of-india-raj-jain-vision-tech/` | The Times of India interviews our MD Raj Jain at the Vision-Tech event of Indian Chamber of Commerce | `src/templates/news.tsx` | `src/lib/content/news.ts` |
| `/news/pre-diwali-gift/` | RS Software receives a pre-Diwali gift! | `src/templates/news.tsx` | `src/lib/content/news.ts` |
| `/news/` | News | `src/pages/news.tsx` | `src/lib/content/news.ts` |

## Investor Relations

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/investor/` | Investor Relations | `src/pages/investor.tsx` | `src/lib/content/investor.ts + static/assets/js/investors-data.js` |

## Insights

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/insights/tier-1-bank-scheme-integration/` | Tier-1 bank cuts scheme integration time by 40% | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/regional-processor-false-positives/` | Regional processor reduces false-positive fraud alerts by 63% | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/fraud-interdiction-live-demo/` | Fraud interdiction in under 200ms — live demo | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/multi-rail-orchestration-explained/` | Multi-rail orchestration explained | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/iso-20022-before-migrating/` | ISO 20022: what banks need to know before migrating | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/state-of-real-time-payments-2026/` | The state of real-time payments in 2026 | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/request-to-pay-walkthrough/` | Request-to-pay: a practical walkthrough | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/three-decades-of-impact/` | RS Software recognised by Finacom for three decades of impact | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/generative-ai-point-to-point-integration/` | IntelliEdge adds generative AI to point-to-point integration | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/iso-20022-migration-guide/` | ISO 20022 migration guide — step by step | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/open-banking-interoperability/` | Open banking interoperability: the infrastructure gap | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/building-trust-fednow-era/` | Building trust in the FedNow era | `src/templates/insight.tsx` | `src/lib/content/insights.ts` |
| `/insights/` | RS Insights | `src/pages/insights.tsx` | `src/lib/content/insights.ts` |

## Careers

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/careers/payment-systems-engineer/` | Payment Systems Engineer — Careers | `src/templates/job.tsx` | `src/lib/content/careers.ts` |
| `/careers/data-scientist/` | Data Scientist — Careers | `src/templates/job.tsx` | `src/lib/content/careers.ts` |
| `/careers/product-manager/` | Product Manager — Careers | `src/templates/job.tsx` | `src/lib/content/careers.ts` |
| `/careers/` | Careers | `src/pages/careers.tsx` | `src/lib/content/careers.ts` |
| `/careers/apply/` | Apply — Careers | `src/pages/careers/apply.tsx` | `src/lib/content/careers.ts` |

## Contact

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/contact/` | Contact Us | `src/pages/contact.tsx` | in the page file |
| `/request-demo/` | Request a Demo | `src/pages/request-demo.tsx` | in the page file |
| `/sandbox/` | Access the Sandbox | `src/pages/sandbox.tsx` | in the page file |

## Legal

| URL | Page title | Rendered by | Content |
|---|---|---|---|
| `/legal/` | Legal & Privacy | `src/pages/legal.tsx` | in the page file |

## Utility

| URL | Rendered by |
|---|---|
| `/sitemap/` | `src/templates/sitemap.tsx` (list built in `src/lib/content/sitemap.ts`) |
| `/404.html` | `src/pages/404.tsx` |
