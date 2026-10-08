(function () {
  var IK = window.InsightisKit, h = IK.h;
  function log(a) { return function (x) { console.log('[story]', a, x); }; }
  IK.story('DsDropZone', { title: 'Rest — drop files on it, or click it / Browse Files', wide: true, render: function () { return h(IK.DsDropZone, { onBrowse: log('browse'), onFiles: log('files') }); } });
  IK.story('DsDropZone', { title: 'Hover', wide: true, render: function () { return h(IK.DsDropZone, { state: 'hover' }); } });
  IK.story('DsDropZone', { title: 'Focus (keyboard on Browse Files)', wide: true, render: function () { return h(IK.DsDropZone, { state: 'focus' }); } });
  IK.story('DsDropZone', { title: 'Drag-over — solid brand border, State/Hover fill', wide: true, render: function () { return h(IK.DsDropZone, { state: 'dragover' }); } });
  IK.story('DsDropZone', { title: 'Narrow — the helper line balances', render: function () { return h('div', { style: { maxWidth: '22rem' } }, h(IK.DsDropZone, {})); } });
})();
