(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Frame(p) {
    return h('div', { className: 'relative flex justify-end overflow-hidden rounded-lg border border-stroke bg-surface-page', style: { height: '30rem' } },
      h(IK.DsFilePreview, { file: p.file, onClose: function () {}, onDownload: function () {} }));
  }
  IK.story('DsFilePreview', { title: 'Spreadsheet — a table sample, truncated (> 1 MB): the banner + Download link', wide: true,
    description: 'Drag the left edge to resize (320–720px).',
    render: function () { return h(Frame, { file: { id: 'f1', name: 'quarterly-report.csv', size: '2.4 MB', origin: 'artifact', date: '3d ago' } }); } });
  IK.story('DsFilePreview', { title: 'Spreadsheet that fits — no banner', wide: true,
    render: function () { return h(Frame, { file: { id: 'f2', name: 'customer-data.xlsx', size: '890 KB', origin: 'uploaded', date: 'last week' } }); } });
  IK.story('DsFilePreview', { title: 'Text-shaped — a mono sample', wide: true,
    render: function () { return h(Frame, { file: { id: 'f3', name: 'export.json', size: '1.2 MB', origin: 'uploaded', date: 'just now' } }); } });
  IK.story('DsFilePreview', { title: 'Nothing to show inline — no preview + Download', wide: true,
    render: function () { return h(Frame, { file: { id: 'f4', name: 'deck.pdf', size: '4.1 MB', origin: 'uploaded', date: 'just now' } }); } });
})();
