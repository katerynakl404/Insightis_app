/* Shared diff helpers for the devart-ui comparison tools: PNG decode/encode, pixel diff,
   the visible-text-run probe, and the text-run diff. */
import zlib from 'node:zlib';

/* ── PNG ─────────────────────────────────────────────────────────────────────────────────── */
export function pngDecode(buf) {
  let p = 8, w, h, ct, idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), data = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); ct = data[9]; if (data[8] !== 8 || data[12]) throw new Error('png: 8-bit non-interlaced only'); }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    p += 12 + len;
  }
  const bpp = { 6: 4, 2: 3, 0: 1, 4: 2 }[ct];
  const raw = zlib.inflateSync(Buffer.concat(idat)), stride = w * bpp, px = Buffer.alloc(stride * h);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = y * (stride + 1) + 1, dst = y * stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[dst + x - bpp] : 0, b = y ? px[dst - stride + x] : 0, c = (x >= bpp && y) ? px[dst - stride + x - bpp] : 0;
      let v = raw[src + x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += (pa <= pb && pa <= pc) ? a : pb <= pc ? b : c; }
      px[dst + x] = v & 255;
    }
  }
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    if (bpp >= 3) { rgba[i * 4] = px[i * bpp]; rgba[i * 4 + 1] = px[i * bpp + 1]; rgba[i * 4 + 2] = px[i * bpp + 2]; rgba[i * 4 + 3] = bpp === 4 ? px[i * bpp + 3] : 255; }
    else { rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = px[i * bpp]; rgba[i * 4 + 3] = 255; }
  }
  return { w, h, rgba };
}
export function pngEncode(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  const chunk = (type, data) => {
    const t = Buffer.from(type, 'ascii'), len = Buffer.alloc(4), crc = Buffer.alloc(4);
    len.writeUInt32BE(data.length); crc.writeUInt32BE(zlib.crc32(Buffer.concat([t, data])) >>> 0);
    return Buffer.concat([len, t, data, crc]);
  };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 6 })), chunk('IEND', Buffer.alloc(0))]);
}
export function pixelDiff(a, b) {
  const w = Math.max(a.w, b.w), h = Math.max(a.h, b.h), cw = Math.min(a.w, b.w), ch = Math.min(a.h, b.h);
  const out = Buffer.alloc(w * h * 4); let diff = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const o = (y * w + x) * 4;
    if (x >= cw || y >= ch) { out[o] = 255; out[o + 1] = 0; out[o + 2] = 255; out[o + 3] = 255; diff++; continue; }
    const ia = (y * a.w + x) * 4, ib = (y * b.w + x) * 4;
    const d = Math.max(Math.abs(a.rgba[ia] - b.rgba[ib]), Math.abs(a.rgba[ia + 1] - b.rgba[ib + 1]), Math.abs(a.rgba[ia + 2] - b.rgba[ib + 2]));
    if (d > 24) { out[o] = 230; out[o + 1] = 30; out[o + 2] = 30; out[o + 3] = 255; diff++; }
    else { const g = 200 + ((a.rgba[ia] + a.rgba[ia + 1] + a.rgba[ia + 2]) / 3) * 0.2; out[o] = out[o + 1] = out[o + 2] = g; out[o + 3] = 255; }
  }
  return { png: pngEncode(w, h, out), pct: +(100 * diff / (w * h)).toFixed(2), sizeA: [a.w, a.h], sizeB: [b.w, b.h] };
}

export const TEXTS = `(() => {
  const out = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vis = (el) => { for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    if ((cs.clip && cs.clip !== 'auto') || (cs.clipPath && cs.clipPath.startsWith('inset(50%'))) return false;
    if (cs.overflow === 'hidden') { const r = e.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) return false; } } return true; };
  let n;
  while ((n = w.nextNode())) {
    const t = n.textContent.replace(/\\s+/g, ' ').trim(); const el = n.parentElement;
    if (!t || !el || /^(SCRIPT|STYLE|NOSCRIPT|OPTION)$/.test(el.tagName) || !vis(el)) continue;
    const r = document.createRange(); r.selectNodeContents(n); const b = r.getBoundingClientRect();
    if (b.width <= 1 || b.height <= 1) continue;
    const cs = getComputedStyle(el);
    out.push({ t, x: Math.round(b.x + scrollX), y: Math.round(b.y + scrollY), w: Math.round(b.width), fs: cs.fontSize, fw: cs.fontWeight, c: cs.color });
  }
  document.querySelectorAll('input,textarea,select').forEach(el => {
    if (!vis(el)) return; const b = el.getBoundingClientRect(); if (b.width <= 1) return;
    const t = el.tagName === 'SELECT' ? (el.selectedOptions[0] || {}).textContent : (el.value || el.placeholder);
    if (t && t.trim()) out.push({ t: t.trim(), x: Math.round(b.x + scrollX), y: Math.round(b.y + scrollY), w: Math.round(b.width), fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight, c: getComputedStyle(el).color, field: true });
  });
  return out;
})()`;

/* ── text comparison ─────────────────────────────────────────────────────────────────────── */
export const rgb = (c) => { const m = c.match(/[\d.]+/g) || []; const f = /^color\(srgb/.test(c) ? 255 : 1; return m.slice(0, 3).map(v => Math.round(v * f)).concat([m[3] == null ? 1 : +m[3]]); };
export const sameColor = (a, b, tol = 6) => { const x = rgb(a), y = rgb(b); return x.every((v, i) => Math.abs(v - y[i]) <= (i === 3 ? Math.max(0.01, tol / 120) : tol)); };
export function textDiff(A, B) {
  const used = new Set(), changed = [], missing = [];
  for (const a of A) {
    let best = -1, bd = Infinity;
    B.forEach((b, i) => { if (used.has(i) || b.t !== a.t) return; const d = Math.abs(b.y - a.y) + Math.abs(b.x - a.x); if (d < bd) { bd = d; best = i; } });
    if (best < 0) { missing.push(a); continue; }
    used.add(best); const b = B[best], what = [];
    if (a.fs !== b.fs) what.push(`size ${a.fs}→${b.fs}`);
    if (a.fw !== b.fw) what.push(`weight ${a.fw}→${b.fw}`);
    if (!sameColor(a.c, b.c)) what.push(`colour ${a.c}→${b.c}`);
    if (Math.abs(a.x - b.x) > 4 || Math.abs(a.y - b.y) > 4) what.push(`moved ${b.x - a.x >= 0 ? '+' : ''}${b.x - a.x},${b.y - a.y >= 0 ? '+' : ''}${b.y - a.y}`);
    if (Math.abs(a.w - b.w) > 4 && !what.some(s => s.startsWith('size'))) what.push(`width ${a.w}→${b.w}`);
    if (what.length) changed.push({ t: a.t, what });
  }
  const extra = B.filter((_, i) => !used.has(i));
  return { missing, extra, changed };
}

