(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var TAKEN = [{ name: 'MRR growth', alias: '@mrr_growth' }, { name: 'Bug count', alias: '@bug_count' }];
  function find(name, alias) {
    var hit = { name: null, alias: null };
    TAKEN.forEach(function (t) {
      if (name && t.name.toLowerCase() === name.trim().toLowerCase()) hit.name = t.name;
      if (alias && t.alias.replace(/^@/, '') === alias.trim().toLowerCase().replace(/^@/, '')) hit.alias = t.alias;
    });
    return hit;
  }
  var OPTIONS = [{ id: 'Skyvia Jira', label: 'Skyvia Jira (Jira Software Cloud)' }, { id: 'Sales HubSpot', label: 'Sales HubSpot (HubSpot CRM)' }];
  var SOURCES = [{ id: 'Jira Software Cloud', label: 'Jira Software Cloud' }, { id: 'Azure DevOps', label: 'Azure DevOps' }, { id: 'GitHub', label: 'GitHub' }];
  function Demo(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var s = R.useState(null), saved = s[0], setSaved = s[1];
    return h('div', { className: 'flex flex-col items-start gap-2' },
      h(D.Button, { variant: 'secondary', size: 'sm', onClick: function () { setOpen(true); } }, p.label),
      saved ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'onSave ' + JSON.stringify(saved)) : null,
      h(IK.MxMetricDialog, { open: open, onOpenChange: setOpen, mode: p.mode, initial: p.initial, target: p.target, connectionOnly: p.connectionOnly,
        options: p.options || OPTIONS, sources: SOURCES, findDuplicates: find, onSave: setSaved }),
      p.toaster ? h(D.Toaster) : null);   /* one Toaster for the whole storybook page */
  }
  IK.story('MxMetricDialog', { title: 'Create — empty', description: 'Save with no name focuses Name. Try Name "MRR growth" (taken) or alias "bug_count": the field turns red, takes focus with its text selected, and an error toast names the value. Typing clears that field\'s mark', render: function () {
    return h(Demo, { label: 'Create metric', mode: 'create', toaster: true });
  } });
  IK.story('MxMetricDialog', { title: 'Create for a data source', description: 'A data source\'s Add Metric: the title names it, no Link to and no picker — onSave carries it as connector, link "datasource"', render: function () {
    return h(Demo, { label: 'Create metric for GitHub', mode: 'create', target: { kind: 'datasource', name: 'GitHub' } });
  } });
  IK.story('MxMetricDialog', { title: 'Create for a connection', description: 'A connection\'s Add Metric (Metrics, Data Sources, a workspace): the title names it, no Link to and no picker', render: function () {
    return h(Demo, { label: 'Create metric for Skyvia Jira', mode: 'create', target: { kind: 'connection', name: 'Skyvia Jira' } });
  } });
  IK.story('MxMetricDialog', { title: 'Edit — linked to a connection', description: 'Opens on Connection with its connection; Data Source lists the sources — each side keeps its own pick, and another one moves the metric', render: function () {
    return h(Demo, { label: 'Edit metric', mode: 'edit', initial: { name: 'Jira ticket sync lag', alias: 'jira_sync_lag', def: 'Average delay between a Jira issue update and its appearance in Insightis.', connector: 'Skyvia Jira', link: 'connection' } });
  } });
  IK.story('MxMetricDialog', { title: 'Edit — linked to a data source', description: 'Opens on Data Source with its source', render: function () {
    return h(Demo, { label: 'Edit metric', mode: 'edit', initial: { name: 'Open bugs by team', alias: 'open_bugs_team', def: 'Open bugs grouped by the team that owns them.', connector: 'Jira Software Cloud', link: 'datasource' } });
  } });
  IK.story('MxMetricDialog', { title: 'Shared workspace — Create Metric', description: 'connectionOnly: no Link to — a workspace shares connections, never a data source — the Connection picker alone, the workspace\'s connections. With none added yet its list says "No connections added to this workspace". Edit in a workspace is the same Edit as everywhere', render: function () {
    return h('div', { className: 'flex flex-wrap gap-4' },
      h(Demo, { label: 'Create metric', mode: 'create', connectionOnly: true }),
      h(Demo, { label: 'Create metric (no connections yet)', mode: 'create', connectionOnly: true, options: [] }));
  } });
  IK.story('MxMetricDialog', { title: 'Link to → Connection', description: 'Open, then pick Connection: the picker label becomes Connection, its placeholder "Select a connection…" and its list the connections', render: function () {
    return h(Demo, { label: 'Create metric (try Link to)', mode: 'create' });
  } });
})();
