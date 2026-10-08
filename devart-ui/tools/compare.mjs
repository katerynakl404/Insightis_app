#!/usr/bin/env node
/* Original ↔ rebuilt comparison for every page in devart-ui/pages/.

       node devart-ui/tools/compare.mjs                      # every rebuilt page
       node devart-ui/tools/compare.mjs --only auth/login    # paths containing this text
       node devart-ui/tools/compare.mjs --no-states          # default state only

   For each page pair (pages/<p>.html ↔ devart-ui/pages/<p>.html), each theme (light, dark),
   each viewport (desktop 1280×800, phone 375×812) and each review state (every button of every
   non-theme switch group in the original's .topbar, one at a time — clicked by label on both
   sides), it captures a full-page screenshot and the page's visible text runs, then reports:
     · pixel mismatch % (+ a diff image: red = differs)
     · text present in the original but missing from the rebuilt page, and extra text
     · matched text whose size / weight / colour / position / width changed
   Needs the static server (.claude/launch.json "insightis-static") — pass --base if it is not
   on http://localhost:49672. Output: working/devart-compare/<stamp>/report.html (gitignored). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch, evaluate, SETTLE, open } from './cdp.mjs';
import { pngDecode, pixelDiff, TEXTS, textDiff } from './diff.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const BASE = opt('--base', 'http://localhost:49672').replace(/\/$/, '');
const ONLY = opt('--only', '');
const STATES = !args.includes('--no-states');
const THEMES = opt('--themes', 'light,dark').split(',');
const VIEWPORTS = [{ name: 'desktop', width: 1280, height: 800 }, { name: 'phone', width: 375, height: 812 }]
  .filter(v => opt('--viewports', 'desktop,phone').split(',').includes(v.name));
const STATE_GROUPS = `[...document.querySelectorAll('.topbar .segctrl')].map(g => ({
  label: g.getAttribute('aria-label') || '',
  buttons: [...g.querySelectorAll('button')].map(b => ({ t: b.textContent.replace(/\\s+/g, ' ').trim(), on: b.classList.contains('is-active') || b.getAttribute('aria-selected') === 'true' }))
})).filter(g => !g.buttons.some(b => /^(Light|Dark)$/.test(b.t)))`;
const CLICK = (label) => `(() => {
  const L = ${JSON.stringify(label)};
  const scope = document.querySelector('[data-ik-review]') || document.querySelector('.topbar');
  if (!scope) return false;
  const b = [...scope.querySelectorAll('button,[role=tab]')].find(x => x.textContent.replace(/\\s+/g, ' ').trim() === L);
  if (!b) return false;
  ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(t => b.dispatchEvent(new (t.startsWith('pointer') ? PointerEvent : MouseEvent)(t, { bubbles: true, cancelable: true, button: 0, pointerType: 'mouse' })));
  return true;
})()`;

async function capture(cdp, url, theme, vp, state) {
  await open(cdp, url, theme, vp);
  let clicked = true;
  if (state) { clicked = await evaluate(cdp, CLICK(state)); await evaluate(cdp, 'new Promise(r => setTimeout(r, 400))'); }
  await evaluate(cdp, `document.documentElement.classList.toggle('dark', ${JSON.stringify(theme)} === 'dark')`);
  const texts = await evaluate(cdp, TEXTS);
  const m = await cdp.send('Page.getLayoutMetrics');
  const cs = m.cssContentSize || m.contentSize;
  const height = Math.min(Math.max(vp.height, Math.ceil(cs.height)), 6000);
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: vp.width, height, scale: 1 } });
  return { png: Buffer.from(shot.data, 'base64'), texts, errors: cdp.errors.slice(), clicked };
}

/* ── run ─────────────────────────────────────────────────────────────────────────────────── */
function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); e.isDirectory() ? walk(p, out) : out.push(p); } return out; }
const pairs = walk(path.join(repo, 'devart-ui/pages')).filter(f => f.endsWith('.html'))
  .map(f => path.relative(path.join(repo, 'devart-ui/pages'), f).split(path.sep).join('/'))
  .filter(rel => fs.existsSync(path.join(repo, 'pages', rel)) && (!ONLY || rel.includes(ONLY)))
  .sort();
if (!pairs.length) { console.log('nothing to compare'); process.exit(0); }

const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
const outDir = path.join(repo, 'working/devart-compare', stamp);
fs.mkdirSync(path.join(outDir, 'img'), { recursive: true });
const cdp = await launch();
const results = [];
try {
  for (const rel of pairs) {
    const origUrl = `${BASE}/pages/${rel}`, newUrl = `${BASE}/devart-ui/pages/${rel}`;
    let states = [null];
    if (STATES) {
      await cdp.send('Page.navigate', { url: origUrl }); await cdp.once('Page.loadEventFired'); await evaluate(cdp, SETTLE);
      const groups = await evaluate(cdp, STATE_GROUPS);
      for (const g of groups) for (const b of g.buttons) if (!b.on && b.t) states.push(b.t);
    }
    for (const theme of THEMES) for (const vp of VIEWPORTS) for (const st of states) {
      const key = `${rel.replace(/[\/.]/g, '_')}__${theme}__${vp.name}${st ? '__' + st.replace(/[^\w]+/g, '-') : ''}`;
      process.stdout.write(`${rel} · ${theme} · ${vp.name}${st ? ' · ' + st : ''} … `);
      const a = await capture(cdp, origUrl, theme, vp, st), b = await capture(cdp, newUrl, theme, vp, st);
      const d = pixelDiff(pngDecode(a.png), pngDecode(b.png));
      fs.writeFileSync(path.join(outDir, 'img', key + '.orig.png'), a.png);
      fs.writeFileSync(path.join(outDir, 'img', key + '.new.png'), b.png);
      fs.writeFileSync(path.join(outDir, 'img', key + '.diff.png'), d.png);
      const t = textDiff(a.texts, b.texts);
      results.push({ rel, theme, vp: vp.name, state: st, key, pct: d.pct, sizeA: d.sizeA, sizeB: d.sizeB, ...t,
        errorsOrig: a.errors, errorsNew: b.errors, stateMissing: st && !b.clicked ? true : false });
      console.log(`${d.pct}% px · ${t.missing.length} missing · ${t.extra.length} extra · ${t.changed.length} changed${b.errors.length ? ' · ' + b.errors.length + ' JS errors' : ''}`);
    }
  }
} finally { cdp.close(); }

