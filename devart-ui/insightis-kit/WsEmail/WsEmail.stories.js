(function () {
  var IK = window.InsightisKit, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: 'filled', names: p.names }); return p.render(ws); }
  IK.story('WsEmail', { title: 'Invitation — who, which workspace, sign in or create an account with this email, the expiry', render: function () {
    return h(World, { render: function (ws) { var inv = IK.wsInvitation({}); return h(IK.WsEmail, { kind: 'invitation', ws: inv, from: inv.owner, to: ws.me.email, expires: Date.now() + 14 * 864e5 }); } });
  } });
  IK.story('WsEmail', { title: 'Renewal request — a Member asks the Owner of a Blocked workspace to renew (long names wrap)', render: function () {
    return h(World, { names: 'long', render: function (ws) { var w = ws.shared[0]; return h(IK.WsEmail, { kind: 'renewal', ws: w, from: ws.me, to: w.owner.email }); } });
  } });
})();
