/* AppSidebar — the product sidebar every app screen shares (".sbx" in the original; changes/Sidebar.md),
   built on DevartUI's Sidebar primitives. Use it through IK.AppShell, which provides the
   SidebarProvider it needs; render it yourself only inside a D.SidebarProvider.

     header   the Insightis logo (→ New Chat, tooltip "New Chat") + the collapse trigger
              (DevartUI SidebarTrigger; tooltip "Collapse" / "Expand", label "Collapse sidebar" /
              "Expand sidebar"; in the phone drawer it closes the drawer)
     nav      New Chat · Data Sources · Metrics · Files — DevartUI SidebarMenuButton rows; the
              active one is State/Pressed + Text/Body with aria-current="page" (no self-reload)
     chats    Pinned / Recent (IK.SidebarChats) — rows, ⋮ menu, Rename / Delete dialogs
     promo    Free only: DevartUI PromoCard "Upgrade to Pro" above the footer rule, dismissible
              for the session (the plan switch does not bring it back); hidden in the icon rail
     footer   Balance row → IK.BalancePopover · user row → IK.AccountMenu ("Admin · Free" /
              "Admin · Pro" follows the plan)

   Icon rail (desktop, collapsible="icon"): labels go, every nav row and the Chats icon tip their
   label to the RIGHT (only while collapsed — expanded, the label is visible); the chat sections,
   the promo and the Balance row go; the user row is the avatar alone; the Chats icon re-expands.
   Below 1024px DevartUI renders the sidebar as a left Sheet (the off-canvas drawer) on the scrim;
   open it with IK.SidebarBurger.

   Props (all optional)
     nav          'new-chat' | 'data-sources' | 'metrics' | 'files' | null   active nav row
     currentChat  id or title of the chat that is open (row = current, no new-activity dot)
     chats        an IK.useChats() store — pass it when the page mirrors a chat elsewhere
                  (chat header menu); otherwise the sidebar keeps its own
     plan         'free' | 'paid'   default IK.usePlan()
     user         { name: 'Kateryna K.', initial: 'K', role: 'Admin' }
     credits      override the IK.CREDITS entry for the current plan
     trialDays    → "Trial ends in N days" in the balance panel (Pro only)
     promo        false hides the Free-plan promo card even on Free
     badges       { 'data-sources': 3 } — a count pill at the end of a nav row (not in the rail)
     classic      true → chat_page-landing's older copy of the sidebar, reproduced as it renders: the
                  logo is a plain mark (no New Chat link / tooltip), 2px section chevrons, the older
                  account-menu glyphs (AccountMenu iconSet 'classic')
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from the original .sbx markup. */
  IK.defineIcons({
    'nav-new-chat': '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    'nav-data-sources': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    'nav-files': '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    'nav-chats': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'
  });

  IK.APP_NAV = [
    { key: 'new-chat', label: 'New Chat', icon: 'nav-new-chat', href: 'approved/chat-landing.html' },
    { key: 'data-sources', label: 'Data Sources', icon: 'nav-data-sources', href: 'approved/data-sources_connections-landing.html' },
    { key: 'metrics', label: 'Metrics', icon: 'metrics', href: 'approved/metrics-landing.html' },
    { key: 'files', label: 'Files', icon: 'nav-files', href: 'approved/data-sources_files-landing.html' }
  ];

  /* Dismissed stays dismissed for the page session — flipping the plan must not bring it back,
     or the X reads as "hide until you touch anything" (kit-kit.js §10). */
  var promoOff = false;

  /* The collapse trigger tips on HOVER only (the original's tooltip engine never answers focus):
     opening the phone drawer moves focus into it, and a focus-opened "Collapse" bubble would sit
     over the drawer's head for no pointer at all. */
  function PointerTip(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var over = R.useRef(false);
    return h(D.Tooltip, { open: open, onOpenChange: function (v) { setOpen(v && over.current); } },
      h(D.TooltipTrigger, {
        asChild: true,
        onPointerEnter: function () { over.current = true; },
        onPointerLeave: function () { over.current = false; setOpen(false); }
      }, p.children),
      h(D.TooltipContent, { side: p.side || 'top' }, p.tip));
  }

  function NavRow(p) {
    var it = p.item, active = p.active;
    /* The optional count rides at the row's end as a pill (Sidebar.md "With badge / counter");
       the rail has no room for it, so it is not rendered there — the label stays the last child,
       which is what the rail's hide-the-label rule keys on. */
    var badge = p.badge != null && !p.collapsed
      ? h(D.Badge, { variant: 'brand', size: 'sm', rounded: 'full', className: 'ms-auto tabular-nums' }, p.badge) : null;
    return h(D.SidebarMenuItem, null,
      /* px-2: the row's 8px inset (.sbx-nav-item 0 8px). The package's button has none at full
       width — its own comment counts on one (the collapsed rail strips it with !px-0) — so the
       icon sat flush on the hover pill's edge. */
      h(D.SidebarMenuButton, { asChild: true, isActive: active, className: 'ik-nav-row px-2', tooltip: { children: it.label } },
        h('a', {
          href: IK.pageHref(it.href), 'aria-current': active ? 'page' : undefined,
          onClick: active ? function (e) { e.preventDefault(); } : undefined
        }, h(IK.Icon, { name: it.icon, size: 16 }), h('span', { className: 'min-w-0 truncate' }, it.label), badge)));
  }

  IK.AppSidebar = function AppSidebar(p) {
    var sb = D.useSidebar();
    var collapsed = sb.state === 'collapsed' && !sb.isMobile;
    var planS = IK.usePlan()[0];
    var plan = p.plan || planS;
    var own = IK.useChats();
    var chats = p.chats || own;
    var pr = R.useState(promoOff), promoHidden = pr[0], setPromoHidden = pr[1];
    var user = p.user || {};

    /* Crossing back to desktop closes the phone drawer, so it does not reappear open the next
       time the window narrows (the original's resize reset). */
    R.useEffect(function () { if (!sb.isMobile && sb.openMobile) sb.setOpenMobile(false); }, [sb.isMobile]);

    var showPromo = plan === 'free' && !promoHidden && p.promo !== false;

    /* The dialogs sit OUTSIDE the Sidebar: below 1024px the Sidebar is a Sheet whose content only
       exists while it is open, and a chat page's header may ask for Rename with the drawer shut. */
    return h(IK.Fragment, null, h(D.Sidebar, { collapsible: 'icon', className: p.className },
      h(D.SidebarHeader, null,
        h(D.SidebarBrand, null,
          /* classic: chat_page-landing's older copy — the logo is a plain mark, not the New Chat link */
          p.classic
            ? h('div', { className: 'flex min-w-0 items-center' }, h(IK.Logo, { variant: 'full', height: 24, label: 'Insightis' }))
            : h(IK.Tip, { tip: 'New Chat' },
                h('a', { href: IK.pageHref('approved/chat-landing.html'), 'aria-label': 'New Chat',
                         className: IK.cx('flex min-w-0 items-center rounded-md', D.focusRing) },
                  h(IK.Logo, { variant: 'full', height: 24 }))),
          h(PointerTip, { tip: collapsed ? 'Expand' : 'Collapse', side: collapsed ? 'right' : 'bottom' },
            h(D.SidebarTrigger, { label: collapsed ? 'Expand sidebar' : 'Collapse sidebar' })))),
      h(D.SidebarContent, null,
        h(D.SidebarGroup, null,
          h(D.SidebarMenu, null,
            IK.APP_NAV.map(function (it) {
              return h(NavRow, { key: it.key, item: it, active: p.nav === it.key, collapsed: collapsed, badge: p.badges ? p.badges[it.key] : null });
            }))),
        collapsed
          ? h(D.SidebarGroup, null,
              h(D.SidebarMenu, null,
                h(D.SidebarMenuItem, null,
                  h(D.SidebarMenuButton, { tooltip: { children: 'Chats' }, 'aria-label': 'Chats', onClick: function () { sb.setOpen(true); } },
                    h(IK.Icon, { name: 'nav-chats', size: 16 }), h('span', null, 'Chats')))))
          : h('div', { className: 'pt-2 group-data-[collapsible=icon]:hidden' },
              h(IK.SidebarChats, { chats: chats, current: p.currentChat, chevronStroke: p.classic ? 2 : undefined }))),
      showPromo ? h('div', { className: 'px-2 pb-2 group-data-[collapsible=icon]:hidden' },
        h(D.PromoCard, {
          icon: h(IK.Icon, { name: 'sparkles', size: 20 }),
          title: 'Upgrade to Pro',
          description: 'Unlimited sources and 15,000 credits a month',
          href: IK.planUrl(),
          onDismiss: function () { promoOff = true; setPromoHidden(true); }
        })) : null,
      h(D.SidebarFooter, null,
        collapsed ? null : h(IK.BalancePopover, { plan: plan, credits: p.credits, trialDays: p.trialDays }),
        h(IK.AccountMenu, {
          plan: plan, collapsed: collapsed, iconSet: p.classic ? 'classic' : undefined,
          name: user.name, initial: user.initial, role: user.role,
          className: collapsed ? 'mx-auto' : undefined
        }))),
      h(IK.ChatDialogs, { chats: chats }));
  };
})();
