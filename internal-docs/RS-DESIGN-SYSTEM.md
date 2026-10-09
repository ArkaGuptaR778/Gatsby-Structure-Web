---
name: rs-software-design-system
description: The complete RS Software design system — brand, tokens, components with code, page templates, accessibility and migration. Use whenever designing, building, reviewing or extending any RS Software web page, component or marketing asset.
version: 7.2.0
status: baseline — living document
scope: web only (the public rs-software website). Email, decks and print are explicitly out of scope — confirmed Sep 2026.
owner: Arka Ankit Chowdhury Gupta
review: quarterly, or whenever a page ships that needs a token this file doesn't have
source: rs-software-website — assets/css/tokens.css + rs.css, 49 pages (tokens installed 30 Sep 2026)
updated: 2026-09
---

# RS Software — Design System

> **Payments-only. Globally.**
>
> One document: what the brand is, what the tokens are, what every component is made of, and how to build a page that looks like RS Software. Measured from the shipped code — every value here matches `assets/css/rs.css` unless marked **PROPOSED** or **FIX**.

**Reading order**

| You are | Start at |
|---|---|
| A developer building a page | §2 Tokens → §4 Components → §6 Page templates |
| A designer checking a design | §1 Brand → §3 Foundations → §5 Signature patterns |
| Reviewing a pull request | §9 Rules → §10 Checklist |
| Cleaning up the stylesheet | §11 Drift audit → §12 Architecture |
| Wondering what's still missing | §13 Placeholder content → §14 Completeness |

---


## Status — read this first

**This is the baseline, not the final word.** Version 7.0.0 describes the RS Software website as it is built today, measured from the shipped code. It is a floor to build on, and it is expected to change: new pages will need tokens that aren't here yet, and some values will be tuned once they meet real content.

**What's settled vs what's provisional**

| Settled — change needs a good reason | Provisional — expected to move |
|---|---|
| Brand voice, logo rules, the teal-mark rule (§1) | Clear space and minimum sizes (§1) — proposed, awaiting a corporate manual |
| The token values (§2) — measured from the code | The token tiers shipped in §2 — names settle once Wave 2 lands |
| Breakpoints, layout, type roles (§3) | The spacing scale — adopted for new work; existing modules migrate as touched |
| The five signature patterns (§5) | The architecture (§12) — planned, Wave 1 shipped |
| Accessibility targets (§7) | Everything in §13 Completeness |

**When you need something this file doesn't have,** three questions decide it:

1. **Does an existing token do this job?** Most "new" values are an existing token typed by hand. Check §2 first.
2. **Will this be used more than twice?** Once is a local value. Twice is a coincidence. Three times is a token.
3. **Can you name its role, not its appearance?** `--rs-border-subtle` survives a rebrand; `--rs-grey-light` doesn't. If you can only name the colour, it isn't a token yet.

If all three pass, add it — to the code *and* to this file in the same change.

**How this file changes**

| Change | Version | Examples |
|---|---|---|
| **Major** | 7.0.0 | A token is renamed or removed, a rule is reversed, a breakpoint moves |
| **Minor** | 6.1.0 | A token, component, pattern or page template is added |
| **Patch** | 6.0.1 | Wording, corrections, a decision from §12 is answered |

Rules:
- **Code and this file move together.** A PR that adds a token, renames a component or changes a rule updates both, or it isn't done.
- **Record it in §13 Changelog** — one line, what changed and why.
- **Nothing here is binding on work already shipped.** Existing pages migrate when they're next touched (see §12.6), not in a sweep.
- **Disagreeing is allowed.** If a rule is fighting real design work, that's evidence the rule is wrong — open a change rather than working around it silently.

---


---

---


## 1. Brand

### Essence
RS Software designs, builds and runs mission-critical payment ecosystems — national rails like UPI and BBPS, bank modernisation, billing, and AI-native fraud and risk. The design should feel like the systems it runs: **precise, calm under load, specialist**.

| Pillar | In practice |
|---|---|
| **Precise** | Verifiable numbers (30 years, 99.99%, 30K+ TPS, ₹2,544.72 L), never adjectives. |
| **Calm** | Soft gradient page tops, generous white space, one loud element per page. |
| **Specialist** | Payments vocabulary used correctly: rails, settlement, ISO 20022, RTP, FedNow, UPI, BBPS, tokenisation. |

### Voice
- Direct, result first, active voice, sentence case everywhere except eyebrows and the giant header.
- Buttons say what happens: *Talk to expert · View role · Request demo · Access sandbox · Send message*.
- Errors say what to do next. No apologies, no emoji, no "Oops".
- Product names always carry their marks: **RS Bill@Edge™ · Payabbhi® · RS DigitalEdge™ · RS IntelliEdge™**.

### Logo — the company mark

> **PLACEHOLDER.** The RS mark is being redesigned. Until the new files arrive, the
> system uses the assets extracted from the current site — `logo-rs.webp` (full colour)
> and `logo-rs-reversed.svg` (teal mark, white wordmark). Every rule below is final;
> only the artwork changes. The swap checklist is at the end of this section.

A teal aperture mark plus the two-part wordmark: **RS** in brand blue with **software** set beneath it. Ratio **4.05 : 1** (600×148). Two files only, both WebP with transparency.

| Placement | File | Rendered | Set by |
|---|---|---|---|
| Navigation | `logo-rs.webp` | 30px tall (attr 121×30) | `.nav__logo img{height:30px}` |
| Footer brand block | `logo-rs-reversed.svg` **(swap)** | 44px tall (attr 178×44) | `.footer__brand img{height:44px}` |
| Browser tab | `favicon-32.png` | 32×32 | mark only |
| iOS home screen | `favicon-180.png` | 180×180 | mark only |
| PWA / manifest | `favicon-512.png` | 512×512 | `site.webmanifest` |
| Social share | `globe.webp` | `og:image` | not the logo today — **decide** |
| Animated coin | inline SVG `.rs-coin` | square, 40–260px | mark paths only, never the wordmark |


#### Brand rule — the mark is always teal

On **every** coloured or dark background the aperture mark stays **brand teal** and only the wordmark reverses to white. There is no all-white lockup: a white mark is off-brand wherever it appears.

| Ground | Mark | Wordmark | File |
|---|---|---|---|
| White · `#f9fafb` · pale gradient tops | teal `#5DC5BF` | blue `#0075b7` | `logo-rs.webp` |
| Navy `#1e72bd` (footer) | teal `#5DC5BF` | white | `logo-rs-reversed.svg` |
| Ink `#0b1f3a` · deep navy bands | teal `#5DC5BF` | white | `logo-rs-reversed.svg` |
| Investor gradient · photography | teal `#5DC5BF` | white | `logo-rs-reversed.svg` |
| Teal `#5cc5bf` ground | — | — | Don't place the logo on teal; the mark disappears. Use a white or ink panel. |

**Two fixes this creates:**
1. `logo-rs-white.webp` is **100% white**, mark included — every footer on the site currently breaks the rule. Replace it with `logo-rs-reversed.svg` (`.footer__brand img`, 44px).
2. The supplied artwork uses **`#5DC5BF`**; the CSS token `--rs-teal` is `#5CC5BF` and the raster logo compresses to `#5CC6C0`. One digit apart, invisible on screen — but the brand file wins: set `--rs-teal:#5DC5BF` and re-export the raster.

**Clear space and minimum size — PROPOSED, needs sign-off** (no corporate manual supplied): clear space `x` = half the mark's height on every side; minimum **24px mark / 100px lockup** on screen and **15mm lockup width** in print. Below that, use the mark alone.

**Backgrounds:** full colour on `#ffffff` and `#f9fafb`, and on the pale end of page gradients. Reversed (teal mark + white wordmark) on `--rs-navy` `#1e72bd`, `--rs-navy-footer` `#1e3a5f`, `--rs-navy-deep` `#0b1f3a` and the investor gradient.

**MUST NOT:** stretch (hold 4.05:1) · recolour the mark or wordmark · rotate or tilt · add shadow, outline or glow · render the mark in white, flat black or any colour but `#5DC5BF` · place the full-colour version on teal, navy or any product colour · place it on busy imagery without a solid panel · re-typeset "software" · split the mark from the wordmark to build a new lockup · box it, or use it as a bullet or repeating pattern.

### Logo — products

| Product | Lockup | Mark | Accent `--c` | Hero `--tint` |
|---|---|---|---|---|
| RS Bill@Edge™ | `logo-billedge.webp` 911×142 | `logo-mark-billedge.webp` 163×142 | `#EA6C00` | `#f4b774` |
| Payabbhi® | `logo-payabbhi.webp` 500×120 | `logo-mark-payabbhi.webp` 74×107 | `#A8397F` | `#ecc0e2` |
| RS DigitalEdge™ | `logo-digitaledge.webp` 977×142 | `logo-mark-digitaledge.webp` 163×142 | `#0F766E` | `#b5e9e0` |
| RS IntelliEdge™ | `logo-intelliedge.webp` 931×142 | `logo-mark-intelliedge.webp` 163×142 | `#6D28D9` | `#e2d4fb` |

| Placement | Asset | Rendered | Container |
|---|---|---|---|
| Products dropdown row | mark | 26×26, `object-fit:contain` | 40px white tile, 1px divider border |
| Home product card | lockup | 28px tall, left aligned | Card with 4px top border in `--c` |
| Product hero | lockup | `clamp(40px, 5vw, 64px)` | Page's white-to-tint gradient |
| Magic Transform result | lockup | 17px tall | Card tinted `color-mix(--c 14%, #fff)` |
| Body copy / footer | text only | — | Name in text, never the image |

**The logo colours are not the accent tokens.** DigitalEdge's lockup is mint-to-emerald while its UI accent is `#0F766E`; Payabbhi's is navy-to-coral while its accent is `#A8397F`. The accent drives buttons, tiles, borders and bullets; it is never painted onto the logo, and the logo's colours never leak into the UI.

**Rules**
- Trademark symbols are part of the name: **RS Bill@Edge™ · Payabbhi® · RS DigitalEdge™ · RS IntelliEdge™** — in headings, first body mention, `alt` text and nav rows. `.pcard__brand sup` renders them at 10px muted.
- Square marks always sit in a rounded tile (white + hairline in the dropdown, `color-mix(--c 12%, #fff)` elsewhere). Lockups sit directly on the surface with clear space — never inside a tile or coloured chip.
- One product identity per surface: one logo, one `--c`. Never mix two product accents in a component, never set one as a page background.
- Supplied artwork only: never redraw in CSS/SVG, recolour to match a token, add a symbol that isn't in the artwork, or place a lockup on its own accent colour.

**Customer and partner logos** (`.logos`): approved SVGs at 32px tall, `opacity:.95`, `saturate(.9)`, `space-between`; centred and 26px under 640px. Never trace or recolour another company's mark, and only publish with permission on file.

### Logo swap checklist — the RS mark is being redesigned

| # | Replace / check | Detail |
|---|---|---|
| 1 | `assets/img/logo-rs.webp` | Full colour, transparent, ≥1200px wide |
| 2 | `assets/img/logo-rs-reversed.svg` | Reversed = **teal mark + white wordmark**; replaces the all-white `logo-rs-white.webp` |
| 3 | `favicon-32 / 180 / 512 .png` | Mark only, square; also `site.webmanifest` and `<meta name="theme-color">` if the blue changes |
| 4 | `.rs-coin` inline SVG | Built from the mark's paths — re-cut it or the coin stops matching the logo |
| 5 | `width` / `height` attributes | Nav `121×30` and footer `178×44` are hard-coded in every page — update to the new ratio or pages shift while loading |
| 6 | `.nav__logo img{height:30px}` | Re-balance against the 84px bar (70px mobile) if the new lockup is taller or squarer |
| 7 | `og:image` | Currently `globe.webp` — decide whether the new mark becomes the share image |
| 8 | This file | Update the ratio, the placement tables and the clear-space rule |

### Iconography
Inline SVG, 24×24 grid, `stroke-width: 1.8`, round caps and joins, no fills, `currentColor`. Icon tiles are 40px with a 10px radius: teal-light for generic, `color-mix(--c 12%, #fff)` for product.

### Imagery
`.media` tiles: radius 24px (`--r-tile`), `--sh-lift`, aspect ratios 4:3 / 5:4 / 1:1; article heroes 2.15:1; insight thumbs 2.1:1; team photos 1.2:1 cropped to top. Real people, operations rooms, sky/landscape abstractions and brand-blue data visuals. No stock handshakes or padlocks.

---

---


## 2. Tokens

Three tiers. A component references **semantic** or **component** tokens only — a primitive, or a raw hex, inside a component rule fails review.

| Tier | Prefix | Use it |
|---|---|---|
| Primitive | `--p-*` | Never inside a component. It is the palette, not a decision. |
| Semantic | `--rs-bg-* --rs-fg-* --rs-border-* --rs-action-* --rs-status-*` | Always. This is the layer components speak. |
| Component | `--rs-nav-h --rs-btn-h --rs-card-pad --c` | When a variant must change a value. |

```css
/* wrong — a raw value, and a primitive */
.thing{color:#374151;border:1px solid var(--p-neutral-100)}

/* right — roles, not colours */
.thing{color:var(--rs-fg-body);border:1px solid var(--rs-border-subtle)}
```

**Product accent** is a parameter, not a lookup. Set `--c` once on the scope and derive the rest:

```html
<article class="rs-product-card" style="--c:#0F766E">
```
```css
.rs-product-card{border-top:4px solid var(--c)}
.rs-product-card__tile{background:color-mix(in srgb,var(--c) 12%,#fff)}
```

### 2.1 Install

```html
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/rs.css">
```

The file ends with a compatibility block that re-declares every v3 token name (`--rs-blue-primary`, `--r-card`, `--nav-h`…) as an alias of the new layer, so adding it changes nothing on screen and existing rules keep working.

**Verified:** applied to the live site, ten pages screenshotted at 1440px and 390px before and after — six byte-identical, and the four that differed differed by the same amount when the original was compared against *itself* (the floating coins and the canvas globe). Animation, not tokens.

### 2.2 Machine-readable

`tokens.json` carries the same values in W3C Design Tokens format for Figma variables, Tokens Studio or Style Dictionary, with aliases preserved (`semantic.fg.brand` → `{primitive.blue.500}`). Generate it — never hand-edit it:

```bash
python3 design-system/build-tokens.py    # tokens.css → tokens.json
```

### 2.3 The token file

