/* WsMembers — who is in a workspace, as ONE list (user, 2026-10-19: one list with statuses, search and
   filtering), in the Insightis list parts: the search (DevartUI SearchInput, as Metrics / Catalog), FilterChips
   All · Members · Invited (as Files; only when something is pending), then a DevartUI Table — the
   invitations still pending first (they wait on someone), then the Owner, the members by name:

     Name     Avatar xs + name + email (an invitation: the mail glyph + the email + "Expires in 12 days");
              long names / emails truncate, the whole text in a tooltip
     Role     "Owner" (Badge secondary, square; its tooltip: the owner can't leave) or "Member" — an
              invitation joins as a Member
     Status   one badge: Active · Invited (attention) — Invited while Blocked too
     Actions  ⋮ revealed on hover (always below 768px): a member → Remove from Workspace; an
              invitation → Resend Invitation (locked while Blocked) · Revoke Invitation; the Owner none
   20 rows at a time + Load more; nothing matching → "No matches found". Nobody but the Owner and
   nothing pending → StatusView "Only you so far" + emptyAction (Invite Members). readOnly: no ⋮
   column. Below 640px Role folds away, below 768px Status.

   h(IK.WsMembers, { ws, me, readOnly, emptyAction, onRemove(member), onResend(invite), onRevoke(invite) })      */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var PAGE = 20;
  var DAY = 864e5;

  IK.defineIcons({
    'ws-resend': '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    'ws-user-x': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>'
  });

  function daysLeft(t) { return Math.max(0, 14 - Math.floor((Date.now() - t) / DAY)); }
  function left(t) {
    var d = daysLeft(t);
    return d <= 1 ? 'Expires tomorrow' : 'Expires in ' + d + ' days';
  }
  /* three days or fewer: the line turns attention-coloured, so a lapsing invitation is seen (user, 2026-10-19) */
  var SOON = 3;
  function fit(text, cls) {
    return h(D.TruncatedTitleTooltip, { title: text, getTruncationTarget: function (t) { return t; } },
      h('span', { className: IK.cx('min-w-0 truncate', cls) }, text));
  }
  function avatar(initial, icon) {
    return h(D.Avatar, { size: 'xs', className: 'shrink-0' },
      h(D.AvatarFallback, { rounded: 'full', className: 'text-xs font-semibold' }, icon ? h(IK.Icon, { name: 'mail', size: 14 }) : initial));
  }
  function person(lines, initial, icon) {
    return h('div', { className: 'flex min-w-0 items-center gap-3' },
      avatar(initial, icon),
      h('div', { className: 'flex min-w-0 flex-1 flex-col' }, lines));
  }
  /* Role is plain text for everyone — Owner and Member read alike (user, 2026-10-19: 'не консистентно'); the
     tooltip still says why the Owner's row has no menu */
  function ownerBadge() {
    return h(IK.Tip, { tip: 'The owner can’t be removed', wrap: true },
      h('span', { tabIndex: 0, className: IK.cx('rounded-sm', D.focusRing) }, h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' }, 'Owner')));
  }

  function badge(text, variant) { return h(D.Badge, { variant: variant, size: 'sm', rounded: 'full', withDot: true }, text); }

  IK.WsMembers = function WsMembers(p) {
    var w = p.ws, ro = !!p.readOnly, blocked = w.status === 'blocked';
    /* touch-size screens have no hover to reveal the ⋮: it stays shown below 768px (as Metrics does) */
    var phone = D.useMaxWidth(768);
    var me = p.me || {};
    var qs = R.useState(''), q = qs[0], setQ = qs[1];
    var fs = R.useState('all'), filter = fs[0], setFilter = fs[1];
    var ss = R.useState(PAGE), shown = ss[0], setShown = ss[1];
    R.useEffect(function () { setShown(PAGE); }, [q, filter]);

    /* nobody but the Owner and nothing pending: an empty state instead of a one-row list */
    if (!ro && w.members.length === 1 && !w.invites.length) return h(D.StatusView, {
      size: 'lg', surface: 'embedded', withIconHalo: false, icon: h(D.EmptyStateIllustration),
      title: 'Only you so far', description: 'Invite colleagues by email — they join as members and use what is shared here',
      actions: p.emptyAction
    });

    /* one list: the invitations still pending first (user, 2026-10-19), then the Owner, the members */
    var people = w.invites.map(function (i) { return { kind: 'invite', key: 'i:' + i.email, i: i, text: i.email }; }).concat(w.members.slice().sort(function (x, y) {
      if (x.email === w.owner.email) return -1; if (y.email === w.owner.email) return 1;
      return x.name.localeCompare(y.name);
    }).map(function (m) { return { kind: 'member', key: m.email, m: m, text: m.name + ' ' + m.email }; }));
    var qq = q.trim().toLowerCase();
    var rows = people.filter(function (r) {
      return (filter === 'all' || (filter === 'members' ? r.kind === 'member' : r.kind === 'invite')) &&
        (!qq || r.text.toLowerCase().indexOf(qq) >= 0);
    });
    var page = rows.slice(0, shown);
    /* a row with actions is interactive (DevartUI's hover / pressed fill + pointer): a click on it opens its ⋮
       menu, so the fill promises what the row does (user, 2026-10-19: "де ховер рядків"); the Owner's row has
       no actions and stays still */
    var om = R.useState(null), openMenu = om[0], setOpenMenu = om[1];
    function rowProps(key, acts) {
      return acts ? { key: key, 'data-interactive': '', onClick: function (e) { if (!(e.target.closest && e.target.closest('button, a, [role="menu"], [role="menuitem"]'))) setOpenMenu(key); } } : { key: key };
    }
    function menuProps(key) { return { reveal: false, open: openMenu === key, onOpenChange: function (v) { setOpenMenu(v ? key : null); } }; }

    function memberRow(m) {
      var owner = m.email === w.owner.email, you = m.email === me.email;
      return h(D.TableRow, rowProps(m.email, !ro && !owner),
        h(D.TableCell, { className: 'max-w-0' },
          person([
            h('div', { key: 'n', className: 'flex min-w-0 items-center gap-2' }, fit(m.name + (you ? ' (you)' : ''), 'font-medium text-ink-primary')),
            h(D.Typography, { key: 'e', element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'flex min-w-0' }, fit(m.email))
          ], m.initial)),
        h(D.TableCell, { className: 'whitespace-nowrap max-sm:hidden' },
          owner ? ownerBadge() : h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' }, 'Member')),
        h(D.TableCell, { className: 'whitespace-nowrap max-md:hidden' }, badge('Active', 'success')),
        ro ? null : h(D.TableActionsCell, { reveal: !phone }, owner ? null :
          h(D.RowMenuButton, menuProps(m.email),
            h(D.DropdownMenuItem, { variant: 'danger', onSelect: function () { p.onRemove(m); } },
              h(IK.Icon, { name: 'ws-user-x', size: 16 }), 'Remove from Workspace'))));
    }
    function inviteRow(i) {
      return h(D.TableRow, rowProps('i:' + i.email, !ro),
        h(D.TableCell, { className: 'max-w-0' },
          /* under the email, when it runs out (user, 2026-10-19); the Status column is the badge alone */
          person([
            h('div', { key: 'n', className: 'flex min-w-0' }, fit(i.email, 'font-medium text-ink-primary')),
            h(D.Typography, { key: 's', element: 'span', textStyle: 'body12', textColor: daysLeft(i.sent) <= SOON ? undefined : 'secondary',
              className: daysLeft(i.sent) <= SOON ? 'font-medium text-fb-attention' : undefined }, left(i.sent))
          ], null, true)),
        h(D.TableCell, { className: 'whitespace-nowrap max-sm:hidden' },
          h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' }, 'Member')),
        /* Invited, while Blocked too (user, 2026-10-20: "\u0442\u0430\u043c \u043c\u0430\u043b\u043e \u0431\u0443\u0442\u0438 \u0456\u043d\u0432\u0430\u0439\u0442\u0435\u0434") */
        h(D.TableCell, { className: 'whitespace-nowrap max-md:hidden' }, badge('Invited', 'attention')),
        ro ? null : h(D.TableActionsCell, { reveal: !phone },
          h(D.RowMenuButton, menuProps('i:' + i.email),
            /* Resend is an invitation: while Blocked it is locked (a plan brings it back), Revoke works */
            h(IK.Locked, { feature: 'workspaces', locked: blocked },
              h(D.DropdownMenuItem, { onSelect: function () { p.onResend(i); } }, h(IK.Icon, { name: 'ws-resend', size: 16 }), 'Resend Invitation')),
            h(D.DropdownMenuItem, { variant: 'danger', onSelect: function () { p.onRevoke(i); } }, h(IK.Icon, { name: 'ws-mail-x', size: 16 }), 'Revoke Invitation'))));
    }

    var table = h(D.Table, { layout: 'fixed', 'aria-label': 'Members of ' + w.name },
      h(D.TableHeader, null, h(D.TableRow, null,
        h(D.TableHead, { style: { width: '52%' } }, 'Name'),
        h(D.TableHead, { style: { width: '16%' }, className: 'max-sm:hidden' }, 'Role'),
        h(D.TableHead, { style: { width: '22%' }, className: 'max-md:hidden' }, 'Status'),
        ro ? null : h(D.TableHead, { style: { width: '10%' }, className: 'text-right' }, 'Actions'))),
      h(D.TableBody, null, page.length ? page.map(function (r) { return r.kind === 'member' ? memberRow(r.m) : inviteRow(r.i); })
        : h(D.TableRow, null, h(D.TableCell, { colSpan: 4, className: 'py-12' },
            h(D.StatusView, { size: 'lg', surface: 'embedded', withIconHalo: false, role: 'status', icon: h(D.EmptyStateIllustration),
              title: 'No matches found',
              description: qq ? 'No one matches "' + q.trim() + '" — try a different search' : 'No one here matches this filter — switch back to All' })))));

    var left2 = rows.length - page.length;
    return h('div', { className: 'flex flex-col gap-3' },
      /* the Insightis list toolbar: DevartUI SearchInput (Metrics, Catalog), FilterChips (Files), the count */
      h(D.SearchInput, { value: q, onValueChange: setQ, onClear: function () { setQ(''); }, placeholder: 'Search members…', 'aria-label': 'Search members' }),
      h('div', { className: 'flex flex-col gap-2' },
        w.invites.length ? h(D.FilterChips, {
          value: filter, onValueChange: function (v) { if (v) setFilter(v); },
          items: [{ value: 'all', label: 'All' }, { value: 'members', label: 'Members' }, { value: 'invited', label: 'Invited' }]
        }) : null,
        table,
        left2 > 0 ? h('div', { className: 'mt-1 flex justify-center' },
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setShown(shown + PAGE); } },
            'Load more ', h('span', { className: 'font-medium tabular-nums text-ink-inactive' }, left2))) : null));
  };
})();
