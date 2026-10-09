# RS Software Website: Task List & Prompts

Incremental build plan for the Gatsby 5 + TypeScript + Tailwind rebuild of www.rssoftware.com. Each task is one commit. Run them in order, in Claude Code or Cursor, by pasting the task's prompt.

## How to use

1. Start a fresh session per task. Paste the **Prompt** block of the task.
2. The agent implements only that task, verifies it (typecheck + build), and stops with a suggested commit message. It never commits.
3. **You test the site locally** (`npm run develop`, and `npm run build && npm run serve` for build-sensitive changes). Only when you're satisfied, you commit to `main` and push it yourself.
4. Mark the task `DONE` in the table below.

Status legend: `TODO` · `DONE` · `BLOCKED` (a mockup or content is missing; do not start).

## Decisions that apply to every task

- **Stack**: Gatsby 5, React 18, TypeScript (strict), Tailwind 3. Static output only, no runtime server.
- **Hosting**: GitHub Pages (static files only). No server-side redirects, headers, rewrites or functions. See T012 and T019 for how that's handled. Assume the custom domain `www.rssoftware.com` (site served from the root, no `pathPrefix`).
- **Design source of truth**: `internal-docs/DESIGN-SYSTEM.html` (tokens, type roles, components, rules). Page layouts come from `internal-docs/mockups/`.
- **URLs**: clean URLs with a trailing slash (`/about/`, `/insights/<slug>/`, `/products/bill-edge/`). The legacy `.html` paths in `internal-docs/SITEMAP.md` are handled by redirects (T012).
- **Content**: MDX and JSON files under `content/`, sourced with `gatsby-source-filesystem`. Pages are created in `gatsby-node.ts`. Use realistic placeholder copy until real content is supplied, and keep it in `content/` so it is easy to swap.
- **Forms**: every form submits through the adapter from T004. The backend (self-hosted on AWS or a SaaS platform) is undecided. Never hard-code a vendor.
- **Product slugs** (canonical): `bill-edge`, `payabbhi`, `digitaledge`, `intelliedge`. The mockup files are named RBE, Payaabhi, RDE and RSIE respectively.
- **Insights**: one content collection with a `type` field (`blog`, `whitepaper`, `case-study`, `video`, `news`, `docs`) that selects the detail template. URLs stay flat: `/insights/<slug>/`.

## Hard rule: never commit

Agents must **never** run `git add`, `git commit`, `git push`, `git stash`, `git reset`, branch creation or any command that changes git state or history, until the user has manually tested the site locally. The user alone commits to `main` and pushes. This overrides every other instruction, including any that says to commit or push. Agents only *suggest* a commit message (`/generate-commit`).

## Standing rules (repeated in each prompt)

- Read `CLAUDE.md`, the named mockup(s) and the relevant `DESIGN-SYSTEM.html` sections before coding.
- Match the mockup. Where the mockup and design system disagree, follow the design system for tokens and the mockup for layout.
- Reuse existing components and tokens; don't duplicate. Keep scope to this task.
- Responsive: fluid layout per the design system (max-width 1248px, `clamp()` gutters). It must work at 375px, 768px and 1440px.
- Accessibility: semantic HTML, alt text, visible focus, keyboard-operable menus, accordions and tabs.
- Finish by running `npm run typecheck` and `npm run build`. Fix all errors. Then stop, ask me to test locally, and print a suggested commit message in the form `[Tnnn] Title` followed by one-line bullets. Never commit, stage or push (see the hard rule above).

## Task index

| ID | Title | Mockup(s) | Status |
|---|---|---|---|
| T001 | Foundation & design tokens | n/a | TODO |
| T002 | Site shell: header, footer, layout | any page (header/footer) | TODO |
| T003 | UI primitives | DESIGN-SYSTEM.html | TODO |
| T004 | Forms infrastructure | Careers details.jpg | TODO |
| T005 | Homepage | Homepage Final.jpg | TODO |
| T006 | Product template + Bill@Edge | RBE.jpg | TODO |
| T007 | Payabbhi, DigitalEdge, IntelliEdge | Payaabhi.jpg, RDE.jpg, RSIE.jpg | TODO |
| T008 | Insights content model + landing | Insight Landing Page.png | TODO |
| T009 | Insight detail templates | Blogs.png, Whitepapers.png, Case Study Page Detais V1.png / V2 ( Image ONLY).png, Video Page Details.png | TODO |
| T010 | Careers landing | Career.jpg | TODO |
| T011 | Job detail + application | Careers details.jpg | TODO |
| T012 | Redirects, SEO, sitemap | n/a | TODO |
| T013 | About Us + Our Culture | none | BLOCKED |
| T014 | People pages (13) | none | BLOCKED |
| T015 | News list + detail | none | BLOCKED |
| T016 | Investor Relations | none | BLOCKED |
| T017 | Contact, Request Demo, Sandbox | none | BLOCKED |
| T018 | Legal & 404 | none | BLOCKED |
| T019 | Final QA & launch prep | all | TODO |

