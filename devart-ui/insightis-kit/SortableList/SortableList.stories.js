(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var SEED = [
    { id: 1, text: 'now split that by channel' },
    { id: 2, text: 'and compare to Q3' },
    { id: 3, text: 'show top 5 products' },
    { id: 4, text: 'also show margin by region' }
  ];
  function Live(p) {
    var s = R.useState(p.items || SEED), items = s[0], setItems = s[1];
    return h(IK.SortableList, {
      items: items, 'aria-label': 'Queued messages', className: 'flex flex-col gap-1',
      itemClassName: 'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-body',
      onReorder: function (from, to) { var n = items.slice(); var it = n.splice(from, 1)[0]; n.splice(to, 0, it); setItems(n); },
      renderItem: function (it, i, handle) {
        return h(IK.Fragment, null,
          h(D.Counter, { size: 'sm' }, i + 1),
          h(IK.SortHandle, { handle: handle }),
          h('span', { className: 'min-w-0 flex-1 truncate' }, it.text));
      }
    });
  }
  IK.story('SortableList', { title: 'Drag a row by its grip — or focus a row and press Alt+↑ / Alt+↓', render: function () { return h(Live); } });
  IK.story('SortableList', { title: 'Two rows', render: function () { return h(Live, { items: SEED.slice(0, 2) }); } });
  IK.story('SortableList', { title: 'Lifted row + drop gap (static picture of a drag)', render: function () {
    return h('ul', { className: 'ik-sort-list flex flex-col gap-1' },
      h('li', { className: 'ik-sort-item flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-body' }, h(D.Counter, { size: 'sm' }, 1), h(IK.SortHandle, { handle: {} }), 'now split that by channel'),
      h('li', { className: 'ik-sort-ph', style: { height: '2.25rem' } }),
      h('li', { className: 'ik-sort-item is-dragging flex items-center gap-2 px-2 py-1.5 text-sm text-ink-body' }, h(D.Counter, { size: 'sm' }, 2), h(IK.SortHandle, { handle: {} }), 'and compare to Q3'));
  } });
})();
