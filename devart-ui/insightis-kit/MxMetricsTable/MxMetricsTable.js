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
   IK.mxFilterMetrics(rows, { query, type: 'all'|'builtin'|'custom', activeOnly, applied })
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

   Plan (Free): Add Metric, the empty row's link and the menu's Edit / Duplicate are locked →
   UpgradeModal (metrics); the switch is locked → UpgradePopover on hover (no marker, the dimmed
   switch says it). Delete is never gated.

   Phone (< 768px): each card stacks its rows — switch · name · badge · ⋮ — alias and definition
   go, the ⋮ is always shown at 36px, Add Metric folds to its "+" (28px).
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    /* verbatim from pages/approved/metrics-landing.html */
    'mx-group-chevron': '<polyline points="6 9 12 15 18 9"/>',
    'mx-add': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'mx-link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'mx-kebab': { fill: true, inner: '<circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/>' }
  });

  IK.mxRowKey = function (r) { return r.kind + ':' + (r.id || r.prov || r.name); };

  IK.mxFilterMetrics = function (rows, o) {
    o = o || {};
    if (o.applied === false) return { hidden: {}, any: true };
    var q = (o.query || '').toLowerCase().trim(), type = o.type || 'all';
    var hidden = {}, groupVis = {}, any = false;
    rows.forEach(function (r) {
      if (r.kind !== 'metric') return;
      var matchType = type === 'all' || (type === 'builtin' && !r.custom) || (type === 'custom' && r.custom);
      var show = (!q || (r.name || '').toLowerCase().indexOf(q) >= 0) && matchType && (!o.activeOnly || r.active);
      if (show) { groupVis[r.prov] = true; any = true; } else hidden[IK.mxRowKey(r)] = true;
    });
    rows.forEach(function (r) { if (r.kind === 'group' && !groupVis[r.prov]) hidden[IK.mxRowKey(r)] = true; });
    rows.forEach(function (r, i) {
      if (r.kind !== 'conn') return;
      var vis = false;
      for (var j = i + 1; j < rows.length && rows[j].kind !== 'conn' && rows[j].kind !== 'group'; j++) {
        if (!hidden[IK.mxRowKey(rows[j])]) { vis = true; break; }
      }
      /* the spacer row to the next card is never hidden, so a sub-header followed by another
         card always stays — the original's quirk, kept */
      if (!vis && rows.slice(i + 1).some(function (x) { return x.kind === 'group'; })) vis = true;
      if (!vis) hidden[IK.mxRowKey(r)] = true;
    });
    return { hidden: hidden, any: any };
  };

  var useMaxWidth = D.useMaxWidth;

  function stop(e) { e.stopPropagation(); }

  function AddMetric(p) {
    var phone = p.phone;
    var btn = phone
      ? h(D.IconButton, { variant: 'outline', size: 'xs', type: 'button', 'aria-label': 'Add Metric', onClick: function (e) { e.stopPropagation(); p.onAdd && p.onAdd(); } },
          h(IK.Icon, { name: 'mx-add', size: 12 }))
      : h(D.Button, { variant: 'outline', size: 'xs', type: 'button', 'aria-label': 'Add Metric', leftSlot: h(IK.Icon, { name: 'mx-add', size: 12 }),
          onClick: function (e) { e.stopPropagation(); p.onAdd && p.onAdd(); } }, 'Add Metric');
    return h('span', { className: 'ik-mx-add ms-auto flex-none', onClick: stop },
      h(IK.Locked, { feature: 'metrics', surface: 'modal' }, btn));
  }

  function GroupRow(p) {
    var r = p.row, col = !!p.collapsed;
    var tip = col ? 'Expand' : 'Collapse';
    return h(D.TableRow, { className: IK.cx('ik-mx-group', col && 'is-collapsed'), onClick: function () { p.onToggle(r.prov); } },
      h(D.TableCell, { colSpan: 6, className: 'bg-table-header-bg' },
        h('div', { className: 'flex items-center gap-2' },
          h(IK.Tip, { tip: tip },
            h('button', {
              type: 'button', className: IK.cx('ik-mx-collapse', D.focusRing), 'aria-label': col ? 'Expand group' : 'Collapse group',
              'aria-expanded': col ? 'false' : 'true',
              onClick: function (e) { e.stopPropagation(); p.onToggle(r.prov); }
            }, h(IK.Icon, { name: 'mx-group-chevron', size: 12 }))),
          h(D.ConnectorLogo, { connector: r.connector || r.name, size: 'xs' }),
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 flex-1 truncate' }, r.name),
          h(AddMetric, { phone: p.phone, onAdd: p.onAdd }))));
  }

  function ConnRow(p) {
    var r = p.row;
    return h(D.TableRow, { className: 'ik-mx-sub' },
      h(D.TableCell, { colSpan: 6, className: 'ik-mx-sub-cell' },
        h('div', { className: 'flex w-full items-center gap-1.5' },
          h(IK.Icon, { name: 'mx-link', size: 12, className: 'ik-mx-sub-ic' }),
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'secondary', className: 'min-w-0 flex-1 truncate' }, r.name),
          h(AddMetric, { phone: p.phone, onAdd: p.onAdd }))));
  }

  function EmptyRow(p) {
    var r = p.row;
    return h(D.TableRow, { className: 'ik-mx-none' },
      h(D.TableCell, { colSpan: 6, className: 'ik-mx-none-cell' },
        h('div', { className: 'flex items-center gap-2' },
          h(IK.Icon, { name: 'info', size: 14, className: 'ik-mx-none-ic' }),
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'whitespace-normal', onClick: stop },
            'No built-in metrics for ' + r.name + '. ',
            h(IK.Locked, { feature: 'metrics', surface: 'modal' },
              h(D.LinkButton, { href: '#', role: 'button', onClick: function (e) { e.preventDefault(); e.stopPropagation(); p.onAdd && p.onAdd(); } }, 'Create a custom metric →'))))));
  }

  function RowMenu(p) {
    var r = p.row;
    var items = [];
    if (r.custom) items.push(h(IK.Locked, { key: 'e', feature: 'metrics', surface: 'modal' },
      h(D.DropdownMenuItem, { onSelect: function () { p.onEdit && p.onEdit(r); } }, h(IK.Icon, { name: 'rename' }), 'Edit')));
    items.push(h(IK.Locked, { key: 'd', feature: 'metrics', surface: 'modal' },
      h(D.DropdownMenuItem, { onSelect: function () { p.onDuplicate && p.onDuplicate(r); } }, h(IK.Icon, { name: 'duplicate' }), 'Duplicate')));
    if (r.custom) items.push(h(D.DropdownMenuItem, { key: 'x', variant: 'danger', onSelect: function () { p.onDelete && p.onDelete(r); } }, h(IK.Icon, { name: 'delete' }), 'Delete'));
    return h(D.DropdownMenu, null,
      h(IK.Tip, { tip: 'More actions' },
        h(D.DropdownMenuTrigger, { asChild: true },
          h(D.IconButton, { variant: 'tertiary', size: p.phone ? 'md' : '2xs', type: 'button', 'aria-label': 'More actions', onClick: stop },
            h(IK.Icon, { name: 'mx-kebab' })))),
      h(D.DropdownMenuContent, { side: 'bottom', align: 'end', sideOffset: 8, onClick: stop }, items));
  }

  function MetricRow(p) {
    var r = p.row;
    return h(D.TableRow, {
      nested: true, 'data-interactive': '', className: IK.cx('ik-mx-row', p.selected && 'is-selected'),
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
    var phone = p.phone;
    return h(D.Table, { layout: 'fixed', 'aria-label': p.label, wrapperClassName: 'ik-mx-card' },
      h('colgroup', null,
        h('col', { className: 'ik-mx-col-switch' }), h('col', { className: 'ik-mx-col-name' }),
        h('col', { className: 'ik-mx-col-alias' }), h('col'),
        h('col', { className: 'ik-mx-col-badge' }), h('col', { className: 'ik-mx-col-actions' })),
      h(D.TableBody, null, p.rows.map(function (r) {
        var k = IK.mxRowKey(r), common = { key: k, row: r, phone: phone, onAdd: p.onAdd };
        if (r.kind === 'group') return h(GroupRow, Object.assign(common, { collapsed: p.collapsed[r.prov], onToggle: p.onToggleGroup }));
        if (r.kind === 'conn') return h(ConnRow, common);
        if (r.kind === 'empty') return h(EmptyRow, common);
        return h(MetricRow, Object.assign(common, {
          selected: p.selected === r.id, onOpen: p.onOpen, onActive: p.onActive,
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
