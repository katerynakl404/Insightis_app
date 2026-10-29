(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Frame(p) { return h('div', { className: 'flex w-full max-w-md flex-col rounded-lg border border-stroke bg-surface-card p-5' }, p.children); }
  IK.story('AppScopes', { title: 'Badges — Settings rows',
    description: 'DevartUI Badge secondary sm + its 12px glyph — the chat’s attachment chip (QueueFileBadge). Wraps.',
    render: function () { return h(Frame, null, h(IK.AppScopes, { look: 'badges', scopes: ['connections:query', 'metrics:read', 'metrics:manage'], label: 'Access' })); } });
  IK.story('AppScopes', { title: 'Rows — the consent screen',
    description: 'One bordered list with separators: the glyph on its brand-tinted plate, the name, the explanation, the verb as a Badge — as the brief’s mock-up.',
    render: function () { return h(Frame, null, h(IK.AppScopes, { look: 'rows', label: 'Claude will be able to' })); } });
})();
