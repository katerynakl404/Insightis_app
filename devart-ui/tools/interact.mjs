#!/usr/bin/env node
/* Interactive-state comparison, original ↔ rebuilt, for every page in devart-ui/pages/.

       node devart-ui/tools/interact.mjs                         # every rebuilt page
       node devart-ui/tools/interact.mjs --only auth/register    # paths containing this text
       options: --themes light,dark  --viewports desktop,phone  --no-hover  --no-focus
                --no-scenarios  --max 120 (elements per hover sweep)

   Three passes per page × theme × viewport, driven by REAL input events (CDP mouse / keyboard),
   so :hover, :focus-visible, Radix pointer handlers and tooltip delays all behave as for a person:

   1. HOVER SWEEP — every visible interactive element outside the review chrome (button, link,
      input, [role=button|menuitem|tab|checkbox|switch|option], [tabindex]) is hovered for 380 ms.
      Recorded: background / text / border colour, shadow, underline, opacity, cursor at rest and
      on hover, and any text that APPEARED (tooltips, hover popovers). Elements are matched across
      the two pages by accessible label (aria-label → text → placeholder) + occurrence.
   2. FOCUS SWEEP — Tab from the top of the page until focus cycles (max 80 stops): the order of
      focus stops and each stop's focus ring (outline / box-shadow).
   3. SCENARIOS — scripted states from devart-ui/tools/scenarios/<page path>.json, e.g.
      scenarios/concept/auth/register.json:

        [ { "name": "Strength hint — weak password",
            "viewport": "desktop",                       // optional, default: every viewport
            "steps": [
              { "do": "fill",  "target": { "sel": "input[type=password]" }, "text": "abc" },
              { "do": "click", "target": { "orig": { "sel": ".au-eye" }, "new": { "sel": "button[aria-label*=assword]" } } },
              { "do": "hover", "target": { "text": "Terms of Service" } },
              { "do": "key",   "key": "Escape" },                  // Tab, Enter, ArrowDown, Escape …
              { "do": "wait",  "ms": 600 },
              { "do": "eval",  "orig": "js expression", "new": "js expression" }
            ] } ]

      A target is a FIND — { "sel": "css", "nth": 0 } or { "text": "exact text", "tag": "button" }
      (smallest element with exactly that text), optionally + "closest": "css" — the same on both
      pages, or split into { "orig": FIND, "new": FIND }. After the steps the viewport is captured
      on both sides: pixel diff + text diff, like compare.mjs.

   Report: working/devart-interact/<stamp>/report.html (+ summary.json). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch, evaluate, open } from './cdp.mjs';
import { pngDecode, pixelDiff, TEXTS, textDiff, sameColor } from './diff.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const BASE = opt('--base', 'http://localhost:49672').replace(/\/$/, '');
const ONLY = opt('--only', '');
const MAX = +opt('--max', 120);
const THEMES = opt('--themes', 'light,dark').split(',');
const VPS = [{ name: 'desktop', width: 1280, height: 800 }, { name: 'phone', width: 375, height: 812 }]
  .filter(v => opt('--viewports', 'desktop').split(',').includes(v.name));
const DO = { hover: !args.includes('--no-hover'), focus: !args.includes('--no-focus'), scen: !args.includes('--no-scenarios') };

/* Installed in every page: element finder + labelling + style probe. */
const LIB = `(() => {
  if (window.__ik) return;
  const norm = (s) => (s || '').replace(/\\s+/g, ' ').trim();
  const visible = (el) => { const b = el.getBoundingClientRect(); if (b.width < 2 || b.height < 2) return false;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false; } return true; };
  const chrome = (el) => !!el.closest('.topbar, [data-ik-review]');
  const label = (el) => norm(el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || el.getAttribute('title') || el.value).slice(0, 70);
  const find = (F) => {
    if (!F) return null; let el = null;
    if (F.sel) el = [...document.querySelectorAll(F.sel)].filter(visible)[F.nth || 0];
    else if (F.text) { const all = [...document.querySelectorAll(F.tag || '*')].filter(e => norm(e.textContent) === F.text && visible(e));
      all.sort((a, b) => { const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(); return A.width * A.height - B.width * B.height; });
      el = all[F.nth || 0]; }
    if (el && F.closest) el = el.closest(F.closest) || el;
    return el || null;
  };
  const surface = (el) => { const b0 = el.getBoundingClientRect();
    const c = [el, el.parentElement, el.parentElement && el.parentElement.parentElement, el.firstElementChild].filter(Boolean)
      .filter(e => { const b = e.getBoundingClientRect(); return Math.abs(b.width - b0.width) <= 8 && Math.abs(b.height - b0.height) <= 8; });
    return c.find(e => { const cs = getComputedStyle(e); return cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopColor !== 'rgba(0, 0, 0, 0)') || cs.boxShadow !== 'none'; }) || el; };
  const style = (el) => { const sf = getComputedStyle(surface(el)); const cs = getComputedStyle(el); const svg = el.querySelector('svg'); return { bg: sf.backgroundColor, color: cs.color, glyph: svg ? getComputedStyle(svg).stroke + '/' + getComputedStyle(svg).color : '—', border: parseFloat(sf.borderTopWidth) > 0 ? sf.borderTopColor : 'none', shadow: sf.boxShadow,
    deco: cs.textDecorationLine, opacity: cs.opacity, cursor: cs.cursor, outline: cs.outlineStyle === 'none' ? 'none' : cs.outlineWidth + ' ' + cs.outlineStyle + ' ' + cs.outlineColor }; };
  const center = (el) => { el.scrollIntoView({ block: 'center', inline: 'center' }); const b = el.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
  const SEL = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=menuitem], [role=tab], [role=checkbox], [role=switch], [role=option], [tabindex]:not([tabindex="-1"])';
  const targets = () => { const seen = {}; return [...document.querySelectorAll(SEL)].filter(e => visible(e) && !e.disabled)
    .map(e => { const l = label(e) || ('<' + e.tagName.toLowerCase() + '>'); const n = seen[l] = (seen[l] || 0) + 1; e.dataset.ikT = l + '#' + n; return e.dataset.ikT; }); };
  const ringProps = (e) => { if (!e) return null; const cs = getComputedStyle(e); return [cs.outlineStyle === 'none' ? 'none' : cs.outlineWidth + ' ' + cs.outlineColor, cs.boxShadow, cs.borderTopColor].join(' ¦ '); };
  const ringSnap = (el) => [el, el && el.parentElement, el && el.parentElement && el.parentElement.parentElement].map(ringProps);
  window.__ik = { norm, visible, chrome, label, find, style, center, targets, ringSnap };
})()`;

