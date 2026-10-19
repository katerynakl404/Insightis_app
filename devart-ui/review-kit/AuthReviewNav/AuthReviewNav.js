/* AuthReviewNav — the auth flow's top nav (review chrome — it does not exist in the product, and
   says so with the "Concept" badge). Mirrors .au-topnav in pages/concept/auth/auth-concept.css:
   brand logo → login.html · Concept badge · RK.AuthScreenSwitch. It stands in for RK.ReviewBar
   on the auth pages, as the original's nav replaces the kit topbar; the page renders it right
   above IK.AuthLayout.

   53px tall like the original: 10px padding around the 32px switcher. The logo keeps the
   original's 4px bottom margin (.au-brand is shared with the card logo), so the brand link
   is 24px tall and the logo sits 2px above the bar's centre; ik-auth-logo (AuthLayout.css) lets
   the logo take the viewBox's exact width (83.6px), as the original's height-only .au-logo. At
   ≤600px the bar wraps, the switcher dropping to a second row (16px row gap) — the original's
   own breakpoint.

   <RK.AuthReviewNav
     screen="login.html"    // the screen on show (default: from location) — checks it in the switcher
     base=""                // href prefix for the nav's links (storybook points it at the pages)
   />
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, RK = window.ReviewKit, D = window.DevartUI, h = IK.h;

  RK.AuthReviewNav = function AuthReviewNav(p) {
    var base = p.base || '';
    return h('header', {
      className: 'ik-auth-nav sticky top-0 z-50 flex items-center gap-4 border-b border-stroke bg-surface-card px-4 py-2.5',
      'data-ik-review': ''
    },
      /* a plain anchor, not D.LinkButton: LinkButton sizes every svg inside it to 16px */
      h('a', {
        href: base + 'login.html',
        className: 'inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card'
      }, h(IK.Logo, { height: 20, label: 'Insightis', className: 'ik-auth-logo mb-1' })),
      h(D.Badge, {
        variant: 'brand', size: 'sm', rounded: 'full', withDot: true,
        tooltip: 'Preview scaffold — this header is not part of the product',
        className: 'me-auto uppercase tracking-caps'
      }, 'Concept'),
      h(RK.AuthScreenSwitch, { current: p.screen, base: base }));
  };
})();
