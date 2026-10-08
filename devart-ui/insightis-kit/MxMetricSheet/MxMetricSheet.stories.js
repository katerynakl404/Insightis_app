(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var DESC = 'Number of issues created in the selected period. Includes all issue types: bugs, tasks, stories, and epics. Does not filter by status or assignee.';
  var METRICS = {
    library: { kind: 'library', name: 'Sessions', alias: '@sessions', provider: 'Google Analytics', prov: 'ga4', desc: 'Total sessions in the selected period.' },
    builtin: { kind: 'builtin', name: 'Issues created', alias: '@issues_created', provider: 'Jira Software Cloud', desc: DESC, active: true },
    custom: { kind: 'custom', custom: true, name: 'MRR growth', alias: '@mrr_growth', provider: 'Jira Software Cloud', connector: 'Skyvia Jira', desc: 'Month-over-month growth rate of MRR derived from Jira billing data.', active: true },
    inactive: { kind: 'builtin', name: 'Bug count', alias: '@bug_count', provider: 'Jira Software Cloud', desc: 'Number of open bugs at the end of the selected period.', active: false }
  };
  function Demo(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var a = R.useState(!!METRICS[p.k].active), active = a[0], setActive = a[1];
    return h(IK.Fragment, null,
      h(D.Button, { variant: 'secondary', size: 'sm', onClick: function () { setOpen(true); } }, 'Open — ' + p.label),
      h(IK.MxMetricSheet, {
        open: open, onOpenChange: setOpen, metric: Object.assign({}, METRICS[p.k], { active: active }),
        onActive: setActive, onConnect: function () { setOpen(false); }, onDuplicate: function () { setOpen(false); },
        onEdit: function () { setOpen(false); }, onDelete: function () { setOpen(false); }
      }));
  }
  IK.story('MxMetricSheet', { title: 'Library metric (a card chip, not connected)', description: 'No switch. Footer: "This metric is designed for …" + Connect <source>.', render: function () { return h(Demo, { k: 'library', label: 'library metric' }); } });
  IK.story('MxMetricSheet', { title: 'Built-in metric of the library', description: 'Active switch in the header (live label Active / Inactive). Footer: Duplicate & Customize.', render: function () { return h(Demo, { k: 'builtin', label: 'built-in' }); } });
  IK.story('MxMetricSheet', { title: 'Built-in, inactive', render: function () { return h(Demo, { k: 'inactive', label: 'inactive' }); } });
  IK.story('MxMetricSheet', { title: 'Custom metric linked to a connection', description: 'Data source + Linked to <connection>. Footer: Delete (left) · Edit (right).', render: function () { return h(Demo, { k: 'custom', label: 'custom' }); } });
  IK.story('MxMetricSheet', { title: 'Free plan', description: 'Switch the review bar to Free, then open any: the switch dims and explains itself on hover; Edit, Duplicate and Connect wear the padlock and open the upgrade modal; Delete stays.', render: function () { return h(Demo, { k: 'custom', label: 'custom (Free)' }); } });
})();
