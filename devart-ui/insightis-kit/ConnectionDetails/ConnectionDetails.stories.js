(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var NOW = Date.now(), MIN = 60e3, HOUR = 3600e3;
  var OWN = { id: 'c-sf', name: 'Salesforce', label: 'Main CRM', desc: 'Deals, contacts & pipeline metrics', metrics: 12, lastSync: NOW - 32 * MIN, status: 'active', sharedWith: ['Sales', 'Support'] };
  var SHARED = { id: 'a3f9c1', name: 'HubSpot', label: 'Campaigns HubSpot', desc: 'Campaign performance and leads for the EMEA team', metrics: 4, lastSync: NOW - 40 * MIN, status: 'active',
    by: 'Olena Petrenko', wsNames: ['Marketing analytics — EMEA regional team', 'Brand'] };
  function toast(t) { return function () { D.toast(t); }; }
  /* every handler a page gives it */
  var OPTS = { metricsHref: function () { return '#'; }, onEdit: toast('Edit connection'), onDisconnect: toast('Disconnect'), onTest: toast('Checking…'),
    onDetails: toast('Check failed: API key expired or revoked (HTTP 401)'), onAddMetric: toast('Create metric'), onAddToWorkspace: toast('Share via Workspace'),
    onRemoveFromWorkspace: function (it) { D.toast('Removed from ' + it.name); } };
  function Panel(c, o) { return h(IK.ConnectionDetails, Object.assign({ connection: c, inline: true, style: { width: '26.25rem', maxWidth: '100%', height: '36rem' } }, OPTS, o)); }

  IK.story('ConnectionDetails', { title: 'One’s own, in two workspaces', description: 'Metrics (a link, + Add Metric), Last check (↻ Test Connection), Workspaces with × to take it out of one and Share via Workspace; Disconnect · Edit at the foot.', render: function () {
    return Panel(OWN);
  } });
  IK.story('ConnectionDetails', { title: 'One’s own, not shared yet — Share via Workspace alone', render: function () {
    return Panel(Object.assign({}, OWN, { sharedWith: [] }));
  } });
  IK.story('ConnectionDetails', { title: 'No metrics yet — Add Metric itself', render: function () {
    return Panel(Object.assign({}, OWN, { label: 'Production DB', name: 'PostgreSQL', desc: 'Main analytics warehouse, syncs every 6 h', metrics: 0, sharedWith: [] }));
  } });
  IK.story('ConnectionDetails', { title: 'Last check failed', description: 'The check’s error state; Details says why.', render: function () {
    return Panel(Object.assign({}, OWN, { label: 'Stripe Payments', name: 'Stripe', desc: 'Revenue and subscription data', metrics: 8, lastSync: NOW - 26 * HOUR, status: 'error', error: 'API key expired or revoked (HTTP 401)', sharedWith: [] }));
  } });
  IK.story('ConnectionDetails', { title: 'Free plan — Edit and Share locked', description: 'The padlocked actions open the upgrade; Disconnect is never gated.', render: function () {
    return Panel(OWN, { free: true, wsLocked: true });
  } });
  IK.story('ConnectionDetails', { title: 'Shared with you — read-only', description: 'Who shared it and where; no actions of its own.', render: function () {
    return Panel(SHARED, { mode: 'shared' });
  } });
  IK.story('ConnectionDetails', { title: 'Shared with you, unavailable — the owner’s plan lapsed', description: 'The warning after the name opens the Problem with the way back: Ask Owner to Renew.', render: function () {
    return Panel(Object.assign({}, SHARED, { muted: true }), { mode: 'shared', renewal: { blocked: true, owners: ['Olena Petrenko'], request: toast('Email sent to Olena Petrenko') } });
  } });
  IK.story('ConnectionDetails', { title: 'As a Sheet — open it', description: 'The page form: a right-hand Sheet, 420px (the whole width below 640px); it keeps what it shows while it slides out.', render: function () {
    var s = R.useState(null), c = s[0], set = s[1];
    return h('div', null,
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { set(OWN); } }, 'Open Connection details'),
      h(IK.ConnectionDetails, Object.assign({ connection: c, onOpenChange: function (o) { if (!o) set(null); } }, OPTS)));
  } });
})();
