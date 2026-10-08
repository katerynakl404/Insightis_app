(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  /* MxPageHead needs IK.AppShell (its burger opens the shell's drawer). */
  function Shell(p) {
    return h(IK.AppShell, { nav: 'metrics', burger: false, style: { height: '24rem' } },
      h('div', { className: 'px-8 pt-9 pb-16' },
        h('div', { className: 'flex flex-col gap-3' }, p.children,
          h('div', { className: 'h-96 rounded-lg border border-dashed border-stroke' }))));
  }
  IK.story('MxPageHead', { wide: true, title: 'Title only (empty state)', description: 'Narrow the window below 1024px: the row turns sticky with the drawer burger; scroll 60px and it condenses.', render: function () {
    return h(Shell, null, h(IK.MxPageHead, { title: 'Metrics' }));
  } });
  IK.story('MxPageHead', { wide: true, title: 'With actions', render: function () {
    return h(Shell, null, h(IK.MxPageHead, { title: 'Metrics', actions: h(D.Button, { variant: 'primary', size: 'sm', rounded: 'full', leftSlot: h(IK.Icon, { name: 'plus' }) }, 'Create Metric') }));
  } });
})();
