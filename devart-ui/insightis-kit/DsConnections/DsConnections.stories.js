(function () {
  var IK = window.InsightisKit, h = IK.h;
  var now = Date.now();
  var LIST = [
    { name: 'PostgreSQL', label: 'Production DB', status: 'active', desc: 'Main analytics warehouse, syncs every 6 h', lastSync: now - 2 * 3600e3 },
    { name: 'Salesforce', label: 'Main CRM', status: 'active', desc: 'Deals, contacts & pipeline metrics', lastSync: now - 32 * 60e3 },
    { name: 'Stripe', label: 'Stripe Payments', status: 'error', desc: 'Revenue and subscription data', lastSync: now - 26 * 3600e3, error: 'API key expired or revoked (HTTP 401)' },
    { name: 'HubSpot', label: 'Marketing Hub', status: 'active', desc: 'Campaign performance & lead scoring', lastSync: now - 5 * 3600e3 }
  ];
  function log(a) { return function (n) { console.log('[story]', a, n); }; }
  var H = { onOpen: log('open'), onEdit: log('edit'), onTest: log('test'), onDisconnect: log('disconnect'), onDetails: log('details') };
  function P(extra) { return Object.assign({ connections: LIST, locked: false }, H, extra); }
  function Narrow(p) { return h('div', { style: { maxWidth: '22rem' } }, p.children); }

  IK.story('DsConnections', { title: 'Table — hover a row for its ⋮, click a row to open it', wide: true,
    render: function () { return h(IK.DsConnections, P({ layout: 'table' })); } });
  IK.story('DsConnections', { title: 'Table — the open row is selected', wide: true,
    render: function () { return h(IK.DsConnections, P({ layout: 'table', selected: 'Salesforce' })); } });
  IK.story('DsConnections', { title: 'Table — a check running on one row', wide: true, render: function () {
    return h(IK.DsConnections, P({ layout: 'table', connections: LIST.map(function (c, i) { return i === 0 ? Object.assign({}, c, { busy: true }) : c; }) }));
  } });
  IK.story('DsConnections', { title: 'Table — a row leaving after Disconnect', wide: true,
    render: function () { return h(IK.DsConnections, P({ layout: 'table', leaving: 'HubSpot' })); } });
  IK.story('DsConnections', { title: 'Loading — skeleton table', wide: true,
    render: function () { return h(IK.DsConnections, P({ loading: true })); } });
  IK.story('DsConnections', { title: 'Phone (< 768px) — card stack, ⋮ always shown, lift on hover',
    render: function () { return h(Narrow, null, h(IK.DsConnections, P({ layout: 'cards' }))); } });
  IK.story('DsConnections', { title: 'Phone — the open card is selected',
    render: function () { return h(Narrow, null, h(IK.DsConnections, P({ layout: 'cards', selected: 'PostgreSQL' }))); } });
  IK.story('DsConnections', { title: 'Row menu — open (paid)', render: function () {
    return h('div', { className: 'flex justify-end', style: { minHeight: '9rem' } },
      h(IK.DsConnectionMenu, Object.assign({ name: 'PostgreSQL', defaultOpen: true, locked: false }, H)));
  } });
  IK.story('DsConnections', { title: 'Row menu — Free: Edit and Test Connection locked (padlock trails; hover opens the upgrade popover); Disconnect never', render: function () {
    return h('div', { className: 'flex justify-end', style: { minHeight: '9rem' } },
      h(IK.DsConnectionMenu, Object.assign({ name: 'PostgreSQL', defaultOpen: true, locked: true }, H)));
  } });
})();
