(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function create() { D.toast('Create workspace'); }
  IK.story('WsIntro', { title: 'Before the first workspace — the value on the person’s own data, three why’s, Create Workspace', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create });
  } });
  IK.story('WsIntro', { title: 'Free — Create Workspace locked (Pro), the line says so', wide: true, render: function () {
    return h(IK.WsIntro, { onCreate: create, locked: true });
  } });
  IK.story('WsIntro', { title: 'Phone (< 768px) — the scene stacks, the arrow turns down', render: function () {
    return h('div', { className: 'w-80' }, h(IK.WsIntro, { onCreate: create }));
  } });
})();
