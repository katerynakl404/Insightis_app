(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function create() { D.toast('Create workspace'); }
  IK.story('WsIntro', { title: 'Cards (default) — a faint glow behind the head, numbered cards', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'cards' });
  } });
  IK.story('WsIntro', { title: 'Type — larger type, the steps as big numerals over a hairline', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'type' });
  } });
  IK.story('WsIntro', { title: 'Simple — a drawing of the person’s sources and files, one row of steps', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'simple' });
  } });
  IK.story('WsIntro', { title: 'Free — Create Workspace locked (Pro), a line under it says so', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, locked: true });
  } });
  IK.story('WsIntro', { title: 'Phone (< 768px) — open this page at 375px', description: 'The steps stack in every look.', render: function () {
    return h(IK.WsIntro, { onCreate: create });
  } });
})();
