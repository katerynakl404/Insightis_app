/* Shared headless-Chrome (CDP) helpers for the devart-ui comparison tools. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

export const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find(p => fs.existsSync(p));


/* ── CDP ─────────────────────────────────────────────────────────────────────────────────── */
export async function launch() {
  if (!CHROME) throw new Error('no Chrome / Edge found');
  const port = 9300 + Math.floor(Math.random() * 500);
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'ik-cmp-'));
  const proc = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`,
    '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--mute-audio', 'about:blank'], { stdio: 'ignore' });
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await new Promise(r => setTimeout(r, 250));
    try { target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json(); } catch {}
  }
  if (!target) throw new Error('chrome did not start');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map(), listeners = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
    else if (m.method) listeners.slice().forEach(l => l(m));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const once = (method, ms = 15000) => new Promise((res) => {
    const t = setTimeout(() => { off(); res(null); }, ms);
    const l = (m) => { if (m.method === method) { clearTimeout(t); off(); res(m.params); } };
    const off = () => { const k = listeners.indexOf(l); if (k >= 0) listeners.splice(k, 1); };
    listeners.push(l);
  });
  const errors = [];
  listeners.push((m) => {
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description?.split('\n')[0] || m.params.exceptionDetails.text);
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push(m.params.entry.text);
  });
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  const close = () => { try { ws.close(); } catch {} proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} }, 1500); };
  return { send, once, errors, close };
}
export const evaluate = async (cdp, expr) => {
  const r = await cdp.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};

export const SETTLE = `new Promise(r => {
  const s = document.createElement('style');
  s.textContent = '*,*::before,*::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important;caret-color:transparent!important}';
  document.head.appendChild(s);
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(r, 500));
})`;

/* Load url at a viewport with the review harness forced to a theme (and plan "paid"). */
export async function open(cdp, url, theme, vp) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.width < 768 });
  const { identifier } = await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: `(function(){var T=${JSON.stringify(theme)};
    try{localStorage.setItem("insightis.theme",T);localStorage.setItem("insightis.plan","paid");}catch(e){}
    function ap(){if(document.documentElement)document.documentElement.classList.toggle("dark",T==="dark");}
    ap();document.addEventListener("DOMContentLoaded",ap);addEventListener("load",ap);})();` });
  cdp.errors.length = 0;
  const loaded = cdp.once("Page.loadEventFired");
  await cdp.send("Page.navigate", { url });
  await loaded;
  await cdp.send("Page.removeScriptToEvaluateOnNewDocument", { identifier });
  // under load the load event can time out: wait until the page has really rendered something
  await evaluate(cdp, `new Promise(r => { const t0 = Date.now(); (function poll() {
    if ((document.readyState === 'complete' && document.body && document.body.innerText.trim().length > 0) || Date.now() - t0 > 20000) r(); else setTimeout(poll, 100); })(); })`);
  await evaluate(cdp, SETTLE);
}
