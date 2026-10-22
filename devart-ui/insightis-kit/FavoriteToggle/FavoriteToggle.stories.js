(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Live(p) {
    var s = R.useState(!!p.pressed), on = s[0], set = s[1];
    return h(IK.FavoriteToggle, { pressed: on, onPressedChange: set, size: p.size, label: 'MRR growth' });
  }
  IK.story('FavoriteToggle', { title: 'Off · On', description: 'D.PinToggle with a star: tertiary → primaryTertiary, the star filled when on; its tooltip is the action.', render: function () {
    return h('div', { className: 'flex items-center gap-4' }, h(Live), h(Live, { pressed: true }));
  } });
  IK.story('FavoriteToggle', { title: 'Sizes — 2xs (a row) · xs', render: function () {
    return h('div', { className: 'flex items-center gap-4' }, h(Live, { pressed: true }), h(Live, { pressed: true, size: 'xs' }));
  } });
  IK.story('FavoriteToggle', { title: 'Reveal — off shows on its row’s hover', description: 'In a D.Card row (group/row): off is hidden until the row is hovered or focused, always on touch and below 768px; on always shows.', render: function () {
    var s = R.useState(false), on = s[0], set = s[1];
    return h(D.Card, { variant: 'row', fullWidth: true, tabIndex: 0 },
      h('span', { className: 'flex-1' }, 'Hover this row'),
      h(IK.FavoriteToggle, { pressed: on, onPressedChange: set, reveal: true, label: 'this row' }));
  } });
})();
