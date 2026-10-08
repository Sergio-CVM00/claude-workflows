import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { root } from './catalog.mjs';

const files = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(item.name)) continue;
    const path = join(directory, item.name);
    if (item.isDirectory()) await walk(path); else if (item.isFile()) files.push(path);
  }
}
await walk(root);
for (const file of files.filter(path => path.endsWith('.md'))) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^[a-z]+:\/\//.test(target) || target.startsWith('#')) continue;
    const path = resolve(dirname(file), target.split('#')[0]);
    if (!path.startsWith(root + '/')) throw new Error('Link leaves package: ' + file);
    await stat(path).catch(() => { throw new Error('Broken link: ' + file + ' -> ' + target); });
  }
}
const manifest = JSON.parse(await readFile(join(root, '.claude-plugin/plugin.json'), 'utf8'));
if (manifest.name !== 'claude-workflows') throw new Error('Wrong plugin namespace');
for (const path of [...manifest.skills, manifest.workflows]) await stat(resolve(root, path));
const skill = await readFile(join(root, 'skills/claude-workflows/SKILL.md'), 'utf8');
if (!skill.startsWith('---\nname: claude-workflows\n') || !skill.includes('disable-model-invocation: true')) throw new Error('Invalid skill frontmatter');
console.log('Package: resource links, namespace and registered paths verified');
