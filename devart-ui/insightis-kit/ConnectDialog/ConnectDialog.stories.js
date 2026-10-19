(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Demo(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var d = R.useState(null), done = d[0], setDone = d[1];
    return h('div', { className: 'flex flex-col items-start gap-2' },
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setDone(null); setOpen(true); } }, p.button),
      done ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'onCreate(' + JSON.stringify(done) + ')') : null,
      h(IK.ConnectDialog, { open: open, onOpenChange: setOpen, connector: p.connector, mark: p.mark, authError: p.authError, onCreate: setDone }));
  }
  IK.story('ConnectDialog', { title: 'Logo mark (Data Sources) — step 1, Save → "Saving…" → step 2 → Save Connection',
    description: 'Step 1 is the provider\'s own form (fixed palette, does not re-theme). Save shows "Saving…" for 1.4 s, then step 2 with the name prefilled and focused.',
    render: function () { return h(Demo, { button: 'Connect PostgreSQL', connector: 'PostgreSQL', mark: 'logo' }); } });
  IK.story('ConnectDialog', { title: 'Logo mark — a connector DevartUI has no mark for (the original logo)', render: function () {
    return h(Demo, { button: 'Connect Mailchimp', connector: 'Mailchimp', mark: 'logo' });
  } });
  IK.story('ConnectDialog', { title: 'Letter mark (Metrics)', description: 'The Metrics original shows the source\'s initial in the mark, not its logo.', render: function () {
    return h(Demo, { button: 'Connect Google Analytics', connector: 'Google Analytics', mark: 'letter' });
  } });
  IK.story('ConnectDialog', { title: 'No source — "New connection", empty mark', render: function () {
    return h(Demo, { button: 'Connect (no source)', connector: '', mark: 'logo' });
  } });
  IK.story('ConnectDialog', { title: 'Authorization error — Save fails once, Retry returns to the form',
    description: 'authError: the first Save turns step 1 into the error (the authorization expired or was declined); Retry goes back to the form and the next Save goes through.',
    render: function () { return h(Demo, { button: 'Connect HubSpot (fails once)', connector: 'HubSpot', mark: 'logo', authError: true }); } });
  IK.story('ConnectDialog', { title: 'The depicted provider form — fixed palette in both themes', render: function () { return h(IK.IntegrationForm); } });
})();
