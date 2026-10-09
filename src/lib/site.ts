/* Site-wide data shared by the header, footer and pages (ported from gen/common.py). */
import type { IconName } from "./icons"

export const SITE_URL = "https://www.rssoftware.com"

export type ProductKey = "billedge" | "payabbhi" | "digitaledge" | "intelliedge"
export type Product = { key: ProductKey; name: string; url: string; desc: string; color: string; mark: string; logo: { src: string; alt: string; width: number; height: number } }

/** The four products, in menu order. `logo` is the lockup used on the home product cards. */
export const PRODUCTS: Product[] = [
  { key: "billedge", name: "RS Bill@Edge™", url: "/products/bill-edge/", desc: "Unified bill payment platform for banks & billers", color: "#EA6C00", mark: "logo-mark-billedge.webp",
    logo: { src: "logo-billedge.webp", alt: "RS Bill@Edge™", width: 180, height: 28 } },
  { key: "payabbhi", name: "Payabbhi®", url: "/products/payabbhi/", desc: "End-to-end payments infrastructure for merchants", color: "#A8397F", mark: "logo-mark-payabbhi.webp",
    logo: { src: "logo-payabbhi.webp", alt: "Payabbhi®", width: 138, height: 30 } },
  { key: "digitaledge", name: "RS DigitalEdge™", url: "/products/digitaledge/", desc: "Unified payment modernisation for modern banks", color: "#0F766E", mark: "logo-mark-digitaledge.webp",
    logo: { src: "logo-digitaledge.webp", alt: "RS DigitalEdge™", width: 193, height: 28 } },
  { key: "intelliedge", name: "RS IntelliEdge™", url: "/products/intelliedge/", desc: "AI-powered fraud & risk intelligence", color: "#6D28D9", mark: "logo-mark-intelliedge.webp",
    logo: { src: "logo-intelliedge.webp", alt: "RS IntelliEdge™", width: 184, height: 28 } },
]
export const productByKey = (k: string): Product | undefined => PRODUCTS.find(p => p.key === k)

/** Investor dropdown rows: [anchor, icon, title, description] */
export const INVESTOR_MENU: [string, IconName, string, string][] = [
  ["financials", "chart", "Financial Reports", "Annual reports, results & statements"],
  ["governance", "shield", "Corporate Governance", "Board, committees, policies & disclosures"],
  ["faqs", "book", "Investor FAQs", "Shareholding, dividends & investor contact"],
]

/** Footer columns: [heading, [label, url][]] */
export const FOOTER_COLUMNS: [string, [string, string][]][] = [
  ["Contact", [["Contact Us", "/contact/"], ["Offices", "/contact/#offices"], ["Socials", "/contact/#socials"]]],
  ["Solution", [["Real-time payments", "/products/digitaledge/"], ["Fraud & risk", "/products/intelliedge/"], ["Bill payments & collections", "/products/bill-edge/"], ["Developer platforms", "/products/payabbhi/"]]],
  ["Resource", [["Docs", "/sandbox/"], ["Community Forum", "/contact/?topic=support"], ["Professional Services", "/contact/?topic=sales"], ["Insights", "/insights/"]]],
  ["Company", [["About", "/about/"], ["Our Culture", "/our-culture/"], ["Blog", "/insights/?type=blog"], ["Careers", "/careers/"], ["Press", "/news/"], ["Inclusion", "/our-culture/#community"], ["Leadership", "/about/#leadership"]]],
]

/** Site assets live in static/assets/ and are served from /assets/ (same paths as the static site). */
export const asset = (p: string): string => "/assets/" + p.replace(/^\/?(assets\/)?/, "")
