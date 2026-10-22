#!/usr/bin/env node
/* Static check for everything under devart-ui/. Run before every commit:

       node devart-ui/tools/check.mjs            # whole folder
       node devart-ui/tools/check.mjs <file…>    # only these files

   1. CLASSES — every class name written in a className / cx() / class="" string must exist,
      either in the compiled DevartUI stylesheet (ds-bundle/_ds_bundle.css — Tailwind only
      ships what it compiled; an uncompiled utility such as p-[13px] silently does nothing)
      or in a stylesheet under devart-ui/ (an ik-* / pg-* rule).
   2. RAW COLOURS — no hex / rgb() / bare hsl() literals in CSS, inline styles or JS. Colours
      come from tokens. A line that must carry one (a third-party brand mark) ends with the
      comment  ik-allow-raw.
   3. INDEX — insightis-kit.css|.js and review-kit.css|.js match the component folders on disk, and they
      and every page carry the kits' current ?v= stamp (tools/kit-stamp.mjs).
   4. BOUNDARY — nothing under insightis-kit/ (the product) uses the review kit: no RK.* /
      window.ReviewKit in its .js files. Review chrome composes the product, never the reverse.
   Exit code 1 on any finding. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const repo = path.resolve(root, '..');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}
const unescape = (s) => s.replace(/\\([0-9a-fA-F]{1,6}) ?/g, (_, hx) => String.fromCodePoint(parseInt(hx, 16)))
                         .replace(/\\(.)/g, '$1');
function classesIn(cssText) {
  const set = new Set();
  const re = /\.((?:\\.|[A-Za-z0-9_-])+)/g; let m;
  while ((m = re.exec(cssText))) set.add(unescape(m[1]));
  return set;
}

const all = walk(root);
const cssFiles = all.filter(f => f.endsWith('.css'));
const known = classesIn(fs.readFileSync(path.join(repo, 'ds-bundle/_ds_bundle.css'), 'utf8'));
for (const f of cssFiles) for (const c of classesIn(fs.readFileSync(f, 'utf8'))) known.add(c);
// classes defined in page <style> blocks
for (const f of all.filter(f => f.endsWith('.html'))) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) for (const c of classesIn(m[1])) known.add(c);
}
// state / hook classes that are set for selectors only, never styled on their own
const MARKERS = /^(is-|has-|js-|dark$|group$|peer$|sr-only$)/;

const targets = process.argv.slice(2).length
  ? process.argv.slice(2).map(f => path.resolve(f))
  : all.filter(f => /\.(js|html)$/.test(f) && !/(insightis|review)-kit\.js$/.test(f) && !f.includes(`${path.sep}tools${path.sep}`));

let problems = 0;
const report = (f, line, msg) => { problems++; console.log(`${path.relative(repo, f)}:${line}  ${msg}`); };
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

for (const f of targets) {
  const raw = fs.readFileSync(f, 'utf8');
  // comments never count — blank them out, keeping line numbers
  const text = raw.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
                  .replace(/^\s*\/\/.*$/gm, m => ' '.repeat(m.length));
  // 1. classes
  const strings = [];
  for (const m of text.matchAll(/className\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/g)) strings.push([m.index, m[2]]);
  for (const m of text.matchAll(/\bclass(?:Name)?="([^"]*)"/g)) strings.push([m.index, m[1]]);
  for (const m of text.matchAll(/\bcx\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g))
    for (const s of m[1].matchAll(/(['"])((?:\\.|(?!\1).)*)\1/g)) strings.push([m.index, s[2]]);
  for (const [idx, s] of strings) {
    if (s.includes('${')) continue;
    for (const c of s.split(/\s+/).filter(Boolean)) {
      if (known.has(c) || MARKERS.test(c)) continue;
      report(f, lineOf(text, idx), `unknown class "${c}" (not compiled in DevartUI, not defined in devart-ui CSS)`);
    }
  }
  // 4. boundary — the product kit never reaches into the review kit
  if (f.startsWith(path.join(root, 'insightis-kit') + path.sep) && f.endsWith('.js'))
    for (const m of text.matchAll(/\bRK\.\w+|\bReviewKit\b/g))
      report(f, lineOf(text, m.index), `"${m[0]}" — insightis-kit/ is the product; review chrome lives in review-kit/ and composes it, never the reverse`);
  // 2. raw colours
  text.split('\n').forEach((ln, i) => {
    if (/ik-allow-raw/.test(ln)) return;
    if (/data:image|xmlns|viewBox|href=|src=/.test(ln) && !/style|color|fill|stroke|background/i.test(ln)) return;
    const raw = ln.match(/(?<![\w&-])#[0-9a-fA-F]{3,8}\b(?![-\w])|\brgba?\(|\bhsla?\((?!\s*var\()/);
    if (raw) report(f, i + 1, `raw colour "${raw[0]}" — use a DS token`);
  });
}
for (const f of cssFiles) {
  fs.readFileSync(f, 'utf8').split('\n').forEach((ln, i) => {
    if (/ik-allow-raw/.test(ln) || /^\s*(\/\*|\*)/.test(ln)) return;
    const raw = ln.match(/(?<![\w&-])#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\((?!\s*var\()/);
    if (raw) report(f, i + 1, `raw colour "${raw[0]}" — use a DS token`);
  });
}

// 5. bridges (warning only) — a ds-bridge/ component the vendored bundle now ships is dead weight:
//    the guard already skips it; delete the bridge (ds-bridge.js header says how).
const bridgeFile = path.join(root, 'ds-bridge', 'ds-bridge.js');
if (fs.existsSync(bridgeFile)) {
  const bundle = fs.readFileSync(path.join(repo, 'ds-bundle/_ds_bundle.js'), 'utf8');
  const names = [...fs.readFileSync(bridgeFile, 'utf8').matchAll(/\bbridge\('(\w+)'/g)].map(m => m[1]);
  const shipped = names.filter(n => new RegExp(`\\b${n}:\\s*\\(\\)\\s*=>`).test(bundle));
  console.log(`ds-bridge: ${names.length - shipped.length} bridged (${names.filter(n => !shipped.includes(n)).join(', ') || '—'})`);
  for (const n of shipped) console.log(`WARNING ds-bridge: the bundle now ships ${n} — remove its bridge`);
}
//    A CSS fix names, in a "ships-when:" comment, the bundle selector that will replace it.
const bridgeCss = path.join(root, 'ds-bridge', 'ds-bridge.css');
if (fs.existsSync(bridgeCss)) {
  const bundleCss = fs.readFileSync(path.join(repo, 'ds-bundle/_ds_bundle.css'), 'utf8');
  for (const [, needle] of fs.readFileSync(bridgeCss, 'utf8').matchAll(/ships-when: (.+?) \*\//g)) {
    if (bundleCss.includes(needle)) console.log(`WARNING ds-bridge: the bundle now ships ${needle} — remove its CSS bridge`);
    else console.log(`ds-bridge: 1 CSS fix bridged (${needle.slice(0, 48)}…)`);
  }
}

// 3. index freshness
const indexes = ['insightis-kit', 'review-kit'].flatMap(k => ['css', 'js'].map(x => path.join(root, k, `${k}.${x}`)));
const before = indexes.map(f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');
/* …and every page carries the kits' current stamp (build-index restamps them) */
const htmls = all.filter(f => f.endsWith('.html'));
const htmlBefore = htmls.map(f => fs.readFileSync(f, 'utf8'));
execFileSync(process.execPath, [path.join(here, 'build-index.mjs')], { stdio: 'ignore' });
htmls.forEach((f, i) => {
  if (fs.readFileSync(f, 'utf8') !== htmlBefore[i]) { problems++; console.log(`${path.relative(repo, f)} carried an old kit stamp — restamped it; commit the result`); }
});
const after = indexes.map(f => fs.readFileSync(f, 'utf8'));
indexes.forEach((f, i) => {
  if (before[i] !== after[i]) { problems++; console.log(`${path.relative(repo, f)} was stale — regenerated it; commit the result`); }
});

console.log(problems ? `\n${problems} problem(s)` : 'devart-ui check: clean');
process.exit(problems ? 1 : 0);
