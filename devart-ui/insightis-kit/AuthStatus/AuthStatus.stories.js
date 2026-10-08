(function () {
  var IK = window.InsightisKit, h = IK.h;
  var S = function (p) { return h(IK.AuthStatus.Strong, null, p.children); };

  function Frame(p) { return h('div', { className: 'mx-auto flex max-w-md flex-col' }, p.children); }

  IK.story('AuthStatus', { title: 'Info — check your email', description: 'check-email.html / reset-sent.html',
    render: function () {
      return h(Frame, null, h(IK.AuthStatus, { glyph: 'mail', tone: 'info', title: 'Check your email' },
        'We sent a confirmation link to ', h(S, null, 'you@example.com'), '. Open it to verify your account before signing in.'));
    } });
  IK.story('AuthStatus', { title: 'Info — confirm your email', description: 'confirm-email.html',
    render: function () {
      return h(Frame, null, h(IK.AuthStatus, { glyph: 'mail-check', tone: 'info', title: 'Confirm your email' },
        'Use the button below to verify. Your 14-day Trial starts right after.'));
    } });
  IK.story('AuthStatus', { title: 'Success', description: 'confirmed.html / reset-done.html',
    render: function () {
      return h(Frame, null, h(IK.AuthStatus, { glyph: 'shield-check', tone: 'success', title: 'Password updated' },
        'You\'re all set — sign in to continue.'));
    } });
  IK.story('AuthStatus', { title: 'Error', description: 'confirm-error.html / reset-error.html',
    render: function () {
      return h(Frame, null, h(IK.AuthStatus, { glyph: 'mail-x', tone: 'error', title: 'Could not confirm email' },
        'The link may have expired or already been used.'));
    } });
  IK.story('AuthStatus', { title: 'Title only', description: 'error.html — no message; the alert below carries it',
    render: function () { return h(Frame, null, h(IK.AuthStatus, { glyph: 'triangle-alert', tone: 'error', title: 'Error' })); } });
})();
