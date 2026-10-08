(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.story('Coin', { title: 'Shipped — Style 1 (Flat), brand + green, every size', description: 'xs 16 · sm 20 (purchased row) · md 28 (subscription meter) · lg 36 (balance icon).',
    render: function () {
      return h('div', { className: 'flex flex-col gap-3' },
        ['brand', 'green'].map(function (t) {
          return h('div', { key: t, className: 'flex items-center gap-4' },
            h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary', className: 'w-12' }, t),
            ['xs', 'sm', 'md', 'lg'].map(function (s) { return h(IK.Coin, { key: s, tone: t, size: s }); }));
        }));
    } });

  IK.story('Coin', { title: 'All four styles (2–4 parked)', wide: true,
    render: function () {
      return h('div', { className: 'flex flex-wrap gap-6' },
        [1, 2, 3, 4].map(function (v) {
          return h('div', { key: v, className: 'flex flex-col items-center gap-2' },
            h('div', { className: 'flex gap-2' }, h(IK.Coin, { variant: v, size: 64 }), h(IK.Coin, { variant: v, tone: 'green', size: 64 })),
            h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary' }, 'Style ' + v));
        }));
    } });
})();
