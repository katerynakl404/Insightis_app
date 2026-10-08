(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function Shell(p) {
    return h(IK.AppShell, { nav: p.nav || 'data-sources', burger: false, style: { height: '24rem' } }, p.children);
  }
  IK.story('DsPage', { title: 'Title row with an action (Connections, My Connections tab)', wide: true,
    description: 'Below 1024px the drawer trigger leads the row and the row sticks to the top; after 60px of scroll it tightens and the title steps down to heading20.',
    render: function () {
      return h(Shell, null, h(IK.DsPage, null,
        h(IK.DsPageHead, { title: 'Data Sources', actions: h(D.Button, { variant: 'primary', size: 'sm', rounded: 'full', type: 'button' }, 'Create Connection') }),
        h('div', { style: { height: '40rem' }, className: 'rounded-lg border border-dashed border-stroke' })));
    } });
  IK.story('DsPage', { title: 'Title row with a mark beside the title (Files)', wide: true, render: function () {
    return h(Shell, { nav: 'files' }, h(IK.DsPage, null,
      h(IK.DsPageHead, { title: 'Files', after: h(IK.DsStorageMark, { usedMb: 38.6, capMb: 50, capLabel: '50 MB', planName: 'Free', cta: true }) })));
  } });
})();
