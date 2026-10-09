---
# EVERY IMAGE, VIDEO AND ANIMATION ON THE SITE — one line per slot, page by page (same order as the asset deck).
#
# How a line reads:
#   - **slot-name** — description {settings}
#   slot-name     never change it: it is how the page finds this slot
#   description   what the visual shows. Screen readers read it out (write "decorative" for purely decorative art)
#   settings      image=file.webp            a picture in static/assets/img/   (sub-folders allowed: image=office/team.webp)
#                 video=name                  a film in static/assets/video/: name.mp4 is the full film with sound;
#                                             name-loop.mp4 (+ name-loop.webm) is the short silent loop that plays
#                                             in place. Without a loop file, the full film loops silently instead.
#                 poster=file.webp            the still shown before a video starts (in static/assets/img/)
#                 duration=1:46               the length shown on the play button
#                 status=placeholder|approve|final   where the asset stands (the asset deck uses the same words)
#
# Any picture slot (image=) can show a video instead: write video=name in place of image=file (it plays silently, on a loop).
#
# Slots marked "animation" are drawn by the site (the default). Give one an image= or video= and that file
# replaces the animation in the same frame, e.g. a real product screenshot instead of the illustrated dashboard.
# Remove the setting again to go back to the animation.
#
# To swap a visual: put the new file in static/assets/img (or static/assets/video), change the file name on its
# line, save, rebuild. Keep the same shape as the old file (a wide image for a wide slot) so the layout holds.
# Logos in the "Trusted by" strip are in home.md (## clients); leadership photos are in team/<slug>.md (photo:).
# Story and insight banners are in src/lib/content/news.ts and insights.ts (img: one name per story).
---

## home
# Home page, top to bottom.
- **home.film** — Play the RS Software film, 2 minutes, with sound {video=rs-film poster=sky.webp duration=2:00 status=final}
- **home.flow** — Payment documents flow into the RS core and come out as product outcomes: bills presented and reconciled by RS Bill@Edge, wires routed by RS DigitalEdge, fraud held by RS IntelliEdge, merchants onboarded by Payabbhi {animation status=approve}
- **home.how-1** — A white maze seen from above: finding the path through payment complexity {image=home/how-strategy.webp status=approve}
- **home.how-2** — A stepped white pyramid: building and scaling layer by layer {image=home/how-build.webp status=approve}
# home.how-3 alternative supplied by the designer: image=home/how-ai-alt.webp (a white flower with dew drops)
- **home.how-3** — Screens of network data rising from a digital mesh: evolving with AI {image=home/how-ai.webp status=approve}
- **home.globe** — Interactive globe showing RS Software offices in Kolkata, Milpitas, Toronto and Copenhagen, connected to payment markets worldwide. Drag to rotate. {animation status=approve}
- **home.astronaut** — decorative {image=astronaut.webp status=approve}

## products
# Each product page: the illustration beside the hero, the "See it in action" demo and the participant icons.
# participants: give icons=a.svg,b.svg,c.svg,d.svg (one per participant, in order) to replace the built-in icons.
#   Write - for a participant that keeps its built-in icon, e.g. icons=banks.svg,-,-,networks.svg
- **product.bill-edge.dashboard** — Illustrative RS Bill@Edge dashboard {animation status=placeholder}
- **product.bill-edge.demo** — RS Bill@Edge processing a live bill payment {animation status=placeholder}
- **product.bill-edge.participants** — decorative (participant illustrations: banks, billers, customers, networks) {icons=products/billedge-banks.svg,products/billedge-billers.svg,products/billedge-customers.svg,products/billedge-networks.svg status=final}
- **product.payabbhi.dashboard** — Illustrative Payabbhi dashboard {animation status=placeholder}
- **product.payabbhi.demo** — Payabbhi accepting a live payment {animation status=placeholder}
- **product.payabbhi.participants** — Participant icons: PSPs & PayFacs, ISOs & aggregators, enterprises, developers {animation status=approve}
- **product.digitaledge.dashboard** — Illustrative RS DigitalEdge dashboard {animation status=placeholder}
- **product.digitaledge.demo** — RS DigitalEdge orchestrating a live transaction {animation status=placeholder}
- **product.digitaledge.participants** — Participant icons {animation status=approve}
- **product.intelliedge.dashboard** — Illustrative RS IntelliEdge dashboard {animation status=placeholder}
- **product.intelliedge.demo** — RS IntelliEdge scoring a live transaction {animation status=placeholder}
- **product.intelliedge.participants** — Participant icons {animation status=approve}

## about
- **about.hero** — Four hands joining jigsaw pieces: partnership {image=about/hero-partnership.webp status=approve}
- **about.founder** — Watch the founder’s message, 1 minute 46 seconds, with sound {video=founder-message poster=founder-message-poster.webp duration=1:46 status=final}
- **about.philosophy** — Newton’s cradle in motion: one action carried through {image=about/philosophy-momentum.webp status=approve}
- **about.community** — Illustration of RS Software’s community commitments with Veerayatan since 1991 — seva, shiksha and sadhana {image=community-pillars.svg status=approve}
- **about.patent** — A row of well-used coloured pencils: creativity {image=about/patent-creativity.webp status=approve}

## culture
# Our Culture page.
- **culture.cover** — decorative (banner behind the page title, under the brand gradient) {image=about/philosophy-momentum.webp status=approve}
- **culture.founder** — Watch the founder’s message, 1 minute 46 seconds, with sound {video=founder-message poster=founder-message-poster.webp duration=1:46 status=final}
- **culture.divider** — decorative (wave lines between sections) {image=flow-wave.svg status=final}
- **culture.philosophy** — Signposts reading “values” and “partnerships” {image=philosophy.webp status=approve}
- **culture.community** — Veerayatan since 1991 — seva (service), shiksha (education) and sadhana (inner development) {image=community-pillars.svg status=approve}

