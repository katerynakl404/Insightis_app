(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Opener(p) {
    var s = R.useState(false), open = s[0], setOpen = s[1];
    return h(IK.Fragment, null,
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setOpen(true); } }, p.label),
      p.render(open, setOpen));
  }
  IK.story('DsConnectionDialogs', { title: 'Edit connection — the name focused, empty name saves nothing', render: function () {
    return h(Opener, { label: 'Edit "Production DB"', render: function (o, set) {
      return h(IK.DsEditConnectionDialog, { open: o, onOpenChange: set, label: 'Production DB', desc: '', onSave: function (v) { console.log('[story] save', v); set(false); } });
    } });
  } });
  IK.story('DsConnectionDialogs', { title: 'Disconnect? — the destructive action focused on open', render: function () {
    return h(Opener, { label: 'Disconnect "Main CRM"', render: function (o, set) {
      return h(IK.DsDisconnectDialog, { open: o, onOpenChange: set, label: 'Main CRM', onConfirm: function () { set(false); } });
    } });
  } });
  IK.story('DsConnectionDialogs', { title: 'Disconnect a shared connection — Shared into Sales and Support (no member count)', render: function () {
    return h(Opener, { label: 'Disconnect "Main CRM"', render: function (o, set) {
      return h(IK.DsDisconnectDialog, { open: o, onOpenChange: set, label: 'Main CRM', sharedIn: ['Sales', 'Support'], onConfirm: function () { set(false); } });
    } });
  } });
})();
