(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.story('ChatHeader', { title: 'Open chat — title + chat menu', wide: true,
    description: 'The chevron (tooltip "Chat options") opens Pin · Rename · Delete — the same items and dialogs as the chat sidebar row. The store onRenamed keeps the title in step.',
    render: function () {
      function Demo() {
        var t = R.useState('Jira · first 5 AIINS issues');
        var chats = IK.useChats({ onRenamed: function (c, n) { t[1](n); } });
        return h(D.SidebarProvider, { className: 'min-h-0' },
          h('div', { className: 'flex w-full flex-col rounded-md border border-stroke bg-surface-page' },
            h(IK.ChatHeader, { title: t[0], chats: chats, id: 'jira-aiins', burger: false }),
            h(IK.ChatDialogs, { chats: chats })));
      }
      return h(Demo);
    } });
  IK.story('ChatHeader', { title: 'Title only (a chat the store does not know)', render: function () {
    return h(D.SidebarProvider, { className: 'min-h-0' }, h(IK.ChatHeader, { title: 'Untitled chat', burger: false }));
  } });
})();
