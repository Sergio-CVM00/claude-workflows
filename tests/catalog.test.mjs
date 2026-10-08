import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { generate, loadEntries, outputs, relative, validate } from '../scripts/catalog.mjs';

test('real catalog includes baseline, structures, controls and terminals with consistent generated files', async () => {
  const entries = await generate(undefined, true);
  assert.ok(entries.some(e => e.executor === 'main-session'));
  assert.deepEqual(entries.filter(e => e.kind === 'structure').map(e => e.configuration.pattern).sort(), ['dynamic', 'fleet', 'pipeline', 'proposals']);
  assert.equal(entries.filter(e => e.kind === 'control').length, 2);
});
test('a new custom card can be generated without enabling unsupported executor behavior', async () => {
  const base = await mkdtemp(join(tmpdir(), 'claude-workflows-catalog-'));
  try {
    const directory = join(base, relative, 'patterns'); await mkdir(directory, { recursive: true });
    const sample = (await loadEntries())[0];
    const entry = { ...sample, id: 'custom-recipe', kind: 'structure', executor: 'custom', configuration: {} };
    await writeFile(join(directory, entry.id + '.json'), JSON.stringify(entry));
    await generate(base);
    const card = await readFile(join(directory, entry.id + '.md'), 'utf8');
    assert.match(card, /does not enable a new bundled pattern/);
    await generate(base, true);
    await writeFile(join(directory, entry.id + '.md'), card + 'drift');
    await assert.rejects(generate(base, true), /Stale generated/);
  } finally { await rm(base, { recursive: true, force: true }); }
});
test('invalid identity, guidance, engine settings and iteration cannot enter the catalog', async () => {
  const sample = (await loadEntries()).find(e => e.id === 'fleet');
  for (const update of [
    { id: '../escape' }, { kind: 'invented' }, { contract: [] },
    { executor: 'custom' }, { configuration: { pattern: 'invented' } },
    { configuration: { controls: { adversarial: false, iterate: true } } },
    { configuration: { pattern: 'proposals', terminal: 'vote' } },
    { configuration: { pattern: 'fleet', maxCalls: 1000 } },
  ]) assert.throws(() => validate({ ...sample, ...update }, 'fleet.json'));
});
test('generated index links each card and preserves the same entry data', async () => {
  const entries = await loadEntries(); const files = outputs(entries);
  const data = JSON.parse(files.get(join(relative, 'catalog-index.json')));
  assert.deepEqual(data.entries, entries);
  for (const e of entries) assert.ok(files.get(join(relative, 'patterns.md')).includes('(patterns/' + e.id + '.md)'));
});
