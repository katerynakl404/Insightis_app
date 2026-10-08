(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;

  /* The sidebar alone, in its own provider (IK.AppShell does exactly this for pages). The shell
     class contains DevartUI's fixed desktop panel inside the frame. */
  function Frame(p) {
    return h(D.SidebarProvider, { defaultOpen: !p.collapsed, className: 'ik-shell', style: { height: 600 } },
      h(IK.Providers, null,
        h(IK.AppSidebar, { nav: p.nav, plan: p.plan, currentChat: p.currentChat, badges: p.badges }),
        h(D.SidebarInset, { className: 'min-h-0' })));
  }

  IK.story('AppSidebar', { title: 'Expanded — Paid', render: function () { return h(Frame, { nav: 'new-chat', plan: 'paid' }); } });
  IK.story('AppSidebar', { title: 'Expanded — Free (promo, Admin · Free)', render: function () { return h(Frame, { nav: 'data-sources', plan: 'free' }); } });
  IK.story('AppSidebar', { title: 'Nav count badge', description: 'badges: { metrics: 3 } — a pill at the row end; not shown in the rail.',
    render: function () { return h(Frame, { nav: 'data-sources', plan: 'paid', badges: { metrics: 3 } }); } });
  IK.story('AppSidebar', { title: 'Icon rail — Paid', render: function () { return h(Frame, { nav: 'metrics', plan: 'paid', collapsed: true }); } });
  IK.story('AppSidebar', { title: 'Icon rail — Free', render: function () { return h(Frame, { nav: 'files', plan: 'free', collapsed: true }); } });
  IK.story('AppSidebar', { title: 'Phone drawer', description: 'Below 1024px the sidebar is a DevartUI Sheet from the left over the scrim — open it with IK.SidebarBurger (resize the window under 1024px and use the button).',
    render: function () {
      return h(D.SidebarProvider, { className: 'ik-shell', style: { height: 120 } },
        h(IK.Providers, null,
          h(IK.AppSidebar, { nav: 'files' }),
          h(D.SidebarInset, { className: 'min-h-0 p-4' },
            h('div', { className: 'flex items-center gap-2' }, h(IK.SidebarBurger),
              h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary' }, 'The burger shows below 1024px')))));
    } });
})();
