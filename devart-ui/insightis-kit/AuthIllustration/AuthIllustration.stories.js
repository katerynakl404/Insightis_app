(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  /* the set as the flow uses it — illustrations.html IL_ITEMS, in its order */
  var ITEMS = [
    ['triangle-alert', 'error', 'Error (generic)'],
    ['mail-x', 'error', 'Email link error'],
    ['shield-alert', 'error', 'Reset link error'],
    ['mail', 'info', 'Check your email'],
    ['mail-check', 'info', 'Confirm email'],
    ['circle-check', 'success', 'Email confirmed'],
    ['shield-check', 'success', 'Password updated']
  ];

  function Fig(p) {
    return h('figure', { className: 'm-0 flex flex-col items-center gap-2' },
      h(IK.AuthIllustration, { glyph: p.glyph, tone: p.tone, size: p.size }),
      h(D.Typography, { element: 'figcaption', textStyle: 'body12', textColor: 'secondary', align: 'center' }, p.caption));
  }

  IK.story('AuthIllustration', { title: 'The flow set — every screen\'s artwork', wide: true,
    description: 'Halo style, 104px — what each status screen shows',
    render: function () {
      return h('div', { className: 'flex flex-wrap gap-6' },
        ITEMS.map(function (it) { return h(Fig, { key: it[0], glyph: it[0], tone: it[1], caption: it[2] }); }));
    } });

  IK.story('AuthIllustration', { title: 'Tones', description: 'error · info · success on one glyph',
    render: function () {
      return h('div', { className: 'flex flex-wrap gap-4' },
        IK.AuthIllustration.TONES.map(function (t) { return h(Fig, { key: t, glyph: 'circle-check', tone: t, caption: t, size: 72 }); }));
    } });

  IK.story('AuthIllustration', { title: 'Sizes', description: 'size prop — 48 / 72 / 104 (default)',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-end gap-4' },
        [48, 72, 104].map(function (s) { return h(Fig, { key: s, glyph: 'mail', tone: 'info', caption: s + 'px', size: s }); }));
    } });

  IK.story('AuthIllustration', { title: 'Unknown glyph', description: 'falls back to triangle-alert',
    render: function () { return h(Fig, { glyph: 'nope', tone: 'error', caption: 'glyph="nope"' }); } });
})();
