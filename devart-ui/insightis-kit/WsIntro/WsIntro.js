/* WsIntro — the Workspaces list before the first workspace: what a workspace is for, how to start, and the one way in
   (user, 2026-10-23: "не ясно для чого функціонал і в чому сенс", "зроби щось цікаве в стилі інсайтісу"). No screens of
   the product, no invented people (user, 2026-10-23: "забрати скріни", "імена дивні"); copy plain and short
   ("як тех письменник, просто, лаконічно і не машинно"), the lead says why, the steps say how — no line repeats
   another ("вони просто дублюють один одного").

     the panel    all of it on a D.Card (outline, xl), under the page's own title
     the head     a large title, its key words in Text/Highlight (the chat landing's voice, IK.ChatHero), one line on
                  why, and 24px under it the action: Create Workspace, primary, round — the page's title action, which
                  hides while the list is empty; on Free locked (Pro) and a line under it says so
     the steps    create a workspace · add your data · invite your team — each line about as long, so the three
                  break the same way (user, 2026-10-23: "тексти мали бути вирівняні")
     variant      three looks to choose from, on the review bar (user, 2026-10-23: "лиши цей варіант, другий зроби з
                  більшою типографією і останній зроби простим проте сучасним"; "файли і сорси мали б мати ілюстративне
                  відображення"):
                    'cards'   (the default) a faint brand glow right under the title and lead; numbered cards
                    'type'    larger type: a 36px title, an 18px lead, a large button; the steps centred under big
                              numerals that fade to the bottom
                    'simple'  nothing behind; over the title a drawing as wide as the title, the lead in two lines — the person's own sources (a stack of
                              cards with their logos) and files (a fan of sheets with their type marks) meeting in a
                              workspace; the steps centred in one row, numbered, joined by the drawing's dashed link
   Under 768px the steps stack.

   h(IK.WsIntro, { onCreate, locked, variant: 'cards'|'type'|'simple', connections: IK.WS_CONNECTIONS, files: IK.WS_FILES }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.WS_INTRO_VARIANTS = ['cards', 'type', 'simple'];
  var LOOK = { cards: 'ik-wsi--cards', type: 'ik-wsi--type', simple: 'ik-wsi--simple' };

  /* one line on desktop, about the title's width — the head reads as one block, not a pyramid (user, 2026-10-23:
     'виглядає пірамідкою'); no 'numbers' ('цифрами?') */
  var LEAD = 'Connect sources once, and nobody on your team has to set them up again';
  var STEPS = [
    ['ws-layers', 'Create a workspace', 'One for each team or project'],
    ['ws-share', 'Add your data', 'Connections bring their metrics'],
    ['ws-users', 'Invite your team', 'Members see it in their chats']
  ];

  function desc(s, style, cls) {
    return h(D.Typography, { element: 'span', textStyle: style || 'body14', textColor: 'secondary', className: IK.cx('text-balance', cls) }, s[2]);
  }
  function title(s, style, cls) {
    return h(D.Typography, { element: 'span', textStyle: style || 'title14', textColor: 'primary', className: cls }, s[1]);
  }

  function Steps(p) {
    /* centred like the head, the numerals large and fading to the bottom (user, 2026-10-23: '2 варіант не дуже') */
    if (p.variant === 'type') return h('ol', { className: 'ik-wsi-steps' }, STEPS.map(function (s, i) {
      return h('li', { key: s[1], className: 'flex min-w-0 flex-col items-center gap-2' },
        h('span', { className: 'ik-wsi-big', 'aria-hidden': 'true' }, '0' + (i + 1)),
        title(s, 'title18', 'text-center'), desc(s, 'body16', 'text-center'));
    }));
    /* centred under the centred head, numbered, joined by the drawing's own dashed link — read in order (user,
       2026-10-23: "нижні степпери не збалансовані та не логічні") */
    if (p.variant === 'simple') return h('ol', { className: 'ik-wsi-steps' }, STEPS.map(function (s, i) {
      return h('li', { key: s[1], className: 'ik-wsi-flat flex min-w-0 flex-col items-center gap-3' },
        h('span', { className: 'ik-wsi-badge', 'aria-hidden': 'true' }, i + 1),
        h('span', { className: 'flex min-w-0 flex-col gap-1' }, title(s, 'title16', 'text-center'), desc(s, 'body14', 'text-center')));
    }));
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
      h(D.Button, { variant: 'primary', size: variant === 'type' ? 'lg' : 'md', rounded: 'full', type: 'button', leftSlot: h(IK.Icon, { name: 'plus' }), onClick: p.onCreate }, 'Create Workspace'));
    /* on a panel (D.Card), so it reads as the page's content under the page's own title, not a second title over it
       (user, 2026-10-23: 'врахуй що зверху є тайтл … можливо розмістити на підложці') */
    return h('section', { 'aria-labelledby': 'ik-wsi-title' }, h(D.Card, { variant: 'outline', rounded: 'xl', fullWidth: true, className: 'ik-wsi w-full ' + LOOK[variant] },
      h('div', { className: 'ik-wsi-hero' },
        variant === 'simple' ? h(Drawing, { connections: p.connections || IK.WS_CONNECTIONS, files: p.files || IK.WS_FILES }) : null,
        h('div', { className: 'ik-wsi-head' },
          h('h2', { id: 'ik-wsi-title', className: 'ik-wsi-title' }, 'Give your team ', h(IK.ChatKeyword, null, 'the same data')),
          variant === 'type'
            ? h('p', { className: 'ik-wsi-lead ik-wsi-lead-lg m-0 text-center' }, LEAD)
            : h(D.Typography, { element: 'p', textStyle: 'body16', textColor: 'secondary', className: 'ik-wsi-lead m-0 text-center' }, LEAD)),
        p.locked ? h('div', { className: 'flex flex-col items-center gap-2' }, cta,
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Available on the Pro plan')) : cta),
      h(Steps, { variant: variant })));
  };
})();
