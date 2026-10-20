(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.story('PickRow', { title: 'Rest · ticked · with a badge · disabled (its sub-line says why); the list scrolls in the gutter', render: function () {
    function L() {
      var s = R.useState({ b: true }), on = s[0], set = s[1];
      function row(k, o) { return h(IK.PickRow, Object.assign({ key: k, checked: !!on[k], onChange: function (v) { var n = Object.assign({}, on); n[k] = v; set(n); } }, o)); }
      return h('div', { className: 'flex max-h-80 w-96 flex-col' },
        h(IK.PickList, { 'aria-label': 'Connections' },
          row('a', { title: 'Production DB', sub: 'PostgreSQL · No metrics' }),
          row('b', { title: 'Main CRM', sub: 'Salesforce · 12 metrics · Also in Support' }),
          row('c', { title: 'quarterly-report.csv', badge: h(D.Badge, { variant: 'primary', size: 'sm' }, 'Artifact'), sub: 'CSV · 2.4 MB' }),
          row('d', { title: 'Marketing', sub: 'Unavailable — its plan no longer includes Workspaces', disabled: true })));
    }
    return h(L);
  } });
})();
