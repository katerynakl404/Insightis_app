/* MxMetricsTable — the Metrics filled-state library: one card per data source (".mx-tbl
   .mx-tbl-sections" in the original; page-changes/metrics-landing.md → "Filled state — sectioned
   table" + "Mobile layout — Metrics table (≤ 767 px)"). Each card is a DevartUI Table (layout
   fixed, its own frame), all cards on one column grid, 16px apart, no column header.

   Rows — one flat, ordered list, exactly like the original <tbody> (a row added to the library
   is appended to the end, a duplicate goes right under its source):
     { kind: 'group', prov, name, connector }          header band: chevron · logo · name · Add Metric
     { kind: 'metric', id, prov, name, alias, summary, custom, active, conn }
                                                       switch · name · alias · definition · badge · ⋮
     { kind: 'conn', id, name }                        connection sub-header: link · name · Add Metric
     { kind: 'empty', prov, name }                     "No built-in metrics for <name>. Create a custom metric →"
   A new card starts at every group row.

   Filtering lives here too, because which rows survive a filter is a property of this table:
   IK.mxFilterMetrics(rows, { query, type: 'all'|'builtin'|'custom'|'shared', activeOnly, applied })
     → { hidden: { rowKey: true }, any: bool }   (rowKey = IK.mxRowKey(row))
   Same rules as the original's mxC3Filter: a metric shows when its NAME contains the query and it
   matches the type and the active switch; a group header shows when any of its metrics does; a
   connection sub-header shows while anything after it (up to the next sub-header or group) is
   still showing — the gap to the next card counts, so it only goes in the last card; the
   "no built-in metrics" row is never filtered. `any` false → the page shows its empty state.
   applied  false until the person first touches the search or a filter: the original runs none of
            this before that, so a group with no metrics (Azure DevOps) keeps its header until then
            and loses it — leaving its "no built-in metrics" row alone — from the first filter on.

   Props
     rows, hidden (from mxFilterMetrics), collapsed { prov: true }, onToggleGroup(prov)
     selected      row id painted Selected (the one open in the details sheet)
     onOpen(row)   row click (not on the switch, not on the ⋮ menu)
     onActive(row, on)    the switch
     onAdd()       Add Metric (group header, connection sub-header, the empty row's link)
     onEdit(row) · onDuplicate(row) · onDelete(row)   the ⋮ menu
   Menu: custom metrics → Edit · Duplicate · Delete; built-in → Duplicate only (locked rule 5).

   Tour hooks (IK.OnbTour lights them): data-tour="mx-group-<prov>" on a group header,
   "mx-row-<prov>-<i>" on its i-th metric row (0-based, as shown), "mx-empty-<prov>" on its
   no-built-in-metrics row.

   Plan (Free): Add Metric, the empty row's link and the menu's Edit / Duplicate are locked →
   UpgradeModal (metrics); the switch is locked → UpgradePopover on hover (no marker, the dimmed
   switch says it). Delete is never gated.

   Phone (< 768px): each card stacks its rows — switch · name · badge · ⋮ — alias and definition
   go, the ⋮ is always shown at 36px, Add Metric folds to its "+" (28px).

   Shared workspaces (a Member's Shared metrics, IK.wsMetricRows): what is shared is a connection, so it
   sits in its source's group like the person's own connections (user, 2026-10-19):
     conn   { kind: 'conn', id, name, shared: { by, names, links, withBy }, ownerMark, locked, muted }
            a shared connection's sub-header: its workspaces (IK.WsNames) stand where Add Metric
            would be; ownerMark → the people glyph after the name; `muted` (a Blocked workspace)
            greys it and says Unavailable; `locked` (unavailable on the plan) greys it
     group  { kind: 'group', …, readOnly: true }  a source that is only shared: no Add Metric
     conn   { kind: 'conn', …, inWs: { names, links } }  one of the person's own, in their workspaces: the
            names stand before Add Metric
   IK.mxMergeShared(own, shared) → rows: a shared connection of a source the person has joins that
   group, after its own rows; a source only shared is a group of its own, after the person's.
     metric { kind: 'metric', …, readOnly: true, locked }     no switch, no ⋮ — absent, not
            disabled (a shared metric can't be hidden or turned off); the alias is the namespaced
            one when it collides with the person's own (@revenue__a3f9c1), truncated with a tooltip
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    /* verbatim from pages/approved/metrics-landing.html */
    'mx-group-chevron': '<polyline points="6 9 12 15 18 9"/>',
    'mx-add': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'mx-link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  });

  IK.mxRowKey = function (r) { return r.kind + ':' + (r.id || r.prov || r.name); };

  IK.mxFilterMetrics = function (rows, o) {
    o = o || {};
    if (o.applied === false) return { hidden: {}, any: true };
    var q = (o.query || '').toLowerCase().trim(), type = o.type || 'all';
    var hidden = {}, groupVis = {}, any = false;
    rows.forEach(function (r) {
      if (r.kind !== 'metric') return;
      /* Tag mode: a shared metric's type is Shared (r.tag on a read-only shared row), beside Built-in / Custom */
      var sh = !!(r.tag && r.readOnly);
      var matchType = type === 'all' || (type === 'shared' && sh) || (type === 'builtin' && !sh && !r.custom) || (type === 'custom' && !sh && r.custom);
      var show = (!q || (r.name || '').toLowerCase().indexOf(q) >= 0) && matchType && (!o.activeOnly || r.active);
      if (show) { groupVis[r.prov] = true; any = true; } else hidden[IK.mxRowKey(r)] = true;
    });
    /* Shared shows only what is shared: a group left without metrics takes its "No built-in metrics" row with
       it, and a connection sub-header with nothing under it goes too (user, 2026-10-19: "в шерд не мали попасти
       порожні конекшени"). Built-in / Custom keep the original's quirks below */
    var strict = type === 'shared';
    rows.forEach(function (r) { if ((r.kind === 'group' || (strict && r.kind === 'empty')) && !groupVis[r.prov]) hidden[IK.mxRowKey(r)] = true; });
    rows.forEach(function (r, i) {
      if (r.kind !== 'conn') return;
      var vis = false;
      for (var j = i + 1; j < rows.length && rows[j].kind !== 'conn' && rows[j].kind !== 'group'; j++) {
        if (!hidden[IK.mxRowKey(rows[j])]) { vis = true; break; }
      }
      /* the spacer row to the next card is never hidden, so a sub-header followed by another
         card always stays — the original's quirk, kept */
      /* …but only for the original's own rows: a shared connection, or one of the person's own from Data Sources
         (wsConn), never stays empty */
      if (!vis && !strict && !r.shared && !r.wsConn && rows.slice(i + 1).some(function (x) { return x.kind === 'group'; })) vis = true;
      if (!vis) hidden[IK.mxRowKey(r)] = true;
    });
    return { hidden: hidden, any: any };
  };

  /* The Provider filter (user, 2026-10-20: "фільтр провайдер з ієрархією сорс + конекшени в ньому"):
     IK.mxSourceTree(rows) → [{ value: 'g:<prov>', label, connector, count, children: [{ value: 'c:<id>', label, count }] }]
       — every source (a group) with its connections (the 'conn' sub-headers), each with how many metrics
     IK.mxFilterSource(rows, value, f) → f with the rows outside the chosen source / connection hidden too
       (value 'all' changes nothing); a metric belongs to the connection it names (conn) or the sub-header above it */
  function walk(rows, fn) {
    var g = null, c = null;
    rows.forEach(function (r) {
      if (r.kind === 'group') { g = r; c = null; }
      else if (r.kind === 'conn') c = r;
      fn(r, g, r.kind === 'metric' ? (r.conn || (c && c.id) || null) : c && c.id);
    });
  }
  IK.mxSourceTree = function (rows) {
    var out = [], at = {}, conns = {};
    walk(rows, function (r, g, cid) {
      if (!g) return;
      var n = at[g.prov];
      if (!n) { n = at[g.prov] = { value: 'g:' + g.prov, label: g.name, connector: g.connector || g.name, count: 0, children: [] }; out.push(n); }
      if (r.kind === 'conn' && !conns[g.prov + '/' + r.id]) n.children.push(conns[g.prov + '/' + r.id] = { value: 'c:' + r.id, label: r.name, count: 0 });
      if (r.kind === 'metric') { n.count++; if (cid && conns[g.prov + '/' + cid]) conns[g.prov + '/' + cid].count++; }
    });
    return out;
  };
  IK.mxFilterSource = function (rows, value, f) {
    if (!value || value === 'all') return f;
    var hidden = Object.assign({}, f.hidden), seen = {}, any = false;
    var kind = value.slice(0, 2), id = value.slice(2);
    walk(rows, function (r, g, cid) {
      if (r.kind !== 'metric') return;
      var key = IK.mxRowKey(r);
      var ok = g && (kind === 'g:' ? g.prov === id : cid === id);
      if (!ok) hidden[key] = true;
      else if (!hidden[key]) { any = true; seen['g' + g.prov] = true; if (cid) seen['c' + cid] = true; }
    });
    walk(rows, function (r, g) {
      if (r.kind === 'group' && !seen['g' + r.prov]) hidden[IK.mxRowKey(r)] = true;
      if (r.kind === 'conn' && !seen['c' + r.id]) hidden[IK.mxRowKey(r)] = true;
      if (r.kind === 'empty' && !(g && seen['g' + g.prov])) hidden[IK.mxRowKey(r)] = true;
    });
    return { hidden: hidden, any: any && f.any !== false };
  };

  IK.mxMergeShared = function (own, shared) {
    var out = own.slice(), g = null, block = [];
    function flush() {
      if (!g) return;
      var at = -1;
      for (var i = 0; i < out.length; i++) if (out[i].kind === 'group' && !out[i].readOnly && out[i].name === g.name) { at = i; break; }
      if (at < 0) { out = out.concat([g], block); return; }
      var end = at + 1, prov = out[at].prov;
      while (end < out.length && out[end].kind !== 'group') end++;
      out.splice.apply(out, [end, 0].concat(block.map(function (r) { return Object.assign({}, r, { prov: prov }); })));
    }
    (shared || []).forEach(function (r) { if (r.kind === 'group') { flush(); g = r; block = []; } else block.push(r); });
    flush();
    return out;
  };

  var useMaxWidth = D.useMaxWidth;

  function stop(e) { e.stopPropagation(); }

  function AddMetric(p) {
    var phone = p.phone;
    var btn = phone
      ? h(D.IconButton, { variant: 'secondary', size: 'xs', type: 'button', 'aria-label': 'Add Metric', onClick: function (e) { e.stopPropagation(); p.onAdd && p.onAdd(); } },
          h(IK.Icon, { name: 'mx-add', size: 12 }))
      : h(D.Button, { variant: 'secondary', size: 'xs', type: 'button', 'aria-label': 'Add Metric', leftSlot: h(IK.Icon, { name: 'mx-add', size: 12 }),
          onClick: function (e) { e.stopPropagation(); p.onAdd && p.onAdd(); } }, 'Add Metric');
    return h('span', { className: 'ik-mx-add ms-auto flex-none', onClick: stop },
      h(IK.Locked, { feature: 'metrics', surface: 'modal' }, btn));
  }

  function GroupRow(p) {
    var r = p.row, col = !!p.collapsed;
    var tip = col ? 'Expand' : 'Collapse';
    return h(D.TableRow, { className: IK.cx('ik-mx-group', col && 'is-collapsed'), 'data-tour': 'mx-group-' + r.prov, onClick: function () { p.onToggle(r.prov); } },
      h(D.TableCell, { colSpan: 6, className: 'bg-table-header-bg' },
        h('div', { className: 'flex items-center gap-2' },
          h(IK.Tip, { tip: tip },
            h('button', {
              type: 'button', className: IK.cx('ik-mx-collapse', D.focusRing), 'aria-label': col ? 'Expand group' : 'Collapse group',
              'aria-expanded': col ? 'false' : 'true',
              onClick: function (e) { e.stopPropagation(); p.onToggle(r.prov); }
            }, h(IK.Icon, { name: 'mx-group-chevron', size: 12 }))),
          h(IK.ConnectorMark, { connector: r.connector || r.name, size: 'xs' }),
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 flex-1 truncate' }, r.name),
          /* a source that is only shared: nothing to add to it */
          r.readOnly ? null : h(AddMetric, { phone: p.phone, onAdd: p.onAdd }))));
  }

  function ConnRow(p) {
    /* the workspaces it is in — none named inside a workspace's own page (it is the one you are on) */
    var r = p.row, sh = r.shared, inWs = sh || r.inWs, names = inWs && inWs.names && inWs.names.length ? inWs.names : null;
    return h(D.TableRow, { className: 'ik-mx-sub' },
      h(D.TableCell, { colSpan: 6, className: 'ik-mx-sub-cell' },
        h('div', { className: 'flex w-full items-center gap-1.5' },
          /* the connection and its marks — they stop before the alias line, where its workspaces go (a second line
             under the name was tried and read worse — user, 2026-10-20) */
          h('span', { className: 'ik-mx-sub-left flex min-w-0 items-center gap-1.5' },
          h('span', { className: 'ik-mx-sub-lead' }, h(IK.Icon, { name: 'mx-link', size: 16, className: 'ik-mx-sub-ic' })),
          /* the connection's name in the primary ink, as the group's and the metrics' names (user, 2026-10-20) */
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, r.name),
          /* a shared connection: Tag puts Shared on its metrics (the type), not here (user, 2026-10-19: 'як воно і
             там і там'); Owner puts the people glyph after its name; a Blocked workspace says Unavailable */
          sh && r.ownerMark ? h(IK.WsOwnerMark, { by: sh.by, ws: sh.names || sh.ws }) : null,
          /* unavailable: the warning after the name, as the connection's row on Data Sources */
          sh && (r.muted || r.locked) ? h(IK.WsUnavailableMark, { by: sh.by, locked: !r.muted, noun: 'connections' }) : null),
          /* the workspaces it is in — a shared one's, or one of the person's own they added to theirs (their metrics go
             into a workspace with their connection) — on the alias line, as the metric rows under it carry their aliases
             (user, 2026-10-20: "вирівнювати так, як наступні рядки йдуть з еліасом") */
          names ? h('span', { className: 'ik-mx-sub-ws', onClick: stop },
              h(IK.WsNames, { names: names, links: inWs.links, by: sh && sh.withBy ? sh.by : null, className: 'text-xs text-ink-secondary' })) : null,
          h('span', { className: 'flex-1' }),
          sh ? null : h(AddMetric, { phone: p.phone, onAdd: p.onAdd }))));
  }

  function EmptyRow(p) {
    var r = p.row;
    return h(D.TableRow, { className: 'ik-mx-none', 'data-tour': 'mx-empty-' + r.prov },
      h(D.TableCell, { colSpan: 6, className: 'ik-mx-none-cell' },
        h('div', { className: 'flex items-center gap-2' },
          h(IK.Icon, { name: 'info', size: 14, className: 'ik-mx-none-ic' }),
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'whitespace-normal', onClick: stop },
            'No built-in metrics for ' + r.name + '. ',
            h(IK.Locked, { feature: 'metrics', surface: 'modal' },
              /* on the text's line: the padlock leads the link's inline-flex box, which would ride 4px high */
              h(D.LinkButton, { href: '#', role: 'button', className: 'align-text-top', onClick: function (e) { e.preventDefault(); e.stopPropagation(); p.onAdd && p.onAdd(); } }, 'Create a custom metric →'))))));
  }

  function RowMenu(p) {
    var r = p.row;
    var items = [];
    if (r.custom) items.push(h(IK.Locked, { key: 'e', feature: 'metrics', surface: 'modal' },
      h(D.DropdownMenuItem, { onSelect: function () { p.onEdit && p.onEdit(r); } }, h(IK.Icon, { name: 'rename' }), 'Edit')));
    items.push(h(IK.Locked, { key: 'd', feature: 'metrics', surface: 'modal' },
      h(D.DropdownMenuItem, { onSelect: function () { p.onDuplicate && p.onDuplicate(r); } }, h(IK.Icon, { name: 'duplicate' }), 'Duplicate')));
    if (r.custom) items.push(h(D.DropdownMenuItem, { key: 'x', variant: 'danger', onSelect: function () { p.onDelete && p.onDelete(r); } }, h(IK.Icon, { name: 'delete' }), 'Delete'));
    /* DevartUI RowMenuButton; TableActionsCell does the reveal, so the button itself never hides */
    return h(D.RowMenuButton, { reveal: false }, items);
  }

  function MetricRow(p) {
    var r = p.row;
    /* a shared metric is read-only: no switch, no menu — absent, not disabled (it can't be hidden or
       turned off). Unavailable reads like a Free plan's switch — the row stays alive and opens, as a shared
       connection does; right after its name a warning glyph says why on hover (user, 2026-10-19: "вся
       апка — один організм", "не фарбувати все") */
    var off = r.locked || r.muted;
    if (r.readOnly) return h(D.TableRow, {
      nested: true, 'data-interactive': p.onOpen ? '' : undefined, className: IK.cx('ik-mx-row', p.selected && 'is-selected'),
      onClick: function () { if (p.onOpen) p.onOpen(r); }
    },
      /* switchable (the Owner on a workspace page): the metric's own Active, working — nothing else to change there;
         switchOn (a Member): the switch on and disabled, saying why on hover; else absent, as before */
      h(D.TableCell, { className: 'ik-mx-cell-switch' }, r.switchable ? h('span', { className: 'inline-flex items-center align-middle', onClick: stop },
        h(IK.Locked, { feature: 'metrics', marker: 'none' },
          h('span', { className: 'inline-flex items-center' },
            h(D.Switch, { size: 'sm', checked: !!r.active, 'aria-label': r.name + ' — toggle active', onCheckedChange: function (v) { p.onActive && p.onActive(r, v); } }))))
      : r.switchOn ? h('span', { className: 'inline-flex items-center align-middle', onClick: stop },
        h(IK.Tip, { tip: 'Shared metrics stay on — only ' + ((r.ws && r.ws.owner && r.ws.owner.name) || r.by || 'their owner') + ' can turn them off', wrap: true },
          h('span', { className: 'inline-flex items-center' }, h(D.Switch, { size: 'sm', checked: true, disabled: true, 'aria-label': r.name + ' — on, shared' })))) : null),
      /* unavailable: the warning right after the name, as everywhere */
      h(D.TableCell, { className: 'ik-mx-cell-name font-medium' }, off
        ? h('span', { className: 'flex min-w-0 items-center gap-2' }, h('span', { className: 'min-w-0 truncate' }, r.name),
            h(IK.WsUnavailableMark, { by: r.by || (r.ws && r.ws.owner && r.ws.owner.name), locked: !r.muted, noun: 'metrics' }))
        : r.name),
      h(D.TableCell, { className: 'ik-mx-cell-alias text-xs' },
        h(D.TruncatedTitleTooltip, { title: r.alias, getTruncationTarget: function (t) { return t; } }, h('span', { className: 'block truncate' }, r.alias))),
      h(D.TableCell, { className: 'ik-mx-cell-desc text-xs' }, r.summary),
      h(D.TableCell, { className: 'ik-mx-cell-badge' },
        r.tag ? h(IK.SharedBadge, { by: r.ws && r.ws.owner && r.ws.owner.name, ws: r.wsNames || (r.ws && r.ws.name) }) : h(D.Badge, { size: 'sm', variant: r.custom ? 'primary' : 'secondary' }, r.custom ? 'Custom' : 'Built-in')),
      h(D.TableCell, { className: 'ik-mx-cell-actions' }));
    return h(D.TableRow, {
      nested: true, 'data-interactive': '', className: IK.cx('ik-mx-row', p.selected && 'is-selected'), 'data-tour': p.tour,
      onClick: function () { p.onOpen && p.onOpen(r); }
    },
      h(D.TableCell, { className: 'ik-mx-cell-switch' },
        /* the outer span keeps every click — the switch's and the upgrade popover's, which React
           bubbles through its portal — from reaching the row and opening the sheet */
        h('span', { className: 'inline-flex items-center align-middle', onClick: stop },
          h(IK.Locked, { feature: 'metrics', marker: 'none' },
            h('span', { className: 'inline-flex items-center' },
              h(D.Switch, {
                size: 'sm', checked: !!r.active, 'aria-label': r.name + ' — toggle active',
                onCheckedChange: function (v) { p.onActive && p.onActive(r, v); }
              }))))),
      h(D.TableCell, { className: 'ik-mx-cell-name font-medium' }, r.name),
      h(D.TableCell, { className: 'ik-mx-cell-alias text-xs' }, r.alias),
      h(D.TableCell, { className: 'ik-mx-cell-desc text-xs' }, r.summary),
      h(D.TableCell, { className: 'ik-mx-cell-badge' },
        h(D.Badge, { size: 'sm', variant: r.custom ? 'primary' : 'secondary' }, r.custom ? 'Custom' : 'Built-in')),
      h(D.TableActionsCell, { reveal: !p.phone, className: 'ik-mx-cell-actions' }, h(RowMenu, p)));
  }

  function Section(p) {
    var phone = p.phone, n = {};
    return h(D.Table, { layout: 'fixed', 'aria-label': p.label, wrapperClassName: 'ik-mx-card' },
      h('colgroup', null,
        h('col', { className: 'ik-mx-col-switch' }), h('col', { className: 'ik-mx-col-name' }),
        h('col', { className: 'ik-mx-col-alias' }), h('col'),
        h('col', { className: 'ik-mx-col-badge' }), h('col', { className: 'ik-mx-col-actions' })),
      h(D.TableBody, null, p.rows.map(function (r) {
        var k = IK.mxRowKey(r), common = { key: k, row: r, phone: phone, onAdd: p.onAdd };
        if (r.kind === 'metric') n[r.prov] = (n[r.prov] || 0) + 1;
        if (r.kind === 'group') return h(GroupRow, Object.assign(common, { collapsed: p.collapsed[r.prov], onToggle: p.onToggleGroup }));
        if (r.kind === 'conn') return h(ConnRow, common);
        if (r.kind === 'empty') return h(EmptyRow, common);
        return h(MetricRow, Object.assign(common, {
          selected: p.selected === r.id, onOpen: p.onOpen, onActive: p.onActive, tour: 'mx-row-' + r.prov + '-' + (n[r.prov] - 1),
          onEdit: p.onEdit, onDuplicate: p.onDuplicate, onDelete: p.onDelete
        }));
      })));
  }

  IK.MxMetricsTable = function MxMetricsTable(p) {
    var phone = useMaxWidth(768);
    var rows = p.rows || [], hidden = p.hidden || {}, collapsed = p.collapsed || {};
    var sections = [], cur = null, grp = null;
    rows.forEach(function (r) {
      if (r.kind === 'group') { grp = r; cur = { key: r.prov, label: r.name, rows: [] }; sections.push(cur); }
      if (!cur) { cur = { key: 'top', label: 'Metrics', rows: [] }; sections.push(cur); }
      if (hidden[IK.mxRowKey(r)]) return;
      if (r.kind !== 'group' && grp && collapsed[grp.prov]) return;
      cur.rows.push(r);
    });
    return h('div', { className: IK.cx('ik-mx-table flex flex-col gap-4', p.className) },
      sections.filter(function (s) { return s.rows.length; }).map(function (s) {
        return h(Section, Object.assign({ key: s.key, label: s.label, rows: s.rows, phone: phone }, {
          collapsed: collapsed, onToggleGroup: p.onToggleGroup, selected: p.selected, onOpen: p.onOpen,
          onActive: p.onActive, onAdd: p.onAdd, onEdit: p.onEdit, onDuplicate: p.onDuplicate, onDelete: p.onDelete
        }));
      }));
  };
})();
