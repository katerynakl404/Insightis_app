/* AppShell — the app frame of every product screen (".cl-shell" + ".cl-side" + ".cl-main" in the
   original): IK.AppSidebar on the left, the page's main column on the right. DevartUI
   SidebarProvider + Sidebar (collapsible="icon") + SidebarInset underneath.

     ≥ 1024px  sidebar in flow (16rem), the trigger in its header collapses it IN PLACE to the
               icon rail (DevartUI --sidebar-width-icon, 3rem) and back.
     < 1024px  no rail: the sidebar is a DevartUI Sheet sliding in from the left over the
               overlay-scrim (18rem), opened by IK.SidebarBurger; the scrim, Esc or the trigger
               inside close it. Crossing back to desktop closes it.

   The shell fills the viewport under the ReviewBar and never scrolls itself; the main column
   scrolls (scroll: true) or the page brings its own scroller (scroll: false) — the viewport-locked
   chat screens, and the list pages, whose IK.ListPage (DevartUI ListPageLayout) is the scroller.
   The originals of Data Sources, Files and Chats Library scrolled as a document; the kit's
   'document' mode that reproduced it went with IK.PageHead (2026-10-19).

   h(IK.AppShell, {
     nav: 'data-sources',            // active nav row: 'new-chat' | 'data-sources' | 'metrics' | 'files' | 'workspaces'
     currentChat: 'jira-aiins',      // id or title of the open chat (chat pages)
     chats: chatsStore,              // optional IK.useChats() store — share it with a chat header menu
     glow: true,                     // chat-landing's background: the radial top tint + the blurred brand-tertiary pool, both themes (see AppShell.css)
     burger: 'float' | false,        // default 'float': the drawer trigger floats top-left of the main
                                     // column below 1024px. Pages with their own header pass false and
                                     // put h(IK.SidebarBurger) first in that header instead.
     scroll: true,                   // main column is a scroll container (false: page manages it)
     defaultCollapsed: false,        // start desktop in the icon rail
     plan, user, credits, trialDays, promo, badges, classic, brandLink, accountIcons,
     dailySuffix, workspaces   → IK.AppSidebar (see AppSidebar.js)
     mainClassName,                  // layout classes for the main column (pg-* or utilities)
     className, style                // the shell itself (stories give it a height)
   }, …the page's main column…)

   IK.SidebarBurger  { className }   the drawer trigger: DevartUI SidebarMobileTrigger, "Open
                                     sidebar" (tooltip + label), hidden ≥ 1024px. Inside AppShell.

   IK.pageHref(rel)  → absolute URL of devart-ui/pages/<rel>, resolved from this script's own URL,
                       so links work from file://, a local server or GitHub Pages and from any
                       folder depth (the devart-ui/pages tree mirrors pages/ file for file).
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  var me = document.currentScript;
  var ROOT = me && me.src ? new URL('../../pages/', me.src).href : '../pages/';
  IK.PAGES_ROOT = ROOT;
  IK.pageHref = function (rel) {
    if (!rel) return ROOT;
    try { return new URL(rel, ROOT).href; } catch (e) { return ROOT + rel; }
  };

  /* DevartUI SidebarMobileTrigger, named "Open sidebar" in its own tooltip; gone from lg, where
     the sidebar is on screen. */
  IK.SidebarBurger = function SidebarBurger(p) {
    return h(D.SidebarMobileTrigger, { label: 'Open sidebar', tooltip: true, className: IK.cx('lg:hidden', p.className) });
  };

  IK.AppShell = function AppShell(p) {
    return h(D.SidebarProvider, {
      defaultOpen: !p.defaultCollapsed,
      className: IK.cx('ik-shell', p.className), style: p.style
    },
      /* SidebarProvider brings its own TooltipProvider (300 ms WITH a warm-up); the kit's timing
         is 300 ms on every hover, no warm-up — so the kit's provider is restored inside it. */
      h(IK.Providers, null,
        h(IK.AppSidebar, {
          nav: p.nav, currentChat: p.currentChat, chats: p.chats, plan: p.plan, user: p.user,
          credits: p.credits, trialDays: p.trialDays, promo: p.promo, badges: p.badges, classic: p.classic,
          brandLink: p.brandLink, accountIcons: p.accountIcons, dailySuffix: p.dailySuffix,
          workspaces: p.workspaces
        }),
        h(D.SidebarInset, { className: IK.cx('min-h-0', p.glow && 'ik-shell-glow', p.mainClassName) },
          p.burger === false ? null : h('div', { className: 'absolute left-3 top-3 z-10 lg:hidden' }, h(IK.SidebarBurger)),
          p.scroll === false ? p.children
            : h('div', { className: 'relative flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-thin' }, p.children))));
  };
})();
