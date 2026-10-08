(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* The window sits over a main column; a story gives it one (relative, fixed height). */
  function Stage(p) {
    return h('div', { className: 'relative w-full overflow-hidden rounded-lg border border-stroke bg-surface-page', style: { height: p.height || 720 } }, p.children);
  }
  function Live(p) {
    var s = R.useState(p.start || 'my-account'), sec = s[0], setSec = s[1];
    return h(Stage, { height: p.height },
      h(IK.AcctModal, { section: sec, onSection: setSec, legacy: p.legacy, onClose: function () {}, onEscape: function () { return true; } },
        h('div', { key: sec },
          h(IK.AcctSection, null, h(IK.AcctFieldRow, { title: 'Section', value: IK.ACCT_TITLES[sec] })),
          h(IK.AcctSection, null, h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'secondary' }, 'Pick a row in the nav — it is marked active (State/Pressed); hover shows State/Hover; Log out is the destructive row.')))));
  }

  IK.story('AcctModal', { title: 'Window — interactive (desktop)', wide: true,
    description: 'Nav rows are DevartUI SidebarMenuButton. ✕ (tooltip "Close") and Esc call onClose. Resources opens a new tab. Below 768px the window becomes the phone settings page — narrow the storybook to see menu ⇄ section.',
    render: function () { return h(Live, { start: 'balance' }); } });
  IK.story('AcctModal', { title: 'Window — legacy recipe (retired-concepts page)', wide: true,
    description: 'legacy: the retired-concepts page keeps the older 8px header padding and, on a phone, no red wash under Log out.',
    render: function () { return h(Live, { start: 'billing', legacy: true }); } });
  /* The phone layout keys on the VIEWPORT (like the original), so it is shown in a 375px frame. */
  function Phone(p) {
    return h('iframe', { title: p.title, src: IK.pageHref('approved/user_profile-modal.html' + (p.q || '')), width: 375, height: 700,
      className: 'rounded-lg border border-stroke bg-surface-page' });
  }
  IK.story('AcctModal', { title: 'Phone — menu state (375px)', description: 'Opened on a phone: the nav is the page — 44px rows in a bordered shell, a › per row, no row active; header ‹ Settings (‹ closes). Pick a row → the section state: ‹ + the section title, ‹ goes back to the menu.',
    render: function () { return h(Phone, { title: 'Account window on a phone', q: '?section=balance' }); } });

  IK.story('AcctModal', { title: 'AcctSection — the four variants', render: function () {
    return h('div', { className: 'flex w-full flex-col rounded-lg border border-stroke bg-surface-card p-5' },
      h(IK.AcctSection, null, h(IK.AcctFieldRow, { title: 'First section', value: 'No top padding, hairline under it',
        action: h(D.Button, { variant: 'secondary', size: 'sm' }, 'Action') })),
      h(IK.AcctSection, { row: true },
        h('div', null, h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, 'Row section'),
          h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'secondary', className: 'mt-1' }, 'Title block left, action right')),
        h(D.Button, { variant: 'destructiveOutline', size: 'sm', className: 'ms-auto flex-none' }, 'Delete Account')),
      h(IK.AcctSection, { gap: 4, divider: false, pb: 3 }, h(IK.AcctFieldRow, { title: 'gap 4 · no divider · pb 3' })),
      h(IK.AcctSection, null, h(IK.AcctFieldRow, { title: 'Last section', value: 'No hairline, no bottom padding' })));
  } });
})();
