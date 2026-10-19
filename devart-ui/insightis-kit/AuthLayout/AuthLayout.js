/* AuthLayout — the page of every auth-flow screen (pages/concept/auth/*.html).
   Mirrors .au-page in pages/concept/auth/auth-concept.css: the pre-auth surface — a restrained
   brand wash under a centred card. The top nav above it is review chrome, not product: the page
   renders RK.AuthReviewNav (review-kit/) right before this.
   Like the original, its min-height is the viewport MINUS 49px while the nav above it is
   53px (93px wrapped on a phone): the page is taller than the viewport and scrolls a little,
   and the card sits where the original's does. Reproduced on purpose (README rule 1a).

   <IK.AuthLayout
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
  var IK = window.InsightisKit, h = IK.h;

  IK.AuthLayout = function AuthLayout(p) {
    var top = p.align === 'start';
    return h('main', {
      className: IK.cx('ik-auth-page flex justify-center px-6 pt-10 pb-16',
        p.fullHeight !== false && 'ik-auth-page-fill', top ? 'items-start' : 'items-center', p.className)
    }, p.children);
  };

  IK.AuthLayout.initTheme = function () {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  };
})();