```css
/* =====================================================================
   RS SOFTWARE — DESIGN TOKENS  v6.0.0
   Wave 1 of the migration: additive only. Load this BEFORE rs.css.

     <link rel="stylesheet" href="assets/css/tokens.css">
     <link rel="stylesheet" href="assets/css/rs.css">

   Three tiers:
     1 PRIMITIVE  --p-*    the palette. Never referenced by a component.
     2 SEMANTIC   --rs-*   what components reference. Named by role.
     3 COMPONENT  --rs-*-* only where a variant must change a value.

   Rule: a component may reference only tier 2 or tier 3.
   A primitive — or a raw hex — inside a component rule fails review.

   Every value below is taken from the shipped stylesheet, so adding this
   file changes nothing on screen. The single exception is documented at
   --p-teal-300.
   ===================================================================== */

:root{

/* ------------------------------------------------------------------
   1 · PRIMITIVES
   ------------------------------------------------------------------ */

  /* Blue — the brand hue */
  --p-blue-50:#f0f7ff;      /* icon tiles, doc actions, menu hover      */
  --p-blue-100:#e0f2fe;     /* upload tile, news tag, product hero tint */
  --p-blue-200:#dbeafe;     /* case-study tag, globe closer             */
  --p-blue-400:#1e72bd;     /* footer ground, eyebrows                  */
  --p-blue-500:#0075b7;     /* BRAND                                    */
  --p-blue-600:#005a8e;     /* hover                                    */
  --p-blue-700:#004a75;     /* pressed                                  */
  --p-blue-accent:#2563eb;  /* stat values                              */

  /* Teal — the accent hue */
  --p-teal-50:#e6f7f6;
  --p-teal-75:#e1f4f2;
  --p-teal-100:#dff6f3;
  --p-teal-200:#a9e1dc;
  --p-teal-250:#a6e2dd;
  --p-teal-300:#5DC5BF;     /* BRAND MARK. The stylesheet ships #5cc5bf;
                               the supplied logo artwork is #5DC5BF.
                               One digit apart — imperceptible on screen,
                               and the brand file is authoritative.      */
  --p-teal-500:#14b8a6;     /* gradient end, accent bar, kickers        */
  --p-teal-600:#0d9488;     /* accessible gradient end (3.74:1 on white)*/
  --p-teal-700:#0f766e;     /* teal as text                             */

  /* Ink — dark grounds */
  --p-ink-700:#1e3a5f;
  --p-ink-800:#0b2545;
  --p-ink-900:#0b1f3a;
  --p-ink-950:#0c2350;      /* deep gradient start                      */

  /* Neutral ramp */
  --p-neutral-0:#ffffff;
  --p-neutral-25:#f9fafb;
  --p-neutral-50:#eef1f4;
  --p-neutral-75:#eef0f2;   /* search fields, chip counters             */
  --p-neutral-100:#edeff1;  /* card and panel borders                   */
  --p-neutral-150:#e5e7eb;
  --p-neutral-200:#e2e8f0;
  --p-neutral-250:#d1d5db;
  --p-neutral-300:#d0d7de;
  --p-neutral-400:#9ca3af;
  --p-neutral-500:#6b7280;
  --p-neutral-550:#64748b;
  --p-neutral-600:#475569;
  --p-neutral-650:#3d4349;
  --p-neutral-700:#374151;
  --p-neutral-750:#334155;  /* collapse candidate → 700 in a later wave */
  --p-neutral-800:#1f2937;
  --p-neutral-900:#0a0a0a;
  --p-neutral-950:#000000;
  --p-display-black:#1a1a1a;/* the giant header only                    */

  /* Status */
  --p-green-50:#dcfce7;
  --p-green-100:#d1fae5;
  --p-green-400:#2ea043;    /* 30-years timeline (decorative)           */
  --p-green-500:#16a34a;
  --p-green-600:#15803d;
  --p-emerald-500:#10b981;  /* "up" deltas                              */
  --p-red-50:#fef2f2;
  --p-red-500:#dc2626;
  --p-red-700:#991b1b;
  --p-amber-50:#fffbeb;
  --p-amber-400:#fbbf24;
  --p-amber-700:#c2410c;

  /* Product accents */
  --p-billedge:#EA6C00;     --p-billedge-tint:#f4b774;
  --p-payabbhi:#A8397F;     --p-payabbhi-tint:#ecc0e2;
  --p-digitaledge:#0F766E;  --p-digitaledge-tint:#b5e9e0;
  --p-intelliedge:#6D28D9;  --p-intelliedge-tint:#e2d4fb;

/* ------------------------------------------------------------------
   2 · SEMANTIC — what components reference
   ------------------------------------------------------------------ */

  /* Surfaces */
  --rs-bg-page:var(--p-neutral-0);
  --rs-bg-subtle:var(--p-neutral-25);
  --rs-bg-sunken:var(--p-neutral-75);
  --rs-bg-well:var(--p-neutral-50);
  --rs-bg-inverse:var(--p-ink-900);
  --rs-bg-brand:var(--p-blue-500);
  --rs-bg-brand-soft:var(--p-blue-50);
  --rs-bg-accent-soft:color-mix(in srgb,var(--c,var(--p-blue-500)) 10%,#fff);

  /* Text */
  --rs-fg-default:var(--p-neutral-900);
  --rs-fg-heading:var(--p-ink-900);
  --rs-fg-body:var(--p-neutral-700);
  --rs-fg-body-alt:var(--p-neutral-750);   /* body on tinted grounds    */
  --rs-fg-muted:var(--p-neutral-500);
  --rs-fg-muted-alt:var(--p-neutral-550);  /* captions on tints         */
  --rs-fg-disabled:var(--p-neutral-400);
  --rs-fg-inverse:var(--p-neutral-0);
  --rs-fg-brand:var(--p-blue-500);
  --rs-fg-on-brand:var(--p-neutral-0);
  --rs-fg-display:var(--p-display-black);

  /* Lines */
  --rs-border-subtle:var(--p-neutral-100);
  --rs-border-default:var(--p-neutral-200);
  --rs-border-strong:var(--p-neutral-300);
  --rs-border-input:var(--p-neutral-300);
  --rs-border-focus:var(--p-blue-500);

  /* Actions */
  --rs-action-primary-bg:var(--p-blue-500);
  --rs-action-primary-hover:var(--p-blue-600);
  --rs-action-primary-active:var(--p-blue-700);
  --rs-action-primary-fg:var(--p-neutral-0);
  --rs-action-outline-fg:var(--p-blue-500);
  --rs-action-outline-hover-bg:var(--p-teal-50);
  --rs-action-quiet-bg:var(--p-neutral-0);      /* white pill on dark   */
  --rs-action-mint-bg:#7ff0d8;                  /* mint pill on teal    */
  --rs-action-accent-bg:var(--c,var(--p-blue-500));

  /* Status */
  --rs-status-success:var(--p-green-400);        /* #2ea043 — accent: bars, meters,
                                                    icons, timeline, large figures.
                                                    3.37:1 — not for small text.     */
  --rs-status-success-text:var(--p-green-600);   /* #15803d — 5.02:1, small text      */
  --rs-status-success-surface:var(--p-green-50);
  --rs-status-success-border:var(--p-green-100);
  --rs-status-positive:var(--p-emerald-500);
  --rs-status-warning:var(--p-amber-700);        /* #c2410c — 5.18:1 on white        */
  --rs-status-warning-surface:var(--p-amber-50);
  --rs-status-danger:var(--p-red-500);           /* #dc2626 — 4.83:1 on white        */
  --rs-status-danger-text:var(--p-red-700);      /* text inside the pink surface     */
  --rs-status-danger-strong:var(--p-red-700);
  --rs-status-danger-surface:var(--p-red-50);
  --rs-status-info:var(--p-blue-500);
  --rs-status-info-surface:var(--p-blue-50);

  /* Selection — two markers, and only two.
     Navigation ("the page/section you are on") = teal underline + bold.
     Filters ("the filter you applied")         = solid blue pill.      */
  --rs-select-nav-marker:var(--rs-teal);
  --rs-select-filter-bg:var(--p-blue-500);
  --rs-select-filter-fg:var(--p-neutral-0);

  /* Teal band: white text on #5cc5bf is 2.06:1, so copy sits in ink (8.02:1) */
  --rs-on-teal-fg:var(--p-ink-900);

  /* Data display */
  --rs-data-value:var(--p-blue-accent);
  --rs-data-label:var(--p-ink-800);

  /* Gradients */
  --rs-grad-brand:linear-gradient(135deg,var(--p-blue-500) 0%,#5cc5bf 100%);
  --rs-grad-cta:linear-gradient(134deg,var(--p-blue-500),var(--p-teal-600));
      /* ADOPTED: ends on teal-600 so a white label reaches 3.74:1.
         The old #14b8a6 ending gave 2.49:1 and is retired.            */
  --rs-grad-cta-legacy:linear-gradient(134deg,var(--p-blue-500),var(--p-teal-500));
  --rs-grad-bar:linear-gradient(90deg,var(--p-blue-400) 0%,var(--p-teal-500) 100%);
  --rs-grad-stat:linear-gradient(90deg,#e6fbf8 0%,#e7dff7 100%);
  --rs-grad-success:linear-gradient(120deg,#f0f9ff,#ecfdf5);
  --rs-grad-deep:linear-gradient(130deg,var(--p-ink-950) 0%,var(--p-ink-900) 100%);

  /* Page tops — one per page type (see §9.5 of the design system) */
  --rs-top-home:linear-gradient(180deg,#5cc5bf 0%,#7dd3cd 30%,var(--p-teal-250) 60%,#c9efeb 80%,var(--p-teal-100) 100%);
  --rs-top-insights:linear-gradient(180deg,#5cc5bf 0%,#9fe0db 40%,var(--p-teal-100) 75%,#fff 100%);
  --rs-top-article:linear-gradient(180deg,#5cc5bf 0%,var(--p-teal-250) 45%,#e9f8f6 100%);
  --rs-top-about:linear-gradient(180deg,#bfe9e5 0%,#e8f7f5 55%,#fff 100%);
  --rs-top-jobs:linear-gradient(180deg,#a8d3ff 0%,#dae6ee 55%,#fff4df 100%);
  --rs-top-jobdetail:linear-gradient(180deg,#72cdc6 0%,var(--p-teal-200) 22%,var(--p-teal-75) 48%,#f7f9fb 70%);
  --rs-top-contact:linear-gradient(180deg,#fff 0%,var(--p-teal-75) 14%,var(--p-teal-200) 42%,var(--p-teal-75) 78%,#fff 100%);
  --rs-top-investor:linear-gradient(120deg,var(--p-ink-800) 0%,var(--p-blue-500) 55%,var(--p-teal-500) 100%);
  --rs-top-globe:linear-gradient(180deg,#fff 0%,#fff 55%,var(--p-blue-200) 80%,#bfdbfe 100%);
  --rs-top-pstats:linear-gradient(90deg,#fff 0%,#fff 18%,#e3f5f3 55%,#9fded8 100%);

  /* Elevation */
  --rs-shadow-rest:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
  --rs-shadow-lift:0 0 0 1px rgba(0,0,0,.05),0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);
  --rs-shadow-pop:0 20px 48px rgba(0,0,0,.14),0 4px 12px rgba(0,0,0,.08);
  --rs-focus-ring:0 0 0 3px rgba(0,117,183,.15);

  /* Type */
  --rs-font-ui:"Radio Canada Big",system-ui,sans-serif;
  --rs-font-body:"Inter",system-ui,sans-serif;
  --rs-font-display:"Inter",system-ui,sans-serif;
  --rs-font-serif:"Source Serif 4",Georgia,serif;
  --rs-font-mono:"JetBrains Mono","Courier New",monospace;
  --rs-font-toc:"Outfit",sans-serif;
  --rs-font-testi:"Arimo",Arial,sans-serif;
  --rs-font-legal:"Noto Sans",sans-serif;

  --rs-text-display:clamp(56px,13vw,200px);
  --rs-text-h1:clamp(40px,5.6vw,72px);
  --rs-text-h2:clamp(26px,3.2vw,40px);
  --rs-text-h3:clamp(22px,2.4vw,28px);
  --rs-text-statement:clamp(24px,3.1vw,40px);
  --rs-text-prose:clamp(18px,1.8vw,22px);
  --rs-text-lede:17px;
  --rs-text-body:16px;
  --rs-text-sm:14px;
  --rs-text-meta:13px;
  --rs-text-legal:12.5px;

  /* Space — 4px base */
  --rs-space-1:4px;   --rs-space-2:8px;   --rs-space-3:12px;  --rs-space-4:16px;
  --rs-space-5:20px;  --rs-space-6:24px;  --rs-space-7:28px;  --rs-space-8:32px;
  --rs-space-10:40px; --rs-space-12:48px; --rs-space-14:56px; --rs-space-20:80px;
  --rs-space-28:112px;

  /* Radius */
  --rs-radius-xs:2px;      /* checkboxes                                   */
  --rs-radius-sm:6px;      /* compact form dialect, segmented control (was 7px) */
  --rs-radius-cta:9px;     /* gradient + outline buttons                    */
  --rs-radius-md:10px;     /* primary button, inputs, icon tiles            */
  --rs-radius-lg:12px;     /* menu rows, product tiles, alerts (24 raw uses) */
  --rs-radius-14:14px;     /* sticky nav track, simulation pane             */
  --rs-radius-xl:16px;     /* cards                                         */
  --rs-radius-panel:18px;  /* resource cards, library panels                */
  --rs-radius-2xl:20px;    /* nav bottom corners, stat band, CTA band       */
  --rs-radius-3xl:24px;    /* image tiles, article hero                     */
  --rs-radius-pill:999px;  /* chips, filters, badges                        */

  /* Motion */
  --rs-dur-fast:150ms; --rs-dur-base:180ms; --rs-dur-slow:300ms; --rs-dur-reveal:700ms;
  --rs-ease-out:cubic-bezier(.2,.8,.2,1);
  --rs-ease-in-out:cubic-bezier(.4,0,.2,1);

  /* Layers */
  --rs-z-sticky:40; --rs-z-menu:60; --rs-z-ai:120; --rs-z-header:130; --rs-z-overlay:200;

/* ------------------------------------------------------------------
   3 · COMPONENT — only where a variant must change a value
   ------------------------------------------------------------------ */

  --rs-nav-h:84px;                  /* 70px ≤960, set in rs.css        */
  --rs-container:1248px;
  --rs-container-narrow:1040px;
  --rs-container-text:820px;
  --rs-gutter:clamp(20px,5vw,48px);
  --rs-section:clamp(56px,7vw,80px);
  --rs-section-compact:48px;
  --rs-section-spacious:clamp(72px,9vw,112px);
  --rs-btn-h-sm:36px; --rs-btn-h:44px; --rs-btn-h-lg:52px;
  --rs-field-h:48px;
  --rs-card-pad:28px;
  --rs-measure:68ch;

/* ------------------------------------------------------------------
   COMPATIBILITY — the v3 token names keep working.
   Delete this block once rs.css references the semantic layer directly.
   ------------------------------------------------------------------ */

  --rs-blue-primary:var(--p-blue-500);
  --rs-blue-hover:var(--p-blue-600);
  --rs-teal:#5cc5bf;                /* → var(--p-teal-300) when the brand
                                       teal correction ships             */
  --rs-teal-bright:var(--p-teal-500);
  --rs-teal-light:var(--p-teal-50);
  --rs-navy:var(--p-blue-400);
  --rs-navy-deep:var(--p-ink-900);
  --rs-navy-footer:var(--p-ink-700);
  --rs-surface:var(--p-neutral-0);
  --rs-surface-subtle:var(--p-neutral-25);
  --rs-text-primary:var(--p-neutral-900);
  --rs-hero-black:var(--p-display-black);
  --rs-text-secondary:var(--p-neutral-700);
  --rs-text-muted:var(--p-neutral-500);
  --rs-border:var(--p-neutral-300);
  --rs-divider:var(--p-neutral-200);
  --p-billedge:#EA6C00;
  --p-payabbhi:#A8397F;
  --p-digitaledge:#0F766E;
  --p-intelliedge:#6D28D9;
  --g-brand:var(--rs-grad-brand);
  --g-cta:var(--rs-grad-cta);
  --g-bar:var(--rs-grad-bar);
  --g-stat:var(--rs-grad-stat);
  --g-success:var(--rs-grad-success);
  --g-deep:var(--rs-grad-deep);
  --r-xs:var(--rs-radius-xs);
  --r-cta:var(--rs-radius-cta);
  --r-btn:var(--rs-radius-md);
  --r-row:var(--rs-radius-lg);   /* 12px — use the token, not the literal */
  --r-card:var(--rs-radius-xl);
  --r-band:var(--rs-radius-2xl);
  --r-tile:var(--rs-radius-3xl);
  --r-pill:var(--rs-radius-pill);
  --sh-rest:var(--rs-shadow-rest);
  --sh-lift:var(--rs-shadow-lift);
  --sh-pop:var(--rs-shadow-pop);
  --nav-h:var(--rs-nav-h);
  --maxw:var(--rs-container);
  --gutter:var(--rs-gutter);
  --sp-compact:var(--rs-section-compact);
  --sp-normal:var(--rs-section);
  --sp-spacious:var(--rs-section-spacious);
}
```

