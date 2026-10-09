# RS Software website

Gatsby + TypeScript + Tailwind static site for www.rssoftware.com. The work is split into numbered tasks (`T001`–`T019`) listed in [`internal-docs/PROMPTS.md`](internal-docs/PROMPTS.md). Each task is one commit, and one PR.

## Setup

```bash
npm install
```

Requires a Node version supported by Gatsby 5 (Node 18 or 20).

## Working on a task

You can use any of Claude Code, Cursor, Codex, OpenCode or Antigravity. They all read [`CLAUDE.md`](CLAUDE.md), which is the source of truth for the rules.

1. **Pick a task.** Open the index table in `internal-docs/PROMPTS.md`, take the lowest-numbered task marked `TODO`, and make sure the tasks it depends on are merged. Skip `BLOCKED` tasks; they need a mockup first.
2. **Update `main` and branch.** Do this yourself, not through the agent:

   ```bash
   git checkout main && git pull
   git checkout -b t005-homepage
   ```

3. **Start the agent** in the repo and run:

   ```
   /start-work 5
   ```

   `5`, `T5` and `T005` all work. The agent reads the task's prompt, implements it, and runs `npm run typecheck` and `npm run build`. It stops with a list of things to check.

**The agent never commits, stages or pushes.** You test first, then you commit.

## Testing a task

1. Run the dev server and open http://localhost:8000:

   ```bash
   npm run develop
   ```

2. Compare the page with its mockup in `internal-docs/mockups/` (the task lists which one). Check it at 1440px, 768px and 375px, and with the keyboard (Tab through menus, accordions, tabs and forms).
3. For anything that touches routing, redirects, SEO, images or content queries, also test the production build:

   ```bash
   npm run build && npm run serve   # http://localhost:9000
   ```

4. If something is wrong, tell the agent what to fix and re-test. Don't move on until you're happy.

## Submitting a PR

1. Ask the agent for the commit message:

   ```
   /generate-commit 5
   ```

   It prints a message like `[T005] Homepage` with short bullets. It doesn't commit.
2. Commit and push the branch yourself:

   ```bash
   git status                      # check that only files for this task changed
   git add -A
   git commit                      # paste the message from /generate-commit
   git push -u origin t005-homepage
   ```

3. Open a pull request against `main`, titled with the commit subject (`[T005] Homepage`). In the description, note what you tested (viewports, dev server, production build) and any placeholder content or open questions the agent reported.
4. Once the PR is merged, mark the task `DONE` in the index table of `internal-docs/PROMPTS.md` (in the same PR or a follow-up).

Merging to `main` deploys the site to GitHub Pages, so don't merge until the task has been tested locally.

## Commands

| Command | Purpose |
|---|---|
| `npm run develop` | Dev server at http://localhost:8000 |
| `npm run build` | Production build into `public/` |
| `npm run serve` | Serve the production build at http://localhost:9000 |
| `npm run typecheck` | TypeScript check |
| `npm run clean` | Clear `.cache/` and `public/` if Gatsby misbehaves |
