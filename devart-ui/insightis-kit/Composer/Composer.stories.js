(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;

  /* Room above the trigger: every composer menu opens upward. */
  function Stage(p) { return h('div', { className: 'flex flex-col justify-end' }, p.children); }
  function Room(p) { return h('div', { className: 'flex flex-col justify-end pt-80' }, p.children); }
  function Tools(p) { return h(Room, null, h('div', { className: 'flex items-center gap-1' }, p.children)); }

  function ModelDemo(p) {
    var m = R.useState(p.model || 'Insightis Light'), t = R.useState(p.thinking !== false), e = R.useState('Medium');
    return h(IK.ComposerModel, {
      defaultOpen: p.open, plan: p.plan, icon: p.icon, model: m[0], thinking: t[0], effort: e[0],
      onModel: m[1], onThinking: t[1], onEffort: e[1]
    });
  }

  /* ── The card ── */
  IK.story('Composer', { title: 'Landing — empty (Send disabled)', wide: true,
    description: 'prompt "text". Hover: border Field/Hover; focus-within: Input/Focus (no hover border while focused). Below 480px the trigger labels and "Send" go icon-only.',
    render: function () { return h(Stage, null, h(IK.Composer, { plan: 'paid' })); } });
  IK.story('Composer', { title: 'Landing — typed (Send enabled)', wide: true,
    render: function () { return h(Stage, null, h(IK.Composer, { plan: 'paid', defaultValue: 'Show revenue trends' })); } });
  IK.story('Composer', { title: 'File attached — chip above the prompt, Attach disabled', wide: true,
    description: 'One file only: Attach goes aria-disabled and tips "Only one file allowed". The chip’s ✕ removes the file.',
    render: function () { return h(Stage, null, h(IK.Composer, { plan: 'paid', attachment: 'Q3-revenue.csv' })); } });
  IK.story('Composer', { title: 'In a conversation — @-mentions, Send keeps its fill', wide: true,
    description: 'prompt "rich", seed ["mrr"], sendIdle "filled", sendLabelCollapse false, modelIcon "model-brain". Type "@" to reference a metric.',
    render: function () { return h(Stage, null, h(IK.Composer, { plan: 'paid', prompt: 'rich', seed: ['mrr'], sendIdle: 'filled', sendLabelCollapse: false, modelIcon: 'model-brain' })); } });
  IK.story('Composer', { title: 'In a conversation — empty', wide: true,
    description: 'An empty prompt keeps Send’s brand fill but makes it inert (the chat page).',
    render: function () { return h(Stage, null, h(IK.Composer, { plan: 'paid', prompt: 'rich', sendIdle: 'filled', sendLabelCollapse: false, modelIcon: 'model-brain' })); } });
  IK.story('Composer', { title: 'Free plan', wide: true,
    description: 'Connections reads disabled with the padlock in its glyph slot; hover or click opens the connections upgrade popover and the menu never opens. Medium / Pro are locked rows in the model menu. Attach, the prompt and Send are untouched.',
    render: function () { return h(Stage, null, h(IK.Composer, { plan: 'free' })); } });

  /* ── Attach ── */
  ['filled', 'loading', 'empty', 'scroll'].forEach(function (st) {
    IK.story('Composer', { title: 'Attach menu — ' + st,
      description: st === 'loading' ? 'Skeleton rows; Choose File and the heading stay.' : st === 'scroll' ? 'Twelve files in a scroller capped to the room above the trigger.' : st === 'empty' ? 'StatusView xs inside the menu; Choose File is the action.' : 'Choose File (accent row) · Recent files.',
      render: function () { return h(Tools, null, h(IK.ComposerAttach, { popState: st, defaultOpen: true })); } });
  });
  IK.story('Composer', { title: 'Attach — disabled (a file is attached)', description: 'Hover: "Only one file allowed".',
    render: function () { return h(Tools, null, h(IK.ComposerAttach, { disabled: true })); } });

  /* ── Connections ── */
  ['filled', 'loading', 'empty', 'scroll'].forEach(function (st) {
    IK.story('Composer', { title: 'Connections menu — ' + st,
      description: st === 'filled' ? 'A row toggles its Switch; the menu stays open. Manage Connections is the footer.' : null,
      render: function () { return h(Tools, null, h(IK.ComposerConnections, { plan: 'paid', popState: st, defaultOpen: true })); } });
  });
  IK.story('Composer', { title: 'Connections — Free trigger (locked)', description: 'Hover after 300 ms or click: the connections upgrade popover.',
    render: function () { return h(Tools, null, h(IK.ComposerConnections, { plan: 'free' })); } });

  /* ── Model ── */
  IK.story('Composer', { title: 'Model menu', description: 'Light checked · Thinking on · Effort Medium. The trigger reads "Insightis Light (Medium)".',
    render: function () { return h(Tools, null, h(ModelDemo, { plan: 'paid', open: true })); } });
  IK.story('Composer', { title: 'Model menu — Thinking off', description: 'Effort disabled in place (Text/Inactive), tip "Turn on Thinking to set effort"; the trigger drops the level.',
    render: function () { return h(Tools, null, h(ModelDemo, { plan: 'paid', open: true, thinking: false })); } });
  IK.story('Composer', { title: 'Model menu — Free (locked rows)', description: 'Medium / Pro: padlock trails, label Text/Secondary, each opens its own upgrade popover.',
    render: function () { return h(Tools, null, h(ModelDemo, { plan: 'free', open: true })); } });

  /* ── Parts ── */
  IK.story('Composer', { title: 'File chip', render: function () {
    return h('div', { className: 'flex flex-col gap-2' },
      h(IK.ComposerFileChip, { name: 'Q3-revenue.csv' }),
      h(IK.ComposerFileChip, { name: 'customers-export-with-a-very-long-name.xlsx' }));
  } });
  IK.story('Composer', { title: 'Send — disabled · ready · idle with fill', render: function () {
    return h('div', { className: 'flex items-center gap-2' },
      h(IK.ComposerSend, { ready: false }), h(IK.ComposerSend, { ready: true }), h(IK.ComposerSend, { ready: false, idle: 'filled', collapse: false }));
  } });
})();