---


## 3. Foundations

### 3.1 Colour

| Token | Hex | Use |
|---|---|---|
| `--rs-blue-primary` | `#0075b7` | CTAs, links, nav links, active filters, info |
| `--rs-blue-hover` | `#005a8e` | Hover on solid blue and on links |
| `--rs-teal` | `#5cc5bf` | Active nav underline, CTA band, page-top gradients, big quote mark |
| `--rs-teal-bright` | `#14b8a6` | Gradient end, accent bar end, kickers, benefit icons |
| `--rs-teal-light` | `#e6f7f6` | Icon tiles, `::selection`, outline-button hover, office chip active |
| `--rs-navy` | `#1e72bd` | Footer background, eyebrows, FAQ group labels |
| `--rs-navy-deep` | `#0b1f3a` | Section titles, dark panels, dark text on tints |
| `--rs-navy-footer` | `#1e3a5f` | Alternate dark band |
| `--rs-surface` / `-subtle` | `#ffffff` / `#f9fafb` | Cards and page ground / alternate sections |
| `--rs-text-primary` | `#0a0a0a` | Body, card titles |
| `--rs-hero-black` | `#1a1a1a` | The giant header only |
| `--rs-text-secondary` | `#374151` | Ledes, descriptions |
| `--rs-text-muted` | `#6b7280` | Meta, hints, captions |
| `--rs-border` / `--rs-divider` | `#d0d7de` / `#e2e8f0` | Inputs / hairlines |

**Product accents** — set once as `--c` on the page or card; derive everything else with `color-mix()`.

| Product | `--c` | Hero `--tint` | Tag |
|---|---|---|---|
| RS Bill@Edge™ | `#EA6C00` | `#f4b774` | `#f1f5f9` / `#334155` |
| Payabbhi® | `#A8397F` | `#ecc0e2` | `#fce7f3` / `#a8397f` |
| RS DigitalEdge™ | `#0F766E` | `#b5e9e0` | `#dcfce7` / `#0f766e` |
| RS IntelliEdge™ | `#6D28D9` | `#e2d4fb` | `#ede9fe` / `#6d28d9` |

**Content-type tags:** Case study `#dbeafe`/`#1d4ed8` · Video `#dcfce7`/`#15803d` · Whitepaper `#e0e7ff`/`#4338ca` · Blog `#dcfce7`/`#166534` **(FIX: same green as Video)** · News `#e0f2fe`/`#0369a1`.

**Page-top gradients** — every page type opens on one; see `--g-top-*` in §2.2. They run up *behind* the floating nav card (§3.4).

**Contrast (WCAG 2.2)**

| Pair | Ratio | Body 4.5 | Large/UI 3.0 |
|---|---|---|---|
| `#0a0a0a` on white | 19.80 | ✅ | ✅ |
| `#374151` on white | 10.31 | ✅ | ✅ |
| `#6b7280` on white | 4.83 | ✅ | ✅ |
| `#0075b7` on white | 4.97 | ✅ | ✅ |
| white on `#0075b7` | 4.97 | ✅ | ✅ |
| `#1e72bd` on white | 5.00 | ✅ | ✅ |
| white on `#1e72bd` (footer) | 5.00 | ✅ | ✅ |
| `#0b1f3a` on white | 16.52 | ✅ | ✅ |
| `#2563eb` on `#e6fbf8` | 4.80 | ✅ | ✅ |
| white on `#14b8a6` (old CTA end — retired) | 2.49 | ❌ | ❌ |
| white on `#0d9488` (**adopted** CTA end) | 3.74 | ❌ <19px | ✅ |
| white on `#5cc5bf` (teal band — retired) | 2.06 | ❌ | ❌ |
| `#0b1f3a` on `#5cc5bf` (**adopted** teal band) | 8.02 | ✅ | ✅ |
| `#2ea043` on white (success accent) | 3.37 | ❌ graphics only | ✅ |
| `#15803d` on white (success text) | 5.02 | ✅ | ✅ |
| `#c2410c` on white (warning) | 5.18 | ✅ | ✅ |
| `#5cc5bf` on white | 2.06 | ❌ never text | ❌ decorative |
| `#6b7280` on `#e6fbf8` | 4.42 | ❌ use `#374151` | ✅ |
| `#EA6C00` on white | 3.16 | ❌ | ✅ icons only |

### Semantic colour — decided September 2026

| Role | Token | Value | On white | Use |
|---|---|---|---|---|
| Success — accent | `--rs-status-success` | `#2ea043` | 3.37:1 | Bars, meters, icons, the 30-years timeline, large figures. **Not small text.** |
| Success — text | `--rs-status-success-text` | `#15803d` | 5.02:1 | Success wording, tags, small labels |
| Success — surface | `--rs-status-success-surface` | `#dcfce7` | — | Tint behind the above |
| Error | `--rs-status-danger` | `#dc2626` | 4.83:1 | Field borders, error icons, error text on white |
| Error — on surface | `--rs-status-danger-text` | `#991b1b` | 5.9:1 | Text inside the pink alert — `#dc2626` on `#fef2f2` is only 4.41:1 |
| Warning | `--rs-status-warning` | `#c2410c` | 5.18:1 | Warnings, "beta", document icons |
| Warning — surface | `--rs-status-warning-surface` | `#fffbeb` | — | Tint behind warnings |
| Info | `--rs-status-info` | `#0075b7` | 4.97:1 | Informational notes |

`#2ea043` is the chosen success green. It measures 3.37:1 on white — right for graphics and
large type, under AA for small text — so the hue carries two roles and the text variant is the
`#15803d` already in the code. No new colour was introduced to make that work. The three greens
it replaces (`#16a34a`, and `#15803d` as an accent) and the second amber (`#fbbf24`) are retired.

### Selection markers — decided September 2026

Two markers, and only two.

| Marker | Means | Used by |
|---|---|---|
| **Teal underline + bold** (`--rs-select-nav-marker`) | "This is the page or section you are on" | Site nav, in-page tabs, investor anchor nav, article TOC |
| **Solid blue pill** (`--rs-select-filter-bg`) | "This is the filter you applied" | Insight filters, library categories, year chips, role chips, segmented switch |

The blue tab underline and the library's inset blue bar are retired.


### 3.2 Typography

Seven families, one job each. Loaded from Google Fonts with `display=swap`. **Geist Mono is in the stack but never loaded** — the real mono is JetBrains Mono.

| Family | Token | Job |
|---|---|---|
| Radio Canada Big | `--rs-font-ui` | Nav, buttons, section titles, stats, eyebrows, card names |
| Inter 400–600 | `--rs-font-body` | Body, ledes, statements, article intros, form controls |
| Inter 900 | `--rs-font-display` | The giant header (uppercase, −0.03em) |
| Source Serif 4 | `--rs-font-serif` | Article bodies, job descriptions, bios, placeholders in compact forms |
| JetBrains Mono | `--rs-font-mono` | Meta rows, kickers, solid-button labels, terminal panes |
| Outfit | `--rs-font-toc` | Article table of contents only |
| Arimo | `--rs-font-testi` | Testimonials only |
| Noto Sans | `--rs-font-legal` | Footer legal bar only |

| Role | Class | Font | Size | LH · tracking |
|---|---|---|---|---|
| Giant header | `.giant` | Inter 900 upper | `clamp(56px,13vw,200px)` | 1 · −.03em |
| Home hero | `.hero h1` | Inter 700 white | `clamp(38px,5.8vw,78px)` | 1.06 · −.025em |
| Home “30 Years” figure | `.years` | Inter 700 success green | `clamp(48px,6vw,72px)` | 1 · −.03em |
| Home section label | `.section-icon h2` | Inter 700 | `clamp(22px,2.2vw,30px)` | — |
| Home insights banner | `.globe-cta h2` | Inter 700 teal | `clamp(32px,4.4vw,60px)` | 1.12 · −.02em |
| About hero | `.about-hero h1` | Inter 400 | `clamp(52px,7vw,104px)` | 1 · −.04em |
| Product hero | `.p-hero h1` | Inter 400 blue | `clamp(40px,5.6vw,72px)` | 1.05 · −.025em |
| Investor hero | `.inv-hero h1` | Inter 800 white | `clamp(34px,4.8vw,60px)` | 1.08 · −.02em |
| Section title | `.title` | RCB 700 | `clamp(26px,3.2vw,40px)` | 1.15 · −.02em |
| Statement lead | `.statement--blue` | Inter 400/700 blue | `clamp(30px,3.9vw,50px)` | 1.06 · −.03em |
| Statement | `.statement` | Inter 400 | `clamp(24px,3.1vw,40px)` | 1.3 · −.03em |
| Closing headline (product pages) | `.statement.statement--close` | Inter 700, one accent phrase | `clamp(24px,3.1vw,40px)` | 1.3 · −.03em |
| Prose large | `.prose--lg` | Inter 400 | `clamp(20px,2.4vw,35px)` | 1.49 · −.03em |
| Prose | `.prose` | Inter 400 | `clamp(18px,1.8vw,22px)` | 1.6 · −.01em |
| Eyebrow | `.eyebrow` | RCB 700 upper | 13px | +.14em |
| Lede | `.lede` | Inter 400 | 17px | 1.7 · max 720px |
| Body | `body` | Inter 400 | 16px (15.5 ≤640) | 1.6 |
| Article body | `.article-body` | Source Serif 4 | 19px (17 ≤640) | 1.7 · max 760px |
| Stat value | `.stat__val` | RCB 700 | `clamp(30px,3.6vw,44px)` | 1.05 · −.5px |
| Form label | `.field label` | RCB 600 | 13.5px | — |
| Form input | `.field input` | Inter | 15px **(FIX: → 16px)** | — |
| Compact form | `.jf .field` | Inter 600 label 12.5px / input 14.5px | — | radius 6px |
| Legal | `.footer__bar` | Noto Sans | 12.5px | — |

**The giant header fits itself.** `.giant` is `white-space:nowrap`; `main.js → fitGiants()` measures the text after fonts load and, if it is wider than the container, sets `--fit` to a shrunken size and adds `.is-fit`. It re-runs on resize (60ms debounce) and on `document.fonts.ready`. Don't "fix" a small hero by editing the clamp.

### 3.3 Breakpoints — desktop-first, three that matter

| Query | What changes |
|---|---|
| **base** (≥1101) | Nav 84px with full links + region picker · products 4-up · footer `1.3fr + 4` · people 4-up · article TOC 230px sidebar |
| **≤1100** | Products → 2-up · footer → 3 columns (brand block full width) · people → 3-up |
| **≤960** | `--nav-h: 70px` · links become a full-screen slide-in panel behind the burger, dropdowns inline · `.split .serve .hww .action .contact-grid .patent .stake` → 1 column · `.grid-3 .grid-4 .caps .values` → 2-up · article TOC → bordered box · investor library rail → horizontal scroller |
| **≤900** | Contact grid stacks (form first) · decorative coins hidden |
| **≤640** | Body 15.5px · all grids → 1 column (people stay 2-up) · form rows → 1 column · footer → 2 columns · job cards stack · role selector, how-we-work steps and related cards become swipe rows · Ask AI → 52px circle · stat band → 2-up, values 18px |
| **≤600 / ≤360** | Hero coins 40px · investor ticker steps down |
| **≥560 / ≥901** | Contact: office list → 2 columns; contact card becomes sticky |

```css
@media (max-width:1100px){ … }
@media (max-width:960px){ :root{--nav-h:70px} … }
@media (max-width:640px){ … }
/* new components in variable-width slots: use container queries instead */
```

**MUST:** no horizontal page scroll from 320px up. Tables, tab strips and swipe rows scroll inside their own container (masked edges via `.hscroll-fade`).

### 3.4 Layout

| Token / class | Value | Use |
|---|---|---|
| `--maxw` | 1248px | `.container` content width |
| `.container-narrow` | 1040px | Investor sections, mid-width modules |
| `.container-text` | 820px | Legal and long text |
| `--gutter` | `clamp(20px,5vw,48px)` | Side padding (20 at 375, 38 at 768, 48 from 960) |
| `--nav-h` | 84 / 70px | Nav height and every sticky offset |
| `--sp-compact` / `--sp-normal` / `--sp-spacious` | 48 / `clamp(56,7vw,80)` / `clamp(72,9vw,112)` | Section rhythm |
| `.grid` + `.grid-2/3/4` | gap 20px | The only grid helpers |
| `.split` | `1fr 1fr`, gap `clamp(28px,5vw,64px)` | Text + media pairs |
| `.stack > * + *` | margin-top 16px | Vertical rhythm |

**Nav overlap pattern — keep these rules together:**
```css
.site-header        { position:fixed; inset:0 0 auto 0; z-index:130 }
main                { padding-top:0 }
main > :first-child { border-top:var(--nav-h) solid transparent; background-origin:border-box }
main > .profile     { border-top:0 }
.profile__cover     { padding-top:var(--nav-h) }
```
This is what makes each page's gradient run up behind the floating nav card.


---

---


## 4. Components

The library, written against the semantic tokens and the `rs-*` naming convention. Each entry is purpose → markup → CSS → variants and states. Copy the markup and the CSS; don't retype the values.

**Conventions used throughout**

- `rs-block__element--modifier`; state lives on the attribute (`aria-selected`, `aria-expanded`, `[open]`, `[disabled]`), never on a class.
- A component references semantic or component tokens only. No primitives, no raw hex.
- `--c` is the product accent, set once on a scope; everything else derives from it with `color-mix()`.
- Every interactive element gets the focus ring — it's in the base, don't remove it.

---

### 4.1 Layout

#### `.rs-container`
Centres content and owns the page gutter. Everything on a page sits inside one.

