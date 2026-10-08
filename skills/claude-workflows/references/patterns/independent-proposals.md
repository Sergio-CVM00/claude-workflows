# Independent proposals

Separate agents explore genuinely different approaches to one decision.

Kind: structure. Execution: agent-deployment.

~~~mermaid
flowchart TD
  Q[Common requirements] --> A[Approach A]
  Q --> B[Approach B]
  A --> J[Select / fuse / vote]
  B --> J
  J --> V[Fresh acceptance]
~~~

## Use when

- An ambiguous plan benefits from independent alternatives.
- No single decisive source settles the choice.

## Prefer another route when

- Drafts merely repeat one approach.
- A simple test resolves the uncertainty.

## Execution contract

- Fix shared requirements before drafting.
- Do not supply sibling outputs to drafters.
- Choose select, fuse or a narrow compact-answer vote as the terminal.

## Try asking

> Compare two API designs against requirements fixed before drafting.

## Configuration fragment

~~~json
{
  "pattern": "proposals"
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
