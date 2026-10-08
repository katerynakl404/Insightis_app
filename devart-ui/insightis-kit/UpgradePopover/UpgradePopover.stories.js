(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;

  /* Static frame = the PopoverContent shell (w-72, border, radius, p-4, overlay shadow) so every
     panel can be compared side by side without opening anything. */
  function Frame(p) {
    return h('div', { className: IK.cx('ik-upop w-72 rounded-md border p-4 shadow-overlay-soft', p.plain && 'is-plain') }, p.children);
  }

  Object.keys(IK.PLAN_FEATURES).forEach(function (k) {
    IK.story('UpgradePopover', { title: 'Panel — ' + k, description: 'Name + plan Badge, the first two benefits, Upgrade to Unlock.',
      render: function () { return h(Frame, null, h(IK.UpgradePanel, { feature: k })); } });
  });

  IK.story('UpgradePopover', { title: 'Plain — an allowance, not an offer (Files storage)', description: 'tone="plain": the same shell on Surface/Card; live-data body (IK.Meter); own CTA label.',
    render: function () {
      return h(Frame, { plain: true },
        h(IK.UpgradePanel, { name: 'Storage', plan: 'Free', ctaLabel: 'Extend the Limit' },
          h(IK.Meter, { layout: 'inline', label: 'Files', value: '38.6 MB of 50 MB', percent: 77, barLabel: 'Storage used' })));
    } });

  IK.story('UpgradePopover', { title: 'Plain — over the limit, top plan (no CTA)', description: 'Nothing left to upgrade to: cta={false}. The fill turns Feedback/Attention.',
    render: function () {
      return h(Frame, { plain: true },
        h(IK.UpgradePanel, { name: 'Storage', plan: 'Pro', cta: false },
          h(IK.Meter, { layout: 'inline', label: 'Files', value: '1.2 GB of 1 GB', percent: 100, over: true, barLabel: 'Storage used' })));
    } });

  function Anchored(p) {
    var s = R.useState(false), open = s[0], setOpen = s[1];
    var ref = R.useRef(null);
    return h(IK.Fragment, null,
      h(D.Button, { ref: ref, variant: 'secondary', size: 'sm', onClick: function () { setOpen(!open); } }, p.label),
      h(IK.UpgradePopover, { feature: p.feature, open: open, onOpenChange: setOpen, anchorRef: ref, side: p.side, autoFocus: true }));
  }
  IK.story('UpgradePopover', { title: 'Anchored — placement', wide: true,
    description: 'side: bottom (a button), right (a row in a list), top (a control whose menu opens upward). Radix flips on collision; Esc returns focus to the trigger; an outside click or a scroll closes it.',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-4 py-24' },
        h(Anchored, { label: 'Below (button)', feature: 'connections', side: 'bottom' }),
        h(Anchored, { label: 'Beside (row)', feature: 'model-pro', side: 'right' }),
        h(Anchored, { label: 'Above (composer)', feature: 'connections', side: 'top' }));
    } });
})();
