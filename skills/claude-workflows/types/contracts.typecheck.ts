import type { DeploymentInput, DeploymentResult } from './deployment.js';

const common = {
  goal: 'g', context: 'c', scope: 's', baseline: 'sha', integration: 'Main reconciles all IDs and runs acceptance',
  controls: { adversarial: true, iterate: false },
  limits: { maxConcurrent: 2, maxCalls: 4, maxRounds: 1, maxItems: 2 },
  profiles: {
    worker: { model: 'verified-worker', effort: 'high' as const },
    verifier: { model: 'verified-verifier', effort: 'high' as const },
    judge: { model: 'verified-judge', effort: 'high' as const },
  },
};
const fleet: DeploymentInput = { ...common, pattern: 'fleet', access: 'worktree',
  items: [{ id: 'a', task: 't', acceptance: 'check' }] };
const dynamic: DeploymentInput = { ...common, pattern: 'dynamic', access: 'read-only', discovery: 'discover' };
// @ts-expect-error parallel writes need worktree isolation
const unsafe: DeploymentInput = { ...fleet, access: 'sequential-write' };
// @ts-expect-error compact vote must be explicit
const vote: DeploymentInput = { ...common, pattern: 'proposals', access: 'read-only', items: fleet.items, terminal: 'vote' };
// @ts-expect-error dynamic inventory must come from discovery
const ignoredInventory: DeploymentInput = { ...dynamic, items: fleet.items };
const proposal: DeploymentInput = { ...common, pattern: 'proposals', access: 'read-only',
  items: fleet.items, terminal: 'select', rubric: [{ id: 'coverage', acceptance: 'All requirements met' }] };
// @ts-expect-error selection requires a fixed rubric
const unscored: DeploymentInput = { ...common, pattern: 'proposals', access: 'read-only', items: fleet.items, terminal: 'select' };
// @ts-expect-error compact voting does not accept a proposal rubric
const confusedVote: DeploymentInput = { ...proposal, terminal: 'vote', compactAnswer: true };
async function authoringSubset() {
  const first = await agent<{ ids: string[] }>('Discover', { schema: {}, model: 'available', effort: 'high' });
  if (first) await pipeline(first.ids,
    (id, original, index) => agent(original + id + index),
    (previous, original) => agent(original + String(previous)));
  await parallel([() => agent('Verify', { phase: 'Verify' })]);
  // @ts-expect-error undeclared effort must not compile
  await agent('bad', { effort: 'imaginary' });
  // @ts-expect-error parallel requires thunks, not already-started promises
  await parallel([agent('bad')]);
}
function acceptsResult(result: DeploymentResult) {
  // @ts-expect-error workflow completion is not integration
  const integrated: true = result.integrated;
  return result.records.map(record => record.id);
}
void [fleet, dynamic, proposal, authoringSubset, acceptsResult];
