(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: p.data || 'filled', names: p.names, others: p.others }); return p.render(ws); }
  function List(p) {
    var s = R.useState([]);
    return h(IK.WsList, Object.assign({ selected: s[0], onSelect: s[1], onRename: function () {}, onDelete: function () {}, onConnection: function () {},
      onAct: function () {}, onRenew: function () {},
      createButton: h(D.Button, { variant: 'primary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'plus' }) }, 'Create Workspace') }, p));
  }
  IK.story('WsList', { title: 'Own and invited in one list — own rows tick, invited ones can’t (the owner deletes)', render: function () {
    return h(World, { render: function (ws) { return h(List, { workspaces: ws.owned.concat(ws.shared) }); } });
  } });
  IK.story('WsList', { title: 'Long names — truncate, the whole name in a tooltip', render: function () {
    return h(World, { names: 'long', render: function (ws) { return h(List, { workspaces: ws.owned.concat(ws.shared) }); } });
  } });
  IK.story('WsList', { title: 'Invited Blocked — the mark + Ask … to Renew in the ⋮', render: function () {
    return h(World, { others: 'blocked', render: function (ws) { return h(List, { workspaces: ws.owned.concat(ws.shared) }); } });
  } });
  IK.story('WsList', { title: 'Empty — a welcome (what a workspace gives) + Create Workspace; no match — "No matches found"', render: function () {
    return h('div', { className: 'flex flex-col gap-6' }, h(List, { workspaces: [] }),
      h(World, { render: function (ws) { return h(List, { workspaces: ws.owned, query: 'zzz' }); } }));
  } });
})();
