# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hard rule: never commit

Never run `git add`, `git commit`, `git push`, `git stash`, `git reset`, create or switch branches, or otherwise change git state, at any point, until the user has manually tested the site locally. The user commits to `main` and pushes it personally. This overrides every other instruction, including task prompts, skills and tool defaults that say to commit or push. When work is done, run typecheck and build, tell the user what to check in the browser, and only *suggest* a commit message. Read-only git commands (`status`, `diff`, `log`) are fine.

## Project state

Main corporate website for RS Software (www.rssoftware.com), being redesigned as a Gatsby 5 + React 18 + TypeScript (strict) + Tailwind CSS 3 static site. The design is approved and the work is planned as sequential tasks `T001`–`T019` in `internal-docs/PROMPTS.md`, one commit per task.

The code is still the Gatsby minimal starter until those tasks land: `src/pages/` has only the starter `index.tsx` and `404.tsx`, `src/styles/global.css` holds only the Tailwind directives, and there is no `src/components/`, `content/` or `gatsby-node.ts` yet. Check `PROMPTS.md` for which tasks are `DONE` before assuming a component or page exists. There are no tests and no linter.

## Commands

```bash
npm run develop      # dev server at http://localhost:8000 (alias: npm start)
npm run build        # production build to public/
npm run serve        # serve the production build
npm run clean        # clear .cache/ and public/ (use when Gatsby behaves oddly)
npm run typecheck    # tsc --noEmit (strict mode)
```

Before finishing any task, `npm run typecheck` and `npm run build` must both pass. The user tests with `npm run develop` (and `npm run build && npm run serve` for build-sensitive changes).

## Working on a task

1. Open the task in `internal-docs/PROMPTS.md`. It names the mockup, the design-system sections and the acceptance criteria. Stay within that task's scope.
2. A task marked `BLOCKED` (T013–T018: About/Culture, People, News, Investor, Contact/Demo/Sandbox, Legal/404) has no mockup yet. Stop and tell the user instead of inventing a layout.
3. Finish by asking the user to test locally, with a suggested commit message in the form `[Tnnn] Title` plus one-line bullets (`/generate-commit` produces this). Never commit or push; see the hard rule above. The user marks the task `DONE` after committing.

## Slash commands

The project has two commands, defined once in `.claude/skills/<name>/SKILL.md`. Wrappers for Codex (`.agents/skills/`), OpenCode (`.opencode/command/`), Cursor (`.cursor/commands/`) and Antigravity (`.agent/workflows/`) only point at those files. Edit the logic in `.claude/skills/` only.

- `/start-work <task-no>`: implements a task from `PROMPTS.md` (accepts `5` or `T005`).
- `/generate-commit [task-no]`: prints a `[Tnnn] Task title` commit message. It never stages or commits.

## Architecture decisions

- **Routing**: file-based `src/pages/`, plus pages created in `gatsby-node.ts` from content (products, insights, jobs, people, news).
- **URLs**: clean with a trailing slash (`/about/`, `/insights/<slug>/`). The legacy `.html` paths in `internal-docs/SITEMAP.md` are redirected (T012).
- **Content**: MDX and JSON under `content/` (`insights`, `products`, `jobs`, `team`, `news`), sourced via `gatsby-source-filesystem`. Where real copy isn't available, use placeholder copy flagged `"placeholder": true` so T019 can find it.
- **Insights**: one collection with a `type` field (`blog`, `whitepaper`, `case-study`, `video`, `news`, `docs`) that selects the detail template. URLs are flat.
- **Products**: one JSON-driven template. Canonical slugs are `bill-edge`, `payabbhi`, `digitaledge`, `intelliedge`. The mockup files are named RBE, Payaabhi, RDE and RSIE, so don't mix up the spellings.
- **Forms**: the backend is undecided (self-hosted on AWS or a SaaS platform). Every form submits through the adapter in `src/lib/forms` (T004), and no vendor is hard-coded. `GATSBY_FORMS_ENDPOINT` is an optional env var for a generic HTTP adapter.
- **Hosting**: GitHub Pages, static files only, on the custom domain `www.rssoftware.com` (site root, so no `pathPrefix`). There are no server-side redirects, headers, rewrites or functions. Legacy `.html` URLs use generated HTML meta-refresh redirect pages (T012), `static/CNAME` and `static/.nojekyll` are required, and deployment is a GitHub Actions workflow on push to `main` (T019). Anything that pushes to `main` publishes the site.
- **Config**: `gatsby-config.ts`. Analytics uses `process.env.GA_TRACKING_ID`, falling back to the placeholder `G-XXXXXXXXXX`. `siteMetadata.siteUrl` is still the placeholder `https://www.yourdomain.tld` until T001 sets it to `https://www.rssoftware.com`.
- **Styling**: `gatsby-browser.js` imports `src/styles/global.css` (Tailwind layers) via `gatsby-plugin-postcss`. Tailwind only scans `src/pages/**` and `src/components/**`, so any other directory holding class names (e.g. `src/templates`) must be added to `tailwind.config.js`. Design tokens are not wired into the theme until T001.
- **Generated files** (gitignored): `src/gatsby-types.d.ts`, `.cache/`, `public/`.

## Design references (`internal-docs/`)

- `DESIGN-SYSTEM.html`: source of truth for tokens. Open it in a browser. Key values:
  - Colors: primary blue `#0075b7` (hover `#005a8e`), teal `#5cc5bf` (light `#e6f7f6`), navy `#1e72bd`, footer navy `#1e3a5f`, hero near-black `#1a1a1a`. Product accents (icon tiles and hovers only, never page-wide): Bill@Edge `#EA6C00`, Payabbhi `#A8397F`, DigitalEdge `#0F766E`, IntelliEdge `#6D28D9`.
  - Fonts: Radio Canada Big (UI), Inter (body, and 800–900 for giant headings), Source Serif 4 (editorial and job descriptions), Geist Mono (meta and labels), Outfit (case-study TOC), Arimo (testimonials), Noto Sans (footer and legal).
  - Layout: new pages use the fluid layout (max-width 1248px, `clamp(20px, 6.6vw, 96px)` gutters), not the fixed 1440px canvas. Nav height is 99px with 20px bottom radius.
  - Rules: one giant hero word per page, the eyebrow + title + gradient-bar pattern for sub-sections, a teal underline as the only "you are here" nav state, and only two CTA styles (solid blue, and gradient for the single primary action).
- `SITEMAP.md`: the full page list and legacy URLs (48 indexed pages).
- `mockups/`: one mockup per page type. Read the relevant image before building the page.
- `PROMPTS.md`: the task list and per-task prompts.
