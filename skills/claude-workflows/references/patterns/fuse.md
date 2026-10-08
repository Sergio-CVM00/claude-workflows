# Fuse complementary proposals

Create a new synthesis from compatible, attributed elements.

Kind: terminal. Execution: agent-deployment.

~~~mermaid
flowchart TD
  A[Proposal A] --> F[Attributed synthesis]
  B[Proposal B] --> F
  F --> C[Resolve contradictions]
  C --> V[Fresh acceptance]
~~~

## Use when

- Different approaches contain useful complementary elements.
- Contradictions can be resolved explicitly.

## Prefer another route when

- Combining incompatible assumptions hides a decision.
- Concatenation is mistaken for synthesis.

## Execution contract

- Fix the rubric before drafting and retain complete scorecards.
- Track provenance and explain rejected elements.
- Resolve unknowns and contradictions in main-session acceptance.
- A fusion is a new artifact; prior candidate checks do not validate it.

## Try asking

> Combine a simple public API with another proposal's failure-handling strategy, then test the combined design.

## Configuration fragment

~~~json
{
  "pattern": "proposals",
  "terminal": "fuse"
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
