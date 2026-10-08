(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.story('ChatHero', { title: 'Landing column — greeting, composer, suggestions', wide: true,
    description: 'Centred both ways; 28px rhythm (20px below 640px); the pills sit 24px under the composer. A pill puts its words into the prompt.',
    render: function () {
      function Demo() {
        var t = R.useState(''), ref = R.useRef(null);
        return h('div', { className: 'ik-chat-frame flex flex-col' },
          h(IK.ChatHero, null,
            h(IK.Composer, { plan: 'paid', value: t[0], onValueChange: t[1], promptRef: ref }),
            h(IK.ChatSuggestions, { onPick: function (l) { t[1](l); if (ref.current) ref.current.focus(); } })));
      }
      return h(Demo);
    } });
  IK.story('ChatHero', { title: 'Custom title', render: function () {
    return h(IK.ChatHero, { title: ['Ask ', h(IK.ChatKeyword, { key: 'k' }, 'anything')] });
  } });
  IK.story('ChatHero', { title: 'Suggestions', render: function () { return h(IK.ChatSuggestions, null); } });
})();
