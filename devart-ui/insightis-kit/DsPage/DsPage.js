/* DsPage — the main column of a Data Sources screen (Connections, Files): the centred content
   column and its title row. Port of the original's ".cl-page" + ".cl-page-head" (kit-theme.css
   "Global sticky page-head pattern") — layout only, the parts are DevartUI.

     ≥ 1024px  a 75rem column, 2.25rem from the top, 2rem sides, blocks .75rem apart; the title
               row is ordinary content.
     < 1024px  the title row sticks to the top of the scroller on the page colour, with the
               drawer trigger (IK.SidebarBurger) in front of the title; once the column has
               scrolled 60px the row tightens and the title steps down to heading20.
     < 768px   .75rem sides; the title is heading24.

   h(IK.DsPage, { className },
     h(IK.DsPageHead, {
       title: 'Data Sources',          // the page's one h1
       after: node,                    // sits WITH the title (8px) — e.g. the Files storage mark
       actions: node                   // right edge — e.g. Create Connection
     }),
     …blocks…)

   Use inside IK.AppShell with burger: false — the head carries the drawer trigger itself, so it
   scrolls/sticks with the title the way the original's does.                                    */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.DsPage = function DsPage(p) {
    return h('div', { className: IK.cx('ik-ds-page', p.className), style: p.style }, p.children);
  };

  function scrollParent(el) {
    for (var n = el && el.parentElement; n; n = n.parentElement) {
      var o = getComputedStyle(n).overflowY;
      if (o === 'auto' || o === 'scroll') return n;
    }
    return null;
  }

  IK.DsPageHead = function DsPageHead(p) {
    var ref = R.useRef(null);
    var s = R.useState(false), scrolled = s[0], setScrolled = s[1];
    var narrow = D.useMaxWidth(1024), phone = D.useMaxWidth(768);
    R.useEffect(function () {
      var sc = scrollParent(ref.current);
      var target = sc || window;
      function upd() { setScrolled((sc ? sc.scrollTop : window.scrollY) > 60); }
      target.addEventListener('scroll', upd, { passive: true });
      upd();
      return function () { target.removeEventListener('scroll', upd); };
    }, []);
    var style = narrow && scrolled ? 'heading20' : (phone ? 'heading24' : 'heading30');
    return h('div', { ref: ref, className: IK.cx('ik-ds-head', scrolled && 'is-scrolled', p.className) },
      h(IK.SidebarBurger),
      h(D.Typography, { element: 'h1', textStyle: style, textColor: 'primary', className: 'ik-ds-title' }, p.title),
      p.after || null,
      p.actions ? h('div', { className: 'ik-ds-head-actions' }, p.actions) : null);
  };
})();
