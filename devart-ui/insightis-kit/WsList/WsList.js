/* WsList — the Workspaces list (approved/workspaces.html), the AI connectivity prototype's list row
   carried over (its WorkspacesIndex): DevartUI Table, auto layout, no Card around it (Table is
   one), the empty states INSIDE the table so the header, the field and the button stay put.

     Name         the workspace name — the link that opens it — and, beside it, the row's one mark:
                  a Blocked workspace's warning glyph with its reason in a tooltip (the ROW is marked,
                  as the AI connectivity list does). Long names truncate, the whole name in a tooltip.
     Owner        "You", or the Owner's name (the person invited you)
     Members      how many people are in it (the AI connectivity list's Contributors)
     Connections  the AI connectivity list's cell: "2 connections ⌄" (tertiary xs) opens a menu of
                  them — logo, name, metrics — each leading to the Connections tab, "Add Connection"
                  (accent) at the foot on the person's own; none → "+ Add Connection" (primaryTertiary
                  xs, brand), which opens the workspace with Add connections open; invited and none →
                  "No connections". Locked while Blocked.
     Files        the same: "2 files ⌄" (up to 8 listed, then "All N files") + "Add Files" at the
                  foot; none → "+ Add Files" (→ Files); invited and none → "No files"
     Last activity  "1 minute ago", "4 hours ago" (secondary)
     Actions      the Insightis row menu — ⋮ (DevartUI RowMenuButton) revealed on row hover / focus /
                  while open, always shown below 768px. Own: Invite Members · Add Connection (each opens
                  the workspace with its dialog open) · Add Files (→ Files) — locked while Blocked —
                  then Edit · Delete (danger). Invited and Blocked: Ask
                  <Owner> to Renew (→ Request Sent). Invited and Active: none. No column when no row
                  is the person's own.
   A row opens the workspace's own page (IK.wsHrefFor) — the Owner's view of it, or the read-only
   one for a workspace the person was invited to. Own and invited rows sit in one list: the role is
   the workspace's, not the person's. Below 768px Owner / Members / Connections / Files fold into a line under the name.
   many    20 rows at a time, then "Load more N" under the table (as Files); a search starts over
   empty   no table, the Insightis first-run banner (DevartUI Banner diagonalAiry, as Data Sources'
           'Connect your first data source'): Share your data with your team + Create Workspace
   noMatch "No matches found" — the Insightis copy (Chats, Files, Catalog), no buttons

   select  every row has a checkbox: the person's own rows can be picked (header: all of them on the
           page); an invited row's is disabled with its reason in a tooltip ("Only <Owner> can delete
           this workspace"). The page keeps the ids and shows DevartUI ListSelectionBar, as Files does

   A connection in the Connections menu opens IK.DsConnectionPanel in place (onConnection); Add Files
   opens the workspace with the file picker open.

   Invite Members / Add Connection / Add Files call onAct('invite' | 'add' | 'files', w): the page
   opens that dialog where the person is, and goes to the workspace once it is done.

   h(IK.WsList, { workspaces, query, createButton, selected: [ids], onSelect(ids), onEdit(w), onDelete(w), onRenew(w), onConnection(w, c), onAct(kind, w) }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var PAGE = 20;

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function stop(e) { e.stopPropagation(); }
  function fit(text, cls) {
    return h(D.TruncatedTitleTooltip, { title: text, getTruncationTarget: function (t) { return t; } },
      h('span', { className: IK.cx('min-w-0 truncate', cls) }, text));
  }
  /* a workspace's page on a tab, optionally opening a dialog there (do: add | invite) */
  function to(w, tab, act) { return IK.wsHref('approved/workspaces.html', { w: w.id, tab: tab || null, do: act || null }); }
  function go(href) { return function () { location.assign(href); }; }
  /* an act on a workspace: the page opens its dialog in place (onAct) and only then goes to the
     workspace; without onAct, the workspace page opens with that dialog */
  function act(p, kind, w, tab) { return p && p.onAct ? function () { p.onAct(kind, w); } : go(to(w, tab, kind)); }
  function num(n) { return h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'tabular-nums' }, n); }
  /* absence is a quiet dash, as every Workspaces column (user, 2026-10-19: 'відсутність позначали -') */
  function none() { return h('span', { className: 'text-ink-inactive', 'aria-label': 'None' }, '—'); }
  function quiet(t) { return h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary' }, t); }
  /* The AI connectivity list's cells (its ConnectionsCell, CountDisclosure, CellAction — unified with
     them, user 2026-10-20): the count is a tertiary xs Button with a 14px chevron that opens the menu of what is in it — each row leads to that
     tab of the workspace — with the next step at its foot (accent); nothing in it → the step itself,
     a brand primaryTertiary xs Button "+ Add Connection" (14px glyph). Both pulled back by -mx-2 (their side padding) so the column
     keeps one left edge. While Blocked the step is locked; an invited workspace with none says so. */
  function disclosure(label, rows, foot) {
    return h(D.DropdownMenu, null,
      h(D.DropdownMenuTrigger, { asChild: true },
        h(D.Button, { variant: 'tertiary', size: 'xs', type: 'button', className: '-mx-2', onClick: stop,
          rightSlot: h(IK.Icon, { name: 'chevron-down', size: 14 }) }, label)),
      h(D.DropdownMenuContent, { align: 'start', className: 'w-72', onClick: stop },
        rows, foot ? h(D.DropdownMenuSeparator, null) : null, foot || null));
  }
  function cellAction(label, onClick, blocked) {
    var b = h(D.Button, { variant: 'primaryTertiary', size: 'xs', type: 'button', className: '-mx-2', onClick: function (e) { e.stopPropagation(); onClick(); },
      leftSlot: h(IK.Icon, { name: 'plus', size: 14 }) }, label);
    return blocked ? h(IK.Locked, { feature: 'workspaces', locked: true, surface: 'modal', tip: 'Available on Pro' }, b) : b;
  }
  function footItem(label, icon, onSelect, blocked) {
    var it = h(D.DropdownMenuItem, { variant: 'accent', onSelect: onSelect }, h(IK.Icon, { name: icon, size: 16 }), label);
    return blocked ? h(IK.Locked, { feature: 'workspaces', locked: true }, it) : it;
  }
  function connCell(w, own, blocked, p) {
    var n = w.connections.length;
    if (!n) return own ? cellAction('Add Connection', act(p, 'add', w, 'connections'), blocked) : none();
    return disclosure(plural(n, 'connection', 'connections'), w.connections.map(function (c) {
      var m = Array.isArray(c.metrics) ? c.metrics.length : (c.metrics || 0);
      return h(D.DropdownMenuItem, { key: c.id, onSelect: p.onConnection ? function () { p.onConnection(w, c); } : go(to(w, 'connections')) },
        h(IK.ConnectorMark, { connector: c.name, size: 'xs' }),
        h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'min-w-0 flex-1 truncate' }, c.label),
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'shrink-0 tabular-nums' }, plural(m, 'metric', 'metrics')));
    }), own ? footItem('Add Connection', 'plus', act(p, 'add', w, 'connections'), blocked) : null);
  }
  function item(label, icon, onSelect, blocked, danger) {
    var it = h(D.DropdownMenuItem, { key: label, variant: danger ? 'danger' : undefined, onSelect: onSelect }, h(IK.Icon, { name: icon, size: 16 }), label);
    return blocked ? h(IK.Locked, { key: label, feature: 'workspaces', locked: true }, it) : it;
  }

  /* a Blocked workspace: the same warning popover as a shared connection's or metric's (IK.StatusMark — user,
     2026-10-22: "як можуть бути різні тултіпи - на пошерених мав бути поповер як на сторінках метрик та сорсів"): why,
     and the way back — one's own: Upgrade to Pro; an invited one: Ask Owner to Renew (Request Sent once asked), and on
     Free that the person needs Starter too */
  function mark(w, p) {
    if (w.status !== 'blocked') return null;
    if (w.role === 'owner') return h(IK.StatusMark, { name: w.name,
      problems: [{ kind: 'warning', text: 'Your plan no longer includes Workspaces, so its members can’t use it' }],
      action: h(IK.Locked, { feature: 'workspaces', clickOnly: true, marker: 'none', locked: true },
        h(D.Button, { variant: 'secondary', size: 'sm', type: 'button' }, 'Upgrade to Pro')) });
    return h(IK.WsUnavailableMark, { name: w.name, by: w.owner.name, noun: 'workspaces', feature: 'workspaces', withAction: true,
      renewal: { blocked: true, owners: [w.owner.name], requested: !!w.requested, request: p.onRenew ? function () { p.onRenew(w); } : null } });
  }

  IK.WsList = function WsList(p) {
    /* compact: the file preview takes the right of the screen, so the list is as narrow as a phone's and
       uses its layout — the name with one line under it, the counts' columns gone (user, 2026-10-19: 'виглядає поламаним') */
    var phone = D.useMaxWidth(768), small = phone || !!p.compact, hideCol = p.compact ? 'hidden' : 'max-md:hidden';
    var list = p.workspaces || [], q = String(p.query || '').trim();
    var rows = q ? list.filter(function (w) { return w.name.toLowerCase().indexOf(q.toLowerCase()) >= 0; }) : list;
    /* 20 at a time + Load more, as Files: a search starts again from the first page */
    var sh = R.useState(PAGE), shown = sh[0], setShown = sh[1];
    R.useEffect(function () { setShown(PAGE); }, [q, list.length > PAGE]);
    var page = rows.slice(0, shown), remaining = rows.length - page.length;
    /* an Actions column only when some row has actions (a Member's rows have none); columnsOf — the
       whole list the columns follow, so a tab of shared ones keeps the same grid (no jump on switching) */
    /* an Actions column when some row has actions: one's own (manage), an invited one (Leave, Ask to Renew) */
    var acts = !!p.onLeave || (p.columnsOf || list).some(function (w) { return w.role === 'owner'; });
    /* selection, as Files: a checkbox on the person's own rows (only those can be deleted) */
    var sel = p.selected || [];
    /* every row can be picked: one's own to delete, an invited one to leave (user, 2026-10-19: "але ти можеш покинути") */
    var mine = p.onLeave ? page : page.filter(function (w) { return w.role === 'owner'; });
    var allMine = mine.length > 0 && mine.every(function (w) { return sel.indexOf(w.id) >= 0; });
    var someMine = !allMine && mine.some(function (w) { return sel.indexOf(w.id) >= 0; });
    var empty = !rows.length ? (q
      ? h(D.StatusView, {
          size: 'lg', surface: 'embedded', withIconHalo: false, role: 'status', icon: h(D.EmptyStateIllustration),
          title: 'No matches found', description: 'No workspaces match "' + q + '" — try a different search'
        })
      : h(D.StatusView, {
          size: 'lg', surface: 'embedded', withIconHalo: false, icon: h(D.EmptyStateIllustration),
          title: 'No workspaces yet', description: 'Create one to share connections, metrics and files with colleagues',
          actions: p.createButton
        })) : null;

    /* no workspace at all: not an empty table under its column heads but a welcome (user, 2026-10-19:
       the bare 'No workspaces yet' did not draw anyone in) — what a workspace is for, the three things
       it gives, and Create Workspace. DevartUI StatusView (info halo) + three outline Cards with a
       CardIcon each, in one outline Card where the table would be. */
    if (!list.length && !q) return h(D.Banner, {
      /* the Insightis first-run banner, as Data Sources' 'Connect your first data source' (user, 2026-10-19:
         the welcome card with three tiles looked foreign) */
      variant: 'diagonalAiry', role: 'note', icon: h(IK.Icon, { name: 'ws-layers' }),
      title: 'Share your data with your team',
      description: 'Add connections and files to a workspace, then invite colleagues to use them in their chats',
      action: p.createButton
    });

    var table = h(D.Table, { layout: 'fixed', 'aria-label': 'Workspaces' },
      h(D.TableHeader, null, h(D.TableRow, null,
        acts ? h(D.TableHead, { width: 'control' },
          h(D.Checkbox, { 'aria-label': p.onLeave ? 'Select all workspaces' : 'Select all your workspaces', checked: allMine ? true : someMine ? 'indeterminate' : false, disabled: !mine.length,
            onCheckedChange: function (v) { p.onSelect(v === true ? mine.map(function (w) { return w.id; }) : []); } })) : null,
        /* fixed layout in proportion to what each column holds (as Data Sources' My Connections sets its
           COLS): the name the widest, a count the narrowest, the cell actions ("+ Add Connection") whole at 1280px, the ⋮ its own small column */
        /* compact: the name takes what the hidden columns leave */
        /* no Files column (user, 2026-10-20: "забери файли") — a workspace's files are on its Files tab */
        /* narrow (a phone, or the preview open): the name takes all the hidden columns leave — at 26% the rest went to
           the checkbox column (user, 2026-10-22: 'що це таке - в першу чергу виправ респонсив') */
        /* the name takes what the rest leaves, as on Data Sources: percentages for the others and a fixed Actions — at 8%
           its head no longer fitted at 1024 and the table ran past its frame (user, 2026-10-22: 'стовпчик екшнз не мав врізатись') */
        h(D.TableHead, null, 'Name'),
        h(D.TableHead, { style: { width: '15%' }, className: hideCol }, 'Owner'),
        h(D.TableHead, { style: { width: '9%' }, className: hideCol }, 'Members'),
        h(D.TableHead, { style: { width: '19%' }, className: hideCol }, 'Connections'),
        h(D.TableHead, { style: { width: '14%' }, className: hideCol }, 'Last activity'),
        /* narrow: the column is the ⋮ and its insets, its head for the screen reader only (a clipped 'Action' read broken) */
        acts ? h(D.TableHead, { style: { width: small ? '3.5rem' : '5.5rem' }, className: 'text-right' }, small ? h('span', { className: 'sr-only' }, 'Actions') : 'Actions') : null)),
      h(D.TableBody, null, empty
        ? h(D.TableRow, null, h(D.TableCell, { colSpan: acts ? 7 : 5, className: 'py-12' }, empty))
        : page.map(function (w) {
            var own = w.role === 'owner', href = IK.wsHrefFor(w), on = sel.indexOf(w.id) >= 0, blocked = w.status === 'blocked';
            var owner = own ? 'You' : w.owner.name;
            return h(D.TableRow, {
              key: w.id, 'data-interactive': '', 'data-state': on ? 'selected' : undefined,
              /* the whole row opens the workspace — a click on a control in it (a link, a button, a menu) does its own thing */
              onClick: function (e) { if (!e.target.closest('a, button, [role="img"], [role="menu"], [role="menuitem"], [role="checkbox"]')) location.assign(href); }
            },
              acts ? h(D.TableCell, { onClick: stop }, own || p.onLeave ? h(D.Checkbox, { 'aria-label': 'Select ' + w.name, checked: on,
                onCheckedChange: function (v) { p.onSelect(v === true ? sel.concat([w.id]) : sel.filter(function (x) { return x !== w.id; })); } })
                /* an invited workspace can't be picked (only its Owner deletes it): its checkbox is there,
                   disabled, and says why — the column stays whole */
                : h(IK.Tip, { tip: 'Only the owner can delete it', wrap: true },
                    h(D.Checkbox, { 'aria-label': w.name + ' — only ' + w.owner.name + ' can delete it', checked: false, disabled: true }))) : null,
              h(D.TableCell, { className: 'max-w-0' },
                h('div', { className: 'flex min-w-0 flex-col gap-0.5' },
                  h('div', { className: 'flex min-w-0 items-center gap-2' },
                    /* the tooltip's wrapper fills its parent: a content-wide parent keeps the mark beside the name */
                    h('span', { className: 'flex min-w-0' },
                      h(D.TruncatedTitleTooltip, { title: w.name, getTruncationTarget: function (t) { return t; } },
                        h('a', { href: href, className: IK.cx('min-w-0 truncate rounded-sm text-sm font-medium text-ink-primary', D.focusRing) }, w.name))),
                    mark(w, p)),
                  small ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'flex min-w-0' },
                    fit(owner + ' · ' + plural(w.members.length, 'member', 'members') + ' · ' + plural(w.connections.length, 'connection', 'connections'))) : null)),
              h(D.TableCell, { className: hideCol + ' max-w-48' },
                h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'flex min-w-0' }, fit(owner))),
              h(D.TableCell, { className: hideCol + ' whitespace-nowrap' }, num(w.members.length)),
              h(D.TableCell, { className: hideCol + ' whitespace-nowrap' }, connCell(w, own, blocked, p)),
              h(D.TableCell, { className: hideCol + ' whitespace-nowrap' }, quiet(IK.wsAgo(w.active || w.created))),
              /* the Insightis row menu: ⋮ revealed on row hover / focus / while open, always shown on a phone */
              acts ? h(D.TableActionsCell, { reveal: !phone, onClick: stop }, own
                ? h(D.RowMenuButton, { reveal: false },
                    item('Invite Members', 'ws-users', act(p, 'invite', w, 'members'), blocked),
                    item('Add Connection', 'plus', act(p, 'add', w, 'connections'), blocked),
                    /* no Add Files here (user, 2026-10-20: "додавання файлу забери") — the Files tab and Files' ⋮ add them */
                    h(D.DropdownMenuSeparator, null),
                    item('Edit', 'rename', function () { p.onEdit(w); }),
                    item('Delete', 'delete', function () { p.onDelete(w); }, false, true))
                /* an invited workspace: Leave Workspace; while it is Blocked, Ask its Owner to Renew first */
                : (blocked && p.onRenew) || p.onLeave ? h(D.RowMenuButton, { reveal: false },
                    blocked && p.onRenew ? (w.requested ? h(D.DropdownMenuItem, { key: 'rs', disabled: true }, h(IK.Icon, { name: 'check', size: 16 }), 'Request Sent')
                      : item('Ask Owner to Renew', 'ws-send', function () { p.onRenew(w); })) : null,
                    blocked && p.onRenew && p.onLeave ? h(D.DropdownMenuSeparator, { key: 'sep' }) : null,
                    p.onLeave ? item('Leave Workspace', 'ws-leave', function () { p.onLeave(w); }, false, true) : null)
                : null) : null);
          })));
    return remaining > 0 ? h('div', { className: 'flex flex-col gap-2' }, table,
      h(IK.LoadMore, { left: remaining, onClick: function () { setShown(shown + PAGE); } })) : table;
  };
})();