async function mouse(cdp, x, y, type = 'mouseMoved', extra = {}) {
  await cdp.send('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' ? 'none' : 'left', clickCount: type === 'mouseMoved' ? 0 : 1, ...extra });
}
const KEYS = { Tab: 9, Enter: 13, Escape: 27, ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39, ' ': 32 };
async function key(cdp, k, shift) {
  const base = { key: k, code: k === ' ' ? 'Space' : k, windowsVirtualKeyCode: KEYS[k], nativeVirtualKeyCode: KEYS[k], modifiers: shift ? 8 : 0 };
  await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...base });
  if (k === 'Enter' || k === ' ') await cdp.send('Input.dispatchKeyEvent', { type: 'char', text: k === 'Enter' ? '\r' : ' ', ...base });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
}
const sleep = (cdp, ms) => evaluate(cdp, `new Promise(r => setTimeout(r, ${ms}))`);
const visibleTexts = async (cdp) => new Set((await evaluate(cdp, TEXTS)).map(t => t.t));

async function load(cdp, url, theme, vp) {
  await open(cdp, url, theme, vp);
  await evaluate(cdp, `document.documentElement.classList.toggle('dark', ${JSON.stringify(theme)} === 'dark')`);
  await evaluate(cdp, LIB);
}

/* ── 1. hover sweep ─────────────────────────────────────────────────────────────────────── */
async function hoverSweep(cdp, url, theme, vp) {
  await load(cdp, url, theme, vp);
  const ids = (await evaluate(cdp, '__ik.targets()')).slice(0, MAX);
  const out = {};
  for (const id of ids) {
    const sel = `[data-ik-t=${JSON.stringify(id)}]`;
    const rest = await evaluate(cdp, `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e || !__ik.visible(e)) return null; return { c: __ik.center(e), s: __ik.style(e) }; })()`);
    if (!rest) continue;
    await sleep(cdp, 30);
    const before = await visibleTexts(cdp);
    await mouse(cdp, rest.c.x, rest.c.y);
    await sleep(cdp, 380);
    const hov = await evaluate(cdp, `(() => { const e = document.querySelector(${JSON.stringify(sel)}); return e ? __ik.style(e) : null; })()`);
    const after = await visibleTexts(cdp);
    const appeared = [...after].filter(t => !before.has(t));
    out[id] = { rest: rest.s, hover: hov, appeared };
    await mouse(cdp, 2, vp.height - 2);
    await sleep(cdp, 220);
    if (appeared.length) { await key(cdp, 'Escape'); await sleep(cdp, 120); }
  }
  return out;
}
const STYLE_KEYS = ['bg', 'color', 'glyph', 'border', 'shadow', 'deco', 'opacity', 'cursor'];
const same = (k, a, b) => (k === 'bg' || k === 'color' || k === 'border') ? sameColor(a, b) : a === b;
const exact = (k, a, b) => (k === 'bg' || k === 'color' || k === 'border') ? sameColor(a, b, 1) : a === b;
function compareHover(A, B) {
  const rows = [], missing = [], extra = [];
  for (const id of Object.keys(A)) {
    const a = A[id], b = B[id];
    if (!b) { missing.push(id); continue; }
    const issues = [];
    for (const k of STYLE_KEYS) {
      const aChanges = a.hover && !exact(k, a.rest[k], a.hover[k]), bChanges = b.hover && !exact(k, b.rest[k], b.hover[k]);
      if (aChanges !== bChanges) issues.push(`${k}: original ${aChanges ? `${a.rest[k]} → ${a.hover[k]}` : 'unchanged'} · rebuilt ${bChanges ? `${b.rest[k]} → ${b.hover[k]}` : 'unchanged'}`);
      else if (aChanges && !same(k, a.hover[k], b.hover[k])) issues.push(`${k} on hover: ${a.hover[k]} → rebuilt ${b.hover[k]}`);
    }
    const ap = a.appeared.join(' | '), bp = b.appeared.join(' | ');
    if (ap !== bp) issues.push(`appeared: "${ap || '—'}" → rebuilt "${bp || '—'}"`);
    rows.push({ id, issues });
  }
  for (const id of Object.keys(B)) if (!A[id]) extra.push(id);
  return { rows, missing, extra };
}

