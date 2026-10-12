(function () {
  var IK = window.InsightisKit, h = IK.h;
  IK.story('ThinkingIndicator', { title: 'In an answer card', wide: true,
    description: 'A highlight sweeps the word while the three dots step (opacity only — the label never changes width). Reduced motion: flat ink, dots at full opacity.',
    render: function () { return h(IK.ChatAnswer, { foot: false }, h(IK.ThinkingIndicator)); } });
  IK.story('ThinkingIndicator', { title: 'Alone',
    render: function () { return h(IK.ThinkingIndicator); } });
})();
