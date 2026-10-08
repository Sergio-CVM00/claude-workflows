# Bounded iteration

Repair against external feedback within explicit limits.

Kind: control. Execution: agent-deployment.

~~~mermaid
flowchart LR
  W[Work] --> E[External evaluation]
  E -->|Pass| D[Done]
  E -->|Fail within limit| R[Focused repair]
  R --> E
  E -->|Repeated / limit| S[Stop]
~~~

## Use when

- An external rubric or check can identify improvement.
- Focused repairs can address stable failing checks.

## Prefer another route when

- No useful acceptance or progress indicator exists.
- Self-approval replaces external evidence.

## Execution contract

- Requires adversarial verification in the bundled executor.
- Set maximum rounds and calls before launch.
- Stop on acceptance, repeated failing check IDs or the ceiling.

## Try asking

> Repair a unit for at most two rounds and stop if the same external failure repeats.

## Configuration fragment

~~~json
{
  "controls": {
    "adversarial": true,
    "iterate": true
  }
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