Sitemap coverage: Home → T005 · Products (4) → T006–T007 · Insights (1 + 12) → T008–T009 · Careers (5) → T010–T011 · About/Culture → T013 · People (13) → T014 · News (1 + 3) → T015 · Investor → T016 · Contact/Request Demo/Sandbox → T017 · Legal/404 → T018.

---

## T001: Foundation & design tokens

**Prompt**

```
Task T001: Foundation & design tokens for the RS Software Gatsby site.

Read first: CLAUDE.md, internal-docs/DESIGN-SYSTEM.html (colors, typography, layout, radius, shadows, gradients, raw tokens sections), internal-docs/PROMPTS.md (decisions section).

Do:
1. Extend tailwind.config.js theme with the design-system tokens: brand/neutral/product colors (rs-blue, rs-blue-hover, rs-teal, rs-teal-light, rs-navy, rs-navy-footer, surface, surface-subtle, text primary/secondary/muted, border, divider, hero #1a1a1a, product accents Bill@Edge #EA6C00, Payabbhi #A8397F, DigitalEdge #0F766E, IntelliEdge #6D28D9), font families (ui = Radio Canada Big, body/display = Inter, serif = Source Serif 4, mono = Geist Mono with JetBrains Mono fallback, toc = Outfit, testimonial = Arimo, legal = Noto Sans), border radii (2/9/10/12/16/20/24/999), box shadows (card, card-elevated, popover), background gradients (brand wash, cta, accent bar, stat band, success panel, deep navy), max-width 1248px, section spacing (48/80/112), nav height 99px.
2. Also expose the raw tokens as CSS custom properties in src/styles/global.css (:root) using the --rs-* names from the design system, so non-Tailwind CSS can use them.
3. Load fonts (Google Fonts preconnect + stylesheet, or self-hosted via gatsby-ssr.tsx `onRenderBody`). Add Geist Mono if practical. Otherwise fall back to JetBrains Mono.
4. Base styles in global.css: body font/color/antialiasing, heading defaults, focus ring, selection color = teal-light, smooth scroll (respect prefers-reduced-motion).
5. Create the folder conventions and add a short README section in CLAUDE.md: src/components/{layout,ui,sections,forms}, src/templates, src/lib, content/{insights,products,jobs,team,news}, and add ./content and templates to tailwind `content` globs.
6. Add a reusable <Seo /> component (title template "%s | RS Software", description, canonical from siteMetadata.siteUrl, OpenGraph/Twitter) for use with Gatsby's Head API.
7. Set siteMetadata.siteUrl to https://www.rssoftware.com and title/description appropriately in gatsby-config.ts.
8. Replace the starter src/pages/index.tsx and 404.tsx content with minimal placeholders that use the tokens. Do not build the real pages yet.

Acceptance: `npm run develop` shows a placeholder page in the right fonts/colors; typecheck and build pass; no starter inline-style code remains.

Do not build header/footer or components (later tasks). Finish with typecheck + build and print a commit message "[T001] Foundation & design tokens" with bullets. Never commit, stage or push; I test locally and commit myself.
```

---

## T002: Site shell: header, footer, layout

**Prompt**

```
Task T002: Site shell (header, footer, layout).

Read first: CLAUDE.md, internal-docs/DESIGN-SYSTEM.html (Navigation, Footer, layout rules, "Teal underline = you are here"), the header and footer in internal-docs/mockups/Homepage Final.jpg and Insight Landing Page.png.

Build in src/components/layout:
1. Header: logo (RS◇ software, use an SVG placeholder and put it in src/images/), primary nav with About ▾, Products ▾, People ▾, Careers, and a "Talk To Expert" outlined button on the right. Fixed/sticky, 99px tall, rounded bottom corners (20px), white background, blue link text (#0075b7). Active route = bold + 2px teal underline (no pills). Dropdowns per design system (12px row radius, popover shadow; product rows show a small icon tile in the product accent color). Menu contents are driven by src/lib/navigation.ts:
   - About: About Us (/about/), Our Culture (/our-culture/), News (/news/), Investor Relations (/investor/)
   - Products: Bill@Edge, Payabbhi, DigitalEdge, IntelliEdge (/products/<slug>/)
   - People: the 13 leaders (/people/<slug>/), grouped Board / Leadership if there is room
   - Careers (/careers/), Insights (/insights/)
   - Talk To Expert -> /contact/
   Accessible: keyboard operable dropdowns (Enter/Space/Esc/arrow keys), aria-expanded, focus trap not required. Mobile: hamburger with an accordion drawer under 1024px.
2. Footer: blue (#1e72bd) background, logo left, four columns (Contact: Contact Us, Offices, Socials · Solution: Real-time payments, Fraud & risk, Bill payments & collections, Developer platforms · Resource: Docs, Community Forum, Professional Services, Events, Developer API, Insights · Company: About, Blog, Careers, Press, Inclusion, Leadership, ESG), region selector pill ("India") bottom-left (visual only for now), and a white bottom bar: "© RS Software. Payments-only. Globally." on the left and Terms · Privacy (Updated 08/2022) · Sitemap on the right. Footer link targets in src/lib/navigation.ts; use "#" placeholders where the destination page doesn't exist yet and leave a TODO comment.
3. Layout component (src/components/layout/Layout.tsx) wrapping header + <main id="main"> + footer, with a "Skip to content" link. Export a way for a page to pick the background (e.g. `variant="plain" | "teal-wash"`), since inner pages use a teal→white gradient behind the header.
4. Wire Layout into the placeholder pages from T001.

Acceptance: header/footer match the mockups at 1440px, collapse correctly at 375px, keyboard navigation works, active state shows on the current route. Typecheck + build pass.

Do not create the destination pages. Finish with typecheck + build and print commit message "[T002] Site shell: header, footer, layout". Never commit, stage or push; I test locally and commit myself.
```

