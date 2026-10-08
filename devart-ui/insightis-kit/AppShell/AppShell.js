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
   chat screens. scroll: 'document' is the other kind of original (Data Sources, Files, Metrics…):
   the PAGE scrolls as a document, the ReviewBar stays on top (sticky) and the sidebar stays put
   in the viewport under it (the original .cl-side is sticky at the bar's height, 100vh tall), the
   main column grows with its content — at least the viewport under the bar.

   h(IK.AppShell, {
     nav: 'data-sources',            // active nav row: 'new-chat' | 'data-sources' | 'metrics' | 'files'
     currentChat: 'jira-aiins',      // id or title of the open chat (chat pages)
     chats: chatsStore,              // optional IK.useChats() store — share it with a chat header menu
     glow: true,                     // chat-landing's background: flat in light, the radial brand-tertiary tint in dark (see AppShell.css)
     burger: 'float' | false,        // default 'float': the drawer trigger floats top-left of the main
                                     // column below 1024px. Pages with their own header pass false and
                                     // put h(IK.SidebarBurger) first in that header instead.
     scroll: true,                   // main column is a scroll container (false: page manages it;
                                     // 'document': the page scrolls as a document — see above)
     defaultCollapsed: false,        // start desktop in the icon rail
     plan, user, credits, trialDays, promo, badges, classic   → IK.AppSidebar (see AppSidebar.js)
     mainClassName,                  // layout classes for the main column (pg-* or utilities)
     className, style                // the shell itself (stories give it a height)
   }, …the page's main column…)

   IK.SidebarBurger  { className }   the drawer trigger: IconButton tertiary sm, "Open sidebar"
                                     (tooltip + label), hidden ≥ 1024px. Must sit inside AppShell.

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

  IK.defineIcons({
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'
  });

  IK.SidebarBurger = function SidebarBurger(p) {
    var sb = D.useSidebar();
    return h(IK.Tip, { tip: 'Open sidebar' },
      h(D.IconButton, {
        variant: 'tertiary', size: 'sm', 'aria-label': 'Open sidebar',
        className: IK.cx('lg:hidden', p.className),
        onClick: function () { sb.setOpenMobile(true); }
      }, h(IK.Icon, { name: 'menu' })));
  };

  /* The ReviewBar's height, as --ik-bar-h on the shell: the document-scrolling shell hangs its
     sidebar under the bar and fills the viewport below it. */
  function useBarHeight(ref, on) {
    R.useLayoutEffect(function () {
      if (!on) return;
      function set() {
        var bar = document.querySelector('[data-ik-review]');
        var el = ref.current && ref.current.closest ? ref.current.closest('.ik-shell') : null;
        if (el) el.style.setProperty('--ik-bar-h', (bar ? bar.offsetHeight : 0) + 'px');
      }
      set();
      window.addEventListener('resize', set);
      return function () { window.removeEventListener('resize', set); };
    }, [on]);
  }

  IK.AppShell = function AppShell(p) {
    var doc = p.scroll === 'document';
    var probe = R.useRef(null);
    useBarHeight(probe, doc);
    return h(D.SidebarProvider, {
      defaultOpen: !p.defaultCollapsed,
      className: IK.cx('ik-shell', doc && 'is-doc', p.className), style: p.style
    },
      doc ? h('span', { ref: probe, hidden: true }) : null,
      /* SidebarProvider brings its own TooltipProvider (300 ms WITH a warm-up); the kit's timing
         is 300 ms on every hover, no warm-up — so the kit's provider is restored inside it. */
      h(IK.Providers, null,
        h(IK.AppSidebar, {
          nav: p.nav, currentChat: p.currentChat, chats: p.chats, plan: p.plan, user: p.user,
          credits: p.credits, trialDays: p.trialDays, promo: p.promo, badges: p.badges, classic: p.classic
        }),
        h(D.SidebarInset, { className: IK.cx('min-h-0', p.glow && 'ik-shell-glow', p.mainClassName) },
          p.burger === false ? null : h('div', { className: 'absolute left-3 top-3 z-10 lg:hidden' }, h(IK.SidebarBurger)),
          p.scroll === false || doc ? p.children
            : h('div', { className: 'relative flex min-h-0 flex-1 flex-col overflow-y-auto' }, p.children))));
  };
})();
