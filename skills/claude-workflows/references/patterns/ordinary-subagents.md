# A few ordinary subagents

The main conversation coordinates a few independent assignments.

Kind: mode. Execution: ordinary-subagents.

~~~mermaid
flowchart TD
  M[Main agent] --> A[Config reader A]
  M --> B[Config reader B]
  A --> I[Main integration]
  B --> I
  I --> V[Acceptance]
~~~

## Use when

- A few small tasks have separate evidence or ownership.
- Saving a script provides no useful reuse.

## Prefer another route when

- Many intermediate results overwhelm conversational coordination.
- Assignments depend on shared mutable state.

## Execution contract

- Give each worker a self-contained brief and acceptance.
- The main agent reconciles all assignments and integrates.

## Try asking

> Check two unrelated configuration files against their official documentation.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
