# Dynamic orchestrator-workers

Discover genuinely unknown subtasks before bounded delegation.

Kind: structure. Execution: agent-deployment.

~~~mermaid
flowchart TD
  D[Bounded discovery] --> G{Within limit?}
  G -->|No| S[Stop and retain inventory]
  G -->|Yes| W[Independent workers]
  W --> R[Reconcile]
  R --> V[Acceptance]
~~~

## Use when

- A read-only investigation must identify the inventory.
- The inventory cannot usefully be specified beforehand.

## Prefer another route when

- Items are already known.
- Open-ended branching lacks a scope or ceiling.

## Execution contract

- Discover the complete in-scope inventory with stable IDs.
- If inventory exceeds the selected ceiling, retain it and launch no workers.
- Reconcile every discovered item and integrate in the main session.

## Try asking

> Discover undocumented adapters within one module, then audit each adapter within the selected limit.

## Configuration fragment

~~~json
{
  "pattern": "dynamic"
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
