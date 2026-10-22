(function () {
  var IK = window.InsightisKit, R = window.React, h = IK.h;
  function m(id, prov, name, alias, summary, o) {
    return Object.assign({ kind: 'metric', id: id, prov: prov, name: name, alias: alias, summary: summary, active: true, provider: prov === 'jira' ? 'Jira Software Cloud' : 'GitHub' }, o || {});
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
  /* a shared connection and its metrics, as IK.wsMetricRows gives them (Owner: the switch on, disabled) */
  var SHARED = [
    { kind: 'group', prov: 'hubspot', name: 'HubSpot', connector: 'HubSpot', readOnly: true },
    { kind: 'conn', id: 'ws-a3f9c1', name: 'Campaigns HubSpot', ownerMark: true, shared: { by: 'Olena Petrenko', names: ['Marketing'] } },
    m('s1', 'hubspot', 'Deals won', '@deals_won', 'Closed-won deals in the period', { readOnly: true, switchOn: true, by: 'Olena Petrenko', provider: 'HubSpot', wsNames: 'Marketing' }),
    { kind: 'conn', id: 'ws-7b21e0', name: 'Website analytics', ownerMark: true, muted: true, shared: { by: 'Mark Shevchenko', names: ['Finance'] } },
    m('s2', 'hubspot', 'Sessions', '@sessions', 'Visits to the website', { readOnly: true, switchOn: true, muted: true, by: 'Mark Shevchenko', provider: 'Google Analytics' })
  ];

  /* A live list: switches, collapse, the star, ⋮ (Favorites · Edit · Duplicate · Delete) all work. */
  function Live(p) {
    var rs = R.useState(p.rows || ROWS), rows = rs[0], setRows = rs[1];
    var cs = R.useState(p.collapsed || {}), col = cs[0], setCol = cs[1];
    var ss = R.useState(p.selected || null), sel = ss[0], setSel = ss[1];
    var fs = R.useState(p.favorites || {}), favs = fs[0], setFavs = fs[1];
    var f = IK.mxFilterMetrics(rows, Object.assign({ applied: !!p.filter }, p.filter || {}));
    if (p.favOnly) f = IK.mxFilterFavorites(rows, favs, f);
    function patch(id, o) { setRows(rows.map(function (r) { return r.id === id ? Object.assign({}, r, o) : r; })); }
    return h(IK.MxMetricList, {
      rows: rows, hidden: f.hidden, collapsed: col, selected: sel, favorites: favs,
      onFavorite: function (r, on) { var n = Object.assign({}, favs); if (on) n[r.id] = true; else delete n[r.id]; setFavs(n); },
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

  IK.story('MxMetricList', { wide: true, title: 'Library as rows — no favourites yet', description: 'Each metric a DevartUI Card row: switch · name and alias over the definition · badge · star · ⋮. Hover a row: the star and ⋮ appear. Hover a heading: Add Metric. Click a star: it pops as it fills; click it again: it dips and empties.', render: function () {
    return h(Live);
  } });
  IK.story('MxMetricList', { wide: true, title: 'With favourites', description: 'A favourite stays where it is, its star filled — no section of them on top.', render: function () {
    return h(Live, { favorites: { c1: true, b3: true } });
  } });
  IK.story('MxMetricList', { wide: true, title: 'Favorites only (the page’s Favorites chip)', description: 'Only the favourites, in their groups and under their connections.', render: function () {
    return h(Live, { favorites: { c1: true, b3: true }, favOnly: true });
  } });
  IK.story('MxMetricList', { wide: true, title: 'Selected row (its details sheet is open)', render: function () {
    return h(Live, { selected: 'b1' });
  } });
  IK.story('MxMetricList', { wide: true, title: 'Collapsed group', render: function () {
    return h(Live, { collapsed: { jira: true } });
  } });
  IK.story('MxMetricList', { wide: true, title: 'Filtered — "issues"', render: function () {
    return h(Live, { filter: { query: 'issues' } });
  } });
  IK.story('MxMetricList', { wide: true, title: 'Shared — a connection shared with you, one unavailable', description: 'Shared rows: the switch on and disabled (only the owner turns it off), no ⋮ (its room kept), the star still works. Unavailable: the warning after the name.', render: function () {
    return h(Live, { rows: SHARED, favorites: { s1: true } });
  } });
  IK.story('MxMetricList', { wide: true, title: 'Free plan — locked switch, Add Metric, ⋮ Edit / Duplicate', description: 'Switch the plan to Free in the review bar. The star is never gated.', render: function () {
    return h(Live, { favorites: { c1: true } });
  } });
  IK.story('MxMetricList', { title: 'Phone (< 768px) — open this page at 375px', description: 'The alias goes, the definition keeps two lines; the star and ⋮ always show; Add Metric folds to "+".', render: function () {
    return h('div', { className: 'w-80' }, h(Live, { rows: ROWS.slice(0, 5), favorites: { c1: true } }));
  } });
})();
