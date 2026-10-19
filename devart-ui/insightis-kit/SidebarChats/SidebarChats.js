/* SidebarChats — the sidebar's Pinned / Recent chat sections, their rows, the row menu and the two
   dialogs it opens (Sidebar.md → "Chat row states" + "Chat-row menu behaviour"). Rendered by
   IK.AppSidebar; exported separately so a chat page can drive the same flows from its header.

   ── The store ─────────────────────────────────────────────────────────────────────────────
   var chats = IK.useChats({ onRenamed, onDeleted, onPinToggled, initial })
   IK.chatsWith({ id: { status, queue } })   DEFAULT_CHATS with per-chat changes, for `initial` — the
     originals differ per page (chat-landing: Jira has the new dot)
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

   A chat: { id, title, href, status: 'new' | 'loading' | null, queue: { count, active } | null }
     Its menu's first item follows where it is: Unpin in Pinned, Pin in Recent.
     href     pages-root relative ('approved/chat_page-landing.html?chat=…'); default = the chat page
     status   'new' → 6px brand dot + "New activity" (never shown on the current chat — it is open);
              'loading' → spinner + aria-busy + "In progress"
     queue    a D.Counter (sm) for messages queued in THAT chat — active while it is still sending,
              quiet once it has stopped. Status, counter and the row menu share the right edge:
              status and counter step aside while the menu button is shown.

   ── Components ────────────────────────────────────────────────────────────────────────────
   IK.SidebarChats   { chats, current }             both sections (needs a DevartUI SidebarProvider)
   IK.ChatMenuItems  { chats, id }                  the three menu items, for any DropdownMenuContent
   IK.ChatDialogs    { chats }                      Rename chat (md) / Delete chat? (sm)

   Sections: DevartUI SidebarSection — the whole label toggles, the chevron shows under the pointer
   (and stays while closed), "See all" → the Chats library, revealed on hover / focus, always shown
   below 1024px and on touch; hidden on the icon rail.
   Rows: DevartUI SidebarChatItem — 28px, Text/Secondary, State/Hover → State/Pressed, current =
   State/Pressed + Text/Body; the title fades at the edge. Status ('new' dot / 'loading' spinner)
   or the queue Counter (its tooltip = countLabel) at the right; the ⋮ (its tooltip "More actions")
   takes that spot on hover, focus and while open, and is always there below 1024px and on touch.
   Its menu: Pin (Recent) / Unpin (Pinned) · Rename · Delete (danger).
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  function chatPage(title) { return 'approved/chat_page-landing.html?chat=' + encodeURIComponent(title); }

  /* The same list on every page (the original repeats it verbatim on all eight). Every chat has
     its ⋮ menu: the original leaves it off Message queue, the charts chat and Q3 report.xlsx, which
     was never meant — not reproduced (owner's call, 2026-10-19). */
  IK.DEFAULT_CHATS = {
    pinned: [
      { id: 'message-queue', title: 'Message queue', href: 'concept/chat_page-queue.html' },
      { id: 'salesforce-q1', title: 'Salesforce · Q1 revenue commentary' },
      { id: 'hubspot-onboarding', title: 'HubSpot · onboarding cohort' },
      { id: 'churn-deep-dive', title: 'churn.csv · deep-dive' }
    ],
    recent: [
      { id: 'jira-aiins', title: 'Jira · first 5 AIINS issues' },
      { id: 'two-charts', title: 'Generate two charts using random data', href: 'concept/chat_page-charts-landing.html' },
      { id: 'q3-report', title: 'Q3 report.xlsx' }
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
    var label = chats.isPinned(c.id) ? 'Unpin' : 'Pin';
    return h(IK.Fragment, null,
      h(D.DropdownMenuItem, { onSelect: function () { chats.togglePin(c.id); } },
        h(IK.Icon, { name: label === 'Unpin' ? 'unpin' : 'pin', size: 16 }), label),
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
    var c = p.chat, chats = p.chats, q = c.queue;
    /* the new-activity dot is never shown on the open chat */
    var status = c.status === 'loading' ? 'loading' : c.status === 'new' && !p.current ? 'new' : undefined;
    return h(D.SidebarChatItem, {
      href: IK.pageHref(c.href || chatPage(c.title)),
      isActive: !!p.current,
      'aria-current': p.current ? 'page' : undefined,
      onClick: p.current ? function (e) { e.preventDefault(); } : undefined,
      status: status,
      count: q ? q.count : undefined,
      countActive: q ? !!q.active : undefined,
      countLabel: q ? q.count + ' messages queued in this chat — ' + (q.active ? 'still sending' : 'paused, waiting for you') : undefined,
      menu: h(IK.ChatMenuItems, { chats: chats, id: c.id }),
      menuLabel: 'More actions'
    }, c.title);
  }

  function Section(p) {
    return h(D.SidebarSection, {
      label: p.label,
      action: h(D.LinkButton, { href: IK.pageHref('concept/chats-landing.html') }, 'See all')
    }, p.list.map(function (c) {
      return h(ChatRow, { key: c.id, chat: c, chats: p.chats, current: p.isCurrent(c) });
    }));
  }

  IK.SidebarChats = function SidebarChats(p) {
    var chats = p.chats, cur = p.current;
    function isCurrent(c) { return !!cur && (c.id === cur || c.title === cur); }
    return h(IK.Fragment, null,
      h(Section, { label: 'Pinned', list: chats.pinned, chats: chats, isCurrent: isCurrent }),
      h(Section, { label: 'Recent', list: chats.recent, chats: chats, isCurrent: isCurrent }));
  };
})();
