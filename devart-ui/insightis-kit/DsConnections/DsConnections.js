/* DsConnections — the saved connections on the Connections page (My Connections tab). Port of
   dsRenderConnectedList() / dsConnRowHtml() in pages/approved/data-sources_connections-landing.html;
   locked rules 6 + "My Connections table" + "Mobile layout" in
   page-changes/data-sources_connections-landing.md.

     ≥ 768px  DevartUI Table, layout fixed, 5 columns — Connection name 22% · Data Source 18% ·
              Description 30% (one line, truncated) · Last check 22% (IK.DsLastCheck) · Actions 8%
              (TableActionsCell: the ⋮ menu, revealed on row hover / focus / while open).
              Rows are interactive (open the detail panel); the open one is selected.
     < 768px  a card stack: the connection label · logo + connector on one line, the description
              (12px), the Last check pill; ⋮ pinned top-right, always visible. Lifts on hover
              (pointer devices only).
   No status column and no enable switch (rule 6): a listed connection is connected.

   The ⋮ menu: Edit · Test Connection · Disconnect (danger). On Free, Edit and Test Connection are
   locked (IK.Locked → the 'connection-edit' / 'connection-test' upgrade popover, padlock trailing);
   Disconnect never is — removing what you already have is not a paid feature.

   h(IK.DsConnections, {
     connections: [{ name: 'PostgreSQL', label: 'Production DB', desc, lastSync, status, error, busy }],
     selected: 'PostgreSQL',                // the row whose panel is open
     leaving: 'Stripe',                     // a row fading out after Disconnect
     loading: false,                        // skeleton table (3 ghost rows)
     onOpen, onEdit, onTest, onDisconnect, onDetails,  // each (name)
     layout: 'table' | 'cards',             // optional — default follows the viewport (< 768px = cards)
     locked                                 // optional — default IK.usePlan()[0] === 'free'
   })
   IK.DsConnectionMenu { name, onEdit, onTest, onDisconnect, locked, defaultOpen, size: '2xs' | 'md' (cards: 36px / 16px) } — the ⋮ and its menu alone.                                                                                             */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'ds-kebab': { fill: true, inner: '<circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/>' }
  });

  var COLS = [
    { label: 'Connection name', w: '22%' },
    { label: 'Data Source', w: '18%' },
    { label: 'Description', w: '30%' },
    { label: 'Last check', w: '22%' },
    { label: 'Actions', w: '8%', end: true }
  ];

  /* The row menu — shared by the table, the card and any host that wants it. */
  IK.DsConnectionMenu = function DsConnectionMenu(p) {
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    var name = p.name;
    function run(fn) { return function () { if (fn) fn(name); }; }
    return h(D.DropdownMenu, { open: open, onOpenChange: setOpen, modal: false },
      h(IK.Tip, { tip: 'More actions' },
        h(D.DropdownMenuTrigger, { asChild: true },
          h(D.IconButton, { variant: 'tertiary', size: p.size || '2xs', 'aria-label': 'More actions', className: p.triggerClassName },
            h(IK.Icon, { name: 'ds-kebab', size: p.size === 'md' ? 16 : 14 })))),
      h(D.DropdownMenuContent, { side: 'bottom', align: 'end', sideOffset: 8, onClick: function (e) { e.stopPropagation(); } },
        h(IK.Locked, { feature: 'connection-edit', locked: p.locked },
          h(D.DropdownMenuItem, { onSelect: run(p.onEdit) }, h(IK.Icon, { name: 'rename', size: 16 }), 'Edit')),
        h(IK.Locked, { feature: 'connection-test', locked: p.locked },
          h(D.DropdownMenuItem, { onSelect: run(p.onTest) }, h(IK.Icon, { name: 'test-conn', size: 16 }), 'Test Connection')),
        h(D.DropdownMenuItem, { variant: 'danger', onSelect: run(p.onDisconnect) }, h(IK.Icon, { name: 'disconnect', size: 16 }), 'Disconnect')));
  };

  function stop(e) { e.stopPropagation(); }
  function fromMenu(e) { return e.target.closest && e.target.closest('[data-slot="table-actions-cell"],.ik-dscn-act,[role="menu"]'); }

  function TableView(p) {
    return h(D.Table, { layout: 'fixed', 'aria-label': 'Connected data sources', wrapperClassName: 'ik-dscn-tbl' },
      h(D.TableHeader, null,
        h(D.TableRow, null, COLS.map(function (c) {
          return h(D.TableHead, { key: c.label, style: { width: c.w }, className: c.end ? 'text-right' : null }, c.label);
        }))),
      h(D.TableBody, null, p.connections.map(function (c) {
        return h(D.TableRow, {
          key: c.name, 'data-interactive': '', 'data-name': c.name,
          className: IK.cx(p.selected === c.name && 'is-selected', p.leaving === c.name && 'ik-dscn-leaving'),
          onClick: function (e) { if (!fromMenu(e) && p.onOpen) p.onOpen(c.name); }
        },
          h(D.TableCell, null, h('span', { className: 'font-medium text-ink-body' }, c.label || c.name)),
          h(D.TableCell, null,
            h('div', { className: 'flex min-w-0 items-center gap-1.5' },
              h(D.ConnectorLogo, { connector: c.connector || c.name, size: 'xs', label: c.name + ' logo' }),
              h('span', { className: 'min-w-0 truncate text-ink-secondary' }, c.name))),
          h(D.TableCell, { className: 'text-ink-secondary' }, c.desc || ''),
          h(D.TableCell, null,
            h(IK.DsLastCheck, { lastSync: c.lastSync, status: c.status, error: c.error, busy: c.busy, onDetails: function () { if (p.onDetails) p.onDetails(c.name); } })),
          h(D.TableActionsCell, { onClick: stop },
            h(IK.DsConnectionMenu, Object.assign({ name: c.name }, p.handlers))));
      })));
  }

  function CardView(p) {
    return h('div', { className: 'ik-dscn-list', role: 'list' }, p.connections.map(function (c) {
      return h('div', {
        key: c.name, role: 'listitem', 'data-name': c.name,
        className: IK.cx('ik-dscn-row', p.selected === c.name && 'is-selected', p.leaving === c.name && 'ik-dscn-leaving'),
        onClick: function (e) { if (!fromMenu(e) && p.onOpen) p.onOpen(c.name); }
      },
        h('div', { className: 'flex min-w-0 flex-1 flex-col gap-1' },
          h('div', { className: 'flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap' },
            h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, c.label || c.name),
            h('span', { className: 'flex-none text-sm text-ink-inactive', 'aria-hidden': 'true' }, '·'),
            h('span', { className: 'flex flex-none items-center gap-1 overflow-hidden text-sm text-ink-secondary' },
              h(D.ConnectorLogo, { connector: c.connector || c.name, size: 'xs', label: c.name + ' logo', className: 'size-3.5' }),
              c.name)),
          c.desc ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, c.desc) : null,
          h('div', { className: 'mt-0.5' },
            h(IK.DsLastCheck, { lastSync: c.lastSync, status: c.status, error: c.error, busy: c.busy, onDetails: function () { if (p.onDetails) p.onDetails(c.name); } }))),
        h('div', { className: 'ik-dscn-act', onClick: stop },
          h(IK.DsConnectionMenu, Object.assign({ name: c.name, size: 'md' }, p.handlers))));
    }));
  }

  var SKEL = [
    ['8rem', '5rem', '85%', '4.5rem'],
    ['6.5rem', '6rem', '70%', '4rem'],
    ['7.5rem', '4.5rem', '78%', '5rem']
  ];
  /* Bar heights are the original's: 14px for the label, 13px for the rest. */
  function bar(w, ht, extra) { return h(D.Skeleton, { rounded: 'sm', className: IK.cx('block', extra), style: { width: w, height: ht } }); }
  function ghostCells(r) {
    return [
      bar(r[0], '.875rem'),
      h('div', { className: 'flex items-center gap-2' }, h(D.Skeleton, { rounded: 'sm', className: 'size-6 flex-none' }), bar(r[1], '.8125rem')),
      bar(r[2], '.8125rem'),
      h('div', { className: 'flex items-center gap-2' }, bar(r[3], '.8125rem'), h(D.Skeleton, { rounded: 'full', className: 'size-5 flex-none' })),
      h(D.Skeleton, { rounded: 'sm', className: 'ms-auto block size-5' })
    ];
  }
  /* Phone: the original's table drops its frame and header below 768px and its rows run on as
     plain lines of ghosts (cells at their content width, clipped at the edge) — reproduced. */
  IK.DsConnectionsSkeleton = function DsConnectionsSkeleton(p) {
    var narrow = D.useMaxWidth(768);
    var phone = p && p.layout ? p.layout === 'cards' : narrow;
    if (phone) return h('div', { className: 'ik-dscn-skel', 'aria-hidden': 'true' }, SKEL.map(function (r, i) {
      return h('div', { key: i, className: 'ik-dscn-skel-row' }, ghostCells(r).map(function (c, j) {
        return h('div', { key: j, className: 'ik-dscn-skel-cell' }, c);
      }));
    }));
    return h('div', { 'aria-hidden': 'true' },
      h(D.Table, { layout: 'fixed' },
        h(D.TableHeader, null, h(D.TableRow, null, COLS.map(function (c) {
          return h(D.TableHead, { key: c.label, style: { width: c.w } }, c.label);
        }))),
        h(D.TableBody, null, SKEL.map(function (r, i) {
          return h(D.TableRow, { key: i }, ghostCells(r).map(function (c, j) { return h(D.TableCell, { key: j }, c); }));
        }))));
  };

  IK.DsConnections = function DsConnections(p) {
    var narrow = D.useMaxWidth(768);
    var phone = p.layout ? p.layout === 'cards' : narrow;
    if (p.loading) return h(IK.DsConnectionsSkeleton, { layout: p.layout });
    var handlers = { onEdit: p.onEdit, onTest: p.onTest, onDisconnect: p.onDisconnect, locked: p.locked };
    var q = Object.assign({}, p, { connections: p.connections || [], handlers: handlers });
    return phone ? h(CardView, q) : h(TableView, q);
  };
})();
