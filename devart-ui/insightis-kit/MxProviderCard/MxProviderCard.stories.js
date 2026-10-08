(function () {
  var IK = window.InsightisKit, h = IK.h;
  var GH = ['PRs opened', 'PRs merged', 'Commits per day', 'Code review time', 'Issues closed'].map(function (l) { return { label: l }; });
  var GA = ['Sessions', 'Bounce rate', 'Conversions'].map(function (l) { return { label: l }; });
  function Box(p) { return h('div', { className: 'flex w-80 flex-col gap-3' }, p.children); }

  IK.story('MxProviderCard', { title: 'Rest — five preview chips, wrapping', description: 'Hover the card: 2px lift, Shadow/Lift-hover, brand-tinted border.', render: function () {
    return h(Box, null, h(IK.MxProviderCard, { name: 'GitHub', metrics: GH }));
  } });
  IK.story('MxProviderCard', { title: 'Three chips · logo DevartUI has (monogram otherwise)', render: function () {
    return h(Box, null, h(IK.MxProviderCard, { name: 'Salesforce', metrics: GA }), h(IK.MxProviderCard, { name: 'Google Analytics', metrics: GA }));
  } });
  IK.story('MxProviderCard', { title: 'Long name — one line, ellipsis', render: function () {
    return h(Box, null, h(IK.MxProviderCard, { name: 'Microsoft Dynamics 365 Business Central Online', connector: 'dynamics', metrics: GA }));
  } });
  IK.story('MxProviderCard', { title: 'Free plan — Connect is plan-locked', description: 'Padlock in the icon slot; hover does nothing, a press opens the Connections upgrade modal. Switch the plan in the review bar.', render: function () {
    return h(Box, null, h(IK.MxProviderCard, { name: 'Stripe', metrics: GA, onConnect: function () {} }));
  } });
  IK.story('MxProviderCard', { title: 'Metric chip — rest, hover, focus', description: 'Hover / Tab onto the chips.', render: function () {
    return h('div', { className: 'flex flex-wrap gap-1' },
      h(IK.MxMetricChip, null, 'Sessions'), h(IK.MxMetricChip, null, 'Bounce rate'), h(IK.MxMetricChip, null, 'Story points'));
  } });
  IK.story('MxProviderCard', { title: 'Explore more — browse tile', description: 'Dashed ghost card; the whole tile is the button.', render: function () {
    return h(Box, null, h(IK.MxBrowseCard, { label: 'Explore more Business Intelligence data sources', sub: '200+ integrations available to connect', onClick: function () {} }));
  } });
  IK.story('MxProviderCard', { title: 'Grid — three across, browse tile last', wide: true, render: function () {
    return h('div', { className: 'grid grid-cols-3 gap-3.5' },
      h(IK.MxProviderCard, { name: 'Google Analytics', metrics: GA }),
      h(IK.MxProviderCard, { name: 'GitHub', metrics: GH }),
      h(IK.MxBrowseCard, { label: 'Explore more data sources', sub: '200+ integrations available to connect' }));
  } });
})();
