# Editing content in Markdown

The Home page, the About Us page, all four product pages and every leadership profile are built from the Markdown files in this folder. Edit a file and rebuild the Gatsby site; the pages are regenerated from it. Pages move into Gatsby in parts (see `docs/MIGRATION.md`); Home, the product pages, About Us and the leadership profiles all read these files.

News stories, RS Insights items, careers roles (and the Careers testimonials) and the investor FAQ are not Markdown: they are small data lists in `src/lib/content/news.ts`, `insights.ts`, `careers.ts` and `investor.ts` (each file starts with a note on how to edit it). Investor documents (results, reports, policies, filings) are listed in `static/assets/js/investors-data.js`.

```
content/
  home.md             Home page — every section, from the hero to the insights banner
  about.md            About Us page — hero, What we do, Culture, Philosophy, Values, Community, Patent
  team/<slug>.md      One file per person — name, role, where they appear, photo, biography
  products/<page>/shared.md     Product page text every region sees (hero, dashboard, live demo, participants, closing…)
  products/<page>/<region>.md   Product intro, metrics and "Why" section, one file per region (global.md required)
                                <page> = bill-edge, payabbhi, digitaledge, intelliedge
```

## Rebuild

```
npm run develop      # preview at http://localhost:8000 (restart it after editing content/)
npm run build        # production build into public/
```

A push to `main` rebuilds and publishes the site (GitHub Actions → GitHub Pages).

## media.md — every image, video and animation (how to swap a visual)

`content/media.md` lists every visual on the site, page by page, in the same order as the asset deck
(`RS_Website_Asset_Doc.pptx`). One line per visual ("slot"):

```
- **about.philosophy** — Sculpture with signposts reading “values” and “partnerships” {image=philosophy.webp status=approve}
     slot name (never change)   description = what a screen reader says        the file + where it stands
```

**To swap a picture**
1. Put the new file in `static/assets/img/` (WebP, JPG, PNG or SVG). Keep roughly the same shape as the old one.
2. In `media.md`, change the file name after `image=` on that line. Update the description if the picture shows something different.
3. Set `status=final` once it's approved. Save, rebuild, check the page.

**To swap a video** — put `name.mp4` (the full film, with sound) in `static/assets/video/`, and ideally a short silent
loop `name-loop.mp4` (+ `name-loop.webm`) for the part that plays in place. Then write `video=name poster=still.webp duration=1:46`.

**To put a video where a picture is** (e.g. the About Us hero) — write `video=name poster=still.webp` in place of
`image=…`. It plays silently on a loop in the same frame.

**To replace an animation** (the payments-in/out flow, How we work diagrams, product dashboards, "See it in action"
terminals, insight video previews, the globe) — add `image=…` or `video=…` to that line. The file appears in the same
frame instead of the animation. Delete it again to bring the animation back. Product participant icons take
`icons=a.svg,b.svg,c.svg,d.svg` (one per participant, in order); write `-` for one that keeps its built-in icon,
e.g. `icons=billedge-banks.svg,-,-,billedge-networks.svg`.

**Changing what an animation says (not the picture)** — the animations take their words and figures from the page text:
the Home "Payments in → Outcomes out" cards are in `home.md` → `## flow` (one `### product` block per card), and each
product's hero dashboard figures are in `products/<page>/shared.md` → `## dashboard`.

If a file name is mistyped, the build prints `! content/media.md <slot>: image "…" not found` — fix the name and rebuild.

| Asset deck slide | Slots in media.md |
|---|---|
| Home (1/2, 2/2) | `home.film`, `home.flow`, `home.how-1/2/3`, `home.globe`, `home.astronaut` (Trusted-by logos: `home.md` → `## clients`) |
| Product — Bill@Edge, Payabbhi, DigitalEdge, IntelliEdge | `product.<page>.dashboard` (hero), `.demo` (See it in action), `.participants` |
| About Us (1/2, 2/2) | `about.hero`, `about.founder`, `about.philosophy`, `about.community`, `about.patent` (leadership photos: `team/<slug>.md` → `photo:`) |
| Our Culture | `culture.cover` (banner), `culture.founder`, `culture.divider`, `culture.philosophy`, `culture.community` |
| Careers | `careers.panel-1/2/3` (three pictures each); testimonial portraits: `src/lib/content/careers.ts` |
| News | `news.<story>.banner` (one per story); clippings: save `static/assets/img/news/<story>.webp`, no line needed |
| Insights + article heroes | `insight.<article>.banner` (article top), `insight.<article>.thumb` (listing card; gradient until an image is given), `insight.<article>` for the 3 video articles, `insights.case-study-image` |
| Site-wide | `site.share-image` (the picture shown when a link is shared; 1200 × 630 JPG/PNG). Header/footer logos stay in code. |

## about.md

