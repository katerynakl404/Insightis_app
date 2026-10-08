(function () {
  var IK = window.InsightisKit, R = window.React, h = IK.h;
  var FILES = [
    ['quarterly-report.csv', 'csv', 'artifact', '2.4 MB', '3d ago'], ['customer-data.xlsx', 'xlsx', 'uploaded', '890 KB', 'last week'],
    ['sales-metrics.xls', 'xls', 'uploaded', '1.1 MB', '2 weeks ago'], ['revenue-forecast.xlsx', 'xlsx', 'artifact', '1.6 MB', '3 weeks ago']
  ].map(function (r, i) { return { id: 'f' + (i + 1), name: r[0], type: r[1], origin: r[2], size: r[3], date: r[4], selected: false }; });
  function log(a, id) { console.log('[story]', a, id); }
  function Live(p) {
    var s = R.useState(p.files || FILES), files = s[0], setFiles = s[1];
    var e = R.useState(!!p.editing), editing = e[0], setEditing = e[1];
    var pv = R.useState(p.previewId || null), previewId = pv[0], setPreview = pv[1];
    var d = R.useState(p.sortDir || 'desc'), sortDir = d[0], setSort = d[1];
    var n = files.filter(function (f) { return f.selected; }).length;
    return h(IK.DsFilesTable, {
      files: sortDir === 'asc' ? files.slice().reverse() : files, editing: editing, previewId: previewId, sortDir: sortDir,
      layout: p.layout, empty: p.empty,
      allState: n && n === files.length ? true : n ? 'indeterminate' : false,
      onSort: function () { setSort(sortDir === 'asc' ? 'desc' : 'asc'); },
      onToggle: function (id) { setFiles(files.map(function (f) { return f.id === id ? Object.assign({}, f, { selected: !f.selected }) : f; })); setEditing(true); },
      onToggleAll: function () { var all = n === files.length; setFiles(files.map(function (f) { return Object.assign({}, f, { selected: !all }); })); setEditing(!all); },
      onOpen: setPreview, onAction: log, onBrowse: function () { log('browse'); }
    });
  }
  function sel(ids) { return FILES.map(function (f) { return ids.indexOf(f.id) !== -1 ? Object.assign({}, f, { selected: true }) : f; }); }
  function Narrow(p) { return h('div', { style: { maxWidth: '22rem' } }, p.children); }

  IK.story('DsFilesTable', { title: 'Table — rest (hover a row for its ⋮; click a row to preview it)', wide: true, render: function () { return h(Live, { layout: 'table' }); } });
  IK.story('DsFilesTable', { title: 'Table — two selected (header shows "some")', wide: true, render: function () { return h(Live, { layout: 'table', files: sel(['f1', 'f3']), editing: true }); } });
  IK.story('DsFilesTable', { title: 'Table — all selected', wide: true, render: function () { return h(Live, { layout: 'table', files: sel(['f1', 'f2', 'f3', 'f4']), editing: true }); } });
  IK.story('DsFilesTable', { title: 'Table — the previewed row (pressed, name highlighted)', wide: true, render: function () { return h(Live, { layout: 'table', previewId: 'f2' }); } });
  IK.story('DsFilesTable', { title: 'Table — Modified sorted oldest first', wide: true, render: function () { return h(Live, { layout: 'table', sortDir: 'asc' }); } });
  IK.story('DsFilesTable', { title: 'Empty library — the real table, one row: "No files yet" + Browse Files', wide: true, render: function () { return h(Live, { layout: 'table', files: [], empty: true }); } });
  IK.story('DsFilesTable', { title: 'Loading — chip ghosts, count ghost, 5 ghost rows', wide: true, render: function () { return h(IK.DsFilesSkeleton); } });
  IK.story('DsFilesTable', { title: 'Phone (< 768px) — card stack, ⋮ always shown', render: function () { return h(Narrow, null, h(Live, { layout: 'cards' })); } });
  IK.story('DsFilesTable', { title: 'Phone — selecting: the checkbox column slides in', render: function () { return h(Narrow, null, h(Live, { layout: 'cards', files: sel(['f2']), editing: true })); } });
  IK.story('DsFilesTable', { title: 'Phone — the previewed card', render: function () { return h(Narrow, null, h(Live, { layout: 'cards', previewId: 'f1' })); } });
  IK.story('DsFilesTable', { title: 'Row menu — open', render: function () {
    return h('div', { className: 'flex justify-end', style: { minHeight: '11rem' } }, h(IK.DsFileMenu, { id: 'f1', defaultOpen: true, onAction: log }));
  } });
})();
