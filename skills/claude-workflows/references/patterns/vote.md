# Vote on a compact answer

Count exact compact answers using a strict majority.

Kind: terminal. Execution: agent-deployment.

~~~mermaid
flowchart LR
  A[Exact answers] --> M{Strict majority?}
  M -->|Yes| V[Verify answer]
  M -->|No| U[Unresolved]
~~~

## Use when

- The output is one exact, narrow answer.
- Each candidate has independent supporting evidence.

## Prefer another route when

- The output is code, architecture or a preference.
- Agreement is treated as truth.

## Execution contract

- Use compactAnswer=true; no proposal rubric.
- Require a nonempty single-line answer of at most 256 characters.
- A strict majority is required; ties stay unresolved.
- Verify the winning answer separately.

## Try asking

> Compare independently derived exact identifiers, then verify the majority identifier against the primary source.

## Configuration fragment

~~~json
{
  "pattern": "proposals",
  "terminal": "vote",
  "compactAnswer": true
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
