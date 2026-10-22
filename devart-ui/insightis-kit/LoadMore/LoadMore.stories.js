(function () {
  var IK = window.InsightisKit, R = window.React, h = IK.h;
  IK.story('LoadMore', { title: 'Under a list of 20 — the rest in the count; gone when nothing is left', render: function () {
    var s = R.useState(37), left = s[0], set = s[1];
    return h(IK.LoadMore, { left: left, onClick: function () { set(Math.max(0, left - 20)); } });
  } });
})();
