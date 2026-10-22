/* WsIntro — the Workspaces list before the first workspace: what a workspace is for, how to start, and the one way in
   (user, 2026-10-23: "не ясно для чого функціонал і в чому сенс", "зроби щось цікаве в стилі інсайтісу"). No screens of
   the product, no invented people (user, 2026-10-23: "забрати скріни", "імена дивні"); copy plain and short
   ("як тех письменник, просто, лаконічно і не машинно").

     the head     a large title, its key words in Text/Highlight (the chat landing's voice, IK.ChatHero), one line on
                  what a workspace does, and 24px under it the action: Create Workspace, primary, round — the page's
                  title action, which hides while the list is empty; on Free locked (Pro) and a line under it says so
     the steps    create a workspace · add your data · invite your team — each line about as long, so the three
                  break the same way (user, 2026-10-23: "тексти мали бути вирівняні")
     variant      three looks to choose from, on the review bar (user, 2026-10-23: "підготуй кілька варіантів"):
                    'path'   a dot grid fading out behind the head; the steps are icon nodes on a dashed line
                    'cards'  (the default) a soft brand glow behind the head; the steps are numbered cards
                    'orbit'  rings around the head, the person's own connection and file marks on the middle one; the
                             steps are one strip split in three
   Under 768px the steps stack (the path turns down the left edge) and the orbit keeps its rings, not the marks.

   h(IK.WsIntro, { onCreate, locked, variant: 'cards'|'path'|'orbit', connections: IK.WS_CONNECTIONS, files: IK.WS_FILES }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.WS_INTRO_VARIANTS = ['cards', 'path', 'orbit'];
  var LOOK = { path: 'ik-wsi--path', cards: 'ik-wsi--cards', orbit: 'ik-wsi--orbit' };

  var STEPS = [
    ['ws-layers', 'Create a workspace', 'Name it after a team or a project'],
    ['ws-share', 'Add your data', 'Choose the connections and files'],
    ['ws-users', 'Invite your team', 'Members use it in their own chats']
  ];

  function text(s, cls) {
    return h('span', { className: IK.cx('flex min-w-0 flex-col gap-1', cls) },
      h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary' }, s[1]),
      h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary', className: 'text-balance' }, s[2]));
  }

  function Steps(p) {
    if (p.variant === 'cards') return h('ol', { className: 'ik-wsi-steps' }, STEPS.map(function (s, i) {
      return h('li', { key: s[1], className: 'flex' },
        h(D.Card, { variant: 'outline', className: 'flex flex-1 flex-col gap-4 p-5' },
          h('span', { className: 'flex items-center justify-between' },
            h('span', { className: 'ik-wsi-num' }, '0' + (i + 1)),
            h('span', { className: 'ik-wsi-disc', 'aria-hidden': 'true' }, h(IK.Icon, { name: s[0], size: 16 }))),
          text(s)));
    }));
    if (p.variant === 'orbit') return h(D.Card, { variant: 'outline', className: 'ik-wsi-strip w-full p-0' },
      h('ol', { className: 'ik-wsi-steps' }, STEPS.map(function (s, i) {
        return h('li', { key: s[1], className: 'flex items-start gap-3 p-5' },
          h('span', { className: 'ik-wsi-badge', 'aria-hidden': 'true' }, i + 1), text(s));
      })));
    return h('ol', { className: 'ik-wsi-steps' }, STEPS.map(function (s, i) {
      return h('li', { key: s[1], className: 'ik-wsi-step' },
        h('span', { className: 'ik-wsi-node', 'aria-hidden': 'true' },
          h(IK.Icon, { name: s[0], size: 20 }),
          h('span', { className: 'ik-wsi-badge ik-wsi-badge-sm' }, i + 1)),
        text(s, 'ik-wsi-step-text'));
    }));
  }

  /* the orbit: rings around the head, the person's own marks on the middle one */
  function Orbit(p) {
    var marks = (p.connections || []).slice(0, 4).map(function (c) {
      return h('span', { key: 'c' + c.id, className: 'ik-wsi-orb' }, h(IK.ConnectorMark, { connector: c.name, size: 'sm' }));
    }).concat((p.files || []).slice(0, 2).map(function (f, i) {
      return h('span', { key: 'f' + i, className: 'ik-wsi-orb' }, h(IK.DsFileMark, { type: f.type, size: 'sm' }));
    }));
    return h('div', { className: 'ik-wsi-orbit', 'aria-hidden': 'true' },
      h('span', { className: 'ik-wsi-ring ik-wsi-ring-1' }), h('span', { className: 'ik-wsi-ring ik-wsi-ring-2' }),
      h('span', { className: 'ik-wsi-ring ik-wsi-ring-3' }), marks);
  }

  IK.WsIntro = function WsIntro(p) {
    var variant = IK.WS_INTRO_VARIANTS.indexOf(p.variant) >= 0 ? p.variant : 'cards';
    var cta = h(IK.Locked, { feature: 'workspaces', locked: !!p.locked, surface: 'modal', tip: 'Available on Pro' },
      h(D.Button, { variant: 'primary', size: 'md', rounded: 'full', type: 'button', leftSlot: h(IK.Icon, { name: 'plus' }), onClick: p.onCreate }, 'Create Workspace'));
    return h('section', { className: 'ik-wsi ' + LOOK[variant], 'aria-labelledby': 'ik-wsi-title' },
      variant === 'orbit' ? null : h('div', { className: 'ik-wsi-bg', 'aria-hidden': 'true' }),
      h('div', { className: 'ik-wsi-hero' },
        variant === 'orbit' ? h(Orbit, { connections: p.connections || IK.WS_CONNECTIONS, files: p.files || IK.WS_FILES }) : null,
        h('div', { className: 'ik-wsi-head' },
          h('h2', { id: 'ik-wsi-title', className: 'ik-wsi-title' }, 'Give your team ', h(IK.ChatKeyword, null, 'the same data')),
          h(D.Typography, { element: 'p', textStyle: 'body16', textColor: 'secondary', className: 'ik-wsi-lead m-0 text-center' },
            'Share connections, metrics and files with your team. They can use them in their own chats')),
        p.locked ? h('div', { className: 'flex flex-col items-center gap-2' }, cta,
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Available on the Pro plan')) : cta),
      h(Steps, { variant: variant }));
  };
})();
