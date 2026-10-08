/* AuthCard — the centred pre-auth card every auth screen is built in, and the small rows
   that repeat inside it. Mirrors .au-card / .au-head / .au-form / .au-actions / .au-or /
   .au-foot / .au-links-row / .au-row-between in pages/concept/auth/auth-concept.css.

   <IK.AuthCard title="Reset your password" subtitle="Enter your account email…">
     …rows, 16px apart…
   </IK.AuthCard>
     title     — the screen's <h1> (omit on status screens: IK.AuthStatus carries the h1 there)
     subtitle  — secondary line under it. Reserves two lines (min-height) so the card head does
                 not jump between screens (forgot ↔ reset), as the original does.

   <IK.AuthCard.Form next="check-email.html" submit="Continue">…fields…</IK.AuthCard.Form>
     A real <form>: fields 16px apart, then the full-width primary CTA 24px below the last field.
     Submitting navigates to `next` — the prototype's stand-in for the server round-trip. Native
     constraint validation stays on (an invalid email blocks submit), as in the original.
   <IK.AuthCard.Actions>…full-width buttons…</IK.AuthCard.Actions>  stacked, 12px apart
   <IK.AuthCard.Cta href="login.html">Sign in</IK.AuthCard.Cta>     the screen's primary action:
                                               D.Button primary lg, full width — a link with
                                               `href`, a button with `onClick`
   <IK.AuthCard.Row>…</IK.AuthCard.Row>        the 28px row under the fields (Forgot password? /
                                               Terms) — one height on login and register, so the
                                               CTA below sits at the same Y on both
   <IK.AuthCard.Foot>Already have an account? <LinkButton/></IK.AuthCard.Foot>
   <IK.AuthCard.Divider />                     the "Or" rule above Continue with Google
   <IK.AuthCard.Links links={[{ href, label }]} />  the column of text links at the bottom
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.AuthCard = function AuthCard(p) {
    return h(D.Card, {
      variant: 'outline', rounded: 'xl', fullWidth: true,
      className: IK.cx('ik-auth-card gap-4 p-6', p.className)
    },
      /* ik-auth-logo (AuthLayout.css): the width follows the viewBox exactly (100.3px), as the original's height-only logo */
      h('div', { className: 'mb-1 flex justify-center' }, h(IK.Logo, { height: 24, label: 'Insightis', className: 'ik-auth-logo' })),
      p.title ? h('div', { className: 'flex flex-col gap-2' },
        h(D.Typography, { element: 'h1', textStyle: 'heading20', textColor: 'primary', align: 'center', className: 'text-balance' }, p.title),
        p.subtitle ? h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', align: 'center', className: 'min-h-10 text-balance' }, p.subtitle) : null
      ) : null,
      p.children);
  };

  IK.AuthCard.Form = function AuthCardForm(p) {
    function onSubmit(e) {
      e.preventDefault();
      if (p.onSubmit) p.onSubmit(e);
      if (p.next) location.href = p.next;
    }
    return h('form', { className: 'flex flex-col gap-4', onSubmit: onSubmit, 'aria-label': p.label },
      p.children,
      h('div', { className: 'mt-2 flex flex-col gap-3' },
        h(D.Button, { type: 'submit', variant: 'primary', size: 'lg', fullWidth: true }, p.submit)));
  };

  IK.AuthCard.Actions = function AuthCardActions(p) {
    return h('div', { className: 'flex flex-col gap-3' }, p.children);
  };

  IK.AuthCard.Cta = function AuthCardCta(p) {
    if (p.href) {
      return h(D.Button, { asChild: true, variant: 'primary', size: 'lg', fullWidth: true },
        h('a', { href: p.href }, p.children));
    }
    return h(D.Button, { type: 'button', variant: 'primary', size: 'lg', fullWidth: true, onClick: p.onClick }, p.children);
  };

  IK.AuthCard.Row = function AuthCardRow(p) {
    return h('div', { className: IK.cx('flex min-h-7 items-center gap-2 text-sm', p.className) }, p.children);
  };

  IK.AuthCard.Foot = function AuthCardFoot(p) {
    return h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', align: 'center' }, p.children);
  };

  IK.AuthCard.Divider = function AuthCardDivider(p) {
    return h('div', { className: 'flex items-center gap-3' },
      h(D.Separator, { className: 'w-auto flex-1' }),
      h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary', className: 'uppercase tracking-caps' }, p.children || 'Or'),
      h(D.Separator, { className: 'w-auto flex-1' }));
  };

  IK.AuthCard.Links = function AuthCardLinks(p) {
    return h('div', { className: 'flex flex-col items-center gap-3 text-sm' },
      (p.links || []).map(function (l) { return h(D.LinkButton, { key: l.href + l.label, href: l.href }, l.label); }));
  };
})();
