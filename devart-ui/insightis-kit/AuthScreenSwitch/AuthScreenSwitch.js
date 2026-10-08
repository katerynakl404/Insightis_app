/* AuthScreenSwitch — the "Screen" jump menu in the auth flow's top nav (review chrome, not
   product UI). Ported from auth-concept.js: the original is a native <select> with one
   <optgroup> per flow; here it is DevartUI's DropdownMenu — a radio group of every screen,
   grouped under menu labels, the current one checked. Picking a screen navigates to it.

   <IK.AuthScreenSwitch
     current="login.html"     // file name of the screen on show (default: from location)
     base=""                  // prefix for the hrefs — the pages sit side by side, so ''
     screens={…}              // default IK.AuthScreenSwitch.SCREENS
     onNavigate={fn}          // optional: replaces the navigation (storybook)
   />
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  /* verbatim from auth-concept.js AU_SCREENS */
  var SCREENS = [
    { g: 'Sign-up', items: [
      ['register.html', '1 · Create your account'],
      ['register-error.html', '✕ Email already registered'],
      ['check-email.html', '2 · Check your email'],
      ['confirm-email.html', '3 · Confirm your email'],
      ['confirmed.html', '✓ Email confirmed'],
      ['confirm-error.html', '✕ Could not confirm'],
      ['login.html', '4 · Sign in']
    ]},
    { g: 'Password reset', items: [
      ['forgot-password.html', '1 · Reset your password'],
      ['reset-sent.html', '2 · Check your email'],
      ['reset-password.html', '3 · Set your new password'],
      ['reset-done.html', '✓ Password updated'],
      ['reset-error.html', '✕ Reset link invalid']
    ]},
    { g: 'System', items: [
      ['error.html', '✕ Error (authorize)'],
      ['illustrations.html', '◆ Illustration styles']
    ]}
  ];

  function labelOf(screens, file) {
    for (var i = 0; i < screens.length; i++)
      for (var j = 0; j < screens[i].items.length; j++)
        if (screens[i].items[j][0] === file) return screens[i].items[j][1];
    return null;
  }

  IK.AuthScreenSwitch = function AuthScreenSwitch(p) {
    var screens = p.screens || SCREENS;
    var current = p.current || (location.pathname.split('/').pop() || 'login.html');
    var base = p.base || '';
    var label = labelOf(screens, current) || 'Choose a screen';
    function go(file) {
      if (file === current) return;
      if (p.onNavigate) p.onNavigate(file); else location.href = base + file;
    }
    return h('div', { className: 'flex min-w-0 items-center gap-2' },
      /* 12px / 400, as the original's .au-switch label text */
      h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', 'aria-hidden': 'true' }, 'Screen'),
      h(D.DropdownMenu, null,
        h(D.DropdownMenuTrigger, { asChild: true },
          h(D.Button, {
            /* the original <select> is named "Switch screen"; the name keeps the visible value */
            variant: 'secondary', size: 'sm', className: 'min-w-0 max-w-60', 'aria-label': 'Switch screen: ' + label,
            rightSlot: h(IK.Icon, { name: 'chevron-down' })
          }, h('span', { className: 'truncate' }, label))),
        h(D.DropdownMenuContent, { align: 'end' },
          h(D.DropdownMenuRadioGroup, { value: current, onValueChange: go },
            screens.map(function (grp, gi) {
              return h(IK.Fragment, { key: grp.g },
                gi ? h(D.DropdownMenuSeparator) : null,
                h(D.DropdownMenuLabel, null, grp.g),
                grp.items.map(function (it) {
                  return h(D.DropdownMenuRadioItem, { key: it[0], value: it[0] }, it[1]);
                }));
            })))));
  };
  IK.AuthScreenSwitch.SCREENS = SCREENS;
})();
