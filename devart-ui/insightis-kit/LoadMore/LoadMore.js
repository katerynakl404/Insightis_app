/* LoadMore — "Load more N" under a list that shows 20 at a time: Files, the Workspaces list, a workspace's Files and
   Members (one component, 2026-10-22 — it was written four times). DevartUI Button secondary sm, the count after the
   label in the inactive ink, centred 4px under the list; the label is the Files original's.
     h(IK.LoadMore, { left, onClick })   nothing while left is 0 */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.LoadMore = function LoadMore(p) {
    if (!(p.left > 0)) return null;
    return h('div', { className: 'mt-1 flex justify-center' },
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: p.onClick },
        'Load more ', h('span', { className: 'font-medium tabular-nums text-ink-inactive' }, p.left)));
  };
})();
