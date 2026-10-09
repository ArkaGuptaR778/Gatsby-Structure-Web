# AGENTS.md

`CLAUDE.md` in this directory is the single source of truth for this repository. Read it in full before doing anything else. It covers the commands, architecture decisions, the task workflow (`internal-docs/PROMPTS.md`) and the design references.

Do not duplicate its content here. If `CLAUDE.md` and this file ever disagree, `CLAUDE.md` wins.

**Hard rule (also in `CLAUDE.md`): never commit, stage or push, and never change git state, until the user has manually tested the site locally. The user commits and pushes to `main` personally. Suggest a commit message only.**

Notes for agents other than Claude Code:

- Where `CLAUDE.md` says "Claude Code", read it as "you". Skill names such as `commit-message` don't exist for you; follow the `[Tnnn] Title` commit format it describes.
- Use the task prompts in `internal-docs/PROMPTS.md` as written.