```html
<div class="rs-container">…</div>
<div class="rs-container rs-container--narrow">…</div>   <!-- forms, investor -->
<div class="rs-container rs-container--text">…</div>     <!-- legal, long copy -->
```
```css
.rs-container{
  width:100%;
  max-width:calc(var(--rs-container) + var(--rs-gutter)*2);
  margin-inline:auto;
  padding-inline:var(--rs-gutter);
}
.rs-container--narrow{max-width:calc(var(--rs-container-narrow) + var(--rs-gutter)*2)}
.rs-container--text{max-width:calc(var(--rs-container-text) + var(--rs-gutter)*2)}
```

#### `.rs-section`
Vertical rhythm. Three sizes, nothing in between.

```css
.rs-section{padding-block:var(--rs-section);position:relative}
.rs-section--compact{padding-block:var(--rs-section-compact)}
.rs-section--spacious{padding-block:var(--rs-section-spacious)}
.rs-section--subtle{background:var(--rs-bg-subtle)}
```

#### `.rs-grid`
The only grid helper. Columns collapse at the two breakpoints that matter.

```html
<ul class="rs-grid rs-grid--3">…</ul>
<div class="rs-grid rs-grid--split">…</div>   <!-- text + media -->
```
```css
.rs-grid{display:grid;gap:var(--rs-space-5);list-style:none;margin:0;padding:0}
.rs-grid--2{grid-template-columns:repeat(2,minmax(0,1fr))}
.rs-grid--3{grid-template-columns:repeat(3,minmax(0,1fr))}
.rs-grid--4{grid-template-columns:repeat(4,minmax(0,1fr))}
.rs-grid--split{grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,64px);align-items:center}

@media (max-width:1100px){ .rs-grid--4{grid-template-columns:repeat(2,1fr)} }
@media (max-width:960px){
  .rs-grid--split{grid-template-columns:1fr}
  .rs-grid--3,.rs-grid--4{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:640px){
  .rs-grid--2,.rs-grid--3,.rs-grid--4{grid-template-columns:1fr}
}
```

#### `.rs-pagetop`
**Replaces ten separate blocks.** Every page opens with one; the modifier picks the gradient, and the gradient runs up behind the floating nav card.

```html
<main>
  <header class="rs-pagetop rs-pagetop--careers">
    <div class="rs-container">…</div>
  </header>
</main>
```
```css
.rs-pagetop{
  background:var(--rs-pagetop-bg,var(--rs-bg-page));
  padding-block:clamp(40px,6vw,80px) clamp(32px,4vw,56px);
  position:relative;overflow:hidden;
  /* the gradient runs up behind the fixed nav */
  border-top:var(--rs-nav-h) solid transparent;
  background-origin:border-box;
}
.rs-pagetop--home     { --rs-pagetop-bg:var(--rs-top-home) }
.rs-pagetop--insights { --rs-pagetop-bg:var(--rs-top-insights) }
.rs-pagetop--article  { --rs-pagetop-bg:var(--rs-top-article) }
.rs-pagetop--about    { --rs-pagetop-bg:var(--rs-top-about) }
.rs-pagetop--careers  { --rs-pagetop-bg:var(--rs-top-jobs) }
.rs-pagetop--job      { --rs-pagetop-bg:var(--rs-top-jobdetail) }
.rs-pagetop--contact  { --rs-pagetop-bg:var(--rs-top-contact) }
.rs-pagetop--investor { --rs-pagetop-bg:var(--rs-top-investor);color:var(--rs-fg-inverse) }
.rs-pagetop--product  { --rs-pagetop-bg:linear-gradient(180deg,#fff 0%,#fff 30%,var(--tint) 100%) }
.rs-pagetop--simple   { --rs-pagetop-bg:var(--rs-bg-subtle) }
```

> **Don't** invent a new gradient for a new page. Pick the closest modifier, or add a `--rs-top-*` token and document it.

---

### 4.2 Type patterns

#### `.rs-display` — the giant header
One per page. Never twice, never below the fold, never wrapped to two lines.

```html
<h1 class="rs-display">Careers</h1>
<h1 class="rs-display rs-display--inverse">RS Insights</h1>
```
```css
.rs-display{
  font-family:var(--rs-font-display);font-weight:900;text-transform:uppercase;
  font-size:var(--rs-text-display);line-height:1;letter-spacing:-.03em;
  text-align:center;color:var(--rs-fg-display);margin:0;white-space:nowrap;
}
.rs-display--inverse{color:var(--rs-fg-inverse);text-shadow:0 2px 40px rgba(0,90,140,.35)}
.rs-display.is-fit{font-size:var(--fit)}   /* set by the fit script */
```
```js
/* Keeps it on one line at any width. Runs on load, on resize (debounced)
   and again after fonts load. */
function fitDisplay(el){
  el.classList.remove('is-fit'); el.style.removeProperty('--fit');
  const r=document.createRange(); r.selectNodeContents(el);
  const avail=el.clientWidth, need=r.getBoundingClientRect().width;
  const size=parseFloat(getComputedStyle(el).fontSize);
  if(need>avail && avail>0){
    el.style.setProperty('--fit', Math.floor(size*avail/need*0.98)+'px');
    el.classList.add('is-fit');
  }
}
```

#### `.rs-heading` — eyebrow → title → rule
Opens every section below the hero. Exactly one phrase of the title in `<em>`.

```html
<header class="rs-heading">
  <p class="rs-heading__eyebrow">Why RS Software</p>
  <h2 class="rs-heading__title">Where your work powers <em>global payments</em></h2>
  <div class="rs-heading__rule"></div>
</header>
```
```css
.rs-heading{margin-bottom:clamp(28px,4vw,44px)}
.rs-heading__eyebrow{
  font-family:var(--rs-font-ui);font-weight:700;font-size:13px;
  letter-spacing:.14em;text-transform:uppercase;color:var(--rs-navy);margin:0 0 10px;
}
.rs-heading__title{
  font-family:var(--rs-font-ui);font-weight:700;font-size:var(--rs-text-h2);
  line-height:1.15;letter-spacing:-.02em;color:var(--rs-fg-heading);margin:0;
}
.rs-heading__title em{font-style:normal;color:var(--rs-fg-brand)}
.rs-heading__rule{
  width:56px;height:4px;border-radius:2px;margin-top:14px;background:var(--rs-grad-bar);
}
.rs-heading--center{text-align:center}
.rs-heading--center .rs-heading__rule{margin-inline:auto}
```

#### `.rs-statement` / `.rs-prose`
Editorial voice: large, near-unstyled Inter. Opens narrative sections on home and product pages.

```html
<p class="rs-statement rs-statement--lead"><b>Payments is all we do.</b></p>
<p class="rs-statement">For three decades RS has built the rails that move money.</p>
<div class="rs-prose rs-prose--lg"><p>…</p></div>
```
```css
.rs-statement{
  font-family:var(--rs-font-body);font-weight:400;font-size:var(--rs-text-statement);
  line-height:1.3;letter-spacing:-.03em;color:var(--rs-fg-default);margin:0;
}
.rs-statement--lead{font-size:clamp(30px,3.9vw,50px);line-height:1.06;color:var(--rs-fg-brand)}
.rs-statement--lead b{font-weight:700}
.rs-prose{font-size:var(--rs-text-prose);line-height:1.6;color:var(--rs-fg-body);letter-spacing:-.01em}
.rs-prose--lg{font-size:clamp(20px,2.4vw,35px);line-height:1.49;letter-spacing:-.03em;color:var(--rs-fg-default)}
.rs-prose p+p{margin-top:1.1em}
.rs-lede{font-size:var(--rs-text-lede);line-height:1.7;color:var(--rs-fg-body);max-width:720px}
```

---

### 4.3 Actions

#### `.rs-btn`
One block, five intents, three sizes, plus an on-dark switch. **Replaces `.btn-primary .btn-gradient .btn-outline .btn-white .btn-mint .btn-pill-ghost .btn-accent .jf__submit .lib__more`.**

```html
<button class="rs-btn rs-btn--primary">View role</button>
<a class="rs-btn rs-btn--gradient" href="/contact">Talk to expert</a>
<button class="rs-btn rs-btn--outline">Access sandbox</button>
<button class="rs-btn rs-btn--quiet rs-btn--on-dark">Read the docs</button>
<button class="rs-btn rs-btn--accent" style="--c:#6D28D9">Request demo</button>
<button class="rs-btn rs-btn--primary rs-btn--sm">Small</button>
<button class="rs-btn rs-btn--primary" disabled>Sending…</button>
```
```css
.rs-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:9px;
  height:var(--rs-btn-h);padding-inline:20px;border:0;border-radius:var(--rs-radius-cta);
  font-family:var(--rs-font-ui);font-weight:700;font-size:15px;line-height:1.2;
  white-space:nowrap;text-decoration:none;cursor:pointer;
  transition:background var(--rs-dur-fast),box-shadow var(--rs-dur-fast),
             transform var(--rs-dur-fast),color var(--rs-dur-fast);
}
.rs-btn svg{width:16px;height:16px;flex-shrink:0}
.rs-btn:focus-visible{outline:2px solid var(--rs-border-focus);outline-offset:3px}
.rs-btn[disabled]{opacity:.65;pointer-events:none}

/* intents */
.rs-btn--primary{
  background:var(--rs-action-primary-bg);color:var(--rs-action-primary-fg);
  border-radius:var(--rs-radius-md);font-family:var(--rs-font-mono);font-weight:500;font-size:14px;
}
.rs-btn--primary:hover{background:var(--rs-action-primary-hover)}
.rs-btn--primary:active{background:var(--rs-action-primary-active)}

.rs-btn--gradient{                       /* ONE per page — the conversion */
  background:var(--rs-grad-cta-aa);color:var(--rs-action-primary-fg);
  height:var(--rs-btn-h-lg);padding-inline:28px;box-shadow:0 6px 18px rgba(0,117,183,.22);
}
.rs-btn--gradient:hover{transform:translateY(-1px);box-shadow:0 10px 24px rgba(0,117,183,.3)}

.rs-btn--outline{
  background:var(--rs-bg-page);color:var(--rs-action-outline-fg);
  border:1px solid currentColor;height:var(--rs-btn-h-lg);padding-inline:27px;
}
.rs-btn--outline:hover{background:var(--rs-action-outline-hover-bg)}

.rs-btn--accent{
  background:linear-gradient(134deg,var(--c),color-mix(in srgb,var(--c) 70%,#fff));
  color:var(--rs-fg-inverse);font-weight:500;
}
.rs-btn--accent.rs-btn--outline{
  background:var(--rs-bg-page);color:var(--c);border-color:var(--c);
}

.rs-btn--quiet{background:var(--rs-action-quiet-bg);color:var(--rs-fg-brand);
  border-radius:var(--rs-radius-pill);box-shadow:var(--rs-shadow-rest)}

/* on a dark or teal ground */
.rs-btn--on-dark.rs-btn--gradient{background:var(--rs-action-mint-bg);color:var(--rs-fg-heading)}
.rs-btn--on-dark.rs-btn--outline{background:transparent;color:var(--rs-fg-inverse);
  border-color:rgba(255,255,255,.7)}
.rs-btn--on-dark.rs-btn--outline:hover{background:rgba(255,255,255,.15)}

/* sizes */
.rs-btn--sm{height:var(--rs-btn-h-sm);padding-inline:14px;font-size:13px}
.rs-btn--lg{height:var(--rs-btn-h-lg);padding-inline:30px}
```

**Rules.** One `--gradient` per page. `--primary` for inline actions, `--outline` for the secondary beside it, `--quiet` only on dark grounds, `--accent` only on product pages. On mobile, primary actions inside forms and heroes go full width.

#### `.rs-link`
```html
<a class="rs-link rs-link--arrow" href="…">Read the case study</a>
```
```css
.rs-link{color:var(--rs-fg-brand);font-family:var(--rs-font-ui);font-weight:700;
  font-size:14.5px;display:inline-flex;align-items:center;gap:6px;text-decoration:none}
.rs-link:hover{color:var(--rs-action-primary-hover)}
.rs-link--arrow::after{content:"→";transition:transform var(--rs-dur-fast)}
.rs-link--arrow:hover::after{transform:translateX(3px)}
```

---

### 4.4 Forms

#### `.rs-field`
One field component. `--compact` is the dialect used by the contact and job-application panels — three values, not a second component.

```html
<div class="rs-field">
  <label for="email">Work email <span aria-hidden="true">*</span></label>
  <input id="email" name="email" type="email" required autocomplete="email"
         placeholder="name@company.com" aria-describedby="email-hint">
  <p class="rs-field__hint" id="email-hint">We reply within one business day.</p>
</div>

<div class="rs-field is-invalid">
  <label for="company">Company <span aria-hidden="true">*</span></label>
  <input id="company" name="company" aria-invalid="true" aria-describedby="company-err">
  <p class="rs-field__error" id="company-err">Enter your company so we can route your message.</p>
</div>
```
```css
.rs-field{display:grid;gap:7px}
.rs-field label{
  font-family:var(--rs-font-ui);font-weight:600;font-size:13.5px;color:var(--rs-fg-heading);
}
.rs-field label span{color:var(--rs-status-danger)}
.rs-field input,.rs-field select,.rs-field textarea{
  width:100%;font:inherit;font-size:16px;          /* 16px — stops iOS zooming */
  color:var(--rs-fg-default);background:var(--rs-bg-page);
  border:1px solid var(--rs-border-input);border-radius:var(--rs-radius-md);
  padding:12px 14px;
  transition:border-color var(--rs-dur-fast),box-shadow var(--rs-dur-fast);
}
.rs-field textarea{min-height:130px;resize:vertical}
.rs-field :is(input,select,textarea):hover{border-color:var(--rs-border-strong)}
.rs-field :is(input,select,textarea):focus{
  outline:0;border-color:var(--rs-border-focus);box-shadow:var(--rs-focus-ring);
}
.rs-field :is(input,select,textarea):disabled{background:var(--rs-bg-subtle);color:var(--rs-fg-disabled)}
.rs-field__hint{font-size:12.5px;color:var(--rs-fg-muted);margin:0}
.rs-field__error{font-size:12.5px;color:var(--rs-status-danger);margin:0}
.rs-field.is-invalid :is(input,select,textarea){border-color:var(--rs-status-danger)}

/* compact dialect */
.rs-field--compact label{font-family:var(--rs-font-body);font-size:12.5px;color:var(--rs-fg-body)}
.rs-field--compact :is(input,select,textarea){
  border-radius:var(--rs-radius-sm);padding:10px 12px;border-color:var(--p-neutral-250);
}
.rs-form__row{display:grid;grid-template-columns:1fr 1fr;gap:var(--rs-space-4)}
@media (max-width:640px){.rs-form__row{grid-template-columns:1fr}}
```

