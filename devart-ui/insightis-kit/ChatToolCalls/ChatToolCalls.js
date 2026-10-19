/* ChatToolCalls — the "Tool calls" disclosure inside an answer (kit-theme.css "Tool-calls accordion",
   Minimal — the only concept left: no plate, a quiet Text/Secondary head with its chevron BESIDE
   the label, pointing right when closed and down when open).

     head     wrench · "Tool calls" · › — hover darkens text and glyphs only (no fill)
     rows     one per call, joined by a vertical spine: status (green check / red alert, on a card
              disc that masks the spine) · monospace name + its operation in Text/Secondary · ›
              Each row is itself a disclosure → Arguments and Output, each a D.CodeBlock with a
              header: Arguments line-numbered, Output wrapped under Badge Done / Error and tinted
              red on error (variant "error"). Copy is the block's own.

   h(IK.ChatToolCalls, {
     defaultOpen: false,
     calls: [{ name: 'Jira_Test_Connection', op: 'Execute', status: 'ok' | 'error',
               args: ['{', '  "query": "…"', '}'],        // lines (or one string, split on \n)
               output: 'Returned 5 rows.', defaultOpen: false }]
   })

   IK.ChatCodeRun — the same disclosure for a code run (".cp-code" in chat_page-charts-landing): the
   task's title (a red alert glyph before it when the run failed) and the › chevron beside it; open,
   two D.CodeBlocks — the source (header: Python mark + "Python"; line-numbered, syntax colours,
   scrolls past 14rem) and its Output (header: "Output" + Badge Done / Error; wrapped, scrolls past
   12rem, variant "error" on a failed run).
   h(IK.ChatCodeRun, { title, status: 'ok' | 'error', lang: 'Python', code: '…\n…', output: '…',
                       defaultOpen: false })
   IK.highlightPython(line) → nodes: keywords / strings / comments / numbers, coloured with DevartUI
   codeSyntaxVariants (the --code-* tokens); the tokenising is the kit's, the palette the system's. */
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

  /* The Output header: the label, then Done / Error. */
  function output(err) {
    return ['Output', h(D.Badge, { key: 'b', variant: err ? 'error' : 'green', size: 'sm' }, err ? 'Error' : 'Done')];
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
          h(D.CodeBlock, { code: argText, lineNumbers: true, header: 'Arguments', copyLabel: 'Copy arguments' }),
          h(D.CodeBlock, {
            code: String(c.output || ''), wrap: true, maxHeight: '12rem', variant: err ? 'error' : 'default',
            copyLabel: 'Copy output', header: output(err)
          }))));
  }

  /* ── Code run ─────────────────────────────────────────────────────────────────────────── */
  IK.defineIcons({
    /* The Python mark in its own two brand colours — a third-party logo. */
    'code-python': { fill: true, inner: '<path fill="#3776AB" d="M11.9 0C5.9 0 6.3 2.6 6.3 2.6l.01 2.7h5.7v.8H4.1S.3 5.7.3 11.8s3.3 5.9 3.3 5.9h2V15s-.1-3.3 3.2-3.3h5.6s3.1.05 3.1-3V3S23.3 0 11.9 0zM8.8 1.8c.56 0 1 .45 1 1s-.44 1-1 1-1-.45-1-1 .45-1 1-1z"/><path fill="#FFD43B" d="M12.1 24c6 0 5.6-2.6 5.6-2.6l-.01-2.7h-5.7v-.8h7.9s3.8.4 3.8-5.7-3.3-5.9-3.3-5.9h-2V9s.1 3.3-3.2 3.3H9.6s-3.1-.05-3.1 3v5.6S6 24 12.1 24zm3.1-1.8c-.56 0-1-.45-1-1s.44-1 1-1 1 .45 1 1-.45 1-1 1z"/>' } // ik-allow-raw
  });

  var TOKRE = /('[^']*'|"[^"]*")|(#[^\n]*)|(\b\d+\.?\d*\b)|\b(import|as|from|def|return|for|in|if|elif|else|while|with|print|True|False|None|and|or|not|lambda|class)\b/g;
  IK.highlightPython = function (line) {
    var out = [], last = 0, m, k = 0;
    TOKRE.lastIndex = 0;
    while ((m = TOKRE.exec(line))) {
      if (m.index > last) out.push(line.slice(last, m.index));
      var v = m[1] ? 'string' : m[2] ? 'comment' : m[3] ? 'number' : 'keyword';
      out.push(h('span', { key: k++, className: D.codeSyntaxVariants({ variant: v }) }, m[0]));
      last = m.index + m[0].length;
    }
    if (last < line.length) out.push(line.slice(last));
    return out.length ? out : ' ';
  };

  IK.ChatCodeRun = function ChatCodeRun(p) {
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    var err = p.status === 'error';
    var code = String(p.code || '');
    return h(D.Collapsible, { open: open, onOpenChange: setOpen, className: 'ik-code' },
      h(D.CollapsibleTrigger, { asChild: true },
        h('button', { type: 'button', className: IK.cx('ik-code-head', D.focusRing) },
          err ? h('span', { className: 'ik-code-status', 'aria-hidden': 'true' }, h(IK.Icon, { name: 'tc-error', size: 16 })) : null,
          h('span', { className: 'ik-code-title' }, p.title),
          h(IK.Icon, { name: 'tc-chevron', size: 16, className: 'ik-code-chev' }))),
      h(D.CollapsibleContent, null,
        h('div', { className: 'ik-code-panel' },
          h(D.CodeBlock, {
            code: code, lineNumbers: true, maxHeight: '14rem', copyLabel: 'Copy code',
            header: [h(IK.Icon, { key: 'i', name: 'code-python', size: 14 }), p.lang || 'Python']
          }, code.split('\n').map(function (l, i) {
            return h(R.Fragment, { key: i }, i ? '\n' : null, IK.highlightPython(l));
          })),
          h(D.CodeBlock, {
            code: String(p.output || ''), wrap: true, maxHeight: '12rem', variant: err ? 'error' : 'default',
            copyLabel: 'Copy output', header: output(err)
          }))));
  };

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
