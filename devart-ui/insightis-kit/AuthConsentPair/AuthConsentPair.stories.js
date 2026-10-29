(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Frame(p) { return h('div', { className: 'flex w-full justify-center rounded-lg border border-stroke bg-surface-card p-6' }, p.children); }
  IK.story('AuthConsentPair', { title: 'Claude',
    description: 'The assistant’s real logo ··· the Insightis mark. Decorative (aria-hidden): the title under it names the assistant.',
    render: function () { return h(Frame, null, h(IK.AuthConsentPair, { app: 'Claude' })); } });
  IK.story('AuthConsentPair', { title: 'ChatGPT',
    description: 'The OpenAI mark is drawn black: in the dark theme it inverts (ConnectorMark INK_ASSETS).',
    render: function () { return h(Frame, null, h(IK.AuthConsentPair, { app: 'ChatGPT' })); } });
  IK.story('AuthConsentPair', { title: 'Plan-gated — the plan in the link',
    description: 'gate: IK.PlanLock (padlock + Pro) between two runs of dots — the connection waits for Pro.',
    render: function () { return h(Frame, null, h(IK.AuthConsentPair, { app: 'Claude', gate: h(IK.PlanLock, { plan: 'Pro', glyph: true }) })); } });
  IK.story('AuthConsentPair', { title: 'An assistant with no logo',
    description: 'A client the kit has no logo for gets DevartUI ConnectorLogo’s letter tile.',
    render: function () { return h(Frame, null, h(IK.AuthConsentPair, { app: 'Perplexity' })); } });
})();
