import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const relative = 'skills/claude-workflows/references';
const kinds = ['baseline', 'mode', 'structure', 'control', 'terminal'];
const executors = ['main-session', 'ordinary-subagents', 'agent-deployment', 'custom'];
const core = ['pipeline', 'fleet', 'proposals', 'dynamic'];
function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(label + ' must be nonempty text');
}
export function validate(entry, file) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw new Error('Invalid entry');
  if (!/^[a-z][a-z0-9-]*$/.test(entry.id) || file !== entry.id + '.json') throw new Error('ID must match filename');
  for (const key of ['title', 'summary', 'example', 'diagram']) requireText(entry[key], key);
  if (!kinds.includes(entry.kind) || !executors.includes(entry.executor)) throw new Error('Unknown kind or executor');
  if (!Number.isInteger(entry.order) || entry.order < 0) throw new Error('Invalid order');
  for (const key of ['useWhen', 'avoidWhen', 'contract']) {
    if (!Array.isArray(entry[key]) || !entry[key].length) throw new Error(key + ' must contain guidance');
    entry[key].forEach(value => requireText(value, key));
  }
  if (!/^flowchart (LR|TD)\n/.test(entry.diagram)) throw new Error('Diagram must be a flowchart');
  const c = entry.configuration;
  if (!c || typeof c !== 'object' || Array.isArray(c)) throw new Error('Invalid configuration');
  if (entry.executor !== 'agent-deployment' && Object.keys(c).length) throw new Error('Only bundled recipes have configuration fragments');
  if (entry.executor === 'agent-deployment') {
    if (Object.keys(c).some(key => !['pattern', 'terminal', 'controls', 'compactAnswer'].includes(key))) throw new Error('Unknown configuration key');
    if (c.pattern !== undefined && !core.includes(c.pattern)) throw new Error('Unsupported bundled pattern');
    if (c.terminal !== undefined && (c.pattern !== 'proposals' || !['select', 'fuse', 'vote'].includes(c.terminal))) throw new Error('Invalid terminal');
    if (c.compactAnswer !== undefined && c.compactAnswer !== true) throw new Error('Invalid compactAnswer');
    if ((c.terminal === 'vote') !== (c.compactAnswer === true)) throw new Error('Vote requires compactAnswer');
    if (c.controls !== undefined) {
      if (!c.controls || Object.keys(c.controls).some(key => !['adversarial', 'iterate'].includes(key))
        || typeof c.controls.adversarial !== 'boolean' || typeof c.controls.iterate !== 'boolean'
        || (c.controls.iterate && !c.controls.adversarial)) throw new Error('Invalid controls');
    }
  }
  return entry;
}
export async function loadEntries(directory = join(root, relative, 'patterns')) {
  const files = (await readdir(directory)).filter(file => file.endsWith('.json')).sort();
  const entries = [];
  for (const file of files) entries.push(validate(JSON.parse(await readFile(join(directory, file), 'utf8')), file));
  if (!entries.length || new Set(entries.map(entry => entry.id)).size !== entries.length) throw new Error('Empty or duplicate catalog');
  return entries.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}
const bullets = values => values.map(value => '- ' + value).join('\n');
const tableText = value => value.replaceAll('|', '\\|').replaceAll('\n', ' ');
export function outputs(entries) {
  const files = new Map();
  const header = '# Pattern catalog\n\nGenerated from one JSON entry per pattern. Edit the entry, then run node scripts/catalog.mjs --write.\n'
    + '\nKinds describe different decisions: baseline and mode choose who coordinates; structure organizes work;\n'
    + 'controls add checks; terminals resolve proposals. New entries do not add execution support automatically.\n\n';
  const rows = entries.map(e => '| [' + tableText(e.title) + '](patterns/' + e.id + '.md) | ' + e.kind + ' | '
    + tableText(e.summary) + ' | ' + e.executor + ' |').join('\n');
  files.set(join(relative, 'patterns.md'), header + '| Pattern | Kind | Purpose | Execution |\n| --- | --- | --- | --- |\n' + rows + '\n');
  files.set(join(relative, 'catalog-index.json'), JSON.stringify({ schemaVersion: 1, entries }, null, 2) + '\n');
  for (const e of entries) {
    let body = '# ' + e.title + '\n\n' + e.summary + '\n\nKind: ' + e.kind + '. Execution: ' + e.executor + '.\n\n'
      + '~~~mermaid\n' + e.diagram + '\n~~~\n\n'
      + '## Use when\n\n' + bullets(e.useWhen) + '\n\n## Prefer another route when\n\n' + bullets(e.avoidWhen) + '\n\n'
      + '## Execution contract\n\n' + bullets(e.contract) + '\n\n## Try asking\n\n> ' + e.example + '\n';
    if (Object.keys(e.configuration).length) body += '\n## Configuration fragment\n\n~~~json\n' + JSON.stringify(e.configuration, null, 2) + '\n~~~\n\n'
      + 'This is a fragment, not runnable args. Supply the full [run contract](../run-contract.md),\n'
      + 'available profiles and selected limits. The catalog never launches agents.\n';
    if (e.executor === 'custom') body += '\nRequires a reviewed task-specific workflow. This card does not enable a new bundled pattern.\n';
    body += '\n[All patterns](../patterns.md) | [Selection checks](../selection.md)\n';
    files.set(join(relative, 'patterns', e.id + '.md'), body);
  }
  return files;
}
export async function generate(base = root, check = false) {
  const entries = await loadEntries(join(base, relative, 'patterns'));
  const expected = outputs(entries);
  for (const [relativePath, content] of expected) {
    const path = join(base, relativePath);
    if (check) {
      let actual;
      try { actual = await readFile(path, 'utf8'); } catch { throw new Error('Missing generated file: ' + relativePath); }
      if (actual !== content) throw new Error('Stale generated file: ' + relativePath);
    } else await writeFile(path, content);
  }
  const directory = join(base, relative, 'patterns');
  for (const file of await readdir(directory)) {
    if (file.endsWith('.md') && !expected.has(join(relative, 'patterns', file))) throw new Error('Orphan generated card: ' + file);
  }
  return entries;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3 || !['--write', '--check'].includes(process.argv[2])) throw new Error('Usage: node scripts/catalog.mjs --write|--check');
    const entries = await generate(root, process.argv[2] === '--check');
    console.log('Catalog: ' + entries.length + ' entries, generated files current');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
