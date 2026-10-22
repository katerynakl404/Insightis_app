/* WsIntro — the Workspaces list before the first workspace: what a workspace is for, how to start, and the one way in
   (user, 2026-10-23: "не ясно для чого функціонал і в чому сенс", "зроби щось цікаве в стилі інсайтісу"). No screens of
   the product, no invented people (user, 2026-10-23: "забрати скріни", "імена дивні"); copy plain and short
   ("як тех письменник, просто, лаконічно і не машинно"), the lead says why, the steps say how — no line repeats
   another ("вони просто дублюють один одного").

     the panel    all of it on a D.Card (outline, xl), under the page's own title
     the head     a large title, its key words in Text/Highlight (the chat landing's voice, IK.ChatHero), one line on
                  why, and 24px under it the action: Create Workspace, primary, round — the page's title action, which
                  hides while the list is empty; on Free locked (Pro) and a line under it says so
     the steps    create a workspace · add your data · invite your team — said the way a person would (user,
                  2026-10-23: "тексти якісь штучні"), each about as long, so the three break the same way ("тексти мали
                  бути вирівняні")
     variant      two looks to choose from, on the review bar (user, 2026-10-23: 'лиши цей варіант', 'останній зроби простим
                  проте сучасним', 'файли і сорси мали б мати ілюстративне відображення'; the larger-type look went —
                  '2гий можеш забрати'):
                    'cards'   (the default) a faint brand glow right under the title and lead; numbered cards
                    'simple'  nothing behind; over the title a drawing as wide as the title — the person's own
                              sources (a stack of cards with their logos) and files (a fan of sheets with their type
                              marks) meeting in a workspace; no steps (user, 2026-10-23: 'забери')
   Under 768px the cards stack.

   h(IK.WsIntro, { onCreate, locked, variant: 'cards'|'simple', connections: IK.WS_CONNECTIONS, files: IK.WS_FILES }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.WS_INTRO_VARIANTS = ['cards', 'simple'];
  var LOOK = { cards: 'ik-wsi--cards', simple: 'ik-wsi--simple' };

  /* two long, balanced lines (user, 2026-10-23: 'опис в 2 рядка виглядає гармонійніше', 'мусив бути довшим проте лишитись
     в 2 строки'); no 'numbers' ('цифрами?') */
  var LEAD = 'Connect your sources once and share them with your team. Nobody has to set up the same connection again or keep their own copy of a file';
  var STEPS = [
    ['ws-layers', 'Create a workspace', 'Name it after the team or project it’s for'],
    ['ws-share', 'Add your data', 'Pick the connections and files to share'],
    ['ws-users', 'Invite your team', 'Everyone can use them in their own chats']
  ];

  function desc(s, style, cls) {
    return h(D.Typography, { element: 'span', textStyle: style || 'body14', textColor: 'secondary', className: IK.cx('text-balance', cls) }, s[2]);
  }
  function title(s, style, cls) {
    return h(D.Typography, { element: 'span', textStyle: style || 'title14', textColor: 'primary', className: cls }, s[1]);
  }

  function Steps(p) {
    /* the simple look has no steps — the drawing says it (user, 2026-10-23: 'забери') */
    if (p.variant === 'simple') return null;
    return h('ol', { className: 'ik-wsi-steps' }, STEPS.map(function (s, i) {
      return h('li', { key: s[1], className: 'flex' },
        h(D.Card, { variant: 'outline', className: 'flex flex-1 flex-col gap-4 p-5' },
          h('span', { className: 'flex items-center justify-between' },
            h('span', { className: 'ik-wsi-num' }, '0' + (i + 1)),
            h('span', { className: 'ik-wsi-disc', 'aria-hidden': 'true' }, h(IK.Icon, { name: s[0], size: 16 }))),
          h('span', { className: 'flex min-w-0 flex-col gap-1' }, title(s), desc(s))));
    }));
  }

  /* the drawing over the simple look: the person's sources and files meeting in a workspace */
  function bars() {
    return [h('span', { key: 'a', className: 'ik-wsi-bar' }), h('span', { key: 'b', className: 'ik-wsi-bar ik-wsi-bar-short' })];
  }
  function Drawing(p) {
    var conns = (p.connections || []).slice(0, 3).reverse(), files = (p.files || []).slice(0, 3).reverse();
    return h('div', { className: 'ik-wsi-art', 'aria-hidden': 'true' },
      h('span', { className: 'ik-wsi-stack' }, conns.map(function (c) {
        return h('span', { key: c.id, className: 'ik-wsi-src' },
          h('span', { className: 'flex items-center gap-1.5' }, h(IK.ConnectorMark, { connector: c.name, size: 'xs' }), h('span', { className: 'ik-wsi-bar' })),
          h('span', { className: 'ik-wsi-bar ik-wsi-bar-short' }));
      })),
      h('span', { className: 'ik-wsi-link' }),
      h('span', { className: 'ik-wsi-hub' }, h(IK.Icon, { name: 'ws-layers', size: 20 })),
      h('span', { className: 'ik-wsi-link' }),
      h('span', { className: 'ik-wsi-fan' }, files.map(function (f, i) {
        return h('span', { key: i, className: 'ik-wsi-doc' }, h(IK.DsFileMark, { type: f.type, size: 'sm' }), bars());
      })));
  }

  IK.WsIntro = function WsIntro(p) {
    var variant = IK.WS_INTRO_VARIANTS.indexOf(p.variant) >= 0 ? p.variant : 'cards';
    var cta = h(IK.Locked, { feature: 'workspaces', locked: !!p.locked, surface: 'modal', tip: 'Available on Pro' },
      h(D.Button, { variant: 'primary', size: 'md', rounded: 'full', type: 'button', leftSlot: h(IK.Icon, { name: 'plus' }), onClick: p.onCreate }, 'Create Workspace'));
    /* on a panel (D.Card), so it reads as the page's content under the page's own title, not a second title over it
       (user, 2026-10-23: 'врахуй що зверху є тайтл … можливо розмістити на підложці') */
    return h('section', { 'aria-labelledby': 'ik-wsi-title' }, h(D.Card, { variant: 'outline', rounded: 'xl', fullWidth: true, className: 'ik-wsi w-full ' + LOOK[variant] },
      h('div', { className: 'ik-wsi-hero' },
        variant === 'simple' ? h(Drawing, { connections: p.connections || IK.WS_CONNECTIONS, files: p.files || IK.WS_FILES }) : null,
        h('div', { className: 'ik-wsi-head' },
          h('h2', { id: 'ik-wsi-title', className: 'ik-wsi-title' }, 'Give your team ', h(IK.ChatKeyword, null, 'the same data')),
          h(D.Typography, { element: 'p', textStyle: 'body16', textColor: 'secondary', className: 'ik-wsi-lead m-0 text-center' }, LEAD)),
        p.locked ? h('div', { className: 'flex flex-col items-center gap-2' }, cta,
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Available on the Pro plan')) : cta),
      h(Steps, { variant: variant })));
  };
})();
