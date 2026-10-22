(function () {
  var IK = window.InsightisKit, h = IK.h;
  function World(p) { var ws = IK.useWorkspaces({ data: p.data || 'filled', others: p.others }); return p.render(ws); }
  function log(a, ids) { console.log('[story]', a, ids); }
  function own(w) {
    return w.files.map(function (f) { return { id: f.id, name: f.name, type: f.type, origin: f.kind, size: f.size, date: IK.wsFmtDate(f.date), time: f.date }; });
  }
  IK.story('WsFiles', { title: 'Owner — All · Artifacts · Uploaded; ⋮ and Select all → Share via Workspace · Download · Remove from Workspace · Delete', render: function () {
    return h(World, { data: 'many', render: function (ws) { return h(IK.WsFiles, { files: own(ws.owned[0]), owner: true, onAction: log }); } });
  } });
  IK.story('WsFiles', { title: 'Owner on Free — Share via Workspace locked (padlock)', render: function () {
    return h(World, { render: function (ws) { return h(IK.WsFiles, { files: own(ws.owned[0]), owner: true, shareLocked: true, onAction: log }); } });
  } });
  IK.story('WsFiles', { title: 'Shared with you — who · which workspace; Add to Chat · Download', render: function () {
    return h(World, { render: function (ws) { return h(IK.WsFiles, { files: IK.wsSharedFiles(ws.list), caption: true, onAction: log }); } });
  } });
  IK.story('WsFiles', { title: 'Unavailable on the plan (padlock) · a Blocked workspace’s (muted) — nothing to tick', render: function () {
    return h(World, { others: 'blocked', render: function (ws) { return h(IK.WsFiles, { files: IK.wsSharedFiles(ws.list, { locked: true }), caption: true, onAction: log }); } });
  } });
})();
