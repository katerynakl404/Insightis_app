(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  /* A fixed-height split: a stand-in chat column + the panel (resizable from its separator). */
  function Split(p) {
    var f = R.useState(p.file), file = f[0], setFile = f[1];
    return h(D.PortalContainerProvider, { className: 'flex h-96 overflow-hidden rounded-md border border-stroke bg-surface-page' },
      h('div', { className: 'flex min-w-0 flex-1 flex-col items-start gap-2 p-4' },
        h(IK.ChatFileChips, { files: ['random_data.csv', 'test_sales_1.json', 'test_sales_1_table.pdf'], onOpen: setFile }),
        h(IK.ChatImagePlates, { items: [{ file: 'random_bar_chart.png', kind: 'bar' }, { file: 'random_line_chart.png', kind: 'line' }], onOpen: setFile })),
      h(IK.ChatFilePreview, { file: file, onClose: function () { setFile(null); } }));
  }
  [['random_data.csv', 'csv / xls / xlsx — the ID / Value / Score table (the Score column keeps a 16rem floor).'],
   ['test_sales_1.json', 'json — the truncated banner (warning strip flush under the head) over a mono sample.'],
   ['test_sales_1_table.pdf', 'No preview for the type: icon, name, the reason and Download.'],
   ['random_line_chart.png', 'A chart PNG — the chart itself.']].forEach(function (c) {
    IK.story('ChatFilePreview', { title: c[0], wide: true, description: c[1] + ' Drag the separator to resize (320px … 70%); Esc or Close shuts it; below 881px it covers the chat instead.',
      render: function () { return h(Split, { file: c[0] }); } });
  });
  IK.story('ChatFilePreview', { title: 'Closed — open one from a chip or a plate', wide: true,
    render: function () { return h(Split, { file: null }); } });
})();