/* ── 2. focus sweep ─────────────────────────────────────────────────────────────────────── */
async function focusSweep(cdp, url, theme, vp) {
  await load(cdp, url, theme, vp);
  await evaluate(cdp, `(document.activeElement && document.activeElement.blur(), window.scrollTo(0, 0))`);
  await mouse(cdp, vp.width - 2, vp.height - 2, 'mousePressed'); await mouse(cdp, vp.width - 2, vp.height - 2, 'mouseReleased');
  const stops = [];
  for (let i = 0; i < 80; i++) {
    await key(cdp, 'Tab'); await sleep(cdp, 60);
    const s = await evaluate(cdp, `(() => { const e = document.activeElement; if (!e || e === document.body) return null;
      const on = __ik.ringSnap(e); const fv = e.matches(':focus-visible'); e.blur(); const off = __ik.ringSnap(e); e.focus();
      const where = ['self', 'parent', 'grandparent']; const ch = [];
      on.forEach((v, i) => { if (v && v !== off[i]) ch.push(where[i] + ': ' + off[i] + '  →  ' + v); });
      return { label: __ik.label(e) || ('<' + e.tagName.toLowerCase() + '>'), chrome: __ik.chrome(e), ring: ch.length ? ch.join(' || ') : 'none', fv }; })()`);
    if (!s) break;
    if (stops.length > 1 && s.label === stops[0].label) break;
    stops.push(s);
  }
  return stops;
}
function compareFocus(A, B) {
  const a = A.map(s => s.label), b = B.map(s => s.label);
  // LCS for order
  const m = a.length, n = b.length, dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const pairs = []; let i = 0, j = 0;
  while (i < m && j < n) { if (a[i] === b[j]) { pairs.push([i, j]); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  const inA = new Set(pairs.map(p => p[0])), inB = new Set(pairs.map(p => p[1]));
  const ringDiff = pairs.filter(([x, y]) => (A[x].ring === 'none') !== (B[y].ring === 'none')).map(([x, y]) => `${A[x].label}: original ${A[x].ring} — rebuilt ${B[y].ring}`);
  const rings = pairs.map(([x, y]) => ({ label: A[x].label, orig: A[x].ring, rebuilt: B[y].ring }));
  return { orig: a, rebuilt: b, onlyOrig: a.filter((_, k) => !inA.has(k)), onlyNew: b.filter((_, k) => !inB.has(k)), ringDiff, rings, inOrder: pairs.length };
}

/* ── 3. scenarios ───────────────────────────────────────────────────────────────────────── */
async function runSteps(cdp, side, steps) {
  const log = [];
  for (const st of steps) {
    const F = st.target ? (st.target.orig || st.target.new ? st.target[side] : st.target) : null;
    const pos = F ? await evaluate(cdp, `(() => { const e = __ik.find(${JSON.stringify(F)}); return e ? __ik.center(e) : null; })()`) : null;
    if (F && !pos) { log.push(`${st.do}: target not found ${JSON.stringify(F)}`); continue; }
    if (st.do === 'hover') { await mouse(cdp, pos.x, pos.y); await sleep(cdp, st.ms || 400); }
    else if (st.do === 'click') { await mouse(cdp, pos.x, pos.y); await mouse(cdp, pos.x, pos.y, 'mousePressed'); await mouse(cdp, pos.x, pos.y, 'mouseReleased'); await sleep(cdp, st.ms || 350); }
    else if (st.do === 'fill') {
      await mouse(cdp, pos.x, pos.y, 'mousePressed'); await mouse(cdp, pos.x, pos.y, 'mouseReleased');
      await evaluate(cdp, `(() => { const e = __ik.find(${JSON.stringify(F)}); if (e && e.select) e.select(); })()`);
      await cdp.send('Input.insertText', { text: st.text || '' }); await sleep(cdp, st.ms || 250);
    }
    else if (st.do === 'key') { await key(cdp, st.key, st.shift); await sleep(cdp, st.ms || 250); }
    else if (st.do === 'wait') await sleep(cdp, st.ms || 300);
    else if (st.do === 'eval') { const js = st[side]; if (js) await evaluate(cdp, js); await sleep(cdp, st.ms || 200); }
  }
  return log;
}
async function scenario(cdp, url, theme, vp, sc, side) {
  await load(cdp, url, theme, vp);
  const log = await runSteps(cdp, side, sc.steps || []);
  const texts = await evaluate(cdp, TEXTS);
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
  return { png: Buffer.from(shot.data, 'base64'), texts, log, errors: cdp.errors.slice() };
}

/* ── run ────────────────────────────────────────────────────────────────────────────────── */
function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); e.isDirectory() ? walk(p, out) : out.push(p); } return out; }
const pairs = walk(path.join(repo, 'devart-ui/pages')).filter(f => f.endsWith('.html'))
  .map(f => path.relative(path.join(repo, 'devart-ui/pages'), f).split(path.sep).join('/'))
  .filter(rel => fs.existsSync(path.join(repo, 'pages', rel)) && (!ONLY || rel.includes(ONLY))).sort();
