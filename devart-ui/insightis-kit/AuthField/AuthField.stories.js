(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h, R = window.React;
  function Frame(p) { return h('div', { className: 'mx-auto flex max-w-sm flex-col gap-4' }, p.children); }

  IK.story('AuthField', { title: 'Email — empty / filled', description: 'kind="email" — D.InputGroup xl + mail glyph',
    render: function () {
      return h(Frame, null, h(IK.AuthField, { kind: 'email' }), h(IK.AuthField, { kind: 'email', defaultValue: 'you@example.com' }));
    } });
  IK.story('AuthField', { title: 'Email — invalid', description: 'errorText — InputGroup’s own error state (not used by the flow today)',
    render: function () { return h(Frame, null, h(IK.AuthField, { kind: 'email', defaultValue: 'you@', errorText: 'Enter a valid email' })); } });

  IK.story('AuthField', { title: 'Password — sign in', description: 'kind="password" — D.PasswordInput xl: lock + show/hide toggle',
    render: function () {
      return h(Frame, null, h(IK.AuthField, { kind: 'password' }), h(IK.AuthField, { kind: 'password', defaultValue: 'hunter2' }));
    } });
  IK.story('AuthField', { title: 'Password — with strength hint', description: 'strength — focus the field: the hint floats beside it (above it at ≤960px); type to tick the rules',
    render: function () { return h(Frame, null, h(IK.AuthField, { kind: 'password', strength: true, autoComplete: 'new-password' })); } });

  function Pair() {
    var s = R.useState(''), pw = s[0], setPw = s[1];
    return h(Frame, null,
      h(IK.AuthField, { kind: 'password', placeholder: 'New password', autoComplete: 'new-password', strength: true, onValueChange: setPw }),
      h(IK.AuthField, { kind: 'password', placeholder: 'Confirm new password', autoComplete: 'new-password', matches: pw }));
  }
  IK.story('AuthField', { title: 'New + confirm — live match', description: 'matches — type different values to see "Passwords do not match"',
    render: function () { return h(Pair); } });
  IK.story('AuthField', { title: 'Confirm — mismatch', description: 'matches={…} with a different value',
    render: function () { return h(Frame, null, h(IK.AuthField, { kind: 'password', placeholder: 'Confirm new password', defaultValue: 'Secret12!', matches: 'Secret12?' })); } });

  /* The hint's content (IK.AuthField.Strength) on its own, at each level — on a plain D.Card
     here; in the flow it rides in the D.PopoverContent shown by the interactive stories. */
  function Panel(p) {
    return h(D.Card, { variant: 'outline', className: 'w-60' }, h(IK.AuthField.Strength, { value: p.value }));
  }
  [['Strength — nothing typed', ''], ['Strength — weak', 'abc'], ['Strength — fair', 'Abc12'], ['Strength — strong', 'Abc12!xyz']]
    .forEach(function (x) {
      IK.story('AuthField', { title: x[0], description: x[1] ? 'value "' + x[1] + '"' : 'what a focused, empty field shows',
        render: function () { return h(Panel, { value: x[1] }); } });
    });
})();
