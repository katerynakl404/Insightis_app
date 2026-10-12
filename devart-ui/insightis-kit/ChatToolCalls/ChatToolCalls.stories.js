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
  var CODE = ['import numpy as np', '', '# Generate random data for bar chart', 'values = np.random.randint(10, 100, size=5)', "print('Saved', len(values))"].join('\n');
  IK.story('ChatToolCalls', { title: 'Code run — collapsed', description: 'IK.ChatCodeRun: the task title with its chevron beside it (Text/Secondary, hover darkens text and glyphs only).',
    render: function () { return h(Plate, null, h(IK.ChatCodeRun, { title: 'Generate random bar and line charts', code: CODE, output: 'Saved 5' })); } });
  IK.story('ChatToolCalls', { title: 'Code run — open', wide: true,
    description: 'Two peer boxes: the source (Python mark, Copy; line numbers in a 44px gutter, syntax colours, scrolls past 14rem) and its Output (Badge Done + Copy).',
    render: function () { return h(Plate, null, h(IK.ChatCodeRun, { defaultOpen: true, title: 'Generate random bar and line charts', code: CODE, output: 'Saved random_bar_chart.png\nSaved random_line_chart.png' })); } });
  IK.story('ChatToolCalls', { title: 'Code run — failed', wide: true,
    description: 'A red alert glyph leads the title; the Output is Badge Error on a red-tinted ground.',
    render: function () { return h(Plate, null, h(IK.ChatCodeRun, { defaultOpen: true, status: 'error', title: 'Generate CSV, XLS, XLSX with random data', code: CODE, output: "ImportError: Missing optional dependency 'xlwt'. Install xlwt >= 1.3.0 for Excel support." })); } });
})();