if (!pairs.length) { console.log('nothing to compare'); process.exit(0); }

const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
const outDir = path.join(repo, 'working/devart-interact', stamp);
fs.mkdirSync(path.join(outDir, 'img'), { recursive: true });
const cdp = await launch();
const R = [];
try {
  for (const rel of pairs) {
    const o = `${BASE}/pages/${rel}`, n = `${BASE}/devart-ui/pages/${rel}`;
    const scFile = path.join(here, 'scenarios', rel.replace(/\.html$/, '.json'));
    const scenarios = DO.scen && fs.existsSync(scFile) ? JSON.parse(fs.readFileSync(scFile, 'utf8')) : [];
    for (const theme of THEMES) for (const vp of VPS) {
      const rec = { rel, theme, vp: vp.name };
      process.stdout.write(`${rel} · ${theme} · ${vp.name}: `);
      if (DO.hover) {
        rec.hover = compareHover(await hoverSweep(cdp, o, theme, vp), await hoverSweep(cdp, n, theme, vp));
        process.stdout.write(rec.hover.notReady ? `hover: ${rec.hover.notReady} page NOT READY · ` : `hover ${rec.hover.rows.filter(r => r.issues.length).length}/${rec.hover.rows.length} differ, ${rec.hover.missing.length} missing · `);
      }
      if (DO.focus) {
        rec.focus = compareFocus(await focusSweep(cdp, o, theme, vp), await focusSweep(cdp, n, theme, vp));
        process.stdout.write(`focus ${rec.focus.inOrder}/${rec.focus.orig.length} in order, ${rec.focus.ringDiff.length} ring diffs · `);
      }
      rec.scenarios = [];
      for (const sc of scenarios) {
        if (sc.viewport && sc.viewport !== vp.name) continue;
        const a = await scenario(cdp, o, theme, vp, sc, 'orig'), b = await scenario(cdp, n, theme, vp, sc, 'new');
        const key = `${rel.replace(/[\/.]/g, '_')}__${theme}__${vp.name}__${sc.name.replace(/[^\w]+/g, '-')}`;
        const d = pixelDiff(pngDecode(a.png), pngDecode(b.png));
        fs.writeFileSync(path.join(outDir, 'img', key + '.orig.png'), a.png);
        fs.writeFileSync(path.join(outDir, 'img', key + '.new.png'), b.png);
        fs.writeFileSync(path.join(outDir, 'img', key + '.diff.png'), d.png);
        const t = textDiff(a.texts, b.texts);
        rec.scenarios.push({ name: sc.name, key, pct: d.pct, ...t, logOrig: a.log, logNew: b.log, errorsNew: b.errors });
      }
      if (scenarios.length) process.stdout.write(`${rec.scenarios.length} scenarios`);
      console.log('');
      R.push(rec);
    }
  }
} finally { cdp.close(); }

