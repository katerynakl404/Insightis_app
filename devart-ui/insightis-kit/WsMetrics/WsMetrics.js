/* WsMetrics — a workspace's metrics, in IK.MxMetricsTable groups — one per source, each connection a sub-header
   with its workspaces — under the Metrics page's own toolbar (user, 2026-10-22: "як на власних сторінках"): the
   search ("Search metrics...", by name — IK.mxFilterMetrics), FilterChips All · Built-in · Custom, the Provider
   pill (DevartUI FilterMenu on IK.mxSourceOptions), Active only (the Owner's — a Member's are all on), and the Metrics
   page's "No matches found". A collided alias reads in its long form (@revenue__a3f9c1).

   The Owner's rows are the Metrics page's own: the switch, the ⋮ (Edit · Duplicate · Delete), Add Metric on a
   connection — not on a data source: a workspace shares connections, never a data source (user, 2026-11-09). Add
   Metric goes to onCreate({ id, label }) — the page's "Create metric for <connection>", which keeps what it makes
   with the connection. Edit is the Metrics page's own (user, 2026-11-09: the same wherever it opens) — Link to and
   the picker, the person's data sources and connections: another of this workspace's connections moves the metric
   under it; a data source or a connection it does not have takes the metric out of its list. A Member's are
   read-only (the brief: no Hide, no Turn off — absent).

   The Active switch (user, 2026-10-21: "верни включення та виключення метрики — мембери бачать лише включені в
   задізейбленому вигляді"): owner — each metric's switch works (the Metrics page's own Active); member — only the
   switched-on metrics, each switch on and disabled (only the owner turns one off).

   Metric Details is the very panel Metrics opens (user, 2026-10-22: "зроби і панель метрики на сторінці воркспейсу
   такою самою, як на Metrics", "лишаєм нову панель всюди (з лінком на сорс)"): the Owner's metric — Active, Edit ·
   Duplicate · Delete (a custom one) or Duplicate (a built-in one), Workspaces with "Goes with its connection,
   <name>" — the name opening the connection's details over it (onOpenConnection); Add Metric opens Create metric, as
   there. An invited person's metric — the read-only panel Metrics shows for a shared one. Edits, copies and deletions
   are kept here, as the Metrics page keeps its own.

   h(IK.WsMetrics, { rows, owner, ws, free, onOpenConnection(connId), onCreate(connection) })
     rows: IK.wsOwnMetricRows(w) (owner) · IK.wsMetricRows(list, { own, locked, only }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  function norm(v) { return String(v || '').trim().toLowerCase().replace(/^@/, ''); }

  IK.WsMetrics = function WsMetrics(p) {
    var qs = R.useState(''), q = qs[0], setQ = qs[1];
    var cs = R.useState({}), collapsed = cs[0], setCollapsed = cs[1];
    var ts = R.useState('all'), type = ts[0], setType = ts[1];
    /* a row opens Metric Details (its id: the panel follows the row through edits) */
    var os = R.useState(null), open = os[0], setOpen = os[1];
    var as = R.useState({}), active = as[0], setActive = as[1];
    var pf = R.useState('all'), provF = pf[0], setProvF = pf[1];
    var ao = R.useState(false), activeOnly = ao[0], setActiveOnly = ao[1];
    /* the Owner's changes, as the Metrics page keeps them: edits by id, copies after their source, new ones at the end */
    var xs = R.useState({ edits: {}, gone: {}, copies: {}, made: [] }), mine = xs[0], setMine = xs[1];
    var dl = R.useState({ open: false }), dlg = dl[0], setDlg = dl[1];
    var n = R.useRef(1);

    var base = [];
    (p.rows || []).forEach(function (r) {
      if (mine.gone[r.id]) return;
      base.push(mine.edits[r.id] ? Object.assign({}, r, mine.edits[r.id]) : r);
      (mine.copies[r.id] || []).forEach(function (c) { if (!mine.gone[c.id]) base.push(mine.edits[c.id] ? Object.assign({}, c, mine.edits[c.id]) : c); });
    });
    mine.made.forEach(function (c) { if (!mine.gone[c.id]) base.push(mine.edits[c.id] ? Object.assign({}, c, mine.edits[c.id]) : c); });

    var rows = base.map(function (r) {
      /* the Owner's metrics: not read-only — the Metrics page's switch and ⋮; a source stays read-only (no Add Metric on it) */
      if (p.owner && r.kind === 'metric') r = Object.assign({}, r, { readOnly: false });
      if (r.kind !== 'metric') return r;
      var on = active[r.id] != null ? active[r.id] : r.active !== false;
      return Object.assign({}, r, p.owner ? { active: on } : { switchOn: true, active: on });
    });
    /* a member sees only what is switched on — a group or a connection left with nothing goes too */
    if (!p.owner) {
      var keep = {}, keepC = {};
      rows = rows.filter(function (r) { return r.kind !== 'metric' || r.active; });
      rows.forEach(function (r) { if (r.kind === 'metric') { keep[r.prov] = true; if (r.conn) keepC[r.conn] = true; } });
      rows = rows.filter(function (r) { return r.kind === 'group' ? keep[r.prov] : r.kind === 'conn' ? keepC[r.id] : true; });
    }
    function toggle(r, v) { var x = Object.assign({}, active); x[r.id] = v; setActive(x); }
    function change(fn) { setMine(function (m) { var x = { edits: Object.assign({}, m.edits), gone: Object.assign({}, m.gone), copies: Object.assign({}, m.copies), made: m.made.slice() }; fn(x); return x; }); }
    function rowOf(id) { return rows.filter(function (r) { return r.kind === 'metric' && r.id === id; })[0] || null; }
    /* the connection a metric goes with: its sub-header's (own-<connection id>) */
    function connId(r) { return r && r.conn ? String(r.conn).replace(/^own-/, '') : null; }

    /* the Metrics page's filters: the search, the type, Active only, then the Provider */
    var f = IK.mxFilterMetrics(rows, { query: q, type: type, activeOnly: !!p.owner && activeOnly });
    var tree = IK.mxSourceTree(rows);
    var srcOk = provF === 'all' || tree.some(function (g) { return g.value === provF || g.children.some(function (c) { return c.value === provF; }); });
    f = IK.mxFilterSource(rows, srcOk ? provF : 'all', f);
    var hidden = f.hidden, any = f.any;
    var provPill = tree.length > 1 || (tree[0] && tree[0].children.length) ? h(D.FilterMenu, { label: 'Provider', value: srcOk ? provF : 'all', options: IK.mxSourceOptions(tree), onValueChange: setProvF }) : null;

    /* ── the Owner's actions, as on Metrics ── */
    /* a copy is made of the row as the list keeps it, never of what a panel shows (its kind, logo, workspaces) */
    function baseOf(id) { return base.filter(function (r) { return r.kind === 'metric' && r.id === id; })[0] || null; }
    function duplicate(shown) {
      var src = baseOf(shown.id) || shown;
      var a = norm(src.alias);
      var copy = Object.assign({}, src, { id: 'copy-' + (n.current++), name: src.name + ' (Copy)', alias: a ? '@' + a + '_copy' : '', custom: true, active: false });
      change(function (x) { var after = src.copyOf || src.id; x.copies[after] = (x.copies[after] || []).concat([Object.assign(copy, { copyOf: after })]); });
      toggle(copy, false);
    }
    function remove(r) { change(function (x) { x.gone[r.id] = true; }); setOpen(null); }
    /* Delete asks first, as on Metrics (IK.useMxDeleteConfirm) */
    var del = IK.useMxDeleteConfirm();
    function askDelete(r) { del.ask(r, function () { remove(r); }); }
    /* Create: this workspace's connections; Edit, the same as everywhere (user, 2026-11-09): the person's connections and
       their data sources, as Metrics lists them */
    var options = rows.filter(function (r) { return r.kind === 'conn'; }).map(function (c) {
      var g = rows.filter(function (x) { return x.kind === 'group' && x.prov === c.prov; })[0];
      return { id: c.name, label: c.name + (g ? ' (' + g.name + ')' : '') };
    });
    var allConns = (IK.WS_CONNECTIONS || []).map(function (c) { return { id: c.label, label: c.label + ' (' + c.name + ')' }; });
    var allSources = [];
    (IK.WS_CONNECTIONS || []).forEach(function (c) { if (!allSources.some(function (s) { return s.id === c.name; })) allSources.push({ id: c.name, label: c.name }); });
    function findDuplicates(name, alias) {
      var hit = { name: null, alias: null }, nm = norm(name), al = norm(alias);
      rows.forEach(function (r) {
        if (r.kind !== 'metric' || (dlg.editId && r.id === dlg.editId)) return;
        if (nm && norm(r.name) === nm) hit.name = r.name;
        if (al && norm(r.alias) === al) hit.alias = r.alias;
      });
      return hit;
    }
    /* a metric goes under its connection's sub-header, after the ones there, as a copy goes under its source */
    function placeUnder(x, made, c) {
      var lastOf = c ? rows.filter(function (r) { return r.kind === 'metric' && r.conn === c.id && r.id !== made.movedFrom; }).pop() : null;
      if (lastOf) { var after = lastOf.copyOf || lastOf.id; x.copies[after] = (x.copies[after] || []).concat([Object.assign(made, { copyOf: after })]); }
      else x.made.push(made);
    }
    function save(v) {
      var c = rows.filter(function (r) { return r.kind === 'conn' && r.name === v.connector; })[0];
      var prov = c ? (rows.filter(function (x) { return x.kind === 'group' && x.prov === c.prov; })[0] || {}).name : 'Custom';
      if (dlg.mode === 'edit') {
        var id = dlg.editId, was = rowOf(id);
        /* linked to a data source, or to a connection this workspace does not have: it no longer goes with this
           workspace, so it leaves the list */
        if (was && (v.link === 'datasource' || (v.connector && !c))) {
          change(function (x) { x.gone[id] = true; });
          if (open === id) setOpen(null);
          return;
        }
        /* another of its connections picked: the metric moves under it (user, 2026-11-09) */
        if (was && c && c.id !== was.conn) {
          var moved = Object.assign({}, baseOf(id) || was, mine.edits[id] || {}, { id: 'moved-' + (n.current++), movedFrom: id, copyOf: undefined,
            name: v.name, alias: v.alias, desc: v.def, summary: v.def, connector: v.connector, prov: c.prov, conn: c.id, provider: prov, active: was.active });
          change(function (x) { x.gone[id] = true; placeUnder(x, moved, c); });
          if (open === id) setOpen(moved.id);
          return;
        }
        change(function (x) { x.edits[id] = Object.assign({}, x.edits[id], { name: v.name, alias: v.alias, desc: v.def, summary: v.def, connector: v.connector || undefined }); });
        return;
      }
      var made = { kind: 'metric', id: 'new-' + (n.current++), prov: c ? c.prov : 'custom', conn: c ? c.id : undefined, name: v.name, alias: v.alias,
        desc: v.def, summary: v.def, custom: true, active: false, readOnly: true, connector: v.connector || undefined, provider: prov };
      change(function (x) { placeUnder(x, made, c); });
      toggle(made, false);
    }

    var cur = open ? rowOf(open) : null;
    var item = cur ? (function () {
      var cid = connId(cur), where = p.ws && cid ? IK.wsWhereShared(p.ws.list, cid) : [];
      return Object.assign({}, cur, { kind: p.owner ? (cur.custom ? 'custom' : 'builtin') : 'readonly', logo: cur.provider },
        p.owner ? { wsNames: where.map(function (w) { return w.name; }), links: IK.wsLinks(where) } : {});
    })() : null;

    /* the Metrics page's toolbar: the search over the filters' row — the chips and the Provider, Active only at its end */
    return h('div', { className: 'flex flex-col gap-4' },
      h('div', { className: 'flex flex-col gap-4' },
        h(D.SearchInput, { value: q, onValueChange: setQ, onClear: function () { setQ(''); }, placeholder: 'Search metrics...', 'aria-label': 'Search metrics' }),
        h('div', { className: 'flex flex-wrap items-center gap-x-1.5 gap-y-2' },
          h('div', { className: 'flex min-w-0 flex-1 items-center gap-2' },
            h('div', { className: 'min-w-0 flex-1' }, h(D.FilterChips, {
              value: type, onValueChange: function (v) { setType(v || 'all'); },
              items: [{ value: 'all', label: 'All' }, { value: 'builtin', label: 'Built-in' }, { value: 'custom', label: 'Custom' }]
            })),
            provPill),
          p.owner ? h('div', { className: 'ms-auto flex flex-none items-center gap-4' },
            h(D.Switch, { size: 'sm', label: 'Active only', labelPosition: 'left', gap: 'sm', checked: activeOnly, onCheckedChange: setActiveOnly })) : null)),
      any ? h(IK.MxMetricsTable, { rows: rows, hidden: hidden, collapsed: collapsed, selected: open, onActive: p.owner ? toggle : undefined,
          /* the Owner adds a metric as on Metrics: Create metric */
          onAdd: p.owner ? function (r) {
            var c = r && r.kind === 'conn' ? { id: r.wsConn || connId(r), label: r.name } : null;
            if (p.onCreate) p.onCreate(c); else setDlg({ open: true, mode: 'create', initial: {}, target: c ? { kind: 'connection', name: c.label } : null });
          } : undefined,
          onEdit: p.owner ? function (r) { setDlg({ open: true, mode: 'edit', editId: r.id, initial: { name: r.name, alias: norm(r.alias), def: r.desc, connector: r.connector || '', link: 'connection' } }); } : undefined,
          onDuplicate: p.owner ? duplicate : undefined,
          onDelete: p.owner ? askDelete : undefined,
          onOpen: function (r) { setOpen(r.id); },
          onToggleGroup: function (prov) { var x = Object.assign({}, collapsed); x[prov] = !x[prov]; setCollapsed(x); } })
        : h(D.StatusView, { size: 'lg', surface: 'embedded', withIconHalo: false, role: 'status', icon: h(D.EmptyStateIllustration),
            title: 'No matches found', description: 'No metrics match your search or filters — try a different term or clear them' }),
      /* the Metrics page's panel */
      h(IK.MetricDetails, Object.assign({ metric: item, onOpenChange: function (v) { if (!v) setOpen(null); } }, !item ? {} : (function (m) {
            var cid = connId(m);
            return { free: !!p.free, renewal: p.ws && m.ws ? IK.wsRenewal(p.ws, [m.ws.id]) : null,
              onActive: function (v) { toggle(m, v); },
              onEdit: function () { setDlg({ open: true, mode: 'edit', editId: m.id, initial: { name: m.name, alias: norm(m.alias), def: m.desc, connector: m.connector || '', link: 'connection' } }); },
              onDuplicate: function () { duplicate(m); setOpen(null); },
              onDelete: function () { askDelete(m); },
              workspaces: !!p.owner, shareLocked: !!p.free,
              onOpenConnection: p.owner && cid && p.onOpenConnection ? function () { p.onOpenConnection(cid); } : undefined };
          })(item))),
      p.owner ? del.dialog : null,
      p.owner ? h(IK.MxMetricDialog, {
        open: !!dlg.open, mode: dlg.mode, initial: dlg.initial, target: dlg.target, connectionOnly: dlg.mode !== 'edit',
        options: dlg.mode === 'edit' ? allConns : options, sources: allSources, findDuplicates: findDuplicates, onSave: save,
        onOpenChange: function (v) { setDlg(function (d) { return Object.assign({}, d, { open: v }); }); }
      }) : null);
  };
})();
