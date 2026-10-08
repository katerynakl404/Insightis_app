(function () {
  var IK = window.InsightisKit, h = IK.h;
  var CATS = ['All', 'Business Intelligence', 'Commerce', 'IT Operations', 'Sales & CRM', 'Other'];
  var SAMPLE = [
    { name: 'PostgreSQL', cats: ['IT Operations'], popular: true }, { name: 'MySQL', cats: ['IT Operations'], popular: true },
    { name: 'BigQuery', cats: ['IT Operations', 'Business Intelligence'] }, { name: 'Salesforce', cats: ['Sales & CRM', 'Business Intelligence'], popular: true },
    { name: 'HubSpot', cats: ['Sales & CRM'], popular: true }, { name: 'Stripe', cats: ['Commerce', 'Business Intelligence'], popular: true },
    { name: 'QuickBooks', cats: ['Commerce'] }, { name: 'Constant Contact', cats: ['Sales & CRM'] },
    { name: 'GraphQL', cats: ['Other'] }, { name: 'Airtable', cats: ['Other'], popular: true }
  ];
  function onConnect(n) { console.log('[story] connect', n); }

  IK.story('DsCatalog', { title: 'Catalog — search, live category counts, tiles', wide: true,
    description: 'Type in the search: every chip count follows it, 0-count chips stay, an emptied active chip falls back to All.',
    render: function () { return h(IK.DsCatalog, { connectors: SAMPLE, categories: CATS, onConnect: onConnect, locked: false }); } });
  IK.story('DsCatalog', { title: 'Filtered — a category and a query', wide: true,
    render: function () { return h(IK.DsCatalog, { connectors: SAMPLE, categories: CATS, onConnect: onConnect, locked: false, defaultCategory: 'Sales & CRM', defaultQuery: 's' }); } });
  IK.story('DsCatalog', { title: 'No matches', wide: true,
    render: function () { return h(IK.DsCatalog, { connectors: SAMPLE, categories: CATS, onConnect: onConnect, locked: false, defaultQuery: 'zzz' }); } });
  IK.story('DsCatalog', { title: 'Loading — skeleton chips + tiles (search stays)', wide: true,
    render: function () { return h(IK.DsCatalog, { connectors: SAMPLE, categories: CATS, loading: true }); } });
  IK.story('DsCatalog', { title: 'Lazy pages — 4 per page here (18 on the page)', wide: true,
    description: 'Scroll the stage: the next page loads when the sentinel comes within 200px.',
    render: function () { return h('div', { style: { maxHeight: '22rem', overflowY: 'auto' } }, h(IK.DsCatalog, { connectors: SAMPLE, categories: CATS, onConnect: onConnect, locked: false, pageSize: 4 })); } });

  function Tiles(p) { return h('div', { className: 'ik-dsc-grid', style: { maxWidth: '36rem' } }, p.children); }
  IK.story('DsCatalog', { title: 'Tile — popular (flame), plain, no logo yet (monogram), two-line name',
    render: function () {
      return h(Tiles, null,
        h(IK.DsCatalogTile, { name: 'PostgreSQL', popular: true, locked: false, onConnect: onConnect }),
        h(IK.DsCatalogTile, { name: 'BigQuery', locked: false, onConnect: onConnect }),
        h(IK.DsCatalogTile, { name: 'GitHub', popular: true, locked: false, onConnect: onConnect }),
        h(IK.DsCatalogTile, { name: 'Constant Contact', locked: false, onConnect: onConnect }));
    } });
  IK.story('DsCatalog', { title: 'Tile — hover / keyboard focus reveal the Connect scrim',
    description: 'Hover a tile, or Tab to it. On touch the first tap reveals it (DsCatalogTile active).',
    render: function () { return h(Tiles, null, h(IK.DsCatalogTile, { name: 'Snowflake', popular: true, locked: false, onConnect: onConnect }), h(IK.DsCatalogTile, { name: 'Redshift', locked: false, onConnect: onConnect })); } });
  IK.story('DsCatalog', { title: 'Tile — Free plan: locked, a click opens the Upgrade modal',
    render: function () { return h(Tiles, null, h(IK.DsCatalogTile, { name: 'Salesforce', popular: true, locked: true }), h(IK.DsCatalogTile, { name: 'Oracle', locked: true })); } });
  IK.story('DsCatalog', { title: 'Tile — entering (after a disconnect)',
    render: function () { return h(Tiles, null, h(IK.DsCatalogTile, { name: 'Stripe', popular: true, locked: false, className: 'is-entering' })); } });
  IK.story('DsCatalog', { title: 'Flame mark alone', render: function () { return h('span', { style: { position: 'relative', display: 'inline-block', width: '18px', height: '18px' } }, h(IK.DsFlame, { style: { top: 0, left: 0 } })); } });
})();