#### `.rs-check` · `.rs-upload` · `.rs-form-success`
```html
<label class="rs-check"><input type="checkbox" name="privacy" required>
  I agree to the privacy policy</label>

<label class="rs-upload">
  <span class="rs-upload__icon">↑</span>
  <span class="rs-upload__text">
    <span class="rs-upload__name">No file chosen</span>
    <span class="rs-upload__hint">PDF or DOCX, up to 8 MB</span>
  </span>
  <span class="rs-btn rs-btn--sm rs-btn--primary">Choose file</span>
  <input class="rs-upload__input" type="file" name="cv" accept=".pdf,.docx">
</label>
```
```css
.rs-check{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;
  color:var(--rs-fg-body);line-height:1.5;cursor:pointer}
.rs-check input{margin-top:3px;width:16px;height:16px;flex-shrink:0;accent-color:var(--rs-fg-brand)}

.rs-upload{position:relative;display:flex;align-items:center;gap:14px;cursor:pointer;
  background:var(--rs-bg-page);border:1px solid var(--rs-border-input);
  border-radius:var(--rs-radius-sm);padding:10px 12px}
.rs-upload:focus-within{border-color:var(--rs-border-focus);box-shadow:var(--rs-focus-ring)}
.rs-upload__icon{width:32px;height:32px;flex-shrink:0;display:grid;place-items:center;
  border-radius:var(--rs-radius-sm);background:var(--p-blue-100);color:var(--rs-fg-brand)}
.rs-upload__text{flex:1;min-width:0}
.rs-upload__name{display:block;font-size:14px;color:var(--rs-fg-body);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rs-upload__hint{display:block;font-size:12.5px;color:var(--rs-fg-muted)}
.rs-upload__input{position:absolute;inset:0;opacity:0;cursor:pointer}
.rs-upload.has-file .rs-upload__icon{background:var(--rs-status-success-surface);color:var(--rs-status-success)}

.rs-form-success{display:none;text-align:center;padding:36px;
  border-radius:var(--rs-radius-xl);background:var(--rs-grad-success);
  border:1px solid var(--rs-status-success-border)}
.rs-form-success.is-visible{display:block}
```

**Rules.** Labels are always visible — never placeholder-only. Errors say how to fix it, carry `aria-invalid` and are linked with `aria-describedby`. Every form posts through `RS_CONFIG.forms`; don't add a bespoke handler.

---

### 4.5 Navigation

#### `.rs-header` / `.rs-nav`
Floating white card over the page gradient.

```css
.rs-header{position:fixed;inset:0 0 auto 0;z-index:var(--rs-z-header);padding-inline:clamp(0px,1vw,12px)}
.rs-nav{
  max-width:1420px;margin-inline:auto;height:var(--rs-nav-h);
  background:var(--rs-bg-page);border-radius:0 0 var(--rs-radius-2xl) var(--rs-radius-2xl);
  display:flex;align-items:center;gap:clamp(16px,2.4vw,34px);
  padding-inline:clamp(18px,2.6vw,36px);box-shadow:0 1px 0 rgba(0,0,0,.05);
  transition:box-shadow var(--rs-dur-base);
}
.rs-header.is-scrolled .rs-nav{box-shadow:0 8px 30px rgba(11,31,58,.08)}
.rs-nav__logo img{height:30px;width:auto}
.rs-nav__link{
  font-family:var(--rs-font-ui);font-size:15px;font-weight:400;color:var(--rs-fg-brand);
  background:none;border:0;padding:8px 2px;display:inline-flex;align-items:center;gap:5px;
  border-bottom:2px solid transparent;text-decoration:none;
}
.rs-nav__link[aria-current="page"]{font-weight:700;border-bottom-color:var(--rs-teal)}

@media (max-width:960px){
  :root{--rs-nav-h:70px}
  .rs-nav{border-radius:0 0 var(--rs-radius-xl) var(--rs-radius-xl)}
  .rs-nav__links{
    position:fixed;inset:var(--rs-nav-h) 0 0 0;flex-direction:column;align-items:stretch;
    background:var(--rs-bg-page);padding:12px var(--rs-gutter) 40px;overflow-y:auto;
    transform:translateX(100%);transition:transform 280ms var(--rs-ease-in-out);
  }
  .rs-header.is-open .rs-nav__links{transform:none}
  .rs-nav__link{width:100%;justify-content:space-between;padding:16px 0;font-size:17px}
}
```

#### `.rs-menu` — dropdown panel
One component for the products mega-menu, the region list and any future menu.

```html
<div class="rs-menu" id="products-menu">
  <p class="rs-menu__label">Our products</p>
  <a class="rs-menu__item" href="/products/digitaledge" style="--c:#0F766E">
    <span class="rs-menu__icon"><img src="…" alt="" width="24" height="24"></span>
    <span>
      <span class="rs-menu__title">RS DigitalEdge™</span>
      <span class="rs-menu__desc">Unified payment modernisation for modern banks</span>
    </span>
  </a>
</div>
```
```css
.rs-menu{
  background:var(--rs-bg-page);border-radius:var(--rs-radius-xl);
  box-shadow:var(--rs-shadow-pop);padding:12px;min-width:340px;
}
.rs-menu__label{
  font-family:var(--rs-font-ui);font-weight:700;font-size:11.5px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--rs-fg-muted);padding:8px 12px 6px;margin:0;
}
.rs-menu__item{display:flex;align-items:center;gap:14px;padding:11px 12px;
  border-radius:var(--rs-radius-lg);color:var(--rs-fg-heading);text-decoration:none;
  transition:background var(--rs-dur-fast)}
.rs-menu__item:hover{background:color-mix(in srgb,var(--c,var(--rs-fg-brand)) 9%,#fff)}
.rs-menu__icon{width:40px;height:40px;flex-shrink:0;display:grid;place-items:center;
  border-radius:var(--rs-radius-md);background:var(--rs-bg-page);border:1px solid var(--rs-border-default)}
.rs-menu__title{display:block;font-family:var(--rs-font-ui);font-weight:700;font-size:15px;color:var(--c,inherit)}
.rs-menu__desc{display:block;font-size:13px;color:var(--rs-fg-muted);line-height:1.4}
```

#### `.rs-tabs` (navigate) and `.rs-filters` (filter)

**Two selection markers, and only two — decided, not proposed.**

| Marker | Means | Used by |
|---|---|---|
| **Teal underline + bold** | "This is the page or section you are on" | Site nav, in-page tabs, investor anchor nav, article TOC |
| **Solid blue pill** | "This is the filter you applied" | Insight filters, library categories, year chips, role chips, segmented switch |

The blue tab underline and the library's inset blue bar are retired; they fold into these two.

```html
<div class="rs-tabs" role="tablist">
  <button class="rs-tabs__tab" role="tab" aria-selected="true">Overview</button>
  <button class="rs-tabs__tab" role="tab" aria-selected="false">Capabilities</button>
</div>

<div class="rs-filters" role="group" aria-label="Filter insights">
  <button class="rs-filters__chip" aria-pressed="true">All</button>
  <button class="rs-filters__chip" aria-pressed="false">Case studies</button>
</div>
```
```css
.rs-tabs{display:flex;gap:4px;border-bottom:1px solid var(--rs-border-default);overflow-x:auto;scrollbar-width:none}
.rs-tabs::-webkit-scrollbar{display:none}
.rs-tabs__tab{background:none;border:0;padding:12px 20px;cursor:pointer;
  font-family:var(--rs-font-body);font-weight:600;font-size:14px;
  color:var(--rs-fg-muted-alt);white-space:nowrap;position:relative}
.rs-tabs__tab[aria-selected="true"]{color:var(--rs-fg-brand);font-weight:700}
.rs-tabs__tab[aria-selected="true"]::after{
  content:"";position:absolute;inset:auto 0 -1px 0;height:2.5px;border-radius:2px;
  background:var(--rs-select-nav-marker);   /* teal — navigation, not filtering */
}

.rs-filters{display:flex;flex-wrap:wrap;gap:8px}
.rs-filters__chip{
  font-family:var(--rs-font-ui);font-size:14px;cursor:pointer;
  background:var(--rs-bg-page);color:var(--rs-fg-body);
  border:1px solid var(--rs-border-strong);border-radius:var(--rs-radius-pill);padding:7px 15px;
}
.rs-filters__chip[aria-pressed="true"]{
  background:var(--rs-select-filter-bg);border-color:var(--rs-select-filter-bg);
  color:var(--rs-select-filter-fg);
}
```

#### `.rs-anchornav` · `.rs-toc`
```css
.rs-anchornav{position:sticky;top:calc(var(--rs-nav-h) + 8px);z-index:var(--rs-z-sticky);padding-block:6px}
.rs-anchornav__track{
  display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;width:max-content;max-width:100%;
  margin-inline:auto;padding:5px;border-radius:var(--rs-radius-14,14px);
  background:rgba(255,255,255,.92);backdrop-filter:blur(10px);
  border:1px solid var(--rs-border-subtle);box-shadow:0 6px 20px rgba(11,31,58,.06);
}
.rs-anchornav a{flex-shrink:0;padding:9px 16px;border-radius:var(--rs-radius-md);
  font-family:var(--rs-font-ui);font-weight:600;font-size:14px;color:var(--rs-fg-body);
  text-decoration:none;white-space:nowrap}
.rs-anchornav a.is-active{                    /* navigation → teal underline */
  color:var(--rs-fg-brand);font-weight:700;
  box-shadow:inset 0 -2px 0 var(--rs-select-nav-marker);
}

.rs-toc{position:sticky;top:calc(var(--rs-nav-h) + 24px);align-self:start;font-family:var(--rs-font-toc)}
.rs-toc a{display:block;font-size:14px;color:var(--rs-fg-muted-alt);padding:10px 0;
  border-bottom:1px solid var(--rs-border-default);text-decoration:none;line-height:1.35}
.rs-toc a.is-active{color:var(--rs-fg-heading);font-weight:700;
  box-shadow:inset 2px 0 0 var(--rs-select-nav-marker)}
@media (max-width:960px){
  .rs-toc{position:static;border:1px solid var(--rs-border-default);
    border-radius:var(--rs-radius-lg);padding:6px 16px}
}
```

---

### 4.6 Cards

#### `.rs-card` — the base
Everything below extends it. Set the surface once, here.

```css
.rs-card{
  background:var(--rs-bg-page);border:1px solid rgba(0,0,0,.08);
  border-radius:var(--rs-radius-xl);padding:var(--rs-card-pad);
  box-shadow:var(--rs-shadow-rest);
}
.rs-card--raised{border:0;box-shadow:var(--rs-shadow-lift)}
.rs-card--interactive{transition:transform var(--rs-dur-base),box-shadow var(--rs-dur-base)}
.rs-card--interactive:hover{transform:translateY(-3px);box-shadow:var(--rs-shadow-lift)}
```

#### `.rs-quote-card` — testimonials, alumni, leadership quotes
```html
<figure class="rs-card rs-quote-card">
  <blockquote>The collaborative culture here is unlike anywhere I've worked.</blockquote>
  <figcaption>
    <img src="…" alt="" width="44" height="44">
    <span><b>Rohan Kapoor</b><span>Principal Engineer, RS Software</span></span>
  </figcaption>
</figure>
```
```css
.rs-quote-card{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:22px;margin:0}
.rs-quote-card::before{content:"";position:absolute;inset:0;opacity:.035;pointer-events:none;
  background:linear-gradient(141deg,#5cc5bf 0%,var(--rs-fg-brand) 100%)}
.rs-quote-card blockquote{margin:0;position:relative;flex:1;
  font-family:var(--rs-font-testi);font-size:15.5px;line-height:1.55;color:var(--rs-fg-default)}
.rs-quote-card figcaption{display:flex;gap:12px;align-items:center;position:relative}
.rs-quote-card img{width:44px;height:44px;border-radius:50%;object-fit:cover}
.rs-quote-card b{font-family:var(--rs-font-testi);font-weight:700;font-size:14px;display:block}
.rs-quote-card figcaption span span{font-family:var(--rs-font-testi);font-size:12.5px;color:rgba(0,0,0,.55)}
```

#### `.rs-role-card` — open roles
```html
<article class="rs-card rs-card--raised rs-role-card">
  <h3 class="rs-role-card__title">Payment Systems Engineer</h3>
  <p class="rs-role-card__meta">Full-time · Denver, CO</p>
  <p class="rs-role-card__desc">Build the next generation of payment infrastructure.</p>
  <a class="rs-btn rs-btn--primary rs-btn--sm" href="…">View role</a>
</article>
```
```css
.rs-role-card{display:flex;flex-direction:column;align-items:flex-start;gap:0}
.rs-role-card__title{font-family:var(--rs-font-ui);font-weight:500;font-size:20px;margin:0;color:var(--rs-fg-default)}
.rs-role-card__meta{font-family:var(--rs-font-mono);font-size:13.5px;color:var(--rs-fg-muted);margin:6px 0 0}
.rs-role-card__desc{font-family:var(--rs-font-serif);font-size:18px;line-height:1.35;
  letter-spacing:-.01em;margin:20px 0 20px;color:var(--rs-fg-default)}
.rs-role-card--open{background:transparent;border:1px dashed var(--rs-fg-default);box-shadow:none}
```

#### `.rs-product-card`
```html
<a class="rs-card rs-card--interactive rs-product-card" href="…" style="--c:#0F766E">
  <img class="rs-product-card__logo" src="…" alt="RS DigitalEdge™" height="28">
  <p class="rs-product-card__claim">Multi-rail orchestration without replacing your core.</p>
  <ul><li>ISO 20022 native</li><li>Intelligent routing</li></ul>
  <span class="rs-product-card__more">Explore →</span>
</a>
```
```css
.rs-product-card{border-top:4px solid var(--c);display:flex;flex-direction:column;gap:16px;
  text-decoration:none;color:inherit;padding:26px 22px}
.rs-product-card__logo{width:auto;height:28px;object-fit:contain;object-position:left center}
.rs-product-card__claim{font-weight:600;font-size:15px;line-height:1.4;color:var(--rs-fg-heading);margin:0}
.rs-product-card ul{list-style:none;margin:0;padding:0;display:grid;gap:10px;flex:1}
.rs-product-card li{display:flex;gap:9px;font-size:13.5px;line-height:1.4;color:var(--rs-fg-body)}
.rs-product-card li::before{content:"";width:6px;height:6px;border-radius:50%;
  background:var(--c);margin-top:7px;flex-shrink:0}
.rs-product-card__more{font-size:13.5px;font-weight:600;color:var(--c)}
.rs-product-card.is-dim{opacity:.35;filter:grayscale(.6);transform:scale(.98)}
```

#### `.rs-resource-card` — case studies, videos, whitepapers, blog
```css
.rs-resource-card{padding:0;overflow:hidden;display:flex;flex-direction:column;
  border-color:var(--rs-border-subtle);border-radius:var(--rs-radius-panel)}
.rs-resource-card__thumb{aspect-ratio:2.1;position:relative;display:grid;place-items:center;
  background:var(--rs-grad-brand)}
.rs-resource-card__body{padding:18px 20px 20px;display:flex;flex-direction:column;gap:9px;flex:1}
.rs-resource-card__metric{font-size:12px;font-weight:600;color:var(--rs-fg-muted)}
.rs-resource-card__title{font-weight:700;font-size:16px;line-height:1.35;color:var(--rs-fg-heading);margin:0}
.rs-resource-card__excerpt{font-size:13.5px;line-height:1.5;color:var(--rs-fg-body);margin:0;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.rs-resource-card__tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto;padding-top:6px}
.rs-resource-card__date{font-size:12px;color:var(--rs-fg-muted)}
```

