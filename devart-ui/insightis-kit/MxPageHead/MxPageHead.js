/* MxPageHead — the title row an app page starts with (".cl-page-head" + ".cl-page-title" in the
   original kit-theme.css; built for Metrics, usable by any page inside IK.AppShell).

     ≥ 1024px  in flow: the h1 (Heading/30, Heading/24 below 768px) and the page's actions at the
               far end; no burger (the sidebar is on screen).
     < 1024px  sticky to the top of the scrolling main column on Surface/Page, the drawer burger
               (IK.SidebarBurger) first, actions pushed to the end. Once the column has scrolled
               60px the row tightens (10 → 6px) and the title steps down to Heading/20.
     < 768px   bleeds .75rem past the page gutter instead of 2rem (the phone page gutter).
   While the phone drawer is open the row is hidden (visibility), as in the original.

   <IK.MxPageHead title="Metrics" actions={h(D.Button, …)} />
     title      string — the page's one h1
     actions    node — buttons at the end of the row (a flex row, 8px apart)
   Pass AppShell burger: false on pages that use it — the burger lives here.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  function scrollParent(n) {
    for (var e = n && n.parentElement; e; e = e.parentElement) {
      var o = getComputedStyle(e).overflowY;
      if (o === 'auto' || o === 'scroll') return e;
    }
    return null;
  }

  IK.MxPageHead = function MxPageHead(p) {
    var ref = R.useRef(null);
    var sc = R.useState(false), scrolled = sc[0], setScrolled = sc[1];
    var phone = D.useMaxWidth(768), tablet = D.useMaxWidth(1024);
    var drawer = D.useSidebar().openMobile;
    R.useEffect(function () {
      var s = scrollParent(ref.current);
      if (!s) return;
      function upd() { setScrolled(s.scrollTop > 60); }
      s.addEventListener('scroll', upd, { passive: true });
      upd();
      return function () { s.removeEventListener('scroll', upd); };
    }, []);
    var condensed = tablet && scrolled;
    var style = condensed ? 'heading20' : phone ? 'heading24' : 'heading30';
    var track = style === 'heading30' ? 'tracking-tight' : null;   /* the 30px title runs -0.01em */
    /* while the phone drawer is open the row steps out of sight (the original hides it, so it never
       shows through the drawer's scrim) */
    return h('div', { ref: ref, className: IK.cx('ik-mx-head', condensed && 'is-condensed', drawer && 'invisible', p.className) },
      h(IK.SidebarBurger),
      h(D.Typography, { element: 'h1', textStyle: style, textColor: 'primary', className: IK.cx('ik-mx-head-title', track) }, p.title),
      p.actions ? h('div', { className: 'ik-mx-head-actions flex items-center gap-2' }, p.actions) : null);
  };
})();
