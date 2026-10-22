(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var CUSTOM = { kind: 'custom', custom: true, active: true, name: 'MRR growth', alias: '@mrr_growth', provider: 'Jira Software Cloud', logo: 'Jira', connector: 'Skyvia Jira',
    desc: 'Month-over-month growth rate of MRR derived from Jira billing data.', wsNames: ['Sales'] };
  var BUILTIN = { kind: 'builtin', active: true, name: 'Win rate', alias: '@win_rate', provider: 'Salesforce', connector: 'Main CRM', desc: 'Percentage of opportunities closed as won.', wsNames: [] };
  var SHARED = { kind: 'readonly', readOnly: true, name: 'Revenue', alias: '@revenue__a3f9c1', custom: true, provider: 'HubSpot', connector: 'Campaigns HubSpot',
    desc: 'Closed-won amount, net of refunds', by: 'Olena Petrenko', ws: { id: 'marketing', name: 'Marketing', owner: { name: 'Olena Petrenko' } }, wsNames: ['Marketing'] };
  function toast(t) { return function () { D.toast(t); }; }
  var OPTS = { workspaces: true, onActive: toast('Active changed'), onEdit: toast('Edit metric'), onDuplicate: toast('Duplicated'), onDelete: toast('Deleted'),
    onConnect: toast('Connect'), onOpenConnection: toast('Connection details opens over it') };
  function Panel(m, o) { return h(IK.MetricDetails, Object.assign({ metric: m, inline: true, style: { width: '26.25rem', maxWidth: '100%', height: '34rem' } }, OPTS, o)); }

  IK.story('MetricDetails', { title: 'A custom metric of one’s own', description: 'Active in the head; Definition, Linked to; Workspaces — “Goes with its connection, Skyvia Jira”, the name a link to Connection details, where it is shared. Delete · Duplicate · Edit.', render: function () {
    return Panel(CUSTOM);
  } });
  IK.story('MetricDetails', { title: 'A built-in metric, not shared — Duplicate & Customize', description: 'Not shared: the note and its link only — no “Not shared yet”, no Share of its own.', render: function () {
    return Panel(BUILTIN);
  } });
  IK.story('MetricDetails', { title: 'Inactive', render: function () {
    return Panel(Object.assign({}, CUSTOM, { active: false }));
  } });
  IK.story('MetricDetails', { title: 'A long definition — five lines, then Show More', render: function () {
    return Panel(Object.assign({}, CUSTOM, { desc: 'Month-over-month growth rate of MRR derived from Jira billing data. Calculated as (MRR this month − MRR last month) ÷ MRR last month × 100. Positive values indicate revenue expansion; negative values signal churn or contraction. Excludes one-off charges and refunds booked in the same month, and counts annual plans at a twelfth of their value.' }));
  } });
  IK.story('MetricDetails', { title: 'From the library — not connected yet', description: 'Why, and Connect, pinned at the foot.', render: function () {
    return Panel({ kind: 'library', name: 'Sessions', alias: '@sessions', provider: 'Google Analytics', desc: 'Visits to the website' });
  } });
  IK.story('MetricDetails', { title: 'Shared with you — read-only', render: function () {
    return Panel(SHARED);
  } });
  IK.story('MetricDetails', { title: 'Shared with you, unavailable', description: 'The warning by the name: the owner’s plan lapsed; Ask Owner to Renew in its popover.', render: function () {
    return Panel(Object.assign({}, SHARED, { muted: true }), { renewal: { blocked: true, owners: ['Olena Petrenko'], request: toast('Email sent to Olena Petrenko') } });
  } });
  IK.story('MetricDetails', { title: 'Free plan — the switch, Edit and Duplicate locked', render: function () {
    return Panel(CUSTOM, { free: true });
  } });
  IK.story('MetricDetails', { title: 'As a Sheet — open it', render: function () {
    var s = R.useState(null), m = s[0], set = s[1];
    return h('div', null,
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { set(CUSTOM); } }, 'Open Metric details'),
      h(IK.MetricDetails, Object.assign({ metric: m, onOpenChange: function (o) { if (!o) set(null); } }, OPTS)));
  } });
})();
