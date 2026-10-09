# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hard rule: never commit

Never run `git add`, `git commit`, `git push`, `git stash`, `git reset`, create or switch branches, or otherwise change git state, at any point, until the user has manually tested the site locally. The user commits to `main` and pushes it personally. This overrides every other instruction, including task prompts, skills and tool defaults that say to commit or push. When work is done, run typecheck and build, tell the user what to check in the browser, and only *suggest* a commit message. Read-only git commands (`status`, `diff`, `log`) are fine.

## Project state

Main corporate website for RS Software (www.rssoftware.com) as a Gatsby 5 + React 18 + TypeScript (strict) static site.

**The approved site is being migrated in, not redesigned.** A finished static site (49 pages, real content, design system v7.2) has been moved into this structure in four parts, with no visual, content or layout change. Read `docs/PROJECT_CONTEXT.md` first (status, decisions, what to build next), then `docs/MIGRATION.md`: it lists what each part covers, which `PROMPTS.md` tasks it supersedes, and how every page is verified. All four parts are in place: every page of the static site is built here. Content-driven pages come from `gatsby-node.ts` (`/`, `/products/<slug>/`, `/about/`, `/people/<slug>/`, `/news/<slug>/`, `/insights/<slug>/`, `/careers/<slug>/`, `/sitemap/`); fixed pages are in `src/pages/` (Our Culture, News, Insights, Investor, Careers, apply, Contact, Request demo, Sandbox, Legal, 404). What to work on next, in order, is section 6 of `docs/PROJECT_CONTEXT.md`. There are no tests and no linter; `npm run check-links` checks the build for broken internal links.

## Commands

```bash
npm run develop      # dev server at http://localhost:8000 (alias: npm start)
npm run build        # production build to public/
npm run serve        # serve the production build
npm run clean        # clear .cache/ and public/ (use when Gatsby behaves oddly)
npm run typecheck    # tsc --noEmit (strict mode)
npm run check-links  # after a build: every internal link in public/ resolves
```

Before finishing any task, `npm run typecheck` and `npm run build` must both pass. The user tests with `npm run develop` (and `npm run build && npm run serve` for build-sensitive changes).

## Working on a task

0. Migration first: for any page the static site already has, follow `docs/MIGRATION.md`, not the mockup-based prompt. Never restyle, re-layout or rewrite a migrated page; it must stay identical to the static site, apart from the approved changes listed in `docs/PROJECT_CONTEXT.md` (section 1).
1. Open the task in `internal-docs/PROMPTS.md`. It names the mockup, the design-system sections and the acceptance criteria. Stay within that task's scope.
2. Tasks T001–T019 are covered by the migration (`docs/MIGRATION.md` maps each task to a part); the `BLOCKED` ones had no mockup and now follow the static site. For new pages without a mockup, stop and ask instead of inventing a layout.
3. Finish by asking the user to test locally, with a suggested commit message in the form `[Tnnn] Title` plus one-line bullets (`/generate-commit` produces this). Never commit or push; see the hard rule above. The user marks the task `DONE` after committing.

## Slash commands

The project has two commands, defined once in `.claude/skills/<name>/SKILL.md`. Wrappers for Codex (`.agents/skills/`), OpenCode (`.opencode/command/`), Cursor (`.cursor/commands/`) and Antigravity (`.agent/workflows/`) only point at those files. Edit the logic in `.claude/skills/` only.

- `/start-work <task-no>`: implements a task from `PROMPTS.md` (accepts `5` or `T005`).
- `/generate-commit [task-no]`: prints a `[Tnnn] Task title` commit message. It never stages or commits.

## Architecture decisions

