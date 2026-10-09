# Deploying to GitHub Pages

The site is static: `npm run build` writes everything to `public/`, which GitHub Pages serves at
`https://www.rssoftware.com` (site root, no `pathPrefix`).

## The workflow

`.github/workflows/deploy.yml` runs on every push to `main` (and manually from the Actions tab):
`npm ci` → `npm run typecheck` → `npm run build` → `npm run check-links` → upload `public/` with
`actions/upload-pages-artifact` → publish with `actions/deploy-pages`. If any step fails, nothing is published.

> **Merging this workflow to `main` turns on public deployment.** Every later push to `main` publishes the site.

## One-time setup (repo settings)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.** Until this is set the deploy job fails
   harmlessly and nothing is published.
2. **Custom domain**: Settings → Pages → Custom domain `www.rssoftware.com`, then tick **Enforce HTTPS** once the
   certificate is issued. `static/CNAME` (copied into every build) keeps the domain set.
3. **DNS** (at the domain registrar): `www` → CNAME → `<github-org>.github.io`. For the bare domain
   `rssoftware.com`, add the GitHub Pages A/AAAA records so it redirects to `www`. Verify the domain under the
   organisation's Settings → Pages to prevent takeover.
4. **Variables** (Settings → Secrets and variables → Actions → Variables):
   - `GA_TRACKING_ID`: the Google Analytics ID. Without it the build uses the placeholder `G-XXXXXXXXXX`.
   - `GATSBY_FORMS_ENDPOINT`: the forms backend URL (docs/forms.md). Without it forms show success but send nothing.
   Both are baked into the build, so they are public; never put secrets in them.

## What static hosting can't do

- **Redirects are client-side.** The old addresses (`/about.html`, `/products/bill-edge.html`…) are small HTML pages
  written after the build (`src/lib/redirects.ts`, `onPostBuild` in `gatsby-node.ts`) with a meta refresh, a script
  that keeps `?query` and `#hash`, a canonical link and a visible link. They are not HTTP 301s; search engines follow
  them through the canonical link and the refresh.
- **No custom headers** (security headers, caching rules), **no server code** (functions, form handling): forms post
  to an external backend through the adapter; the Ask AI widget's Chatbase proxy from the Netlify version is not
  available, so it uses its built-in answers.
- **404**: GitHub Pages serves `public/404.html` for any unknown address.
- `static/.nojekyll` stops GitHub from running Jekyll, which would drop folders starting with `_` (Gatsby's `_gatsby/`).

## Before launch

- Replace the placeholder content flagged `RS-PLACEHOLDER` / `data-placeholder` (roles, testimonials, insight counts,
  legal text, regional phone numbers…).
- Choose the forms backend and set `GATSBY_FORMS_ENDPOINT`; test each form end to end.
- Set `GA_TRACKING_ID`, and decide whether a cookie banner is needed (the legal page says no tracking cookies).
- Add the three whitepaper PDFs (`static/assets/docs/`) and the two newspaper clippings (`static/assets/img/news/`),
  then remove them from `ALLOWED_MISSING` in `scripts/check-links.mjs`.
