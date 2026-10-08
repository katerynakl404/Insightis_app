(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Demo(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var d = R.useState(''), done = d[0], setDone = d[1];
    return h('div', { className: 'flex flex-col items-start gap-2' },
      h(D.Button, { variant: 'secondary', size: 'sm', onClick: function () { setDone(''); setOpen(true); } }, 'Connect ' + (p.source || '(no source)')),
      done ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'onCreate("' + done + '")') : null,
      h(IK.MxConnectDialog, { open: open, onOpenChange: setOpen, source: p.source, onCreate: setDone }));
  }
  IK.story('MxConnectDialog', { title: 'Step 1 → Saving… → Step 2 → Save Connection', description: 'Step 1 is the provider\'s own form (fixed palette, does not re-theme). Save shows "Saving…" for 1.4s, then step 2 with the name prefilled and focused.', render: function () {
    return h(Demo, { source: 'Google Analytics' });
  } });
  IK.story('MxConnectDialog', { title: 'Source DevartUI has a mark for', render: function () { return h(Demo, { source: 'Salesforce' }); } });
  IK.story('MxConnectDialog', { title: 'No source — "New Connection"', render: function () { return h(Demo, { source: '' }); } });
})();
