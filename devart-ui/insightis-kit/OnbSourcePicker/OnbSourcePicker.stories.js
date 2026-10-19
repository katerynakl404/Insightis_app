(function () {
  var IK = window.InsightisKit, h = IK.h;
  function connect(s) { console.log('[story] connect', s && s.name); }
  function sub() { return h(IK.Fragment, null, 'Pick the source you want to start with and connect it in about ', h('b', null, '2 minutes'), '. Only have spreadsheets? ', h(IK.OnbUploadLink, { onClick: function () {} })); }
  function Card(p) {
    return h(IK.OnbSetup, { progress: IK.onbProgress('conn'), current: 2, title: 'Connect your first data source', subtitle: sub(),
      onBack: function () {}, onSkip: function () {}, skipLabel: 'Skip for Now', onContinue: p.files ? function () {} : undefined, canContinue: p.canContinue },
      h(IK.OnbSourcePicker, { files: p.files, onConnect: connect, onRetryFile: function () {} }));
  }
  IK.story('OnbSourcePicker', { title: 'Catalog — popular first, scrolls inside the card', wide: true, render: function () { return h(Card); } });
  IK.story('OnbSourcePicker', { title: 'Files — uploading, uploaded, failed (Continue on: one is in)', wide: true,
    render: function () {
      return h(Card, { canContinue: true, files: [
        { name: 'sales_pipeline_q3_2026.xlsx', size: 2480000, done: true },
        { name: 'customers.csv', size: 812000, progress: 46 },
        { name: 'events.json', size: 5400000, error: true }] });
    } });
})();
