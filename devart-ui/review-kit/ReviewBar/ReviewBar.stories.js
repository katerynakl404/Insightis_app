(function () {
  var IK = window.InsightisKit, h = IK.h, R = window.React;

  function Demo(p) {
    var t = R.useState('data'), st = t[0], setSt = t[1];
    return h(IK.ReviewBar, {
      title: p.title, status: p.status, theme: p.theme, plan: p.controls,
      controls: p.controls ? [
        { label: 'State', value: st, onChange: setSt, options: [{ value: 'data', label: 'Data' }, { value: 'empty', label: 'Empty' }, { value: 'loading', label: 'Loading' }] }
      ] : null
    });
  }

  IK.story('ReviewBar', { title: 'Approved page, state switches + theme', wide: true,
    description: 'Prototype chrome only — never part of the product UI',
    render: function () { return h(Demo, { title: 'Data Sources', status: 'approved', controls: true }); } });
  IK.story('ReviewBar', { title: 'Concept page', wide: true,
    render: function () { return h(Demo, { title: 'Message queue', status: 'concept' }); } });
  IK.story('ReviewBar', { title: 'In redesign, no theme switch', wide: true,
    render: function () { return h(Demo, { title: 'Metrics', status: 'wip', theme: false }); } });
})();
