/* AuthStatus — the head of a status screen in the auth flow: illustration, title, message.
   Mirrors .au-status in pages/concept/auth/auth-concept.css (check-email, confirm-email,
   confirmed, confirm-error, error, reset-sent, reset-done, reset-error).

   Why not D.StatusView: the title IS the screen's one <h1> (StatusView fixes it to <p>/<h3> by
   size), and StatusView caps the message at 32ch, which re-wraps every line of the original
   copy inside the 432px card. The halo artwork is IK.AuthIllustration either way.

   <IK.AuthStatus
     glyph="mail"           // IK.AuthIllustration glyph
     tone="info"            // error | info | success
     title="Check your email"
   >We sent a confirmation link to <IK.AuthStatus.Strong>you@example.com</IK.AuthStatus.Strong>…</IK.AuthStatus>
   Children are the message (optional — the authorize error has none).
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.AuthStatus = function AuthStatus(p) {
    return h('div', { className: IK.cx('flex flex-col items-center gap-3 text-center', p.className) },
      /* 4px under the art, as the original's `margin: 0 auto .25rem` */
      h(IK.AuthIllustration, { glyph: p.glyph, tone: p.tone, className: 'mb-1' }),
      /* +4px over the gap, as the original's `margin-top: .25rem` on the title */
      h(D.Typography, { element: 'h1', textStyle: 'heading20', textColor: 'primary', align: 'center', className: 'mt-1 text-balance' }, p.title),
      p.children ? h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', align: 'center', className: 'text-balance' }, p.children) : null);
  };

  /* The recipient address echoed back in the message — full ink, heavier (.au-strong). */
  IK.AuthStatus.Strong = function Strong(p) {
    return h('strong', { className: 'font-semibold text-ink-primary' }, p.children);
  };
})();
