(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: 'filled', others: p.others }); return p.render(ws); }
  IK.story('WsConnections', { title: 'Owner — the workspace’s connections; ⋮ Remove from Workspace', render: function () {
    return h(World, { render: function (ws) {
      var w = ws.owned[0];
      return h(IK.WsConnections, { variant: 'workspace', onOpen: function () {},
        connections: w.connections.map(function (c) { return { id: c.id, name: c.name, label: c.label, metrics: c.metrics }; }),
        menu: function () { return h(D.RowMenuButton, { reveal: false }, h(D.DropdownMenuItem, { variant: 'danger' }, h(IK.Icon, { name: 'ws-remove', size: 16 }), 'Remove from Workspace')); } });
    } });
  } });
  IK.story('WsConnections', { title: 'Shared with you — the Workspace column (links), no actions; a Blocked workspace’s muted', render: function () {
    return h(World, { others: 'blocked', render: function (ws) { return h(IK.WsConnections, { variant: 'shared', connections: IK.wsSharedConnections(ws.list), onOpen: function () {} }); } });
  } });
  IK.story('WsConnections', { title: 'Unavailable on the plan — the plan’s padlock in Metrics', render: function () {
    return h(World, { render: function (ws) { return h(IK.WsConnections, { variant: 'shared', connections: IK.wsSharedConnections(ws.list, { locked: true }) }); } });
  } });
})();