---

## T003: UI primitives

**Prompt**

```
Task T003: Reusable UI primitives.

Read first: CLAUDE.md, internal-docs/DESIGN-SYSTEM.html (Headlines, Components, Rules sections), and skim the mockups (Homepage Final.jpg, Career.jpg, RBE.jpg, Insight Landing Page.png) to see how each primitive is used.

Build typed, documented-by-props components in src/components/ui:
- Button / ButtonLink (variants: solid #0075b7 with hover #005a8e and mono label, gradient CTA 134deg #0075b7→#14b8a6, outline, dashed). Renders <a>/<Link> or <button> as appropriate.
- GiantHeading: the signature hero word (Inter 800–900, clamp(64px,12vw,200px), uppercase, -0.03em, centered; `tone="light"` #1a1a1a or `tone="dark"` white + blue text-shadow). One per page.
- SectionHeading: eyebrow (navy uppercase) + title with an optional highlighted phrase in brand blue + 56×4px gradient bar; `align` left/center.
- Pill / Tag (content-type and product variants: Blog pink, Whitepaper blue, Case study purple, Video green, News orange, Docs teal, product name grey, per Insight Landing Page.png).
- StatBand + Stat (gradient #e6fbf8→#e7dff7, value/label/description).
- TestimonialCard (Arimo, subtle gradient overlay, avatar).
- JobCard (title, mono meta, serif description, "View role" button, `dashed` variant for Open application).
- Accordion (single- or multi-open, animated, aria-compliant, chevron icon) as used on the Careers page.
- Tabs (accessible, roving tabindex) as used in "Who We Serve" on the homepage.
- ProductCard (icon tile in product accent, tagline, bullets, "Learn more").
- CtaBanner (gradient panel with heading, text and one or two buttons), e.g. "Ready to integrate?" and "Know more about this Product".
- Container / Section wrapper implementing max-width 1248px, padding-inline clamp(20px,6.6vw,96px), and compact/normal/spacious vertical spacing.
- Icon set: a small src/components/ui/icons.tsx with the few inline SVG icons needed (chevron, arrow, play, upload, external-link, menu, close, search, document).

Add a dev-only review page at src/pages/_kit.tsx (exclude it from the sitemap and mark noindex; remove it in T019) showing every primitive and variant.

Acceptance: every primitive matches the design-system spec (radii, shadows, fonts), works at 375px, and is keyboard accessible. Typecheck + build pass.

Do not build page sections. Finish with typecheck + build and print commit message "[T003] UI primitives". Never commit, stage or push; I test locally and commit myself.
```

---

## T004: Forms infrastructure

**Prompt**

```
Task T004: Forms infrastructure with a swappable backend.

Context: the forms backend is undecided (self-hosted on AWS vs a SaaS platform). Do NOT integrate any vendor. Build the front-end layer so a backend can be plugged in later.

Read first: CLAUDE.md, internal-docs/DESIGN-SYSTEM.html (form grid, radii, buttons), internal-docs/mockups/Careers details.jpg (Job application form: labels, inputs, textarea, file upload row, consent checkbox, submit button) and the hero email capture in Homepage Final.jpg.

Build in src/components/forms and src/lib/forms:
1. Field components: TextField, EmailField, PhoneField, SelectField, TextareaField, FileField (drag/click, shows the file name, allowed types and max size, "Upload" button as in the mockup), CheckboxField (2px radius, blue check), each with label, required marker, hint and accessible error message (aria-describedby, aria-invalid).
2. A small useForm hook (no heavy dependencies; if you add one, prefer react-hook-form and justify) with declarative validation rules (required, email, phone, min length, file type/size) and a two-column responsive form grid helper.
3. Submission adapter interface in src/lib/forms/adapter.ts:
   type FormSubmission = { formId: string; fields: Record<string,string>; files?: Record<string,File>; meta: { page: string; timestamp: string } }
   interface FormAdapter { submit(s: FormSubmission): Promise<{ ok: true } | { ok: false; error: string }> }
   Provide `consoleAdapter` (logs and resolves after a short delay, the default) and read the active adapter from a single module (src/lib/forms/index.ts) so swapping is a one-line change. Read an optional GATSBY_FORMS_ENDPOINT env var for a generic JSON POST adapter (`httpAdapter`) but keep it unused by default.
4. FormShell component handling submitting/success/error states (success panel uses the "Success panel" gradient with a "Send another message" outline button), plus honeypot spam field and a `formId` prop.
5. Write docs/forms.md (short): how the adapter works, how to add an AWS (API Gateway + Lambda/SES/S3 for CV uploads) or SaaS adapter later, and the fields each form collects (job application, contact, request demo, sandbox access, newsletter/email capture).

Acceptance: a demo form on the _kit page (from T003) validates, shows errors, uploads a file selection, and reaches the success state through consoleAdapter. Typecheck + build pass.

Do not build real page forms yet. Finish with typecheck + build and print commit message "[T004] Forms infrastructure". Never commit, stage or push; I test locally and commit myself.
```

