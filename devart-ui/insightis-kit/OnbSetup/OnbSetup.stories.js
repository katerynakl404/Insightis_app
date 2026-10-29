(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  function Roles() {
    var s = R.useState('sales'), v = s[0], set = s[1];
    return h(D.ChoiceGroup, { type: 'single', className: 'sm:grid-cols-2 sm:gap-3', value: v, onValueChange: set, 'aria-label': 'Role' },
      IK.ONB_ROLES.map(function (r) {
        return h(D.ChoiceCard, { key: r[0], value: r[0], indicator: 'radio', title: r[1], description: r[2], icon: h(IK.Icon, { name: r[3] }) });
      }));
  }
  function Goals() {
    var s = R.useState([]), v = s[0], set = s[1];
    return h(D.ChoiceGroup, { type: 'multiple', className: 'sm:grid-cols-2 sm:gap-3', value: v, onValueChange: set, 'aria-label': 'Goals' },
      IK.ONB_GOALS.map(function (g) {
        return h(D.ChoiceCard, { key: g[0], value: g[0], title: g[1], description: g[2], icon: h(IK.Icon, { name: g[3] }) });
      }));
  }
  var noop = function () {};
  IK.story('OnbSetup', { title: 'Step 1 · Role — one answer (radio), then Continue', wide: true,
    render: function () {
      return h(IK.OnbSetup, { progress: IK.onbProgress('conn'), current: 0, title: 'What best describes your role?',
        subtitle: 'We\'ll tailor suggested questions and metrics to the work you do.', onSkip: noop, onContinue: noop, canContinue: true }, h(Roles));
    } });
  IK.story('OnbSetup', { title: 'Step 2 · Goals — several, Continue off until one is picked', wide: true,
    render: function () {
      return h(IK.OnbSetup, { progress: IK.onbProgress('conn'), current: 1, title: 'What do you want Insightis to help with?',
        subtitle: 'Pick all that apply. You can change this later.', onBack: noop, onSkip: noop, onContinue: noop, canContinue: false }, h(Goals));
    } });
})();
