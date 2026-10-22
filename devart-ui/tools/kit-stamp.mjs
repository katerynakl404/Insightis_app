/* The kits' version stamp — a short hash of every file the kit loaders load (ds-bridge/, insightis-kit/,
   review-kit/: .js and .css, never the generated indexes). build-index.mjs writes it into the loaders (each
   component as <file>?v=<stamp>) and into every page's <script>/<link> of a kit, so a browser never puts a
   new page together with an old kit from its cache — GitHub Pages lets a browser keep every file 10 minutes,
   and a page calling a component its cached kit lacks renders blank (2026-10-22). check.mjs runs build-index
   and fails while a loader or a page lags behind. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DIRS = ['ds-bridge', 'insightis-kit', 'review-kit'];
const INDEX = /^(insightis|review)-kit\.(js|css)$/;

export function kitStamp(root) {
  const files = [];
  for (const d of DIRS) walkDir(path.join(root, d), files);
  files.sort();
  const h = crypto.createHash('sha1');
  for (const f of files) { h.update(path.relative(root, f).replace(/\\/g, '/')); h.update(fs.readFileSync(f)); }
  return h.digest('hex').slice(0, 10);
}
function walkDir(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(p, out);
    else if (/\.(js|css)$/.test(e.name) && !INDEX.test(e.name)) out.push(p);
  }
}

/* a kit's <script src="…/insightis-kit.js"> or <link href="…/review-kit.css">, with or without ?v= */
const TAG = /(<(?:script|link)\b[^>]*?\b(?:src|href)="[^"]*?(?:insightis|review)-kit\.(?:js|css))(?:\?v=[0-9a-f]+)?"/g;

/* every .html under root → its kit tags carry ?v=<stamp>; returns the files it changed */
export function stampPages(root, stamp) {
  const changed = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p); continue; }
      if (!e.name.endsWith('.html')) continue;
      const t = fs.readFileSync(p, 'utf8');
      const n = t.replace(TAG, `$1?v=${stamp}"`);
      if (n !== t) { fs.writeFileSync(p, n); changed.push(p); }
    }
  })(root);
  return changed;
}
