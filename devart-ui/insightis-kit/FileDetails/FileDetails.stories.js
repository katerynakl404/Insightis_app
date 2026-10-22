(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  var CSV = { id: 'f1', name: 'quarterly-report.csv', size: '2.4 MB', origin: 'artifact', date: 'Oct 19, 2026', sharedWith: ['Sales'] };
  function toast(t) { return function () { D.toast(t); }; }
  var OPTS = { onDownload: toast('Download started'), onAddToChat: toast('Added to a new chat'), onDelete: toast('Delete'), onShare: toast('Share via Workspace'),
    onRemoveFromWorkspace: function (it) { D.toast('Removed from ' + it.name); } };
  function Panel(f, o) { return h(IK.FileDetails, Object.assign({ file: f, inline: true, style: { width: '28rem', maxWidth: '100%', height: '36rem' } }, OPTS, o)); }

  IK.story('FileDetails', { title: 'One’s own CSV — the preview first', description: 'Download in the head, the ⋮: Add to Chat · Share via Workspace · Delete; the facts and Workspaces fold under Details; the truncated strip on top of the sample.', render: function () {
    return Panel(CSV);
  } });
  IK.story('FileDetails', { title: 'JSON — the text preview', render: function () {
    return Panel(Object.assign({}, CSV, { id: 'f2', name: 'comments.json', size: '62 KB', origin: 'uploaded', sharedWith: [] }));
  } });
  IK.story('FileDetails', { title: 'PDF — no preview, Download', render: function () {
    return Panel(Object.assign({}, CSV, { id: 'f3', name: 'Campaign brief.pdf', size: '1.1 MB', origin: 'uploaded', sharedWith: [] }));
  } });
  IK.story('FileDetails', { title: 'Shared with you — no Delete', description: 'Who shared it and where, under Details.', render: function () {
    return Panel(Object.assign({}, CSV, { by: 'Olena Petrenko', wsNames: ['Marketing'], sharedWith: null }), { onDelete: null, onShare: null, onRemoveFromWorkspace: null });
  } });
  IK.story('FileDetails', { title: 'Shared with you, unavailable', description: 'No preview, no Download: why, and the way back.', render: function () {
    return Panel(Object.assign({}, CSV, { by: 'Olena Petrenko', wsNames: ['Marketing'], sharedWith: null, muted: true }),
      { onDelete: null, onShare: null, renewal: { blocked: true, owners: ['Olena Petrenko'], request: toast('Email sent to Olena Petrenko') } });
  } });
  IK.story('FileDetails', { title: 'Free plan — Share via Workspace locked', render: function () {
    return Panel(CSV, { shareLocked: true });
  } });
  IK.story('FileDetails', { title: 'Phone (< 1024px) — the preview covers the list', description: 'On the page the column covers the list below 1024px; its grip is gone there.', render: function () {
    return h('div', { className: 'w-80' }, Panel(CSV, { style: { width: '100%', height: '30rem' } }));
  } });
})();
