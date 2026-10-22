(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: 'filled', others: p.others }); return p.render(ws); }
  function toast(t) { return function (id) { D.toast(t + ' ' + id); }; }
  IK.story('WsConnections', { title: 'Owner — Data Sources’ cells (+ Add Metric, Last check ↻ and Details) and ⋮, with Remove from Workspace', render: function () {
    return h(World, { render: function (ws) {
      var w = ws.owned[0];
      return h(IK.WsConnections, { variant: 'workspace', onOpen: function () {},
        connections: w.connections.map(function (c) { return { id: c.id, name: c.name, label: c.label, metrics: c.metrics, lastSync: c.lastSync, status: c.status, error: c.error }; }),
        onEdit: toast('Edit'), onTest: toast('Test'), onDetails: toast('Details'), onDisconnect: toast('Disconnect'), onAddMetric: toast('Add Metric'),
        onAddToWorkspace: toast('Share'), onRemoveHere: toast('Remove from Workspace') });
    } });
  } });
  IK.story('WsConnections', { title: 'Shared with you — the Workspace column (links), no actions; a Blocked workspace’s muted', render: function () {
    return h(World, { others: 'blocked', render: function (ws) { return h(IK.WsConnections, { variant: 'shared', connections: IK.wsSharedConnections(ws.list), onOpen: function () {} }); } });
  } });
  IK.story('WsConnections', { title: 'Unavailable on the plan — the plan’s padlock in Metrics', render: function () {
    return h(World, { render: function (ws) { return h(IK.WsConnections, { variant: 'shared', connections: IK.wsSharedConnections(ws.list, { locked: true }) }); } });
  } });
})();
