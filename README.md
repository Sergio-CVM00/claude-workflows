# Claude Workflows

Choose the simplest useful agent setup for your task, then run the option you select.

**Preview:** offline checks pass; authenticated native workflow acceptance is still pending.
This is an independent community plugin for Claude Code, not an Anthropic or Vercel product.

The skill suggests **1-3 options**, including the main agent when it can do the job well.
Quality comes first, speed second. More agents need a concrete benefit.

## Start here

1. Have Claude Code installed, authenticated, and able to use native workflows.
   The bundled API subset targets **2.1.283 or newer**; recheck compatibility after updates.
2. Clone this repository and load it for a session:

~~~sh
git clone https://github.com/Sergio-CVM00/claude-workflows.git
cd claude-workflows
claude --plugin-dir .
~~~

3. At the Claude prompt, ask:

~~~text
/claude-workflows:claude-workflows
I want to check two unrelated configs against their official docs.
Recommend the simplest useful setup. Quality first, speed second.
~~~

4. Read the recommendation and choose an option. The skill executes inside its stated
   scope and limits. Claude's native permission prompts still apply.

To use it on your own project, start Claude from that project with the absolute path to
this cloned repository as --plugin-dir. This local loading route avoids needing a marketplace.
See [official plugin loading](https://code.claude.com/docs/en/plugins#develop-without-a-marketplace).

[First task and troubleshooting](docs/quickstart.md) ·
[Visual pattern catalog](skills/claude-workflows/references/patterns.md) ·
[Extend the catalog](CONTRIBUTING.md)

## What you get

| Decision | Choices |
| --- | --- |
| Who coordinates? | Main session, a few ordinary subagents, or a saved native workflow |
| How is work organized? | Pipeline, fleet, independent proposals, dynamic orchestrator-workers |
| Which quality controls help? | Adversarial verification, bounded iteration |
| How are proposals resolved? | Select one, fuse complementary parts, or vote on an exact compact answer |

The executor command is /claude-workflows:agent-deployment. Beginners should start with the
selector, which prepares structured args after selection. JavaScript runs in Claude's workflow
runtime; TypeScript declarations describe the authoring contract. Node does not run this
workflow script directly.

[Small examples](examples/README.md) show complete args templates. Every run states how its
results will be integrated, checks coverage and respects selected logical-call limits.
A worker claim, a majority vote or a schema-shaped answer does not establish correctness.

## A catalog you can grow

Each pattern has one JSON source file. A small generator produces its diagram card and
the index. Add a recipe using an existing executor structure, or document a custom workflow;
a new topology needs implementation and meaningful tests. No framework is required to edit
the catalog. [Contribution guide](CONTRIBUTING.md).

## Status and development

[Validation and native acceptance](docs/validation.md) distinguishes observed checks from
pending behavior. No global configuration, account setup or installer is bundled.

~~~sh
bun install --frozen-lockfile
bun run check
~~~

MIT, Copyright (c) 2026 Sergio Cabeza. See [LICENSE](LICENSE).
Implementation references are attributed in [prior art](skills/claude-workflows/references/prior-art.md).
