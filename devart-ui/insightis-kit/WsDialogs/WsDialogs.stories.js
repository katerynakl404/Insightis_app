(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Opener(p) {
    var s = R.useState(false), open = s[0], setOpen = s[1];
    var ws = IK.useWorkspaces({ data: 'filled' });
    return h(IK.Fragment, null,
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setOpen(true); } }, p.label),
      p.render(open, setOpen, ws));
  }
  function close(set) { return function () { set(false); }; }
  IK.story('WsDialogs', { title: 'Create workspace — a name is required; a duplicate among yours is refused', render: function () {
    return h(Opener, { label: 'Create Workspace', render: function (o, set, ws) {
      return h(IK.WsCreateDialog, { open: o, onOpenChange: set, taken: function (n) { return IK.wsNameTaken(ws.list, n); }, onCreate: close(set) });
    } });
  } });
  IK.story('WsDialogs', { title: 'Invite members — email only, always a Member', render: function () {
    return h(Opener, { label: 'Invite Members', render: function (o, set, ws) {
      return h(IK.WsInviteDialog, { open: o, onOpenChange: set, ws: ws.owned[0], check: function () { return null; }, onInvite: close(set) });
    } });
  } });
  IK.story('WsDialogs', { title: 'Add connections — where each is already shared, then "N metric definitions will become visible"', render: function () {
    return h(Opener, { label: 'Add Connection', render: function (o, set, ws) {
      var w = ws.owned[0];
      return h(IK.WsAddConnectionsDialog, { open: o, onOpenChange: set, ws: w, connections: IK.WS_CONNECTIONS, onAdd: close(set),
        where: function (cid) { return IK.wsWhereShared(ws.list, cid).filter(function (x) { return x.id !== w.id; }).map(function (x) { return x.name; }); } });
    } });
  } });
  IK.story('WsDialogs', { title: 'Share files with a workspace', render: function () {
    return h(Opener, { label: 'Add Files', render: function (o, set, ws) {
      return h(IK.WsShareFilesDialog, { open: o, onOpenChange: set, ws: ws.owned[0], files: IK.WS_FILES, onShare: close(set) });
    } });
  } });
  IK.story('WsDialogs', { title: 'Share a file with workspaces (from Files) — + Create Workspace in place', render: function () {
    return h(Opener, { label: 'Share via Workspace', render: function (o, set, ws) {
      return h(IK.WsShareFileDialog, { open: o, onOpenChange: set, files: [IK.WS_FILES[0]], workspaces: ws.owned, onShare: close(set),
        taken: function (n) { return IK.wsNameTaken(ws.list, n); }, onCreate: function (n) { return ws.create(n); } });
    } });
  } });
})();
