---
name: claude-workflows
description: Use when the user asks to choose and execute an agent deployment, compare fleet, fusion or adversarial approaches, or codify repeatable Claude Code orchestration. Recommend main-session work when delegation adds no value. Claude Code only; explicit invocation.
disable-model-invocation: true
---

# Choose and execute agent deployments

Quality first, speed second. Extra agents must earn their coordination and token cost.
Use Claude Code native capabilities. Do not route to another harness or enable experimental
Agent Teams. Start with the task, not a preferred topology. If the current harness is not
Claude Code, explain the runtime requirement and prepare instructions only; do not launch
another harness or change hosts/accounts.

For human onboarding see [the quickstart](../../docs/quickstart.md).
When choosing a pattern, use the generated [pattern index](references/patterns.md) and
read only the relevant cards. Entries are guidance; the bundled executor supports only its
declared core patterns. Custom catalog entries require a reviewed task-specific workflow.

## Understand and size

Inspect enough context to identify the deliverable, acceptance evidence, dependencies,
independent work units, shared mutable files, uncertainty, scale and repeatability.
Ask only for missing information that changes the recommendation. Preserve host, repository,
ownership and approval rules; this skill grants no new authority.

Use [the selection checks](references/selection.md) to identify the concrete capability gap,
partition and integration cost before recommending more agents. Start with the simplest
structure that meets acceptance; prefer speed among options that meet the quality floor.
Define aggregation, contradiction handling and global checks before fan-out.

Compare [the catalog](references/catalog.md):
- Main session: bounded work, coupled changes, a decisive source or one useful investigation.
- A few ordinary subagents: independent small tasks the main session can coordinate.
- Native workflow: more agents than conversational coordination can comfortably handle,
  or repeatable orchestration worth saving as a readable script.

A hard task can still belong to one strong agent. Many files alone do not imply many workers.
Report relative overhead and uncertainty; do not invent token-price or latency estimates.

## Offer 1-3 useful options and wait for selection

One option is enough when alternatives add no value. This is an option count, not an agent
limit. Include main-only whenever viable. For each option give:
1. Mode, structure, controls and why they fit. Mark one recommended.
2. Role-by-role model/effort plan, quality benefit, latency and token overhead.
3. Execution envelope: scope/baseline, ownership/isolation, maximum concurrent agents,
   total calls, rounds/items, acceptance and stop/escalation rules.

Read [runtime/model routing](references/runtime.md) before making model claims.
Read only the relevant [recipe](references/recipes.md). Adapt the catalog; pattern names
without an operational contract are insufficient.

Wait for the user's choice. Previous explicit selection remains valid when scope and limits
still fit. Selection authorizes routine execution inside that envelope, subject to actual
session permissions. Preserve native launch/permission prompts; never bypass them.

## Prepare and execute

- Main-only: do the work directly, including relevant verification.
- Ordinary subagents: assign disjoint responsibilities, self-contained context, acceptance,
  evidence and failure rules. The main session owns integration. Fixed stage prompts or
  category routing can remain in one agent; they do not inherently require delegation.
- Workflow: load /workflow-authoring before authoring or editing a script. Reconcile the
  current API with [local TypeScript contracts](types/workflow-api.d.ts). Prepare actual
  structured args using [the run contract](references/run-contract.md). The reusable
  plugin command is /claude-workflows:agent-deployment; its [JavaScript](workflows/agent-deployment.js)
  implements the bounded catalog core. For task-specific reuse, create a reviewed .js in
  the target project's .claude/workflows/, with first-statement literal export const meta,
  parameterized args and the same accounting. Run /reload-skills. Preserve existing files;
  do not install into a user's home or alter global configuration.

For select/fuse proposals, fix the shared rubric before drafting, judge all candidates and
criteria with evidence, and explain rejected candidates. Do not let agreement replace checks.

Before write-heavy fan-out, establish isolated workspaces and verify baseline. Bundled
parallel write workers use worktrees; outputs are candidate artifacts, not automatic
integration. Review actual patches/commits, integrate in the main session and run global
checks. Split runs at human decision boundaries; no mid-run decision API is assumed.

Adapt within selected models, scope and limits. Wider inventory, extra rounds, a new model
or new authority require returning to the user at a boundary with completed evidence retained.
Never silently accept unavailable/substituted models. Stop on missing output, contradictions,
no progress or failed acceptance. Inspect actual state before replaying side effects.

## Close with evidence

Reconcile every expected ID. Distinguish worker claims, independent verification, global
acceptance, missing/blocked items and integration state. Verify actual repository/source
outputs. Report effective routes when observable, calls/rounds, saved command location and
pending checks. Schema validity, agreement, voting and empty findings do not prove correctness.

References: [catalog](references/catalog.md), [recipes](references/recipes.md),
[selection](references/selection.md), [prior art](references/prior-art.md),
[runtime](references/runtime.md), [run contract](references/run-contract.md),
[evaluations](references/evaluation.md), [sources](references/sources.md).
