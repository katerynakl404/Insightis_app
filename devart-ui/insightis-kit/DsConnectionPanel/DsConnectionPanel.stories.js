(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var now = Date.now();
  var OK = { name: 'PostgreSQL', label: 'Production DB', status: 'active', desc: 'Main analytics warehouse, syncs every 6 h', lastSync: now - 2 * 3600e3 };
  var FAIL = { name: 'Stripe', label: 'Stripe Payments', status: 'error', desc: 'Revenue and subscription data', lastSync: now - 26 * 3600e3, error: 'API key expired or revoked (HTTP 401)' };
  function Opener(p) {
    var s = R.useState(null), c = s[0], setC = s[1];
    return h(IK.Fragment, null,
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setC(p.connection); } }, p.label),
      h(IK.DsConnectionPanel, {
        connection: c, plan: p.plan, onOpenChange: function (o) { if (!o) setC(null); },
        onEdit: function () { setC(null); }, onDisconnect: function () { setC(null); }, onTest: function () {}, onDetails: function () {}
      }));
  }
  IK.story('DsConnectionPanel', { title: 'Paid — Test Connection beside Last check, Edit live', render: function () { return h(Opener, { label: 'Open "Production DB"', connection: OK, plan: 'paid' }); } });
  IK.story('DsConnectionPanel', { title: 'Failed last check', render: function () { return h(Opener, { label: 'Open "Stripe Payments"', connection: FAIL, plan: 'paid' }); } });
  IK.story('DsConnectionPanel', { title: 'Free — no Test Connection; Edit locked (opens the Upgrade modal)', render: function () { return h(Opener, { label: 'Open on Free', connection: OK, plan: 'free' }); } });
  IK.story('DsConnectionPanel', { title: 'A check running', render: function () { return h(Opener, { label: 'Open while testing', connection: Object.assign({}, OK, { busy: true }), plan: 'paid' }); } });
  IK.story('DsConnectionPanel', { title: 'One detail field', render: function () {
    return h(IK.DsDetailField, { label: 'Name' }, h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary' }, 'Production DB'));
  } });
})();
