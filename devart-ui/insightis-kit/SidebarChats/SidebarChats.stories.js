(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  function Col(p) { return h('div', { className: 'w-60 rounded-md border border-stroke bg-surface-card px-2 py-3' }, p.children); }

  function Demo(p) {
    var chats = IK.useChats({ initial: p.initial || IK.chatsWith({ 'jira-aiins': { status: 'new' } }) });
    return h(IK.Fragment, null,
      h(Col, null, h(IK.SidebarChats, { chats: chats, current: p.current })),
      h(IK.ChatDialogs, { chats: chats }));
  }

  IK.story('SidebarChats', { title: 'Default — Pinned / Recent', description: 'Hover a section head: chevron + "See all". Hover a row: ⋮ (Pin / Unpin · Rename · Delete). Recent "Jira" carries the new-activity dot.',
    render: function () { return h(Demo); } });
  IK.story('SidebarChats', { title: 'Current chat', description: 'State/Pressed + Text/Body; its dot is gone — it is open.',
    render: function () { return h(Demo, { current: 'jira-aiins' }); } });
  IK.story('SidebarChats', { title: 'Statuses — loading, new, queue running / stopped',
    render: function () {
      return h(Demo, { initial: {
        pinned: [
          { id: 'a', title: 'Revenue by region, monthly', status: 'loading' },
          { id: 'b', title: 'Jira · first 5 AIINS issues', status: 'new' }
        ],
        recent: [
          { id: 'c', title: 'Pipeline review', queue: { count: 2, active: true } },
          { id: 'd', title: 'Churn by cohort', queue: { count: 2, active: false } },
          { id: 'e', title: 'No menu on this row', menu: false }
        ] } });
    } });
  IK.story('SidebarChats', { title: 'Empty Pinned', description: 'Pin a Recent chat to fill it.',
    render: function () { return h(Demo, { initial: { pinned: [], recent: IK.DEFAULT_CHATS.recent } }); } });

  IK.story('SidebarChats', { title: 'Dialogs — Rename chat / Delete chat?', description: 'The same dialogs a chat page header opens through the shared store.',
    render: function () {
      function Dlg() {
        var chats = IK.useChats();
        return h('div', { className: 'flex gap-2' },
          h(D.Button, { variant: 'secondary', size: 'sm', onClick: function () { chats.requestRename('salesforce-q1'); } }, 'Rename…'),
          h(D.Button, { variant: 'destructiveOutline', size: 'sm', onClick: function () { chats.requestDelete('salesforce-q1'); } }, 'Delete…'),
          h(D.DropdownMenu, null,
            h(D.DropdownMenuTrigger, { asChild: true }, h(D.Button, { variant: 'tertiary', size: 'sm', rightSlot: h(IK.Icon, { name: 'chevron-down' }) }, 'Chat options')),
            h(D.DropdownMenuContent, { align: 'start' }, h(IK.ChatMenuItems, { chats: chats, id: 'salesforce-q1' }))),
          h(IK.ChatDialogs, { chats: chats }));
      }
      return h(Dlg);
    } });
})();
