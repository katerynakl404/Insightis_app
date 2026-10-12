/* ChatChart — a chart the assistant produced, and the clickable plate it is shown on in the thread
   (chat_page-charts-landing.html: ".cp-img-row" / ".cp-img-plate" + the preview panel's ".cp-fp-chart").

   The charts are the PNGs prod renders with matplotlib, redrawn as SVG from the same random data the
   thread shows: skyblue bars / a coral line, black axes and ticks, a white ground in BOTH themes —
   it is an image, not product UI, so its colours are the picture's own (raw, ik-allow-raw).

   h(IK.ChatChart, { kind: 'bar' | 'line', className })   the 400×250 SVG, scales to its box
     data: IK.CHART_BARS ([['A', 61] …]) · IK.CHART_LINE ([-0.234 …])
   h(IK.ChatImagePlates, { items: [{ file, kind }], onOpen(file) })
     a 5-column grid of 8:5 plates; each is a button (Enter / Space too) — the chart fills it, the file
     name sits on a frosted strip along the bottom. Hover: the card hover border + lift. */
(function () {
  'use strict';
  var IK = window.InsightisKit, R = window.React, h = IK.h;

  IK.CHART_BARS = [['A', 61], ['B', 24], ['C', 81], ['D', 70], ['E', 30]];
  IK.CHART_LINE = [-0.234, -0.468, 1.111, 1.878, 1.409, 1.951, 1.488, 1.022, 1.264, -0.649];
  var FONT = 'DejaVu Sans, Verdana, Arial, sans-serif';
  var AX = '#333', TITLE = '#1a1a1a', BG = '#ffffff', GRID = '#d9d9d9', BAR = '#87ceeb', LINE = '#ff7f50'; // ik-allow-raw

  function bar() {
    var W = 400, H = 250, L = 46, Rr = 386, T = 34, B = 206, pw = Rr - L, ph = B - T;
    var max = 100, ticks = [0, 20, 40, 60, 80, 100], data = IK.CHART_BARS, n = data.length, step = pw / n, bw = step * 0.55;
    function y(v) { return B - (v / max) * ph; }
    var s = '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + BG + '"/>';
    s += '<text x="' + ((L + Rr) / 2) + '" y="20" text-anchor="middle" font-size="13.5" fill="' + TITLE + '">Random Bar Chart</text>';
    ticks.forEach(function (t) {
      var yy = y(t).toFixed(1);
      s += '<line x1="' + (L - 4) + '" y1="' + yy + '" x2="' + L + '" y2="' + yy + '" stroke="' + AX + '" stroke-width="0.8"/><text x="' + (L - 7) + '" y="' + (y(t) + 3.4).toFixed(1) + '" text-anchor="end" font-size="10" fill="' + AX + '">' + t + '</text>';
    });
    for (var i = 0; i < n; i++) {
      var v = data[i][1], bx = L + step * i + (step - bw) / 2, by = y(v);
      s += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (B - by).toFixed(1) + '" fill="' + BAR + '"/><text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (B + 15) + '" text-anchor="middle" font-size="10.5" fill="' + AX + '">' + data[i][0] + '</text>';
    }
    s += '<rect x="' + L + '" y="' + T + '" width="' + pw + '" height="' + ph + '" fill="none" stroke="' + AX + '" stroke-width="0.9"/>';
    s += '<text x="' + ((L + Rr) / 2) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" fill="' + AX + '">Category</text>';
    s += '<text x="13" y="' + ((T + B) / 2) + '" text-anchor="middle" font-size="11" fill="' + AX + '" transform="rotate(-90 13 ' + ((T + B) / 2) + ')">Value</text>';
    return { inner: s, label: 'Random bar chart' };
  }

  function line() {
    var W = 400, H = 250, L = 54, Rr = 386, T = 34, B = 200, pw = Rr - L, ph = B - T;
    var min = -0.75, max = 2.1, yt = [-0.5, 0, 0.5, 1, 1.5, 2], xt = [2, 4, 6, 8, 10];
    function x(i) { return L + ((i - 1) / 9) * pw; }
    function y(v) { return B - ((v - min) / (max - min)) * ph; }
    var s = '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + BG + '"/>';
    s += '<text x="' + ((L + Rr) / 2) + '" y="20" text-anchor="middle" font-size="13.5" fill="' + TITLE + '">Random Line Chart</text>';
    yt.forEach(function (t) {
      var yy = y(t).toFixed(1);
      s += '<line x1="' + L + '" y1="' + yy + '" x2="' + Rr + '" y2="' + yy + '" stroke="' + GRID + '" stroke-width="0.7"/><line x1="' + (L - 4) + '" y1="' + yy + '" x2="' + L + '" y2="' + yy + '" stroke="' + AX + '" stroke-width="0.8"/><text x="' + (L - 7) + '" y="' + (y(t) + 3.4).toFixed(1) + '" text-anchor="end" font-size="10" fill="' + AX + '">' + t.toFixed(1) + '</text>';
    });
    xt.forEach(function (t) {
      var xx = x(t).toFixed(1);
      s += '<line x1="' + xx + '" y1="' + T + '" x2="' + xx + '" y2="' + B + '" stroke="' + GRID + '" stroke-width="0.7"/><line x1="' + xx + '" y1="' + B + '" x2="' + xx + '" y2="' + (B + 4) + '" stroke="' + AX + '" stroke-width="0.8"/><text x="' + xx + '" y="' + (B + 15) + '" text-anchor="middle" font-size="10.5" fill="' + AX + '">' + t + '</text>';
    });
    var pts = IK.CHART_LINE.map(function (v, i) { return { x: x(i + 1), y: y(v) }; });
    s += '<path d="' + pts.map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' ') + '" fill="none" stroke="' + LINE + '" stroke-width="1.5" stroke-linejoin="round"/>';
    pts.forEach(function (p) { s += '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="2.6" fill="' + LINE + '"/>'; });
    s += '<rect x="' + L + '" y="' + T + '" width="' + pw + '" height="' + ph + '" fill="none" stroke="' + AX + '" stroke-width="0.9"/>';
    s += '<text x="' + ((L + Rr) / 2) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" fill="' + AX + '">Index</text>';
    s += '<text x="13" y="' + ((T + B) / 2) + '" text-anchor="middle" font-size="11" fill="' + AX + '" transform="rotate(-90 13 ' + ((T + B) / 2) + ')">Cumulative Value</text>';
    return { inner: s, label: 'Random line chart' };
  }

  IK.ChatChart = function ChatChart(p) {
    var c = p.kind === 'line' ? line() : bar();
    return h('svg', {
      className: IK.cx('ik-chart', p.className), viewBox: '0 0 400 250', xmlns: 'http://www.w3.org/2000/svg',
      role: 'img', 'aria-label': c.label, fontFamily: FONT, dangerouslySetInnerHTML: { __html: c.inner }
    });
  };

  function Plate(p) {
    function open() { if (p.onOpen) p.onOpen(p.item.file); }
    return h('div', {
      className: 'ik-img-plate', role: 'button', tabIndex: 0, 'data-file': p.item.file, onClick: open,
      onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }
    },
      h('div', { className: 'ik-img-thumb' }, h(IK.ChatChart, { kind: p.item.kind })),
      h('div', { className: 'ik-img-cap' }, p.item.file));
  }

  IK.ChatImagePlates = function ChatImagePlates(p) {
    return h('div', { className: 'ik-img-row' },
      (p.items || []).map(function (it) { return h(Plate, { key: it.file, item: it, onOpen: p.onOpen }); }));
  };
})();
