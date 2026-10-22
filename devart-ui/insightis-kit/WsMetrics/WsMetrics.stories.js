(function () {
  var IK = window.InsightisKit, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: 'filled', others: p.others }); return p.render(ws); }
  IK.story('WsMetrics', { title: 'Owner — the Metrics page’s toolbar (search, type, Provider, Active only), the switch and ⋮, Add Metric on the source', render: function () {
    return h(World, { render: function (ws) { return h(IK.WsMetrics, { rows: IK.wsOwnMetricRows(ws.owned[0]), owner: true, ws: ws, onCreate: function () { window.DevartUI.toast('Create metric'); } }); } });
  } });
  IK.story('WsMetrics', { title: 'Shared with you — read-only groups; a collided alias reads long (@mrr_growth__a3f9c1)', render: function () {
    return h(World, { render: function (ws) { return h(IK.WsMetrics, { rows: IK.wsMetricRows(ws.list, { own: ['@mrr_growth'] }) }); } });
  } });
  IK.story('WsMetrics', { title: 'Unavailable on the plan · a Blocked workspace’s muted', render: function () {
    return h(World, { others: 'blocked', render: function (ws) { return h(IK.WsMetrics, { rows: IK.wsMetricRows(ws.list, { locked: true }) }); } });
  } });
})();
