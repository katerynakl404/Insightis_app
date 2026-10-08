/* AuthLayout — the shell of every auth-flow screen (pages/concept/auth/*.html).
   Mirrors .au-topnav + .au-page in pages/concept/auth/auth-concept.css:

   - top nav (review chrome — it does not exist in the product, and says so with the
     "Concept" badge): brand logo → login.html · Concept badge · IK.AuthScreenSwitch.
     It replaces IK.ReviewBar on these pages, as the original's nav replaces the kit topbar.
     53px tall like the original: 10px padding around the 32px switcher. The logo keeps the
     original's 4px bottom margin (.au-brand is shared with the card logo), so the brand link
     is 24px tall and the logo sits 2px above the bar's centre; ik-auth-logo lets the logo take the
     viewBox's exact width (83.6px), as the original's height-only .au-logo. At ≤600px the bar wraps, the
     switcher dropping to a second row (16px row gap) — the original's own breakpoint.
   - main: the pre-auth surface — a restrained brand wash under a centred card.
     Like the original, its min-height is the viewport MINUS 49px while the nav above it is
     53px (93px wrapped on a phone): the page is taller than the viewport and scrolls a little,
     and the card sits where the original's does. Reproduced on purpose (README rule 1a).

   <IK.AuthLayout
     screen="login.html"    // the screen on show (default: from location) — checks it in the switcher
     base=""                // href prefix for the nav's links (storybook points it at the pages)
     align="center"         // center (a card) | start (the illustrations showcase, top-aligned)
     fullHeight={true}      // false: no viewport min-height (storybook)
   >{card}</IK.AuthLayout>

   Theme: the originals are dark-only — <html class="dark">, no theme switch, whatever theme
   the reviewer picked elsewhere. Every auth page carries class="dark" on <html> and calls
   IK.AuthLayout.initTheme() right after insightis-kit.js (ik-core applies the stored theme
   at load and would take the class off): it puts dark back on <html> without touching the
   theme store, so no other page changes.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.AuthLayout = function AuthLayout(p) {
    var base = p.base || '';
    var top = p.align === 'start';
    return h('div', { className: IK.cx('flex flex-col', p.className) },
      h('header', {
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
        h(IK.AuthScreenSwitch, { current: p.screen, base: base })),
      h('main', {
        className: IK.cx('ik-auth-page flex justify-center px-6 pt-10 pb-16',
          p.fullHeight !== false && 'ik-auth-page-fill', top ? 'items-start' : 'items-center')
      }, p.children));
  };

  IK.AuthLayout.initTheme = function () {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  };
})();
