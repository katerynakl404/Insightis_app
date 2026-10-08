(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function Title(p) {
    return h('div', { className: 'flex items-center gap-3', style: { minHeight: p.tall ? '13rem' : undefined, alignItems: 'flex-start' } },
      h(D.Typography, { element: 'span', textStyle: 'heading30', textColor: 'primary' }, 'Files'), p.children);
  }
  IK.story('DsStorageMark', { title: 'Within the limit — info glyph; hover: "38.6 MB of 50 MB used"; click: the panel', render: function () {
    return h(Title, null, h(IK.DsStorageMark, { usedMb: 38.6, capMb: 50, capLabel: '50 MB', planName: 'Free', cta: true }));
  } });
  IK.story('DsStorageMark', { title: 'Over the limit — warning glyph in Feedback/Attention', render: function () {
    return h(Title, null, h(IK.DsStorageMark, { usedMb: 52.5, capMb: 50, capLabel: '50 MB', planName: 'Free', cta: true }));
  } });
  IK.story('DsStorageMark', { title: 'Panel — Free, within (Extend the Limit)', render: function () {
    return h(Title, { tall: true }, h(IK.DsStorageMark, { usedMb: 38.6, capMb: 50, capLabel: '50 MB', planName: 'Free', cta: true, defaultOpen: true }));
  } });
  IK.story('DsStorageMark', { title: 'Panel — Pro, over: "Storage is full", no CTA', render: function () {
    return h(Title, { tall: true }, h(IK.DsStorageMark, { usedMb: 1075.2, capMb: 1024, capLabel: '1 GB', planName: 'Pro', cta: false, defaultOpen: true }));
  } });
  IK.story('DsStorageMark', { title: 'Empty library — 0 MB', render: function () {
    return h(Title, null, h(IK.DsStorageMark, { usedMb: 0, capMb: 1024, capLabel: '1 GB', planName: 'Pro' }));
  } });
})();
