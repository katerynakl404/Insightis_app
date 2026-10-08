(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function Panel(p) { return h('div', { className: 'w-60 rounded-md border border-stroke bg-surface-card p-4 shadow-overlay-soft' }, p.children); }
  function Foot(p) { return h('div', { className: 'flex w-60 flex-col gap-2 rounded-md border border-stroke bg-surface-card p-2' }, p.children); }

  IK.story('BalancePopover', { title: 'Interactive — follows the plan', description: 'Click the row: the panel opens above it. Free shows the daily limit; Paid the monthly pool.',
    render: function () { return h('div', { className: 'pt-80' }, h(Foot, null, h(IK.BalancePopover, { links: false }))); } });
  IK.story('BalancePopover', { title: 'Interactive — Free', render: function () { return h('div', { className: 'pt-80' }, h(Foot, null, h(IK.BalancePopover, { plan: 'free', links: false }))); } });
  IK.story('BalancePopover', { title: 'Interactive — Pro in trial', render: function () { return h('div', { className: 'pt-80' }, h(Foot, null, h(IK.BalancePopover, { plan: 'paid', trialDays: 14, links: false }))); } });

  IK.story('BalancePopover', { title: 'Panel — Free (daily limit, no monthly pool)', render: function () {
    var c = IK.CREDITS.free;
    return h(Panel, null, h(IK.BalancePanel, { planName: c.planName, daily: c.daily, purchased: c.purchased, links: false }));
  } });
  IK.story('BalancePopover', { title: 'Panel — Pro (monthly pool)', render: function () {
    var c = IK.CREDITS.paid;
    return h(Panel, null, h(IK.BalancePanel, { planName: c.planName, pool: c.pool, purchased: c.purchased, links: false }));
  } });
  IK.story('BalancePopover', { title: 'Panel — Pro in trial, purchased 0', render: function () {
    return h(Panel, null, h(IK.BalancePanel, { planName: 'Pro', trialDays: 14, pool: { used: 3200, cap: 10000 }, purchased: 0, links: false }));
  } });
  IK.story('BalancePopover', { title: 'Panel — monthly + daily (both caps)', description: 'Order is always monthly → daily → purchased.', render: function () {
    return h(Panel, null, h(IK.BalancePanel, { planName: 'Pro', pool: { used: 213, cap: 500 }, daily: { used: 32, cap: 50 }, dailySuffix: false, purchased: 540, links: false }));
  } });
  IK.story('BalancePopover', { title: 'Panel — parked: combined bar', render: function () {
    return h(Panel, null, h(IK.BalancePanel, { variant: 'combined', planName: 'Free', left: 827, pool: { used: 213, cap: 500 }, purchasedTotal: 540, purchasedUsed: 0, links: false }));
  } });
  IK.story('BalancePopover', { title: 'Panel — concept: summed balance', render: function () {
    return h(Panel, null, h(IK.BalancePanel, { variant: 'summed', planName: 'Free', left: 827, pool: { used: 213, cap: 500 }, purchased: 540, links: false }));
  } });
  IK.story('BalancePopover', { title: 'Row — Free / Paid', description: 'Hover and press read State/Hover → State/Pressed; open holds the pressed fill.', render: function () {
    return h(Foot, null, h(IK.BalanceRow, { left: IK.CREDITS.free.balance }), h(IK.BalanceRow, { left: IK.CREDITS.paid.balance }));
  } });
  IK.story('BalancePopover', { title: 'Row — inert (as="div")', description: 'The review page’s pinned triggers: same look and hover, not a button, not a focus stop.', render: function () {
    return h(Foot, null, h(IK.BalanceRow, { as: 'div', left: 287 }), h(IK.BalanceRow, { as: 'div', left: '6,800' }));
  } });
})();
