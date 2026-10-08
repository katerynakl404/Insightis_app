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
  var OPTIONS = [{ id: 'Skyvia Jira', label: 'Skyvia Jira (Jira Software Cloud)' }];
  function Demo(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var s = R.useState(null), saved = s[0], setSaved = s[1];
    return h('div', { className: 'flex flex-col items-start gap-2' },
      h(D.Button, { variant: 'secondary', size: 'sm', onClick: function () { setOpen(true); } }, p.label),
      saved ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'onSave ' + JSON.stringify(saved)) : null,
      h(IK.MxMetricDialog, { open: open, onOpenChange: setOpen, mode: p.mode, initial: p.initial, options: OPTIONS, findDuplicates: find, onSave: setSaved }),
      p.toaster ? h(D.Toaster) : null);   /* one Toaster for the whole storybook page */
  }
  IK.story('MxMetricDialog', { title: 'Create — empty', description: 'Save with no name focuses Name. Try Name "MRR growth" (taken) or alias "bug_count": the field turns red, takes focus with its text selected, and an error toast names the value. Typing clears that field\'s mark.', render: function () {
    return h(Demo, { label: 'Create metric', mode: 'create', toaster: true });
  } });
  IK.story('MxMetricDialog', { title: 'Edit — prefilled, linked to a connection', render: function () {
    return h(Demo, { label: 'Edit metric', mode: 'edit', initial: { name: 'Jira ticket sync lag', alias: 'jira_sync_lag', def: 'Average delay between a Jira issue update and its appearance in Insightis.', connector: 'Skyvia Jira' } });
  } });
  IK.story('MxMetricDialog', { title: 'Link to → Connection', description: 'Open, then pick Connection: the picker label becomes Connection and its placeholder "Select a connection…".', render: function () {
    return h(Demo, { label: 'Create metric (try Link to)', mode: 'create' });
  } });
})();
