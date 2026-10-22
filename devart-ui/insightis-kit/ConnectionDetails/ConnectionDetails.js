/* ConnectionDetails — Connection details: DevartUI-built IK.DetailsPanel filled from a connection — its mark, name and
   source, description, Metrics (Add Metric), Last check (Test Connection), Workspaces (Share via Workspace, out of one
   with ×), Edit · Disconnect; a shared one: who shared it and where, read-only, its warning when it can't be used.
   One panel on Data Sources, Metrics (over a metric's) and a workspace's page. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  /* DetailsPanel's helpers, read when a panel is built (DetailsPanel.js may load after this file) */
  function k(n) { return function () { return IK.detailsKit[n].apply(null, arguments); }; }
  var act = k('act'), call = k('call'), plural = k('plural'), shareBtn = k('shareBtn'), lockBtn = k('lockBtn');

  /* a connection — o: { mode: null | 'shared' | 'workspace', free, metricsHref(c), onEdit, onDisconnect, onTest,
     onDetails, onAddMetric, onAddToWorkspace, wsLocked, onRemove(c), renewal, onMetrics(c) }
     onMetrics   the metric count as a link that acts in place (on Metrics: its Provider filter) instead of metricsHref —
                 the panel is the same wherever it opens (user, 2026-10-22: "ідентичні панелі юзати без прив'язки до місця") */
  IK.connectionDetails = function (c, o) {
    o = o || {};
    /* own — one's own connection: on Data Sources (no mode) and on its workspace page, where the Owner has every action
       it has elsewhere and Remove from Workspace (user, 2026-10-21) */
    var mode = o.mode || null, own = !mode || mode === 'workspace', free = !!o.free, off = mode === 'shared' && !!(c.locked || c.muted);
    var n = c.metrics, href = o.metricsHref ? o.metricsHref(c) : null, canAdd = own && !!o.onAddMetric;
    var count = n ? plural(n, 'metric', 'metrics') : null;
    var metrics = n == null ? null : !n && canAdd
      /* none yet: Add Metric itself, as the product's panel */
      ? { label: 'Metrics', value: lockBtn({ feature: 'metrics', locked: free }, h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'plus', size: 16 }), onClick: call(o.onAddMetric, c.name) }, 'Add Metric')) }
      : { label: 'Metrics', value: n ? (o.onMetrics && !off ? h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); o.onMetrics(c); } }, count)
          : href && !off ? h(D.LinkButton, { href: href }, count) : count) : 'No metrics',
          action: n && canAdd ? { icon: 'plus', label: 'Add Metric', onClick: call(o.onAddMetric, c.name), locked: free, lockFeature: 'metrics' } : null };
    var check = c.lastSync == null ? null : { label: 'Last check', value: h(IK.DsLastCheck, { lastSync: c.lastSync, status: c.status, error: c.error, busy: c.busy,
      onDetails: call(o.onDetails, c.name), onTest: free || !own || !o.onTest ? undefined : call(o.onTest, c.name) }) };
    var access = !mode ? (o.onAddToWorkspace || (c.sharedWith && c.sharedWith.length)
        ? { names: c.sharedWith || [], links: c.links, onRemove: o.onRemoveFromWorkspace ? function (it) { o.onRemoveFromWorkspace(it, c); } : undefined,
            action: o.onAddToWorkspace ? shareBtn('Share via Workspace', o.wsLocked, call(o.onAddToWorkspace, c.name)) : null } : null)
      : mode === 'shared' ? { names: c.wsNames || (c.wsName ? [c.wsName] : []), links: c.links }
      : mode === 'workspace' ? { names: [c.wsName].concat(c.also || []).filter(Boolean), links: c.links,
          onRemove: o.onRemoveFromWorkspace ? function (it) { o.onRemoveFromWorkspace(it, c); } : undefined,
          action: o.onAddToWorkspace ? shareBtn('Share via Workspace', o.wsLocked, call(o.onAddToWorkspace, c.name)) : null } : null;
    return {
      title: 'Connection details',
      mark: h(IK.ConnectorMark, { connector: c.connector || c.name, size: 'md' }), name: c.label || c.name, meta: c.name,
      after: off ? h(IK.WsUnavailableMark, { by: c.by, locked: !c.muted, noun: 'connections', feature: 'connections', renewal: o.renewal, withAction: true }) : null,
      description: c.desc ? { label: 'Description', text: c.desc } : null,
      rows: [metrics, check], access: access,
      /* acts: false — opened over another panel (a metric's), where it is looked at and shared, not edited */
      acts: own && o.acts !== false ? { main: [act('Edit', 'rename', { feature: 'connection-edit', locked: free, onClick: call(o.onEdit, c.name) })], danger: [act('Disconnect', 'disconnect', { onClick: call(o.onDisconnect, c.name) })],
          specific: mode === 'workspace' && o.onRemove ? [act('Remove from Workspace', 'ws-remove', { danger: true, onClick: call(o.onRemove, c) })] : [] } : null
    };
  };

  /* IK.ConnectionDetails — the one Connection details, the same wherever it opens (user, 2026-10-22: "всі панелі не залежно від місця мали
     виглядати однаково!"); only the handlers come from the page.
       h(IK.ConnectionDetails, { connection, onOpenChange, …options })   a Sheet; connection null → closed — it keeps the last one, and its
                                                              options, while it slides out
       h(IK.ConnectionDetails, { connection, inline: true, style, …options })   in place (stories, the concept page)
     options: what IK.connectionDetails(connection, options) takes (above) */
  IK.ConnectionDetails = function ConnectionDetails(p) {
    var last = R.useRef(null);
    var o = Object.assign({}, p);
    ['connection', 'onOpenChange', 'inline', 'style', 'className'].forEach(function (x) { delete o[x]; });
    if (p.connection) last.current = { it: p.connection, o: o };
    if (!last.current) return null;
    var props = IK.connectionDetails(last.current.it, p.connection ? o : last.current.o);
    if (p.inline) return h(IK.DetailsPanel, Object.assign({ inline: true, style: p.style, className: p.className }, props));
    return h(IK.DetailsPanel, Object.assign({ open: !!p.connection, onOpenChange: p.onOpenChange }, props));
  };
})();
