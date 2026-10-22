/* StatusMark — everything about an item said once beside its name, as the AI connectivity lists do (user, 2026-10-20:
   "подивись як тут реалізований дескріпшн в поповері інфоіконки + ерор чи ворнінг"; a kit component of its own since
   2026-10-22). One glyph, the worst wins: ⓘ when there is only a description, the amber triangle for a warning, the
   red cross for an error; nothing when there is neither. Hover (after 300ms) or focus opens a DevartUI Popover:
   Description (five lines), a rule, then Problem / Problems (N) — each a glyph and a sentence in its tone — and the way
   back under them (action). A bare glyph, not a button box; opening moves no focus; a click never reaches the row.

   h(IK.StatusMark, { name, description, problems: [{ kind: 'error' | 'warning' | 'info', text }], action, defaultOpen })
     name      what it is about, for the screen reader ("What is wrong with Campaigns HubSpot")
     action    a node under the problems (Ask Owner to Renew …)
   IK.statusTone[kind] → { ink, icon }   the tones, for a page's own glyph in the same colour (IK.WsUnavailableMark) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'rm-info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'rm-error': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'
  });
  var TONE = IK.statusTone = {
    error: { ink: 'text-fb-red-text', icon: 'rm-error' },
    warning: { ink: 'text-fb-attention', icon: 'warning' },
    info: { ink: 'text-fb-info', icon: 'rm-info' }
  };

  function StatusLine(p) {
    var t = TONE[p.kind] || TONE.info;
    return h('span', { className: 'flex items-start gap-2' },
      h('span', { className: IK.cx('flex h-5 flex-none items-center', t.ink) }, h(IK.Icon, { name: t.icon, size: 14 })),
      h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'primary', className: 'text-pretty' }, p.children));
  }

  IK.StatusMark = function StatusMark(p) {
    var os = R.useState(!!p.defaultOpen), open = os[0], setOpen = os[1];
    var t = R.useRef({});
    var problems = p.problems || [], desc = p.description;
    if (!problems.length && !desc) return null;
    function show() { clearTimeout(t.current.c); if (!open) t.current.o = setTimeout(function () { setOpen(true); }, 300); }
    function hide() { clearTimeout(t.current.o); t.current.c = setTimeout(function () { setOpen(false); }, 150); }
    function stop(e) { e.stopPropagation(); }
    var worst = problems.some(function (x) { return x.kind === 'error'; }) ? 'error' : problems.some(function (x) { return x.kind === 'warning'; }) ? 'warning' : problems.length ? 'info' : null;
    var label = function (text) { return h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary' }, text); };
    return h(D.Popover, { open: open, onOpenChange: setOpen },
      h(D.PopoverTrigger, { asChild: true },
        h('button', { type: 'button', 'aria-label': worst ? 'What is wrong with ' + (p.name || 'it') : 'About ' + (p.name || 'it'),
          className: IK.cx('inline-flex flex-none cursor-pointer rounded-sm border-0 bg-transparent p-0 align-middle', worst ? TONE[worst].ink : 'text-ink-secondary', D.focusRing),
          onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide, onClick: stop },
          h(IK.Icon, { name: worst ? TONE[worst].icon : 'rm-info', size: 14 }))),
      h(D.PopoverContent, { align: 'start', className: 'w-80',
        onOpenAutoFocus: function (e) { e.preventDefault(); }, onCloseAutoFocus: function (e) { e.preventDefault(); },
        onMouseEnter: show, onMouseLeave: hide, onClick: stop },
        h('div', { className: 'flex flex-col gap-3' },
          desc ? h('div', { className: 'flex flex-col gap-1' }, label('Description'),
            h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'primary', className: 'ik-statusmark-desc m-0 break-words' }, desc)) : null,
          desc && problems.length ? h(D.Separator, null) : null,
          problems.length ? h('div', { className: 'flex flex-col gap-2' }, label(problems.length === 1 ? 'Problem' : 'Problems (' + problems.length + ')'),
            problems.map(function (x) { return h(StatusLine, { key: x.text, kind: x.kind }, x.text); })) : null,
          p.action ? h('div', { className: 'flex' }, p.action) : null)));
  };
})();
