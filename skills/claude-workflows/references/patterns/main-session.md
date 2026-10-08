# Main session

One agent owns the task and acceptance.

Kind: baseline. Execution: main-session.

~~~mermaid
flowchart LR
  T[Task] --> M[Main agent]
  M --> V[Acceptance]
  V --> R[Result]
~~~

## Use when

- The task is small or tightly coupled.
- One decisive source or test can resolve it.

## Prefer another route when

- Independent evidence needs isolation beyond a useful single context.

## Execution contract

- State the deliverable and verify it.
- No delegation call is needed.

## Try asking

> Fix one documentation typo and check the surrounding instructions.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