/* ── report ─────────────────────────────────────────────────────────────────────────────── */
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ul = (a, f = esc) => a.length ? `<ul>${a.map(x => `<li>${f(x)}</li>`).join('')}</ul>` : '<p class="ok">none</p>';
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Interactive states — original vs rebuilt</title><style>
:root{--bg:#f8fafc;--card:#fff;--ink:#0f172a;--mut:#5a6a80;--line:#e2e8f0;--bad:#c81e1e;--warn:#b45309;--good:#047857} /* ik-allow-raw */
@media (prefers-color-scheme:dark){:root{--bg:#0b0f14;--card:#141a21;--ink:#e2e8f0;--mut:#94a3b8;--line:#253041}} /* ik-allow-raw */
body{margin:0;padding:24px 16px;font:14px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--ink)}h1{font-size:20px;margin:0}h2{font-size:16px;margin:28px 0 6px}h3{font-size:14px;margin:14px 0 4px}
details{background:var(--card);border:1px solid var(--line);border-radius:8px;margin:6px 0;padding:8px 12px}summary{cursor:pointer;font-weight:600}
.bad{color:var(--bad);font-weight:600}.warn{color:var(--warn)}.ok{color:var(--good)}li{font-size:12px}ul{margin:4px 0;padding-left:18px}
.imgs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.imgs img{width:100%;border:1px solid var(--line)}figure{margin:0}figcaption{font-size:12px;color:var(--mut)}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:12px}ol{font-size:12px;margin:0;padding-left:22px}
</style></head><body><h1>Interactive states — ${pairs.length} pages</h1><p>${esc(stamp)} · hover = real pointer, 380 ms; focus = real Tab key; scenarios from devart-ui/tools/scenarios/</p>
${R.map(r => {
  const hv = r.hover, fc = r.focus;
  const hovBad = hv ? hv.rows.filter(x => x.issues.length) : [];
  return `<h2>${esc(r.rel)} · ${r.theme} · ${r.vp}</h2>
${hv && hv.notReady ? `<p class="bad">Hover sweep: the ${hv.notReady} page did not render — re-run</p>` : ''}${hv && !hv.notReady ? `<details${hovBad.length || hv.missing.length ? ' open' : ''}><summary>Hover — <span class="${hovBad.length ? 'bad' : 'ok'}">${hovBad.length} of ${hv.rows.length} elements differ</span>, ${hv.missing.length} only in original, ${hv.extra.length} only in rebuilt</summary>
<h3>Differ</h3>${ul(hovBad, x => `<b>${esc(x.id)}</b>${ul(x.issues)}`)}<div class="cols"><div><h3>Only in original</h3>${ul(hv.missing)}</div><div><h3>Only in rebuilt</h3>${ul(hv.extra)}</div></div></details>` : ''}
${fc ? `<details${fc.onlyOrig.length || fc.onlyNew.length || fc.ringDiff.length ? ' open' : ''}><summary>Focus — ${fc.inOrder} of ${fc.orig.length} stops in the same order; <span class="${fc.ringDiff.length ? 'bad' : 'ok'}">${fc.ringDiff.length} ring differences</span></summary>
<div class="cols"><div><h3>Original order</h3><ol>${fc.orig.map(l => `<li>${esc(l)}</li>`).join('')}</ol></div><div><h3>Rebuilt order</h3><ol>${fc.rebuilt.map(l => `<li>${esc(l)}</li>`).join('')}</ol></div></div>
<h3>Ring present on one side only</h3>${ul(fc.ringDiff)}<h3>Every ring (what changes when focused)</h3>${ul(fc.rings, x => `<b>${esc(x.label)}</b><br>original: ${esc(x.orig)}<br>rebuilt: ${esc(x.rebuilt)}`)}</details>` : ''}
${r.scenarios.map(s => `<details><summary>${esc(s.name)} — ${s.pct}% px, ${s.missing.length} missing, ${s.extra.length} extra, ${s.changed.length} changed${s.logNew.length || s.logOrig.length ? ' <span class="bad">step failed</span>' : ''}</summary>
<div class="imgs"><figure><img loading="lazy" src="img/${s.key}.orig.png"><figcaption>original</figcaption></figure><figure><img loading="lazy" src="img/${s.key}.new.png"><figcaption>rebuilt</figcaption></figure><figure><img loading="lazy" src="img/${s.key}.diff.png"><figcaption>diff</figcaption></figure></div>
<div class="cols"><div><h3>Missing in rebuilt</h3>${ul(s.missing.map(x => x.t))}</div><div><h3>Extra in rebuilt</h3>${ul(s.extra.map(x => x.t))}</div></div><h3>Changed</h3>${ul(s.changed, x => `${esc(x.t)} — ${esc(x.what.join(', '))}`)}
${s.logOrig.length || s.logNew.length ? `<p class="bad">steps: original ${esc(s.logOrig.join('; ') || 'ok')} · rebuilt ${esc(s.logNew.join('; ') || 'ok')}</p>` : ''}</details>`).join('')}`;
}).join('')}</body></html>`;
fs.writeFileSync(path.join(outDir, 'report.html'), html);
fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify(R.map(r => ({ ...r, scenarios: r.scenarios.map(({ missing, extra, changed, ...s }) => ({ ...s, missing: missing.map(x => x.t), extra: extra.map(x => x.t), changed })) })), null, 1));
console.log(`\nreport: ${path.relative(repo, path.join(outDir, 'report.html'))}`);
