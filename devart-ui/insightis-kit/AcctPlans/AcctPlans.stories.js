(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Body(p) { return h('div', { className: 'flex w-full flex-col gap-4 rounded-lg border border-stroke bg-surface-card p-5' }, p.children); }
  var FEATS = ['Up to 5 users', '5,000 AI credits / month', 'Unlimited data connectors', '1-hour data refresh', 'Custom semantic layer', 'Priority email support'];

  IK.story('AcctPlans', { title: 'Manage plan — Paid account (Starter current)', wide: true,
    description: 'Current-plan strip → "Choose a plan" + period toggle → cards. Starter is the current tier (disabled outline CTA, no tint); Pro is recommended (accent border + wash + lift + its ribbon).',
    render: function () {
      var s = R.useState('monthly'), per = s[0], setPer = s[1];
      var y = per === 'yearly';
      return h(Body, null,
        h(IK.AcctPlanCurrent, { name: 'Starter Monthly', meta: 'Expires on Sep 30, 2026' }),
        h(IK.AcctPlanHead, { size: 'lg', toggle: h(IK.AcctPeriodToggle, { value: per, onChange: setPer, icons: true }) }),
        h('div', { className: 'mt-3 grid grid-cols-3 gap-4' },
          h(IK.AcctPlanCard, { name: 'Free', tagline: 'For getting started', price: '$0', per: 'excl. VAT', perHidden: true, cta: { label: 'Switch to Free' }, features: ['1 user', '500 AI credits / month'] }),
          h(IK.AcctPlanCard, { name: 'Starter', period: y ? 'Yearly' : 'Monthly', ribbons: [{ tone: 'accent', label: '50% OFF' }], tagline: 'For small teams',
            price: y ? '$71.88' : '$7.99', was: y ? '$143.88' : '$19.99', per: 'excl. VAT',
            cta: y ? { label: 'Request Yearly Billing' } : { label: 'Current Plan', disabled: true }, features: FEATS }),
          h(IK.AcctPlanCard, { name: 'Pro', period: y ? 'Yearly' : 'Monthly', featured: true, ribbons: [{ tone: 'brand', label: 'Most popular' }, { tone: 'accent', label: '50% OFF' }],
            tagline: 'For growing teams', price: y ? '$143.88' : '$15.99', was: y ? '$287.88' : '$39.99', per: 'excl. VAT',
            cta: { label: 'Upgrade to Pro', variant: 'primary' }, features: ['Unlimited users', '25,000 AI credits / month'] })));
    } });
  IK.story('AcctPlans', { title: 'Current-plan strip — Free account', description: 'Nothing to expire, nothing to cancel.', render: function () {
    return h(Body, null, h(IK.AcctPlanCurrent, { free: true }));
  } });
  IK.story('AcctPlans', { title: 'Retired page — badges in the name row, solid ribbon, text-only toggle', wide: true, render: function () {
    var s = R.useState('monthly'), per = s[0], setPer = s[1];
    return h(Body, null,
      h(IK.AcctPlanHead, { size: 'sm', toggle: h(IK.AcctPeriodToggle, { value: per, onChange: setPer, size: 'sm' }) }),
      h('div', { className: 'grid grid-cols-3 gap-4' },
        h(IK.AcctPlanCard, { name: 'Free', tagline: 'For getting started', price: '$0', per: ' ', cta: { label: 'Current Plan', disabled: true }, features: ['1 user'] }),
        h(IK.AcctPlanCard, { name: 'Starter', badges: ['50% OFF'], tagline: 'For small teams', price: '$7.99', was: '$19.99', per: 'per user / month', cta: { label: 'Upgrade to Starter' }, features: ['Up to 5 users'] }),
        h(IK.AcctPlanCard, { name: 'Pro', badges: ['50% OFF'], ribbons: [{ tone: 'solid', label: 'Most popular' }], tagline: 'For growing teams', price: '$15.99', was: '$39.99', per: 'per user / month', cta: { label: 'Upgrade to Pro', variant: 'primary' }, features: ['Unlimited users'] })));
  } });
  IK.story('AcctPlans', { title: 'Ribbons — solid · brand · accent', render: function () {
    return h('div', { className: 'flex items-center gap-2' },
      h(IK.AcctRibbon, { tone: 'solid' }, 'Most popular'), h(IK.AcctRibbon, { tone: 'brand' }, 'Most popular'), h(IK.AcctRibbon, { tone: 'accent' }, '50% OFF'));
  } });
  IK.story('AcctPlans', { title: 'Lost list', render: function () { return h(Body, null, h(IK.AcctLostList, { items: FEATS })); } });

  function Opener(p) {
    var s = R.useState(false), open = s[0], setOpen = s[1];
    var t = R.useState(false), sent = t[0], setSent = t[1];
    return h(IK.Fragment, null,
      h(D.Button, { variant: 'secondary', size: 'sm', onClick: function () { setSent(false); setOpen(true); } }, p.label),
      p.render(open, setOpen, sent, setSent));
  }
  IK.story('AcctPlans', { title: 'Dialogs — Cancel plan · Switch to Free · Yearly request', description: 'DevartUI Modal (sm / sm / md). Esc, the scrim, ✕ and either footer button close; the yearly one goes form → Request sent.', render: function () {
    return h('div', { className: 'flex gap-2' },
      h(Opener, { label: 'Cancel Plan', render: function (o, set) {
        return h(IK.AcctConfirmDialog, { open: o, onOpenChange: set, title: 'Cancel Starter plan?', items: FEATS,
          text: 'Your plan stays active until Sep 30, 2026, then moves to Free. You will lose access to these:',
          cancelLabel: 'Keep Starter', confirmLabel: 'Cancel Plan', confirmVariant: 'destructive' });
      } }),
      h(Opener, { label: 'Switch to Free', render: function (o, set) {
        return h(IK.AcctConfirmDialog, { open: o, onOpenChange: set, title: 'Switch to Free?', items: FEATS,
          text: 'You will lose access to these at the end of the current billing period:',
          cancelLabel: 'Keep Current Plan', confirmLabel: 'Switch to Free' });
      } }),
      h(Opener, { label: 'Request Yearly Billing', render: function (o, set, sent, setSent) {
        return h(IK.AcctYearlyDialog, { open: o, onOpenChange: set, sent: sent, onSend: function () { setSent(true); } });
      } }));
  } });
})();
