(function () {
  var IK = window.InsightisKit, R = window.React, h = IK.h;
  var SEED = [
    { id: 'c1', title: 'Q1 revenue commentary', time: '2h ago', pinned: true },
    { id: 'c2', title: 'Churn drivers — enterprise', time: 'yesterday', pinned: true },
    { id: 'c3', title: 'Top movers — weekly', time: '3d ago' },
    { id: 'c4', title: 'Activation funnel hypotheses with a title long enough to be truncated at the row edge', time: 'last week' }
  ];
  function log(a) { return function (x) { console.log('[story]', a, x); }; }
  function Live(p) {
    var s = R.useState(p.rows || SEED), rows = s[0], setRows = s[1];
    var e = R.useState(!!p.selecting), selecting = e[0], setSelecting = e[1];
    function patch(id, ch) { setRows(rows.map(function (r) { return r.id === id ? Object.assign({}, r, ch) : r; })); }
    return h(IK.ChatRowList, { 'aria-label': 'Chats' }, rows.map(function (r) {
      return h(IK.ChatRow, {
        key: r.id, title: r.title, time: r.time, pinned: r.pinned, selected: r.selected, preview: r.preview, selecting: selecting,
        onOpen: log('open ' + r.id),
        onToggleSelect: function () { patch(r.id, { selected: !r.selected }); setSelecting(true); },
        onTogglePin: function () { patch(r.id, { pinned: !r.pinned }); },
        onRename: function (t) { patch(r.id, { title: t }); },
        onDelete: function () { setRows(rows.filter(function (x) { return x.id !== r.id; })); }
      });
    }));
  }
  IK.story('ChatRow', { title: 'List — rest, pinned rows (hover a row for its ⋮; the pin unpins)', wide: true, render: function () { return h(Live); } });
  IK.story('ChatRow', { title: 'Selecting — every row shows its checkbox; a row click toggles it', wide: true,
    render: function () { return h(Live, { selecting: true, rows: SEED.map(function (r, i) { return i === 1 ? Object.assign({}, r, { selected: true }) : r; }) }); } });
  IK.story('ChatRow', { title: 'Selected — State/Pressed + Brand border (wins over hover)', wide: true,
    render: function () { return h(IK.ChatRow, { title: 'Q1 revenue commentary', time: '2h ago', selected: true, selecting: true }); } });
  IK.story('ChatRow', { title: 'Preview — the open chat, name in Text/Highlight', wide: true,
    render: function () { return h(IK.ChatRow, { title: 'Q1 revenue commentary', time: '2h ago', preview: true }); } });
  IK.story('ChatRow', { title: 'Menu open (paid row, unpinned)', wide: true, render: function () {
    return h('div', { style: { minHeight: '12rem' } }, h(IK.ChatRow, { title: 'Top movers — weekly', time: '3d ago', defaultMenuOpen: true }));
  } });
  IK.story('ChatRow', { title: 'Menu open (pinned row — Unpin first)', wide: true, render: function () {
    return h('div', { style: { minHeight: '12rem' } }, h(IK.ChatRow, { title: 'Churn drivers — enterprise', time: 'yesterday', pinned: true, defaultMenuOpen: true }));
  } });
  IK.story('ChatRow', { title: 'Renaming inline — Enter / blur commits, Esc cancels', wide: true,
    render: function () { return h(IK.ChatRow, { title: 'Top movers — weekly', time: '3d ago', defaultRenaming: true, onRename: log('rename') }); } });
  IK.story('ChatRow', { title: 'No time, no menu', wide: true,
    render: function () { return h(IK.ChatRow, { title: 'A bare row', menu: false }); } });
})();
