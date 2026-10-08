(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Row(p) { return h('div', { className: 'flex items-center gap-3' }, p.children); }
  IK.story('DsFileMark', { title: 'Types — csv (Brand/Tertiary), xls · xlsx (Feedback/Green), other', render: function () {
    return h(Row, null, h(IK.DsFileMark, { type: 'csv' }), h(IK.DsFileMark, { type: 'xls' }), h(IK.DsFileMark, { type: 'xlsx' }), h(IK.DsFileMark, { type: 'json' }));
  } });
  IK.story('DsFileMark', { title: 'Sizes — md 32px (table), sm 24px; always square', render: function () {
    return h(Row, null, h(IK.DsFileMark, { type: 'xlsx' }), h(IK.DsFileMark, { type: 'csv', size: 'sm' }), h(IK.DsFileMark, { type: 'xlsx', size: 'sm', label: 'XLS' }));
  } });
})();
