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
  /* AI assistants (Authorized apps, the consent screen): ChatGPT is the OpenAI logo; an ink logo flips on dark */
  IK.story('ConnectorMark', { title: 'AI assistants — Claude, ChatGPT', wide: true,
    description: 'claude.svg (its own orange) and the OpenAI logo for ChatGPT (alias); the OpenAI logo is ink, so .dark inverts it — switch the theme to see. Perplexity has no logo: the tile.',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-4' }, ['Claude', 'ChatGPT', 'Perplexity'].map(function (n) {
        return h('div', { key: n, className: 'flex flex-col items-center gap-1' },
          h(IK.ConnectorMark, { connector: n, size: 'sm', label: n + ' logo' }),
          h('span', { className: 'text-xxs text-ink-secondary' }, n));
      }));
    } });
  /* the app sprite: connectors neither DevartUI nor ./assets has (the onboarding catalog's long tail) */
  var SPRITED = [['Affinity', 'hbr_affinity'], ['AfterShip', 'rst_aftership'], ['Brevo', 'hbr_brevo'], ['Calendly', 'rst_calendly'],
                 ['ClickUp', 'hbr_clickup'], ['Confluence Cloud', 'hbr_confluence'], ['Chargebee', 'hbr_chargebee']];
  IK.story('ConnectorMark', { title: 'App sprite fallback', wide: true,
    description: '`sprite` — the connector\'s id in the app\'s own logo sprite, drawn when DevartUI and ./assets have no logo for it (md)',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-4' }, SPRITED.map(function (x) {
        var src = IK.onbSource ? IK.ONB_SOURCES.filter(function (s) { return s.name === x[0]; })[0] : null;
        var id = src ? src.sprite : x[1];
        return h('div', { key: x[0], className: 'flex flex-col items-center gap-1' },
          h(IK.ConnectorMark, { connector: x[0], sprite: id, spriteDark: src && src.dark, size: 'md', label: x[0] + ' logo' }),
          h('span', { className: 'text-xxs text-ink-secondary' }, x[0]));
      }));
    } });
})();
