#!/usr/bin/env node
/* Component-level difference sheet: measures the SAME element on the original page and on the
   rebuilt one, and lists every computed property that differs — with token names.

       node devart-ui/tools/measure.mjs specs.json [--out file.json]

   specs.json: [{ "page": "concept/auth/login.html", "name": "Primary button",
                  "orig": FIND, "new": FIND, "viewport": "desktop" }, …]
   FIND: { "sel": "css" } | { "text": "exact text", "tag": "button" }  (smallest match)
         + optional "closest": "css", "box": "bordered"|"filled" (walk up to the first ancestor
           with a border / a background), "nth": n, "svg": true (measure its first <svg>)
   Colours are mapped back to token names (each page's own token set, current theme). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch, evaluate, open } from './cdp.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const args = process.argv.slice(2);
const specFile = args.find(a => a.endsWith('.json') && !a.startsWith('--'));
const outFile = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
const BASE = 'http://localhost:49672';
const THEMES = (args.includes('--themes') ? args[args.indexOf('--themes') + 1] : 'light,dark').split(',');
const VP = { desktop: { width: 1280, height: 800 }, phone: { width: 375, height: 812 } };

const PROBE = (find) => `(() => {
  const F = ${JSON.stringify(find)};
  // token map: every --custom-property in every reachable stylesheet → resolved colour
  if (!window.__tok) {
    const names = new Set();
    const walk = (rules) => { for (const r of rules) { if (r.style) for (const p of r.style) if (p.startsWith('--')) names.add(p);
      if (r.cssRules) walk(r.cssRules); if (r.styleSheet) try { walk(r.styleSheet.cssRules); } catch (e) {} } };
    for (const ss of document.styleSheets) { try { walk(ss.cssRules); } catch (e) {} }
    const host = document.createElement('div'); host.style.color = 'rgb(1, 2, 3)'; document.body.appendChild(host);
    const p = document.createElement('i'); host.appendChild(p);
    const map = {};
    for (const n of names) for (const f of ['var(' + n + ')', 'hsl(var(' + n + '))']) {
      p.style.color = ''; p.style.color = f; if (!p.style.color) continue;
      const c = getComputedStyle(p).color; if (c === 'rgb(1, 2, 3)') continue;
      (map[c] = map[c] || []).includes(n) || (map[c] = map[c] || []).push(n);
    }
    host.remove();
    window.__tok = map;
  }
  const tok = (c) => { const l = window.__tok[c]; if (!l) return c;
    const P = ['--surface', '--ink', '--stroke', '--brand', '--state', '--fb', '--overlay', '--badge', '--btn', '--card', '--segctrl', '--tbl', '--logo'];
    const score = (n) => { const i = P.findIndex(p => n.startsWith(p)); return (i < 0 ? 50 : i) + (/\\d/.test(n) ? 100 : 0); };
    const pick = l.slice().sort((a, b) => score(a) - score(b));
    return c + '  ' + pick.slice(0, 2).join(' / '); };
  let el = null;
  if (F.sel) el = [...document.querySelectorAll(F.sel)].filter(e => e.getBoundingClientRect().width > 0)[F.nth || 0];
  else if (F.text) {
    const norm = (s) => s.replace(/\\s+/g, ' ').trim();
    const all = [...document.querySelectorAll(F.tag || '*')].filter(e => norm(e.textContent) === F.text && e.getBoundingClientRect().width > 0);
    all.sort((a, b) => { const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(); return A.width * A.height - B.width * B.height; });
    el = F.tag ? all[F.nth || 0] : all[0];
  }
  if (!el) return null;
  if (F.closest) el = el.closest(F.closest) || el;
  if (F.box) for (let e = el; e && e !== document.body; e = e.parentElement) {
    const cs = getComputedStyle(e);
    if ((F.box === 'bordered' && parseFloat(cs.borderTopWidth) > 0) || (F.box === 'filled' && cs.backgroundColor !== 'rgba(0, 0, 0, 0)')) { el = e; break; }
  }
  if (F.svg) el = el.querySelector('svg') || el;
  const cs = getComputedStyle(el), b = el.getBoundingClientRect();
  const px = (v) => v === '0px' ? '0' : v;
  const sides = (p) => { const s = ['Top', 'Right', 'Bottom', 'Left'].map(k => px(cs[p + k + (p === 'border' ? 'Width' : '')])); return s.every(v => v === s[0]) ? s[0] : s.join(' '); };
  const ownText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
  const svg = el.tagName.toLowerCase() === 'svg' ? el : el.querySelector('svg');
  const sb = svg && svg.getBoundingClientRect();
  return {
    size: Math.round(b.width) + '×' + Math.round(b.height),
    padding: sides('padding'),
    border: sides('border') + (parseFloat(cs.borderTopWidth) ? ' ' + tok(cs.borderTopColor) : ''),
    radius: px(cs.borderTopLeftRadius),
    background: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 90) : tok(cs.backgroundColor),
    shadow: cs.boxShadow === 'none' ? 'none' : cs.boxShadow.replace(/rgba?\\([^)]*\\)/g, m => m.replace(/\\s/g, '')),
    font: !ownText ? '—' : cs.fontSize + ' / ' + cs.lineHeight + ' · ' + cs.fontWeight + (cs.letterSpacing !== 'normal' ? ' · ls ' + cs.letterSpacing : '') + (cs.textTransform !== 'none' ? ' · ' + cs.textTransform : ''),
    color: ownText ? tok(cs.color) : '—',
    gap: cs.display.includes('flex') || cs.display.includes('grid') ? cs.gap : '—',
    icon: svg ? Math.round(sb.width) + '×' + Math.round(sb.height) + ' sw ' + (svg.getAttribute('stroke-width') || getComputedStyle(svg).strokeWidth) : '—'
  };
})()`;

const specs = JSON.parse(fs.readFileSync(specFile, 'utf8'));
const cdp = await launch();
const rows = [];
try {
  const byPage = {};
  specs.forEach(s => (byPage[`${s.page}|${s.viewport || 'desktop'}`] = byPage[`${s.page}|${s.viewport || 'desktop'}`] || []).push(s));
  for (const [key, list] of Object.entries(byPage)) {
    const [page, vpName] = key.split('|');
    for (const theme of THEMES) {
      const res = { orig: [], new: [] };
      for (const side of ['orig', 'new']) {
        await open(cdp, `${BASE}/${side === 'orig' ? 'pages' : 'devart-ui/pages'}/${page}`, theme, VP[vpName]);
        await evaluate(cdp, `document.documentElement.classList.toggle('dark', ${JSON.stringify(theme)} === 'dark')`);
        for (const s of list) res[side].push(await evaluate(cdp, PROBE(s[side])));
      }
      list.forEach((s, i) => {
        const a = res.orig[i], b = res.new[i];
        const diff = {};
        if (!a || !b) diff._ = { orig: a ? 'found' : 'NOT FOUND', new: b ? 'found' : 'NOT FOUND' };
        else for (const k of Object.keys(a)) if (a[k] !== b[k]) diff[k] = { orig: a[k], new: b[k] };
        rows.push({ page, viewport: vpName, theme, name: s.name, diff });
      });
    }
  }
} finally { cdp.close(); }
for (const r of rows) {
  const ks = Object.keys(r.diff);
  console.log(`\n## ${r.name} — ${r.page} · ${r.theme} · ${r.viewport}${ks.length ? '' : '  ✓ identical'}`);
  for (const k of ks) console.log(`  ${k.padEnd(10)} ${r.diff[k].orig}\n  ${''.padEnd(10)} → ${r.diff[k].new}`);
}
if (outFile) fs.writeFileSync(outFile, JSON.stringify(rows, null, 1));
