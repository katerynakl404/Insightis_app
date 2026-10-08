(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;

  function Opener(p) {
    var s = R.useState(false), open = s[0], setOpen = s[1];
    var ref = R.useRef(null);
    return h(IK.Fragment, null,
      h(D.Button, { ref: ref, variant: 'secondary', size: 'sm', onClick: function () { setOpen(true); } }, p.feature),
      h(IK.UpgradeModal, { feature: p.feature, open: open, onOpenChange: setOpen, returnFocusRef: ref }));
  }

  IK.story('UpgradeModal', { title: 'Every feature — press to open', wide: true,
    description: 'Eyebrow plan Badge, headline, lead, every benefit; Cancel then Upgrade to Unlock. Focus lands on the primary and returns to the button on close; Esc, the scrim, ✕ and Cancel close it.',
    render: function () {
      return h('div', { className: 'flex flex-wrap gap-2' },
        Object.keys(IK.PLAN_FEATURES).map(function (k) { return h(Opener, { key: k, feature: k }); }));
    } });

  IK.story('UpgradeModal', { title: 'From a locked action (IK.Locked surface="modal")',
    render: function () {
      return h(IK.Locked, { feature: 'connections', surface: 'modal', locked: true },
        h(D.Button, { variant: 'primary', size: 'sm' }, 'Connect'));
    } });
})();
