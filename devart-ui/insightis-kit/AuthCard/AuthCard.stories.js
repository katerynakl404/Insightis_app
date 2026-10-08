(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function Stage(p) { return h('div', { className: 'flex justify-center' }, p.children); }
  /* the storybook must not navigate away */
  function stay(e) { e.preventDefault(); }

  IK.story('AuthCard', { title: 'Form screen — title only', description: 'logo · h1 · Form (fields + CTA) · Row · Foot · Divider · Google',
    render: function () {
      return h(Stage, null, h(IK.AuthCard, { title: 'Sign in' },
        h(IK.AuthCard.Form, { submit: 'Sign in', onSubmit: stay },
          h(IK.AuthField, { kind: 'email' }),
          h(IK.AuthField, { kind: 'password' }),
          h(IK.AuthCard.Row, null, h(D.LinkButton, { href: '#' }, 'Forgot password?'))),
        h(IK.AuthCard.Foot, null, 'Don\'t have an account? ', h(D.LinkButton, { href: '#' }, 'Sign up')),
        h(IK.AuthCard.Divider),
        h(IK.AuthCard.Actions, null, h(IK.AuthGoogleButton, { href: '#' }))));
    } });

  IK.story('AuthCard', { title: 'Form screen — title + subtitle', description: 'the subtitle reserves two lines so the head never jumps',
    render: function () {
      return h(Stage, null, h(IK.AuthCard, {
        title: 'Reset your password',
        subtitle: 'Enter your account email and we\'ll send you a link to reset your password'
      },
        h(IK.AuthCard.Form, { submit: 'Send reset link', onSubmit: stay }, h(IK.AuthField, { kind: 'email' })),
        h(IK.AuthCard.Links, { links: [{ href: '#', label: 'Back to sign in' }] })));
    } });

  IK.story('AuthCard', { title: 'Status screen — no title', description: 'IK.AuthStatus carries the h1; Actions + Links below',
    render: function () {
      return h(Stage, null, h(IK.AuthCard, null,
        h(IK.AuthStatus, { glyph: 'mail', tone: 'info', title: 'Check your email' },
          'We sent a reset link to ', h(IK.AuthStatus.Strong, null, 'you@example.com'), '. Open it to choose a new password.'),
        h(IK.AuthCard.Actions, null, h(IK.AuthResendButton, { seconds: 45 })),
        h(IK.AuthCard.Links, { links: [{ href: '#', label: 'Try another email' }, { href: '#', label: 'Back to sign in' }] })));
    } });

  IK.story('AuthCard', { title: 'Status screen — link CTA', description: 'IK.AuthCard.Cta with href (confirmed / reset-done / errors)',
    render: function () {
      return h(Stage, null, h(IK.AuthCard, null,
        h(IK.AuthStatus, { glyph: 'shield-alert', tone: 'error', title: 'Reset link invalid or expired' }, 'We\'ll email you a fresh link to try again.'),
        h(IK.AuthCard.Actions, null, h(IK.AuthCard.Cta, { href: '#' }, 'Request new link')),
        h(IK.AuthCard.Links, { links: [{ href: '#', label: 'Back to sign in' }] })));
    } });

  IK.story('AuthCard', { title: 'Divider', description: 'IK.AuthCard.Divider — the "Or" rule',
    render: function () { return h('div', { className: 'mx-auto max-w-sm' }, h(IK.AuthCard.Divider)); } });
})();
