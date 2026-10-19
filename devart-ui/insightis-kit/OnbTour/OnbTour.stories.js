(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* The tour lays itself over the whole window, so each story starts it from a button over a
     real kit piece; Skip, Esc or the last button ends it. */
  function Launch(p) {
    var o = R.useState(false), open = o[0], setOpen = o[1];
    var s = R.useState(p.step), step = s[0], setStep = s[1];
    return h('div', { className: 'flex flex-col items-start gap-4' },
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { setStep(p.step); setOpen(true); } }, 'Start the Tour Step'),
      p.children,
      h(IK.OnbTour, {
        open: open, step: step, path: p.path, source: p.source, group: p.group, metricCount: p.metricCount, boundary: null,
        onStep: setStep, onClose: function () { setOpen(false); }
      }));
  }

  function metricRows(src) {
    var b = IK.onbBuiltin(src.id), rows = [{ kind: 'group', prov: src.id, name: src.name, connector: src.name }];
    if (!b) return rows.concat([{ kind: 'empty', prov: src.id, name: src.name }]);
    return rows.concat(b.metrics.slice(0, 6).map(function (m, i) {
      return { kind: 'metric', id: 's' + i, prov: src.id, name: m.name, alias: m.alias, summary: m.desc, active: true };
    }));
  }

  IK.story('OnbTour', { title: 'Step 4 · Metrics — a source with built-in metrics (HubSpot)', wide: true,
    description: 'The frame takes the group header and its first 4 rows (the switches stay live); the tip sits under it at 29rem. Step 4 of 5.',
    render: function () {
      var src = IK.onbSource('hubspot');
      return h(Launch, { step: 'metrics', path: 'conn', source: src, group: src.id, metricCount: 6 },
        h('div', { className: 'w-full' }, h(IK.MxMetricsTable, { rows: metricRows(src) })));
    } });
  IK.story('OnbTour', { title: 'Step 4 · Metrics — no built-in metrics (MySQL)', wide: true,
    render: function () {
      var src = IK.onbSource('mysql');
      return h(Launch, { step: 'metrics', path: 'conn', source: src, group: src.id, metricCount: 0 },
        h('div', { className: 'w-full' }, h(IK.MxMetricsTable, { rows: metricRows(src) })));
    } });
  IK.story('OnbTour', { title: 'Step 5 · Chat — the composer, two annotations (connector path)', wide: true,
    description: 'The tip above the composer, annotations with arrows to Attach + Connections and to the model. ≤ 640px: a bottom sheet listing them.',
    render: function () {
      return h(Launch, { step: 'chat', path: 'conn', source: IK.onbSource('hubspot') },
        h('div', { className: 'w-full', style: { maxWidth: '45rem' } }, h(IK.Composer, { connections: [{ logo: 'HubSpot', name: 'HubSpot', on: true }] })));
    } });
  IK.story('OnbTour', { title: 'Step 4 of 4 · Chat — files, or no source', wide: true,
    render: function () {
      return h(Launch, { step: 'chat', path: 'files' },
        h('div', { className: 'w-full', style: { maxWidth: '45rem' } }, h(IK.Composer, { connections: [], files: ['sales_pipeline_q3_2026.xlsx'] })));
    } });
})();
