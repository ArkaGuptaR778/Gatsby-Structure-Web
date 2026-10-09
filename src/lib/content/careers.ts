/* Careers: open roles, benefits and the Careers page testimonials. Ported from gen/p_misc.py.
   RS-PLACEHOLDER: the roles and testimonials are samples (names, quotes and stock portraits); replace them with
   live roles from the ATS and real, approved quotes. Owner: HR. Each role has a page at /careers/<slug>/. */

export type Job = { slug: string; title: string; type: string; loc: string; short: string; lead: string; role: string; reqs: string[] }

export const JOBS: Job[] = [
  { slug: "payment-systems-engineer", title: "Payment Systems Engineer", type: "Full-time", loc: "Denver, CO",
    short: "Build the next generation of payment infrastructure. You'll work with cutting-edge technologies to create scalable, secure payment solutions for millions of users.",
    lead: "Build the payment infrastructure that banks, billers and national schemes depend on every second of every day.",
    role: "You'll design, build and operate high-throughput services across our payment platforms — from real-time clearing and bill-payment switches to fraud-scoring pipelines. You'll work closely with architects, product managers and client teams to take features from design through certification and into production.",
    reqs: ["4+ years building backend services in Java, Go or a similar language", "Experience with distributed systems, messaging (Kafka or similar) and relational databases", "Familiarity with payment standards such as ISO 20022 or ISO 8583 is a strong plus", "A habit of writing tests, runbooks and observability into everything you ship", "Clear communication with both technical and business stakeholders"] },
  { slug: "data-scientist", title: "Data Scientist", type: "Full-time", loc: "Kolkata, India",
    short: "Help build the intelligence layer for payment analytics. You'll turn complex transaction data into clear, actionable insights for enterprise teams.",
    lead: "Help build the intelligence layer behind real-time fraud decisioning and payment analytics.",
    role: "You'll develop and evaluate models that score transactions in milliseconds, detect coordinated fraud across institutions and explain every decision to risk teams and regulators. You'll partner with engineering to take models from notebooks to production and monitor them in the field.",
    reqs: ["3+ years in data science or applied machine learning (Python, SQL)", "Strong grounding in statistics, classification and anomaly detection", "Experience with imbalanced data, feature engineering and model monitoring", "Interest in explainable AI and model governance", "Experience with payments, banking or fraud datasets is a plus"] },
  { slug: "product-manager", title: "Product Manager", type: "Full-time", loc: "Denver, CO",
    short: "Drive innovation in digital payments. Lead cross-functional teams to deliver products that transform how people and businesses transact globally.",
    lead: "Shape products that move money for banks, billers and merchants around the world.",
    role: "You'll own the roadmap for one of our platforms, working with clients, engineering, design and go-to-market teams. You'll turn regulatory change, scheme mandates and customer needs into clear priorities, and measure outcomes once features are live.",
    reqs: ["4+ years of product management in B2B software, ideally payments or fintech", "Ability to translate complex technical and regulatory requirements into roadmaps", "Comfort working with APIs, data and engineering trade-offs", "Strong written communication and stakeholder management", "Experience with real-time payments, bill payments or fraud products is a plus"] },
]

export const BENEFITS = ["Competitive salary and performance bonus", "Hybrid, flexible working", "Learning budget, certifications and the RS School of Payments", "Health cover for you and your family", "Exposure to national-scale and global payment programmes", "A collaborative culture that rewards ownership"]

/** [quote, name, role, portrait (static/assets/img/<portrait>.webp)] */
export type Testimonial = [string, string, string, string]
export const TESTI_ALUMNI: Testimonial[] = [
  ["RS Software gave me the foundation to build a thriving career in fintech. The payment systems expertise I gained here opened doors I never imagined.", "Priya Sharma", "Senior Engineer at Stripe", "people-1"],
  ["The RS School of Payments transformed my understanding of global payment systems. Today, I lead payment architecture at a major bank.", "Arjun Mehta", "Payment Architect at HDFC Bank", "people-2"],
  ["Working at RS Software taught me how to think at scale. The experience with mission-critical systems prepared me for challenges ahead.", "Sneha Reddy", "Tech Lead at PayPal", "people-3"],
]
export const TESTI_EMP: Testimonial[] = [
  ["The collaborative culture here is unlike anywhere I've worked. Every day I get to solve real problems alongside the brightest minds in payments.", "Rohan Kapoor", "Principal Engineer, RS Software", "people-2"],
  ["What I love most is the sense of ownership. From day one you're trusted to ship things that matter. The learning curve is steep and incredibly rewarding.", "Deepika Nair", "Product Manager, RS Software", "people-3"],
  ["RS Software invests in you. Whether it's a certification, a conference, or a new technology — leadership always finds a way to say yes to growth.", "Ankit Joshi", "Senior QA Lead, RS Software", "people-1"],
]

/** Job application form choices */
export const LOCATIONS = ["Kolkata, India", "Denver, CO", "Remote (India)", "Remote (US)", "Open to relocation"]
export const NOTICE = ["Immediate", "15 days", "30 days", "60 days", "90 days"]
