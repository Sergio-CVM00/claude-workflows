# Bounded pattern catalog

These are operational categories, not official Claude modes or a universal taxonomy.
Browse the generated [pattern cards](patterns.md), maintained as one JSON entry per pattern.
The cards include baseline and ordinary-subagent routes, structures, controls and terminals.
[Contribution guide](../../../CONTRIBUTING.md) explains how to extend the catalog.

| Structure | Use when | Contract and stop | Prefer main-only when |
| --- | --- | --- | --- |
| Pipeline | Fixed dependent stages | Each stage consumes checked output; sequential gates; stop on missing/failure | One agent holds the context and scripting adds no repeatability |
| Fleet | Known independent inventory | Stable IDs, disjoint ownership, bounded fan-out, full reconciliation, global acceptance | Shared invariants/files or integration dominate |
| Independent proposals | Ambiguous decision with different approaches | Shared requirements, independent drafting; terminal select, fuse or narrow vote | One decisive source/test resolves the question |
| Dynamic orchestrator-workers | Inventory must be discovered | Bounded discovery, delegation and reconciliation; coordinator owns integration | Inventory is known or branching adds no value |

Catalog pipeline means sequential gated stages. Native pipeline(items, ...stages) streams
each item independently without a global barrier. Use sequential awaits for global gates.

## Vercel concept mapping

[Vercel's six patterns](https://vercel.com/i/agent-orchestration-patterns) span both task flow
and agent topology. They do not require six additional deployment modes.

| Vercel concept | This catalog | Decision boundary |
| --- | --- | --- |
| Single-agent loop | Main-session baseline | Keep it when sufficient for acceptance |
| Prompt chaining | Pipeline recipe, possibly one agent | Gates and dependencies matter; extra agents are optional |
| Routing | Selection layer over known categories | Prefer explicit routing rules; validate allowed categories |
| Parallelization | Fleet or independent proposals | Known independent tasks or distinct approaches; define aggregation first |
| Orchestrator-worker | Dynamic orchestrator-workers | Discover genuinely unknown subtasks within selected bounds |
| Evaluator-optimizer | Bounded iteration control | External criteria, measurable progress and a hard ceiling |

This is a mapping for our selector, not a native Claude API. See [selection](selection.md)
and [prior art](prior-art.md). No mode is an obligatory next step.

## Composable controls

Adversarial verification uses a separate invocation to falsify claims through tests,
counterexamples, reproduction or source checks. Return passed, failed or inconclusive with
evidence. It is a quality gate, not rhetorical debate. Same-model invocations retain correlated
failure modes.

Bounded iteration means work, external evaluation, focused repair. Define rounds/calls,
acceptance, a progress indicator and escalation. Stop on acceptance, repeated feedback or
bounds. One agent can iterate; unsupported self-critique alone does not establish improvement.
The bundled command requires verification for iteration.

## Proposal terminals

- Select: retain one candidate intact only when every fixed rubric criterion is assessed
  as passing with evidence; judge every candidate, including rejected ones.
- Fuse: combine compatible complementary elements with provenance; resolve contradictions
  and validate the new artifact. Retain all rubric assessments, including unknowns or
  failures that the main session must resolve. Concatenation is not fusion.
- Vote: only exact compact answers with independent evidence; strict majority or unresolved.
  Never vote on code, architecture or preferences. Verify the answer separately.
- Tournament: optional selection variant; bound comparisons and account for ordering/judge bias.

## Exclusions

Experimental peer Agent Teams/shared boards require a different runtime and explicit opt-in.
Ordinary subagents and workflow agents do not expose peer messaging in this contract.
Free-form swarms are excluded. Scripted debate is a conditional staged recipe, not a default
quality guarantee. Research, migration, audit and debugging are activities, not new topologies.

Evaluate versus a strong single-agent baseline. Gains/costs on other tasks are not promises.
See [evidence](sources.md).
