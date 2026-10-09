# RS Software website — project context (Gatsby repo, 4 Oct 2026)

Read this first. It replaces the old `PROJECT_CONTEXT.md` of the static site (Python generator + Netlify), which no
longer describes how the site is built. Detailed guides: `CLAUDE.md` (working rules), `docs/MIGRATION.md` (how the
site was moved in and verified), `content/README.md` (editing text), `docs/forms.md`, `docs/deploy.md`,
`internal-docs/SITEMAP.md` (every page and its source), `internal-docs/RS-DESIGN-SYSTEM.md` (design system v7.2).

## 1. Where things stand

- The approved static site (49 pages, design system v7.2, owner Arka Ankit Chowdhury Gupta) is fully migrated into
  Gatsby 5 + React 18 + TypeScript, in four parts. Every page was compared with the static site: same markup, same
  screenshots at 390 / 768 / 1440 px, same behaviour (menus, region picker, tabs, filters, forms, investor library…).
- **Nothing is live yet.** Hosting is GitHub Pages at `https://www.rssoftware.com`; the deploy workflow exists but
  only publishes once Pages is switched on (section 5).
- **Forms don't send yet.** They validate and show "Message received", but no backend is chosen (section 6.1).
- **Approved changes since the migration (Oct 2026)** — these pages now deliberately differ from the old static site:
  - Home: copy from `New_Website_HomePage_Content.docx`, fitted to the existing layout (two-line hero headline, a
    product-style metrics band under 30 Years, Who We Serve keeps its four cards per audience). Copy is trimmed to the
    word limits in `content/README.md`; the content writer should approve the trimmed lines in `content/home.md`.
  - RS IntelliEdge: five regions (Global, India, Canada, Nordic, USA) from `RS_INTELLIEDGE_Website.docx`, each audience tab
    with a second heading (`## tab-<key>-why`). Content in `content/products/intelliedge/`.
- **Main menu (Oct 2026):** a "Home" link is the first menu item (teal underline on the home page); labels stay on one
  line, slightly tighter between 961 and 1023 px.
- **Visual slots (Oct 2026):** every image, video and animation is listed in `content/media.md` (same order as the
  asset deck). Pages read their slot by name (`useMedia("about.hero")`, `MediaImg`, `MediaSlot` in
  `src/components/ui/Media.tsx`); an animation slot given `image=`/`video=` shows that file in the same frame instead.
  News and insight banners and insight listing thumbnails are slots too (`news.<slug>.banner`, `insight.<slug>.banner`,
  `insight.<slug>.thumb`); the `img:` fields in `news.ts` / `insights.ts` are only the starting fallback.
  With the list as delivered, every page's HTML is identical to before apart from `data-media` attributes.
  Guide: `content/README.md` → "media.md".
- Content still contains marked placeholders (`RS-PLACEHOLDER`, `data-placeholder`): see section 6.2.
- Real facts come from https://rssoftware.ai (news, leadership, culture, clients, investors).

## 2. Stack and commands

