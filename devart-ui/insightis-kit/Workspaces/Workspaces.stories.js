(function () {
  var IK = window.InsightisKit, R = window.React, h = IK.h;
  function Col(p) { return h('div', { className: 'flex max-w-3xl flex-col gap-3' }, p.children); }
  function World(p) { var ws = IK.useWorkspaces({ data: p.data || 'filled', names: p.names, others: p.others }); return p.render(ws); }

  IK.story('Workspaces', { title: 'WsNotice — the Owner: Blocked (the upgrade in the sentence) · Restored · the trial heads-up', render: function () {
    return h(World, { render: function (ws) {
      var w = ws.owned[0];
      return h(Col, null,
        h(IK.WsNotice, { kind: 'blocked-owner', ws: w, onDismiss: function () {} }),
        h(IK.WsNotice, { kind: 'restored', ws: w, onDismiss: function () {} }),
        h(IK.WsNotice, { kind: 'trial', owned: [w.name], sharedFrom: ['Marketing'], counts: { connections: 2, metrics: 6, files: 2 }, onDismiss: function () {} }));
    } });
  } });
  IK.story('Workspaces', { title: 'WsNotice — a Member: Blocked (Ask … to Renew → Request Sent; grouped at 2 and at 3+, one owner or several) · unavailable on the plan', render: function () {
    return h(World, { render: function (ws) {
      var w = ws.shared[0];
      return h(Col, null,
        h(IK.WsNotice, { kind: 'blocked-member', ws: w, onRequest: function () {} }),
        h(IK.WsNotice, { kind: 'blocked-member', ws: Object.assign({}, w, { requested: true }), onDismiss: function () {} }),
        /* grouped: two of one owner's, then three across two owners */
        h(IK.WsNotice, { kind: 'blocked-member', ws: w, list: [w, Object.assign({}, w, { id: 'b2', name: 'Brand' })], onRequest: function () {}, onDismiss: function () {} }),
        h(IK.WsNotice, { kind: 'blocked-member', ws: w, onRequest: function () {}, onDismiss: function () {}, list: [w, Object.assign({}, w, { id: 'b2', name: 'Brand' }),
          Object.assign({}, w, { id: 'b3', name: 'Finance', owner: { name: 'Mark Shevchenko', email: 'mark@example.com' } })] }),
        h(IK.WsNotice, { kind: 'shared-plan', module: 'Connectors', feature: 'connections', onDismiss: function () {} }));
    } });
  } });
  IK.story('Workspaces', { title: 'The invitation: pending — a notice with Accept · another address · expired · the workspace unavailable — toasts with their action', render: function () {
    return h(World, { render: function (ws) {
      var inv = IK.wsInvitation({}), D = window.DevartUI;
      function btn(label, state) { return h(D.Button, { key: state, variant: 'secondary', size: 'sm', type: 'button', onClick: function () { IK.wsInvitationToast(ws, inv, state); } }, label); }
      return h(Col, null,
        h(IK.WsNotice, { kind: 'invited', ws: inv, onAccept: function () {} }),
        h('div', { className: 'flex flex-wrap gap-2' }, btn('Another address', 'wrong'), btn('Expired', 'expired'), btn('Unavailable', 'blocked')));
    } });
  } });
  IK.story('Workspaces', { title: 'WsSharedBy · WsNames — the workspace(s), each a link; long names truncate (the whole text in a tooltip)', render: function () {
    return h('div', { className: 'flex w-64 flex-col gap-2' },
      h(IK.WsSharedBy, { by: 'Olena Petrenko', ws: 'Marketing' }),
      h(IK.WsSharedBy, { ws: 'Marketing analytics and campaign performance — EMEA regional team' }),
      h(IK.WsNames, { names: ['Marketing', 'Brand'], links: { Marketing: '#', Brand: '#' }, className: 'text-sm' }));
  } });
/* the shared-items parts added 2026-10-20 — every state */
  IK.story('Workspaces', { title: 'wsOwnerOptions — the Owner filter (DevartUI FilterMenu): Anyone · Me · Shared with me, each with its count, (0) too', render: function () {
    var D = window.DevartUI;
    function noop() {}
    return h('div', { className: 'flex flex-col gap-6' },
      h('div', { className: 'flex flex-wrap items-center gap-2' },
        h(D.FilterMenu, { label: 'Owner', value: 'any', onValueChange: noop, options: IK.wsOwnerOptions({ me: 4, shared: 4 }) }),
        h(D.FilterMenu, { label: 'Owner', value: 'shared', onValueChange: noop, options: IK.wsOwnerOptions({ me: 4, shared: 4 }) })),
      h('div', { className: 'min-h-40' }, h(D.FilterMenu, { label: 'Owner', value: 'any', onValueChange: noop, options: IK.wsOwnerOptions({ me: 6, shared: 0 }), defaultOpen: true })));
  } });
  IK.story('Workspaces', { title: 'wsAlertStack — the notices in DevartUI AlertStack: a deck (the edges open it) · opened: Show Less', render: function () {
    return h(World, { others: 'blocked', render: function (ws) {
      var w = ws.owned[0];
      var a = [h(IK.WsNotice, { key: 'r', kind: 'restored', ws: w, onDismiss: function () {} }), h(IK.WsNotice, { key: 'b', kind: 'blocked-owner', ws: w, onDismiss: function () {} })];
      var b = a.concat([h(IK.WsNotice, { key: 't', kind: 'trial', owned: [w.name], sharedFrom: ['Marketing'], counts: { connections: 2, metrics: 6, files: 2 }, onDismiss: function () {} })]);
      return h(Col, null, IK.wsAlertStack(a), IK.wsAlertStack(b));
    } });
  } });
  IK.story('Workspaces', { title: 'WsAccess — the end of every details panel: one’s own (Shared in + Share via Workspace; not shared: —) · shared with you (Shared by · Shared in) · on its own workspace page (Shared by only)', render: function () {
    var share = h(IK.Locked, { feature: 'workspaces', locked: false }, h(window.DevartUI.Button, { variant: 'secondary', size: 'sm', type: 'button' }, 'Share via Workspace'));
    return h('div', { className: 'flex max-w-sm flex-col gap-6' },
      h(IK.WsAccess, { names: ['Sales', 'Support'], action: share }),
      h(IK.WsAccess, { names: [], action: share }),
      h(IK.WsAccess, { by: 'Olena Petrenko', names: ['Marketing analytics — EMEA regional team', 'Brand'] }),
      h(IK.WsAccess, { by: 'Olena Petrenko', inLabel: false }));
  } });
  IK.story('Workspaces', { title: 'WsUnavailableMark · WsUnavailableNote — a shared item that can’t be used: the owner’s plan lapsed (Ask … to Renew → Request Sent) · not on your plan (Upgrade to Starter; no mark on the row — the page’s plan alert says it)', render: function () {
    return h('div', { className: 'flex max-w-sm flex-col gap-4' },
      h('div', { className: 'flex items-center gap-2 text-sm font-medium' }, 'Campaigns HubSpot', h(IK.WsUnavailableMark, { by: 'Olena Petrenko' })),
      h(IK.WsUnavailableNote, { by: 'Olena Petrenko', renewal: { blocked: true, owners: ['Olena Petrenko'], request: function () {} } }),
      h(IK.WsUnavailableNote, { by: 'Olena Petrenko', renewal: { blocked: true, owners: ['Olena Petrenko'], requested: true } }),
      h(IK.WsUnavailableNote, { locked: true, noun: 'connections', feature: 'connections' }),
      /* both: the owner's plan lapsed and the person's own is Free — Ask Owner to Renew, one's own plan a quieter line */
      h(IK.WsUnavailableNote, { by: 'Olena Petrenko', free: true, noun: 'connections', feature: 'connections', renewal: { blocked: true, owners: ['Olena Petrenko'], request: function () {} } }));
  } });
})();
