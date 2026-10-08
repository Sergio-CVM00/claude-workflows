# Prior art and adopted boundaries

Reviewed 2026-10-09. These projects informed an owned synthesis; no third-party skill or
executor was imported, installed or tested by this work.

| Reference | Adopted idea | Boundary |
| --- | --- | --- |
| [blakecyze/swarm principles](https://github.com/blakecyze/swarm/blob/main/skills/swarm-principles/SKILL.md) and [planning](https://github.com/blakecyze/swarm/blob/main/skills/swarm-plan/SKILL.md) | Delegation earns its overhead; self-contained briefs; a fixed judging rubric | Its Markdown guidance is not our native executor. Do not adopt fixed concurrency thresholds, cheap-model defaults or cross-harness fallback rules. |
| [AgentWorkforce pattern chooser](https://github.com/AgentWorkforce/skills/blob/main/skills/choosing-swarm-patterns/SKILL.md) | Compare operational contracts rather than multiply names | Relayflows is another engine. The chooser and [current authoring skill](https://github.com/AgentWorkforce/skills/blob/main/skills/writing-relayflows/SKILL.md) span SDK generations; do not mix their APIs into Claude. |
| [AgentPrism workflows](https://github.com/agentprism/agentprism-workflows) and [MCP server](https://github.com/agentprism/agentprism-workflows/blob/main/packages/mcp-server/README.md) | Structured results, preflight and explicit recovery boundaries | Similar helper names do not establish compatibility. Its ACP backends, journals and checkpoint helpers are not declared Claude globals. |
| [Vercel orchestration patterns](https://vercel.com/i/agent-orchestration-patterns) | Start with the simplest sufficient structure; define aggregation before parallel execution; use runtime decomposition when subtasks are unknown | Six conceptual patterns map to our existing catalog below. They are guidance, not measured performance promises for this package. |
| [Vercel Workflow skill](https://github.com/vercel/workflow/blob/main/skills/workflow/SKILL.md) | Readable typed orchestration and explicit durable-work boundaries | Vercel Workflow SDK is a separate runtime. Its directives, retries, durable checkpoints and human hooks are not Claude Code workflow APIs. |
| [Superpowers small-task delegation](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md) | Scoped subagents and proportional review for small independent work | Useful for the intermediate route, not a requirement for scripted orchestration or universal extra review calls. |

## Keep the catalog compact

AgentWorkforce's fan-out, scatter-gather and map-reduce variants fit fleet when their inventory
is known; fixed handoffs fit pipeline; runtime task discovery fits dynamic orchestrator-workers;
competitive drafts fit independent proposals. Reflection, verification, review loops and
red-team activity are controls or recipes. A graph can compose these structures without
requiring a new core pattern name for every arrangement.

[Catalog](catalog.md) maps Vercel's six concepts. [Selection](selection.md) describes our
decision contract. [Runtime](runtime.md) distinguishes native behavior from local assertions.