---

## T005: Homepage

**Prompt**

```
Task T005: Homepage (/).

Read first: CLAUDE.md, internal-docs/mockups/Homepage Final.jpg (view it at full size, section by section), internal-docs/DESIGN-SYSTEM.html. Page title: "RS Software: Payments-only software. Globally."

Build src/pages/index.tsx from section components in src/components/sections/home/, using the Layout and the primitives from T002–T004. Sections, in order:
1. Hero: teal wash background with a dotted-wave decoration, pill "Real-time, Already payment infrastructure", H1 "Build and run payment systems the world can trust", supporting paragraph, an email capture (T004 form, id "home-talk-to-expert", button "Talk To Our Expert") plus a text link "Design Your Payment Roadmap →", and a "Trusted by the world's leading organisations" logo row (stripe, Pinterest, KPMG, Mercedes-Benz, P&G, TELUS; use text/SVG placeholders, not scraped logos).
2. "30 Years" block: large number, "in payments-only software" badge, caption, and a video placeholder area (16:9, black poster with play button; accept a video URL from content).
3. Who We Serve: section heading + audience tabs (Central Banks & Schemes, Banks & PSPs, Fintechs & PSPs, Billers & Merchants); each tab shows a headline, link ("Explore bank & PSP journey →") and a 2×2 grid of small capability tiles.
4. What we build: heading "From national rails to developer platforms." and four product cards (IntelliEdge, Payabbhi, DigitalEdge, Bill@Edge) with product-accent top border and bullet lists, linking to /products/<slug>/. The cluster of floating product logos on the right is decorative.
5. Why RS: heading "From India's digital rails to global payment ecosystems." with two paragraphs.
6. Testimonials: "Driving Payment Transformation", three TestimonialCards.
7. How We Work: stepper/carousel card ("Vision & Blueprint" step with diagram placeholder); 3–4 steps from content, keyboard-accessible.
8. Insights CTA: "Get some Insight & Perspectives on the future of payments." with a "Go to Insight" button linking to /insights/ over the globe illustration area (use a CSS gradient/SVG placeholder).
Then the standard footer.

Put all copy in content/home.json (or a typed src/data/home.ts) so it is easy to edit; keep the tab, product and testimonial data as arrays.

Acceptance: visually close to the mockup at 1440px, sensible at 768px and 375px, tabs and carousel are keyboard accessible, email capture submits through the adapter. Typecheck + build pass.

Do not create the linked pages. Finish with typecheck + build and print commit message "[T005] Homepage". Never commit, stage or push; I test locally and commit myself.
```

---

## T006: Product page template + Bill@Edge

**Prompt**

```
Task T006: Product page template and the Bill@Edge page (/products/bill-edge/).

Read first: CLAUDE.md, internal-docs/mockups/RBE.jpg (full size), internal-docs/DESIGN-SYSTEM.html (product accent colors are local to the page: icon tiles and accents only, never full-page backgrounds beyond the hero wash shown in the mockup). Page title: "RS Bill@Edge™: Bill Presentment & Payment Platform".

Build:
1. content/products/bill-edge.json holding all page content: name, tagline, accent color, eyebrow ("RS PRODUCTS"), hero CTAs (Request Demo → /request-demo/, Access Sandbox → /sandbox/), hero badge, hero dashboard mock data, intro headline (with highlighted phrase) and paragraphs, video (title, description, poster/url), stats (1.1B+ Bills Processed, 5B+ Bills (Scalable), 21K+ Billers), "Why" headline/paragraph, 9 feature tiles (title + short description + icon key), audience carousel ("Designed for every participant in the ecosystem": Banks, Billers, Fintechs, Consumers, each with tabs "Vision & Blueprint / Build & Run / Evolve with AI"), closing statement, and final CTA ("Know more about this Product" with an Insight button linking to /insights/?product=bill-edge).
2. gatsby-node.ts: createPages from content/products/*.json using a typed template src/templates/product.tsx at /products/<slug>/. Add the JSON to source-filesystem and use GraphQL (or `gatsby-transformer-json`) with typed queries.
3. Template sections in src/components/sections/product/: ProductHero (accent-tinted gradient wash, heading in Inter with accent-colored product name, floating dashboard card built in HTML/CSS from the mock data: KPI tiles, bar chart, floating stat chips), IntroBlock (left accent rule, highlighted phrase in teal), VideoPanel (light-blue panel, video placeholder, description), StatBand (from T003), WhyGrid (headline + 3×3 feature tiles with icon), AudienceCarousel, StatementBlock, CtaBanner (gradient in accent color).
4. Everything the template needs to vary per product (accent color, gradient, hero visual variant) comes from the JSON so T007 requires content only wherever possible.

Acceptance: /products/bill-edge/ matches RBE.jpg closely at 1440px, is responsive, accent color only appears where the mockup shows it, typecheck + build pass.

Do not create the other three product pages. Finish with typecheck + build and print commit message "[T006] Product template + Bill@Edge page". Never commit, stage or push; I test locally and commit myself.
```