#### `.rs-news-card` · `.rs-person-card` · `.rs-doc-row`
```css
.rs-news-card{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:10px;padding:24px}
.rs-news-card::before{content:"";position:absolute;inset:0 0 auto 0;height:4px;
  background:linear-gradient(90deg,var(--p-billedge),var(--rs-teal-bright))}
.rs-news-card__cat{font-family:var(--rs-font-ui);font-weight:700;font-size:11.5px;
  letter-spacing:.12em;color:var(--rs-fg-brand)}
.rs-news-card__title{font-family:var(--rs-font-ui);font-weight:700;font-size:19px;
  line-height:1.3;color:var(--rs-fg-heading);margin:0}

.rs-person-card{padding:14px 14px 18px;display:block;color:inherit;text-decoration:none}
.rs-person-card img{width:100%;aspect-ratio:1.2;object-fit:cover;object-position:top;
  border-radius:var(--rs-radius-md);background:var(--rs-border-default)}
.rs-person-card b{display:block;font-weight:500;font-size:16px;margin-top:14px;color:var(--rs-fg-heading)}
.rs-person-card span{display:block;font-size:13px;color:var(--rs-fg-muted);margin-top:4px}
.rs-person-card:hover b{color:var(--rs-fg-brand)}

.rs-doc-row{display:flex;align-items:center;gap:14px;padding:13px 10px;
  border-radius:var(--rs-radius-lg);color:var(--rs-fg-heading);text-decoration:none;
  transition:background var(--rs-dur-fast)}
.rs-doc-row:hover{background:var(--rs-bg-subtle)}
.rs-doc-row__icon{width:40px;height:44px;flex-shrink:0;display:grid;place-items:center;
  border-radius:var(--rs-radius-sm);background:#fdecec;color:var(--p-amber-700);
  font-family:var(--rs-font-mono);font-size:10.5px;font-weight:600}
.rs-doc-row__title{display:block;font-weight:600;font-size:14.5px;line-height:1.35}
.rs-doc-row__meta{display:block;font-size:12.5px;color:var(--rs-fg-muted);margin-top:2px}
.rs-doc-row__action{margin-left:auto;flex-shrink:0;display:inline-flex;align-items:center;gap:6px;
  padding:8px 12px;border-radius:var(--rs-radius-md);background:var(--rs-bg-brand-soft);
  font-family:var(--rs-font-ui);font-weight:700;font-size:13px;color:var(--rs-fg-brand)}
.rs-doc-row:hover .rs-doc-row__action{background:var(--rs-action-primary-bg);color:var(--rs-action-primary-fg)}
```

---

### 4.7 Data display

#### `.rs-stats`
```html
<div class="rs-stats">
  <div class="rs-stat">
    <p class="rs-stat__value" data-count-to="99.99">99.99%</p>
    <p class="rs-stat__label">Uptime SLA</p>
    <p class="rs-stat__desc">Across mission-critical payment rails</p>
  </div>
</div>
```
```css
.rs-stats{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:var(--rs-space-7);
  border-radius:var(--rs-radius-2xl);background:var(--rs-grad-stat);
  padding:clamp(26px,4vw,40px) clamp(22px,4vw,44px);
}
.rs-stat__value{font-family:var(--rs-font-ui);font-weight:700;font-size:clamp(30px,3.6vw,44px);
  letter-spacing:-.5px;line-height:1.05;color:var(--rs-data-value);margin:0 0 8px;
  font-variant-numeric:tabular-nums}
.rs-stat__label{font-family:var(--rs-font-ui);font-weight:700;font-size:15.5px;
  color:var(--rs-data-label);margin:0 0 5px}
.rs-stat__desc{font-size:14px;line-height:1.5;color:var(--rs-fg-body-alt);margin:0}
@media (max-width:640px){
  .rs-stats{grid-template-columns:1fr 1fr;gap:22px 16px;padding:22px 18px}
  .rs-stat__value{font-size:18px}
}
```

> Only publish figures RS can verify. The count-up is presentation, not licence to round up.

#### `.rs-tag` · `.rs-badge`
```css
.rs-tag{display:inline-block;font-family:var(--rs-font-ui);font-weight:700;font-size:11.5px;
  border-radius:var(--rs-radius-pill);padding:4px 10px;background:#eef2f7;color:var(--rs-fg-body-alt)}
.rs-tag--case{background:var(--p-blue-200);color:#1d4ed8}
.rs-tag--video{background:var(--rs-status-success-surface);color:var(--rs-status-success-text)}
.rs-tag--paper{background:#e0e7ff;color:#4338ca}
.rs-tag--blog{background:var(--rs-status-warning-surface);color:var(--rs-status-warning)}
.rs-tag--news{background:var(--p-blue-100);color:#0369a1}
.rs-tag--billedge{background:#f1f5f9;color:var(--rs-fg-body-alt)}
.rs-tag--payabbhi{background:#fce7f3;color:var(--p-payabbhi)}
.rs-tag--digitaledge{background:var(--rs-status-success-surface);color:var(--p-digitaledge)}
.rs-tag--intelliedge{background:#ede9fe;color:var(--p-intelliedge)}

.rs-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--rs-font-ui);
  font-weight:600;font-size:12px;border-radius:var(--rs-radius-pill);padding:4px 11px;
  background:var(--rs-teal-light);color:var(--rs-fg-brand)}
```

> `--blog` moves to amber: it was the same green as `--video` and the two were indistinguishable.

#### `.rs-table`
```css
.rs-table{width:100%;border-collapse:collapse;font-size:14.5px}
.rs-table th{text-align:left;font-family:var(--rs-font-ui);font-weight:600;font-size:13px;
  color:var(--rs-fg-muted);padding:12px 16px;border-bottom:2px solid var(--rs-border-default)}
.rs-table td{padding:14px 16px;border-bottom:1px solid var(--rs-border-default)}
.rs-table tbody tr:hover{background:var(--rs-bg-subtle)}
.rs-table :is(th,td).is-numeric{text-align:right;font-family:var(--rs-font-mono);font-variant-numeric:tabular-nums}
.rs-table-scroll{overflow-x:auto}   /* wrap every table in this */
```

---

### 4.8 Bands and disclosure

#### `.rs-cta` — the closing band
**Replaces `.cta-band`, `.know` and `.globe-cta`.**

```html
<aside class="rs-cta rs-cta--teal">
  <div><h2>Ready to integrate?</h2><p>Spin up a sandbox, or talk to an architect.</p></div>
  <div class="rs-cta__actions">
    <a class="rs-btn rs-btn--gradient rs-btn--on-dark" href="/sandbox">Sandbox</a>
    <a class="rs-btn rs-btn--outline rs-btn--on-dark" href="/docs">Read the docs</a>
  </div>
</aside>
```
```css
.rs-cta{
  display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;
  border-radius:var(--rs-radius-2xl);padding:clamp(24px,4vw,40px);
  background:var(--rs-cta-bg,var(--rs-teal));color:var(--rs-on-teal-fg);
}
/* White on #5cc5bf is 2.06:1. Copy on the teal band sits in ink (8.02:1);
   only the deep and product variants reverse to white. */
.rs-cta--deep,.rs-cta--product{color:var(--rs-fg-inverse)}
.rs-cta h2{font-family:var(--rs-font-ui);font-size:22px;margin:0}
.rs-cta p{margin:6px 0 0;font-size:14.5px;opacity:.92}
.rs-cta__actions{display:flex;gap:12px;flex-wrap:wrap}
.rs-cta--deep{--rs-cta-bg:var(--rs-grad-deep)}
.rs-cta--product{--rs-cta-bg:linear-gradient(120deg,var(--c) 0%,#5cc5bf 100%);text-align:center}
@media (max-width:640px){.rs-cta{flex-direction:column;align-items:flex-start}}
```

#### `.rs-accordion`
```html
<div class="rs-accordion">
  <details><summary>Which payment rails are supported?</summary>
    <p>RTP, FedNow, UPI, BBPS, ACH, card and cross-border, over ISO 20022.</p></details>
</div>
```
```css
.rs-accordion details{border-bottom:1px solid var(--rs-border-default)}
.rs-accordion summary{
  list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;
  gap:16px;padding:22px 0;font-family:var(--rs-font-body);font-weight:700;
  font-size:clamp(17px,1.8vw,20px);color:var(--rs-fg-brand);
}
.rs-accordion summary::-webkit-details-marker{display:none}
.rs-accordion summary::after{content:"⌄";font-size:20px;color:var(--rs-fg-heading);
  transition:transform var(--rs-dur-slow)}
.rs-accordion details[open] summary::after{transform:rotate(180deg)}
.rs-accordion p{margin:0 0 28px;font-size:16px;line-height:1.65;color:var(--rs-fg-muted);max-width:var(--rs-measure)}
```

#### `.rs-footer`
```css
.rs-footer{background:var(--rs-navy);color:var(--rs-fg-inverse)}
.rs-footer__top{display:grid;grid-template-columns:1.3fr repeat(4,1fr);gap:32px;
  padding-block:clamp(48px,6vw,72px) clamp(56px,8vw,110px)}
.rs-footer__brand img{height:44px;width:auto}   /* the reversed lockup: teal mark */
.rs-footer h3{font-family:var(--rs-font-ui);font-weight:700;font-size:14.5px;margin:0 0 14px}
.rs-footer a{font-family:var(--rs-font-ui);font-size:14px;color:rgba(255,255,255,.86);text-decoration:none}
.rs-footer a:hover{color:var(--rs-fg-inverse);text-decoration:underline;text-underline-offset:3px}
.rs-footer__bar{background:var(--rs-bg-page);color:var(--rs-fg-muted);
  font-family:var(--rs-font-legal);font-size:12.5px}
@media (max-width:1100px){.rs-footer__top{grid-template-columns:repeat(3,1fr)}
  .rs-footer__brand{grid-column:1/-1}}
@media (max-width:640px){.rs-footer__top{grid-template-columns:1fr 1fr;gap:28px 20px}}
```

---

### 4.9 Page-specific modules

These stay page-specific — documented, not generalised. Full CSS lives in `rs.css`; the rename is what matters.

| Component | Was | What it is |
|---|---|---|
| `.rs-flow` | `.mt` | Input documents flowing through a beam into product result cards |
| `.rs-process` | `.hww` | Auto-rotating three-step panel, each step with its own colour and visual |
| `.rs-audience` | `.stake` | Rotating audience switcher on product pages |
| `.rs-trace` | `.sim` | Dark 16:9 pane replaying a payment trace line by line |
| `.rs-metrics` / `.rs-metric` | `.dash` / `.kpi` | Product hero visual — **illustrative**, not live data |
| `.rs-feature-grid` / `.rs-feature` | `.caps` / `.cap` | Product capability cards outlined in `--c` |
| `.rs-doc-library` | `.lib` | Category rail + year chips + search + document rows |
| `.rs-ownership` | `.shp` | Shareholding: 100% bar with direct labels, plus the same numbers in a table |
| `.rs-ticker` | `.inv-ticks` | Glass tiles on the investor hero |
| `.rs-timeline` | `.timeline` | Gradient rail; four colourways |
| `.rs-assistant` | `.ai` / `.ai-fab` | Ask AI panel |
| `.rs-globe` · `.rs-coin` · `.rs-video--brand` | `.rs-globe` · `.rs-coin` · `.film` | Brand motifs — decorative, `pointer-events:none` |
| `.rs-profile` | `.profile` | Leadership page: cover, circular photo, serif bio, pager |

---

### 4.10 Component checklist

Before a new component is merged:

- [ ] Named `rs-block__element--modifier`, no abbreviation shorter than four letters
- [ ] References semantic or component tokens only — no primitives, no raw hex
- [ ] Works at 375, 640, 960, 1100 and 1440 with no horizontal scroll
- [ ] Focus ring visible; interactive targets ≥44px on touch
- [ ] State on attributes (`aria-*`, `[open]`, `[disabled]`), not classes
- [ ] Text contrast ≥4.5:1 on every ground it can sit on
- [ ] Respects `prefers-reduced-motion`
- [ ] Added to this section with markup, CSS and its variants

---


## 5. Signature patterns

1. **One giant header per page.** `.giant` — Inter 900, uppercase, centred, self-fitting to one line. News, Careers, Contact, Sandbox, Request demo, 404. `.giant--light` adds `text-shadow:0 2px 40px rgba(0,90,140,.35)` on dark.
2. **Eyebrow → title → bar.** `.eyebrow` (RCB 700 13px, +.14em, `--rs-navy`) → `.title` with exactly one phrase in `<em>` brand blue → `.bar` (56×4, `--g-bar`). Wrap in `.head`; `.head--center` centres all three.
3. **The statement block.** `.statement--blue` with a bold lead phrase, then `.statement` regular, then `.prose--lg`. Used instead of a UI heading to open narrative sections on Home and product pages.
4. **Soft gradient tops + waves + coins.** Each page type has its own `--g-top-*`, overlaid with `waves.svg` at 18–70% opacity (`brightness(3–4)` on dark). One or two RS coins float nearby: `pointer-events:none`, hidden under 900px in dense sections, and removed entirely when the headline needs the width (`.page-hero:has(.giant.is-fit) .rs-coin{display:none}`).
5. **Headlines are bold.** Every page or section headline is set at 700 or heavier: the home hero, the “30 Years” figure, section labels, the insights banner, product intro and “Why” titles, and the product closing headline. Two things stay regular on purpose: the statement lead (`.statement--blue`), which pairs a **bold lead phrase** with a regular remainder, and the explanatory `.statement` / `.prose` paragraphs, which are body copy. Added in v7.2.

---

---


## 6. Page templates

| Template | Files | Section order |
|---|---|---|
| **Home** | `index.html` | Teal hero (badge, capture bar, coins) → customer logos → 30-years timeline + film → who we serve → role selector + Magic Transform → how we work → globe CTA |
| **Product** | `products/*.html` | Accent hero (mark, tagline, 2 CTAs, dashboard mock) → KPI band → statement intro → live simulation → benefits → capability grid → stakeholder carousel → "Know more" band |
| **About** | `about.html` | Mint hero → what we do (4 cards) → culture + CEO quote → philosophy → values → board → executives → community → patent band |
| **Leadership profile** | `people/*.html` | Gradient cover behind nav → circular photo → name/role → serif bio → prev/next pager |
| **Careers** | `careers.html` | Giant header → growth + journey splits → alumni and employee testimonials → open roles on the jobs band |
| **Job detail** | `careers/*.html` | Teal wash → centred back link → 664px card (title, mono meta, serif lead, sections) → application form with upload |
| **Insights listing** | `insights.html` | Teal top → search + 2 listboxes + clear → 12 insight cards → empty state → teal CTA band |
| **Article** | `insights/*.html` | Teal top → back link → title + date → 2.15 hero → sticky TOC + serif body → gated panel or open download → related cards (swipe ≤640) |
| **News listing** | `news.html` | Giant header → news cards → media-enquiries CTA band |
| **News detail** | `news/*.html` | Article shell + source line, key points, press clipping figure with dashed fallback |
| **Investor** | `investor.html` | Dark 120° hero + glass ticker → sticky section nav → quick links → document library → shareholding → filings → communications → 29-item FAQ → contact cards |
| **Contact** | `contact.html` | Giant header → soft teal wash → office/subsidiary card + sticky form card |
| **Capture** | `sandbox.html`, `request-demo.html` | Giant header → lede → single form card → "what to expect" → success state |
| **Simple** | `legal.html`, `sitemap.html`, `404.html` | Subtle grey top → `.container-text` body → anchored `h2`s |

