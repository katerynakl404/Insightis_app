(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function Body(p) { return h('div', { className: 'flex w-full flex-col rounded-lg border border-stroke bg-surface-card p-5' }, p.children); }
  function noop() {}

  /* ── The shipped block, one story per plan state (the page's "Plan state" switch) ── */
  var STATES = [
    { t: 'Free', badges: [{ label: 'Free plan' }], amount: '827', sub: ['287 left', '213 of 500 used', 42.6], daily: ['18 left', '32 of 50 used', 64], pur: '540 left' },
    { t: 'Trial — no packs on sale', badges: [{ label: 'Trial' }, { label: 'Trial ends in 14 days', variant: 'attention' }], amount: '14,999.9', sub: ['14,999.9 left', '0.023 of 15,000 used', 0.15], daily: ['1,499.9 left', '0.023 of 1,500 used', 0.15], pur: '0 left', empty: true },
    { t: 'Pro (trial)', badges: [{ label: 'Pro plan' }, { label: 'Trial ends in 14 days', variant: 'attention' }], amount: '6,800', sub: ['6,800 left', '3,200 of 10,000 used', 32], daily: ['580 left', '420 of 1,000 used', 42], pur: '0 left' },
    { t: 'Limit reached', badges: [{ label: 'Free plan' }], amount: '0', sub: ['0 left', '500 of 500 used · Resets Aug 1, 2026', 100], daily: ['0 left', '50 of 50 used · Resets at 12:00 AM', 100], pur: '0 left' }
  ];
  STATES.forEach(function (s) {
    IK.story('AcctBalance', { title: 'Balance — ' + s.t, wide: true,
      description: s.empty ? 'The tray keeps its place and holds the availability notice (DevartUI StatusView sm).' : 'Monthly → daily → purchased. Daily has no coin; Purchased has no bar.',
      render: function () {
        return h(Body, null, h('div', null,
          h(IK.AcctSection, { divider: false, pb: 3 }, h('div', null,
            h(IK.AcctBalanceHead, { badges: s.badges }),
            h(IK.AcctBalanceHero, { amount: s.amount, icon: 'wallet', onUpgrade: noop }),
            h('div', { className: 'mt-3 flex flex-col gap-4' },
              h(IK.AcctPool, { name: 'Subscription', coin: 'brand', left: s.sub[0], meta: s.sub[1], percent: s.sub[2] }),
              h(IK.AcctPool, { name: 'Daily limit', left: s.daily[0], meta: s.daily[1], percent: s.daily[2] }),
              h(IK.AcctPool, { name: 'Purchased', coin: 'green', left: s.pur })))),
          h(IK.AcctBuyCredits, { tray: 'page', empty: s.empty })));
      } });
  });
  IK.story('AcctBalance', { title: 'Daily limit bar off', render: function () {
    return h(Body, null,
      h(IK.AcctPool, { name: 'Subscription', coin: 'brand', left: '287 left', meta: '213 of 500 used', percent: 42.6 }),
      h(IK.AcctPool, { name: 'Purchased', coin: 'green', left: '540 left' }));
  } });

  /* ── Retired concepts ── */
  IK.story('AcctBalance', { title: 'Retired V2 — two-zone bar (Free · Pro · Limit reached)', wide: true, render: function () {
    return h(Body, null,
      h(IK.AcctBalanceHero, { amount: '213', unit: ' / 1,040 used', gap: 3, ctaHideOnPhone: true, onUpgrade: noop }),
      h(IK.AcctComboBar, { legend: [{ name: 'Subscription', value: '213 of 500' }, { tone: 'green', name: 'Purchased', value: '0 of 540' }],
        zones: [{ basis: '48.08%', fill: '42.6%' }, { tone: 'green', basis: '51.92%', fill: '0%' }], label: '213 of 1,040 credits used',
        summary: { full: '20% of total credits used', short: '20% used', right: '827 left' } }),
      h(IK.AcctBalanceCtaRow, { onUpgrade: noop }),
      h(IK.AcctComboBar, { legend: [{ name: 'Subscription', value: '3,200 of 10,000' }, { tone: 'green', name: 'Purchased', value: '0 of 0' }],
        zones: [{ basis: '100%', fill: '32%' }], label: '3,200 of 10,000 credits used',
        summary: { full: '32% of total credits used', short: '32% used', right: '6,800 left' } }),
      h(IK.AcctBalanceHero, { amount: '1,040', unit: ' / 1,040 used', icon: 'alert', gap: 3, onUpgrade: noop }),
      h(IK.AcctComboBar, { exhausted: true, legend: [{ name: 'Subscription', value: '500 of 500', extra: '(resets Aug 1, 2026)' }, { tone: 'green', name: 'Purchased', value: '540 of 540' }],
        zones: [{ basis: '48.08%', fill: '100%' }, { tone: 'green', basis: '51.92%', fill: '100%' }], label: '1,040 of 1,040 credits used',
        summary: { full: '100% of total credits used', short: '100% used', right: '0 left' } }));
  } });
  IK.story('AcctBalance', { title: 'Retired V3 — a bar per pool (normal · exhausted)', wide: true, render: function () {
    return h(Body, null, h('div', { className: 'flex flex-col gap-4' },
      h(IK.AcctPoolV3, { name: 'Subscription', left: '287', percent: 42.6, foot: ['213 of 500 used'] }),
      h(IK.AcctPoolV3, { name: 'Purchased', tone: 'green', left: '540', percent: 0, foot: ['0 of 540 used'] }),
      h(IK.AcctPoolV3, { name: 'Subscription', left: '0', exhausted: true, percent: 100, foot: ['500 of 500 used', 'Resets Aug 1, 2026'] })));
  } });
  IK.story('AcctBalance', { title: 'Retired Version B — wallet + allowance rows', wide: true, render: function () {
    return h(Body, null, h('div', { className: 'flex flex-col gap-4' },
      h(IK.AcctPoolB, { name: 'Subscription', coin: 'brand', amount: '287 left', percent: 42.6, foot: ['213 of 500 used', 'Renews Aug 1, 2026'] }),
      h(IK.AcctPoolB, { name: 'Purchased', coin: 'green', amount: '540 left', note: 'Never expire · used after plan credits' })));
  } });

  IK.story('AcctBalance', { title: 'Buy credits — tray on Surface/Card2 (retired page) and no tray (Version B)', wide: true, render: function () {
    return h(Body, null, h('div', null, h(IK.AcctBuyCredits, { tray: 'card2' }), h(IK.AcctBuyCredits, { hidden: true })));
  } });
  IK.story('AcctBalance', { title: 'Credit pack — plain / Most popular', description: 'Static tile — the Buy button is the action (hover / press are the Button’s own).', render: function () {
    return h('div', { className: 'grid w-full grid-cols-3 gap-3 rounded-xl bg-surface-page p-4 pt-6' },
      h(IK.AcctCreditPack, IK.ACCT_PACKS[0]), h(IK.AcctCreditPack, IK.ACCT_PACKS[1]));
  } });
})();
