/* AcctModal — the account settings window (".acct-overlay" + ".acct-modal" in
   pages/approved/user_profile-modal.html and pages/concept/balance-versions-v2-v3.html; locked
   rules in page-changes/user_profile-modal.md). Not a DevartUI Modal on purpose: the original is
   an in-page panel that sits over the page's MAIN column only — the review chrome above it stays
   live — 960px wide, a fixed min(90dvh, 640px) tall whatever the section holds, and below 768px
   it turns into a full-height settings page (menu ⇄ section). D.Modal is a viewport portal dialog
   (≤ 896px, content-height, focus-trapped, scrim over everything) and has no phone layout. What
   lives inside is DevartUI: SidebarMenu rows (nav), IconButton (close / back), Typography.

     desktop  [nav 176px | header (title + ✕) / scrolling content]
     ≤ 767px  data-mobile-state="menu"    → the nav as a full-width settings list (44px rows in a
                                            bordered shell, a › on each row), header "Settings"
              data-mobile-state="section" → the section alone, header ‹ + the section title
              The single ‹ goes section → menu, and menu → closes the window. The phone state is
              decided when the window opens (menu if it opens on a phone) and when a row is picked
              (section, if on a phone) — exactly like the original's acctIsMobile() checks.
              In menu state no row is marked active (the original clears it).

   h(IK.AcctModal, {
     section: 'balance',                 // id of the open section (see IK.ACCT_SECTIONS)
     onSection: function (id) {},        // a nav row was picked
     title: 'Balance',                   // header title; default IK.ACCT_TITLES[section]
     onClose: IK.acctCloseModal,         // ✕, Esc, and ‹ in menu state
     onEscape: fn,                       // optional — Esc goes here instead (return true = handled)
     legacy: true,                       // the retired-concepts page's older recipe: 8px header padding
                                         // (not 14px) and, on a phone, no red wash under Log out
     resourcesHref: '#'
   }, …the open section's content…)

   IK.AcctSection   one ".acct-section" block of a section: column, 12px gap, 20px above/below,
                    a hairline under it; the first one has no top padding, the last no hairline
                    and no bottom padding.
     gap 3 | 4 · divider false · pb 'none' | 3 · pt 5 · row true (title block left, action right)
   IK.AcctFieldRow  { title, value, action } — label over value, the action on the right
   IK.ACCT_SECTIONS ids in nav order · IK.ACCT_TITLES  id → header title
   IK.acctCloseModal()  back to the page that opened the window (history), else the chat landing
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from the original .acct-modal-nav / .acct-header / .acct-mobile-hdr markup. */
  IK.defineIcons({
    'acctm-user': '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    'acctm-plan': '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    'acctm-billing': '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    'acctm-wallet': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    'acctm-feedback': '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5"/>',
    'acctm-resources': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M12 17h.01"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/>',
    'acctm-ext': '<path d="M7 7h10v10"/><path d="m7 17 10-10"/>',
    'acctm-logout': '<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
    'acctm-chev': '<path d="m9 18 6-6-6-6"/>',
    'acctm-back': '<path d="m15 18-6-6 6-6"/>',
    'acctm-close': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
  });

  /* Dialog-title convention: Sentence case (the original's acctSectionTitles). */
  IK.ACCT_TITLES = {
    'my-account': 'My account',
    'manage-plan': 'Manage plan',
    'billing': 'Billing',
    'balance': 'Balance',
    'leave-feedback': 'Feedback',
    'change-password': 'Change password'
  };
  IK.ACCT_SECTIONS = ['my-account', 'manage-plan', 'billing', 'balance', 'leave-feedback', 'change-password'];

  var NAV = [
    { label: 'Account', items: [
      { id: 'my-account', label: 'My account', icon: 'acctm-user' },
      { id: 'manage-plan', label: 'Manage plan', icon: 'acctm-plan' },
      { id: 'billing', label: 'Billing', icon: 'acctm-billing' },
      { id: 'balance', label: 'Balance', icon: 'acctm-wallet' }
    ] },
    { label: 'Support', items: [
      { id: 'leave-feedback', label: 'Leave feedback', icon: 'acctm-feedback' },
      { id: 'resources', label: 'Resources', icon: 'acctm-resources', ext: true }
    ] }
  ];

  /* Closing returns to the page that opened the window — every consumer navigates here with
     ?section=…, so history holds it. Opened directly: the chat landing, never an empty screen. */
  IK.acctCloseModal = function () {
    if (document.referrer && history.length > 1) { history.back(); return; }
    location.href = IK.pageHref ? IK.pageHref('approved/chat-landing.html') : '../approved/chat-landing.html';
  };

  function isPhone() { return window.innerWidth <= 767; }

  IK.AcctSection = function AcctSection(p) {
    var gap4 = p.gap === 4, flat = p.divider === false, pb0 = p.pb === 'none', pb3 = p.pb === 3, pt5 = p.pt === 5;
    return h('div', {
      className: IK.cx('ik-acct-section', gap4 && 'is-gap-4', flat && 'no-divider', pb0 && 'is-pb-0', pb3 && 'is-pb-3',
        pt5 && 'is-pt-5', p.row && 'is-row', p.className),
      id: p.id
    }, p.children);
  };

  IK.AcctFieldRow = function AcctFieldRow(p) {
    return h('div', { className: 'flex flex-wrap items-center justify-between gap-2.5' },
      h('div', null,
        h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, p.title),
        p.value != null ? h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'body', className: 'mt-1' }, p.value) : null),
      p.action || null);
  };

  function NavRow(p) {
    var it = p.item;
    var inner = [
      h(IK.Icon, { key: 'i', name: it.icon, size: 16 }),
      h('span', { key: 'l' }, it.label),
      it.ext
        ? h('span', { key: 'x', className: 'ik-acct-trail' }, h(IK.Icon, { name: 'acctm-ext', size: 14 }))
        : h('span', { key: 'c', className: 'ik-acct-trail ik-acct-chev' }, h(IK.Icon, { name: 'acctm-chev', size: 14 }))
    ];
    var btn = it.ext
      ? h(D.SidebarMenuButton, { asChild: true, className: 'px-2' },
          h('a', { href: p.resourcesHref || '#', target: '_blank', rel: 'noopener', 'aria-label': it.label + ' (opens in new tab)' }, inner))
      : h(D.SidebarMenuButton, { className: 'px-2',
          isActive: p.active, 'aria-current': p.active ? 'true' : undefined,
          onClick: function () { p.onPick(it.id); }
        }, inner);
    return h(D.SidebarMenuItem, null, btn);
  }

  IK.AcctModal = function AcctModal(p) {
    /* Phone state, decided like the original: at open, and when a row is picked. */
    var ms = R.useState(function () { return isPhone() ? 'menu' : null; }), mobile = ms[0], setMobile = ms[1];
    var na = R.useState(function () { return isPhone() ? null : p.section; }), navActive = na[0], setNavActive = na[1];
    var latest = R.useRef(p); latest.current = p;

    function pick(id) {
      setNavActive(id);
      if (isPhone()) setMobile('section');
      if (p.onSection) p.onSection(id);
    }
    /* A section opened from INSIDE a section (Change Password, Upgrade Plan …) re-marks the nav. */
    R.useEffect(function () { if (mobile !== 'menu') setNavActive(p.section); }, [p.section]);

    function close() { (latest.current.onClose || IK.acctCloseModal)(); }
    function back() {
      if (mobile === 'section') { setMobile('menu'); setNavActive(null); }
      else close();
    }
    R.useEffect(function () {
      function onKey(e) {
        if (e.key !== 'Escape') return;
        /* A DevartUI dialog / menu on top already took this Esc (Radix marks it handled) — one press
           never closes two surfaces. */
        if (e.defaultPrevented) return;
        var q = latest.current;
        if (q.onEscape && q.onEscape(e) === true) return;
        close();
      }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, []);

    var title = p.title != null ? p.title : (IK.ACCT_TITLES[p.section] || p.section);
    var active = mobile === 'menu' ? null : navActive;
    var slim = !!p.legacy;

    var nav = h(D.SidebarProvider, {
      className: 'ik-acct-nav min-h-0 w-44 flex-none flex-col gap-3.5 overflow-y-auto border-r border-stroke px-3 py-4',
      role: 'navigation', 'aria-label': 'Account sections'
    },
      NAV.map(function (g) {
        return h('div', { key: g.label, className: 'flex w-full flex-col gap-2' },
          h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary', className: 'ik-acct-label px-2' }, g.label),
          h(D.SidebarMenu, { className: 'ik-acct-list', role: 'group', 'aria-label': g.label },
            g.items.map(function (it) {
              return h(NavRow, { key: it.id, item: it, active: active === it.id, onPick: pick, resourcesHref: p.resourcesHref });
            })));
      }),
      h('div', { className: 'ik-acct-foot mt-auto border-t border-stroke pt-2' },
        h(D.SidebarMenu, { className: 'ik-acct-list' },
          h(D.SidebarMenuItem, null,
            h(D.SidebarMenuButton, { variant: 'destructive', className: 'ik-acct-danger px-2', onClick: p.onLogOut },
              h(IK.Icon, { name: 'acctm-logout', size: 16 }), h('span', null, 'Log out'))))));

    return h('div', { className: 'ik-acct-overlay absolute inset-0 z-40 flex items-center justify-center bg-overlay-scrim p-6 max-md:p-0' },
      h('div', {
        className: IK.cx('ik-acct-modal flex w-full overflow-hidden rounded-xl border border-stroke bg-surface-card shadow-modal', slim && 'is-legacy'),
        role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'acct-modal-title',
        'data-mobile-state': mobile || undefined
      },
        h('div', { className: 'hidden flex-none items-center gap-1 border-b border-stroke px-3 py-1.5 max-md:flex' },
          h(IK.Tip, { tip: 'Back' },
            h(D.IconButton, { variant: 'tertiary', size: '2xs', 'aria-label': 'Back', onClick: function (e) { back(); e.currentTarget.blur(); } },
              h(IK.Icon, { name: 'acctm-back' }))),
          h(D.Typography, { element: 'span', textStyle: 'title20', textColor: 'primary' }, mobile === 'menu' ? 'Settings' : title)),
        nav,
        h('div', { className: 'ik-acct-body flex min-w-0 flex-1 flex-col overflow-hidden' },
          h('div', { className: IK.cx('flex flex-none items-center gap-2 border-b border-stroke px-5 max-md:hidden', slim ? 'py-2' : 'py-3.5') },
            h(D.Typography, { element: 'h2', id: 'acct-modal-title', textStyle: 'heading20', textColor: 'primary', className: 'min-w-0 flex-1' }, title),
            h(IK.Tip, { tip: 'Close' },
              h(D.IconButton, { variant: 'tertiary', size: 'md', 'aria-label': 'Close account settings', onClick: close },
                h(IK.Icon, { name: 'acctm-close' })))),
          h('div', { className: 'flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 max-md:p-4' }, p.children))));
  };
})();
