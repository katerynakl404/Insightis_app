(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  /* Each story re-mounts the card after it is answered or dismissed, and says what came back. */
  function Demo(p) {
    var k = R.useState(0), key = k[0], setKey = k[1];
    var r = R.useState(null), res = r[0], setRes = r[1];
    function again(text) { setRes(text); setKey(key + 1); }
    return h(D.PortalContainerProvider, { className: 'flex flex-col gap-2' },
      h(IK.AskUserPanel, Object.assign({ key: key }, IK.ASK_VARIANTS[p.v], {
        escape: false,
        onAnswer: function (a) { again('Answered: ' + JSON.stringify(a.map(function (x) { return x.answer; }))); },
        onDismiss: function () { again('Dismissed'); }
      })),
      res ? h(D.Typography, { element: 'p', textStyle: 'body12', textColor: 'secondary', className: 'm-0' }, res) : null);
  }
  IK.story('AskUserPanel', { title: 'Single select', wide: true,
    description: 'The row IS the button: pressing it answers (and the consumer closes the card). "Other" opens a field inside its box; Submit (disabled until there is text) or Enter sends it. Dismiss: ✕ (tooltip) or Esc.',
    render: function () { return h(Demo, { v: 'single' }); } });
  IK.story('AskUserPanel', { title: 'Several questions — stepper', wide: true,
    description: 'One question at a time: a pick moves on; Back from the second; Next, or Submit on the last open question. Bars fill once answered and on screen; each is a 24px button with its short title as tooltip. Step 3 is multi select.',
    render: function () { return h(Demo, { v: 'steps' }); } });
  IK.story('AskUserPanel', { title: 'Multi select', wide: true,
    description: 'The same row with a DevartUI Checkbox on its right (centred on the title line); Submit disabled until something is ticked.',
    render: function () { return h(Demo, { v: 'multi' }); } });
  IK.story('AskUserPanel', { title: 'Six options — the most a question offers', wide: true,
    description: '"Other" counted. The card fits them: nothing scrolls (75dvh is only a guard for very short screens, where the list fades at the edge it hides).',
    render: function () { return h(Demo, { v: 'six' }); } });
  IK.story('AskUserPanel', { title: 'Two options + Other (the queue’s D1)', wide: true,
    render: function () { return h(Demo, { v: 'revenue' }); } });
  IK.story('AskUserPanel', { title: 'Over a chat — IK.AskUserLayer', wide: true,
    description: 'The layer covers the chat column and floats the card bottom-aligned on the composer’s 820px measure (48px side inset).',
    render: function () {
      return h('div', { className: 'ik-chat-frame relative flex flex-col overflow-hidden rounded-md border border-stroke bg-surface-page' },
        h(IK.ChatThread, null, h(IK.ChatTurn, null, h(IK.ChatUserMessage, { time: 'Jul 7, 3:07 PM' }, 'generate 2 charts with random data'))),
        h(IK.AskUserLayer, null, h(IK.AskUserPanel, Object.assign({}, IK.ASK_VARIANTS.single, { escape: false }))));
    } });
})();
