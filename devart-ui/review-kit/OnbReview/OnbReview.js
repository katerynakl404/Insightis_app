/* OnbReview — the onboarding's review switches, for the three pages it runs on: the setup screens
   (concept/onboarding.html) and the tour over Metrics and Chat (approved/metrics-landing.html,
   approved/chat-landing.html in onboarding mode). Not product: a reviewer jumps to any step of
   the flow and flips its branch from the ReviewBar, which the tour never covers.

   RK.onbQuery()              { step, path, source, role } from the URL (defaults: conn · hubspot)
   RK.onboardingControls({ here: 'setup' | 'metrics' | 'chat', step })
     → ReviewBar controls — only those that change the screen they are on:
       Onboarding   everywhere: Role · Goals · Data source · Metrics · Chat (+ Off on the app pages);
                    a step on another page navigates there (IK.onbHref), branch and source travel along
       Path         chat only: Connector · Files · Skipped — the branch step 3 took (step count,
                    the annotation, what the composer offers); Metrics exists only with a connector
       Source       metrics, and chat on the connector branch: HubSpot · Stripe · MySQL (no built-in
                    metrics) — the source just connected                                           */
(function () {
  'use strict';
  var IK = window.InsightisKit, RK = window.ReviewKit;

  var SOURCES = [{ value: 'hubspot', label: 'HubSpot' }, { value: 'stripe', label: 'Stripe' }, { value: 'mysql', label: 'MySQL' }];

  /* the source step 3 actually connected joins the three samples, so the switch always shows it */
  function withCurrent(id) {
    if (SOURCES.some(function (s) { return s.value === id; })) return SOURCES;
    var s = IK.onbSource(id);
    return s ? [{ value: id, label: s.name }].concat(SOURCES) : SOURCES;
  }

  RK.onbQuery = function () {
    var q = new URLSearchParams(location.search);
    return {
      step: q.get('onb') || q.get('step') || '',
      path: q.get('path') || 'conn',
      source: q.get('source') || 'hubspot',
      role: q.get('role') || IK.onboarding.get().role || ''
    };
  };

  RK.onboardingControls = function (o) {
    var q = RK.onbQuery(), here = o.here, step = o.step || q.step;
    function go(nextStep, patch) {
      var n = Object.assign({}, q, patch || {});
      if (nextStep === 'metrics' && n.path !== 'conn') nextStep = 'chat';
      if (nextStep === 'off') {
        var u = new URL(location.href);
        ['onb', 'path', 'source', 'role'].forEach(function (k) { u.searchParams.delete(k); });
        location.assign(u.href); return;
      }
      location.assign(IK.onbHref(nextStep, n));
    }
    var steps = [{ value: 'role', label: 'Role' }, { value: 'goals', label: 'Goals' }, { value: 'source', label: 'Data source' },
                 { value: 'metrics', label: 'Metrics', disabled: q.path !== 'conn' }, { value: 'chat', label: 'Chat' }];
    if (here !== 'setup') steps.push({ value: 'off', label: 'Off' });
    var tourStep = here === 'setup' ? step : (step === 'done' ? 'off' : step || 'off');
    return [
      { label: 'Onboarding', showLabel: true, value: tourStep, options: steps, onChange: function (v) { if (v !== tourStep) go(v); } },
      here === 'chat' ? { label: 'Path', showLabel: true, value: q.path,
        options: [{ value: 'conn', label: 'Connector' }, { value: 'files', label: 'Files' }, { value: 'skip', label: 'Skipped' }],
        onChange: function (v) { go(step === 'done' ? 'done' : 'chat', { path: v }); } } : null,
      here !== 'setup' && q.path === 'conn' ? { label: 'Source', showLabel: true, value: q.source, options: withCurrent(q.source),
        onChange: function (v) { go(step === 'done' ? 'done' : step || 'metrics', { source: v }); } } : null
    ];
  };
})();
