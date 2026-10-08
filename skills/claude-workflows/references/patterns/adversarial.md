# Adversarial verification

A separate invocation tries to falsify a candidate.

Kind: control. Execution: agent-deployment.

~~~mermaid
flowchart LR
  W[Candidate] --> V[Independent verifier]
  V --> P[Passed]
  V --> F[Failed / inconclusive]
~~~

## Use when

- Claims need reproduction, counterexamples or source checks.
- A quality gate warrants an independent check.

## Prefer another route when

- The reviewer cannot access the relevant artifacts or evidence.
- A rhetorical disagreement is treated as validation.

## Execution contract

- Verify actual artifacts against acceptance.
- Report passed, failed or inconclusive with evidence.
- Same-model invocations can share failure modes.

## Try asking

> Try to reproduce each reported authentication bypass before accepting it.

## Configuration fragment

~~~json
{
  "controls": {
    "adversarial": true,
    "iterate": false
  }
}
~~~

This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),
available profiles and selected limits. The catalog never launches agents.

[All patterns](../patterns.md) | [Selection checks](../selection.md)
