/* PageHead — the title row an app page starts with, and IK.Page, the centred content column it
   sits in (".cl-page" + ".cl-page-head" + ".cl-page-title" in the original kit-theme.css "Global
   sticky page-head pattern"; Data Sources, Files, Metrics). Layout only — the parts are DevartUI.

   IK.Page — a 75rem column (the original --content-max-width), 2.25rem from the top, 2rem sides,
     4rem below, blocks .75rem apart. Below 1024px no top padding (the head brings its own); below
     768px .75rem sides.

   IK.PageHead —
     ≥ 1024px  in flow: the h1 (Heading/30) and the page's actions at the far end; no burger (the
               sidebar is on screen).
     < 1024px  sticky to the top of the main column's scroller on Surface/Page, the drawer trigger
               (IK.SidebarBurger) first, actions pushed to the end; bleeds out to the column edge.
               Once the page has scrolled 60px (the column, or the window when the page scrolls
               as a document) the row tightens (10 → 6px) and the title steps down to Heading/20.
     < 768px   the title is Heading/24; the bleed is .75rem.
     While the phone drawer is open the row is hidden (visibility), as in the original.
     In a document-scrolling shell (IK.AppShell scroll: 'document') the row does NOT stick: the
     original's .cl-main clips (overflow: hidden), so its sticky head scrolls away with the page —
     reproduced (README rule 1a).

   h(IK.Page, { className, style },
     h(IK.PageHead, {
       title: 'Data Sources',   // the page's one h1
       after: node,             // sits WITH the title (12px) — e.g. the Files storage mark
       actions: node,           // right edge — a flex row, 8px apart
       wrap: false,             // true: the row wraps (actions drop under the title) and the title
                                //   keeps 4px under it on desktop — the Metrics original
                                //   (.mx-page-head + .cl-page-title's own margin)
       className
     }),
     …blocks…)

   Use inside IK.AppShell with burger: false — the head carries the drawer trigger itself, so it
   scrolls/sticks with the title the way the original's does.                                    */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.Page = function Page(p) {
    return h('div', { className: IK.cx('ik-page', p.className), style: p.style }, p.children);
  };

  function scrollParent(el) {
    for (var n = el && el.parentElement; n; n = n.parentElement) {
      var o = getComputedStyle(n).overflowY;
      if (o === 'auto' || o === 'scroll') return n;
    }
    return null;
  }

  IK.PageHead = function PageHead(p) {
    var ref = R.useRef(null);
    var s = R.useState(false), scrolled = s[0], setScrolled = s[1];
    var narrow = D.useMaxWidth(1024), phone = D.useMaxWidth(768);
    var drawer = D.useSidebar().openMobile;
    R.useEffect(function () {
      var sc = scrollParent(ref.current);
      var target = sc || window;
      function upd() { setScrolled((sc ? sc.scrollTop : window.scrollY) > 60); }
      target.addEventListener('scroll', upd, { passive: true });
      upd();
      return function () { target.removeEventListener('scroll', upd); };
    }, []);
    var condensed = narrow && scrolled;
    var style = condensed ? 'heading20' : (phone ? 'heading24' : 'heading30');
    return h('div', {
      ref: ref,
      className: IK.cx('ik-page-head', p.wrap && 'is-wrap', condensed && 'is-condensed', drawer && 'invisible', p.className)
    },
      /* the trigger never shrinks when a long title wraps (the original .cl-burger is flex:none) */
      h(IK.SidebarBurger, { className: 'flex-none' }),
      h(D.Typography, { element: 'h1', textStyle: style, textColor: 'primary', className: 'ik-page-title' }, p.title),
      p.after || null,
      p.actions ? h('div', { className: 'ik-page-head-actions' }, p.actions) : null);
  };
})();
