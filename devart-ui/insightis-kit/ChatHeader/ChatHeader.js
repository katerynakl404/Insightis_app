/* ChatHeader — the title row of an open chat (".cp-header" / ".cp-title-wrap" / ".cp-title-menu").

     [☰] Jira · first 5 AIINS issues ˅
     ☰   IK.SidebarBurger — the drawer trigger, below 1024px only (it opens the sidebar Sheet)
     ˅   IconButton tertiary 2xs, tooltip "Chat options", held pressed while its menu is open.
         The menu hangs off the chevron (not the title): Pin / Unpin · Rename · Delete — the SAME
         items, dialogs and store as the chat's sidebar row (IK.ChatMenuItems), so pinning from
         either place moves the row and flips the label in both.

   h(IK.ChatHeader, { title, chats, id })
     title   the chat's name (keep it in page state; the store's onRenamed updates it)
     chats   the IK.useChats() store the page also passes to IK.AppShell
     id      the open chat's id
     burger  false → no drawer trigger (default true) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.ChatHeader = function ChatHeader(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var t = R.useState(false), tip = t[0], setTip = t[1];
    return h('header', { className: 'ik-chat-head' },
      p.burger === false ? null : h(IK.SidebarBurger),
      h('div', { className: 'ik-chat-title-wrap' },
        h('h1', { className: 'ik-chat-title' }, p.title),
        p.chats && p.id ? h(D.DropdownMenu, { open: open, onOpenChange: function (v) { setOpen(v); if (v) setTip(false); }, modal: false },
          h(D.Tooltip, { open: tip && !open, onOpenChange: setTip },
            h(D.TooltipTrigger, { asChild: true },
              h(D.DropdownMenuTrigger, { asChild: true },
                h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Chat options' },
                  h(IK.Icon, { name: 'chat-chevron' })))),
            h(D.TooltipContent, { side: 'top' }, 'Chat options')),
          h(D.DropdownMenuContent, { side: 'bottom', align: 'start', sideOffset: 4, className: 'min-w-40' },
            h(IK.ChatMenuItems, { chats: p.chats, id: p.id }))) : null));
  };
})();
