/* WsMetrics — metrics shared with a person, read-only (the brief: no Hide, no Turn off — absent),
   in IK.MxMetricsTable groups — one per source, each connection a sub-header with its workspaces — with the
   Insightis search (IK.WsSearch, by name or @alias), the Metrics page's FilterChips All · Built-in ·
   Custom, and "No matches found". A collided alias reads in
   its long form (@revenue__a3f9c1); built-in-only metrics are plain metrics.

   h(IK.WsMetrics, { rows })   rows: IK.wsMetricRows(list, { own, locked, only })                         */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.WsMetrics = function WsMetrics(p) {
    var qs = R.useState(''), q = qs[0], setQ = qs[1];
    var cs = R.useState({}), collapsed = cs[0], setCollapsed = cs[1];
    var ts = R.useState('all'), type = ts[0], setType = ts[1];
    /* a row opens Metric Details, read-only (no switch, nothing to edit) */
    var os = R.useState(null), open = os[0], setOpen = os[1];
    var ls = R.useState(null), last = ls[0], setLast = ls[1];
    var rows = p.rows || [];
    var qq = q.trim().toLowerCase().replace(/^@/, '');
    /* by the name or the alias, and the type: a group stays while any of its metrics matches */
    var hidden = {}, any = true;
    if (qq || type !== 'all') {
      var hit = {}, groups = {}, conns = {};
      rows.forEach(function (r) {
        if (r.kind !== 'metric') return;
        var t = type === 'all' || (type === 'custom') === !!r.custom;
        if (t && (!qq || (r.name || '').toLowerCase().indexOf(qq) >= 0 || (r.alias || '').toLowerCase().replace(/^@/, '').indexOf(qq) >= 0)) { hit[r.id] = true; groups[r.prov] = true; if (r.conn) conns[r.conn] = true; }
      });
      any = Object.keys(hit).length > 0;
      rows.forEach(function (r) {
        if (r.kind === 'group' ? !groups[r.prov] : r.kind === 'conn' ? !conns[r.id] : r.kind === 'metric' && !hit[r.id]) hidden[IK.mxRowKey(r)] = true;
      });
    }
    return h('div', { className: 'flex flex-col gap-3' },
      h(IK.WsSearch, { value: q, onChange: setQ, placeholder: 'Search metrics…', label: 'Search metrics' }),
      h(D.FilterChips, {
        value: type, onValueChange: function (v) { setType(v || 'all'); },
        items: [{ value: 'all', label: 'All' }, { value: 'builtin', label: 'Built-in' }, { value: 'custom', label: 'Custom' }]
      }),
      any ? h(IK.MxMetricsTable, { rows: rows, hidden: hidden, collapsed: collapsed, selected: open && open.id,
          onOpen: function (r) { var m = Object.assign({}, r, { kind: 'readonly', logo: r.provider }); setOpen(m); setLast(m); },
          onToggleGroup: function (prov) { var n = Object.assign({}, collapsed); n[prov] = !n[prov]; setCollapsed(n); } })
        : h(IK.WsNoMatch, { description: qq ? 'No metrics match “' + q.trim() + '” — try a different search' : 'No metrics match this filter — switch back to All' }),
      h(IK.MxMetricSheet, { open: !!open, metric: last || {}, renewal: p.ws && last && last.ws ? IK.wsRenewal(p.ws, [last.ws.id]) : null,
        onOpenChange: function (v) { if (!v) setOpen(null); } }));
  };
})();
