# Repository instructions

This is an owned, independent Claude Code skill and pattern catalog.

- Keep SKILL.md concise and put conditional details in linked references.
- Maintain pattern JSON sources; regenerate cards and index with bun run catalog:write.
- New catalog entries must not silently expand the bundled executor.
- Respect the lockfile. Run bun run check and git diff --check before delivery.
- Native workflow scripts run in Claude, not Node. Offline checks do not prove agent behavior.
- Preview publication requires packaging, catalog and control-flow CI. Stable-release claims
  additionally require the authenticated acceptance in docs/validation.md.
- Keep private paths, credentials and local run artifacts out of the public repository.
- Preserve session ownership. Never change user Claude configuration or install without a request.
- Deliver changes through a task branch and PR; never push directly to the default branch.
