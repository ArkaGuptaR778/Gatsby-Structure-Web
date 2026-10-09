---
# Home page (/). Every word on the page lives here; the illustrations, globe and animations stay in code
# (src/lib/illustrations.ts, src/components/sections/home/). Copy: New_Website_HomePage_Content_2.docx (final, Oct 2026).
title: RS Software — Payments-only software. Globally.
description: RS Software helps banks, payment networks, fintechs and payment ecosystem players move billions of transactions securely, reliably and efficiently.
---

## hero
# Word limits: badge_title ≤ 6 · badge_text ≤ 10 · title ≤ 6 · subtitle ≤ 10 · paragraph ≤ 35
badge_title: 30+ years of payments expertise.
badge_text: Proven at scale and built for what moves money next.
title: Payments move fast.
subtitle: The infrastructure behind them has to deliver at scale.
email_placeholder: Email address
button: Talk To Our Expert

RS Software helps banks, payment networks, fintechs, and payment ecosystem players move billions of transactions securely, reliably, and efficiently, from real-time payments and digital acceptance to fraud intelligence, bill payments, clearing, and settlement.

## clients
label: Trusted by the world’s leading organizations ↘

# One line per client, in display order. logo = file name in site/assets/img/logos/ (without extension);
# height = logo height in px; beside=yes shows the name next to a symbol-only mark. Without a logo file the name is shown.
- **Worldpay** {logo=worldpay height=26}
- **Mastercard** {logo=mastercard height=34}
- **MetaBank** {logo=metabank height=26}
- **Visa** {logo=visa height=22}
- **Elavon** {logo=elavon height=26 beside=yes}
- **State Bank of India** {logo=sbi height=28 beside=yes}
- **Discover** {logo=discover height=19}
- **NPCI** {logo=npci height=34}
- **American Express** {logo=amex height=40}
- **NTT DATA** {logo=ntt-data height=20}
- **Hitachi** {logo=hitachi height=16}
- **Deloitte** {logo=deloitte height=24}
- **Authorize.Net** {logo=authorize-net height=20}
- **ICICI Bank** {logo=icici height=28 beside=yes}

## thirty-years
# Word limits: pill ≤ 5 · note ≤ 30 · statement ≤ 15 (bold the first phrase with **…**)
years: 30 Years
pill: in payments-only software
note: For more than three decades, RS Software has engineered technology that helps organizations **process, protect, reconcile, and settle** payments reliably at scale across the payment value chain.
statement: **Three decades. Billions of transactions.** One focus: keeping money moving.

## impact-stats
# The metrics band under the 30 Years section (same style as the product-page metrics).
# Exactly 3 lines: - **value** — label (— optional description). Limits: value ≤ 12 characters · label ≤ 9 words.
# closing: an optional one-line caption under the figures (≤ 30 words). A number in the value counts up on screen.
closing: 30+ years isn't just a milestone. It's proof of experience in an industry where scale, resilience, security, and reliability are business requirements not nice-to-haves.

- **350+ billion** — Transactions processed annually on platforms we've built
- **1,500+** — Payment applications engineered across the value chain
- **$12+ trillion** — In annual transaction value processed on systems we've engineered

## who-we-serve
# Word limits: lead ≤ 10 · statement ≤ 30
title: Who We Serve
lead: **Different payment challenges.** One need: technology that delivers.
statement: RS Software works with organizations across the payment ecosystem, helping them build, modernize, and scale payment capabilities around the outcomes that matter to their business.

# One ### block per audience tab; the heading is the tab name (≤ 3 words).
# title = audience name (≤ 6 words) · text = one sentence under it (≤ 25 words) · exactly 4 bullet cards (≤ 9 words each).
# product = where the link goes.
### Payment Networks
title: Payment Networks & Central Infrastructures
text: Support high-volume payment environments with infrastructure designed for scale, interoperability, resilience, and continuous growth.
link: Explore payment network journey
product: intelliedge

- Build and modernise real-time and batch payment rails
- Create scalable clearing and settlement platforms
- Define operational frameworks and resilience strategies
- Strengthen system-level fraud prevention and risk controls

### Banks & FIs
title: Banks & Financial Institutions
text: Modernize payment capabilities, connect to evolving payment ecosystems, and deliver faster, safer, and more seamless payment experiences.
link: Explore bank journey
product: digitaledge

- Upgrade instant payment hubs and transaction capabilities
- Enable ISO 20022 migration and seamless scheme integration
- Optimise payment routing, orchestration, and treasury flows
- Use AI-powered fraud detection and anomaly monitoring

### Fintechs & PSPs
title: Fintechs & Payment Service Providers
text: Accelerate payment innovation and expand capabilities without taking on the complexity of building every critical component from the ground up.
link: Explore fintech journey
product: payabbhi

- Access API-first payment acceptance and payout infrastructure
- Leverage developer tools, documentation, and sandbox environments
- Launch and test new payment experiences faster
- Collaborate on next-generation payment products

