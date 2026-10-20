(function () {
  var IK = window.InsightisKit, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: p.data || 'filled' }); return p.render(ws); }
  function noop() {}
  function O(ws, w, owner) {
    return h(IK.WsOverview, { ws: w, me: ws.me, owner: owner, onTab: noop, onRename: noop, onAdd: noop, onInvite: noop, onShareFiles: noop, onConnection: noop, onDelete: noop, onLeave: noop });
  }
  IK.story('WsOverview', { title: 'Owner — four tiles (a gear opens the tab), the Connections list, Delete workspace', render: function () {
    return h(World, { render: function (ws) { return O(ws, ws.owned[0], true); } });
  } });
  IK.story('WsOverview', { title: 'Owner, nothing yet — "+" on the empty tiles adds the first one', render: function () {
    return h(World, { data: 'empty', render: function (ws) { return O(ws, ws.owned[0], true); } });
  } });
  IK.story('WsOverview', { title: 'Invited — read-only: a chevron opens each tab, no pencil; Leave workspace last', render: function () {
    return h(World, { render: function (ws) { return O(ws, ws.shared[0], false); } });
  } });
})();
