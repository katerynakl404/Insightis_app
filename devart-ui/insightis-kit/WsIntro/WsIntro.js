/* WsIntro — the Workspaces list before the first workspace: what a workspace is for, shown on the person's own data, and
   the one way in (user, 2026-10-23: "не ясно для чого функціонал і в чому сенс", "проаналізуй кращі практики та зроби щось
   цікаве в стилі інсайтісу"). The first-use practice: an empty state sells the value — a preview of the filled thing on
   the person's own data, why it matters in a few words, and one primary action.

     the head     the chat landing's voice (IK.ChatHero): a large title, its key words in Text/Highlight — "Give your team
                  the same data" — and one line on what a workspace does
     the scene    the value as it happens, left to right (top to bottom on a phone): a workspace as it would be — its
                  name, the people in it, two of the person's own connections (logo, label, metrics) and one of their
                  files — then a colleague's chat asking about that data, the answer saying where it came from
     the points   three short why's: connect once · ask in any chat · stay in control
     the action   Create Workspace — primary, round, the page's title action (which hides while the list is empty);
                  on Free locked (Pro) and the line under it says so; on a paid plan the line counts what is ready

   h(IK.WsIntro, { onCreate, locked, connections: IK.WS_CONNECTIONS, files: IK.WS_FILES }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function face(initials, key) {
    return h(D.Avatar, { key: key, size: 'xs', className: 'ik-wsi-face shrink-0' },
      h(D.AvatarFallback, { rounded: 'full', className: 'text-xs font-semibold' }, initials));
  }
  function line(text, cls) { return h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: cls }, text); }

  /* one of the person's workspaces, as it would be */
  function WorkspaceCard(p) {
    return h(D.Card, { variant: 'outline', className: 'ik-wsi-card flex flex-col gap-3 p-4' },
      h('div', { className: 'flex items-center gap-2' },
        h('span', { className: 'ik-wsi-disc ik-wsi-disc-sm', 'aria-hidden': 'true' }, h(IK.Icon, { name: 'ws-layers', size: 14 })),
        h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 flex-1 truncate' }, 'Sales'),
        h('span', { className: 'flex items-center', 'aria-label': 'You, Olena Petrenko and Mark Shevchenko' }, face('KK', 'k'), face('OP', 'o'), face('MS', 'm'))),
      h('div', { className: 'flex flex-col gap-2' },
        p.connections.map(function (c) {
          return h('div', { key: c.id, className: 'flex min-w-0 items-center gap-2' },
            h(IK.ConnectorMark, { connector: c.name, size: 'xs', label: c.name + ' logo' }),
            h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'min-w-0 flex-1 truncate' }, c.label),
            line(plural(c.metrics, 'metric', 'metrics'), 'shrink-0 tabular-nums'));
        }),
        p.file ? h('div', { className: 'flex min-w-0 items-center gap-2' },
          h(IK.DsFileMark, { type: p.file.type, size: 'sm' }),
          h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'min-w-0 flex-1 truncate' }, p.file.name),
          line('File', 'shrink-0')) : null));
  }

  /* a colleague asking about it in their own chat — the answer names where it came from */
  function ChatCard(p) {
    var c = p.connection;
    return h(D.Card, { variant: 'outline', className: 'ik-wsi-card flex flex-col gap-3 p-4' },
      h('div', { className: 'flex items-center gap-2' },
        face('OP', 'o'),
        h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, 'Olena Petrenko'),
        line('in her chat', 'min-w-0 truncate')),
      h('div', { className: 'ik-wsi-ask self-end' },
        h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'primary' }, 'What’s our win rate this quarter?')),
      h('div', { className: 'flex flex-col gap-1.5' },
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'm-0' },
          'Win rate is ', h('span', { className: 'font-semibold text-ink-primary' }, '32%'), ', up 4 points on last quarter'),
        h('span', { className: 'flex min-w-0 items-center gap-1.5' },
          h(IK.ConnectorMark, { connector: c.name, size: 'xs', label: c.name + ' logo', className: 'size-3.5' }),
          line(c.label + ' · shared in Sales', 'min-w-0 truncate'))));
  }

  var POINTS = [
    ['ws-share', 'Connect once', 'Your connections and their metrics work for everyone in the workspace'],
    ['add-chat', 'Ask in any chat', 'Members use what’s shared in their own chats — one set of numbers for all'],
    ['ws-users', 'Stay in control', 'Invite who you need, take a connection or a file out at any time']
  ];

  IK.WsIntro = function WsIntro(p) {
    var conns = (p.connections || IK.WS_CONNECTIONS || []).filter(function (c) { return c.metrics > 0; });
    var files = p.files || IK.WS_FILES || [];
    var allConns = p.connections || IK.WS_CONNECTIONS || [];
    var cta = h(IK.Locked, { feature: 'workspaces', locked: !!p.locked, surface: 'modal', tip: 'Available on Pro' },
      h(D.Button, { variant: 'primary', size: 'md', rounded: 'full', type: 'button', leftSlot: h(IK.Icon, { name: 'plus' }), onClick: p.onCreate }, 'Create Workspace'));
    return h('section', { className: 'ik-wsi', 'aria-labelledby': 'ik-wsi-title' },
      h('div', { className: 'ik-wsi-head' },
        h('h2', { id: 'ik-wsi-title', className: 'ik-wsi-title' }, 'Give your team ', h(IK.ChatKeyword, null, 'the same data')),
        h(D.Typography, { element: 'p', textStyle: 'body16', textColor: 'secondary', className: 'm-0 text-balance text-center' },
          'A workspace shares your connections, their metrics and your files with colleagues — they ask about them in their own chats, nothing to set up')),
      h('div', { className: 'ik-wsi-stage' },
        h('div', { className: 'ik-wsi-scene' },
          h(WorkspaceCard, { connections: conns.slice(0, 2), file: files[0] }),
          h('span', { className: 'ik-wsi-arrow', 'aria-hidden': 'true' }, h(IK.Icon, { name: 'chevron-right', size: 16 })),
          h(ChatCard, { connection: conns[0] || { name: 'Salesforce', label: 'Main CRM' } }))),
      h('ul', { className: 'ik-wsi-points' }, POINTS.map(function (pt) {
        return h('li', { key: pt[1], className: 'flex items-start gap-3' },
          h('span', { className: 'ik-wsi-disc', 'aria-hidden': 'true' }, h(IK.Icon, { name: pt[0], size: 16 })),
          h('span', { className: 'flex min-w-0 flex-col gap-0.5' },
            h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary' }, pt[1]),
            h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary' }, pt[2])));
      })),
      h('div', { className: 'flex flex-col items-center gap-2' },
        cta,
        line(p.locked ? 'Workspaces come with Pro'
          : 'Your ' + plural(allConns.length, 'connection', 'connections') + ' and ' + plural(files.length, 'file', 'files') + ' are ready to share')));
  };
})();
