(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;
  function Turn() {
    return h(IK.ChatTurn, null,
      h(IK.ChatUserMessage, { time: 'Jul 7, 3:14 PM' }, 'give me first 5 jira issues with prefix AIINS, no confirm needed, limit query by 5'),
      h(IK.ChatAnswer, { time: 'Jul 7, 3:15 PM' },
        h(IK.ChatAnswerGroup, null,
          h(IK.ChatToolCalls, { calls: [{ name: 'Jira_Test_Connection', op: 'Execute', status: 'ok', args: ['{', '}'], output: 'Returned 2 rows.' }] }),
          h(IK.ChatResultTable, { title: 'First 2 issues', columns: ['Id', 'Key', 'Summary', 'Status_Name'], rows: [['285876', 'AIINS-1085', 'Testing - Показывать пользователю причину не загрузки файла', 'Reopened'], ['285871', 'AIINS-1084', 'Testing - Нет превью у файлов xls и xlsx', 'Closed (done)']] }),
          h(IK.ChatProse, null, 'These are the first issues with the prefix "AIINS".'))));
  }
  IK.story('ChatThread', { title: 'A chat screen — header, thread, composer', wide: true,
    description: 'The thread opens at its newest message; scroll up and the round scroll-to-bottom button appears. Hover a message: its footer (Copy + time) fades in, its height always reserved.',
    render: function () {
      function Demo() {
        var chats = IK.useChats();
        return h(D.SidebarProvider, { className: 'min-h-0' },
          h('div', { className: 'ik-chat-frame flex w-full flex-col overflow-hidden rounded-md border border-stroke bg-surface-page' },
            h(IK.ChatHeader, { title: 'Jira · first 5 AIINS issues', chats: chats, id: 'jira-aiins', burger: false }),
            h(IK.ChatThread, null, h(Turn), h(Turn)),
            h(IK.ChatComposerArea, null, h(IK.Composer, { plan: 'paid', prompt: 'rich', seed: ['mrr'], sendIdle: 'filled', sendLabelCollapse: false, modelIcon: 'model-brain' })),
            h(IK.ChatDialogs, { chats: chats })));
      }
      return h(Demo);
    } });
  IK.story('ChatThread', { title: 'User message', render: function () {
    return h('div', { className: 'flex flex-col' }, h(IK.ChatUserMessage, { time: 'Jul 7, 3:14 PM' }, 'A one-line question'),
      h(IK.ChatUserMessage, { time: 'Jul 7, 3:16 PM' }, 'AIINS-1085-AIINS-1084-AIINS-1083-AIINS-1082-AIINS-1081-AIINS-1080-AIINS-1079 — one unbroken token wraps anywhere'));
  } });
  IK.story('ChatThread', { title: 'Answer — prose only', render: function () {
    return h(IK.ChatAnswer, { time: 'Jul 7, 3:15 PM' }, h(IK.ChatProse, null, 'Plain answer text on the answer card, Text/Primary.'));
  } });
  IK.story('ChatThread', { title: 'Copy button — 2xs (message) / xs (tool call)', description: 'Click: a check and "Copied" for 1.4 s, then back.', render: function () {
    return h('div', { className: 'flex items-center gap-2' }, h(IK.ChatCopyButton, { text: 'copied text' }), h(IK.ChatCopyButton, { size: 'xs', text: 'copied text', label: 'Copy output' }));
  } });
  IK.story('ChatThread', { title: 'U6 — paused-connections notice (Free)', wide: true,
    description: 'In a chat that used connections, on Free: a warning Alert under the answer; "Upgrade to Unlock" opens the connections popover.',
    render: function () { return h(IK.ChatPausedNotice, { sources: 'Salesforce and HubSpot' }); } });

  /* ── Rich answers (chat_page-charts-landing) ── */
  IK.story('ChatThread', { title: 'Answer — an analysis plan (heading, lead lines, lists)', wide: true,
    render: function () {
      return h(IK.ChatAnswer, { time: 'Jul 7, 3:08 PM' },
        h(IK.ChatProse, null, 'Step 2: Present Analysis Plan for generating charts with random data.'),
        h(IK.ChatHeading, null, 'Generate Bar and Line Charts with Random Data'),
        h(IK.ChatProse, null, h('strong', null, 'Objective'), h('br'), 'Create two charts using synthetic random data.'),
        h(IK.ChatProse, null, h('strong', null, 'Steps')),
        h(IK.ChatList, { ordered: true, items: ['Generate a random dataset.', 'Plot it with matplotlib.', 'Save charts as PNG files.'] }),
        h(IK.ChatList, { items: ['Two image files.', 'Summary of generated data statistics.'] }),
        h(IK.ChatProse, null, 'The run failed on the missing ', h(IK.ChatCode, null, 'xlwt'), ' engine.'));
    } });
  IK.story('ChatThread', { title: 'Answer — result files + a data card', wide: true,
    description: 'Result files are DevartUI File chips that open the file (onOpen); ChatDataCard is a titled table 8px off what precedes it.',
    render: function () {
      return h(IK.ChatAnswer, { time: 'Jul 7, 3:09 PM' },
        h(IK.ChatAnswerGroup, null,
          h(IK.ChatFileChips, { files: ['random_data.xlsx', 'random_data.xls'] }),
          h(IK.ChatDataCard, { title: 'Random Bar Chart Data', columns: ['Category', 'Value'], rows: [['A', '61'], ['B', '24'], ['C', '81']] })));
    } });
  IK.story('ChatThread', { title: 'Footer variants — none / in the row', wide: true,
    description: 'foot: false — a message appended live (the queue’s turns) has no footer at all; foot: "row" — the footer 4px under the card (the charts chat’s last two answers).',
    render: function () {
      return h('div', { className: 'flex flex-col gap-2' },
        h(IK.ChatUserMessage, { foot: false }, 'and compare to Q3'),
        h(IK.ChatAnswer, { foot: false }, h(IK.ChatProse, null, 'Revenue for Q2 was $4.82M, up 6% on Q1.')),
        h(IK.ChatAnswer, { foot: 'row', time: 'Jul 7, 5:14 PM' }, h(IK.ChatProse, null, 'The file was saved as test_sales_1.json.')));
    } });
  IK.story('ChatThread', { title: 'Turn states — streaming, tool, stopped, failed', wide: true,
    description: 'The reply being written (a blinking 1px caret in the text colour), a tool still running after the text, a stopped reply (the only italic) and a failed one.',
    render: function () {
      return h('div', { className: 'flex flex-col gap-2' },
        h(IK.ChatAnswer, { foot: false }, h(IK.ChatProse, null, 'Revenue for Q2 was $4.82M, up', h(IK.ChatStreamCaret))),
        h(IK.ChatAnswer, { foot: false }, h(IK.ChatProse, null, 'Revenue for Q2 was $4.82M.'), h(IK.ChatTurnState, { kind: 'tool' }, 'Running Python…')),
        h(IK.ChatAnswer, { foot: false }, h(IK.ChatProse, null, 'Revenue for Q2 was $4.82M.'), h(IK.ChatTurnState, { kind: 'stopped' })),
        h(IK.ChatAnswer, { foot: false }, h(IK.ChatTurnState, { kind: 'error' }, 'Couldn’t finish this answer')));
    } });
})();