---

## T007: Payabbhi, DigitalEdge, IntelliEdge

**Prompt**

```
Task T007: Remaining product pages: Payabbhi, DigitalEdge, IntelliEdge.

Read first: CLAUDE.md, internal-docs/mockups/Payaabhi.jpg, RDE.jpg, RSIE.jpg (all full size), and the template from T006 (src/templates/product.tsx, content/products/bill-edge.json).

Do:
1. Add content/products/payabbhi.json (accent #A8397F, title "Payabbhi®: Payment Acceptance & Acquiring Platform"), digitaledge.json (accent #0F766E, "RS DigitalEdge™: Unified Payment Modernization Platform") and intelliedge.json (accent #6D28D9, "RS IntelliEdge™: AI Fraud & Risk Management"). Take headlines, feature tiles, stats and copy from each mockup; where the mockup text is unreadable or lorem, write plausible placeholder copy in the same tone and mark it with a `"placeholder": true` flag in the JSON so it can be found later.
2. Compare each mockup with the T006 template. Extend the template only where a mockup genuinely differs (new section, different hero visual, different tile count) and do it data-driven and optional, so Bill@Edge is unchanged.
3. Verify nav dropdown (T002), homepage product cards (T005) and the CTA banner links all resolve to the four pages with the canonical slugs bill-edge, payabbhi, digitaledge, intelliedge.

Acceptance: all four product pages build, match their mockups closely, share one template, and Bill@Edge is visually unchanged. Typecheck + build pass.

Finish with typecheck + build and print commit message "[T007] Payabbhi, DigitalEdge and IntelliEdge product pages". Never commit, stage or push; I test locally and commit myself.
```

---

## T008: Insights content model + landing page

**Prompt**

```
Task T008: Insights content model and landing page (/insights/).

Read first: CLAUDE.md, internal-docs/mockups/Insight Landing Page.png (full size), internal-docs/SITEMAP.md (Insights section lists the 12 slugs and titles), internal-docs/DESIGN-SYSTEM.html. Page title: "RS Insights".

Build:
1. Content model: MDX files in content/insights/<slug>.mdx with typed frontmatter: title, slug, type (blog | whitepaper | case-study | video | news | docs), product (digitaledge | intelliedge | bill-edge | payabbhi | general), date, author (optional), summary, cover (gradient key or image), readTime/pages/duration (optional), externalUrl (optional), videoUrl (video only), downloadUrl (whitepaper only), featured (bool). Create the 12 sitemap entries with sensible types (e.g. tier-1-bank-scheme-integration = case-study, fraud-interdiction-live-demo = video, iso-20022-before-migrating = whitepaper, building-trust-fednow-era = blog, three-decades-of-impact = news) and short placeholder bodies with H2 headings. Add a couple of docs-type entries seen in the mockup only if needed to fill the design. Explicitly mention in the commit which ones are placeholders.
2. Typed GraphQL schema customization in gatsby-node.ts (createSchemaCustomization) for the frontmatter, plus createPages for /insights/<slug>/ pointing at a temporary src/templates/insight.tsx that renders title + MDX body (the real templates come in T009).
3. Landing page src/pages/insights.tsx (or a template if pagination needs it): GiantHeading "RS INSIGHT" on the teal wash; the two "Build" and "Learn" link cards; "Watch and learn: See RS Product in action" row of video cards (thumbnail gradient, play button, duration badge, title, subtitle); "All Insight posts" with keyword search, Content type dropdown, Product dropdown, a 3-column card grid (cover, meta line with type/date/author, title, external-link icon, type and product pills) and pagination (9 per page, Previous/Next/numbers). Filters and search are client-side over the GraphQL data, sync with URL query params (?type=&product=&q=&page=), and show an empty state. Bottom CtaBanner "Ready to integrate?" with Sandbox and Read the docs buttons.

Acceptance: filters, search and pagination work and are keyboard accessible; the page matches the mockup at 1440px and works at 375px; all 12 slugs generate pages. Typecheck + build pass.

Finish with typecheck + build and print commit message "[T008] Insights content model and landing page". Never commit, stage or push; I test locally and commit myself.
```

---

## T009: Insight detail templates

**Prompt**

