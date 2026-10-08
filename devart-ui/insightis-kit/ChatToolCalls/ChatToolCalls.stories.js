(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  var CALLS = [
    { name: 'Jira_Test_Connection', op: 'Objects', status: 'ok', args: ['{', '  "responseFormat": "Markdown"', '}'], output: '| fullName | name | queryable |\n| --- | --- | --- |\n| AIINS_Issues | AIINS_Issues | true |', defaultOpen: true },
    { name: 'Jira_Test_Connection', op: 'Execute', status: 'error', args: ['{', '  "query": "SELECT * FROM AIINS_Issues LIMIT 5"', '}'], output: 'Error: unknown column selection — retry with the resolved object name.' },
    { name: 'Jira_Test_Connection', op: 'Execute', status: 'ok', args: ['{', '  "query": "SELECT Id, Key FROM AIINS_Issues LIMIT 5"', '}'], output: 'Returned 5 rows.' }
  ];
  function Plate(p) { return h('div', { className: 'ik-answer' }, p.children); }
  IK.story('ChatToolCalls', { title: 'Collapsed', description: 'Text/Secondary head, chevron beside the label pointing right; hover darkens text and glyphs only.',
    render: function () { return h(Plate, null, h(IK.ChatToolCalls, { calls: CALLS })); } });
  IK.story('ChatToolCalls', { title: 'Open — rows, one expanded', wide: true,
    description: 'Spine between the status glyphs; the first call open: Arguments (line numbers + Copy) and Output (Badge Done + Copy).',
    render: function () { return h(Plate, null, h(IK.ChatToolCalls, { calls: CALLS, defaultOpen: true })); } });
  IK.story('ChatToolCalls', { title: 'Open — an error call expanded', wide: true,
    description: 'Badge Error; the output sits on a red-tinted ground.',
    render: function () { return h(Plate, null, h(IK.ChatToolCalls, { defaultOpen: true, calls: [Object.assign({}, CALLS[1], { defaultOpen: true })] })); } });
})();
