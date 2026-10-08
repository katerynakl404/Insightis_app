(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Frame(p) { return h('div', { className: 'mx-auto flex max-w-sm flex-col gap-4' }, p.children); }

  IK.story('AuthGoogleButton', { title: 'Default', description: 'Hover / press / focus are D.Button secondary’s own',
    render: function () { return h(Frame, null, h(IK.AuthGoogleButton, { href: '#' })); } });
  IK.story('AuthGoogleButton', { title: 'Under the Or rule', description: 'as login / register stack it',
    render: function () { return h(Frame, null, h(IK.AuthCard.Divider), h(IK.AuthGoogleButton, { href: '#' })); } });
})();
