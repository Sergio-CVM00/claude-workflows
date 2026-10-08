# Fleet

A known inventory is partitioned into independent units.

Kind: structure. Execution: agent-deployment.

~~~mermaid
flowchart TD
  K[Known inventory] --> A[Unit A]
  K --> B[Unit B]
  K --> C[Unit C]
  A --> R[Reconcile all IDs]
  B --> R
  C --> R
  R --> V[Global acceptance]
~~~

## Use when

- Units and ownership are known before launch.
- Independent work exceeds its aggregation overhead.

## Prefer another route when

- Workers edit the same shared files.
- Integration dominates useful work.

## Execution contract

- Define stable IDs and aggregation before fan-out.
- Bound concurrency and logical calls.
- Preserve missing results and reconcile every ID.
- Isolate parallel edits in worktrees and verify globally after integration.

## Try asking

> Audit three independent route groups, then reconcile every route and reproduce findings.

## Configuration fragment

~~~json
{
  "pattern": "fleet"
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
