# Runtime and model routing

Target native Claude Code >= 2.1.283 for the bundled inspected API subset.
Public /workflow-authoring starts at 2.1.248; that alone does not establish support for every
option here. Before use, load the installed reference and check version, enabled workflows,
authentication, live quota, available models/efforts, policy, permissions and tools.
Do not enable ultracode, teams or bypass permissions for this skill.

## Model policy

Choose exact available IDs/aliases at runtime, with no account/host catalog embedded.

| Role | Initial heuristic | Escalation evidence |
| --- | --- | --- |
| Mechanical inventory/lookup | Suitable small capable model, low/medium if supported | Ambiguity or missed coverage |
| Bounded work/investigation | Strong general-purpose model, medium/high | Cross-cutting invariants or unresolved hypotheses |
| Planning/integration | Strongest suitable reasoning model, high | Higher effort for demonstrated difficult decisions |
| Verification/judging | Strong suitable model, high for nontrivial acceptance | High consequence or subtle contradictions |

Heuristics are not measured optimal routes. Quality can justify the stronger route.
A shorter prompt does not justify a weaker model. Diverse model families help only when
available, authorized and useful; maximum effort everywhere is not a guarantee.
Verify effective routes in run UI: allowlists can substitute models and environment/managed
policy can affect effort. Do not silently accept substitutions.

Ordinary subagents use supported native model/effort controls. Workflow agent model/effort
options were inspected in installed 2.1.283 script reference. Local declarations are an
authored subset, not an official SDK; reconcile them with /workflow-authoring after updates.

## Execution

Executable scripts are .js. TypeScript .d.ts supports authoring, not execution or runtime
validation. Literal meta is first statement; body has top-level await and return.
Used globals: agent, pipeline, parallel, phase, log and args. No direct filesystem/shell,
imports, clocks or randomness; agents perform tool work. Timestamps, if needed, are input.

Native pipeline callbacks receive previous result, original item and index. Item failure
becomes null and skips remaining stages. Parallel accepts thunks and failures become null.
Preserve every null in reconciliation. Explicit per-agent phases avoid global phase races.

The reusable command batches fan-out and counts discoveries, work, verification and judging.
maxCalls bounds logical invocations, not API requests/tokens/spend: structured-output retries
may cost more. Native caps apply additionally. Size guidelines and warnings are advisory.
Do not claim this package enforces an exact token ceiling.

No human input mid-run. Split runs at decision boundaries. Replay can repeat side effects:
inspect actual state and use idempotent units. Worktree baseline may differ from parent;
workers must verify it before edits. Retain changed artifacts for main-session integration
and clean up only task-owned resources.

## Recover or rerun deliberately

Prefer native resume in the original session where possible. A paused run can continue
from /workflows; relaunching a stopped run can reuse completed results. A failed or changed
agent can cause later invocations to run again. A fresh session starts a new run. Inspect
actual artifacts first, especially before repeating writes. See the current
[official recovery rules](https://code.claude.com/docs/en/workflows#resume-after-a-pause).

The following checklist applies when preparing a fresh run or reconciling uncertain state:

The bundled executor has no persisted application journal or resume helper. A returned
report retains outputs; an interrupted invocation may have created artifacts even when
no report arrived. Before rerunning:
1. Inspect the native run state, requested input and actual worktrees/commits. Preserve
   completed evidence and resources; never alter sessions owned by another task.
2. Reconcile every expected ID with changed state and acceptance. Identify incomplete,
   ambiguous and already completed units before choosing any remaining work.
3. Prepare a new selected run for only safely repeatable remaining units, with a verified
   baseline and integration plan. For dependent stages, supply checked prior artifacts
   explicitly in context; do not drop dependencies when reducing the inventory.
4. Keep the same authority and model availability checks. Request a new choice if the
   required envelope changed. A rerun can repeat effects; no exactly-once guarantee is made.

Third-party runtimes in [prior art](prior-art.md) may provide journals or durable checkpoints.
Do not call their APIs as Claude globals or infer their replay semantics for this executor.

## Distribution

Plugin: /claude-workflows:claude-workflows chooses, /claude-workflows:agent-deployment executes
structured args after selection. Standalone: copy the whole skill directory to a target
project's skill source and the reviewed .js to .claude/workflows/; invoke /claude-workflows
and /agent-deployment. Preserve collisions and ownership. Preparation is not installation.

[Workflows](https://code.claude.com/docs/en/workflows),
[subagents](https://code.claude.com/docs/en/sub-agents),
[model config](https://code.claude.com/docs/en/model-config),
[plugin manifest](https://code.claude.com/docs/en/plugins-reference).
