(function () {
  var IK = window.InsightisKit, h = IK.h;
  function frame(child) { return h('div', { className: 'flex max-w-md flex-col gap-3 rounded-lg border border-stroke p-3' }, child); }
  var BIG = { id: 'f1', name: 'quarterly-report.csv', size: '2.4 MB', origin: 'artifact', date: 'Oct 19, 2026' };
  IK.story('DsFilePreview', { title: 'A spreadsheet sample of a bigger file — the truncated strip, then the table', render: function () {
    return frame([h(IK.DsFilePreviewBanner, { key: 'b', file: BIG, onDownload: function () {} }), h(IK.DsFilePreviewContent, { key: 'c', file: BIG })]);
  } });
  IK.story('DsFilePreview', { title: 'Text-shaped — a mono sample', render: function () {
    return frame(h(IK.DsFilePreviewContent, { file: Object.assign({}, BIG, { name: 'comments.json', size: '62 KB' }) }));
  } });
  IK.story('DsFilePreview', { title: 'Nothing to show inline — no preview + Download', render: function () {
    return frame(h(IK.DsFilePreviewContent, { file: Object.assign({}, BIG, { name: 'Campaign brief.pdf', size: '1.1 MB' }), onDownload: function () {} }));
  } });
})();