```
Task T009: Insight detail templates (blog, whitepaper, case study, video).

Read first: CLAUDE.md, the mockups internal-docs/mockups/Blogs.png, Whitepapers.png, Case Study Page Detais V1.png, Case Study Page Detais V2 ( Image ONLY).png, Video Page Details.png (full size), the content model from T008, and internal-docs/DESIGN-SYSTEM.html (Outfit is used for the TOC).

Build src/templates/insight.tsx as a dispatcher on `type` to four layouts sharing one page header (teal wash, title left, type + product pills right, "Published <date>"):
1. Blog and Case study: wide cover image/gradient (24px radius), then a two-column body: sticky Outfit table of contents on the left built from the MDX H2 headings (with the title as the first entry, and active-section highlighting via IntersectionObserver) and the article on the right (intro paragraph, H2 sections with dividers, inline images). Case study V1 vs V2 differ only in the cover being an image; support a cover image or a generated gradient cover.
2. Whitepaper: the mockup body is blank, so design the body area as: summary, key takeaways, a page-count meta line, and a download panel (Button + a gated form option using the T004 form with id "whitepaper-download" that reveals downloadUrl on success). Keep it visually consistent with the other templates.
3. Video: large 16:9 player (black rounded poster + play button; embed via privacy-friendly iframe when videoUrl is set, lazy-loaded), followed by the article body below (no TOC, per the mockup).
4. news and docs types: render with the blog layout; docs/externalUrl items link out from the landing page instead.
5. MDX components: register styled h2/h3/p/ul/blockquote/img/a mapped to the design-system typography (Source Serif is for job/editorial text; check the mockup, which uses a light sans for article body, and match the mockup). Add a `Callout` and `Figure` MDX component.
6. Add prev/next or "Related insights" (3 cards, same product) at the bottom, and a CtaBanner.
7. Seo: per-page title, description, OG image, article:published_time.

Acceptance: every one of the 12 insight pages renders through the right layout, the TOC tracks scroll, headings have stable anchor ids, layouts are responsive. Typecheck + build pass.

Finish with typecheck + build and print commit message "[T009] Insight detail templates". Never commit, stage or push; I test locally and commit myself.
```

---

## T010: Careers landing

**Prompt**

```
Task T010: Careers landing page (/careers/).

Read first: CLAUDE.md, internal-docs/mockups/Career.jpg (full size), internal-docs/DESIGN-SYSTEM.html (giant header, job card, "Mono for meta, serif for description", dashed CTA). Page title: "Careers".

Build src/pages/careers.tsx:
1. GiantHeading "CAREERS" (light tone) on the near-white background.
2. Accordion list (T003), first item open by default: "Where Your Work Powers Global Payments" (two paragraphs), then "Your growth. Our commitment", "Learn. Build. Grow. Your Journey at RS Software", "Alumni Speak", "Employee Speak". Alumni/Employee Speak contain testimonial cards (T003, Arimo). Content lives in content/careers.json.
3. Between the first accordion item and the rest, a row of three rounded image tiles (24px radius, elevated shadow). Use CSS/SVG generated gradient-grain placeholders in the pastel palette shown; leave slots for real images in content.
4. Jobs section on the blue gradient background (#a8d4fb → warm cream): JobCard list generated from content/jobs/*.json (Payment Systems Engineer, Data Scientist, Product Manager: slug, title, type, location, summary) each linking to /careers/<slug>/, plus the dashed "Open application" card with an "Apply now" button linking to /careers/apply/.

Acceptance: matches the mockup at 1440px, accordion is keyboard accessible, jobs render from content, responsive at 375px. Typecheck + build pass.

Do not build the job detail or apply pages (T011). Finish with typecheck + build and print commit message "[T010] Careers landing page". Never commit, stage or push; I test locally and commit myself.
```

---

## T011: Job detail + application

**Prompt**

```
Task T011: Job detail pages and the application form (/careers/<slug>/ and /careers/apply/).

Read first: CLAUDE.md, internal-docs/mockups/Careers details.jpg (full size), the forms layer from T004 (docs/forms.md), the job JSON from T010, internal-docs/DESIGN-SYSTEM.html.

Build:
1. Extend content/jobs/*.json with the detail fields shown in the mockup: type, location, tagline, companyDescription, aboutTheRole, requirements[], benefits[]. Write plausible placeholder copy for RS Software (the mockup text mentions a different company: don't copy that; keep it about payments). Flag placeholders with "placeholder": true.
2. gatsby-node.ts: createPages for /careers/<slug>/ with src/templates/job.tsx: teal wash background, "← Back to Careers" link, white rounded card with title, mono meta line, tagline, divider, sections (Company description, About the role, Requirements, Company benefits), then the heading "Ready to help build the future of Payment intelligence?" and the "Job application" form: Full Name*, Email*, Phone*, Location Preferred* (select), Notice Period* (select), Cover Letter* (textarea), Upload CV/Resume (.pdf, .doc, .docx, max 5 MB), consent checkbox*, and a solid "Submit application" button. The form id is `job-application`, it includes hidden jobSlug/jobTitle fields, and it submits through the T004 adapter. Success state shows a confirmation message.
3. src/pages/careers/apply.tsx (or a template) for the open application: same card and form, title "Open application", with the role field as a select instead of hidden.
4. Location and notice-period options in content (e.g. India, USA; Immediate, 15 days, 30 days, 60 days, 90 days).
5. Seo per job (title "<Role>: Careers"), and JobPosting JSON-LD structured data.

Acceptance: the three job pages and /careers/apply/ render, the form validates every required field, file type/size errors show, submission reaches the success state via the adapter, and everything is responsive. Typecheck + build pass.

Finish with typecheck + build and print commit message "[T011] Job detail pages and application form". Never commit, stage or push; I test locally and commit myself.
```

