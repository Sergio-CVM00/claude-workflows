# Pipeline

Fixed dependent stages run in order.

Kind: structure. Execution: agent-deployment.

~~~mermaid
flowchart LR
  A[Inspect] --> G[Gate]
  G --> B[Propose]
  B --> H[Gate]
  H --> C[Review]
~~~

## Use when

- Later work needs an earlier result.
- Stage boundaries provide useful gates or reuse.

## Prefer another route when

- One agent already holds the whole task and scripting adds no value.

## Execution contract

- Pass checked earlier outputs explicitly.
- Stop dependent stages when a required gate fails.
- Use adversarial verification when a gate must be independently checked; otherwise outputs remain claims.

## Try asking

> Inspect a migration, propose a change, then review the proposal in separate dependent stages.

## Configuration fragment

~~~json
{
  "pattern": "pipeline"
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
