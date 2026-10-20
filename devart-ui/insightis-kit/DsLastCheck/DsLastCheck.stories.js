(function () {
  var IK = window.InsightisKit, h = IK.h;
  var now = Date.now();
  function Col(p) { return h('div', { className: 'flex flex-col gap-3' }, p.children); }
  IK.story('DsLastCheck', { title: 'Healthy — success tick + relative time (tooltip: the exact time)', render: function () {
    return h(Col, null,
      h(IK.DsLastCheck, { lastSync: now - 20e3, status: 'active' }),
      h(IK.DsLastCheck, { lastSync: now - 32 * 60e3, status: 'active' }),
      h(IK.DsLastCheck, { lastSync: now - 2 * 3600e3, status: 'active' }),
      h(IK.DsLastCheck, { lastSync: now - 3 * 86400e3, status: 'active' }),
      h(IK.DsLastCheck, { lastSync: now - 12 * 86400e3, status: 'active' }));
  } });
  IK.story('DsLastCheck', { title: 'Failed — a button: the reason on hover, the error toast on click', render: function () {
    return h(IK.DsLastCheck, {
      lastSync: now - 26 * 3600e3, status: 'error', error: 'API key expired or revoked (HTTP 401)',
      onDetails: function () { window.DevartUI.toast.error('Last check failed — Stripe Payments', { description: 'Check failed: API key expired or revoked (HTTP 401)' }); }
    });
  } });
  IK.story('DsLastCheck', { title: 'Testing — the same pill with a spinner (the re-test icon keeps its place; the row cannot jump)', render: function () {
    return h(IK.DsLastCheck, { lastSync: now, status: 'active', busy: true, onTest: function () {} });
  } });
  IK.story('DsLastCheck', { title: 'With the re-test icon — own rows and the panel (paid plan)', render: function () {
    var R = window.React, s = R.useState(false), busy = s[0], setBusy = s[1];
    return h(Col, null,
      h(IK.DsLastCheck, { lastSync: now - 2 * 3600e3, status: 'active', busy: busy, onTest: function () { setBusy(true); setTimeout(function () { setBusy(false); }, 1500); } }),
      h(IK.DsLastCheck, { lastSync: now - 26 * 3600e3, status: 'error', error: 'API key expired or revoked (HTTP 401)', onTest: function () {} }));
  } });
})();