---

## T012: Redirects, SEO, sitemap

**Prompt**

```
Task T012: Legacy redirects, SEO and sitemap.

Read first: CLAUDE.md, internal-docs/SITEMAP.md, gatsby-config.ts, gatsby-node.ts.

Do:
1. Redirects (GitHub Pages has no server-side redirects, so no `_redirects`, no headers config): generate a static HTML redirect page for every legacy .html URL from SITEMAP.md -> its clean URL (e.g. /about.html -> /about/, /products/bill-edge.html -> /products/bill-edge/, /insights/<slug>.html -> /insights/<slug>/, /request-demo.html -> /request-demo/, /sitemap.html -> /sitemap/). Each redirect file must contain `<meta http-equiv="refresh">`, `<link rel="canonical">` to the new URL, and a JS fallback and visible link. Use `gatsby-plugin-meta-redirect` with `createRedirect` calls in gatsby-node.ts (or an equivalent that writes the files at build time). Define the list once in src/lib/redirects.ts. Pages that don't exist yet (BLOCKED tasks) should still have their redirect entries so they work when built. Note in docs/deploy.md that this is a client-side redirect and not a 301.
2. Sitemap: configure gatsby-plugin-sitemap with siteUrl, exclude the dev-only /_kit, /404 and any noindex pages (also exclude the generated redirect pages), trailing slashes, `lastmod` where available.
3. robots.txt (static/robots.txt) referencing the sitemap. Add `static/CNAME` containing `www.rssoftware.com` and an empty `static/.nojekyll` so GitHub Pages keeps the custom domain and doesn't run Jekyll.
4. Seo audit: make sure every existing page uses the <Seo /> component with unique title/description, canonical URL and OG/Twitter tags; add default OG image; add Organization JSON-LD on the homepage.
5. Build a human-readable /sitemap/ page (footer links to it) listing the site's pages grouped like SITEMAP.md; pages that don't exist yet are omitted.

Acceptance: `npm run build` succeeds, public/ contains CNAME and .nojekyll, sitemap-index.xml lists only real indexable pages, redirect list covers all 48 legacy URLs plus sitemap.html. Typecheck + build pass.

Finish with typecheck + build and print commit message "[T012] Redirects, SEO and sitemap". Never commit, stage or push; I test locally and commit myself.
```

---

## T013: About Us + Our Culture (BLOCKED)

> **Gate**: do not start until a mockup for About Us and Our Culture exists in `internal-docs/mockups/` and real or approved placeholder copy is available. Update this task's Mockup(s) cell and status when unblocked.

**Prompt**

```
Task T013: About Us (/about/) and Our Culture (/our-culture/).

GATE: first check internal-docs/mockups/ for About/Culture mockups. If none exist, STOP and tell me. Do not invent the layouts.

Read first: CLAUDE.md, the mockups, internal-docs/DESIGN-SYSTEM.html, internal-docs/SITEMAP.md (content source was content/about.md and a Python generator in the legacy site: not in this repo; ask me for the copy if it isn't in content/).

Build both pages with GiantHeading + the section patterns from T003, content in content/about.mdx and content/our-culture.mdx (placeholders flagged). Link the leadership section to /people/<slug>/ (T014).

Acceptance: matches mockups, responsive, Seo set. Typecheck + build pass. Print commit message "[T013] About Us and Our Culture". Never commit, stage or push; I test locally and commit myself.
```

---

## T014: People pages ×13 (BLOCKED)

> **Gate**: needs a people/leadership mockup and the 13 bios (Board and leadership per `SITEMAP.md`).

**Prompt**

```
Task T014: People pages (13 leaders) at /people/<slug>/.

GATE: first check internal-docs/mockups/ for a people/bio mockup and content/team/ for bios. If missing, STOP and tell me.

Slugs: r-ramaraj, raj-jain, richard-launder, sarita-jain, cs-mohan, peter-sweers, samik-roy, vijendra-surana, sumit-misra, sunetra-bhattacharya, sujit-banerjee, abhishek-gupta, aniruddha-rai-chaudhuri. Names and titles are in internal-docs/SITEMAP.md.

Build: content/team/<slug>.md with frontmatter (name, title, group, photo, order, socials), typed schema, createPages in gatsby-node.ts, template src/templates/person.tsx, a reusable LeaderGrid section (reused by About), header People dropdown driven from the same content, Seo and Person JSON-LD.

Acceptance: all 13 pages build; nav and About link correctly. Typecheck + build pass. Print commit message "[T014] People pages". Never commit, stage or push; I test locally and commit myself.
```

---

## T015: News list + detail (BLOCKED)

> **Gate**: needs a News mockup. The sitemap lists `/news/`, plus `chainit-rs-software-alliance`, `times-of-india-raj-jain-vision-tech`, `pre-diwali-gift`. Note that Insights also has a `news` type; decide whether these are the same collection.

**Prompt**

