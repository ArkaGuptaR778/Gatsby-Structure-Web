/* Investor Relations page data (/investor/). Ported from gen/p_company.py investor().
   The document libraries (financials, governance, compliance) are data in static/assets/js/investors-data.js,
   rendered by static/assets/js/investors.js. Strings here are HTML (write & as &amp;). */
import { esc } from "../html"
import type { IconName } from "../icons"

/** FAQ groups: [heading, [question, answer][]]. An answer without a full stop that is not HTML names a document in
 *  Policies & codes and becomes a link that opens it there; "BOARD" becomes the board / directorships answer. */
const FAQ_SOURCE: [string, [string, string][]][] = [
  ["About RS Software", [
    ["Who are the key target audiences for the company?", "Customers, partners, employees, investors, the media and regulators."],
    ["Who are the key influencers for the company?", "The rapid growth of electronic payments is pushing payment providers to revise their strategies and launch new products. RS Software helps them adapt, so those providers and the regulators shaping digital payments are our key influencers."],
    ["Where is RS Software located and how many people work for the company?", "RS Software has offices in the US, UK, Singapore and India, employing more than 1,000 professionals who deliver payment solutions."],
    ["What are the Corporate Social Responsibility (CSR) initiatives that you have been associated with?", "Employment creation, summer training programmes, donation of PCs, contributions to relief funds, educational sponsorships, and support for healthcare and education infrastructure for underprivileged communities."],
    ["What corporate governance initiatives, such as reconstitution of the board, has the company taken?", "The board brings together diverse disciplines and independent directors. Results are audited quarterly, and the board and its committees meet regularly, with no more than four months between meetings."],
    ["What is the source of capital?", "Equity shares."],
    ["Does the company primarily generate services income or does it also have Intellectual Property Rights (IPRs) built around certain re-usable components, tools and software products from which recurring licensing income could be derived?", "Alongside comprehensive services, RS Software builds reusable components and has filed patents in India and the USA. Revenue projections include income from IPR-based tools."],
    ["I would like to know more about RS Software. How do I obtain information about the company?", "Our annual reports and the sections of this website cover the company’s history and services in detail. You can also <a href=\"/contact/?topic=investor#message\">write to investor relations</a>."],
    ["What will the company focus on going forward?", "Expanding sales globally, investing in technology, benchmarking against best practice, developing the advisory board, and pursuing an appropriate capital strategy."],
    ["Who are your independent auditors?", "M/s. Chaturvedi &amp; Company, 60 Bentinck Street, Kolkata."],
    ["Who is RS Software’s transfer agent?", "M/s. C.B. Management Services (P) Ltd., P-22 Bondel Road, Kolkata. See <a href=\"#contact\">investor contacts</a>."],
    ["Where can I find the details of Investor Relations Department of the company?", "See <a href=\"#contact\">investor contacts</a> below, or <a href=\"/contact/?topic=investor#message\">send us a message</a>."],
    ["How can I buy RS Software stock?", "RS Software (India) Limited is listed on BSE (517447) and NSE (RSSOFTWARE). Shares can be bought through any SEBI-registered stockbroker."],
  ]],
  ["Policies &amp; governance", [
    ["Where can I find the CSR Policy of RS Software (India) Limited?", "CSR Policy"],
    ["Where can I find the Related Party Transaction Policy of RS Software (India) Limited?", "Related Party Transaction Policy"],
    ["Where can I find the Vigil Mechanism Policy of RS Software (India) Limited?", "Vigil Mechanism Policy"],
    ["Where can I find Criteria for Payment to Non Executive Directors?", "Criteria for Payment to Non-Executive Directors"],
    ["Where can I find the terms and conditions of appointment of Independent Directors?", "Terms &amp; Conditions of Appointment of Independent Directors"],
    ["Where can I find the Policy for Determination of Materiality of Events or Information?", "Policy for Determination of Materiality of Events or Information"],
    ["Where can I find the Policy on determining Material Subsidiaries?", "Policy on Determining Material Subsidiaries"],
    ["Where can I find the Familiarization Programme details of Independent Directors?", "Familiarisation Programme for Independent Directors"],
    ["Where can I see the Compliance Report as per Regulation 7(3) of SEBI (LODR) Regulations, 2015?", "Compliance Report under Regulation 7(3), SEBI (LODR)"],
    ["Where can I find the Composition of various Committees of the Board?", "Composition of Board Committees"],
    ["Who are the Key Managerial Personnel authorized for the purpose of determining Materiality of an Event?", "Key Managerial Personnel authorised to determine materiality"],
    ["Where can I find the Code of Conduct for the Directors and Senior Management of the Company?", "Code of Conduct for Directors &amp; Senior Management"],
    ["Where can I find the details of the designated officials of the Company responsible for assisting and handling investor grievances?", "Officials designated for investor grievances"],
    ["Where can I find the Preservation of Documents cum Archival Policy?", "Preservation of Documents cum Archival Policy"],
    ["Who are the members of the board of directors, including their directorships and full-time positions in other body corporates?", "BOARD"],
    ["Where can I find the Compensation Policy?", "Compensation Policy"],
  ]],
]

const answerHtml = (a: string): string => {
  if (a === "BOARD")
    return 'See the <a href="/about/#leadership">Board of Directors</a> and the <a href="#governance" data-open="governance:policies" data-q="Directorships">directorships of board members</a>.'
  if (!(a.includes("<") || a.endsWith(".")))
    return `Open the <a href="#governance" data-open="governance:policies" data-q="${esc(a.replace(/&amp;/g, "&"))}">${a}</a> in Policies &amp; codes.`
  return a
}

/** FAQ groups with numbered questions (Q1… across both groups) and answers as HTML. */
export const FAQ = (() => {
  let n = 0
  return FAQ_SOURCE.map(([group, items]) => ({ group, items: items.map(([q, a]) => ({ n: ++n, q, a: answerHtml(a) })) }))
})()

const speeches: [string, string][] = [["CEO &amp; MD’s speech", "38th AGM"], ["CEO &amp; MD’s speech", "37th AGM"], ["CEO &amp; MD’s speech", "36th AGM"], ["Chairman’s speech", "35th AGM"], ["Chairman’s speech", "34th AGM"]]

/** Investor communication cards: [icon, kind, title, meta]. All link to the investor archive on rssoftware.ai. */
export const COMMS: [IconName, string, string, string][] = [
  ["video", "Recording", "Investor call", "21 Nov 2025"],
  ["video", "Recording", "38th Annual General Meeting", "AGM webcast"],
  ["doc", "Transcript", "38th AGM transcript", "Full proceedings"],
  ["doc", "Transcript", "Investor call transcript", "21 Nov 2025"],
  ["doc", "Communication", "Investor communication", "October 2015"],
  ...speeches.map(([t, m]): [IconName, string, string, string] => ["award", "Speech", t, m]),
]
