# Migrating the approved RS Software site into this Gatsby repo

The RS Software website already exists as a finished, approved static site (49 pages, real content, regional product
text, design system v7.2). This repo receives that site **as it is**: same look, same content, same behaviour, in the
Gatsby 5 + React 18 + TypeScript structure. The mockup-driven tasks in `internal-docs/PROMPTS.md` are superseded by this
migration for every page the static site already has.

## Rules for the migration

1. **No visual change.** Pages render the same HTML structure and class names as the static site, so the unchanged
   stylesheets (`src/styles/tokens.css`, `src/styles/rs.css`) style them exactly as before.
2. **No content change.** All wording stays in Markdown under `content/`, in the same format (guide: `content/README.md`),
   read at build time by `src/lib/md.ts` (a line-for-line port of the static site's reader).
3. **No layout restructuring.** Sections, order and responsive behaviour are carried over, not redesigned.
4. **Every part is verified** against the static site before it is handed over (see "How each part is checked").

## How it is built

| Concern | Where | Notes |
|---|---|---|
| Styles | `src/styles/tokens.css`, `src/styles/rs.css`, imported in `gatsby-browser.js` | Copied unchanged from the static site. Only change: image `url()`s point at `/assets/img/…`. |
| Tailwind | `tailwind.config.js` | Kept for new work with `prefix: "tw-"` and `preflight: false`, so it can never override the site's classes or base styles. Theme colours/fonts/radii point at the design tokens (`tw-text-rs-blue`). |
| Content | `content/*.md`, `content/products/<page>/*.md`, `content/team/*.md` | Loaded in `gatsby-node.ts` through `src/lib/content/*.ts` and passed to templates as page context. News, Insights and the investor FAQ were Python data in the static site, so they are TypeScript data: `src/lib/content/news.ts`, `insights.ts`, `investor.ts`. The investor document libraries stay in `static/assets/js/investors-data.js`. |
| Pages | `src/templates/*.tsx` created in `gatsby-node.ts`; fixed pages in `src/pages/` | Clean URLs with a trailing slash (`/`, `/products/bill-edge/`). Templates: `home`, `product` (one page per entry in `PRODUCT_PAGES`, `src/lib/content/product.ts`), `about`, `person` (`/people/<slug>/`), `news` (`/news/<slug>/`), `insight` (`/insights/<slug>/`). Fixed pages: `our-culture.tsx`, `news.tsx`, `insights.tsx`, `investor.tsx`. |
| Components | `src/components/layout` (Header, Footer, Layout, Seo), `ui` (Icon, Coin, LoopVideo, HeadBlock, Portrait), `sections/<page>` | JSX mirrors the static markup; rich text from Markdown is inserted as HTML. |
| Illustrations | `src/lib/illustrations.ts`, `src/lib/icons.ts`, `src/lib/coin.ts` | Exported verbatim from the static site so the drawings are identical. |
| Forms | `src/components/forms/` (markup), `static/assets/js/main.js` (validation, success / error UI), `src/lib/forms` (adapter) | No vendor: `consoleAdapter` until a backend is chosen, `httpAdapter` when `GATSBY_FORMS_ENDPOINT` is set. Guide: `docs/forms.md`. |
| Redirects, deploy | `src/lib/redirects.ts` + `onPostBuild` in `gatsby-node.ts`; `static/CNAME`, `.nojekyll`, `robots.txt`; `.github/workflows/deploy.yml` | Guide: `docs/deploy.md`. |
| Interactions | `static/assets/js/*.js`, loaded by `gatsby-browser.js` after React renders | The site's proven vanilla scripts (menus, region picker and regional text, tabs, steppers, carousels, live demo, video overlay, Ask AI, globe, forms). Links between pages are plain `<a>` tags, so each page loads fresh, exactly as on the static site. They can be converted to React components later, one at a time, once each conversion is screenshot-verified. |
| Images, video, docs | `static/assets/…` → served at `/assets/…` | Same paths as the static site. |
| Head | `src/components/layout/Seo.tsx` (per page), `gatsby-ssr.tsx` (fonts, `lang`, `no-js`, `data-base`) | |

## Parts

| Part | Scope | Covers PROMPTS.md | Status |
|---|---|---|---|
| 1 | Foundation, styles, header (mega menu + region selector), footer, Seo, **Home** | T001, T002, T005 | Delivered |
| 2 | Product template + the four product pages with regional text | T006, T007 | Delivered |
| 3 | About Us, Our Culture, 13 leadership profiles, News (+3), Insights (+12), Investor Relations | T008, T009, T013–T016 | Delivered |
| 4 | Careers (+3 jobs, apply), Contact, Request demo, Sandbox, Legal, Sitemap, 404, forms through `src/lib/forms`, legacy `.html` redirects, robots/CNAME/.nojekyll, GitHub Pages workflow notes | T004, T010–T012, T017–T019 | Delivered |

## How each part is checked

For every page in the part, the Gatsby build (`npm run build`, served from `public/`) is compared with the static site:

- **Page structure**: the rendered DOM of the header, `<main>` and footer, after scripts have run, with attribute order,
  whitespace and legacy `.html` → clean URLs normalised. Part 1 (Home) and Part 2 (all four product pages): **0 differences** at 1440 px and 390 px.
  Part 4 (11 pages): **0 differences** apart from the removed Netlify form attributes.
  Part 3 (33 pages): **0 differences** at 1440 px and 390 px, apart from the decorative coin's internal gradient ids
  (numbered per page instead of per site build) and four `/assets/…` paths written root-relative instead of `../assets/…`.
- **Screenshots** at 390, 768 and 1440 px with animations frozen. Part 1: identical layout (every section at the same
  position and height; the only pixel differences are self-running animations caught at different moments).
  Part 2: all four product pages **pixel-identical** at all three widths.
  Part 4: all 11 pages **pixel-identical**.
  Part 3: People, News, Insights (listing and articles) **pixel-identical**; About, Our Culture and Investor have identical
  layout (same element positions and sizes), with pixel differences only inside self-running SVG animations.
- **Regional text** (Part 2): for each product and each region (Global, India, Canada, USA, Nordic) the visible intro,
  metrics and Why sections match the static site after picking the region; IntelliEdge's For Bank / For Central tabs,
  the live-demo terminal and the participant carousel behave the same.
- **Behaviour**: menus, region picker, tabs, role filter, video overlay, globe, Ask AI and the mobile menu exercised in a browser.
  Part 3: investor FAQ accordion, the three document libraries and every `data-open` link (FAQ → policy, quick links),
  insights keyword / type / product filters and `?type=blog`, video preview terminal, whitepaper download status,
  contents-list tracking, news clipping fallback, founder video overlay and the leadership previous / next pager give the same results.
  Part 4: form validation messages, prefill from `?topic=`, `?email=`, `?product=`, `?role=`, CV file name, careers
  accordion, success panel and "send another" through `consoleAdapter`, JSON and multipart delivery and the error
  message through `httpAdapter` (tested against a local endpoint), and old `.html` addresses landing on the new page
  with query and hash.
- `npm run check-links`: every internal link in the build resolves (apart from the 3 whitepaper PDFs and 2 news clippings not supplied yet).
- `npm run typecheck` and `npm run build` pass.

## Known differences from the static site (by design)

- URLs are clean (`/about/` instead of `/about.html`). Every old `.html` address (47) is a redirect page that keeps `?query` and `#hash` (client-side, not a 301).
- Hosting is GitHub Pages (static only): Netlify Forms and the Netlify function for Chatbase do not exist here, so the
  forms carry no `data-netlify` / `netlify-honeypot` attributes. Forms submit through the adapter in `src/lib/forms`;
  until a backend is chosen they show the success state without sending (`docs/forms.md`).
- `gatsby-plugin-google-gtag` adds Google Analytics in production builds (placeholder ID `G-XXXXXXXXXX` until `GA_TRACKING_ID` is set).
- The XML sitemap is Gatsby's `sitemap-index.xml` (was `sitemap.xml`); `robots.txt` points to it.

## Running it

```bash
npm install          # the lockfile was refreshed: it was missing yaml@2.9.1, so `npm ci` failed
npm run develop      # http://localhost:8000
npm run typecheck && npm run build && npm run serve   # http://localhost:9000
```

Requires Node 18 or 20 (Node 22 also builds, with harmless `punycode` deprecation warnings shown as "ERROR UNKNOWN").