| | |
|---|---|
| Framework | Gatsby 5, React 18, TypeScript (strict). Static output only. Node 18 or 20. |
| Styles | `src/styles/tokens.css` + `src/styles/rs.css` (the site's own CSS, unchanged). Tailwind only with the `tw-` prefix, no preflight, for new work. |
| Interactions | The site's vanilla scripts in `static/assets/js/` (`config.js`, `main.js`, `askai.js`, `globe.js`, investor scripts), loaded by `gatsby-browser.js` after React renders. |
| Content | Markdown in `content/` (home, about, products, team) and TypeScript data in `src/lib/content/` (news, insights, careers, investor FAQ). |
| Hosting | GitHub Pages via `.github/workflows/deploy.yml`. No server code, headers or server-side redirects. |

```bash
npm install
npm run develop        # http://localhost:8000
npm run typecheck      # must pass
npm run build          # must pass; output in public/
npm run check-links    # after a build: every internal link resolves
npm run serve          # preview the production build at http://localhost:9000
```

## 3. How the code is organised

| What | Where |
|---|---|
| Pages built from content | `gatsby-node.ts` → `src/templates/` (home, product, about, person, news, insight, job, sitemap) |
| Fixed pages | `src/pages/` (our-culture, news, insights, investor, careers, careers/apply, contact, request-demo, sandbox, legal, 404) |
| Layout, SEO | `src/components/layout/` (Header, Footer, Layout, Seo) |
| Shared pieces | `src/components/ui/` (Icon, Coin, LoopVideo, HeadBlock, Portrait), `src/components/forms/`, `src/components/sections/<page>/` |
| Content loaders | `src/lib/md.ts` (Markdown reader), `src/lib/content/*.ts` |
| Forms | `src/lib/forms/` (adapter), validation/UI in `static/assets/js/main.js` |
| Old `.html` addresses | `src/lib/redirects.ts` → redirect pages written by `onPostBuild` in `gatsby-node.ts` |
| Images, video, PDFs | `static/assets/` → served at `/assets/…` |

Rules for code changes (also in `CLAUDE.md`): JSX mirrors the site's markup and class names; don't wrap page sections
in extra `<div>`s inside `<main>` (the first section runs up behind the floating header); page links stay plain `<a>`
tags while the vanilla scripts drive interactions; agents never commit or push.

## 4. Decisions already made (don't reverse without discussion)

1. **Design system v7.2 is the source of truth.** Tokens in `tokens.css`; bold headlines; two selection markers
   (teal underline, blue pill); one gradient CTA per page.
2. **Giant page headers stay on one line** (script shrinks them to fit).
3. **One page per product, text switches by region.** The header region picker (Global, India, Canada, America,
   Nordic; India default) swaps the intro, metrics and "Why" text. Search engines see Global. Every product is
   visible in every region. No per-region pages.
4. **Contact is light mode**, same form style as Careers. **Offices are fixed text**, not tied to the region picker.
5. **News mirrors rssoftware.ai/home/news-list**, no extra blocks.
6. **No fabricated people, photos, logos, quotes or press text.** Leaders show initials until approved photos exist;
   missing logos show the client name; missing PDFs/clippings show "coming soon". Don't add dummy files.
7. **Video pattern:** silent loop plays in place, click opens the full video with sound; play button bottom-right.
8. **Deep links:** every linked section has an `id`; accordions open before scrolling (`goHash()` in `main.js`).
9. **Forms are vendor-neutral:** everything goes through `src/lib/forms`.
10. **Don't add pages that weren't asked for** (e.g. a products overview) without approval.

## 5. Pushing Parts 1–4 to GitHub (first time)

1. Unzip `changes-part1-4.zip` over the repo root (it contains every new or changed file). Delete
   `src/pages/index.tsx` if it is still there (the home page now comes from `src/templates/home.tsx`).
2. `npm install`, `npm run typecheck`, `npm run build`, `npm run check-links`, then `npm run serve` and click through.
3. Commit and push to `main`.
4. **Publishing:** `.github/workflows/deploy.yml` runs on every push to `main`, but nothing goes public until
   Settings → Pages → Source is set to **GitHub Actions**. Do that only when the site should be live; then set the
   custom domain and DNS (`docs/deploy.md`). To keep it fully off for now, leave the workflow file out of the commit.

## 6. What to develop next (in this order)

### 6.1 Launch blockers

1. **Choose the forms backend** (own AWS endpoint, or a SaaS such as Formspree/HubSpot) and set
   `GATSBY_FORMS_ENDPOINT`. Four forms: job application (with CV upload), contact, request demo, sandbox access.
   Fields and the AWS/SaaS recipe: `docs/forms.md`. Test each form end to end.
2. **GitHub Pages + domain:** Pages source "GitHub Actions", custom domain `www.rssoftware.com`, DNS, HTTPS,
   repository variables `GA_TRACKING_ID` and `GATSBY_FORMS_ENDPOINT` (`docs/deploy.md`). Confirm the final domain.
3. **Legal text** approved by legal (`src/pages/legal.tsx`), and a decision on a cookie banner once analytics is on.
4. **Real regional phone numbers** (`static/assets/js/config.js`, region list).

### 6.2 Real content and assets (no code changes, just files and text)

| Item | Where | Until then |
|---|---|---|
| 13 leadership photos (square, ≥480 px) | `static/assets/img/team/` + `photo:` in `content/team/<slug>.md` | Initials |
| 6 client logos (Worldpay, MetaBank, NPCI, NTT DATA, Deloitte, Authorize.Net) | `static/assets/img/logos/` + `content/home.md` | Name shown |
| 2 Times of India clippings | `static/assets/img/news/<slug>.webp` | "Clipping image coming soon" |
| 3 whitepaper PDFs | `static/assets/docs/<insight-slug>.pdf` | "PDF available soon" |
| Investor PDFs | `static/assets/docs/investors/…` + `investors-data.js` | Links to the current investor site |
| Social share image 1200×630 JPG/PNG | `static/assets/img/` + `site.share-image` in `content/media.md` | SVG/WebP that some networks don't show |

After adding the PDFs or clippings, remove them from `ALLOWED_MISSING` in `scripts/check-links.mjs`.

Placeholder text to replace: job listings and Careers testimonials (`src/lib/content/careers.ts`), insight
read/view counts and the full text of 11 insight articles (`src/lib/content/insights.ts`), the full ChainIT release
(`src/lib/content/news.ts`, `body`), Payabbhi/IntelliEdge metrics and all product dashboards
(`content/products/…`), DigitalEdge figures (need a source).

Illustrative visuals awaiting approval or replacement: `about-rails.svg`, `community-pillars.svg`, `philosophy.webp`,
`patent.webp`, `astronaut.webp`, `careers-1/2/3.webp`, stock portraits `people-1/2/3.webp`, the 4 generic
insight/news heroes, the "How we work" diagrams and product dashboards.

### 6.3 Decisions needed

- **Chatbase (Ask AI):** today the assistant uses built-in answers (`askAI.provider: 'builtin'` in `config.js`).
  A. Embed widget: add Chatbase's script in `gatsby-ssr.tsx` and turn the RS assistant off (else two bubbles).
  B. Keep the RS-designed assistant and send questions to Chatbase's API: needs a small proxy hosted outside
  GitHub Pages (e.g. AWS Lambda) holding the API key; point `chatbase.endpoint` in `config.js` at it. Never put the
  key in `static/`.
- **Founder video caption** says "CMD" where the site says "CEO & MD": align the wording.
- **DigitalEdge Nordic headline**: source document has a double space (missing dash?); confirm.

### 6.4 Design-system open items (v7.2 changelog)

- Footer logo should be `logo-rs-reversed.svg` (teal mark, white wordmark); file not supplied yet.
- Home hero uses the reveal animation above the fold (the system says it shouldn't).
- Low contrast: teal text on the insights banner headline; white outline "Sandbox" button on the teal band.
- Retired amber `#fbbf24` still used in the dark terminal.
- Planned `rs-*` class renames (Wave 2) not started.

### 6.5 Technical improvements (optional, one at a time, screenshot-verified)

- Convert the vanilla scripts into React components gradually (then page links can become Gatsby `<Link>`).
- Self-host the Google Fonts; use `gatsby-plugin-image` for raster images; Lighthouse pass on `/`, `/insights/`,
  one product and one job page.
- Accessibility pass (heading order, focus states, contrast, reduced motion) as in PROMPTS.md T019.

### 6.6 Future pages (need designs and approval first)

Products overview, case-study library, RS School of Payments, events, gated downloads, separate legal pages,
CAPTCHA/Calendly on Contact.

## 7. PROMPTS.md tasks

The mockup-based tasks in `internal-docs/PROMPTS.md` were replaced by the migration (map in `docs/MIGRATION.md`):
T001–T019 are covered, including the previously BLOCKED T013–T018. T003 (generic UI primitives) is superseded: pages
use the site's own classes and components. What remains of T019 (launch QA) is section 6 above. Mark tasks DONE
after committing.
