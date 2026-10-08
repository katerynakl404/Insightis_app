(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.story('PlanFeatures', { title: 'The catalogue — IK.PLAN_FEATURES', wide: true,
    description: 'One entry per gated feature. The popover shows the name, the plan and the first two benefits; the modal the title, the lead and every benefit.',
    render: function () {
      var keys = Object.keys(IK.PLAN_FEATURES);
      return h(D.Table, { layout: 'fixed' },
        h(D.TableHeader, null,
          h(D.TableRow, null,
            h(D.TableHead, { className: 'w-36' }, 'Key'),
            h(D.TableHead, { className: 'w-24' }, 'Plan'),
            h(D.TableHead, { className: 'w-40' }, 'Popover head'),
            h(D.TableHead, { className: 'w-48' }, 'Modal title'),
            h(D.TableHead, null, 'Benefits'))),
        h(D.TableBody, null,
          keys.map(function (k) {
            var f = IK.PLAN_FEATURES[k];
            return h(D.TableRow, { key: k },
              h(D.TableCell, null, h('code', null, k)),
              h(D.TableCell, null, h(IK.PlanLock, { plan: f.plan })),
              h(D.TableCell, null, f.name),
              h(D.TableCell, null, f.title),
              h(D.TableCell, null, h(IK.FeatList, { items: f.benefits })));
          })));
    } });
})();
