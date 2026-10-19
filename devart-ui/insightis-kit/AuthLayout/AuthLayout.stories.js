(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  /* the storybook sits two folders above the pages — the card's links still reach them */
  var BASE = '../pages/concept/auth/';

  IK.story('AuthLayout', { title: 'Centred card (every flow screen)', wide: true,
    description: 'Brand wash behind the card. The nav above it on the pages is review chrome: AuthReviewNav, under Prototype chrome.',
    render: function () {
      return h(IK.AuthLayout, { fullHeight: false },
        h(IK.AuthCard, null,
          h(IK.AuthStatus, { glyph: 'circle-check', tone: 'success', title: 'Email confirmed' }, 'You can now sign in to your account.'),
          h(IK.AuthCard.Actions, null, h(IK.AuthCard.Cta, { href: BASE + 'login.html' }, 'Sign in'))));
    } });

  IK.story('AuthLayout', { title: 'Top-aligned (the illustrations showcase)', wide: true,
    description: 'align="start"',
    render: function () {
      return h(IK.AuthLayout, { align: 'start', fullHeight: false },
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary' }, 'Content starts at the top of the wash'));
    } });
})();
