(function () {
  var IK = window.InsightisKit, h = IK.h, R = window.React;

  /* Picking a screen here switches the demo's own state instead of navigating away. */
  function Demo(p) {
    var s = R.useState(p.current), cur = s[0], setCur = s[1];
    return h('div', { className: 'flex justify-end' }, h(IK.AuthScreenSwitch, { current: cur, onNavigate: setCur }));
  }

  IK.story('AuthScreenSwitch', { title: 'Closed — a flow step', description: 'Open it: three groups, the current screen checked',
    render: function () { return h(Demo, { current: 'login.html' }); } });
  IK.story('AuthScreenSwitch', { title: 'Closed — an error screen', description: 'register-error.html',
    render: function () { return h(Demo, { current: 'register-error.html' }); } });
  IK.story('AuthScreenSwitch', { title: 'Closed — the showcase', description: 'illustrations.html (System group)',
    render: function () { return h(Demo, { current: 'illustrations.html' }); } });
  IK.story('AuthScreenSwitch', { title: 'Unknown page', description: 'a file not in the list — nothing checked',
    render: function () { return h(Demo, { current: 'signed-in.html' }); } });
})();
