(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;   /* storybook demos stay inert, as in the original kit */

  /* A stand-in main column: page title + a burger slot, the way a page would compose it. */
  function Main(p) {
    return h('div', { className: 'flex flex-col gap-4 p-6' },
      h('div', { className: 'flex items-center gap-3' },
        p.ownBurger ? h(IK.SidebarBurger) : null,
        h(D.Typography, { element: 'h1', textStyle: 'title20', textColor: 'primary' }, p.title)),
      h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary' }, p.note));
  }

  var frame = { height: 640 };

  IK.story('AppShell', { title: 'Desktop — nav row active (Data Sources), page owns its burger', wide: true,
    description: 'nav="data-sources", burger={false} + IK.SidebarBurger in the page header (visible below 1024px). Plan follows the ReviewBar / IK.usePlan().',
    render: function () {
      return h(IK.AppShell, { nav: 'data-sources', burger: false, style: frame },
        h(Main, { ownBurger: true, title: 'Data Sources', note: 'The main column scrolls; the shell never does.' }));
    } });

  IK.story('AppShell', { title: 'Chat page — current chat, floating burger', wide: true,
    description: 'currentChat="jira-aiins": the row is current (State/Pressed + Text/Body) and its new-activity dot is gone.',
    render: function () {
      return h(IK.AppShell, { currentChat: 'jira-aiins', style: frame },
        h(Main, { title: 'Jira · first 5 AIINS issues', note: 'burger defaults to "float": top-left of the main column below 1024px.' }));
    } });

  IK.story('AppShell', { title: 'Chat landing — background glow', wide: true,
    description: 'glow: as chat-landing renders it — flat Surface/Page in light; in dark the radial --chat-shell-bg tint at the top. Switch the theme to see it.',
    render: function () {
      return h(IK.AppShell, { glow: true, scroll: false, style: frame },
        h('div', { className: 'flex flex-1 items-center justify-center p-6' },
          h(D.Typography, { element: 'h1', textStyle: 'heading30', textColor: 'primary', align: 'center' }, 'What insight are you looking for?')));
    } });

  IK.story('AppShell', { title: 'Icon rail (desktop collapsed)', wide: true,
    description: 'defaultCollapsed: labels go, rail items tip their label to the right, the Chats icon and the trigger re-expand.',
    render: function () {
      return h(IK.AppShell, { nav: 'metrics', defaultCollapsed: true, burger: false, style: frame },
        h(Main, { title: 'Metrics', note: 'Hover a rail icon: its tooltip opens to the right after 300 ms.' }));
    } });

  IK.story('AppShell', { title: 'Free plan — promo card, "Admin · Free", daily-limit balance', wide: true,
    description: 'plan="free" forced here; on a page it follows the Paid / Free switch.',
    render: function () {
      return h(IK.AppShell, { nav: 'files', plan: 'free', burger: false, style: frame },
        h(Main, { title: 'Files', note: 'The promo card dismisses for the session.' }));
    } });

  IK.story('AppShell', { title: 'Classic — the chat page’s older sidebar copy', wide: true,
    description: 'classic: the logo is a plain mark (no New Chat link or tooltip), 2px section chevrons, and the account menu draws the older Balance / Leave feedback / Resources / Dark / System glyphs — chat_page-landing as it renders.',
    render: function () {
      return h(IK.AppShell, { currentChat: 'jira-aiins', classic: true, burger: false, style: frame },
        h(Main, { ownBurger: true, title: 'Jira · first 5 AIINS issues', note: 'Open the account menu to see the older glyphs.' }));
    } });

  IK.story('AppShell', { title: 'Pro in trial — trial badge in the balance panel', wide: true,
    render: function () {
      return h(IK.AppShell, { nav: 'new-chat', plan: 'paid', trialDays: 14, burger: false, style: frame },
        h(Main, { title: 'New chat', note: 'Open the Balance row: "Pro" + "Trial ends in 14 days".' }));
    } });
})();
