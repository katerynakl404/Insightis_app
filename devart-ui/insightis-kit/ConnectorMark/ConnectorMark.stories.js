(function () {
  var IK = window.InsightisKit, h = IK.h;
  var NAMES = ['PostgreSQL', 'Salesforce', 'HubSpot', 'Snowflake', 'Stripe', 'Amplitude', 'Jira', 'GitHub', 'Google Analytics', 'SurveyMonkey', 'Shopify', 'Intercom', 'Meta Ads', 'REST API', 'Azure DevOps', 'Unknown Source'];
  function Row(p) {
    return h('div', { className: 'flex flex-wrap items-center gap-4' }, NAMES.map(function (n) {
      return h('div', { key: n, className: 'flex flex-col items-center gap-1' },
        h(IK.ConnectorMark, { connector: n, size: p.size, label: n + ' logo' }),
        h('span', { className: 'text-xxs text-ink-secondary' }, n + (IK.connectorHasDsMark(n) ? ' · DS' : IK.connectorAsset(n) ? ' · original' : n === 'Azure DevOps' ? ' · original monogram' : ' · tile')));
    }));
  }
  ['xs', 'sm', 'md', 'lg'].forEach(function (s) {
    IK.story('ConnectorMark', { title: 'Size ' + s, wide: true,
      description: 'DS = DevartUI mark · original = the prototype\'s own logo in the same frame · original monogram = the brand tile the original drew itself · tile = none of these',
      render: function () { return h(Row, { size: s }); } });
  });
})();