---

---


## 7. Accessibility

**Already in place:** skip link · `:focus-visible` 2px blue outline with 3px offset · `aria-expanded` on menus and accordions · listbox semantics on region and filter dropdowns · `aria-current="page"` · `.sr-only` · honeypot + inline validation · global reduced-motion rule · `color-scheme:light` so form fields don't invert.

**Adopted — September 2026.** All three visual fixes are approved and written into the tokens:

| # | Fix | Now |
|---|---|---|
| 1 | CTA gradient ended on `#14b8a6`, white label 2.49:1 | `--rs-grad-cta` ends on `#0d9488` (3.74:1). The old ramp is kept as `--rs-grad-cta-legacy` for reference only. |
| 2 | White copy on the teal band, 2.06:1 | Teal band copy sits in ink `#0b1f3a` (8.02:1) via `--rs-on-teal-fg`. The teal ground is unchanged — the brand colour stays, the text moves. |
| 3 | Form inputs at 15px (14.5px compact) — iOS zooms on focus | All inputs are 16px. |

**Still open**

| Issue | Fix |
|-------|-----|
| `#6b7280` on mint/lilac washes falls below 4.5:1 | Use `--rs-fg-body` (`#374151`) on any tinted ground |
| Nav links, tag chips and `.rs-doc-row__action` are under 44px on touch | Add block padding under `@media (pointer:coarse)` |


**MUST:** one `<h1>` per page (the giant header or the page hero) · real `<button>`/`<a>` · every field labelled · errors linked with `aria-describedby` · alt text on informative images, `alt=""` on washes · layouts hold at 200% zoom and 320px.

---

---


## 8. Motion

Short and functional. Everything decorative is suppressed under `prefers-reduced-motion`, which the stylesheet honours globally by forcing durations to 0.001ms.

| Token | Value | Where |
|---|---|---|
| `--rs-dur-fast` | 150ms | Buttons, links, chips, field borders, menu rows |
| `--rs-dur-base` | 180ms | Card hover lift (−2/−3px, shadow rest → lift) |
| `--rs-dur-slow` | 300ms | Accordion (`grid-template-rows 0fr → 1fr`), chevrons, drawer |
| `--rs-dur-reveal` | 700ms | `.reveal` on scroll (opacity 0→1, translateY 18px→0) |
| `--rs-ease-out` | `cubic-bezier(.2,.8,.2,1)` | Entering, hovering |
| `--rs-ease-in-out` | `cubic-bezier(.4,0,.2,1)` | Drawers, accordions |

Longer, non-token durations belong to specific modules: 450ms for the process pane cross-fade, 900ms/1.2s for the ownership bar and meters, 4–9s loops for the coin, globe and glow.

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{
    animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important;scroll-behavior:auto!important;
  }
  .reveal{opacity:1;transform:none}
}
```

**MUST NOT** put `.reveal` on above-the-fold content — it parks at `opacity:0` until the observer fires, so a crawler, a screenshot or a slow connection sees an empty page.

---


## 9. Rules

**MUST**
1. Take colour, type, radius, shadow, spacing and motion from tokens. A new value needs a token and a line in this file.
2. Give each page exactly one giant header (`.giant`), above the fold, never repeated.
3. Open every section below the hero with eyebrow → title (one `<em>` phrase) → bar.
4. Use one `.btn-gradient` per page; solid blue for inline actions, outline/text for the rest.
5. Set product colour once as `--c` and derive tints with `color-mix()`.
6. Mark the current page/section with the teal underline plus bold weight in site navigation.
7. Pair mono meta with serif description on listing cards.
8. Build desktop-first against 1100 / 960 / 640, using `clamp()` and auto-fit grids in between.
9. Route every form through `RS_CONFIG.forms`.
10. Keep the nav-overlap trio of rules intact when adding a page.
11. Meet WCAG 2.2 AA (see §7).
12. Use verifiable figures in stats, financials and shareholding.
13. Set every page and section headline in bold (700+); keep the bold-lead statement pattern and body statements regular (§5.5).

**MUST NOT**
1. Introduce a new font family, or use one outside its assigned role.
2. Use a product accent (`#EA6C00`, `#A8397F`, `#0F766E`, `#6D28D9`) as a page background, heading, or generic button colour.
3. Use teal `#5cc5bf` for text.
4. Use background pills or colour fills for the active state in site navigation.
5. Repeat the giant header mid-page, or let it wrap to two lines.
6. Recolour, outline, stretch or redraw the RS logo, the coin, or the product marks.
7. Put `.reveal` on above-the-fold content, or ignore `prefers-reduced-motion`.
8. Let decoration (coins, waves, globe) intercept pointer events or sit above interactive content.
9. Add a fourth main breakpoint without first trying `clamp()` or a container query.
10. Write marketing fluff — "synergy", "cutting-edge", "empower", "revolutionise".

---

---


## 10. Review checklist

- [ ] One `.giant` per page, one `<h1>`, no wrap at 375px
- [ ] Sections use eyebrow + title + bar
- [ ] Only tokenised colour, radius, shadow, spacing; no new inline hex
- [ ] One gradient CTA, using `--g-cta-aa`
- [ ] Checked at 375, 640, 960, 1100, 1440 — no horizontal scroll
- [ ] Nav collapses at 960; drawer closes on Esc and on link tap
- [ ] Grids reflow 4 → 2 → 1; stat band 4 → 2; footer 5 → 3 → 2
- [ ] Inputs ≥16px, labels visible, errors actionable and linked
- [ ] Contrast ≥4.5:1 for text; focus ring visible; touch targets ≥44px
- [ ] `prefers-reduced-motion` respected; nothing above the fold carries `.reveal`
- [ ] Page gradient runs behind the nav (border-top trick present)
- [ ] Copy in sentence case, active voice, product marks correct (™ / ®)
- [ ] Headlines bold (700+); statements and prose regular

---

---


## 11. Drift audit

**What it is:** a design system only works while the code keeps using it. Drift is the gap that opens when a component is built with a hand-written value instead of the token — nothing looks broken, but the system stops being the source of truth. These numbers come from parsing `assets/css/rs.css` (1,319 lines → 1,074 rules, comments stripped). **None of the fixes below change how the site looks**, except where noted.

### Measurements

| Metric | Value |
|---|---|
| Style rules | 1,074 |
| Token references vs hand-written hex | **415 vs 459** — 53% of colour declarations bypass the token layer |
| Distinct colours | 130, against 14 colour tokens |
| Distinct pixel font-sizes | 24 (17 of them between 11px and 20px) |
| Distinct padding / margin values | 200 |
| Rule blocks defined twice | 4 |

### Colour — bucket A: token values typed by hand (230 uses, 20 colours)

The token exists and already holds that exact value, so `var(--token)` is a find-and-replace with zero visual change.

| Literal | Should be | Uses | Example |
|---|---|---|---|
| `#ffffff` | `--rs-surface` | 130 | `.about-hero` |
| `#0075b7` | `--rs-blue-primary` | 19 | `.ai-fab` |
| `#0b1f3a` | `--rs-navy-deep` | 15 | `.article-body h2` |
| `#0a0a0a` | `--rs-text-primary` | 14 | `.ci-info__h` |
| `#6b7280` | `--rs-text-muted` | 11 | `.ci-off__city` |
| `#5cc5bf` | `--rs-teal` | 9 | `.home-top` |
| `#14b8a6` | `--rs-teal-bright` | 7 | `.mt__beam` |
| `#374151` | `--rs-text-secondary` | 5 | `.ci-off address` |
| `#e2e8f0` | `--rs-divider` | 4 | `.news-card` |
| `#1e72bd` | `--rs-navy` | 2 | `.inv-hero` |

### Colour — bucket B: no token at all (229 uses, 110 colours)

Six carry most of the weight and are doing real system work — they need names, not removal.

| Literal | Uses | Doing the job of | Example |
|---|---|---|---|
| `#edeff1` | 13 | a second border | `.dd__btn`, `.lib__panel` |
| `#f0f7ff` | 8 | a second blue tint | `.doc-dl__ico`, `.inv-quick__ico` |
| `#334155` | 7 | body text on tinted grounds | `.article-body .intro` |
| `#64748b` | 7 | captions on tinted grounds | `.action .kicker` |
| `#e5e7eb` | 7 | a third divider | `.ci-grp`, `.jd-lead` |
| `#dcfce7` | 6 | success tint | `.doc__tag`, `.meter__track` |
| `#e0f2fe` | 5 | a third blue tint | `.upload__ico`, `.tag--news` |
| `#1f2937` | 5 | a fourth body grey | `.article-body` |
| `#d1fae5` | 5 | success border | `.form-success`, `.gated` |
| `#eef0f2` | 3 | search-field ground | `.filters .search` |

The remaining ~100 colours appear once or twice inside a single decorative module (gradient stops, terminal syntax colours, illustration fills). Those are fine as literals — scoped decoration doesn't need a token.

### Semantic colour — two greens, two reds, one job

| Literal | Uses | Where | Role |
|---|---|---|---|
| `#2ea043` | 5 | `.years`, `.timeline` | success green A |
| `#16a34a` | 2 | `.meter__fill` | success green B |
| `#15803d` | 2 | `.doc__tag`, `.tag--video` | success green C |
| `#10b981` | 2 | `.kpi .up` | positive delta |
| `#dc2626` | 5 | `.field .err`, `.filters__clear` | error red A |
| `#991b1b` | 1 | `.form__status.is-error` | error red B |
| `#c2410c` | 2 | `.doc__ico`, `.term .run` | amber A |
| `#fbbf24` | 1 | `.sim__log .warn` | amber B |

### Type — invisible steps

17 pixel sizes between 11 and 20px, including five pairs less than 1px apart: **13/13.5 · 14/14.5 · 15/15.5 · 16/16.5 · 17/17.5**. Collapsing each pair takes that band from 17 steps to 9 with no perceptible change.

### Duplicated rule blocks

| Selector | Defined | Redefined | Effect |
|---|---|---|---|
| `.statement` | 133 | 911 | later wins; earlier is dead |
| `.globe-wrap` | 436 | 918 | later wins |
| `.filters` | 484 | 923 | later wins (whole layout replaced) |
| `.icard` | 490 | 946 | later wins (border + radius) |

Sections 1–12 were authored together; everything past line ~780 was appended as pages were built — which is exactly where the duplicates and the untokenised colours cluster.

### Radius — scale completed, September 2026

Every radius in use now has a token. `7px` collapses into `6px` (a 1px change on one
component, the segmented switch) and `12px` uses `--rs-radius-lg` instead of the literal.

| Token | Value | Used by |
|---|---|---|
| `--rs-radius-xs` | 2px | Checkboxes |
| `--rs-radius-sm` | 6px | Compact form dialect, segmented switch (was 7px) |
| `--rs-radius-cta` | 9px | Gradient and outline buttons |
| `--rs-radius-md` | 10px | Primary button, inputs, icon tiles |
| `--rs-radius-lg` | 12px | Menu rows, product tiles, alerts — **24 raw uses to migrate** |
| `--rs-radius-14` | 14px | Sticky nav track, simulation pane |
| `--rs-radius-xl` | 16px | Cards |
| `--rs-radius-panel` | 18px | Resource cards, library panels |
| `--rs-radius-2xl` | 20px | Nav bottom corners, stat band, CTA band |
| `--rs-radius-3xl` | 24px | Image tiles, article hero |
| `--rs-radius-pill` | 999px | Chips, filters, badges |

### Streamline plan, in order

| # | Move | Touches | Effort | Visual change | Payoff |
|---|---|---|---|---|---|
| 1 | Swap literals for tokens | 230 declarations, 20 colours | ~1h, mechanical | none | Token coverage 47% → ~72% |
| 2 | Name the six workhorse greys | `#edeff1 #f0f7ff #e0f2fe #334155 #64748b #eef0f2` | ~1h | none | +46 declarations tokenised; kills the 110-colour tail |
| 3 | One semantic set | 4 greens, 2 reds, 2 ambers | ~30m | tiny — two greens shift one step | Status colour becomes testable |
| 4 | Merge the four duplicate blocks | `.statement .filters .globe-wrap .icard` | ~30m | none | −40 lines of dead code |
| 5 | Collapse half-pixel type steps | 5 pairs, 11–20px | ~1h | imperceptible | 17 steps → 9 in the UI band |
| 6 | Pick two "active" markers | Tabs, investor nav, library rail | ~1h | **yes** — two components restyle | One rule instead of four |
| 7 | Spacing onto a 4px grid | 200 distinct values | gradual | sub-pixel | Do it per component, not in one pass |

Moves 1, 2 and 4 are safe to do in one pass and verify with a screenshot diff. Move 6 is the only one needing a design decision (§14).

---

---


## 12. Architecture & migration

The audit measured symptoms. This is the cure. Today: **480 class names across 256 blocks**, **42 blocks of three characters or fewer** (`.mt` `.jf` `.dd` `.ci` `.shp`, and single letters `.c` `.t` `.k` `.m`), and 53% of colour declarations bypassing the tokens.

### 12.1 Three token tiers

| Tier | Purpose | Example | Rule |
|---|---|---|---|
| **Primitive** | The palette. ~40 values replace today's 130. | `--p-blue-500:#0075b7`, `--p-teal-300:#5DC5BF`, `--p-neutral-100:#edeff1` | Never referenced by a component |
| **Semantic** | What components reference — named by role | `--rs-fg-muted: var(--p-neutral-500)`, `--rs-border-subtle: var(--p-neutral-100)` | The layer that makes a re-theme or dark mode possible |
| **Component** | Only where a variant must change a value | `--rs-btn-h:44px`, `--rs-card-pad:28px`, `--c` (product accent) | Kept deliberately small |

**The rule that makes it stick:** a component may reference only semantic or component tokens. A primitive inside a component rule — or a raw hex — fails review.

### 12.2 The semantic set (28 names)

```css
/* Surfaces */
--rs-bg-page          /* white — default ground */
--rs-bg-subtle        /* #f9fafb — alternating sections */
--rs-bg-sunken        /* #eef0f2 — search fields, wells, counters */
--rs-bg-inverse       /* #0b1f3a — dark panels, CTA band, profile cover */
--rs-bg-brand-soft    /* #f0f7ff — icon tiles, doc actions, hovers */
--rs-bg-accent-soft   /* color-mix(--c 10%) — product tints */

/* Text */
--rs-fg-default  #0a0a0a      --rs-fg-heading  #0b1f3a
--rs-fg-body     #374151      --rs-fg-muted    #6b7280
--rs-fg-inverse  white        --rs-fg-brand    #0075b7
--rs-fg-on-brand white        --rs-fg-display  #1a1a1a   /* giant header only */

/* Lines */
--rs-border-subtle  #edeff1   /* cards, panels — 13 untokenised uses today */
--rs-border-default #e2e8f0   /* dividers, accordion rows */
--rs-border-strong  #d0d7de   /* inputs */
--rs-border-focus   #0075b7   /* + 3px ring */

/* Actions */
--rs-action-primary-bg / -hover / -active / -fg
--rs-action-accent-bg        /* derives from --c */
--rs-action-quiet-bg         /* on-dark pills: white / mint */

/* Status — one value each, replacing 4 greens, 2 reds, 2 ambers */
--rs-status-success / -surface / -border
--rs-status-warning / -surface
--rs-status-danger  / -surface
--rs-status-info    / -surface
--rs-status-positive  /* #10b981 — "up" deltas only */
```

