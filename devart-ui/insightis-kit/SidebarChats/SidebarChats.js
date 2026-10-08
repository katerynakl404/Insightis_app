/* SidebarChats — the sidebar's Pinned / Recent chat sections, their rows, the row menu and the two
   dialogs it opens (Sidebar.md → "Chat row states" + "Chat-row menu behaviour"). Rendered by
   IK.AppSidebar; exported separately so a chat page can drive the same flows from its header.

   ── The store ─────────────────────────────────────────────────────────────────────────────
   var chats = IK.useChats({ onRenamed, onDeleted, onPinToggled, initial })
   IK.chatsWith({ id: { status, menu } })   DEFAULT_CHATS with per-chat changes, for `initial` — the
     originals differ per page (chat-landing: Jira has the new dot; a chat page gives its chat a ⋮)
     chats.pinned / chats.recent          arrays of chat objects (see IK.DEFAULT_CHATS)
     chats.find(idOrTitle)                → chat | null
     chats.isPinned(id)
     chats.togglePin(id)                  Pin ⇄ Unpin — the row moves to the END of the other section
     chats.rename(id, title) · chats.remove(id)
     chats.requestRename(id) · chats.requestDelete(id)   open the shared dialogs (IK.ChatDialogs)
   Pass the same store to IK.AppShell({ chats }) when the page needs to mirror a row elsewhere —
   e.g. the chat header menu: h(IK.ChatMenuItems, { chats, id }) inside its DropdownMenuContent
   gives Pin/Unpin · Rename · Delete wired to the SAME dialogs, and onRenamed / onDeleted /
   onPinToggled tell the page (rename the header, leave the page after deleting the open chat).

   A chat: { id, title, href, status: 'new' | 'loading' | null, queue: { count, active } | null,
             menu: false (no row menu) }
     href     pages-root relative ('approved/chat_page-landing.html?chat=…'); default = the chat page
     status   'new' → 6px brand dot + "New activity" (never shown on the current chat — it is open);
              'loading' → spinner + aria-busy + "In progress"
     queue    a D.Counter (sm) for messages queued in THAT chat — active while it is still sending,
              quiet once it has stopped. Status, counter and the row menu share the right edge:
              status and counter step aside while the menu button is shown.

   ── Components ────────────────────────────────────────────────────────────────────────────
   IK.SidebarChats   { chats, current, chevronStroke }   both sections (needs a DevartUI SidebarProvider);
                                                    chevronStroke 2 = chat_page-landing's copy (default 2.5)
   IK.ChatMenuItems  { chats, id }                  the three menu items, for any DropdownMenuContent
   IK.ChatDialogs    { chats }                      Rename chat (md) / Delete chat? (sm)

   Sections: the whole header row toggles (label + chevron, ↻ -90° when collapsed); "See all" →
   the Chats library, hover-revealed on desktop, always shown below 1024px and on touch.
   Rows: DevartUI SidebarMenuSubButton (28px, Text/Secondary, State/Hover → State/Pressed, current =
   State/Pressed + Text/Body). The ⋮ menu button (IconButton tertiary 2xs) shows on row hover,
   keyboard focus, and while its menu is open; always shown on touch. Its menu: Pin (Recent) /
   Unpin (Pinned) · Rename · Delete (danger) — DevartUI DropdownMenu.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'kebab-vertical': { fill: true, inner: '<circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/>' }
  });

  function chatPage(title) { return 'approved/chat_page-landing.html?chat=' + encodeURIComponent(title); }

  /* The same list on every page (the original repeats it verbatim on all eight). Message queue,
     the charts chat and Q3 report.xlsx carry no ⋮ menu there — menu: false reproduces that. */
  IK.DEFAULT_CHATS = {
    pinned: [
      { id: 'message-queue', title: 'Message queue', href: 'concept/chat_page-queue.html', menu: false },
      { id: 'salesforce-q1', title: 'Salesforce · Q1 revenue commentary' },
      { id: 'hubspot-onboarding', title: 'HubSpot · onboarding cohort' },
      { id: 'churn-deep-dive', title: 'churn.csv · deep-dive' }
    ],
    recent: [
      { id: 'jira-aiins', title: 'Jira · first 5 AIINS issues' },
      { id: 'two-charts', title: 'Generate two charts using random data', href: 'concept/chat_page-charts-landing.html', menu: false },
      { id: 'q3-report', title: 'Q3 report.xlsx', menu: false }
    ]
  };

  function clone(list) { return list.map(function (c) { return Object.assign({}, c); }); }

  /* The list a page's original shows: DEFAULT_CHATS with per-chat changes — the originals differ
     page to page in which row carries the new-activity dot (chat-landing: Jira) and which rows have
     a ⋮ menu (a chat page gives its own open chat one).
       IK.useChats({ initial: IK.chatsWith({ 'jira-aiins': { status: 'new' } }) })            */
  IK.chatsWith = function (patch) {
    function upd(list) { return list.map(function (c) { return Object.assign({}, c, (patch || {})[c.id] || {}); }); }
    return { pinned: upd(IK.DEFAULT_CHATS.pinned), recent: upd(IK.DEFAULT_CHATS.recent) };
  };

  IK.useChats = function useChats(opts) {
    opts = opts || {};
    var init = opts.initial || IK.DEFAULT_CHATS;
    var s = R.useState(function () { return { pinned: clone(init.pinned || []), recent: clone(init.recent || []) }; });
    var st = s[0], setSt = s[1];
    var d = R.useState(null), dialog = d[0], setDialog = d[1];
    var cb = R.useRef(opts); cb.current = opts;

    function find(key) {
      var all = st.pinned.concat(st.recent);
      for (var i = 0; i < all.length; i++) if (all[i].id === key || all[i].title === key) return all[i];
      return null;
    }
    function isPinned(id) { return st.pinned.some(function (c) { return c.id === id; }); }
    function togglePin(id) {
      var c = find(id); if (!c) return;
      var toPinned = !isPinned(c.id);
      setSt(function (prev) {
        var from = toPinned ? prev.recent : prev.pinned, to = toPinned ? prev.pinned : prev.recent;
        var row = from.filter(function (x) { return x.id === c.id; })[0];
        if (!row) return prev;
        var nf = from.filter(function (x) { return x.id !== c.id; }), nt = to.concat([row]);
        return toPinned ? { pinned: nt, recent: nf } : { pinned: nf, recent: nt };
      });
      if (cb.current.onPinToggled) cb.current.onPinToggled(c, toPinned);
    }
    function rename(id, title) {
      var c = find(id); if (!c || !title) return;
      function upd(list) { return list.map(function (x) { return x.id === c.id ? Object.assign({}, x, { title: title }) : x; }); }
      setSt(function (prev) { return { pinned: upd(prev.pinned), recent: upd(prev.recent) }; });
      if (cb.current.onRenamed) cb.current.onRenamed(c, title);
    }
    function remove(id) {
      var c = find(id); if (!c) return;
      function del(list) { return list.filter(function (x) { return x.id !== c.id; }); }
      setSt(function (prev) { return { pinned: del(prev.pinned), recent: del(prev.recent) }; });
      if (cb.current.onDeleted) cb.current.onDeleted(c);
    }
    return {
      pinned: st.pinned, recent: st.recent,
      find: find, isPinned: isPinned, togglePin: togglePin, rename: rename, remove: remove,
      dialog: dialog,
      requestRename: function (id) { var c = find(id); if (c) setDialog({ kind: 'rename', id: c.id }); },
      requestDelete: function (id) { var c = find(id); if (c) setDialog({ kind: 'delete', id: c.id }); },
      closeDialog: function () { setDialog(null); }
    };
  };

  /* Pin/Unpin · Rename · Delete — the context-aware first label is the only thing that moves. */
  IK.ChatMenuItems = function ChatMenuItems(p) {
    var chats = p.chats, c = chats.find(p.id);
    if (!c) return null;
    var pinned = chats.isPinned(c.id);
    return h(IK.Fragment, null,
      h(D.DropdownMenuItem, { onSelect: function () { chats.togglePin(c.id); } },
        h(IK.Icon, { name: pinned ? 'unpin' : 'pin', size: 16 }), pinned ? 'Unpin' : 'Pin'),
      h(D.DropdownMenuItem, { onSelect: function () { chats.requestRename(c.id); } },
        h(IK.Icon, { name: 'rename', size: 16 }), 'Rename'),
      h(D.DropdownMenuItem, { variant: 'danger', onSelect: function () { chats.requestDelete(c.id); } },
        h(IK.Icon, { name: 'delete', size: 16 }), 'Delete'));
  };

  function RenameDialog(p) {
    var chats = p.chats, c = p.chat;
    var v = R.useState(c ? c.title : ''), val = v[0], setVal = v[1];
    var inputRef = R.useRef(null);
    R.useEffect(function () { setVal(c ? c.title : ''); }, [c && c.id]);
    function save() { var name = (val || '').trim(); if (c && name) chats.rename(c.id, name); chats.closeDialog(); }
    return h(D.Modal, { open: !!c, onOpenChange: function (o) { if (!o) chats.closeDialog(); } },
      h(D.ModalContent, {
        size: 'md',
        onOpenAutoFocus: function (e) {
          e.preventDefault();
          var el = inputRef.current; if (el) { el.focus(); el.setSelectionRange(0, el.value.length); }
        }
      },
        h(D.ModalHeader, null, h(D.ModalTitle, null, 'Rename chat')),
        h('div', { className: 'flex flex-col gap-3' },
          h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' }, 'Give your chat a special name'),
          h(D.InputGroup, null,
            h(D.InputGroupInput, {
              ref: inputRef, value: val, placeholder: 'Chat name', autoComplete: 'off', 'aria-label': 'Chat name',
              onChange: function (e) { setVal(e.target.value); },
              onKeyDown: function (e) { if (e.key === 'Enter') { e.preventDefault(); save(); } }
            }))),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: chats.closeDialog }, 'Cancel'),
          h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: save }, 'Save'))));
  }

  function DeleteDialog(p) {
    var chats = p.chats, c = p.chat;
    var confirmRef = R.useRef(null);
    return h(D.Modal, { open: !!c, onOpenChange: function (o) { if (!o) chats.closeDialog(); } },
      h(D.ModalContent, {
        size: 'sm',
        onOpenAutoFocus: function (e) { e.preventDefault(); if (confirmRef.current) confirmRef.current.focus(); }
      },
        h(D.ModalHeader, null, h(D.ModalTitle, null, 'Delete chat?')),
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' },
          'This action can\'t be undone. The chat will be permanently removed.'),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: chats.closeDialog }, 'Cancel'),
          h(D.Button, {
            ref: confirmRef, variant: 'destructive', size: 'sm', type: 'button',
            onClick: function () { var id = c && c.id; chats.closeDialog(); if (id) chats.remove(id); }
          }, 'Delete'))));
  }

  IK.ChatDialogs = function ChatDialogs(p) {
    var chats = p.chats, dlg = chats.dialog;
    var c = dlg ? chats.find(dlg.id) : null;
    return h(IK.Fragment, null,
      h(RenameDialog, { chats: chats, chat: dlg && dlg.kind === 'rename' ? c : null }),
      h(DeleteDialog, { chats: chats, chat: dlg && dlg.kind === 'delete' ? c : null }));
  };

  function ChatRow(p) {
    var c = p.chat, chats = p.chats;
    var m = R.useState(false), menuOpen = m[0], setMenuOpen = m[1];
    var showStatus = c.status === 'loading' || (c.status === 'new' && !p.current);
    /* The label runs the full row (the original's fade overlays the end); room for the ⋮ is made
       only while it shows (hover / focus / menu open), and for a status that sits at rest. */
    var hasMenu = c.menu !== false;
    return h(D.SidebarMenuItem, { className: IK.cx('ik-chat-row', hasMenu && 'has-menu', menuOpen && 'is-menu-open') },
      h(D.SidebarMenuSubButton, {
        asChild: true, isActive: !!p.current, size: 'md',
        className: IK.cx('ik-chat-link font-medium', (showStatus || c.queue) && 'has-trail')
      },
        h('a', {
          href: IK.pageHref(c.href || chatPage(c.title)),
          'aria-current': p.current ? 'true' : undefined,
          'aria-busy': c.status === 'loading' ? 'true' : undefined,
          onClick: p.current ? function (e) { e.preventDefault(); } : undefined
        }, h('span', null, c.title))),
      showStatus || c.queue ? h('span', { className: 'ik-chat-trail', 'aria-hidden': c.queue ? undefined : 'true' },
        c.queue ? h(IK.Tip, { tip: c.queue.count + ' messages queued in this chat — ' + (c.queue.active ? 'still sending' : 'paused, waiting for you') },
          h(D.Counter, { size: 'sm', active: !!c.queue.active, tabIndex: 0 }, c.queue.count)) : null,
        !c.queue && c.status === 'loading' ? h(D.Spinner, { size: 'xs', color: 'accent', label: 'In progress' }) : null,
        !c.queue && c.status === 'new' ? h('span', { className: 'size-1.5 rounded-full bg-brand-primary' }) : null) : null,
      showStatus && c.status === 'new' ? h('span', { className: 'sr-only' }, 'New activity') : null,
      c.menu === false ? null : h(D.DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen },
        h(IK.Tip, { tip: 'More actions' },
          h(D.DropdownMenuTrigger, { asChild: true },
            h(D.IconButton, { variant: 'tertiary', size: '2xs', 'aria-label': 'More actions', className: 'ik-chat-more' },
              h(IK.Icon, { name: 'kebab-vertical' })))),
        h(D.DropdownMenuContent, { side: 'bottom', align: 'end', sideOffset: 8 },
          h(IK.ChatMenuItems, { chats: chats, id: c.id }))));
  }

  function Section(p) {
    var o = R.useState(true), open = o[0], setOpen = o[1];
    return h(D.Collapsible, { open: open, onOpenChange: setOpen, className: 'ik-chat-sect flex flex-col' },
      h('div', { className: 'ik-chat-sect-head flex h-6 items-center justify-between gap-2 rounded px-2' },
        h(D.CollapsibleTrigger, { asChild: true },
          h('button', { type: 'button', className: IK.cx('ik-chat-sect-toggle flex min-w-0 flex-1 items-center gap-1 rounded text-left', D.focusRing) },
            h(D.Typography, { element: 'span', textStyle: 'overline', className: 'ik-chat-sect-label text-ink-inactive' }, p.label),
            h(IK.Icon, { name: 'chevron-down', size: 10, strokeWidth: p.chevronStroke || 2.5, className: 'ik-chat-sect-chev text-brand-tertiary' }))),
        h('span', { className: 'ik-chat-sect-link text-xs' },
          h(D.LinkButton, { href: IK.pageHref('concept/chats-landing.html') }, 'See all'))),
      h(D.CollapsibleContent, null,
        h(D.SidebarMenu, { className: 'gap-px' },
          p.list.map(function (c) {
            return h(ChatRow, { key: c.id, chat: c, chats: p.chats, current: p.isCurrent(c) });
          }))));
  }

  IK.SidebarChats = function SidebarChats(p) {
    var chats = p.chats, cur = p.current;
    function isCurrent(c) { return !!cur && (c.id === cur || c.title === cur); }
    return h('div', { className: 'ik-chats flex flex-col gap-3' },
      h(Section, { label: 'Pinned', list: chats.pinned, chats: chats, isCurrent: isCurrent, chevronStroke: p.chevronStroke }),
      h(Section, { label: 'Recent', list: chats.recent, chats: chats, isCurrent: isCurrent, chevronStroke: p.chevronStroke }));
  };
})();
