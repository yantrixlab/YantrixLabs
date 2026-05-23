import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const TARGET_ROOT = join(ROOT, 'apps', 'web', 'src');
const ALLOWED_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.mjs']);

// Allowlist rare non-UI domain words that may legitimately include "purple"/"violet".
const ALLOW_SUBSTRINGS = [
  'privacy',
  'terms',
];

const DISALLOWED_REGEX = [
  /\bpurple(?:-\d{2,3})?\b/gi,
  /\bviolet(?:-\d{2,3})?\b/gi,
  /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g, // filtered below for known purple-tones only
];

const PURPLE_HEXES = new Set([
  '#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95',
  '#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87',
  '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75',
]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (ALLOWED_EXT.has(extname(full))) out.push(full);
  }
  return out;
}

const files = walk(TARGET_ROOT);
const violations = [];

for (const file of files) {
  const rel = file.slice(ROOT.length + 1).replaceAll('\\', '/');
  const content = readFileSync(file, 'utf8');
  const lower = content.toLowerCase();

  if (ALLOW_SUBSTRINGS.some((s) => rel.includes(s) || lower.includes(s))) {
    // still scan; allowlist is partial and conservative
  }

  for (const rx of DISALLOWED_REGEX) {
    const matches = [...content.matchAll(rx)];
    for (const m of matches) {
      const token = m[0];
      if (token.startsWith('#')) {
        const normalized = token.toLowerCase();
        if (!PURPLE_HEXES.has(normalized)) continue;
      }
      const idx = m.index ?? 0;
      const line = content.slice(0, idx).split('\n').length;
      violations.push(`${rel}:${line} -> ${token}`);
    }
  }
}

if (violations.length > 0) {
  console.error('Brand color guard failed. Purple/violet tokens found:\n');
  for (const v of violations.slice(0, 300)) console.error(`- ${v}`);
  if (violations.length > 300) {
    console.error(`...and ${violations.length - 300} more.`);
  }
  process.exit(1);
}

console.log('Brand color guard passed: no purple/violet tokens found in apps/web/src.');
