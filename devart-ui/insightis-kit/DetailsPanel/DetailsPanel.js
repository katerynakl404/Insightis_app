/* DetailsPanel — one anatomy for every details side panel: a connection, a metric, a file (user,
   2026-10-20: "виглядає переускладнено — потрібно покращити ієрархію бокових панелей … уніфіковані з
   різними станами"; then "потрібна була варіативність + логіку екшенів не забувай"). Three levels:

     head     the panel's name · an optional control (the metric's Active switch) · Close
     hero     the item's mark, its name (+ a pencil to rename it when that is its own action), one meta
              line; what is wrong with it (the unavailable notice) right under the name
     body     its properties, in one of three layouts (to compare — review switch Layout):
                rows     label on the left (Body/14, secondary, 7rem), the value, the value's own action as
                         a link at the line's end
                stacked  label above the value (Body/12, secondary), the action under it
                cards    the properties and Access each a card with its title
     access   last: the workspaces it is in (IK.WsWorkspaceList — each its owner and members), or "Not
              shared yet", and the way to share it
     foot     the item's own actions only — destructive on the left, the main one on the right; nothing
              to do → no foot

   h(IK.DetailsPanel, {
     title, control, inline, layout: 'rows' | 'stacked' | 'cards',
     open, onOpenChange,                  // the Sheet (when not inline)
     mark, name, onRename, after, meta, notice, preview,
     rows: [{ label, value, action: { label, icon, onClick, locked, lockFeature }, hint }],   icon → a glyph after the value
     access: { items: [{ name, href, owner, members }], empty, action: node, note },
     foot: { start: node, end: node }
   })                                                                                              */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  /* an action with an icon is the glyph right after the value, its words in a tooltip (user, 2026-10-20: "чому не
     плюсом біля тексту") — as Last check's re-test; without one, a link */
  function link(a) {
    if (!a) return null;
    if (a.icon) {
      var ib = h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': a.label, onClick: function () { if (a.onClick && !a.locked) a.onClick(); } }, h(IK.Icon, { name: a.icon, size: 14 }));
      return a.lockFeature && a.locked ? h(IK.Locked, { feature: a.lockFeature, locked: true }, ib) : h(IK.Tip, { tip: a.label }, ib);
    }
    var b = h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); if (a.onClick && !a.locked) a.onClick(); } }, a.label);
    return h('span', { className: 'shrink-0 text-sm' },
      a.lockFeature ? h(IK.Locked, { feature: a.lockFeature, clickOnly: true, locked: !!a.locked }, b) : b);
  }
  function valueNode(p) {
    return typeof p.value === 'string' || typeof p.value === 'number'
      ? h(D.Typography, { element: 'span', textStyle: 'body14', textColor: p.muted ? 'secondary' : 'primary', className: 'min-w-0 break-words' }, p.value)
      : h('span', { className: 'min-w-0 text-sm' }, p.value);
  }
  function label(p, small) {
    return h('span', { className: IK.cx('flex items-center gap-1', !small && 'w-28 shrink-0') },
      h(D.Typography, { element: 'span', textStyle: small ? 'body12' : 'body14', textColor: 'secondary' }, p.label),
      p.hint ? IK.InfoHint({ text: p.hint }) : null);
  }
  function Row(p) {
    if (p.layout === 'stacked') return h('div', { className: 'flex min-w-0 flex-col gap-1' },
      label(p, true),
      h('div', { className: 'flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1' }, valueNode(p), link(p.action)));
    /* rows and cards: the label beside the value, the action at the line's end */
    return h('div', { className: 'flex min-w-0 items-start gap-3' },
      label(p, false),
      h('div', { className: 'flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1' },
        valueNode(p), p.action ? h('span', { className: p.action.icon ? 'flex' : 'ms-auto flex' }, link(p.action)) : null));
  }
  IK.DetailsRow = Row;

  var ROW_GAP = { rows: 'gap-3', cards: 'gap-3', stacked: 'gap-4' };
  function section(layout, title, body, rule) {
    if (layout === 'cards') return h(D.Card, { variant: 'outline', className: 'flex flex-col gap-3 p-4' },
      title ? h(D.Typography, { element: 'h3', textStyle: 'title14', textColor: 'primary', className: 'm-0' }, title) : null, body);
    return h('section', { className: IK.cx('flex flex-col gap-3', rule && 'border-t border-stroke pt-5') },
      title ? h(D.Typography, { element: 'h3', textStyle: 'title14', textColor: 'primary', className: 'm-0' }, title) : null, body);
  }

  function Body(p) {
    var a = p.access, layout = p.layout || 'rows';
    var rows = (p.rows || []).filter(Boolean);
    return h('div', { className: 'flex flex-col gap-5 px-6 py-5' },
      /* hero */
      h('div', { className: 'flex flex-col gap-3' },
        h('div', { className: 'flex min-w-0 items-center gap-3' },
          p.mark ? h('span', { className: 'flex size-8 shrink-0 items-center justify-center' }, p.mark) : null,
          h('div', { className: 'flex min-w-0 flex-col gap-0.5' },
            h('div', { className: 'flex min-w-0 items-center gap-1' },
              h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary', className: 'min-w-0 break-words' }, p.name),
              p.onRename ? h(IK.Tip, { tip: 'Rename' },
                h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Rename ' + p.name, onClick: p.onRename }, h(IK.Icon, { name: 'rename', size: 14 }))) : null,
              p.after || null),
            p.meta ? h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary', className: 'min-w-0 break-words' }, p.meta) : null)),
        p.notice || null),
      p.preview || null,
      rows.length ? section(layout, layout === 'cards' ? 'Details' : null,
        h('div', { className: IK.cx('flex flex-col', ROW_GAP[layout] || ROW_GAP.rows) }, rows.map(function (r, i) { return h(Row, Object.assign({ key: i, layout: layout }, r)); }))) : null,
      a ? section(layout, 'Access', h('div', { className: 'flex flex-col gap-3' },
          a.items && a.items.length ? h(IK.WsWorkspaceList, { items: a.items })
            : h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' }, a.empty || 'Not shared yet'),
          a.note ? h('span', { className: 'flex items-center gap-1' },
            h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'How it is shared'), IK.InfoHint({ text: a.note })) : null,
          a.action ? h('div', { className: 'flex' }, a.action) : null), true) : null);
  }

  function Head(p) {
    return h('div', { className: 'flex flex-none items-center gap-3 border-b border-stroke px-6 py-4' },
      p.inline ? h(D.Typography, { element: 'h2', textStyle: 'title16', textColor: 'primary', className: 'm-0 min-w-0 flex-1 truncate' }, p.title)
        : h(D.SheetTitle, { className: 'm-0 min-w-0 flex-1 truncate' }, p.title),
      p.control || null,
      h(IK.Tip, { tip: 'Close' },
        p.inline ? h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Close panel' }, h(IK.Icon, { name: 'x' }))
          : h(D.SheetClose, { asChild: true }, h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Close panel' }, h(IK.Icon, { name: 'x' })))));
  }
  function Foot(p) {
    var f = p.foot;
    if (!f || (!f.start && !f.end)) return null;
    return h('div', { className: 'flex flex-none flex-wrap items-center gap-2 border-t border-stroke px-6 py-4' },
      f.start ? h('div', { className: 'me-auto flex items-center gap-2' }, f.start) : null,
      f.end ? h('div', { className: 'ms-auto flex items-center gap-2' }, f.end) : null);
  }

  IK.DetailsPanel = function DetailsPanel(p) {
    var inner = [h(Head, Object.assign({ key: 'h' }, p)),
      h('div', { key: 'b', className: 'min-h-0 flex-1 overflow-y-auto scrollbar-thin' }, h(Body, p)),
      h(Foot, Object.assign({ key: 'f' }, p))];
    if (p.inline) return h(D.Card, { variant: 'outline', className: IK.cx('flex w-full flex-col overflow-hidden p-0', p.className), style: p.style, 'aria-label': p.title }, inner);
    return h(D.Sheet, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.SheetContent, { side: 'right', isCloseButtonVisible: false, className: 'flex flex-col gap-0 p-0', 'aria-describedby': undefined,
        onOpenAutoFocus: function (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.focus) e.currentTarget.focus(); } }, inner));
  };
})();
