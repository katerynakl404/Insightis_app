/* ============================================================================================
   REVIEW KIT — core
   The prototype's own chrome: what a reviewer uses to see each state of a page. It does not
   exist in the product. Loaded after insightis-kit.js — it composes the product kit (h, cx,
   Icon, Logo, the theme + plan stores) and the product kit never refers back to it
   (tools/check.mjs, rule 4).

   window.ReviewKit (alias RK in page code) holds:
     ReviewBar, AuthReviewNav, AuthScreenSwitch — one per folder next to this one
     useQueryState  — a review state seeded from the URL, so a link opens the page in it
     story          — IK.story tagged kit: 'review', so the storybook lists these apart
   ============================================================================================ */
(function () {
  'use strict';
  var IK = window.InsightisKit, R = window.React;
  if (!IK || !IK.h) throw new Error('rk-core.js: load insightis-kit.js first');
  var RK = window.ReviewKit = window.ReviewKit || {};

  RK.story = function (component, s) { IK.story(component, Object.assign({ kit: 'review' }, s)); };

  /* Query-string state: ?state=empty&plan=free — lets a link open a page in a given state. */
  RK.useQueryState = function (key, fallback) {
    var init = new URLSearchParams(location.search).get(key) || fallback;
    var s = R.useState(init), v = s[0], set = s[1];
    var update = R.useCallback(function (next) {
      set(next);
      var u = new URL(location.href);
      if (next === fallback) u.searchParams.delete(key); else u.searchParams.set(key, next);
      history.replaceState(null, '', u);
    }, [key, fallback]);
    return [v, update];
  };
})();
