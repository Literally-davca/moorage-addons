#!/usr/bin/env node
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const checkOnly = process.argv.includes('--check');
const idPattern = /^[a-z0-9][a-z0-9_-]{0,62}$/;
const ignoreDirs = new Set(['.git', '.github', 'scripts', 'node_modules']);

const entries = [];
for (const name of readdirSync(root).sort()) {
  if (ignoreDirs.has(name) || name.startsWith('.')) continue;
  const dir = join(root, name);
  if (!statSync(dir).isDirectory()) continue;
  if (!idPattern.test(name)) {
    throw new Error(`Invalid add-on folder name "${name}": must match ${idPattern}`);
  }

  const manifestPath = join(dir, 'addon.json');
  const readmePath = join(dir, 'README.md');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const readme = readFileSync(readmePath, 'utf8');

  if (manifest.id !== name) {
    throw new Error(`${name}/addon.json: id must match folder name "${name}"`);
  }
  if (!manifest.name || !manifest.description || !manifest.kind || !manifest.category) {
    throw new Error(`${name}/addon.json: missing required metadata fields`);
  }
  if (!manifest.resources?.ram || !manifest.resources?.cpu) {
    throw new Error(`${name}/addon.json: missing resources.ram or resources.cpu`);
  }
  if (!/ram/i.test(readme) || !/cpu/i.test(readme)) {
    throw new Error(`${name}/README.md: must document both RAM and CPU footprint`);
  }

  const entry = {
    id: manifest.id,
    name: manifest.name,
    version: manifest.version ?? '1',
    kind: manifest.kind,
    category: manifest.category,
    description: manifest.description,
    resources: manifest.resources,
    readme: `${name}/README.md`,
  };
  try {
    statSync(join(dir, 'compose.yaml'));
    entry.compose = `${name}/compose.yaml`;
  } catch {
    /* optional */
  }
  entries.push(entry);
}

const index = {
  format: 1,
  name: 'Moorage add-ons',
  addons: entries,
};

const json = JSON.stringify(index, null, 2) + '\n';
const indexPath = join(root, 'index.json');

if (checkOnly) {
  let existing = '';
  try {
    existing = readFileSync(indexPath, 'utf8');
  } catch {
    throw new Error('index.json is missing; run node scripts/build-index.mjs');
  }
  if (existing !== json) {
    throw new Error('index.json is out of date; run node scripts/build-index.mjs');
  }
  console.log(`OK: ${entries.length} add-ons validated and index.json is up to date.`);
} else {
  writeFileSync(indexPath, json, 'utf8');
  console.log(`Wrote index.json with ${entries.length} add-ons.`);
}