Each `## name` line starts a section. The `key: value` lines directly under it are settings (eyebrow, title, image alt text…). Everything after the first blank line is the section's text.

- Paragraphs: plain text, a blank line between them.
- Bold / italic: `**bold**`, `*italic*`.
- Links: `[text](contact.html)` — site links are written without a leading slash; they become clean addresses (`/contact/`).
- Cards (What we do, Values): one bullet each, `- **Title** — description {icon=link}`. Values also take `color=#c6f06b`. Icon names: link, db, sparkles, card, users, refresh, zap, target, shield, chart, globe, award, book.

Keep the section names (`## hero`, `## culture`…) as they are; the page layout looks for them.

## team/<slug>.md

```
---
name: Raj Jain
role: CEO & Managing Director
board: 2          # position in Board of Directors (remove the line if not on the board)
executive: 1      # position in Key Executives (remove the line if not an executive)
photo: raj-jain.jpg
linkedin: https://www.linkedin.com/in/...
---
First paragraph of the biography.

Second paragraph.
```

- The file name is the profile address: `team/raj-jain.md` → `/people/raj-jain/`.
- **Photos:** put the approved photo in `static/assets/img/team/` and write its file name after `photo:`. A square crop, at least 480 × 480 px, head and shoulders, works best. With `photo:` empty (or the file missing) the card shows the person's initials in the RS gradient — nothing breaks.
- **Adding someone:** copy any file, rename it, edit it. **Removing someone:** delete their file.
- Only publish real, approved names, roles, biographies and photographs.

## home.md — the Home page

Each `## section` matches a part of the page, top to bottom: `hero`, `clients`, `thirty-years`, `impact-stats`, `who-we-serve`, `what-we-build`, `flow`, `roles`, `product-cards`, `why-rs`, `how-we-work`, `insights-cta`. Keep the section names; edit everything under them.

### Word limits (give these to the content writer)

Every slot on the page has a fixed size in the design. Text longer than the limit wraps into extra lines, pushes
sections apart and breaks the look, so write to the limit, not past it. The same limits are noted in `home.md`.

| Section | Slot (setting in `home.md`) | Max words |
|---|---|---|
| Hero | badge first line (`badge_title`) / second line (`badge_text`) | 6 / 10 |
| | headline (`title`) / its second line (`subtitle`) | 6 / 10 |
| | paragraph under the headline | 40 |
| 30 Years | pill (`pill`) | 5 |
| | line under the pill (`note`, may bold a phrase) | 30 |
| | bold statement (`statement`, bold the first phrase with `**…**`) | 15 |
| Metrics band (`impact-stats`) | exactly 3 lines: value / label | 12 characters / 9 |
| | caption under the figures (`closing`) | 30 |
| Who We Serve | blue lead (`lead`) / statement (`statement`) | 10 / 30 |
| | per audience: tab name (`### heading`) / title (`title`) / sentence (`text`) | 3 / 6 / 25 |
| | per audience: exactly 4 bullet cards | 9 each |
| What we build | blue lead (`lead`) / paragraph under it | 12 / 35 |
| Product cards | title / exactly 4 bullets | 8 / 6 each |
| Why RS | blue lead (`lead`) / paragraphs | 16 / up to 2 of 35 each |
| How we work | step name / step text | 3 / 30 |
| Insights banner | title / text | 12 / 30 |

Rules of thumb: one idea per slot; headlines without a full stop chain ("A. B. C.") beyond two short sentences; no new
sections, extra paragraphs or extra cards without a design decision first.

- Hero: `title` is the big headline, `subtitle` its smaller second line; the paragraph is the text under them.
- 30 Years: `note` is the line under the pill, `statement` the bold sentence. The three figures underneath are
  `impact-stats`: `- **350+ billion** — label`, in the same style as the product-page metrics; its `closing` is a small caption.
- Who We Serve: one `### block` per tab; `title`, `text` and `link` on the left, the four `- ` bullets as cards on the right.
  There is no caption under the tabs (removed Oct 2026: it sat apart from the section and repeated the lead).
- What we build: `lead` is the blue headline; the paragraph under the settings sits beneath it.

- Repeated items (the four audiences, flow cards, product cards, the three "How we work" steps) are `### blocks` inside a section. Each block starts with `key: value` lines, then its bullets or paragraph.
- Clients: one bullet each, `- **Name** {logo=file-name height=26}`; add `beside=yes` for symbol-only marks. Without a logo file the name is shown instead.
- Roles: `- **Role** — product keys` (billedge, payabbhi, digitaledge, intelliedge), comma-separated.
- `**bold**` becomes the bold lead phrase in statements; `*one phrase*` becomes the blue accent.
- Lines starting with `# ` are notes for editors and never appear on the page.
- The illustrations (architecture diagram, deploy terminal, AI chart), the globe and the animations are design, not text; they stay in code (`src/lib/illustrations.ts` and `src/components/sections/home/`).

