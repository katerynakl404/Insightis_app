(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Box(p) { return h('div', { className: 'flex w-60 flex-col gap-3 rounded-md border border-stroke bg-surface-card p-4' }, p.children); }

  IK.story('Meter', { title: 'Subscription pool — stacked, brand coin', render: function () {
    return h(Box, null, h(IK.Meter, { label: 'Subscription Credits', value: '5,520 of 15,000', percent: 36.8, coin: 'brand' }));
  } });
  IK.story('Meter', { title: 'Daily limit — inline, bar, NO coin', description: 'A rate cap, not a wallet — coins mark wallets.', render: function () {
    return h(Box, null, h(IK.Meter, { layout: 'inline', label: 'Daily Limit', value: '12 of 20 today', percent: 60 }));
  } });
  IK.story('Meter', { title: 'Purchased — inline, green coin, NO bar', description: 'Only the remaining count is known, so there is no fraction to draw.', render: function () {
    return h(Box, null, h(IK.Meter, { layout: 'inline', label: 'Purchased Credits', value: '540 left', coin: 'green' }));
  } });
  IK.story('Meter', { title: 'Storage — inline with bar', render: function () {
    return h(Box, null, h(IK.Meter, { layout: 'inline', label: 'Files', value: '38.6 MB of 50 MB', percent: 77, barLabel: 'Storage used' }));
  } });
  IK.story('Meter', { title: 'Over the limit — Feedback/Attention fill', render: function () {
    return h(Box, null, h(IK.Meter, { layout: 'inline', label: 'Files', value: '1.2 GB of 1 GB', percent: 100, over: true, barLabel: 'Storage used' }));
  } });
  IK.story('Meter', { title: 'Empty and full', render: function () {
    return h(Box, null,
      h(IK.Meter, { label: 'Subscription Credits', value: '0 of 500', percent: 0, coin: 'brand' }),
      h(IK.Meter, { label: 'Subscription Credits', value: '500 of 500', percent: 100, coin: 'brand' }));
  } });
})();
