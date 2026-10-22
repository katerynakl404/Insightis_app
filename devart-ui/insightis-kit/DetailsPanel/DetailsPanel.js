/* DetailsPanel — one anatomy for every details side panel: a connection, a metric, a file (user,
   2026-10-20: "виглядає переускладнено — потрібно покращити ієрархію бокових панелей … уніфіковані з
   різними станами"; then "потрібна була варіативність + логіку екшенів не забувай"). Three levels:

     head     the panel's name · an optional control (the metric's Active switch) · the item's actions when
              they sit on top (icons + ⋮, as the file preview's head — user, 2026-10-20: "екшени в панелі
              тримати зверху — як в файлі") · Close
     hero     the item's mark, its name, one meta
              line; a warning mark by the name when it can't be used (the why sits in Access)
     about    the description, full width under the hero — it can be long (five lines, then Show More — only when it runs past them) or
              absent (nothing at all) (user, 2026-10-20: "опис може бути довгим — або відсутній")
     body     its properties, in one of three layouts (to compare — review switch Layout):
                rows     label on the left (Body/14, secondary, 7rem), the value, the value's own action
                stacked  label above the value (Body/12, secondary), the action beside it
                cards    the properties and Access each a card with its title
              a property's own action (Add Metric, re-test) is the glyph right after its value
     access   last: the workspaces it is in (IK.WsWorkspaceList) and the way to share it; in none, the button alone —
              no "Not shared yet" above it (user, 2026-10-20: "сенс емпті стану?"); the empty line only when nothing
              can be done; how it is shared under the title
     foot     the item's own actions when they sit at the bottom — destructive on the left, the main one on
              the right; nothing to do → no foot

   h(IK.DetailsPanel, {
     title, control, actions: node (head), inline, layout: 'rows' | 'stacked' | 'cards',
     open, onOpenChange,                  // the Sheet (when not inline)
     mark, name, after, meta, notice, preview,
     description: { label, text }, foldDetails (a file: the preview takes the room, previewBanner a strip on top of it, the
     properties and Access folded under it in an Accordion "Details"),
     rows: [{ label, value, action: { label, icon, onClick, locked, lockFeature }, hint }],   icon → a glyph after the value
     access: { items: [{ name, href, owner, members }], empty, action: node, note: string | { label, text }, notice: node },
     extra: node (after Access), foot: { start: node, end: node } | { block: node }
   })                                                                                              */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* an action with an icon is the glyph right after the value, its words in a tooltip (user, 2026-10-20: "чому не
     плюсом біля тексту") — as Last check's re-test; without one, a link */
  function link(a) {
    if (!a) return null;
    if (a.icon) {
      var ib = h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': a.label, onClick: function () { if (a.onClick && !a.locked) a.onClick(); } }, h(IK.Icon, { name: a.icon, size: 14 }));
      /* locked: the glyph stays, the upgrade popover explains it — never a padlock in its place */
      return a.lockFeature && a.locked ? h(IK.Locked, { feature: a.lockFeature, locked: true, marker: 'none' }, ib) : h(IK.Tip, { tip: a.label }, ib);
    }
    var b = h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); if (a.onClick && !a.locked) a.onClick(); } }, a.label);
    return h('span', { className: 'shrink-0 text-sm' },
      a.lockFeature ? h(IK.Locked, { feature: a.lockFeature, clickOnly: true, locked: !!a.locked }, b) : b);
  }
  /* every value sits in the row's 14px — a LinkButton takes the size of its text, so a bare one would read 16px */
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
      h('div', { className: 'flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1' }, valueNode(p), link(p.action)));
    /* rows and cards: the label beside the value, the action right after it */
    return h('div', { className: 'flex min-w-0 items-start gap-3' },
      label(p, false),
      h('div', { className: 'flex min-w-0 flex-1 flex-wrap items-center gap-x-1 gap-y-1' },
        valueNode(p), p.action ? h('span', { className: p.action.icon ? 'flex' : 'ms-auto flex' }, link(p.action)) : null));
  }
  IK.DetailsRow = Row;

  /* the description: full width whatever the layout — a long one beside a 7rem label would be a narrow column */
  /* five lines, then Show More — the button only when the text really runs past them, measured, not guessed from its
     length (user, 2026-10-21: "кнопка мала бути тільки якщо більше 5ти рядків тексту"); re-measured as the panel resizes */
  function About(p) {
    var d = p.description, st = R.useState(false), open = st[0], setOpen = st[1];
    var os = R.useState(false), over = os[0], setOver = os[1], ref = R.useRef(null);
    var text = d && d.text;
    R.useLayoutEffect(function () {
      var el = ref.current;
      if (!el || open) return;
      function check() { setOver(el.scrollHeight > el.clientHeight + 1); }
      check();
      var ro = window.ResizeObserver ? new ResizeObserver(check) : null;
      if (ro) ro.observe(el);
      return function () { if (ro) ro.disconnect(); };
    }, [text, open]);
    if (!text) return null;
    var long = over || open;
    return h('div', { className: 'flex min-w-0 flex-col gap-1' },
      d.label ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, d.label) : null,
      h(D.Typography, { ref: ref, element: 'p', textStyle: 'body14', textColor: 'body', className: IK.cx('m-0 break-words', !open && 'line-clamp-5') }, text),
      long ? h('span', { className: 'flex text-sm' },
        h(D.LinkButton, { asChild: true }, h('button', { type: 'button', onClick: function () { setOpen(!open); } }, open ? 'Show Less' : 'Show More'))) : null);
  }

  var ROW_GAP = { rows: 'gap-3', cards: 'gap-3', stacked: 'gap-4' };
  function heading(title, note) {
    return h('div', { className: 'flex flex-col gap-0.5' },
      h(D.Typography, { element: 'h3', textStyle: 'title14', textColor: 'primary', className: 'm-0' }, title),
      /* how it is shared — under the title, the why in the info icon (user, 2026-10-20: "інфо іконці треба інше
         місце — наприклад під тайтлом") */
      note ? h('span', { className: 'flex items-center gap-1' },
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, note.label), note.text ? IK.InfoHint({ text: note.text }) : null) : null);
  }
  function section(layout, title, body, rule, note) {
    if (layout === 'cards') return h(D.Card, { variant: 'outline', className: 'flex flex-col gap-3 p-4' },
      title ? heading(title, note) : null, body);
    return h('section', { className: IK.cx('flex flex-col gap-3', rule && 'border-t border-stroke pt-5') },
      title ? heading(title, note) : null, body);
  }

  /* foldDetails — a file: the preview takes the panel; its name goes up into the head (as the file preview's), its
     details — the meta line, the properties, Access — fold into a DevartUI Accordion "Details" fixed under the head,
     closed (user, 2026-10-20: "у превью максимум місця … саме на превью — додаткову інфу колапсити" · "фіксованою
     панелькою під хедером" · "назву засунути вверх") */
  function DetailsBar(p, rows, access) {
    return h('div', { key: 'd', className: 'ik-dp-details flex-none border-b border-stroke' },
      h(D.Accordion, { type: 'single', collapsible: true },
        h(D.AccordionItem, { value: 'details', variant: 'standalone' },
          h(D.AccordionTrigger, null, 'Details'),
          h(D.AccordionContent, null,
            /* the properties as the other panels' rows (the meta line becomes Type · Size · Origin), Access under a rule */
            /* room under the last control before the bar's rule (user, 2026-10-20: "бракує відступу від кнопки") */
            h('div', { className: 'flex flex-col gap-5 pb-3' }, rows, access)))));
  }
  /* the preview as the file preview draws it: its strip (previewBanner) flush on top, full-bleed; the body with the
     preview's own 16px, nothing else in it (user, 2026-10-20: "алерт був до верху прикріплений, а превью на все боді") */
  function PreviewBody(p) {
    return h('div', { className: 'flex min-h-full flex-col px-6 py-4' }, p.preview);
  }
  function hero(p) {
    return h('div', { className: 'flex flex-col gap-3' },
      h('div', { className: 'flex min-w-0 items-center gap-3' },
        /* 40px — ConnectorMark md, the height of the name and its meta line together (user, 2026-10-20: "розмір лого
           виглядає незбалансованим до тексту"); a 32px slot clipped it */
        p.mark ? h('span', { className: 'flex size-10 shrink-0 items-center justify-center' }, p.mark) : null,
        h('div', { className: 'flex min-w-0 flex-col gap-0.5' },
          /* the name's mark 8px off it, as on every other name (user, 2026-10-21: "замалий відступ") */
          h('div', { className: 'flex min-w-0 items-center gap-2' },
            h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary', className: 'min-w-0 break-words' }, p.name),
            p.after || null),
          p.meta ? h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary', className: 'min-w-0 break-words' }, p.meta) : null)),
      p.notice || null);
  }

  function parts(p) {
    /* stacked by default — label above the value (user, 2026-10-21: "цей варіант панелі" — Stacked) */
    var a = p.access, layout = p.layout || 'stacked';
    var rows = (p.rows || []).filter(Boolean);
    var note = a && a.note ? (typeof a.note === 'string' ? { label: 'How it is shared', text: a.note } : a.note) : null;
    var rowsNode = rows.length ? section(layout, layout === 'cards' ? 'Details' : null,
      h('div', { className: IK.cx('flex flex-col', ROW_GAP[layout] || ROW_GAP.rows) }, rows.map(function (r, i) { return h(Row, Object.assign({ key: i, layout: layout }, r)); }))) : null;
    /* titled by what it lists — the workspaces (user, 2026-10-20: "може воркспейси?") */
    var accessNode = a ? section(layout, 'Workspaces', h('div', { className: 'flex flex-col gap-3' },
        a.notice || null,
        (a.items && a.items.length) || (a.names && a.names.length) ? h(IK.WsWorkspaceList, { items: a.items, names: a.names, links: a.links, onRemove: a.onRemove, blocks: true })
          /* empty: false — nothing under the heading when it is in none (the note above says all) */
          : a.action || a.empty === false ? null : h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' }, a.empty || 'Not shared yet'),
        a.action ? h('div', { className: 'flex' }, a.action) : null), true, note) : null;
    return { rows: rowsNode, access: accessNode };
  }
  function Body(p) {
    var q = parts(p), rowsNode = q.rows, accessNode = q.access;
    return h('div', { className: 'flex flex-col gap-5 px-6 py-5' },
      hero(p),
      h(About, { description: p.description }),
      p.preview || null,
      rowsNode,
      /* why it can't be used — the warning mark by the name, the way back in its popover (Ask to Renew / Upgrade) */
      accessNode,
      p.extra || null);
  }

  function Head(p) {
    return h('div', { className: 'flex flex-none items-center gap-3 border-b border-stroke px-6 py-4' },
      p.inline || p.bare ? h(D.Typography, { element: 'h2', textStyle: 'title16', textColor: 'primary', className: 'm-0 min-w-0 truncate' }, p.title)
        : h(D.SheetTitle, { className: 'm-0 min-w-0 truncate' }, p.title),
      h('span', { className: 'me-auto flex flex-none items-center' }, p.titleAfter || null),
      p.control || null,
      h('div', { className: 'flex flex-none items-center gap-0.5' },
        p.actions || null,
        h(IK.Tip, { tip: 'Close' },
          p.inline || p.bare ? h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Close panel', onClick: p.onClose }, h(IK.Icon, { name: 'x' }))
            : h(D.SheetClose, { asChild: true }, h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Close panel' }, h(IK.Icon, { name: 'x' }))))));
  }
  function Foot(p) {
    var f = p.foot;
    if (!f || (!f.start && !f.end && !f.block)) return null;
    /* block — one full-width piece pinned at the bottom (the library metric's Connect: its why + the button), so it
       stays put whatever the body holds (user, 2026-10-20: "чому алерт не фіксувати внизу, щоб не стрибав") */
    if (f.block) return h('div', { className: 'flex flex-none flex-col border-t border-stroke px-6 py-4' }, f.block);
    return h('div', { className: 'flex flex-none flex-wrap items-center gap-2 border-t border-stroke px-6 py-4' },
      f.start ? h('div', { className: 'me-auto flex items-center gap-2' }, f.start) : null,
      f.end ? h('div', { className: 'ms-auto flex items-center gap-2' }, f.end) : null);
  }

  IK.DetailsPanel = function DetailsPanel(p) {
    if (p.acts) {
      /* at the foot unless the page says otherwise (user, 2026-10-21: "екшени мали залишитись внизу"); a file keeps its
         icons on top, the preview wants the room */
      var placed = IK.detailsPlace(p.acts, p.actionsAt || (p.foldDetails ? 'kebab' : 'bottom'));
      p = Object.assign({}, p, placed.actions ? { actions: placed.actions } : {}, placed.foot && !p.foot ? { foot: placed.foot } : {});
    }
    /* folded, the facts are always compact rows — label beside value, whatever the Layout — and the bar grows
       with them, no scroll of its own (user, 2026-10-20: "займає купу місця і не зрозуміло чому") */
    var fold = !!p.foldDetails, q = fold ? parts(Object.assign({}, p, { layout: 'rows' })) : null;
    var inner = fold
      ? [h(Head, Object.assign({ key: 'h' }, p, { title: p.name, titleAfter: p.after })), DetailsBar(p, q.rows, q.access),
         p.previewBanner ? h(R.Fragment, { key: 'n' }, p.previewBanner) : null,
         h('div', { key: 'b', className: 'min-h-0 flex-1 overflow-y-auto scrollbar-thin' }, h(PreviewBody, p)),
         h(Foot, Object.assign({ key: 'f' }, p))]
      : [h(Head, Object.assign({ key: 'h' }, p)),
         h('div', { key: 'b', className: 'min-h-0 flex-1 overflow-y-auto scrollbar-thin' }, h(Body, p)),
         h(Foot, Object.assign({ key: 'f' }, p))];
    if (p.inline) return h(D.Card, { variant: 'outline', className: IK.cx('flex w-full flex-col gap-0 overflow-hidden p-0', p.className), style: p.style, 'aria-label': p.title }, inner);
    if (p.bare) return h('div', { className: 'flex min-h-0 w-full flex-1 flex-col', 'aria-label': p.title }, inner);
    return h(D.Sheet, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.SheetContent, { side: 'right', isCloseButtonVisible: false, className: IK.cx('ik-dp-sheet flex flex-col gap-0 p-0', p.sheetClassName), 'aria-describedby': undefined,
        onOpenAutoFocus: function (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.focus) e.currentTarget.focus(); } }, inner));
  };

  /* ── One model for the item's own actions ─────────────────────────────────────────────────────────────────
     acts: { main: [a], more: [a], danger: [a], mainVariant, note }, a = { label, icon, onClick, feature, locked, tip, short }
     top    the head: the main one first, then the rest, the destructive one last — a lone one its own red icon, a ⋮
            only for two or more; locked ones keep their glyph (the upgrade popover says why)
     bottom the foot: destructive on the left (or note), the rest, the main one on the right                        */
  function lockBtn(a, node) { return a.feature && a.locked ? h(IK.Locked, { feature: a.feature, locked: true, surface: 'modal' }, node) : node; }
  function actIcon(a) {
    var b = h(D.IconButton, { key: a.label, variant: a.variant || 'tertiary', size: 'xs', type: 'button', 'aria-label': a.label, onClick: a.locked ? undefined : a.onClick }, h(IK.Icon, { name: a.icon }));
    return a.feature && a.locked ? h(IK.Locked, { key: a.label, feature: a.feature, locked: true, marker: 'none' }, b) : h(IK.Tip, { key: a.label, tip: a.tip || a.label }, b);
  }
  function actBtn(variant, a, label) {
    return h(R.Fragment, { key: a.label }, lockBtn(a, h(D.Button, { variant: variant, size: 'sm', type: 'button', leftSlot: a.icon ? h(IK.Icon, { name: a.icon, size: 16 }) : undefined, onClick: a.onClick }, label || a.label)));
  }
  /* split — the general actions every item has (Edit, Duplicate, Delete / Disconnect) under a chevron in the head; what
     is particular to this item or this page (Remove from Workspace, Duplicate, Connect) at the foot; a file
     keeps its icons on top, the preview wants the room (user, 2026-10-20) */
  function chevronMenu(general, danger) {
    var items = general.map(function (a) {
      var it = h(D.DropdownMenuItem, { key: a.label, onSelect: a.locked ? undefined : a.onClick }, h(IK.Icon, { name: a.icon, size: 16 }), a.label);
      return a.feature && a.locked ? h(IK.Locked, { key: a.label, feature: a.feature, locked: true, surface: 'modal' }, it) : it;
    });
    if (general.length && danger.length) items.push(h(D.DropdownMenuSeparator, { key: 'sep' }));
    danger.forEach(function (a) { items.push(h(D.DropdownMenuItem, { key: a.label, variant: 'danger', onSelect: a.onClick }, h(IK.Icon, { name: a.icon, size: 16 }), a.label)); });
    return h(D.DropdownMenu, null,
      h(IK.Tip, { tip: 'Actions' },
        h(D.DropdownMenuTrigger, { asChild: true },
          h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Actions' }, h(IK.Icon, { name: 'chevron-down' })))),
      h(D.DropdownMenuContent, { align: 'end' }, items));
  }
  IK.detailsPlace = function (acts, at) {
    if (!acts) return {};
    at = at === true ? 'top' : at === false ? 'bottom' : at || 'split';
    var main = acts.main || [], more = acts.more || [], danger = acts.danger || [], specific = acts.specific || [];
    if (at === 'split') {
      var general = main.concat(more), n = general.length + danger.length;
      var mine = specific.filter(function (a) { return !a.danger; }), gone = specific.filter(function (a) { return a.danger; });
      return {
        /* a lone general action is its own icon — a chevron only for two or more */
        actions: !n ? null : n === 1 ? actIcon(general.length ? general[0] : Object.assign({ variant: 'destructiveTertiary' }, danger[0])) : chevronMenu(general, danger),
        foot: specific.length ? {
          start: gone.length ? h(IK.Fragment, null, gone.map(function (a) { return actBtn('destructiveOutline', a); })) : (acts.note || null),
          end: mine.length ? h(IK.Fragment, null, mine.map(function (a) { return actBtn(acts.mainVariant || 'primary', a, a.short); })) : null } : null
      };
    }
    /* kebab — a file: the main one (Download) its icon, the rest in a ⋮ — Add to Chat, then the destructive one after a
       rule; a lone one is its own icon (red if destructive), never a one-item ⋮ */
    if (at === 'kebab') {
      var rest = more.concat(specific.filter(function (a) { return !a.danger; })), bad = danger.concat(specific.filter(function (a) { return a.danger; }));
      var lone = rest.length + bad.length === 1;
      return { actions: h(IK.Fragment, null,
        main.map(actIcon),
        lone ? actIcon(rest.length ? rest[0] : Object.assign({ variant: 'destructiveTertiary' }, bad[0])) : null,
        !lone && rest.length + bad.length ? h(D.RowMenuButton, { reveal: false }, rest.map(function (a) {
          /* a locked one keeps its place and opens the upgrade, as in a row's ⋮ */
          var it = h(D.DropdownMenuItem, { key: a.label, onSelect: a.locked ? undefined : a.onClick }, h(IK.Icon, { name: a.icon, size: 16 }), a.label);
          return a.feature && a.locked ? h(IK.Locked, { key: a.label, feature: a.feature, locked: true, surface: 'modal' }, it) : it;
        }).concat(rest.length && bad.length ? [h(D.DropdownMenuSeparator, { key: 'sep' })] : [], bad.map(function (a) {
          return h(D.DropdownMenuItem, { key: a.label, variant: 'danger', onSelect: a.onClick }, h(IK.Icon, { name: a.icon, size: 16 }), a.label);
        }))) : null) };
    }
    /* top / bottom: what is particular joins the rest */
    main = main.concat(specific.filter(function (a) { return !a.danger; }));
    danger = danger.concat(specific.filter(function (a) { return a.danger; }));
    if (!main.length && !more.length && !danger.length) return {};
    if (at === 'top') return { actions: h(IK.Fragment, null,
      main.concat(more).map(actIcon),
      danger.length === 1 ? actIcon(Object.assign({ variant: 'destructiveTertiary' }, danger[0])) : null,
      danger.length > 1 ? h(D.RowMenuButton, { reveal: false }, danger.map(function (a) {
        return h(D.DropdownMenuItem, { key: a.label, variant: 'danger', onSelect: a.onClick }, h(IK.Icon, { name: a.icon, size: 16 }), a.label);
      })) : null) };
    return { foot: {
      start: danger.length ? h(IK.Fragment, null, danger.map(function (a) { return actBtn('destructiveOutline', a); })) : (acts.note || null),
      end: more.length || main.length ? h(IK.Fragment, null,
        more.map(function (a) { return actBtn('secondary', a); }),
        main.map(function (a) { return actBtn(acts.mainVariant || 'primary', a, a.short); })) : null } };
  };
  function act(label, icon, o) { return Object.assign({ label: label, icon: icon }, o || {}); }
  function call(fn, x) { return fn ? function () { fn(x); } : undefined; }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function shareBtn(label, locked, onClick) {
    var b = h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'ws-share', size: 16 }), onClick: onClick }, label);
    return h(IK.Locked, { feature: 'workspaces', surface: 'modal', tip: 'Available on Pro', locked: !!locked }, b);
  }

  /* the panels' content lives with each panel — IK.ConnectionDetails, IK.MetricDetails, IK.FileDetails, each in its own
     folder (2026-10-22: "зроби ConnectionDetails, MetricDetails, FileDetails … компонентами"); what they share: */
  IK.detailsKit = { act: act, call: call, plural: plural, shareBtn: shareBtn, lockBtn: lockBtn };

  /* a Sheet that keeps its last item while it slides out (as the product's panels) */
  IK.DetailsSheet = function DetailsSheet(p) {
    var last = R.useRef(null);
    if (p.item) last.current = p.item;
    var it = p.item || last.current;
    if (!it) return null;
    return h(IK.DetailsPanel, Object.assign({ open: !!p.item, onOpenChange: p.onOpenChange }, p.build(it)));
  };
})();
