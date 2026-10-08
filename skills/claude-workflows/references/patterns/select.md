# Select one proposal

Retain one qualifying candidate intact.

Kind: terminal. Execution: agent-deployment.

~~~mermaid
flowchart TD
  A[Proposal A] --> J[Fixed rubric]
  B[Proposal B] --> J
  J --> S[One intact proposal]
  S --> V[Acceptance]
~~~

## Use when

- One approach should own the final artifact.
- A fixed rubric distinguishes viable options.

## Prefer another route when

- No candidate meets the acceptance criteria.
- A new combined artifact is actually needed.

## Execution contract

- Fix the rubric before drafting.
- Assess every candidate and criterion with evidence.
- Select exactly one existing ID; all its rubric verdicts must pass.
- Judge claims still require actual acceptance checks.

## Try asking

> Choose one API proposal that satisfies every fixed acceptance criterion.

## Configuration fragment

~~~json
{
  "pattern": "proposals",
  "terminal": "select"
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
