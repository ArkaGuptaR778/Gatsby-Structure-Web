// Checks the production build (public/) for broken internal links: every href/src starting with "/" in every page
// must resolve to a file (or a folder with index.html). Run after `npm run build`:  npm run check-links
// Known gaps are listed in ALLOWED_MISSING: whitepaper PDFs and newspaper clippings not supplied yet (the pages show
// "PDF available soon" / "Clipping image coming soon"). Remove an entry once its file is added.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs"
import { join } from "node:path"

const ROOT = "public"
const ALLOWED_MISSING = new Set([
  "/assets/docs/iso-20022-before-migrating.pdf",
  "/assets/docs/open-banking-interoperability.pdf",
  "/assets/docs/state-of-real-time-payments-2026.pdf",
  "/assets/img/news/pre-diwali-gift.webp",
  "/assets/img/news/times-of-india-raj-jain-vision-tech.webp",
])

const pages = []
const walk = dir => readdirSync(dir).forEach(f => {
  const p = join(dir, f)
  if (statSync(p).isDirectory()) walk(p)
  else if (f.endsWith(".html")) pages.push(p)
})
walk(ROOT)

const resolves = url => {
  const p = decodeURI(url.split(/[?#]/)[0])
  const f = join(ROOT, p)
  return existsSync(f) && (statSync(f).isFile() || existsSync(join(f, "index.html")))
}

const broken = new Map()
for (const page of pages) {
  const html = readFileSync(page, "utf8")
  for (const [, url] of html.matchAll(/(?:href|src|data-film|poster)="(\/[^"/][^"]*|\/)"/g)) {
    if (url.startsWith("//") || ALLOWED_MISSING.has(url.split(/[?#]/)[0]) || resolves(url)) continue
    if (!broken.has(url)) broken.set(url, new Set())
    broken.get(url).add(page.slice(ROOT.length))
  }
}

if (broken.size) {
  for (const [url, from] of broken) console.log(`✗ ${url}  (on ${[...from].slice(0, 3).join(", ")}${from.size > 3 ? ", …" : ""})`)
  console.log(`\n${broken.size} broken link(s) across ${pages.length} pages`)
  process.exit(1)
}
console.log(`✓ All internal links resolve (${pages.length} pages checked)`)
