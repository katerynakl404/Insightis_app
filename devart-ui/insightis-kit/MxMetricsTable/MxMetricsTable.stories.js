(function () {
  var IK = window.InsightisKit, R = window.React, h = IK.h;
  function m(id, prov, name, alias, summary, o) {
    return Object.assign({ kind: 'metric', id: id, prov: prov, name: name, alias: alias, summary: summary, active: true }, o || {});
  }
  var ROWS = [
    { kind: 'group', prov: 'jira', name: 'Jira Software Cloud', connector: 'Jira' },
    m('c1', 'jira', 'MRR growth', '@mrr_growth', 'Month-over-month growth rate of MRR derived from Jira billing data.', { custom: true }),
    m('b1', 'jira', 'Issues created', '@issues_created', 'Number of issues created in the selected period.'),
    m('b2', 'jira', 'Bug count', '@bug_count', 'Number of open bugs at the end of the selected period.', { active: false }),
    { kind: 'conn', id: 'Skyvia Jira', name: 'Skyvia Jira' },
    m('c2', 'jira', 'Jira ticket sync lag', '@jira_sync_lag', 'Average delay between a Jira issue update and its appearance in Insightis.', { custom: true, conn: 'Skyvia Jira' }),
    { kind: 'group', prov: 'azure', name: 'Azure DevOps' },
    { kind: 'empty', prov: 'azure', name: 'Azure DevOps' },
    { kind: 'group', prov: 'github', name: 'GitHub' },
    m('b3', 'github', 'Pull requests opened', '@prs_opened', 'Number of pull requests opened in the selected period.'),
    m('b4', 'github', 'Commits per day', '@commits_per_day', 'Average number of commits pushed per calendar day in the selected period.', { active: false })
  ];

  /* A live table: switches, collapse, ⋮ (Duplicate / Delete) all work. */
  function Live(p) {
    var rs = R.useState(p.rows || ROWS), rows = rs[0], setRows = rs[1];
    var cs = R.useState(p.collapsed || {}), col = cs[0], setCol = cs[1];
    var ss = R.useState(p.selected || null), sel = ss[0], setSel = ss[1];
    var f = IK.mxFilterMetrics(rows, Object.assign({ applied: !!p.filter }, p.filter || {}));
    function patch(id, o) { setRows(rows.map(function (r) { return r.id === id ? Object.assign({}, r, o) : r; })); }
    return h(IK.MxMetricsTable, {
      rows: rows, hidden: f.hidden, collapsed: col, selected: sel,
      onToggleGroup: function (k) { var n = Object.assign({}, col); n[k] = !n[k]; setCol(n); },
      onOpen: function (r) { setSel(r.id); },
      onActive: function (r, on) { patch(r.id, { active: on }); },
      onDuplicate: function (r) {
        var i = rows.indexOf(r), n = rows.slice();
        n.splice(i + 1, 0, Object.assign({}, r, { id: r.id + '-copy', name: r.name + ' (Copy)', custom: true, active: false }));
        setRows(n);
      },
      onDelete: function (r) { setRows(rows.filter(function (x) { return x !== r; })); },
      onAdd: function () {}, onEdit: function () {}
    });
  }

  IK.story('MxMetricsTable', { wide: true, title: 'Library — one card per data source', description: 'Hover a row: ⋮ appears. Hover a header / sub-header: Add Metric appears. Click a row: Selected. ⋮ on a custom metric: Edit · Duplicate · Delete; on a built-in one: Duplicate only.', render: function () {
    return h(Live);
  } });
  IK.story('MxMetricsTable', { wide: true, title: 'Selected row (its details sheet is open)', render: function () {
    return h(Live, { selected: 'b1' });
  } });
  IK.story('MxMetricsTable', { wide: true, title: 'Collapsed group', description: 'Chevron turns −90°, the card closes to its header; the gap to the next card stays.', render: function () {
    return h(Live, { collapsed: { jira: true } });
  } });
  IK.story('MxMetricsTable', { wide: true, title: 'Filtered — "issues"', description: 'Groups with no match lose their header (the "no built-in metrics" row is never filtered, as in the original); a connection sub-header stays while a card follows it.', render: function () {
    return h(Live, { filter: { query: 'issues' } });
  } });
  IK.story('MxMetricsTable', { wide: true, title: 'Filtered — Custom only + Active only', render: function () {
    return h(Live, { filter: { type: 'custom', activeOnly: true } });
  } });
  IK.story('MxMetricsTable', { wide: true, title: 'Free plan — locked switch, Add Metric, menu Edit / Duplicate', description: 'Switch the plan to Free in the review bar: switches dim (hover → upgrade popover), Add Metric and the empty row\'s link carry the padlock and open the upgrade modal, ⋮ Edit / Duplicate trail a padlock. Delete is never gated.', render: function () {
    return h(Live);
  } });
  IK.story('MxMetricsTable', { title: 'Phone (< 768px) — open this page at 375px', description: 'Rows become switch · name · badge · ⋮ (always shown, 36px); alias and definition go; Add Metric folds to "+".', render: function () {
    return h('div', { className: 'w-80' }, h(Live, { rows: ROWS.slice(0, 4) }));
  } });
})();
