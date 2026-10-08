/* ChatToolCalls — the "Tool calls" disclosure inside an answer (kit-theme.css "Tool-calls accordion",
   Minimal — the only concept left: no plate, a quiet Text/Secondary head with its chevron BESIDE
   the label, pointing right when closed and down when open).

     head     wrench · "Tool calls" · › — hover darkens text and glyphs only (no fill)
     rows     one per call, joined by a vertical spine: status (green check / red alert, on a card
              disc that masks the spine) · monospace name + its operation in Text/Secondary · ›
              Each row is itself a disclosure → Arguments (line-numbered JSON + Copy) and Output
              (Badge Done / Error + Copy; an error output sits on a red-tinted ground).
     Copy     IconButton tertiary xs, "Copy" → check + "Copied" for 1.4 s (IK.ChatCopyButton).

   h(IK.ChatToolCalls, {
     defaultOpen: false,
     calls: [{ name: 'Jira_Test_Connection', op: 'Execute', status: 'ok' | 'error',
               args: ['{', '  "query": "…"', '}'],        // lines (or one string, split on \n)
               output: 'Returned 5 rows.', defaultOpen: false }]
   }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from the original .tc markup. */
  IK.defineIcons({
    'tc-wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    'tc-chevron': '<polyline points="6 9 12 15 18 9"/>',
    'tc-error': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    'tc-ok': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
  });

  function lines(v) { return Array.isArray(v) ? v : String(v || '').split('\n'); }

  function Card(p) {
    return h('div', { className: 'ik-tc-card' },
      h('div', { className: IK.cx('ik-tc-card-head', p.spread && 'justify-between') },
        h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'primary' }, p.title),
        p.badge || null,
        h(IK.ChatCopyButton, { size: 'xs', label: p.copyLabel, getText: p.getText, className: p.spread ? undefined : 'ms-auto' })),
      p.children);
  }

  function Row(p) {
    var c = p.call;
    var err = c.status === 'error';
    var o = R.useState(!!c.defaultOpen), open = o[0], setOpen = o[1];
    var argText = lines(c.args).join('\n');
    return h(D.Collapsible, { open: open, onOpenChange: setOpen, className: IK.cx('ik-tc-row', err ? 'is-error' : 'is-ok') },
      h(D.CollapsibleTrigger, { asChild: true },
        h('button', { type: 'button', className: IK.cx('ik-tc-row-head', D.focusRing) },
          h('span', { className: 'ik-tc-status', 'aria-hidden': 'true' }, h(IK.Icon, { name: err ? 'tc-error' : 'tc-ok', size: 16 })),
          h('span', { className: 'ik-tc-name' }, c.name, ' ', h('span', { className: 'ik-tc-op' }, c.op)),
          h('span', { className: 'ik-tc-row-chev', 'aria-hidden': 'true' }, h(IK.Icon, { name: 'tc-chevron', size: 12 })))),
      h(D.CollapsibleContent, null,
        h('div', { className: 'ik-tc-row-panel' },
          h(Card, { title: 'Arguments', spread: true, copyLabel: 'Copy arguments', getText: function () { return argText; } },
            h('div', { className: 'ik-tc-code' }, lines(c.args).map(function (l, i) { return h('span', { key: i, className: 'ik-tc-line' }, l); }))),
          h(Card, {
            title: 'Output', copyLabel: 'Copy output', getText: function () { return c.output; },
            badge: h(D.Badge, { variant: err ? 'error' : 'green', size: 'sm' }, err ? 'Error' : 'Done')
          }, h('div', { className: 'ik-tc-out' }, c.output)))));
  }

  IK.ChatToolCalls = function ChatToolCalls(p) {
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    return h(D.Collapsible, { open: open, onOpenChange: setOpen, className: 'ik-tc' },
      h(D.CollapsibleTrigger, { asChild: true },
        h('button', { type: 'button', className: IK.cx('ik-tc-head', D.focusRing) },
          h(IK.Icon, { name: 'tc-wrench', size: 16 }),
          h('span', { className: 'ik-tc-label' }, p.label || 'Tool calls'),
          h(IK.Icon, { name: 'tc-chevron', size: 16, className: 'ik-tc-chev' }))),
      h(D.CollapsibleContent, null,
        h('div', { className: 'ik-tc-panel' }, (p.calls || []).map(function (c, i) { return h(Row, { key: i, call: c }); }))));
  };
})();
