/* ListPage — an app page with a title row over a content column (".cl-page" + ".cl-page-head" +
   ".cl-page-title" in the original kit-theme.css "Global sticky page-head pattern"; Data Sources,
   Files, Metrics, Chats Library). Pure composition: D.ListPageLayout is the scroller, the centred
   column and the sticky header that condenses; D.PageHeader is the row. The kit adds only what is
   Insightis':

     the column     75rem wide (the original --content-max-width), 4rem below the content
                    (bodyClassName pb-16). The insets are ListPageLayout's own: 36px from the top
                    and 32px sides from lg, 12px sides below md, the head padded 10px on its own
                    below lg.
     the row        the drawer trigger first (IK.SidebarBurger, hidden from lg), the title WRAPS
                    (PageHeader wrapTitle — "Data / Sources" beside Create Connection on a phone),
                    the badge slot for a mark that sits with the title (Files' storage mark).
     the condense   below lg, past 60px of scroll (ListPageLayout condenseAfter, which does not
                    flicker under scroll anchoring) the head tightens to 6px and PageHeader goes
                    `condensed` (heading30 / heading24 → heading20, animated).
     the drawer     while the phone drawer is open the row is hidden (visibility), as in the
                    original.
     truncate       true: a long title the person named (a workspace's) keeps one line, cut with an ellipsis — the
                    PageHeader default; without it the title wraps (the originals' short titles)
     wrap           true: the row wraps (actions drop under the title) and on desktop the title
                    keeps 4px under it — the Metrics original (.mx-page-head + .cl-page-title's own
                    margin).

   ListPageLayout scrolls itself, so the page sits in IK.AppShell with scroll: false and
   burger: false (the row carries the drawer trigger). The originals of Data Sources, Files and
   Chats Library scrolled as a document, and their head never stuck (.cl-main clipped it); on
   DevartUI's layout it sticks below lg as the pattern was designed — accepted (2026-10-19, the
   kit takes the layout from DevartUI instead of keeping its own).

   h(IK.ListPage, {
     title: 'Data Sources',
     after: node,      // PageHeader's badge, 12px after the title
     actions: node,    // PageHeader's actions, the right edge
     wrap: false,
     onBack, backLabel, // PageHeader's back button before the title — a page one level down
                       // (a workspace: "Back to workspaces", as the AI connectivity prototype has it)
     className         // the content column (ListPageLayout contentClassName)
   }, …blocks, 12px apart…)                                                                     */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.ListPage = function ListPage(p) {
    var drawer = D.useSidebar().openMobile;
    return h(D.ListPageLayout, {
      condenseAfter: 60,
      contentClassName: IK.cx('ik-list-page', p.className),
      bodyClassName: 'pb-16',
      stickyHeaderClassName: IK.cx('ik-list-page-head', p.wrap && 'is-wrap', drawer && 'invisible'),
      stickyHeader: function (s) {
        return h(D.PageHeader, {
          title: p.title,
          onBack: p.onBack || undefined,
          backLabel: p.backLabel || undefined,
          /* truncate: a title the person typed (a workspace's name) — PageHeader's one-line truncation, as DevartUI
             ships it; wrapping a long name beside its action broke it a word per line (user, 2026-10-22) */
          wrapTitle: !p.truncate,
          /* the trigger never shrinks when a long title presses on it (the original .cl-burger is
             flex:none) */
          leading: h(IK.SidebarBurger, { className: 'flex-none' }),
          badge: p.after || undefined,
          actions: p.actions || undefined,
          condensed: s.condensed,
          className: p.wrap ? 'flex-wrap' : undefined
        });
      }
    }, p.children);
  };
})();