Pattern: `--rs-<role>-<slot>-<state>`. Read it aloud and it should describe the job.

### 12.3 Component naming

`rs-block__element--modifier`, prefixed so nothing collides with a framework or partner embed. State lives on the attribute (`aria-selected`, `aria-expanded`, `[open]`) — the site already does this well.

```
.rs-card                 block      — the thing
.rs-card__title          element    — a part that can't exist alone
.rs-card--raised         modifier   — a variant of the whole thing
.rs-card[aria-disabled]  state      — attribute, not a class
.rs-card { --c: … }      parameter  — the component's public API
```

### 12.4 Renames that earn their keep

| Today | Becomes | Why |
|---|---|---|
| `.mt` | `.rs-flow` | 60 rules behind two letters that read as "margin-top" — the largest block in the file |
| `.jf` | `.rs-form--compact` | Not a component, a second form dialect; as a modifier the duplicate field styling disappears |
| `.dd` / `.dropdown` | `.rs-select` / `.rs-menu` | Two different things both called "dd": a listbox filter and a nav menu |
| `.seg` | `.rs-switch` | Collides with `.shp__seg` (a bar segment) |
| `.icard` | `.rs-resource-card` | Carries case studies, videos, whitepapers and blogs — resources, not just insights |
| `.pcard` | `.rs-product-card` | One letter from `.icard`; unscannable in a diff |
| `.job` | `.rs-role-card` | The UI says "View role" everywhere |
| `.testi` | `.rs-quote-card` | Also used for alumni and leadership quotes |
| `.hww` | `.rs-process` | Initialism for "how we work"; the pattern is reusable |
| `.stake` | `.rs-audience` | It switches audiences (PSPs, ISOs, enterprises, developers) |
| `.sim` | `.rs-trace` | It replays a payment trace line by line |
| `.dash` / `.kpi` | `.rs-metrics` / `.rs-metric` | An illustrative product visual, not a dashboard — the name invites treating mock numbers as real |
| `.shp` | `.rs-ownership` | Three letters for a regulated disclosure |
| `.lib` | `.rs-doc-library` | 36 rules; will be reused for press kits and compliance packs |
| `.caps` / `.cap` | `.rs-feature-grid` / `.rs-feature` | `.cap` reads as caption or capital |
| `.ci` | `.rs-contact` | Reads as "continuous integration" to every engineer |
| `.acc` | `.rs-accordion` | Also reads as "account" |
| `.giant` | `.rs-display` | Names the size, not the role |
| `.statband` | `.rs-stats` / `.rs-stat` | Aligns block with items instead of naming the container's shape |
| `.film` | `.rs-video--brand` | Joins the video family instead of standing beside `.video-box` |
| `.ai` / `.ai-fab` | `.rs-assistant` | Two-letter block for a component on every page |
| `.c .t .k .m .on .up` | scoped elements | Single-letter classes any stylesheet can clobber |

### 12.5 Seven groups that should be one component each

| Group | Today | Becomes |
|---|---|---|
| **Page tops** | `.home-top .insights-top .article-top .about-hero .jobs-band .jd-page .ci-page .inv-hero .p-hero .simple-top` | `.rs-pagetop--{home\|insights\|article\|about\|jobs\|jobdetail\|contact\|investor\|product\|simple}` + ten `--g-top-*` tokens. **Biggest single win.** |
| **Closing bands** | `.cta-band .know .globe-cta` | `.rs-cta--{teal\|deep\|product\|globe}` |
| **Buttons** | `.btn-white .btn-mint .btn-pill-ghost .jf__submit .lib__more` | `.rs-btn--{primary\|gradient\|outline\|quiet\|accent}` + `--on-dark` + `--sm\|--lg` — five blocks disappear |
| **Forms** | `.field` + `.jf .field` | `.rs-field` + `.rs-field--compact` (three values differ, not a component) |
| **Selection** | `.tabs .inv-nav .lib__rail .roles .dd` | `.rs-tabs` (navigate, underline) + `.rs-filters` (filter, pill) — also fixes the four "active" markers |
| **Menus** | products mega-menu, region listbox, filter listbox | `.rs-menu` + `.rs-menu__item` |
| **Cards** | `.card .testi .job .pcard .icard .news-card .person .media-card .feature-card .cap .inv-quick` | One `.rs-card` base + six content types (~60 lines of repetition removed) |

### 12.6 Migration — four waves, no rewrite

| Wave | Work | Risk |
|---|---|---|
| **1 · Tokens, invisible** | Add primitive + semantic layers alongside current tokens; swap the 230 literals for `var()`; name the six greys; merge the four duplicate blocks | None — no markup change, no visual change |
| **2 · Aliases** | New names as additional selectors (`.rs-card, .card { … }`) so old and new markup both work | None — pages migrate one at a time |
| **3 · Consolidate** | Collapse the seven groups, page type by page type. Page tops first (one afternoon, ten blocks gone), then buttons, then cards | Low — delete each old selector as its last page moves |
| **4 · Enforce** | stylelint: no raw hex outside the primitive block, `rs-*` naming pattern, contrast test on semantic pairs | None — prevents drift returning |

**Where it lands:** ~130 colours → ~40 primitives behind 28 semantic names · 256 blocks → roughly 60 components · 53% of colour declarations bypassing tokens → near zero · every component findable by describing it.

---


## 13. Placeholder content

**None of the content currently on the site is final.** It was built to prove the design, not to publish. This section makes that explicit so nobody mistakes a demo figure for a claim — and so replacing it is a task list rather than an archaeology exercise.

### The register

| What | Where | Status | Replace with |
|---|---|---|---|
| Customer logos — Stripe, Pinterest, KPMG, Mercedes-Benz, P&G, TELUS | Home trust row (`.logos`) | **Placeholder** | Cleared reference logos, with written permission on file |
| Testimonials — Priya Sharma, Arjun Mehta, Sneha Reddy, Rohan Kapoor, Deepika Nair, Ankit Joshi | Careers | **Placeholder** | Real quotes, named and approved, with photos |
| Product KPI tiles — 1,247 TPS, 98.5%, $2.4M, 4.8/5, 99.999% | All four product pages | **Placeholder** | Verified platform metrics, or relabel the panel as illustrative |
| Home stats — 30 years, hundreds of billions of transactions | Home | **Verify** | Confirm the wording legal is comfortable publishing |
| Office addresses and phone numbers | `config.js` regions (`+91 33 0000 0000` etc.) | **Placeholder** — the file says so itself | Real numbers; also reconcile with the Contact page, which lists different cities |
| Region → product matrix | `config.js` | **Assumed** | A commercial decision, not a design one |
| Job listings | Careers | **Sample** | Live roles from the ATS |
| News items and insight articles | News, Insights | **Mixed** | Real ones exist; the rest are samples |
| Press clippings | `assets/img/news/` | **Missing** | Named after each story slug; the page degrades gracefully until then |
| Whitepaper PDFs | `assets/docs/` | **Missing** | Named after each insight slug; the download button appears once the file exists |
| Investor documents | Investor library | **Partial** | Real filings |

### The rule

**Placeholder content must be visibly placeholder in the source, never only in someone's memory.**

```html
<!-- RS-PLACEHOLDER: customer logos — awaiting permissions. Owner: marketing. -->
<ul class="logos" data-placeholder="customer-logos">…</ul>
```

- Mark it with the `RS-PLACEHOLDER` comment **and** a `data-placeholder` attribute naming the set.
- One grep — `grep -rn "RS-PLACEHOLDER" .` — must list everything outstanding before launch.
- Numbers presented as performance carry a source or get relabelled. The stat band's count-up is presentation, not licence to round up.
- A component that ships with sample data documents that in §4, so the next person doesn't copy the figures into a new page.

### Before launch

- [ ] `grep -rn "RS-PLACEHOLDER"` returns nothing
- [ ] Every customer logo has written permission
- [ ] Every named person has approved their quote and photo
- [ ] Every published figure has a source
- [ ] Offices and phone numbers match `config.js` and the Contact page
- [ ] Form submissions reach a real inbox, and CVs land somewhere agreed

---

## 14. Completeness — what is done and what is blocked

An honest status, so nobody mistakes a documented gap for a finished decision.

### Done

| Area | State |
|---|---|
| Brand, voice, logo rules, product marks | Complete against the current logo files |
| Tokens — three tiers, 213 values | Complete; shipped as `tokens.css` + `tokens.json`, verified pixel-identical on the live site |
| Foundations — colour, type, breakpoints, layout, motion | Complete, measured from the code |
| Components — 30+ with markup and CSS | Complete for everything on the site today |
| Page templates — 14 types | Complete as section order; skeleton markup still to come |
| Accessibility | Targets set, five fixes identified |
| Drift audit + architecture + migration plan | Complete |

### Still to build (no input needed)

| Item | Why it matters |
|---|---|
| `gallery.html` — every component rendered beside its snippet | The artefact a developer actually works from day to day |
| Page-template skeleton markup | Turns §6 from an order of sections into a starting file |
| Visual regression baselines | Makes "does this match?" a comparison, not an opinion |

### Decided — September 2026

| # | Question | Decision |
|---|---|---|
| 1 | New RS logo | **Later.** The system uses the current extracted assets as placeholders; every rule is final, only the artwork changes. |
| 2 | Three accessibility fixes | **Adopted.** CTA gradient ends `#0d9488`, teal band copy in ink, inputs 16px. |
| 3 | Semantic colour | **Decided.** Success `#2ea043` (accent) with `#15803d` for text, error `#dc2626`, warning `#c2410c`. |
| 4 | Content | **Not real.** All of it is placeholder — §13 is now the register and the rule. |
| 5 | Owner | **Arka Ankit Chowdhury Gupta.** |
| 6 | Active markers | **Two.** Teal underline = the page you are on; solid blue pill = the filter you applied. The other two are retired. |
| 7 | Radius | **Scale completed.** Every value tokenised; `7px` folds into `6px`, `12px` uses `--rs-radius-lg`. |
| 8 | Scope | **Web only** for now. Email, decks and print are out of scope. |

### Still blocked

| # | Needed | Unblocks | Meanwhile |
|---|---|---|---|
| 1 | New RS logo files — full colour, reversed, favicons, mark paths for the coin | Closing §1 | Current assets stand in; the teal-mark rule is already final |
| 2 | Content replacement (§13 register) | Launch, not the system | Everything marked placeholder |
| 3 | Trademark confirmation — ® on Payabbhi, ™ on the other three | A legal detail in §1 | Documented as the site uses them |
| 4 | Form delivery in production — provider, recipient per form, where CVs are stored | Go-live | Netlify, fallback `india@rssoftware.com` |
| 5 | Ask AI content owner | The assistant's answers are brand voice in public | Not covered by this system |


### Scope decisions

Neither is an omission — both are boundaries that should be chosen deliberately.

- **Figma parity.** `tokens.json` imports as Figma variables today. A matching Figma component library has to be built by the design team; this file can't do it.
- **Beyond web — decided: out of scope.** This is a *web* design system. Email templates, decks and print are not covered, and adding them would be a v8 with its own tokens (email-safe colour, print CMYK).

---


## 15. Changelog

**v7.2.0 — 30 September 2026** · Rule added: **headlines are bold** (§5 pattern 5, §9 MUST 13, §10). The home hero, “30 Years”, home section labels, the insights banner and the product closing headline moved from 400 to 700; `.statement--close` added for the product closing headline; §3.2 type table updated. In the same release the v7.1 decisions shipped in code: `tokens.css` (§2.3) loads before `rs.css` on every page and the v3 token block in `rs.css` was removed; 216 hand-typed colours now use tokens and all duplicate rule blocks are merged (§11 moves 1, 2 and 4); the three accessibility fixes, the semantic colour set, the Blog tag and the two selection markers are applied; placeholder content carries `RS-PLACEHOLDER` markers (§13). Still open: the reversed footer logo file, `.reveal` on the home hero (§8), teal text on the insights banner headline and the white outline button on the teal band (§9 MUST NOT 3), the retired terminal amber, and the Wave 2 renames (§12).

**v7.1.0 — September 2026** · owner set to Arka Ankit Chowdhury Gupta. Eight decisions recorded: the three accessibility fixes adopted, semantic colour set (`#2ea043` / `#dc2626` / `#c2410c`), two selection markers, the radius scale completed, scope fixed to web, and all site content declared placeholder — §13 is now the register and the rule for it.

**v7.0.0 — September 2026** · one document. Added §4 Components (27 components with copy-paste markup and CSS on the new naming), §2 with the full token file inline and its verification, §8 Motion and §13 Completeness. Reordered for reading: tokens → components → templates. Token layer shipped as `tokens.css` / `tokens.json`, verified pixel-identical against ten live pages.

**v6.0.0 — September 2026** · added §9 System architecture: three token tiers, the 28-name semantic set, the `rs-*` naming convention, 22 renames, seven component consolidations and a four-wave migration plan.

**v5.0.0 — September 2026** · rebuilt from the shipped code (`rs.css`, 47 pages)
- Corrected against source: `--nav-h` is **84px / 70px** (not 99/72/64); `--gutter` is `clamp(20px,5vw,48px)`; `--rs-navy-deep` is `#0b1f3a`; the giant header is `clamp(56px,13vw,200px)` with JS fitting; the mono face is JetBrains Mono; the breakpoints are **desktop-first 1100 / 960 / 640**, not six mobile-first ones.
- Added everything v4 missed because it was written blind: the Investor section (ticker, sticky nav, document library, shareholding bar, FAQ), the region picker, leadership profiles, job-detail and capture pages, the Ask AI assistant, the coin/globe/film/waves motifs, Magic Transform, how-we-work and stakeholder steppers, live simulations, dashboard mocks, and the page-top gradient system.
- Added the drift audit (§8) and the proposed additive token set (§2.2).
- Added the teal-mark brand rule and `logo-rs-reversed.svg`; flagged the all-white footer logo and the `#5DC5BF` vs `#5CC5BF` mismatch.
- Measured the drift audit (§8): 415 token references vs 459 literals, 230 uses that are tokens typed by hand, 229 with no token, 24 font sizes, 200 spacing values.
- Added the full logo section (company lockup, four product lockups and marks, partner logos, misuse rules, swap checklist) and §13 Completeness.
- Logo change is pending: §1 lists every file and size to replace.

**v4** — first pass, written without access to the site; superseded.
**v3** — colour, type, giant header, section heading, layout basics, radius, shadow, gradients, buttons, cards, stat band, nav, footer, tokens, rules.

---