## products/<page>/ — product pages

Every word on a product page lives in its folder:

```
content/products/bill-edge/
  shared.md    text every region sees
  global.md    required — intro, metrics and Why section for Global, search engines and regions without a file
  india.md  canada.md  nordic.md  usa.md     optional regional versions of the same three parts
```

Folders: `bill-edge`, `payabbhi`, `digitaledge`, `intelliedge`. Every product now has all five regions.

### shared.md

```
---
name: RS Bill@Edge™                       (used in the live-demo header and the Know more text)
title: Page title shown in the browser tab and search results
description: One-sentence summary for search results
---
## hero
eyebrow: RS Products
tagline: …
pill: …
demo_button: Request Demo
sandbox_button: Access Sandbox

## dashboard                              (the illustrative dashboard beside the hero)
placeholder: …                            (remove the line once the figures are real)
title: Bill Payment Trend
month: April 2026
chart: Bill Collection Analysis Trend
- **1,247** — Bills Processed — ↑ 12% from last month     (four lines: two tiles, two floating cards;
- **98.5%** — Collection Rate — ↑ 2.3%                      the last part is the optional change figure)
- **$2.4M** — Revenue Collected — ↑ +18%
- **4.8/5** — Customer Satisfaction

## live-demo                              ("See it in action")
kicker: SEE IT IN ACTION
title: …
link: Book a guided demo
- Bullet points beside the terminal

## simulation                             (the terminal lines, in order)
- info: → BILL_FETCH  biller=…            kind is info, ok, warn or dim; the text is shown exactly as written
- ok: ✓ Bill presented …

## participants                           ("Designed for every participant in the ecosystem")
kicker: DESIGNED FOR EVERY PARTICIPANT IN THE ECOSYSTEM
- **Banks** — Description. {color=#0075b7 from=#f0f7ff to=#e8f4fd}
  (colour of the icon, then the two gradient colours of its panel; remove the section to hide the carousel)

## closing                                (the statement near the bottom)
title: *Bill pay* is one of the highest-frequency financial interactions…
The paragraph under it.

## know-more                              (the coloured band at the end)
title: Know more about this Product
text: Get to know more about RS Bill@Edge™ — insights, case studies, use cases and docs.
button: Insight
```

### global.md and regional files

The file name must match a region key in `static/assets/js/config.js` (`global`, `india`, `canada`, `usa`, `nordic`). Delete a region's file and that region shows the Global text.

```
## intro
title: Headline, with *one phrase* in the accent colour

First paragraph.

Second paragraph.

## metrics
placeholder: …                            (optional; marks the figures as not yet verified)
- **21,000+** — Billers
- **26+** — Biller Categories
- **Billions** — Bill Payment Interactions Annually

## why
eyebrow: Why RS Bill@Edge™
title: *Optional heading* for the Why section

One or more paragraphs.

## capabilities
label: Key capabilities        (optional small label above the cards)

- **Capability name** — One-line description.

## closing
Optional paragraph shown after the capability cards.
```

- Metrics: exactly three, each `- **value** — label`, optionally followed by ` — one-line description`. A number in the value (21,000+, ~1.1 Billion+) counts up on screen; a word (Billions) is shown as it is.
- Only one phrase per heading in `*asterisks*`; remove them for a plain heading.
- Search engines see the Global version only; the regional versions appear when a visitor picks a region.

### Word limits for product pages

| Slot | Max words |
|---|---|
| Intro title (one `*accent phrase*`) / intro paragraphs | 14 / up to 2 paragraphs, 90 in total |
| Metric label / description | 4 / 12 (exactly 3 metrics) |
| Why title / Why paragraph(s) | 14 / up to 2 paragraphs, 100 in total |
| Capability card title / text | 5 / 20 (3, 6 or 9 cards fill the rows of three evenly) |
| Audience tab: title / paragraphs / second heading / its paragraph | 12 / 2 of 45 / 14 / 60 |

### Audience tabs (IntelliEdge: For Bank / For Central)

A Why section can switch between audiences. Name them in `## why` and give each its own three sections:

```
## why
eyebrow: Why RS IntelliEdge
tabs: bank, central

## tab-bank
label: For Bank
title: *Built for* banks to protect customers in real time.

Paragraph.

## tab-bank-why                    (optional: a second heading and text under the first, above the cards)
title: Real-time fraud intelligence across every payment journey.

Paragraph.

## tab-bank-metrics
- **<100 ms** — Fraud Decisioning — Description.

## tab-bank-capabilities
- **Capability** — Description.
```

With tabs, the metrics band sits below the Why section and follows the selected tab. Give each tab three metrics; with two the band shows two columns and leaves the third empty.

### What stays in code

Each product's accent colour, hero tint and logo are design values in `PRODUCT_PAGES` (`src/lib/content/product.ts`); the icons, animations and layout are in `src/` and `static/assets/`.
