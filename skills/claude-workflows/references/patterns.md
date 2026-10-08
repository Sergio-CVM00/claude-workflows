# Pattern catalog

Generated from one JSON entry per pattern. Edit the entry, then run node scripts/catalog.mjs --write.

Kinds describe different decisions: baseline and mode choose who coordinates; structure organizes work;
controls add checks; terminals resolve proposals. New entries do not add execution support automatically.

| Pattern | Kind | Purpose | Execution |
| --- | --- | --- | --- |
| [Main session](patterns/main-session.md) | baseline | One agent owns the task and acceptance. | main-session |
| [A few ordinary subagents](patterns/ordinary-subagents.md) | mode | The main conversation coordinates a few independent assignments. | ordinary-subagents |
| [Pipeline](patterns/pipeline.md) | structure | Fixed dependent stages run in order. | agent-deployment |
| [Fleet](patterns/fleet.md) | structure | A known inventory is partitioned into independent units. | agent-deployment |
| [Independent proposals](patterns/independent-proposals.md) | structure | Separate agents explore genuinely different approaches to one decision. | agent-deployment |
| [Dynamic orchestrator-workers](patterns/dynamic.md) | structure | Discover genuinely unknown subtasks before bounded delegation. | agent-deployment |
| [Adversarial verification](patterns/adversarial.md) | control | A separate invocation tries to falsify a candidate. | agent-deployment |
| [Bounded iteration](patterns/bounded-iteration.md) | control | Repair against external feedback within explicit limits. | agent-deployment |
| [Select one proposal](patterns/select.md) | terminal | Retain one qualifying candidate intact. | agent-deployment |
| [Fuse complementary proposals](patterns/fuse.md) | terminal | Create a new synthesis from compatible, attributed elements. | agent-deployment |
| [Vote on a compact answer](patterns/vote.md) | terminal | Count exact compact answers using a strict majority. | agent-deployment |
