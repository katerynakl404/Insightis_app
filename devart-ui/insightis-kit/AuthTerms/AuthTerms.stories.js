(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Frame(p) { return h('div', { className: 'mx-auto flex max-w-sm flex-col' }, p.children); }

  IK.story('AuthTerms', { title: 'Unchecked', description: 'register.html default — click the box or the words to toggle',
    render: function () { return h(Frame, null, h(IK.AuthTerms, null)); } });
  IK.story('AuthTerms', { title: 'Checked',
    render: function () { return h(Frame, null, h(IK.AuthTerms, { defaultChecked: true })); } });
})();
