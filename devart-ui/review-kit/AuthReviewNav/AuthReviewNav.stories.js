(function () {
  var RK = window.ReviewKit, h = window.InsightisKit.h;
  /* the storybook sits two folders above the pages — the nav's links still reach them */
  var BASE = '../pages/concept/auth/';

  RK.story('AuthReviewNav', { title: 'A flow step', wide: true,
    description: 'Logo → login · Concept badge (hover for why) · Screen switcher (navigates to the real pages)',
    render: function () { return h(RK.AuthReviewNav, { screen: 'confirmed.html', base: BASE }); } });
  RK.story('AuthReviewNav', { title: 'The illustrations showcase', wide: true,
    description: 'illustrations.html — the System group checked',
    render: function () { return h(RK.AuthReviewNav, { screen: 'illustrations.html', base: BASE }); } });
})();
