# Your first task

Start with [README](../README.md) to load the plugin.

## Understand the three routes

The main session can inspect, change and verify a task itself. Ordinary subagents return a
few independent results to that conversation. A native workflow puts repeatable coordination
in a JavaScript script. Use the last route for a concrete coordination or reuse need.

The [selector](../skills/claude-workflows/SKILL.md) offers 1-3 meaningful options and waits for
your choice. One option is enough when extra choices add no value.

## Try a small read-only task

With the plugin loaded from this repository, enter:

~~~text
/claude-workflows:claude-workflows
Compare examples/fixture/retries.md and examples/fixture/timeouts.md.
Return each policy with file evidence. Recommend a deployment before doing the work.
~~~

This task is intentionally small. Main-only or a few ordinary subagents can be sensible.
A saved workflow is useful here only if you explicitly want to learn or repeat that
orchestration. The example is not a recommendation to parallelize two short files.

The options should explain the responsibilities, available model and effort, overhead,
limits, checks and integration. Choose in plain language, for example:
"Use the recommended main-session option" or "Use the small read-only workflow option
for a reusable learning exercise."

## If you choose a saved workflow

Ask Claude to prepare args from [the fleet template](../examples/fleet.template.json):
replace model placeholders with currently available routes and the baseline with the
actual fixture/project revision. Inspect the input and script. Then ask Claude to run
/claude-workflows:agent-deployment with that object after your choice.

The template is data, not a shell command. It is not ready to run until placeholders and
readiness checks have been resolved. [Input details](../skills/claude-workflows/references/run-contract.md).

## Read the result

- candidate: the worker returned a claim and supporting evidence.
- verified: the configured external check passed for that unit.
- missing, failed, blocked or not-run: coverage remains incomplete.
- ready-for-integration: unit records are available, not global acceptance.
- globallyAccepted is always false in the bundled report. The main session must verify
  delivered artifacts and the complete result.

For fusion, validate the new combined proposal. A vote only records agreement.

## Troubleshooting

| Symptom | Next step |
| --- | --- |
| Commands do not appear | Check --plugin-dir, namespace and manifest; restart or /reload-skills after edits |
| Native workflows unavailable | Check Claude version, authentication, plan/policy and enabled workflow support |
| Unknown model or changed route | Stop and choose an available authorized route; do not silently substitute |
| Inventory exceeds the ceiling | Keep the discovered inventory and choose a new envelope before launching workers |
| A run paused or stopped | Inspect /workflows and actual artifacts; prefer native resume in the original session |

Native resume can reuse completed results, but failures or changed prompts can rerun later
agents. A fresh session starts a new run. See [official recovery](https://code.claude.com/docs/en/workflows#resume-after-a-pause)
and [our recovery checklist](../skills/claude-workflows/references/runtime.md#recover-or-rerun-deliberately).

The script coordinates agents; it has no direct filesystem or shell access. Do not execute
agent-deployment.js with Node. Node is only used for development checks.

[Browse pattern cards](../skills/claude-workflows/references/patterns.md).
