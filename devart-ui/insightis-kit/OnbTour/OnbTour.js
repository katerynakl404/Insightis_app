/* OnbTour — the onboarding's last steps, explained over the REAL interface: DevartUI Tour
   (Spotlight + Coachmark + AnnotationGroup) with the brief's copy, laid over the Metrics page
   (step 4) and the new chat (step 5) — those pages render it in onboarding mode (?onb=…).

     metrics  the connected source's group, first and open: the frame takes its header and its
              first 4 metric rows (the switches inside stay live); the tip under it (29rem) says
              why metrics matter and how many built-in metrics the source brought — or, with none
              (MySQL), to add one with Add Metric.
     chat     the whole composer: the tip above it, two annotations under it with arrows to
              Attach + Connections and to the model (≤ 640px: listed in the bottom sheet).
   Numbering runs on from the setup: Step 4 of 5 / 5 of 5 with a connector, Step 4 of 4 without.
   The first tour step has no Back (the brief: what step 3 connected is not undone); Back on Chat
   returns to Metrics. Skip / Esc / Start Chatting end the tour.

   h(IK.OnbTour, {
     step: 'metrics' | 'chat',
     path: 'conn' | 'files' | 'skip',
     source,                         // an IK.ONB_SOURCES entry (conn), for its name + built-in count
     group: 'hubspot',               // MxMetricsTable prov of the source's group (metrics)
     metricCount,                    // rows the group shows — the frame stops at the 4th
     onStep: function (id) {},       // go to the page of step id ('metrics' | 'chat')
     onClose: function (reason) {},  // 'finish' | 'skip' | 'escape'
     boundary: '.ik-shell'           // the app frame: the review strip above stays uncovered
   }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  function b(t) { return h('b', null, t); }

  IK.OnbTour = function OnbTour(p) {
    var path = p.path || 'skip', src = p.source, name = src ? src.name : '';
    var built = src ? IK.onbBuiltin(src.id) : null, total = built ? built.total : 0;
    var g = p.group || (src && src.id) || '';
    var last = Math.max(0, Math.min(3, (p.metricCount || 0) - 1));
    var metrics = {
      id: 'metrics', label: 'Metrics', width: 'lg', side: ['bottom', 'top', 'right', 'left'],
      icon: h(IK.Icon, { name: 'onb-chart-pie' }),
      title: 'Metrics keep every answer accurate',
      target: ['[data-tour="mx-group-' + g + '"]', '[data-tour="mx-row-' + g + '-' + last + '"]', '[data-tour="mx-empty-' + g + '"]'],
      content: h(IK.Fragment, null,
        h('p', null, 'Metrics are the most important part of Insightis. They tell the AI exactly how each number is calculated, so it answers correctly and the same way every time instead of inventing its own version. Answers based on metrics are ', b('30\u201340% more accurate'), '.'),
        total
          ? h('p', null, b(total + ' built-in ' + name + ' metrics'), ' are ready. Switch them on or off, or add your own with ', b('Add Metric'), '.')
          : h('p', null, name + ' has no built-in metrics yet, so add your own with ', b('Add Metric'), '.'))
    };
    var chat = {
      id: 'chat', label: 'Chat', width: 'md', side: ['top', 'bottom', 'right', 'left'],
      icon: h(IK.Icon, { name: 'onb-message-square' }),
      title: 'Start here: ask your first question',
      target: '[data-tour="composer"]',
      content: h('p', null, 'This is your chat. Type a question in plain language and press ', b('Enter'), '. Insightis picks the right data and metrics, then answers with numbers, tables and charts.'),
      annotations: [
        { target: ['[data-tour="cmp-attach"]', '[data-tour="cmp-connections"]'], icon: h(IK.Icon, { name: 'onb-workflow' }),
          text: path === 'conn' ? h(IK.Fragment, null, 'Choose a connector (', b(name), ' is on) or attach a file')
            : path === 'files' ? 'Attach your file or choose a connector' : 'Choose a connector or attach a file' },
        { target: '[data-tour="cmp-model"]', icon: h(IK.Icon, { name: 'model' }), text: 'Pick a model and how deeply it thinks' }
      ]
    };
    var steps = path === 'conn' ? [metrics, chat] : [chat];
    var i = Math.max(0, steps.map(function (s) { return s.id; }).indexOf(p.step));
    return h(D.Tour, {
      open: p.open !== false, steps: steps, step: i, boundary: p.boundary || '.ik-shell',
      progress: { steps: IK.onbProgress(path), offset: 3 },
      labels: { finish: 'Start Chatting' },
      onStepChange: function (n) { if (p.onStep) p.onStep(steps[n].id); },
      onClose: p.onClose
    });
  };
})();