```
Task T015: News list (/news/) and news detail (/news/<slug>/).

GATE: first check internal-docs/mockups/ for News mockups. If none exist, STOP and tell me. Also ask me whether News should be a separate collection or reuse the Insights `news` type.

Build (once unblocked): content/news/*.mdx for the three sitemap items, list page with GiantHeading "NEWS", detail template, Seo, and links from the footer "Press" item.

Acceptance: pages match mockups, responsive. Typecheck + build pass. Print commit message "[T015] News pages". Never commit, stage or push; I test locally and commit myself.
```

---

## T016: Investor Relations (BLOCKED)

> **Gate**: needs a mockup and the investor data (the legacy site read `assets/js/investors-data.js`, which is not in this repo).

**Prompt**

```
Task T016: Investor Relations (/investor/).

GATE: first check internal-docs/mockups/ for an Investor mockup and ask me for the investor data (reports, filings, contacts). If missing, STOP.

Build: content/investor.json, page using GiantHeading + downloadable document lists (year/category filters if the mockup shows them), Seo.

Acceptance: matches the mockup, links to documents work, responsive. Typecheck + build pass. Print commit message "[T016] Investor Relations". Never commit, stage or push; I test locally and commit myself.
```

---

## T017: Contact, Request Demo, Sandbox (BLOCKED)

> **Gate**: needs mockups. Depends on T004 (forms). The header's "Talk To Expert" button and product-page CTAs already point at these URLs.

**Prompt**

```
Task T017: Contact (/contact/), Request a Demo (/request-demo/), Access the Sandbox (/sandbox/).

GATE: first check internal-docs/mockups/ for mockups of these pages. If none exist, STOP and tell me.

Build with the T004 form layer and adapter: form ids `contact`, `request-demo`, `sandbox-access`; fields per mockup; GiantHeading "CONTACT US"; two-column fluid form grid per the design system; success panel with "Send another message"; office locations block on Contact if the mockup has one. Wire the homepage email capture (T005) to prefill the Request Demo email via query param.

Acceptance: all three forms validate and reach success via the adapter; matches mockups; responsive. Typecheck + build pass. Print commit message "[T017] Contact, Request Demo and Sandbox pages". Never commit, stage or push; I test locally and commit myself.
```

---

## T018: Legal & 404 (BLOCKED)

> **Gate**: needs the legal copy (Terms, Privacy: footer says "Updated 08/2022") and mockups for Legal and 404.

**Prompt**

```
Task T018: Legal & Privacy (/legal/) and the 404 page.

GATE: first check internal-docs/mockups/ for Legal and 404 mockups, and ask me for the Terms/Privacy copy. If missing, STOP.

Build: content/legal.mdx (long-form, Noto Sans legal typography per the design system, sticky in-page navigation if the mockup has one), src/pages/404.tsx (noindex) with a link home and to Insights, footer Terms/Privacy links pointing at /legal/ anchors.

Acceptance: matches mockups, responsive, 404 works in `gatsby serve`. Typecheck + build pass. Print commit message "[T018] Legal and 404 pages". Never commit, stage or push; I test locally and commit myself.
```

---

## T019: Final QA & launch prep

**Prompt**

```
Task T019: Final QA and launch preparation. Run only after every non-blocked task is DONE (and ideally the blocked ones).

Do:
1. Remove dev-only items (src/pages/_kit.tsx and its references).
2. Grep for placeholder flags ("placeholder": true, TODO, "#" hrefs, lorem) and list them in docs/launch-checklist.md, with the file and what real content is needed.
3. Accessibility pass: heading order, landmarks, focus states, color contrast on the teal wash and blue footer, form labels/errors, reduced motion. Fix what you find.
4. Performance: gatsby-plugin-image for all raster images, lazy-load video embeds, font-display swap, preload the critical fonts, check the Lighthouse scores on /, /insights/, one product page and one job page (report numbers).
5. Analytics: GA via the existing gtag plugin driven by GA_TRACKING_ID; add a consent-aware setup if a cookie banner is required and note the decision needed.
6. Verify every internal link resolves (write a small script in scripts/check-links.mjs that crawls public/), and every legacy redirect from T012.
7. docs/deploy.md: GitHub Pages deployment notes: a GitHub Actions workflow (.github/workflows/deploy.yml) that runs `npm ci` + `npm run build` and deploys `public/` with the official `actions/upload-pages-artifact` and `actions/deploy-pages` actions on pushes to `main`; repo Pages setting = GitHub Actions source; custom domain `www.rssoftware.com` (CNAME, HTTPS); env vars as repository variables/secrets (GA_TRACKING_ID, GATSBY_FORMS_ENDPOINT); the limits of static hosting (client-side redirects only, no custom headers, no server code); and the steps to choose and wire the forms backend adapter. Create the workflow file but do not commit it or push. Remind me that merging it to main will trigger a public deploy.
8. Update CLAUDE.md so it reflects the real architecture (routes, content model, forms adapter).

Acceptance: `npm run build` clean, link checker passes, launch checklist written. Print commit message "[T019] Final QA and launch prep". Never commit, stage or push; I test locally and commit myself.
```
