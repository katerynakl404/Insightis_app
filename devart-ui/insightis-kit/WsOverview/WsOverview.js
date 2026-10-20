/* WsOverview — a workspace page's first tab, the AI connectivity prototype's Overview carried over
   (GeneralCard · StatTile row · Members card · Connections card), on DevartUI Card, StatTile,
   Avatar, Badge and LinkButton.

     General      the name (title16) + Rename (pencil, the Owner only) · who made it / who shared it.
                  No status line: Active needs no words, and Blocked is the page's IK.WsNotice
     tiles        Members · Connections · Files — DevartUI StatTiles, one column below 640px, each with a
                  line that says something (user, 2026-10-19: "виглядає порожньо"): who is in it (or the
                  invitations pending), the metrics the connections carry, when a file was last added.
                  The Owner's carry a gear (rightSlot) that opens that tab to manage it; a Member's a
                  chevron that opens it to look. Row: the Connections list two thirds wide, Members and
                  Files stacked beside it; Grid: the four tiles in a row, the list under them
     (no Metrics tile and no Connections list — user, 2026-10-20: "метрики забери, конекшени забери":
      their tabs hold them)
     (no Members list: the tile names who is in it — user, 2026-10-19: "не приносить користі")
     last         the Owner: Delete workspace; a Member: Leave workspace — the same destructive row
   Read-only for a Member: no pencil, no Add — absent, not disabled.

   One layout: three tiles in one row — Connections · Files · Members, in the tabs' order (one column on a
     phone) — then the destructive row.

   h(IK.WsOverview, { ws, me, owner: bool, onRename, onTab(tab), onInvite, onAdd, onShareFiles, addLocked, onConnection(c), onDelete, onLeave })        */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function count(c) { return Array.isArray(c.metrics) ? c.metrics.length : (c.metrics || 0); }
  function fit(text, cls) {
    return h(D.TruncatedTitleTooltip, { title: text, getTruncationTarget: function (t) { return t; } },
      h('span', { className: IK.cx('min-w-0 truncate', cls) }, text));
  }
  function head(title, onAll) {
    return h('div', { className: 'flex items-center justify-between gap-3' },
      h(D.Typography, { element: 'h3', textStyle: 'title16', textColor: 'primary', className: 'm-0' }, title),
      /* a LinkButton takes the size of the text it sits in: 14px, the card's own rows (16px read heavy) */
      onAll ? h('span', { className: 'text-sm' }, h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); onAll(); } }, 'See all')) : null);
  }

  /* a tile's own action (StatTile rightSlot, as the AI connectivity Connections tile has): with
     something in it, the gear opens that tab to manage it (the composer's Manage Connections gear);
     with nothing yet, "+" adds the first one in place (user, 2026-10-19) — locked while Blocked */
  IK.defineIcons({ 'ws-open': '<polyline points="9 18 15 12 9 6"/>', 'ws-gear': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>' });
  function tileAction(label, onClick, icon, locked) {
    var add = icon === 'plus';
    var btn = h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': label, onClick: onClick }, h(IK.Icon, { name: icon }));
    return add && locked ? h(IK.Locked, { feature: 'workspaces', locked: true, surface: 'modal', tip: 'Available on Pro' }, btn) : h(IK.Tip, { tip: label }, btn);
  }

  IK.WsOverview = function WsOverview(p) {
    var w = p.ws, owner = !!p.owner;
    var general = h(D.Card, { variant: 'outline', className: 'flex flex-col gap-4 p-6' },
      h('div', { className: 'flex flex-col gap-1' },
        h('div', { className: 'flex min-w-0 items-center gap-1' },
          h(D.Typography, { element: 'h2', textStyle: 'title16', textColor: 'primary', className: 'm-0 min-w-0 break-words' }, w.name),
          owner ? h(IK.Tip, { tip: 'Rename' },
            h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Rename ' + w.name, onClick: p.onRename },
              h(IK.Icon, { name: 'rename', size: 14 }))) : null),
        /* what it is used for, as written when it was created (user, 2026-10-19) */
        w.desc ? h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'm-0 break-words' }, w.desc) : null,
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0 break-words' },
          owner ? 'Created by you' + (w.created ? ' on ' + IK.wsFmtDate(w.created) : '')
                : 'Shared with you by ' + w.owner.name)));

    /* the tiles are DevartUI StatTile sm — the dense row of tiles under a heading (user, 2026-10-19: 'компактніше') */
    /* a tile's action: the Owner manages (gear) or adds the first one (+); a Member opens the tab to look (›) */
    function act(n, tab, manage, addLabel, onAdd, view) {
      if (!owner) return view ? tileAction(view, function () { p.onTab(tab); }, 'ws-open') : undefined;
      return n ? tileAction(manage, function () { p.onTab(tab); }, 'ws-gear') : tileAction(addLabel, onAdd, 'plus', p.addLocked);
    }
    /* "Olena Petrenko, Andrii Melnyk and 2 more" */
    function some(list) { return list.length > 2 ? list.slice(0, 2).join(', ') + ' and ' + (list.length - 2) + ' more' : IK.wsJoin(list); }
    var meEmail = p.me ? p.me.email : (owner ? w.owner.email : null);
    var others = w.members.filter(function (m) { return m.email !== meEmail; }).map(function (m) { return m.name; });
    var nMembers = w.members.length - 1 + w.invites.length;
    var tMembers = h(D.StatTile, { size: 'sm', label: 'Members', value: w.members.length, rightSlot: act(nMembers, 'members', 'Manage members', 'Invite Members', p.onInvite, 'View members'),
      description: owner && w.invites.length ? plural(w.invites.length, 'invitation', 'invitations') + ' pending' : others.length ? some(others) : 'Just you' });
    var lastFile = w.files.reduce(function (t, f) { return Math.max(t, f.date || 0); }, 0);
    var tFiles = h(D.StatTile, { size: 'sm', label: 'Files', value: w.files.length, rightSlot: act(w.files.length, 'files', 'Manage files', 'Add Files', p.onShareFiles, w.files.length ? 'View files' : null),
      description: lastFile ? 'Last added ' + IK.wsAgo(lastFile).toLowerCase() : undefined });
    function tConns(desc) {
      return h(D.StatTile, { size: 'sm', label: 'Connections', value: w.connections.length, rightSlot: act(w.connections.length, 'connections', 'Manage connections', 'Add Connection', p.onAdd, w.connections.length ? 'View connections' : null),
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
      return h(D.Card, { variant: 'outline', className: 'flex flex-row items-center gap-4 p-6' },
        /* the text shrinks, so the action stays beside it, centred, instead of wrapping under it */
        h('div', { className: 'min-w-0 flex-1' },
          h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, title),
          h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'secondary', className: 'mt-1' }, text)),
        h(D.Button, { variant: 'destructiveOutline', size: 'sm', type: 'button', className: 'ms-auto flex-none', onClick: onClick }, label));
    }
    var danger = owner
      ? (p.onDelete ? lastRow('Delete workspace', 'Members lose access, and pending invitations stop working. Your connections and files aren’t affected.', 'Delete Workspace', p.onDelete) : null)
      : (p.onLeave ? lastRow('Leave workspace', 'You lose access to what’s shared in it. ' + w.owner.name + ' can invite you again.', 'Leave Workspace', p.onLeave) : null);
    return h('div', { className: 'flex flex-col gap-4' }, general, tiles, danger);
  };
})();
