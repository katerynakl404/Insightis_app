(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function create() { D.toast('Create workspace'); }
  IK.story('WsIntro', { title: 'Cards (default) — a faint glow behind the head, numbered cards', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'cards' });
  } });
  IK.story('WsIntro', { title: 'Simple — a drawing of the person’s sources and files, no steps', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'simple' });
  } });
  IK.story('WsIntro', { title: 'Free — Create Workspace locked (Pro), a line under it says so', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, locked: true });
  } });
  IK.story('WsIntro', { title: 'Own head, no steps — title, lead, action, note, steps: false', wide: true,
    description: 'The same glow and head with another page’s words and action (Settings → Authorized apps, empty); steps: false drops the cards.',
    render: function () {
      return h(IK.WsIntro, { steps: false, note: 'Available on the Pro plan',
        title: ['Use Insightis from ', h(IK.ChatKeyword, { key: 'k' }, 'your AI assistant')],
        lead: 'Connect Claude, ChatGPT or another assistant to query your data and work with your metrics where you already work',
        action: h('div', { className: 'flex flex-wrap justify-center gap-2' },
          h(D.Button, { variant: 'secondary', size: 'md', className: 'rounded-full' }, 'How to Connect'),
          h(D.Button, { variant: 'primary', size: 'md', className: 'rounded-full' }, 'Upgrade to Pro')) });
    } });
  IK.story('WsIntro', { title: 'Phone (< 768px) — open this page at 375px', description: 'Cards: the steps stack.', render: function () {
    return h(IK.WsIntro, { onCreate: create });
  } });
})();