/* ── report ──────────────────────────────────────────────────────────────────────────────── */
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const list = (arr, f) => arr.length ? `<ul>${arr.map(x => `<li>${f(x)}</li>`).join('')}</ul>` : '<p class="ok">none</p>';
const byPage = {};
results.forEach(r => (byPage[r.rel] = byPage[r.rel] || []).push(r));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Original vs rebuilt</title><style>
:root{--bg:#f8fafc;--card:#fff;--ink:#0f172a;--mut:#5a6a80;--line:#e2e8f0;--bad:#c81e1e;--warn:#b45309;--good:#047857} /* ik-allow-raw */
@media (prefers-color-scheme:dark){:root{--bg:#0b0f14;--card:#141a21;--ink:#e2e8f0;--mut:#94a3b8;--line:#253041}} /* ik-allow-raw */
body{margin:0;padding:24px 16px;font:14px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--ink)}
h1{font-size:20px;margin:0 0 4px}h2{font-size:16px;margin:32px 0 8px}p{margin:4px 0}
table{border-collapse:collapse;width:100%;background:var(--card)}td,th{border:1px solid var(--line);padding:4px 8px;text-align:left;vertical-align:top}
th{color:var(--mut);font-weight:600}.n{text-align:right;font-variant-numeric:tabular-nums}
.bad{color:var(--bad);font-weight:600}.warn{color:var(--warn)}.ok{color:var(--good)}
details{background:var(--card);border:1px solid var(--line);border-radius:8px;margin:8px 0;padding:8px 12px}
summary{cursor:pointer;font-weight:600}.imgs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}
.imgs figure{margin:0}.imgs img{width:100%;border:1px solid var(--line)}figcaption{color:var(--mut);font-size:12px}
.cols{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}ul{margin:4px 0;padding-left:18px}li{font-size:12px}
</style></head><body>
<h1>Original vs rebuilt — ${results.length} captures, ${pairs.length} pages</h1>
<p>${esc(stamp)} · red in a diff = pixels that differ · magenta = beyond the shorter page · thresholds: colour ±6/255, position ±4px</p>
<table><tr><th>Page</th><th>Capture</th><th class="n">Pixels differ</th><th class="n">Missing text</th><th class="n">Extra text</th><th class="n">Changed text</th><th>Page height orig → new</th><th>JS errors</th></tr>
${results.map(r => `<tr><td>${esc(r.rel)}</td><td><a href="#${r.key}">${r.theme} · ${r.vp}${r.state ? ' · ' + esc(r.state) : ''}</a>${r.stateMissing ? ' <span class="bad">state switch not found</span>' : ''}</td>
<td class="n ${r.pct > 15 ? 'bad' : r.pct > 3 ? 'warn' : 'ok'}">${r.pct}%</td><td class="n ${r.missing.length ? 'bad' : 'ok'}">${r.missing.length}</td>
<td class="n ${r.extra.length ? 'warn' : 'ok'}">${r.extra.length}</td><td class="n ${r.changed.length ? 'warn' : 'ok'}">${r.changed.length}</td>
<td>${r.sizeA[1]} → ${r.sizeB[1]}</td><td class="${r.errorsNew.length ? 'bad' : 'ok'}">${r.errorsNew.length || '—'}</td></tr>`).join('')}</table>
${Object.entries(byPage).map(([rel, rs]) => `<h2>${esc(rel)}</h2>${rs.map(r => `<details id="${r.key}"><summary>${r.theme} · ${r.vp}${r.state ? ' · ' + esc(r.state) : ''} — ${r.pct}% px, ${r.missing.length} missing, ${r.extra.length} extra, ${r.changed.length} changed</summary>
<div class="imgs"><figure><img loading="lazy" src="img/${r.key}.orig.png"><figcaption>original</figcaption></figure><figure><img loading="lazy" src="img/${r.key}.new.png"><figcaption>rebuilt</figcaption></figure><figure><img loading="lazy" src="img/${r.key}.diff.png"><figcaption>diff</figcaption></figure></div>
<div class="cols"><div><b>Missing in rebuilt</b>${list(r.missing, x => esc(x.t))}</div><div><b>Extra in rebuilt</b>${list(r.extra, x => esc(x.t))}</div><div><b>Changed</b>${list(r.changed, x => `${esc(x.t)} — ${esc(x.what.join(', '))}`)}</div></div>
${r.errorsNew.length ? `<p class="bad">JS errors: ${esc(r.errorsNew.join(' | '))}</p>` : ''}</details>`).join('')}`).join('')}
</body></html>`;
fs.writeFileSync(path.join(outDir, 'report.html'), html);
fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify(results.map(({ missing, extra, changed, ...r }) => ({ ...r, missing: missing.map(x => x.t), extra: extra.map(x => x.t), changed })), null, 1));
console.log(`\nreport: ${path.relative(repo, path.join(outDir, 'report.html'))}`);
