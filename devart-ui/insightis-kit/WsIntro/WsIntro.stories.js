(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function create() { D.toast('Create workspace'); }
  IK.story('WsIntro', { title: 'Cards (default) — a soft glow behind the head, numbered cards', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'cards' });
  } });
  IK.story('WsIntro', { title: 'Path — a dot grid behind the head, the steps on a dashed line', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'path' });
  } });
  IK.story('WsIntro', { title: 'Orbit — rings with the person’s own marks, one strip split in three', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, variant: 'orbit' });
  } });
  IK.story('WsIntro', { title: 'Free — Create Workspace locked (Pro), a line under it says so', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, locked: true });
  } });
  IK.story('WsIntro', { title: 'Phone (< 768px) — open this page at 375px', description: 'The steps stack; the path runs down the left edge; the orbit keeps its rings, not the marks.', render: function () {
    return h(IK.WsIntro, { onCreate: create });
  } });
})();
