(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  /* PageHead needs IK.AppShell (its burger opens the shell's drawer). */
  function Shell(p) {
    return h(IK.AppShell, { nav: p.nav || 'data-sources', burger: false, style: { height: '24rem' } },
      h(IK.Page, null, p.children, h('div', { style: { height: '40rem' }, className: 'rounded-lg border border-dashed border-stroke' })));
  }
  var narrow = 'Narrow the window below 1024px: the drawer trigger leads the row and the row sticks to the top; after 60px of scroll it tightens and the title steps down to heading20.';
  IK.story('PageHead', { wide: true, title: 'Title only', description: narrow, render: function () {
    return h(Shell, { nav: 'metrics' }, h(IK.PageHead, { title: 'Metrics', wrap: true }));
  } });
  IK.story('PageHead', { wide: true, title: 'With an action (Data Sources, My Connections tab)', render: function () {
    return h(Shell, null, h(IK.PageHead, { title: 'Data Sources',
      actions: h(D.Button, { variant: 'primary', size: 'sm', rounded: 'full', type: 'button' }, 'Create Connection') }));
  } });
  IK.story('PageHead', { wide: true, title: 'wrap — the Metrics row: 4px under the title, actions wrap under it when out of room', render: function () {
    return h(Shell, { nav: 'metrics' }, h(IK.PageHead, { title: 'Metrics', wrap: true,
      actions: h(D.Button, { variant: 'primary', size: 'sm', rounded: 'full', type: 'button', leftSlot: h(IK.Icon, { name: 'plus' }) }, 'Create Metric') }));
  } });
  IK.story('PageHead', { wide: true, title: 'A mark beside the title (Files)', render: function () {
    return h(Shell, { nav: 'files' }, h(IK.PageHead, { title: 'Files',
      after: h(IK.DsStorageMark, { usedMb: 38.6, capMb: 50, capLabel: '50 MB', planName: 'Free', cta: true }) }));
  } });
})();