## careers
# Careers accordion: three pictures per panel, left to right (images=a.webp,b.webp,c.webp).
# Testimonial portraits are with each quote in src/lib/content/careers.ts.
- **careers.panel-1** — decorative (Where your work powers global payments) {images=careers-1.webp,careers-2.webp,careers-3.webp status=approve}
- **careers.panel-2** — decorative (Your growth, our commitment) {images=careers-3.webp,careers-1.webp,careers-2.webp status=approve}
- **careers.panel-3** — decorative (Learn. Build. Grow.) {images=careers-2.webp,careers-3.webp,careers-1.webp status=approve}

## insights
# Video articles: give video=name and the real film replaces the preview animation on that article.
- **insights.case-study-image** — Payment operations dashboard in a data centre {image=ops-room.webp status=placeholder}
- **insight.fraud-interdiction-live-demo** — Fraud interdiction in under 200ms — live demo {animation status=placeholder}
- **insight.multi-rail-orchestration-explained** — Multi-rail orchestration explained {animation status=placeholder}
- **insight.iso-20022-migration-guide** — ISO 20022 migration guide — step by step {animation status=placeholder}

## news
# News stories: the banner at the top of each story (wide, about 1600 × 744). Write video=name for a looping film instead.
# Newspaper clippings need no line here: save the scan as static/assets/img/news/<story>.webp (e.g. news/pre-diwali-gift.webp)
# and it appears on its own; until then the story says "Clipping image coming soon".
# ChainIT and RS Software Form Alliance to Bring Risk-Based Authentication to Account-to-Account Payments
- **news.chainit-rs-software-alliance.banner** — decorative (story banner) {image=ops-room.webp status=placeholder}
# The Times of India interviews our MD Raj Jain at the Vision-Tech event of Indian Chamber of Commerce
- **news.times-of-india-raj-jain-vision-tech.banner** — decorative (story banner) {image=about-hero.webp status=placeholder}
# RS Software receives a pre-Diwali gift!
- **news.pre-diwali-gift.banner** — decorative (story banner) {image=community.webp status=placeholder}

## insights-articles
# RS Insights articles, one block per article:
#   .banner  the picture at the top of the article (wide, about 1600 × 744). Video articles use the insight.<article> line above instead.
#   .thumb   the card on the /insights/ listing (and "Related insights"). Without image= it shows the colour gradient with the type icon;
#            give image=file (wide, about 2:1) and the picture fills the card, with the play / type icon kept on top.
# Tier-1 bank cuts scheme integration time by 40%
- **insight.tier-1-bank-scheme-integration.banner** — decorative (article banner) {image=clocks.webp status=placeholder}
- **insight.tier-1-bank-scheme-integration.thumb** — decorative (listing card) {status=placeholder}
# Regional processor reduces false-positive fraud alerts by 63%
- **insight.regional-processor-false-positives.banner** — decorative (article banner) {image=ops-room.webp status=placeholder}
- **insight.regional-processor-false-positives.thumb** — decorative (listing card) {status=placeholder}
# Fraud interdiction in under 200ms — live demo
- **insight.fraud-interdiction-live-demo.thumb** — decorative (listing card) {status=placeholder}
# Multi-rail orchestration explained
- **insight.multi-rail-orchestration-explained.thumb** — decorative (listing card) {status=placeholder}
# ISO 20022: what banks need to know before migrating
- **insight.iso-20022-before-migrating.banner** — decorative (article banner) {image=ops-room.webp status=placeholder}
- **insight.iso-20022-before-migrating.thumb** — decorative (listing card) {status=placeholder}
# The state of real-time payments in 2026
- **insight.state-of-real-time-payments-2026.banner** — decorative (article banner) {image=clocks.webp status=placeholder}
- **insight.state-of-real-time-payments-2026.thumb** — decorative (listing card) {status=placeholder}
# Request-to-pay: a practical walkthrough
- **insight.request-to-pay-walkthrough.banner** — decorative (article banner) {image=ops-room.webp status=placeholder}
- **insight.request-to-pay-walkthrough.thumb** — decorative (listing card) {status=placeholder}
# RS Software recognised by Finacom for three decades of impact
- **insight.three-decades-of-impact.banner** — decorative (article banner) {image=community.webp status=placeholder}
- **insight.three-decades-of-impact.thumb** — decorative (listing card) {status=placeholder}
# IntelliEdge adds generative AI to point-to-point integration
- **insight.generative-ai-point-to-point-integration.banner** — decorative (article banner) {image=patent.webp status=placeholder}
- **insight.generative-ai-point-to-point-integration.thumb** — decorative (listing card) {status=placeholder}
# ISO 20022 migration guide — step by step
- **insight.iso-20022-migration-guide.thumb** — decorative (listing card) {status=placeholder}
# Open banking interoperability: the infrastructure gap
- **insight.open-banking-interoperability.banner** — decorative (article banner) {image=clocks.webp status=placeholder}
- **insight.open-banking-interoperability.thumb** — decorative (listing card) {status=placeholder}
# Building trust in the FedNow era
- **insight.building-trust-fednow-era.banner** — decorative (article banner) {image=ops-room.webp status=placeholder}
- **insight.building-trust-fednow-era.thumb** — decorative (listing card) {status=placeholder}

## site
- **site.share-image** — Picture shown when a page is shared on LinkedIn, X or WhatsApp (1200 × 630 recommended) {image=about-hero.webp status=placeholder}
