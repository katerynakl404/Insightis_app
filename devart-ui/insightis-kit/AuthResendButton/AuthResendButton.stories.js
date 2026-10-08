(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Frame(p) { return h('div', { className: 'mx-auto flex max-w-sm flex-col' }, p.children); }

  IK.story('AuthResendButton', { title: 'Cooling down — the default 45s', description: 'Disabled, the countdown in the label',
    render: function () { return h(Frame, null, h(IK.AuthResendButton, null)); } });
  IK.story('AuthResendButton', { title: 'Short cooldown', description: 'seconds={5} — watch it re-enable; click to restart',
    render: function () { return h(Frame, null, h(IK.AuthResendButton, { seconds: 5 })); } });
  IK.story('AuthResendButton', { title: 'Available', description: 'startIn={0} — enabled; a click "re-sends" and starts the 45s cooldown',
    render: function () { return h(Frame, null, h(IK.AuthResendButton, { startIn: 0 })); } });
})();
