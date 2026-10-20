(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: p.data || 'filled', names: p.names, plan: p.plan }); return p.render(ws); }
  function noop() {}
  function M(ws, w, extra) { return h(IK.WsMembers, Object.assign({ ws: w, me: ws.me, onRemove: noop, onResend: noop, onRevoke: noop }, extra)); }
  IK.story('WsMembers', { title: 'One list — invitations first (expiry under the email), the Owner, members; search + All · Members · Invited', render: function () {
    return h(World, { render: function (ws) { return M(ws, ws.owned[0]); } });
  } });
  IK.story('WsMembers', { title: 'Many — 20 at a time + Load more', render: function () {
    return h(World, { data: 'many', render: function (ws) { return M(ws, ws.owned[0]); } });
  } });
  IK.story('WsMembers', { title: 'Blocked — invitations "Can’t be accepted now", Resend locked, Revoke / Remove work', render: function () {
    return h(World, { plan: 'free', render: function (ws) { return M(ws, ws.owned[0]); } });
  } });
  IK.story('WsMembers', { title: 'Only the Owner — "Only you so far" + Invite Members', render: function () {
    return h(World, { render: function (ws) {
      var w = ws.owned.filter(function (x) { return x.members.length === 1 && !x.invites.length; })[0] || Object.assign({}, ws.owned[0], { members: [ws.owned[0].owner], invites: [] });
      return M(ws, w, { emptyAction: h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'ws-users' }) }, 'Invite Members') });
    } });
  } });
})();
