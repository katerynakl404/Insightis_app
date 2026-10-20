/* AppSidebar — the product sidebar every app screen shares (".sbx" in the original; changes/Sidebar.md),
   built on DevartUI's Sidebar primitives. Use it through IK.AppShell, which provides the
   SidebarProvider it needs; render it yourself only inside a D.SidebarProvider.

     header   the Insightis logo (→ New Chat, tooltip "New Chat") + the collapse trigger
              (DevartUI SidebarTrigger with its own tooltip — "Collapse sidebar" / "Expand
              sidebar", none while it is the phone drawer; there it closes the drawer)
     nav      New Chat · Data Sources · Metrics · Files — DevartUI SidebarNavItem rows; the
              active one is State/Pressed + Text/Body with aria-current="page" (no self-reload);
              a count rides at the row's end (badge), not on the rail
              + Workspaces, right under New Chat, only when the page passes `workspaces` (shared workspaces,
              AIINS-1852): it opens the Workspaces list (concept/workspaces.html), and every nav link
              keeps the feature's review state (IK.wsHref) so the row stays from page to page
     chats    Pinned / Recent (IK.SidebarChats) — rows, ⋮ menu, Rename / Delete dialogs
     promo    Free only: DevartUI PromoCard "Upgrade to Pro" in SidebarPromo (above the footer rule,
              hidden on the rail), dismissible for the session (the plan switch does not bring it
              back)
     footer   Balance row → IK.BalancePopover · user row → IK.AccountMenu ("Admin · Free" /
              "Admin · Pro" follows the plan)

   Icon rail (desktop, collapsible="icon"): labels go, every nav row and the Chats icon tip their
   label to the RIGHT (only while collapsed — expanded, the label is visible); the chat sections,
   the promo and the Balance row go; the user row is the avatar alone; the Chats icon re-expands.
   Below 1024px DevartUI renders the sidebar as a left Sheet (the off-canvas drawer) on the scrim;
   open it with IK.SidebarBurger. Widening the window past it closes the drawer (SidebarProvider).

   Props (all optional)
     nav          'new-chat' | 'data-sources' | 'metrics' | 'files' | 'workspaces' | null   active nav row
     currentChat  id or title of the chat that is open (row = current, no new-activity dot)
     chats        an IK.useChats() store — pass it when the page mirrors a chat elsewhere
                  (chat header menu); otherwise the sidebar keeps its own
     plan         'free' | 'paid'   default IK.usePlan()
     user         { name: 'Kateryna K.', initial: 'K', role: 'Admin' }
     credits      override the IK.CREDITS entry for the current plan
     trialDays    → "Trial ends in N days" in the balance panel (Pro only)
     promo        false hides the Free-plan promo card even on Free
     badges       { 'data-sources': 3 } — a count pill at the end of a nav row (not in the rail)
     workspaces   an IK.useWorkspaces(…) store → the Workspaces nav row; absent → no trace of it
     classic      true → chat_page-landing's older copy of the sidebar, reproduced as it renders: the
                  logo is a plain mark (no New Chat link / tooltip), 2px section chevrons, the older
                  account-menu glyphs (AccountMenu iconSet 'classic')
     brandLink    false → the logo is a plain mark (no New Chat link, no tooltip, no Tab stop) — the
                  Data Sources, Files and Metrics originals; only chat-landing's logo is a New Chat
                  button. Default true (classic implies false).
     accountIcons 'classic' → the older account-menu glyphs (the Data Sources, Files and Metrics
                  originals draw chat_page-landing's set too). classic implies 'classic'.
     dailySuffix  false → the balance panel's Daily Limit reads "32 of 50", not "… today"
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

  /* shared workspaces — the row the nav gains when the page passes a workspaces store */
  var WS_NAV = { key: 'workspaces', label: 'Workspaces', icon: 'ws-layers', href: 'concept/workspaces.html' };

  /* Dismissed stays dismissed for the page session — flipping the plan must not bring it back,
     or the X reads as "hide until you touch anything" (kit-kit.js §10). */
  var promoOff = false;

  function NavRow(p) {
    var it = p.item, active = p.active;
    /* SidebarMenuItem: the list item the nav rows are; SidebarNavItem asChild puts the row on the
       page link, which carries aria-current (the active paint) and the no-self-reload click. */
    return h(D.SidebarMenuItem, null,
      h(D.SidebarNavItem, {
        asChild: true, label: it.label, icon: h(IK.Icon, { name: it.icon, size: 16 }), withTooltip: p.collapsed,
        badge: p.badge != null ? h(D.Badge, { variant: 'brand', size: 'sm', rounded: 'full', className: 'tabular-nums' }, p.badge) : undefined
      },
        h('a', {
          href: p.ws ? IK.wsHref(it.href) : IK.pageHref(it.href), 'aria-current': active ? 'page' : undefined,
          onClick: active ? function (e) { e.preventDefault(); } : undefined
        })));
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
    var ws = p.workspaces || null;
    /* Workspaces sits right under New Chat (user, 2026-10-19) */
    /* Workspaces last: New Chat · Data Sources · Metrics · Files · Workspaces (user, 2026-10-19) */
    var nav = ws ? IK.APP_NAV.concat([WS_NAV]) : IK.APP_NAV;

    var showPromo = plan === 'free' && !promoHidden && p.promo !== false;

    /* The dialogs sit OUTSIDE the Sidebar: below 1024px the Sidebar is a Sheet whose content only
       exists while it is open, and a chat page's header may ask for Rename with the drawer shut. */
    return h(IK.Fragment, null, h(D.Sidebar, { collapsible: 'icon', className: p.className },
      h(D.SidebarHeader, null,
        /* Collapsed, the 20px mark holds the square and the trigger swaps in on hover / focus —
           the original .sbx.is-collapsed .sbx-brand-id / .sbx-collapse, which SidebarPanelHeader is. */
        h(D.SidebarPanelHeader, {
          logoIcon: h('div', null,
            /* classic / brandLink false: the logo is a plain mark, not the New Chat link */
            p.classic || p.brandLink === false
              ? h('div', { className: 'flex min-w-0 items-center' },
                  h(IK.Logo, collapsed ? { variant: 'mark', height: 20, label: 'Insightis' } : { variant: 'full', height: 24, label: 'Insightis' }))
              : h(IK.Tip, { tip: 'New Chat' },
                  h('a', { href: IK.pageHref('approved/chat-landing.html'), 'aria-label': 'New Chat',
                           className: IK.cx('flex min-w-0 items-center rounded-md', D.focusRing) },
                    h(IK.Logo, collapsed ? { variant: 'mark', height: 20 } : { variant: 'full', height: 24 })))),
          sidebarTrigger: h(D.SidebarTrigger, {
            size: 'xs', className: 'shrink-0 p-0', label: collapsed ? 'Expand sidebar' : 'Collapse sidebar',
            tooltip: true, tooltipSide: collapsed ? 'right' : 'bottom'
          })
        })),
      h(D.SidebarContent, null,
        h(D.SidebarGroup, null,
          h(D.SidebarMenu, null,
            nav.map(function (it) {
              return h(NavRow, { key: it.key, item: it, ws: !!ws, active: p.nav === it.key, collapsed: collapsed, badge: p.badges ? p.badges[it.key] : null });
            }))),
        collapsed
          ? h(D.SidebarGroup, null,
              h(D.SidebarMenu, null,
                h(D.SidebarMenuItem, null,
                  h(D.SidebarMenuButton, { tooltip: { children: 'Chats' }, 'aria-label': 'Chats', onClick: function () { sb.setOpen(true); } },
                    h(IK.Icon, { name: 'nav-chats', size: 16 }), h('span', null, 'Chats')))))
          : h(IK.SidebarChats, { chats: chats, current: p.currentChat })),
      showPromo ? h(D.SidebarPromo, null,
        h(D.PromoCard, {
          icon: h(IK.Icon, { name: 'sparkles', size: 20 }),
          title: 'Upgrade to Pro',
          description: 'Unlimited sources and 15,000 credits a month',
          href: IK.planUrl(),
          onDismiss: function () { promoOff = true; setPromoHidden(true); }
        })) : null,
      h(D.SidebarFooter, null,
        collapsed ? null : h(IK.BalancePopover, { plan: plan, credits: p.credits, trialDays: p.trialDays, dailySuffix: p.dailySuffix }),
        h(IK.AccountMenu, {
          plan: plan, collapsed: collapsed, iconSet: p.classic ? 'classic' : p.accountIcons,
          name: user.name, initial: user.initial, role: user.role
        }))),
      h(IK.ChatDialogs, { chats: chats }));
  };
})();