### Billers & Merchants
title: Billers & Merchants
text: Simplify payment acceptance, collections, and payment experiences across channels while supporting the operational needs behind them.
link: Explore biller & merchant journey
product: billedge

- Enable real-time bill payments and digital presentment
- Manage recurring payments and automated mandates
- Improve payment tracking with reconciled reporting
- Streamline finance and operational workflows

## what-we-build
# Word limits: lead ≤ 12 · paragraph ≤ 35 · hint ≤ 25
title: What we build
lead: **From payment rails to the last mile,** we engineer secure, scalable technology.
hint: Select your role below to see which product fits your mandate first — the flow alongside follows your choice.
roles_label: I’M A —
more: Learn more →

Modern payments connect rails, APIs, banks, merchants, fintechs, fraud, clearing, settlement, and data in real time. RS Software helps organizations move faster, manage risk, modernize infrastructure, scale confidently, and simplify complexity.

## flow
in_label: Payments in
out_label: Outcomes out
description: Payment documents flow into the RS core and come out as product outcomes: bills presented and reconciled by RS Bill@Edge, wires routed by RS DigitalEdge, fraud held by RS IntelliEdge, merchants onboarded by Payabbhi

# The "Payments in → Outcomes out" animation: one card per product, shown in this order.
### billedge
kind: BILL · BBPS
title: Electricity bill
meta: ELEC-KOL-0142 · ₹2,340 · due 28 Apr
result: Presented & paid
time: 1.8 s

- Request-to-Pay confirmed
- Reconciled to biller ledger

### digitaledge
kind: SWIFT · MT103
title: Cross-border credit
meta: USD 48,000 · legacy core
result: Routed via RTP
time: 143 ms

- MT103 → pacs.008 (ISO 20022)
- Straight-through, no repair

### intelliedge
kind: UPI · P2P
title: Instant transfer
meta: ₹48,500 · new device · new payee
result: Risk 0.91 · held
time: 78 ms

- Step-up authentication sent
- XAI: device, payee age, velocity

### payabbhi
kind: MERCHANT · KYC
title: Merchant application
meta: KYC pack · 6 documents
result: Merchant live
time: 2m 14s

- Card · UPI · ACH enabled
- Settlement T+0 scheduled

## roles
# "I'M A —" buttons. After the dash: the products to highlight (product keys, comma-separated).
- **Risk & Compliance Leader** — intelliedge,billedge
- **Payments CTO** — intelliedge,payabbhi
- **Digital Banking EVP** — digitaledge,intelliedge
- **Chief Financial Officer (CFO)** — billedge,payabbhi,intelliedge
- **Revenue Operations** — payabbhi,billedge
- **Product Head – Payments / Fintech** — payabbhi,digitaledge,intelliedge

## product-cards
### intelliedge
title: Real-time fraud decisioning for the FedNow era

- Sub-100ms transaction scoring
- 80% fraud reduction benchmark
- Real-time velocity & device signals
- FedNow & RTP native decisioning

### payabbhi
title: Unified merchant payments in one API

- 500+ TPS proven throughput
- PayFac monetization ready
- Card, ACH, RTP, wallet unified
- Linear scalability architecture

### digitaledge
title: ISO 20022 without rip-and-replace

- Legacy MT → MX translation layer
- Deloitte InsurCloud validated
- SWIFT migration in 12–16 weeks
- No core replacement needed

### billedge
title: Reclaim bill-pay relationships

- FedNow overlay for ACH bill-pay
- 700+ institution reach day one
- Biller-direct prevention
- Modern payment rail ready

## why-rs
# Word limits: lead ≤ 16 · up to 2 paragraphs of ≤ 35 words each
title: Why RS
lead: **We don't just build payment technology.** We understand what's at stake when every transaction matters.

We help banks, payment networks, and fintechs modernize without disruption, scale without compromising resilience, reduce risk, and deliver trusted payment experiences that keep pace with a rapidly evolving ecosystem.

## how-we-work
# Exactly 3 steps: step name ≤ 3 words · text ≤ 30 words
kicker: HOW WE WORK

### Shape Payment Strategy
color: #0075b7

Align objectives, payment ecosystem needs, regulatory requirements, and technology choices to create a resilient, scalable foundation for modern digital payment infrastructure at scale across markets.

### Build and Scale
color: #2ea043

Design, implement, integrate, and transition payment solutions into production with scalable testing, seamless migration, operational readiness, and resilient runbooks for dependable high-volume payment operations globally.

### Evolve with AI
color: #995ed4

Continuously modernize payment platforms with AI, data, and automation to strengthen fraud prevention, improve decisioning, optimize operations, and adapt to emerging payment models and ecosystems.

## insights-cta
title: Get some Insight & Perspectives on the future of payments.
button: Go to Insight
globe_label: Interactive globe showing RS Software offices in Kolkata, Milpitas, Toronto and Copenhagen, connected to payment markets worldwide. Drag to rotate.

Use the website as a living briefcase for RS’s thinking – from AI in payments and fraud to cross-border low-value corridors and standards.
