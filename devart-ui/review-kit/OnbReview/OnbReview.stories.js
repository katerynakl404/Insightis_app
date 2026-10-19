(function () {
  var IK = window.InsightisKit, RK = window.ReviewKit, h = IK.h;
  RK.story('OnbReview', { title: 'ReviewBar — onboarding switches on an app page (Metrics, tour step)', wide: true,
    description: 'Onboarding jumps to any step (another page navigates there); Path and Source flip the branch. Off leaves onboarding mode.',
    render: function () { return h(RK.ReviewBar, { title: 'Metrics', status: 'approved', size: 'sm', theme: false, controls: RK.onboardingControls({ here: 'metrics', step: 'metrics' }) }); } });
})();
