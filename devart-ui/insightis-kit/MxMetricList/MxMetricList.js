/* MxMetricList — the Metrics library as rows, not a table (approved/metrics-landing.html, List: Rows; user, 2026-10-21: "метрики
   будуть не таблицею а більше рядками + буде опція додавати в улюблені"). The same rows model, filters and props
   as IK.MxMetricsTable — a page swaps one for the other — plus Favorites.

   Rows (as MxMetricsTable's): group · conn · empty · metric, one flat ordered list; hidden / collapsed as there.
     group   a section heading: chevron · logo · name · how many metrics · Add Metric (on hover; always on a phone)
     conn    a sub-heading inside it: link glyph · name · owner / unavailable marks · Add Metric (one's own)
     empty   "No built-in metrics for <name>. Create a custom metric →" on the rows' plate (not clickable)
     metric  a DevartUI Card row (variant "row" — the chats list's row: its padding grows with two lines, its
             hover, focus and press): switch · name, alias / the definition · badge · star · ⋮
   Favorites
     favorites { id: true }, onFavorite(row, on)   the star on every metric row — off shows on the row's hover
                                                   (always on touch), on always; the ⋮ has Add to / Remove from
                                                   Favorites too. Not plan-gated. A favourite stays where it is —
                                                   no section of them on top (user, 2026-10-21: "складна логіка
                                                   фейворітів зверху"); the page's Favorites chip
                                                   (IK.mxFilterFavorites) leaves only them, in their groups, so
                                                   source → connection → metric holds everywhere
   A shared metric (readOnly): the switch as the table has it (switchOn / switchable / none), no ⋮, the star
   still — a favourite is one's own list, whoever made the metric.
   Hierarchy: a group's heading (title16) over its connections' sub-headings (title14) over the rows — the
   headings read as headings, not as one more row (user, 2026-10-21: "тайтли губляться"); the switch is
   DevartUI's default size, a row is two lines tall ("тогл мав би бути більшим").

   h(IK.MxMetricList, { rows, hidden, collapsed, onToggleGroup, selected, onOpen, onActive, onAdd, onEdit,
                        onDuplicate, onDelete, favorites, onFavorite })

   Phone (< 768px): the alias goes, the definition keeps two lines; the star and the ⋮ always show; Add Metric
   folds to its "+". */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'mxl-chevron': '<polyline points="6 9 12 15 18 9"/>',
    'mxl-add': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'mxl-link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'
  });

  function stop(e) { e.stopPropagation(); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  /* the Card row's selected look — SelectableListCard's own classes for a selected row */
  var SELECTED = 'border-brand-primary bg-state-pressed shadow-sm hover:border-brand-primary hover:bg-state-pressed';

  /* Favorites as a filter: only the favourites, their groups and sub-headings with them (as IK.mxFilterSource) */
  IK.mxFilterFavorites = function (rows, favs, f) {
    var hidden = Object.assign({}, f.hidden), seenG = {}, seenC = {}, any = false, g = null, c = null;
    rows.forEach(function (r) {
      if (r.kind === 'group') { g = r; c = null; return; }
      if (r.kind === 'conn') { c = r; return; }
      if (r.kind !== 'metric') return;
      var key = IK.mxRowKey(r);
      if (!favs[r.id]) hidden[key] = true;
      else if (!hidden[key]) { any = true; if (g) seenG[g.prov] = true; if (r.conn || c) seenC[r.conn || c.id] = true; }
    });
    g = null;
    rows.forEach(function (r) {
      if (r.kind === 'group') { g = r; if (!seenG[r.prov]) hidden[IK.mxRowKey(r)] = true; }
      if (r.kind === 'conn' && !seenC[r.id]) hidden[IK.mxRowKey(r)] = true;
      if (r.kind === 'empty') hidden[IK.mxRowKey(r)] = true;
    });
    return { hidden: hidden, any: any };
  };

  function AddMetric(p) {
    var btn = p.phone
      ? h(D.IconButton, { variant: 'secondary', size: 'xs', type: 'button', 'aria-label': 'Add Metric', onClick: function (e) { e.stopPropagation(); if (p.onAdd) p.onAdd(); } },
          h(IK.Icon, { name: 'mxl-add', size: 12 }))
      : h(D.Button, { variant: 'secondary', size: 'xs', type: 'button', leftSlot: h(IK.Icon, { name: 'mxl-add', size: 12 }),
          onClick: function (e) { e.stopPropagation(); if (p.onAdd) p.onAdd(); } }, 'Add Metric');
    return h('span', { className: 'ik-mxl-add ms-auto flex-none', onClick: stop }, h(IK.Locked, { feature: 'metrics', surface: 'modal' }, btn));
  }

  function GroupHead(p) {
    var r = p.row, col = !!p.collapsed;
    /* a band, as the table's group header: the page's background alone did not hold a heading (user, 2026-10-21: 'такі
       рядки не читаються') */
    return h('div', { className: IK.cx('ik-mxl-head rounded-lg bg-table-header-bg px-4 py-2', col && 'is-collapsed'), onClick: function () { p.onToggle(r.prov); } },
      h(IK.Tip, { tip: col ? 'Expand' : 'Collapse' },
        h('button', { type: 'button', className: IK.cx('ik-mxl-collapse', D.focusRing), 'aria-label': col ? 'Expand group' : 'Collapse group',
          'aria-expanded': col ? 'false' : 'true', onClick: function (e) { e.stopPropagation(); p.onToggle(r.prov); } },
          h(IK.Icon, { name: 'mxl-chevron', size: 12 }))),
      h(IK.ConnectorMark, { connector: r.connector || r.name, size: 'xs' }),
      h(D.Typography, { element: 'h3', textStyle: 'title16', textColor: 'primary', className: 'm-0 min-w-0 truncate' }, r.name),
      p.count ? h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary', className: 'flex-none' }, plural(p.count, 'metric', 'metrics')) : null,
      r.readOnly ? null : h(AddMetric, { phone: p.phone, onAdd: p.onAdd }));
  }

  function ConnHead(p) {
    var r = p.row, sh = r.shared;
    return h('div', { className: 'ik-mxl-sub' },
      h('span', { className: 'ik-mxl-sub-lead' }, h(IK.Icon, { name: 'mxl-link', size: 16 })),
      h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, r.name),
      sh && r.ownerMark ? h(IK.WsOwnerMark, { by: sh.by, ws: sh.names || sh.ws }) : null,
      sh && (r.muted || r.locked) ? h(IK.WsUnavailableMark, { by: sh.by, locked: !r.muted, noun: 'connections' }) : null,
      sh ? null : h(AddMetric, { phone: p.phone, onAdd: p.onAdd }));
  }

  function EmptyRow(p) {
    var r = p.row;
    /* on the rows' plate — the Card row's surface, frame and rest shadow, without its hover: nothing to open here
       (user, 2026-10-21: 'без підложок виглядає погано') */
    return h('div', { className: 'flex items-center gap-2 rounded-lg border border-stroke/45 bg-surface-card px-4 py-3 shadow-rest', onClick: stop },
      h(IK.Icon, { name: 'info', size: 14, className: 'flex-none text-ink-secondary' }),
      h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' },
        'No built-in metrics for ' + r.name + '. ',
        h(IK.Locked, { feature: 'metrics', surface: 'modal' },
          h(D.LinkButton, { href: '#', role: 'button', className: 'align-text-top', onClick: function (e) { e.preventDefault(); if (p.onAdd) p.onAdd(); } }, 'Create a custom metric →'))));
  }

  function menuItems(p, fav) {
    var r = p.row, items = [
      h(D.DropdownMenuItem, { key: 'f', onSelect: function () { if (p.onFavorite) p.onFavorite(r, !fav); } },
        h(IK.Icon, { name: 'fav-star' }), fav ? 'Remove from Favorites' : 'Add to Favorites'),
      h(D.DropdownMenuSeparator, { key: 's' })];
    if (r.custom) items.push(h(IK.Locked, { key: 'e', feature: 'metrics', surface: 'modal' },
      h(D.DropdownMenuItem, { onSelect: function () { if (p.onEdit) p.onEdit(r); } }, h(IK.Icon, { name: 'rename' }), 'Edit')));
    items.push(h(IK.Locked, { key: 'd', feature: 'metrics', surface: 'modal' },
      h(D.DropdownMenuItem, { onSelect: function () { if (p.onDuplicate) p.onDuplicate(r); } }, h(IK.Icon, { name: 'duplicate' }), 'Duplicate')));
    if (r.custom) items.push(h(D.DropdownMenuItem, { key: 'x', variant: 'danger', onSelect: function () { if (p.onDelete) p.onDelete(r); } }, h(IK.Icon, { name: 'delete' }), 'Delete'));
    return items;
  }

  function Switch(p) {
    var r = p.row;
    var sw = function (props) { return h('span', { className: 'ik-mxl-switch', onClick: stop }, props); };
    if (!r.readOnly || r.switchable) return sw(h(IK.Locked, { feature: 'metrics', marker: 'none' },
      h('span', { className: 'inline-flex items-center' },
        h(D.Switch, { checked: !!r.active, 'aria-label': r.name + ' — toggle active', onCheckedChange: function (v) { if (p.onActive) p.onActive(r, v); } }))));
    if (r.switchOn) return sw(h(IK.Tip, { tip: 'Shared metrics stay on — only ' + ((r.ws && r.ws.owner && r.ws.owner.name) || r.by || 'their owner') + ' can turn them off', wrap: true },
      h('span', { className: 'inline-flex items-center' }, h(D.Switch, { checked: true, disabled: true, 'aria-label': r.name + ' — on, shared' }))));
    /* no switch: its room kept, so every name starts on one line */
    return h('span', { className: 'ik-mxl-switch', 'aria-hidden': 'true' });
  }

  function MetricRow(p) {
    var r = p.row, fav = !!p.fav, off = r.locked || r.muted, by = r.by || (r.ws && r.ws.owner && r.ws.owner.name);
    var badge = r.tag ? h(IK.SharedBadge, { by: by, ws: r.wsNames || (r.ws && r.ws.name) })
      : h(D.Badge, { size: 'sm', variant: r.custom ? 'primary' : 'secondary' }, r.custom ? 'Custom' : 'Built-in');
    return h(D.Card, {
        variant: 'row', fullWidth: true, tabIndex: 0, 'aria-selected': p.selected ? 'true' : undefined,
        className: p.selected ? SELECTED : undefined, 'data-tour': p.tour,
        onClick: function () { if (p.onOpen) p.onOpen(r); },
        onKeyDown: function (e) { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); if (p.onOpen) p.onOpen(r); } }
      },
        h(Switch, p),
        h('span', { className: 'flex min-w-0 flex-1 flex-col gap-0.5' },
          h('span', { className: 'flex min-w-0 items-center gap-2' },
            h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, r.name),
            off ? h(IK.WsUnavailableMark, { by: by, locked: !r.muted, noun: 'metrics' }) : null,
            r.alias ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'ik-mxl-alias min-w-0 truncate max-md:hidden' }, r.alias) : null),
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'ik-mxl-def' }, r.summary)),
        h('span', { className: 'ik-mxl-end', onClick: stop },
          badge,
          h(IK.FavoriteToggle, { pressed: fav, reveal: true, label: r.name, onPressedChange: function (on) { if (p.onFavorite) p.onFavorite(r, on); } }),
          r.readOnly ? h('span', { className: 'ik-mxl-menu-room', 'aria-hidden': 'true' })
            : h(D.RowMenuButton, { 'aria-label': 'More actions', className: '-my-0.5' }, menuItems(p, fav))));
  }

  function rowsOf(list, p) {
    var n = {};
    return list.map(function (r) {
      var k = IK.mxRowKey(r), common = { key: k, row: r, phone: p.phone, onAdd: p.onAdd };
      if (r.kind === 'conn') return h(ConnHead, common);
      if (r.kind === 'empty') return h(EmptyRow, common);
      n[r.prov] = (n[r.prov] || 0) + 1;
      return h(MetricRow, Object.assign(common, {
        fav: !!(p.favorites && p.favorites[r.id]), onFavorite: p.onFavorite,
        selected: p.selected === r.id, onOpen: p.onOpen, onActive: p.onActive, tour: 'mx-row-' + r.prov + '-' + (n[r.prov] - 1),
        onEdit: p.onEdit, onDuplicate: p.onDuplicate, onDelete: p.onDelete
      }));
    });
  }

  IK.MxMetricList = function MxMetricList(p) {
    var phone = D.useMaxWidth(768);
    var rows = p.rows || [], hidden = p.hidden || {}, collapsed = p.collapsed || {};
    var q = Object.assign({}, p, { phone: phone });
    var sections = [], cur = null;
    rows.forEach(function (r) {
      if (r.kind === 'group') { cur = { key: r.prov, group: r, rows: [], count: 0 }; sections.push(cur); return; }
      if (!cur) { cur = { key: 'top', group: null, rows: [], count: 0 }; sections.push(cur); }
      if (hidden[IK.mxRowKey(r)]) return;
      if (r.kind === 'metric') cur.count++;
      cur.rows.push(r);
    });
    /* 32px between groups: a heading belongs to the rows under it, not to the ones above */
    return h('div', { className: IK.cx('flex flex-col gap-8', p.className) },
      sections.filter(function (s) { return s.group ? !hidden[IK.mxRowKey(s.group)] : s.rows.length; }).map(function (s) {
        var col = s.group && collapsed[s.group.prov];
        return h('section', { key: s.key, className: 'ik-mxl-section', 'aria-label': s.group ? s.group.name : 'Metrics', 'data-tour': s.group ? 'mx-group-' + s.group.prov : undefined },
          s.group ? h(GroupHead, { row: s.group, count: s.count, collapsed: col, onToggle: p.onToggleGroup || function () {}, phone: phone, onAdd: p.onAdd }) : null,
          col ? null : h('div', { className: 'ik-mxl-rows' }, rowsOf(s.rows, q)));
      }));
  };
})();
