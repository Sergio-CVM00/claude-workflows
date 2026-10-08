# Extend the catalog

A catalog entry describes a useful operational choice. A new name should add a meaningful
contract, not duplicate an existing structure with a cosmetic label.

## Add a recipe or pattern card

1. Copy a nearby JSON entry in skills/claude-workflows/references/patterns/.
2. Give it a unique lowercase ID matching its filename, a readable title and sort order.
3. Choose kind: baseline, mode, structure, control or terminal.
4. Explain when to use it, when to prefer another route, its contract and a small example.
5. Include a Mermaid flowchart and an executor boundary.
6. Generate and check:

~~~sh
bun run catalog:write
bun run check
~~~

The generated Markdown cards, pattern index and catalog-index.json are committed together.
Do not edit generated output manually. Remove an obsolete generated card when removing its
source; the checker reports orphan cards instead of silently deleting them.

## Pick the correct executor boundary

| executor | Meaning |
| --- | --- |
| main-session | Guidance for the main conversation |
| ordinary-subagents | Guidance for a few conversational assignments |
| agent-deployment | A configuration fragment using the bundled executor |
| custom | Documentation for a separately reviewed task-specific workflow |

For agent-deployment, configuration may include only supported pattern, terminal, controls
and compactAnswer values. It is a fragment: full scope, profiles, integration and limits still
come from the selected run contract. The generator never runs agents.

A new custom entry needs no runtime change. For example, a domain-specific investigation can
compose known stages. Document the necessary workflow and its acceptance honestly.
For a new bundled topology, update the JavaScript executor, TypeScript input/result contract,
control-flow tests and runtime references. The catalog alone cannot enable it.

## What reviewers check

A strong contribution has a realistic use case, a useful main-agent alternative, explicit
ownership and aggregation, a stopping condition and evidence of the appropriate checks.
Avoid promises about cost or quality that have not been measured on the relevant workload.

## Development

Requires Node >=22 and Bun 1.4.2. Install locked development dependencies, then run bun run check.
Checks cover catalog integrity, local links, TypeScript and offline control flow.
Use an authenticated Claude session for native behavior; record effective routes and outputs
in [validation](docs/validation.md) before claiming native acceptance.

Do not commit credentials, local run journals or another project's instructions. Do not
install or edit another user's Claude configuration as part of a contribution.
