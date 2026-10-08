# Sources and provenance

Reviewed 2026-10-09; live documentation may drift. This is an authored synthesis, not a
universal benchmark or official topology taxonomy. See [prior art](prior-art.md) for implementation influences.

| Source | Supports | Limit |
| --- | --- | --- |
| [Claude workflows](https://code.claude.com/docs/en/workflows) | Script/reuse/args/failure/limits | Overview is not a complete stable TypeScript API |
| [Subagents](https://code.claude.com/docs/en/sub-agents) | Small delegation and routing | Runtime availability/precedence vary |
| [Agent Teams](https://code.claude.com/docs/en/agent-teams) | Experimental peer runtime | Task locks do not protect arbitrary files |
| [Effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Chaining, parallelization, orchestrator, evaluator | Guidance, not comparative guarantees |
| [Scaling agents](https://arxiv.org/abs/2512.08296) | Decomposability and coordination matter | Workload-specific |
| [CooperBench](https://arxiv.org/abs/2601.13295) | Collaboration can underperform a single agent | Benchmark-specific |
| [Fixed reasoning budget](https://arxiv.org/abs/2604.02460) | Strong single-agent baselines | Studied reasoning tasks |
| [Research system](https://www.anthropic.com/engineering/multi-agent-research-system) | Evidence-axis parallelism and synthesis | Vendor engineering report |
| [Multiagent research](https://www.anthropic.com/research/multiagent-systems) | Coordinated scoped security research | Aggregate totals have different coverage |
| [Debate](https://proceedings.mlr.press/v235/smit24a.html) | Protocol matters | Agreement is not correctness |
| [Judge bias](https://arxiv.org/abs/2406.07791) | Judging needs bias controls | Judge is not a test oracle |
| [Self-correction](https://arxiv.org/abs/2310.01798) | External feedback matters | Narrow evidence |
| [Agent evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Realistic outcome evaluations | Packaging does not prove behavior |

Additional implementation references and runtime caveats:
[prior-art comparison](prior-art.md), including Vercel, swarm, AgentWorkforce and AgentPrism.
Their implementation choices inform design; they are not evidence that this executor
works in their engines or that native authenticated acceptance passed.

API supplement: read-only inspection of installed Claude Code 2.1.283 workflow tool's
script-body reference confirmed model/effort/phase/isolation/agentType options,
pipeline callback arguments and parallel thunks. No vendor source is redistributed.
Local declarations describe only the used subset. Authenticated /workflow-authoring and
native execution remain separate acceptance checks.
