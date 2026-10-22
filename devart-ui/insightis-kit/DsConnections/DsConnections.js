/* DsConnections — the saved connections on the Connections page (My Connections tab). Port of
   dsRenderConnectedList() / dsConnRowHtml() in pages/approved/data-sources_connections-landing.html;
   locked rules 6 + "My Connections table" + "Mobile layout" in
   page-changes/data-sources_connections-landing.md.

     ≥ 768px  DevartUI Table, layout fixed, 5 columns — Connection name 26% · Data Source 22% ·
              Metrics 18% ("12 metrics" / "—" — in place of Description, user 2026-10-19) ·
              Last check 26% (IK.DsLastCheck) · Actions 8%
              (TableActionsCell: the ⋮ menu, revealed on row hover / focus / while open).
              Rows are interactive (open Connection details, IK.ConnectionDetails); the open one is selected.
     < 768px  a card stack: the connection label · logo + connector on one line, the metric count
              (12px), the Last check pill; ⋮ pinned top-right, always visible. Lifts on hover
              (pointer devices only).
   No status column and no enable switch (rule 6): a listed connection is connected.

   The ⋮ menu (IK.DsConnectionMenu): Edit · Test Connection · Add Metric (onAddMetric) — Share via Workspace
   (onAddToWorkspace) — Remove from Workspace (onRemoveHere, a workspace page) · Disconnect (danger). On Free, Edit
   and Test Connection are locked (IK.Locked → the 'connection-edit' / 'connection-test' upgrade popover, padlock
   trailing); Disconnect never is — removing what you already have is not a paid feature.

   h(IK.DsConnections, {
     connections: [{ name: 'PostgreSQL', label: 'Production DB', desc, metrics, lastSync, status, error, busy }],
     selected: 'PostgreSQL',                // the row whose panel is open
     leaving: 'Stripe',                     // a row fading out after Disconnect
     loading: false,                        // skeleton table (3 ghost rows)
     onOpen, onEdit, onTest, onDisconnect, onDetails, onAddMetric,  // each (name)
     onAddToWorkspace, wsLocked,            // Share via Workspace in the ⋮ (locked while wsLocked — Free)
     metricsHref: function (c) → href,      // "12 metrics" links to Metrics with that connection chosen (IK.wsMetricsHref)
     layout: 'table' | 'cards',             // optional — default follows the viewport (< 768px = cards)
     locked                                 // optional — default IK.usePlan()[0] === 'free'
   })

   Shared workspaces — `variant` swaps the columns; the default list above is untouched:
     'workspace'  a workspace page, the Owner's view: the columns and cells of the list above — Metrics
                  ("12 metrics", + Add Metric where there are none), Last check (↻ Test Connection, the failed
                  check's Details) — and its ⋮, DsConnectionMenu, with Remove from Workspace as one more
                  action (onRemoveHere; user, 2026-10-22: "⋮ і клітинки як на власних сторінках"). The
                  handlers get the row's id. Without handlers: menu(c) alone.
     'shared'     a Member's view of a workspace: Connection name · Data Source · Workspace (IK.WsNames, each a
                  link) · Metrics · Last check; no Actions column at all (read-only = absent). noWs (the
                  workspace's own page): no Workspace column — it would repeat itself.
                  A row with `locked` (your plan) or `muted` (its owner's plan) reads as usual and opens; the
                  warning after its name (IK.WsUnavailableMark) says why.
     connections: [{ id, name, label, metrics: n | [], by, wsName, wsNames, links, locked, muted }]
     menu: function (c) → node              // the ⋮ for 'workspace' without handlers
     onEdit, onTest, onDetails, onDisconnect, onAddMetric, onAddToWorkspace, wsLocked, locked,
     onRemoveHere                           // 'workspace' with Data Sources' handlers — each (id)
     onOpen: function (c), selected: id     // a row opens IK.ConnectionDetails (shared: read-only)

   Shared rows in the default list (Data Sources): a connection with shared: { by, ws } and an id sits among the
   person's own; ownerMark → the people glyph after its name (IK.WsOwnerMark — who shared it and where, in its
   tooltip; user, 2026-10-20: Owner is the one way). Its Last check shows, no ⋮ — read-only, absent; one that
   can't be used carries the warning (IK.WsUnavailableMark). onOpen / selected take its id (the connector name can
   repeat one of the person's own). sharedWith: ['Sales', …] on one of the person's own = the workspaces it is in.
   Kept, unused by the pages since 2026-10-20: tag (the Shared tag, IK.SharedBadge), wsCol (a Workspaces column),
   ownerCol (an Owner column) — where an item is shared lives in its details panel.
   Below 768px both are the card stack: label · logo + connector, the caption, the metric count.
   IK.DsConnectionMenu { name, onEdit, onTest, onDisconnect, onAddMetric, locked, defaultOpen, onAddToWorkspace,
     wsLocked, onRemoveHere } — the ⋮ and its menu alone (DevartUI RowMenuButton).                         */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Metrics in place of Description (user, 2026-10-19 — it says what the connection brings; the
     description stays in the details panel) */
  var COLS = [
    { label: 'Connection name', w: '26%' },
    { label: 'Data Source', w: '22%' },
    { label: 'Metrics', w: '18%' },
    { label: 'Last check', w: '26%' },
    { label: 'Actions', w: '8%', end: true }
  ];
  /* shared workspaces: the Owner's list on a workspace page, and a Member's Shared list */
  var VARIANT_COLS = {
    /* the widths of the list above (COLS) — the same table */
    workspace: [
      { key: 'name', label: 'Connection name', w: '26%' },
      { key: 'source', label: 'Data Source', w: '22%' },
      { key: 'metrics', label: 'Metrics', w: '18%' },
      { key: 'check', label: 'Last check', w: '26%' },
      { key: 'menu', label: 'Actions', w: '8%', end: true }
    ],
    shared: [
      { key: 'name', label: 'Connection name', w: '26%' },
      { key: 'source', label: 'Data Source', w: '18%' },
      { key: 'by', label: 'Workspace', w: '22%' },
      { key: 'metrics', label: 'Metrics', w: '14%' },
      { key: 'check', label: 'Last check', w: '20%' }
    ]
  };
  /* a workspace's connection carries no check time of its own in the sample: an hour and a half ago */
  var LAST_CHECK_FALLBACK = Date.now() - 95 * 60e3;
  /* none: a quiet dash, as every empty cell (user, 2026-10-19: "використовуємо прочерк") */
  function metricsText(n) { return !n ? h('span', { className: 'text-ink-inactive' }, '\u2014') : n === 1 ? '1 metric' : n + ' metrics'; }
  function count(c) { return Array.isArray(c.metrics) ? c.metrics.length : (c.metrics || 0); }
  /* Last check stays the check; a shared row that can't be used says so at its end (IK.WsUnavailableMark) */
  function status(c, lastCheck) { return lastCheck; }
  function unusable(c) { return !!(c.shared || c.by) && !!(c.muted || c.locked); }
  /* the row's mark: only the amber triangle, when a shared one can't be used — no description ⓘ, and a failed
     check stays in Last check (user, 2026-10-20) */
  function mark(c) {
    return unusable(c) ? h(IK.WsUnavailableMark, { name: c.label || c.name, by: (c.shared && c.shared.by) || c.by, locked: !c.muted, noun: 'connections' }) : null;
  }
  /* Last check; with the Owner's handlers, as on Data Sources: the re-test icon (not on Free) and the failed check's Details */
  function lastCheck(c, hd) {
    var k = c.id || c.name;
    return h(IK.DsLastCheck, { lastSync: c.lastSync || LAST_CHECK_FALLBACK, status: c.status || 'active', error: c.error, busy: hd ? c.busy : undefined,
      onDetails: hd && hd.onDetails ? function () { hd.onDetails(k); } : undefined,
      onTest: hd && !hd.locked && hd.onTest ? function () { hd.onTest(k); } : undefined });
  }
  function VariantTable(p) {
    var hd = p.handlers;
    var cols = VARIANT_COLS[p.variant].filter(function (c) { return !(p.noWs && c.key === 'by'); });
    return h(D.Table, { layout: 'fixed', 'aria-label': p['aria-label'] || 'Connections', wrapperClassName: 'ik-dscn-tbl' },
      h(D.TableHeader, null, h(D.TableRow, null, cols.map(function (c) {
        return h(D.TableHead, { key: c.key, style: { width: c.w }, className: c.end ? 'text-right' : null }, c.label);
      }))),
      h(D.TableBody, null, p.connections.map(function (c) {
        return h(D.TableRow, {
          key: c.id || c.name, 'data-name': c.name, 'data-interactive': p.onOpen ? '' : undefined,
          className: p.selected && p.selected === (c.id || c.name) ? 'is-selected' : undefined,
          onClick: p.onOpen ? function (e) { if (!fromMenu(e) && !(e.target.closest && e.target.closest('button'))) p.onOpen(c); } : undefined
        }, cols.map(function (col) {
          /* the tag right after the name: the tooltip's box (w-full) sits in one sized by the name */
          if (col.key === 'name') return h(D.TableCell, { key: 'n' }, h('div', { className: 'flex min-w-0 items-center gap-2' },
            h('span', { className: 'flex min-w-0' }, h(D.TruncatedTitleTooltip, { title: c.label || c.name, getTruncationTarget: function (t) { return t; } },
              h('span', { className: 'min-w-0 truncate font-medium text-ink-body' }, c.label || c.name))),
            p.tag ? h(IK.SharedBadge, { by: c.by || (c.shared && c.shared.by), ws: c.wsNames || (c.shared && c.shared.ws) || c.wsName }) : p.ownerMark ? h(IK.WsOwnerMark, { by: c.by || (c.shared && c.shared.by), ws: c.wsNames || (c.shared && c.shared.ws) || c.wsName }) : null,
            mark(c)));
          if (col.key === 'source') return h(D.TableCell, { key: 's' },
            h('div', { className: 'flex min-w-0 items-center gap-1.5' },
              h(IK.ConnectorMark, { connector: c.connector || c.name, size: 'xs', label: c.name + ' logo' }),
              h('span', { className: 'min-w-0 truncate text-ink-secondary' }, c.name)));
          if (col.key === 'by') return h(D.TableCell, { key: 'b' }, h(IK.WsNames, { names: c.wsNames || [c.wsName], links: c.links, className: 'text-sm text-ink-secondary' }));
          if (col.key === 'check') return h(D.TableCell, { key: 'c' }, status(c, lastCheck(c, hd)));
          if (col.key === 'metrics') return h(D.TableCell, { key: 'm', className: 'whitespace-nowrap' },
            hd && hd.onAddMetric && !count(c) ? addMetricCell(c, hd, c.id || c.name)
              : (p.metricsHref && count(c) ? metricsLink(c, p.metricsHref(c), metricsText(count(c))) : h('span', { className: 'tabular-nums text-ink-secondary' }, metricsText(count(c)))));
          return h(D.TableActionsCell, { key: 'a', onClick: hd ? stop : undefined }, unusable(c) ? null
            : hd ? h(IK.DsConnectionMenu, Object.assign({ name: c.id || c.name }, hd)) : p.menu ? p.menu(c) : null);
        }));
      })));
  }
  function VariantCards(p) {
    return h('div', { className: 'ik-dscn-list', role: 'list' }, p.connections.map(function (c) {
      return h('div', { key: c.id || c.name, role: 'listitem', 'data-name': c.name, className: 'ik-dscn-row',
          onClick: p.onOpen ? function (e) { if (!fromMenu(e) && !(e.target.closest && e.target.closest('button'))) p.onOpen(c); } : undefined },
        h('div', { className: 'flex min-w-0 flex-1 flex-col gap-1' },
          h('div', { className: 'flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap' },
            h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, c.label || c.name),
            mark(c),
            h('span', { className: 'flex-none text-sm text-ink-inactive', 'aria-hidden': 'true' }, '·'),
            h('span', { className: 'flex min-w-0 items-center gap-1 overflow-hidden text-sm text-ink-secondary' },
              h(IK.ConnectorMark, { connector: c.connector || c.name, size: 'xs', label: c.name + ' logo', className: 'size-3.5' }),
              h('span', { className: 'truncate' }, c.name))),
          p.variant === 'shared' && !p.noWs ? h(IK.WsNames, { names: c.wsNames || [c.wsName], links: c.links, className: 'text-xs text-ink-secondary' }) : null,
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'tabular-nums' }, metricsText(count(c))),
          p.tag ? h('div', null, h(IK.SharedBadge, { by: c.by || (c.shared && c.shared.by), ws: c.wsNames || (c.shared && c.shared.ws) || c.wsName })) : null,
          h('div', { className: 'mt-0.5' }, status(c, lastCheck(c, p.handlers)))),
        unusable(c) ? null : p.handlers ? h('div', { className: 'ik-dscn-act', onClick: stop }, h(IK.DsConnectionMenu, Object.assign({ name: c.id || c.name }, p.handlers)))
          : p.menu ? h('div', { className: 'ik-dscn-act' }, p.menu(c)) : null);
    }));
  }

  /* The row menu — shared by the table, the card and any host that wants it. */
  IK.DsConnectionMenu = function DsConnectionMenu(p) {
    var name = p.name;
    function run(fn) { return function () { if (fn) fn(name); }; }
    /* DevartUI RowMenuButton, shown at rest (reveal: false) as the table and the cards show it */
    /* in groups (user, 2026-10-20: "покращи ієрархію"): the connection itself — Edit · Test Connection · Add Metric —
       then sharing, then Disconnect on its own */
    return h(D.RowMenuButton, { reveal: false, defaultOpen: p.defaultOpen, className: p.triggerClassName },
        h(IK.Locked, { feature: 'connection-edit', locked: p.locked },
          h(D.DropdownMenuItem, { onSelect: run(p.onEdit) }, h(IK.Icon, { name: 'rename', size: 16 }), 'Edit')),
        h(IK.Locked, { feature: 'connection-test', locked: p.locked },
          h(D.DropdownMenuItem, { onSelect: run(p.onTest) }, h(IK.Icon, { name: 'test-conn', size: 16 }), 'Test Connection')),
        p.onAddMetric ? h(IK.Locked, { feature: 'metrics', surface: 'modal' },
          h(D.DropdownMenuItem, { onSelect: run(p.onAddMetric) }, h(IK.Icon, { name: 'plus', size: 16 }), 'Add Metric')) : null,
        p.onAddToWorkspace ? h(D.DropdownMenuSeparator, null) : null,
        p.onAddToWorkspace ? h(IK.Locked, { feature: 'workspaces', locked: !!p.wsLocked, surface: 'modal', tip: 'Available on Pro' },
          h(D.DropdownMenuItem, { onSelect: run(p.onAddToWorkspace) }, h(IK.Icon, { name: 'ws-share', size: 16 }), 'Share via Workspace')) : null,
        h(D.DropdownMenuSeparator, null),
        /* on a workspace page, one more: out of this workspace (the connection stays) — before Disconnect, the lesser of the two */
        p.onRemoveHere ? h(D.DropdownMenuItem, { variant: 'danger', onSelect: run(p.onRemoveHere) }, h(IK.Icon, { name: 'ws-remove', size: 16 }), 'Remove from Workspace') : null,
        h(D.DropdownMenuItem, { variant: 'danger', onSelect: run(p.onDisconnect) }, h(IK.Icon, { name: 'disconnect', size: 16 }), 'Disconnect'));
  };

  /* the tag of a connection shared with the person — who and which workspace in its tooltip */
  function sharedTag(c) {
    return h(IK.SharedBadge, { by: c.shared.by, ws: c.wsNames ? IK.wsJoin(c.wsNames) : c.shared.ws });
  }
  function keyOf(c) { return c.shared ? c.id : c.name; }

  /* metricsHref(c) → the count is a link to Metrics with that connection chosen (a click never opens the row) */
  function metricsLink(c, href, text, cls) {
    var n = count(c);
    if (!n || !href) return text;
    /* DevartUI LinkButton — the product's link (user, 2026-10-20: "на них є ж компонент") */
    return h(D.LinkButton, { href: href, className: IK.cx('tabular-nums', cls), onClick: function (e) { e.stopPropagation(); } }, text);
  }
  function stop(e) { e.stopPropagation(); }
  /* + Add Metric where a connection has none (as the Workspaces list's "+ Add Connection"); locked on Free */
  function addMetricCell(c, hd, key) {
    return h(IK.Locked, { feature: 'metrics', surface: 'modal' },
      /* xs, as the AI connectivity list's CellAction and the Workspaces list's cells — a button, not a link
         (user, 2026-10-20: "чому ти змінив розмір і кнопку") */
      h(D.Button, { variant: 'primaryTertiary', size: 'xs', type: 'button', className: '-mx-2', leftSlot: h(IK.Icon, { name: 'plus', size: 14 }),
        onClick: function (e) { e.stopPropagation(); hd.onAddMetric(key != null ? key : c.name); } }, 'Add Metric'));
  }
  function fromMenu(e) { return e.target.closest && e.target.closest('[data-slot="table-actions-cell"],.ik-dscn-act,[role="menu"]'); }

  var WS_COLS = [
    /* Last check and Actions hold fixed things (the pill + re-test, the ⋮): fixed widths, so a wide screen opens no gap
       between them (user, 2026-10-20); the name takes what is left */
    { label: 'Connection name' },
    { label: 'Data Source', w: '14%' },
    { label: 'Workspaces', w: '18%' },
    { label: 'Metrics', w: '10%' },
    { label: 'Last check', w: '10.5rem' },
    { label: 'Actions', w: '5.5rem', end: true }
  ];
  /* Last check holds the pill AND the re-test icon beside it: 19% keeps '2 hours ago' whole at 1280px */
  var WS_OWNER_COLS = [
    { label: 'Connection name', w: '18%' },
    { label: 'Data Source', w: '15%' },
    { label: 'Owner', w: '13%' },
    { label: 'Workspaces', w: '16%' },
    { label: 'Metrics', w: '11%' },
    { label: 'Last check', w: '19%' },
    { label: 'Actions', w: '8%', end: true }
  ];
  function TableView(p) {
    var oc = !!p.wsCol, own = oc && !!p.ownerCol;
    return h(D.Table, { layout: 'fixed', 'aria-label': 'Connected data sources', wrapperClassName: 'ik-dscn-tbl' },
      h(D.TableHeader, null,
        h(D.TableRow, null, (own ? WS_OWNER_COLS : oc ? WS_COLS : COLS).map(function (c) {
          return h(D.TableHead, { key: c.label, style: { width: c.w }, className: c.end ? 'text-right' : null }, c.label);
        }))),
      h(D.TableBody, null, p.connections.map(function (c) {
        var k = keyOf(c), sh = !!c.shared, off = sh && (c.locked || c.muted), tag = sh && !!p.tag;
        return h(D.TableRow, {
          key: k, 'data-interactive': '', 'data-name': c.name,
          className: IK.cx(p.selected === k && 'is-selected', p.leaving === c.name && 'ik-dscn-leaving'),
          onClick: function (e) { if (!fromMenu(e) && p.onOpen) p.onOpen(k); }
        },
          h(D.TableCell, null, sh
            ? h('div', { className: 'flex min-w-0 items-center gap-2' },
                h('span', { className: 'min-w-0 truncate font-medium text-ink-body' }, c.label || c.name), tag ? sharedTag(c) : sh && p.ownerMark ? h(IK.WsOwnerMark, { by: c.shared.by, ws: c.wsNames || c.shared.ws }) : null,
                mark(c))
            : h('div', { className: 'flex min-w-0 items-center gap-2' }, h('span', { className: 'min-w-0 truncate font-medium text-ink-body' }, c.label || c.name), mark(c))),
          h(D.TableCell, null,
            h('div', { className: 'flex min-w-0 items-center gap-1.5' },
              h(IK.ConnectorMark, { connector: c.connector || c.name, size: 'xs', label: c.name + ' logo' }),
              h('span', { className: 'min-w-0 truncate text-ink-secondary' }, c.name))),
          own ? h(D.TableCell, null,
            h(D.TruncatedTitleTooltip, { title: sh ? c.shared.by : 'You', getTruncationTarget: function (t) { return t; } },
              h('span', { className: 'block min-w-0 truncate text-ink-secondary' }, sh ? c.shared.by : 'You'))) : null,
          oc ? h(D.TableCell, null, (function () {
            var names = sh ? (c.wsNames || [c.shared.ws]) : (c.sharedWith || []);
            return names.length ? h(IK.WsNames, { names: names, links: c.links, className: 'text-ink-secondary' })
              : h('span', { className: 'text-ink-inactive' }, '—'); /* in no workspace: a quiet dash */
          })()) : null,
          h(D.TableCell, { className: 'whitespace-nowrap tabular-nums text-ink-secondary' },
            !sh && !count(c) && p.handlers.onAddMetric ? addMetricCell(c, p.handlers) : p.metricsHref ? metricsLink(c, p.metricsHref(c), metricsText(count(c))) : metricsText(count(c))),
          h(D.TableCell, null,
            status(c, h(IK.DsLastCheck, { lastSync: c.lastSync, status: c.status, error: c.error, busy: c.busy, onDetails: function () { if (p.onDetails) p.onDetails(c.name); },
              /* the re-test icon on one's own rows; not on a shared one (no menu either) nor on Free */
              onTest: sh || p.handlers.locked || !p.handlers.onTest ? undefined : function () { p.handlers.onTest(c.name); } }))),
          h(D.TableActionsCell, { onClick: stop }, sh ? null :
            h(IK.DsConnectionMenu, Object.assign({ name: c.name }, p.handlers))));
      })));
  }

  function CardView(p) {
    return h('div', { className: 'ik-dscn-list', role: 'list' }, p.connections.map(function (c) {
      var k = keyOf(c), sh = !!c.shared;
      return h('div', {
        key: k, role: 'listitem', 'data-name': c.name,
        className: IK.cx('ik-dscn-row', p.selected === k && 'is-selected', p.leaving === c.name && 'ik-dscn-leaving'),
        onClick: function (e) { if (!fromMenu(e) && p.onOpen) p.onOpen(k); }
      },
        h('div', { className: 'flex min-w-0 flex-1 flex-col gap-1' },
          h('div', { className: 'flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap' },
            h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, c.label || c.name),
            /* Owner: the people glyph after a shared one's name, as in the table (user, 2026-10-20) */
            sh && p.ownerMark ? h(IK.WsOwnerMark, { by: c.shared.by, ws: c.wsNames || c.shared.ws }) : null,
            mark(c),
            h('span', { className: 'flex-none text-sm text-ink-inactive', 'aria-hidden': 'true' }, '·'),
            h('span', { className: 'flex flex-none items-center gap-1 overflow-hidden text-sm text-ink-secondary' },
              h(IK.ConnectorMark, { connector: c.connector || c.name, size: 'xs', label: c.name + ' logo', className: 'size-3.5' }),
              c.name)),
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'tabular-nums' }, metricsText(count(c))),
          /* the workspaces on a phone too — where one's own is shared, where a shared one comes from (the table's
             Workspaces column; user, 2026-10-19: the phone lost it) */
          p.wsCol && (sh ? (c.wsNames || [c.shared.ws]) : (c.sharedWith || [])).length ? h(IK.WsNames, { names: sh ? (c.wsNames || [c.shared.ws]) : c.sharedWith, links: c.links, className: 'text-xs text-ink-secondary' }) : null,
          /* Tabs / no owner glyph: the shared tag on the card, as before (Owner has its glyph by the name) */
          sh && !p.ownerMark ? h('div', null, sharedTag(c)) : null,
          h('div', { className: 'mt-0.5' },
            status(c, h(IK.DsLastCheck, { lastSync: c.lastSync, status: c.status, error: c.error, busy: c.busy, onDetails: function () { if (p.onDetails) p.onDetails(c.name); },
              /* the re-test icon on one's own rows; not on a shared one (no menu either) nor on Free */
              onTest: sh || p.handlers.locked || !p.handlers.onTest ? undefined : function () { p.handlers.onTest(c.name); } })))),
        sh ? null : h('div', { className: 'ik-dscn-act', onClick: stop },
          h(IK.DsConnectionMenu, Object.assign({ name: c.name }, p.handlers))));
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
    if (VARIANT_COLS[p.variant]) {
      var v = Object.assign({}, p, { connections: p.connections || [] });
      if (p.variant === 'workspace' && p.onEdit) v.handlers = { onEdit: p.onEdit, onTest: p.onTest, onDetails: p.onDetails, onDisconnect: p.onDisconnect,
        locked: p.locked != null ? p.locked : IK.getPlan() === 'free', onAddToWorkspace: p.onAddToWorkspace, wsLocked: p.wsLocked, onAddMetric: p.onAddMetric, onRemoveHere: p.onRemoveHere };
      return phone ? h(VariantCards, v) : h(VariantTable, v);
    }
    var handlers = { onEdit: p.onEdit, onTest: p.onTest, onDisconnect: p.onDisconnect, locked: p.locked != null ? p.locked : IK.getPlan() === 'free',
                     onAddToWorkspace: p.onAddToWorkspace, wsLocked: p.wsLocked, onAddMetric: p.onAddMetric };
    var q = Object.assign({}, p, { connections: p.connections || [], handlers: handlers });
    return phone ? h(CardView, q) : h(TableView, q);
  };
})();
