# Validation status

Version: 0.1.0-preview.1. Updated: 2026-10-09.

## Acceptance boundaries

Preview publication is a source distribution with documented limitations. It requires the
offline packaging, catalog, type and control-flow checks below. It is not a stable claim that
Claude follows the skill or that live workflows produce correct results.

Stable-release acceptance additionally requires authenticated native checks.
Track that work in [issue #4](https://github.com/Sergio-CVM00/claude-workflows/issues/4).

## Observed preview receipt

On 2026-10-09, all 26 offline tests passed: 22 executor/template tests and four catalog tests.
Strict TypeScript 5.9.3 checks, package links, generated catalog consistency and diff checks
passed. Claude Code 2.1.283 plugin-manifest validation passed without warnings.
These are preparation checks, not authenticated workflow execution. CI must also pass on
the exact PR revision before preview publication.

## Offline checks

Run bun run check and git diff --check. The suite covers:
- bounded concurrency, logical calls, missing coverage, dependent gates and isolated writes;
- external-feedback stops and retained candidate results;
- fixed rubric coverage, evidence and rejection of unsupported selections;
- catalog generation, a new custom entry, drift, links and unsupported executor settings;
- strict TypeScript contracts, including negative input cases.

Native plugin-manifest validation is a separate packaging check. These checks cannot prove
truth of evidence, model availability, effective permissions or agent obedience.

## Native acceptance still pending

An authenticated compatible Claude runtime was unavailable during preparation. No login,
account or configuration was changed. The prior API subset was inspected in an installed
2.1.283 reference, but that does not replace these checks:

1. Load /workflow-authoring and reconcile local declarations with the current reference.
2. Load the plugin and confirm both namespaced commands appear.
3. Run a disposable read-only fixture within selected small limits.
4. Exercise one missing result, one failed external check and one proposal rubric failure.
5. Record actual models/efforts, native tool outcomes, artifacts and skill routing cases.
6. Inspect original-session resume behavior before claiming tested recovery.

The full [behavioral cases](../skills/claude-workflows/references/evaluation.md) cover main-only,
ordinary subagents, shared integration, discovery limits and interrupted work. Record observed
outcomes, pending cases and limitations separately.

## Provenance

The owned skill/executor was extracted from its reviewed source candidate, with public
namespace and onboarding changes. No private repository history, third-party executor,
account catalog, local resource or raw conversation was imported.
