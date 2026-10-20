/* WsFiles — files shared in a workspace, as the Files page lists them: the search (IK.WsSearch),
   FilterChips All · Artifacts · Uploaded, DevartUI ListSelectionBar (the count · Select all; once a file
   is ticked "N selected" + the bulk actions), IK.DsFilesTable, 20 at a time + Load more, "No matches
   found" (user, 2026-10-19: "бракує балкових екшенів та пошуку").

     owner   a workspace page's Files tab: ⋮ Download · Remove from Workspace; bulk Download · Remove
     member  a workspace a person was invited to, and the Shared tab of Files: ⋮ View · Add to Chat ·
             Download, bulk Add to Chat · Download; caption: true → a Workspaces column (which
             workspaces it comes from — rows keep one height; user, 2026-10-19). A file with locked (unavailable on the plan) or muted (a Blocked
             workspace) can't be ticked; with none to tick there is no bar.

   h(IK.WsFiles, { files: [{ id, name, type, origin, size, date, time, by, wsName, locked, muted }],
     owner: bool, caption: bool, ownerCol: bool, onAction(action, ids) })   ownerCol — who shared each    action: view | add-to-chat | download | stop-sharing */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var PAGE = 20;

  IK.WsFiles = function WsFiles(p) {
    var owner = !!p.owner, all = p.files || [];
    var qs = R.useState(''), q = qs[0], setQ = qs[1];
    var fs = R.useState('all'), filter = fs[0], setFilter = fs[1];
    var ss = R.useState([]), sel = ss[0], setSel = ss[1];
    var ps = R.useState(PAGE), shown = ps[0], setShown = ps[1];
    var sd = R.useState('desc'), sortDir = sd[0], setSortDir = sd[1];
    R.useEffect(function () { setShown(PAGE); setSel([]); }, [q, filter]);

    var qq = q.trim().toLowerCase();
    var vis = all.filter(function (f) {
      return (filter === 'all' || f.origin === filter) && (!qq || f.name.toLowerCase().indexOf(qq) >= 0);
    }).sort(function (a, b) { var d = (a.time || 0) - (b.time || 0); return sortDir === 'asc' ? d : -d; });
    var pickable = vis.filter(function (f) { return !f.locked && !f.muted; });
    var picked = sel.filter(function (id) { return pickable.some(function (f) { return f.id === id; }); });
    var allSel = pickable.length > 0 && picked.length === pickable.length;
    var page = vis.slice(0, shown).map(function (f) { return Object.assign({}, f, { selected: picked.indexOf(f.id) >= 0 }); });
    function run(a) { var ids = picked; setSel([]); p.onAction(a, ids); }
    function bulkBtn(key, label, icon, variant) {
      return h(D.Button, { key: key, variant: variant || 'tertiary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: icon }), onClick: function () { run(key); } }, label);
    }

    var bulk = owner
      ? [bulkBtn('download', 'Download', 'download'), bulkBtn('stop-sharing', 'Remove', 'ws-remove', 'destructiveTertiary')]
      : [bulkBtn('add-to-chat', 'Add to Chat', 'add-chat'), bulkBtn('download', 'Download', 'download')];
    var bar = !vis.length || !pickable.length ? null : h(D.ListSelectionBar, {
      title: vis.length + (vis.length === 1 ? ' file' : ' files'),
      selectedText: picked.length + ' selected', selectedCount: picked.length, allSelected: allSel,
      exitSelectionLabel: 'Exit selection',
      onSelectAll: function () { setSel(pickable.map(function (f) { return f.id; })); },
      onClearSelection: function () { setSel([]); },
      rightSlot: picked.length ? h(IK.Fragment, null, bulk) : undefined
    });
    var left = vis.length - page.length;
    return h('div', { className: 'flex flex-col gap-3' },
      h(IK.WsSearch, { value: q, onChange: setQ, placeholder: 'Search files…', label: 'Search files' }),
      h('div', { className: 'flex flex-col gap-2' },
        h(D.FilterChips, {
          value: filter, onValueChange: function (v) { if (v) setFilter(v); },
          items: [{ value: 'all', label: 'All' }, { value: 'artifact', label: 'Artifacts' }, { value: 'uploaded', label: 'Uploaded' }]
        }),
        bar,
        vis.length ? h(IK.DsFilesTable, {
          files: page,
          selectable: pickable.length > 0, editing: picked.length > 0,
          allState: allSel ? true : picked.length ? 'indeterminate' : false,
          onToggle: function (id) { setSel(picked.indexOf(id) >= 0 ? picked.filter(function (x) { return x !== id; }) : picked.concat([id])); },
          onToggleAll: function () { setSel(allSel ? [] : pickable.map(function (f) { return f.id; })); },
          sortDir: sortDir, onSort: function () { setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); },
          menuItems: owner ? ['download', 'stop-sharing'] : ['view', 'add-to-chat', 'download'],
          wsCol: !!p.caption, ownerCol: !!p.ownerCol, tag: p.tag, ownerMark: p.ownerMark,
          onAction: function (a, id) { p.onAction(a, [id]); },
          /* a row opens the file's preview, as on Files (user, 2026-10-19: "файл натискається але нічого не відбувається") */
          onOpen: p.onOpen
        }) : h(IK.WsNoMatch, { description: qq ? 'No files match “' + q.trim() + '” — try a different search' : 'No files match this filter — switch back to All' }),
        left > 0 ? h('div', { className: 'mt-1 flex justify-center' },
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setShown(shown + PAGE); } },
            'Load more ', h('span', { className: 'font-medium tabular-nums text-ink-inactive' }, left))) : null));
  };
})();
