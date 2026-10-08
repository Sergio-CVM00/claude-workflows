import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const source = await readFile(new URL('../workflows/agent-deployment.js', import.meta.url), 'utf8');
assert.match(source, /^export const meta = \{/);
const body = source.replace(/^export const meta = \{[\s\S]*?\};/, '');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const execute = new AsyncFunction('args', 'agent', 'parallel', 'phase', 'log', body);
function config(pattern = 'fleet') {
  return {
    pattern, goal: 'Fixture task', context: 'Synthetic input, no tools',
    scope: 'Fixture only', baseline: 'fixture-sha', integration: 'Main reconciles all IDs then runs global checks', access: 'read-only',
    items: [1, 2, 3].map(n => ({ id: String(n), task: 'Task ' + n, acceptance: 'External check' })),
    controls: { adversarial: false, iterate: false },
    limits: { maxConcurrent: 2, maxCalls: 10, maxRounds: 1, maxItems: 3 },
    profiles: Object.fromEntries(['worker', 'verifier', 'judge'].map(role =>
      [role, { model: 'fixture-' + role, effort: 'high' }])),
  };
}
const rubric = [{ id: 'coverage', acceptance: 'All requirements met' }, { id: 'evidence', acceptance: 'Claims supported' }];
const judgement = (selectedIds, verdict = 'pass') => ({
  selectedIds, summary: 'Decision', evidence: ['provenance'],
  assessments: ['1', '2', '3'].map(id => ({
    id, rationale: 'Candidate rationale ' + id,
    checks: rubric.map(criterion => ({ id: criterion.id, verdict, evidence: ['source for ' + id] })),
  })),
});
const candidate = (answer = null) => ({
  status: 'complete', summary: 'Candidate', evidence: ['fixture evidence'],
  artifacts: [], answer,
});
const check = (verdict = 'passed', failedChecks = []) => ({
  verdict, summary: 'Check', evidence: ['external fixture check'], failedChecks,
});
async function run(input, respond = () => candidate()) {
  let active = 0, peak = 0;
  const calls = [];
  const agent = async (prompt, options) => {
    calls.push({ prompt, options }); active++; peak = Math.max(peak, active);
    try { await new Promise(resolve => setTimeout(resolve, 1)); return await respond(prompt, options, calls.length); }
    finally { active--; }
  };
  const parallel = thunks => Promise.all(thunks.map(async thunk => {
    try { return await thunk(); } catch { return null; }
  }));
  const result = await execute(input, agent, parallel, () => {}, () => {});
  return { result, calls, peak };
}

test('fleet honors concurrency, ordered IDs and does not assert global acceptance', async () => {
  const { result, peak } = await run(config());
  assert.equal(peak, 2); assert.equal(result.calls, 3);
  assert.deepEqual(result.expectedIds, ['1', '2', '3']);
  assert.equal(result.status, 'ready-for-integration');
  assert.equal(result.verified, false); assert.equal(result.globallyAccepted, false);
});
test('missing output is retained and later batches are not launched', async () => {
  const { result } = await run(config(), (_prompt, options) => options.label.startsWith('2:') ? null : candidate());
  assert.equal(result.calls, 2);
  assert.deepEqual(result.failedIds, ['2', '3']);
  assert.deepEqual(result.records.map(r => r.status), ['candidate', 'missing', 'not-run']);
});
test('thrown agent failure remains missing coverage', async () => {
  const input = config(); input.items = input.items.slice(0, 1);
  const { result } = await run(input, () => { throw new Error('transport'); });
  assert.equal(result.records[0].status, 'missing'); assert.equal(result.verified, false);
});
test('pipeline stops at a failed gate and preserves unrun stages', async () => {
  const input = config('pipeline'); input.controls.adversarial = true;
  const { result, peak } = await run(input, (_prompt, options) =>
    options.phase === 'Verify' ? check('failed', ['unit-check']) : candidate());
  assert.equal(peak, 1); assert.equal(result.calls, 2);
  assert.deepEqual(result.records.map(r => r.status), ['failed', 'not-run', 'not-run']);
});
test('pipeline passes checked preceding stage data explicitly', async () => {
  const input = config('pipeline'); input.controls.adversarial = true;
  const { result, calls } = await run(input, (_p, options) => options.phase === 'Verify' ? check() : candidate());
  assert.equal(result.verified, true); assert.equal(result.calls, 6);
  assert.match(calls[2].prompt, /"id":"1"/);
});
test('iteration stops on repeated external failure and retains candidates', async () => {
  const input = config(); input.items = input.items.slice(0, 1);
  input.controls = { adversarial: true, iterate: true }; input.limits.maxRounds = 3;
  const { result } = await run(input, (_p, options) =>
    options.phase === 'Verify' ? check('failed', ['same-check']) : candidate());
  assert.equal(result.calls, 4); assert.equal(result.records[0].rounds, 2);
  assert.equal(result.records[0].history.length, 2); assert.equal(result.status, 'needs-attention');
});
test('iteration accepts a repaired candidate within the selected ceiling', async () => {
  const input = config(); input.items = input.items.slice(0, 1);
  input.controls = { adversarial: true, iterate: true }; input.limits.maxRounds = 2;
  let checks = 0;
  const { result } = await run(input, (_p, options) =>
    options.phase === 'Verify' ? (++checks === 1 ? check('failed', ['x']) : check()) : candidate());
  assert.equal(result.calls, 4); assert.equal(result.verified, true);
});
test('discovery overflow returns every discovered ID without dispatching workers', async () => {
  const input = config('dynamic'); const found = input.items; delete input.items;
  input.discovery = 'Find all units'; input.limits.maxItems = 2;
  const { result } = await run(input, () => ({ items: found }));
  assert.equal(result.calls, 1); assert.equal(result.scheduled, 0);
  assert.deepEqual(result.expectedIds, ['1', '2', '3']);
  assert.equal(result.status, 'needs-attention');
});
test('dynamic discovery uses the complete inventory and bounds worker concurrency', async () => {
  const input = config('dynamic'); const found = input.items; delete input.items;
  input.discovery = 'Find all units';
  const { result, peak } = await run(input, (_p, options) =>
    options.phase === 'Discover' ? { items: found } : candidate());
  assert.equal(result.calls, 4); assert.equal(peak, 2);
});
test('unsafe or over-budget input launches zero agents', async () => {
  for (const change of [
    input => input.access = 'sequential-write',
    input => input.limits.maxCalls = 2,
    input => input.controls.iterate = true,
    input => input.items[1].id = input.items[0].id,
    input => input.profiles.worker.effort = 'imaginary',
  ]) {
    const input = config(); change(input);
    let calls = 0;
    await assert.rejects(execute(input, async () => { calls++; }, () => {}, () => {}, () => {}));
    assert.equal(calls, 0);
  }
});
test('parallel write agents receive native worktree isolation', async () => {
  const input = config(); input.access = 'worktree';
  const { calls } = await run(input);
  assert.ok(calls.every(c => c.options.isolation === 'worktree'));
  assert.ok(calls.every(c => c.prompt.includes('Verify the requested baseline')));
});
test('a success claim with no evidence is blocked', async () => {
  const { result } = await run(config(), () => ({ ...candidate(), evidence: [] }));
  assert.equal(result.status, 'needs-attention'); assert.equal(result.verified, false);
});
test('verification cannot pass with failing checks or empty evidence', async () => {
  for (const verdict of [{ ...check(), failedChecks: ['failure'] }, { ...check(), evidence: [] }]) {
    const input = config(); input.controls.adversarial = true;
    const { result } = await run(input, (_p, opts) => opts.phase === 'Verify' ? verdict : candidate());
    assert.equal(result.status, 'needs-attention'); assert.equal(result.verified, false);
  }
});
test('proposal vote needs a strict majority and leaves answer unvalidated', async () => {
  const input = config('proposals'); input.terminal = 'vote'; input.compactAnswer = true;
  let answer = 0;
  let { result } = await run(input, () => candidate(['A', 'B', 'C'][answer++]));
  assert.equal(result.status, 'needs-attention'); assert.equal(result.decision, null);
  answer = 0;
  ({ result } = await run(input, () => candidate(['A', 'A', 'B'][answer++])));
  assert.equal(result.decision.answer, 'A'); assert.equal(result.decision.validated, false);
});
test('proposal drafting receives no sibling output; judge gets common criteria', async () => {
  const input = config('proposals'); input.terminal = 'fuse'; input.rubric = rubric;
  const { result, calls } = await run(input, (_p, opts) => opts.phase === 'Decide'
    ? judgement(['1', '2']) : candidate());
  assert.equal(result.calls, 4); assert.equal(result.decision.terminal, 'fuse');
  assert.equal(result.decision.validated, false);
  assert.ok(calls.slice(0, 3).every(c => c.prompt.includes('pipeline only): []')));
  assert.match(calls[3].prompt, /External check/);
  assert.ok(calls.every(c => c.prompt.includes('All requirements met')));
  assert.match(calls[3].prompt, /before comparing candidates/);
});
test('select rejects nonexistent or multiple selected candidates', async () => {
  for (const selectedIds of [['bogus'], ['1', '2']]) {
    const input = config('proposals'); input.terminal = 'select'; input.rubric = rubric;
    const { result } = await run(input, (_p, opts) => opts.phase === 'Decide'
      ? judgement(selectedIds) : candidate());
    assert.equal(result.status, 'needs-attention'); assert.equal(result.decision, null);
  }
});
test('profile input cannot add unselected agent options', async () => {
  const input = config(); input.profiles.worker.agentType = 'unselected';
  const { calls } = await run(input);
  assert.ok(calls.every(c => c.options.agentType === undefined));
});

test('missing integration or malformed fixed rubric launches zero agents', async () => {
  for (const change of [
    input => delete input.integration,
    input => delete input.rubric,
    input => input.rubric = [],
    input => input.rubric = [rubric[0], rubric[0]],
    input => input.rubric = [{ id: 'c', acceptance: '' }],
  ]) {
    const input = config('proposals'); input.terminal = 'select'; input.rubric = rubric; change(input);
    let calls = 0;
    await assert.rejects(execute(input, async () => { calls++; }, () => {}, () => {}, () => {}));
    assert.equal(calls, 0);
  }
});
test('judge must account for every candidate and criterion with evidence', async () => {
  for (const change of [
    d => delete d.assessments,
    d => d.assessments.pop(),
    d => d.assessments[1].id = '1',
    d => d.assessments[0].checks.pop(),
    d => d.assessments[0].checks[1].id = 'coverage',
    d => d.assessments[0].checks[0].evidence = [],
    d => d.assessments[0].checks[0].verdict = 'imaginary',
    d => d.assessments[0].rationale = '',
  ]) {
    const input = config('proposals'); input.terminal = 'select'; input.rubric = rubric;
    const decision = judgement(['1']); change(decision);
    const { result } = await run(input, (_p, opts) => opts.phase === 'Decide' ? decision : candidate());
    assert.equal(result.status, 'needs-attention'); assert.equal(result.decision, null);
  }
});
test('selection rejects failed or unknown rubric acceptance', async () => {
  for (const verdict of ['fail', 'unknown']) {
    const input = config('proposals'); input.terminal = 'select'; input.rubric = rubric;
    const { result } = await run(input, (_p, opts) => opts.phase === 'Decide' ? judgement(['1'], verdict) : candidate());
    assert.equal(result.status, 'needs-attention'); assert.match(result.reason, /fails or lacks evidence/);
  }
});
test('fusion retains uncertain scorecards for later acceptance without extra judge calls', async () => {
  const input = config('proposals'); input.terminal = 'fuse'; input.rubric = rubric;
  const decision = { ...judgement(['1', '2'], 'unknown'), inventedProperty: 'discard' };
  const { result, calls } = await run(input, (_p, opts) => opts.phase === 'Decide' ? decision : candidate());
  assert.equal(result.calls, 4);
  assert.equal(calls.filter(c => c.options.phase === 'Decide').length, 1);
  assert.equal(result.decision.assessments[0].checks[0].verdict, 'unknown');
  assert.equal(result.decision.validated, false); assert.equal(result.globallyAccepted, false);
  assert.equal(result.decision.inventedProperty, undefined);
});

test('published complete templates fit their selected envelope and reconcile fixture IDs', async () => {
  for (const filename of ['fleet', 'proposals-fuse']) {
    const input = JSON.parse(await readFile(new URL('../../../examples/' + filename + '.template.json', import.meta.url), 'utf8'));
    const { result } = await run(input, (_p, options) => {
      if (options.phase === 'Verify') return check();
      if (options.phase === 'Decide') return {
        selectedIds: input.items.map(item => item.id), summary: 'Fixture synthesis', evidence: ['fixture provenance'],
        assessments: input.items.map(item => ({
          id: item.id, rationale: 'Fixture rationale',
          checks: input.rubric.map(criterion => ({ id: criterion.id, verdict: 'pass', evidence: ['fixture support'] })),
        })),
      };
      return candidate();
    });
    assert.equal(result.status, 'ready-for-integration');
    assert.equal(result.calls, input.limits.maxCalls);
    assert.deepEqual(result.expectedIds, input.items.map(item => item.id));
    assert.equal(result.globallyAccepted, false);
  }
});
