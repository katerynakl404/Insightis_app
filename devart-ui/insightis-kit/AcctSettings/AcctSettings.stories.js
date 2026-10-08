(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  /* A section body as the window draws it: card surface, 20px padding. */
  function Body(p) { return h('div', { className: 'flex w-full flex-col rounded-lg border border-stroke bg-surface-card p-5' }, h('div', null, p.children)); }

  IK.story('AcctSettings', { title: 'My account', wide: true,
    description: 'Change Password is a LinkButton (Title Case, a user decision). The Theme control is a local choice — it does not switch the page theme, like the original; below 768px it shows icons only.',
    render: function () { return h(Body, null, h(IK.AcctMyAccount, { onChangePassword: function () {} })); } });
  IK.story('AcctSettings', { title: 'Change password', wide: true,
    description: 'DevartUI PasswordInput ×2 — the eye toggles show / hide (its aria-label names the field). Cancel goes back to My account.',
    render: function () { return h(Body, null, h(IK.AcctChangePassword, { onCancel: function () {} })); } });
  IK.story('AcctSettings', { title: 'Leave feedback', wide: true,
    render: function () { return h(Body, null, h(IK.AcctFeedback)); } });
  IK.story('AcctSettings', { title: 'Billing — Starter (shipped page)', wide: true,
    render: function () {
      return h(Body, null, h(IK.AcctBilling, {
        plan: { name: 'Starter', price: '$7.99 / user / month' }, next: { amount: '$7.99', date: 'Sep 30, 2026' },
        rows: [['Aug 30, 2026', 'Starter — monthly', '$7.99'], ['May 30, 2026', 'Credit pack — 5,000', '$9.99']]
      }));
    } });
  IK.story('AcctSettings', { title: 'Billing — Free (retired-concepts page)', wide: true,
    render: function () {
      return h(Body, null, h(IK.AcctBilling, {
        plan: { name: 'Free', price: '$0 / month' }, next: { amount: '$9.99', date: 'Jul 11, 2026' },
        rows: [['Jun 11, 2026', 'Starter — monthly', '$9.99']]
      }));
    } });
  IK.story('AcctSettings', { title: 'AcctTable — credit usage', wide: true,
    render: function () {
      return h(Body, null, h(IK.AcctTable, { columns: [{ label: 'Date' }, { label: 'Request type' }, { label: 'Spent credits' }],
        rows: [['Jan 29, 2026', 'Chat', '15'], ['Jan 29, 2026', 'Report', '20'], ['Jan 5, 2026', 'Chat', '3']] }));
    } });
})();