- **Routing**: file-based `src/pages/`, plus pages created in `gatsby-node.ts` from content (products, insights, jobs, people, news).
- **URLs**: clean with a trailing slash (`/about/`, `/insights/<slug>/`). The legacy `.html` paths are redirected by pages written after the build from `src/lib/redirects.ts` (`onPostBuild` in `gatsby-node.ts`).
- **Content**: Markdown under `content/` in the site's own format (`home.md`, `about.md`, `products/<page>/shared.md` + `<region>.md`, `team/<slug>.md`; guide in `content/README.md`). It is read at build time by `src/lib/md.ts` and the loaders in `src/lib/content/`, then passed to templates as page context. News, insights, careers roles and the investor FAQ are TypeScript data in `src/lib/content/` (`news.ts`, `insights.ts`, `careers.ts`, `investor.ts`); investor documents are in `static/assets/js/investors-data.js`. Placeholder content is marked with `RS-PLACEHOLDER` / `placeholder:` settings / `data-placeholder`.
- **Insights**: one collection with a `type` field (`blog`, `whitepaper`, `case-study`, `video`, `news`, `docs`) that selects the detail template. URLs are flat.
- **Products**: one template driven by `content/products/<page>/` (shared text + regional intro/metrics/Why per region, switched client-side by the header region picker). Canonical slugs are `bill-edge`, `payabbhi`, `digitaledge`, `intelliedge`. The mockup files are named RBE, Payaabhi, RDE and RSIE, so don't mix up the spellings.
- **Forms**: the backend is undecided (self-hosted on AWS or a SaaS platform). Form markup is in `src/components/forms/`; `static/assets/js/main.js` validates and shows success/error, then calls `window.RS_FORMS.submit`, which `gatsby-browser.js` registers from `src/lib/forms` (adapter interface, `consoleAdapter` default, `httpAdapter` when `GATSBY_FORMS_ENDPOINT` is set). No vendor is hard-coded. Guide: `docs/forms.md`.
- **Hosting**: GitHub Pages, static files only, on the custom domain `www.rssoftware.com` (site root, so no `pathPrefix`). There are no server-side redirects, headers, rewrites or functions. Legacy `.html` URLs use generated HTML meta-refresh redirect pages, `static/CNAME`, `static/.nojekyll` and `static/robots.txt` are in place, and `.github/workflows/deploy.yml` builds and publishes on push to `main` once Pages is set to "GitHub Actions" (`docs/deploy.md`). Anything that pushes to `main` publishes the site.
- **Config**: `gatsby-config.ts`. Analytics uses `process.env.GA_TRACKING_ID`, falling back to the placeholder `G-XXXXXXXXXX`. `siteMetadata.siteUrl` is `https://www.rssoftware.com`; `trailingSlash: "always"`.
- **Styling**: `gatsby-browser.js` imports `src/styles/global.css` (Tailwind layers), then `src/styles/tokens.css` and `src/styles/rs.css` — the site's stylesheets, unchanged from the static site. Pages use the site's own class names (`.container`, `.section`, `.statement`…). Tailwind is available for new work only with the `tw-` prefix and without preflight, so it cannot alter the existing design; its theme points at the design tokens.
- **Interactions**: the site's vanilla scripts in `static/assets/js/` are loaded by `gatsby-browser.js` after React renders (`config.js`, `main.js`, `askai.js`, plus `globe.js` / investor scripts when the page needs them). Links between pages are plain `<a>` tags (full page loads). Don't switch them to Gatsby `<Link>` until the scripts are converted.
- **Assets**: images, video and documents are in `static/assets/` and served at `/assets/…` (same paths as the static site).
- **Generated files** (gitignored): `src/gatsby-types.d.ts`, `.cache/`, `public/`.

## Design references (`internal-docs/`)

- `RS-DESIGN-SYSTEM.md`: **design system v7.2, the source of truth** for the migrated site (tokens in `src/styles/tokens.css`, rules such as bold headlines, two selection markers, one gradient CTA per page). Where it and `DESIGN-SYSTEM.html` disagree (nav height 84/70px, gutters `clamp(20px,5vw,48px)`, JetBrains Mono), v7.2 wins.
- `DESIGN-SYSTEM.html`: the earlier visual reference. Key values:
  - Colors: primary blue `#0075b7` (hover `#005a8e`), teal `#5cc5bf` (light `#e6f7f6`), navy `#1e72bd`, footer navy `#1e3a5f`, hero near-black `#1a1a1a`. Product accents (icon tiles and hovers only, never page-wide): Bill@Edge `#EA6C00`, Payabbhi `#A8397F`, DigitalEdge `#0F766E`, IntelliEdge `#6D28D9`.
  - Fonts: Radio Canada Big (UI), Inter (body, and 800–900 for giant headings), Source Serif 4 (editorial and job descriptions), Geist Mono (meta and labels), Outfit (case-study TOC), Arimo (testimonials), Noto Sans (footer and legal).
  - Layout: new pages use the fluid layout (max-width 1248px, `clamp(20px, 6.6vw, 96px)` gutters), not the fixed 1440px canvas. Nav height is 99px with 20px bottom radius.
  - Rules: one giant hero word per page, the eyebrow + title + gradient-bar pattern for sub-sections, a teal underline as the only "you are here" nav state, and only two CTA styles (solid blue, and gradient for the single primary action).
- `SITEMAP.md`: every page (47 indexed), its URL, the file that renders it and where its content lives.
- `mockups/`: one mockup per page type. Read the relevant image before building the page.
- `PROMPTS.md`: the task list and per-task prompts.
