/* WsOverview — a workspace page's first tab, the AI connectivity prototype's Overview carried over
   (GeneralCard · StatTile row · Members card · Connections card), on DevartUI Card, StatTile,
   Avatar, Badge and LinkButton.

     General      the name (title16) + Edit (pencil, the Owner only — the name and the description) · the description
                  · who made it / who shared it.
                  No status line: Active needs no words, and Blocked is the page's IK.WsNotice
     tiles        Members · Connections · Files — DevartUI StatTiles, one column below 640px, each with a
                  line only when it says something: the invitations pending (no names, no "Just you" — user, 2026-10-22),
                  the metrics the connections carry, when a file was last added; none, and the tile is shorter.
                  The Owner's carry a "+" (rightSlot) that adds one in place — always, no gear to manage
                  (user, 2026-10-21: "завжди + не треба налаштувань"); a Member's none ("забери стрілки"). Row: the Connections list two thirds wide, Members and
                  Files stacked beside it; Grid: the four tiles in a row, the list under them
     (no Metrics tile and no Connections list — user, 2026-10-20: "метрики забери, конекшени забери":
      their tabs hold them)
     (no Members list — user, 2026-10-19: "не приносить користі"; the tile names nobody either — 2026-10-22)
     last         the Owner: Delete workspace; a Member: Leave workspace — the same destructive row
   Read-only for a Member: no pencil, no Add — absent, not disabled.

   One layout: three tiles in one row — Connections · Files · Members, in the tabs' order (one column on a
     phone) — then the destructive row.

   h(IK.WsOverview, { ws, me, owner: bool, onEdit, onTab(tab), onInvite, onAdd, onShareFiles, addLocked, onConnection(c), onDelete, onLeave })        */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  /* a tile's own action (StatTile rightSlot, as the AI connectivity Connections tile has): "+" adds one in place,
     whatever is in it already — no gear to manage it, its tab does that (user, 2026-10-21: "завжди + не треба
     налаштувань") — locked while Blocked */
  function tileAction(label, onClick, icon, locked) {
    var add = icon === 'plus';
    var btn = h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': label, onClick: onClick }, h(IK.Icon, { name: icon }));
    /* locked, the + stays a + — an icon-only button that turned into a padlock no longer says what it does (user,
       2026-10-21: 'якщо іконка була - вона не мала змінитись на замок'); its tooltip and the upgrade popover say why */
    return add && locked ? h(IK.Locked, { feature: 'workspaces', locked: true, surface: 'modal', tip: 'Available on Pro', marker: 'none' }, btn) : h(IK.Tip, { tip: label }, btn);
  }

  IK.WsOverview = function WsOverview(p) {
    var w = p.ws, owner = !!p.owner;
    var general = h(D.Card, { variant: 'outline', className: 'flex flex-col gap-4 p-6' },
      h('div', { className: 'flex flex-col gap-1' },
        h('div', { className: 'flex min-w-0 items-center gap-1' },
          h(D.Typography, { element: 'h2', textStyle: 'title16', textColor: 'primary', className: 'm-0 min-w-0 break-words' }, w.name),
          owner ? h(IK.Tip, { tip: 'Edit' },
            h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Edit ' + w.name, onClick: p.onEdit },
              h(IK.Icon, { name: 'rename', size: 14 }))) : null),
        /* what it is used for, as written when it was created (user, 2026-10-19) */
        w.desc ? h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'm-0 break-words' }, w.desc) : null,
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0 break-words' },
          owner ? 'Created by you' + (w.created ? ' on ' + IK.wsFmtDate(w.created) : '')
                : 'Shared with you by ' + w.owner.name)));

    /* the tiles are DevartUI StatTile sm — the dense row of tiles under a heading (user, 2026-10-19: 'компактніше') */
    /* a tile's action: the Owner adds (+), always; a Member none — the tabs are right above (user, 2026-10-21: 'забери стрілки') */
    function act(tab, addLabel, onAdd) {
      if (!owner) return undefined;
      return tileAction(addLabel, onAdd, 'plus', p.addLocked);
    }
    /* "Olena Petrenko, Andrii Melnyk and 2 more" */
    var tMembers = h(D.StatTile, { size: 'sm', label: 'Members', value: w.members.length, rightSlot: act('members', 'Invite Members', p.onInvite),
      /* no names and no 'Just you' — the count says it, the Members tab lists them; only what waits: invitations
         (user, 2026-10-22: 'нема сенсу в підпису тільки ти', 'перераховувати мемберів теж не треба') */
      description: owner && w.invites.length ? plural(w.invites.length, 'invitation', 'invitations') + ' pending' : undefined });
    var lastFile = w.files.reduce(function (t, f) { return Math.max(t, f.date || 0); }, 0);
    var tFiles = h(D.StatTile, { size: 'sm', label: 'Files', value: w.files.length, rightSlot: act('files', 'Add Files', p.onShareFiles),
      description: lastFile ? 'Last added ' + IK.wsAgo(lastFile).toLowerCase() : undefined });
    function tConns(desc) {
      return h(D.StatTile, { size: 'sm', label: 'Connections', value: w.connections.length, rightSlot: act('connections', 'Add Connection', p.onAdd),
        description: w.connections.length ? desc : undefined });
    }
    /* the four counts in one row (two by two below 1024px, one column on a phone), then the Connections list */
    /* Metrics and the Connections list are gone from here (user, 2026-10-20: "метрики забери, конекшени забери") —
       their own tabs hold them; three counts stay: Connections · Files · Members */
    var tiles = h('div', { className: 'grid gap-4 sm:grid-cols-3' },
      /* in the tabs' order — Connections · Metrics · Files · Members, the data first, the people last; the lists
         below follow it (Connections, then Members) (user, 2026-10-19: 'не логічний порядок') */
      /* the list right under it names them: the tile only counts (user, 2026-10-19: 'компактніше') */
      tConns(undefined),
      tFiles, tMembers);

    /* the Owner's last section: Delete — what it does, and the destructive outline action (as Connection
       Details' Disconnect); a Member has Leave Workspace in the title row instead */
    /* the same row as Account's 'Delete my account' (IK.AcctSection row): title, what happens, the
       destructive outline action at the end (user, 2026-10-19: 'щось подібне') */
    /* on a card like every Overview section (user, 2026-10-19: 'чому не на плашці?'), one centred row */
    /* a Member leaves from the same place, the same destructive row (user, 2026-10-19: "покинути на тому ж
       місці що і видалення", "дія деструктивна") */
    function lastRow(title, text, label, onClick) {
      /* the text keeps its own width; when the action no longer fits beside it, the action goes under it (user,
         2026-10-22: 'кнопка мала опускатись під') */
      return h(D.Card, { variant: 'outline', className: 'flex flex-row flex-wrap items-center gap-4 p-6' },
        h('div', { className: 'min-w-0 flex-auto' },
          h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, title),
          h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'secondary', className: 'mt-1' }, text)),
        h(D.Button, { variant: 'destructiveOutline', size: 'sm', type: 'button', className: 'flex-none', onClick: onClick }, label));
    }
    var danger = owner
      ? (p.onDelete ? lastRow('Delete workspace', IK.wsDeleteText(1), 'Delete Workspace', p.onDelete) : null)
      : (p.onLeave ? lastRow('Leave workspace', IK.wsLeaveText([w]), 'Leave Workspace', p.onLeave) : null);
    return h('div', { className: 'flex flex-col gap-4' }, general, tiles, danger);
  };
})();
