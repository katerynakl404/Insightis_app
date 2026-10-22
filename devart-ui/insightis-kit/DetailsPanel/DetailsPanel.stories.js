(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  var LINKS = { Sales: '#', Support: '#', Marketing: '#', Brand: '#' };
  var frame = { height: 560, maxWidth: 420 };
  IK.story('DetailsPanel', { title: 'One’s own — hero, rows with the action at the line’s end, Access (Workspaces + Share via Workspace), Disconnect · Edit', render: function () {
    return h(IK.DetailsPanel, { inline: true, style: frame, title: 'Connection details',
      mark: h(IK.ConnectorMark, { connector: 'Salesforce', size: 'md' }), name: 'Main CRM', meta: 'Salesforce',
      rows: [{ label: 'Metrics', value: '12 metrics', action: { label: 'Add Metric' } },
             { label: 'Last check', value: h(IK.DsLastCheck, { lastSync: Date.now() - 32 * 60e3, status: 'active' }) }],
      access: { names: ['Sales', 'Support'], links: LINKS, action: h(window.DevartUI.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'ws-share' }) }, 'Share via Workspace') },
      foot: { start: h(D.Button, { variant: 'destructiveOutline', size: 'sm', type: 'button' }, 'Disconnect'),
              end: h(D.Button, { variant: 'primary', size: 'sm', type: 'button' }, 'Edit') } });
  } });
  IK.story('DetailsPanel', { title: 'Shared with you, unavailable — the warning by the name (its popover says why and the way back), Owner + Workspaces, no foot', render: function () {
    return h(IK.DetailsPanel, { inline: true, style: frame, title: 'Metric details',
      mark: h(IK.ConnectorMark, { connector: 'HubSpot', size: 'md' }), name: 'Revenue', meta: '@revenue__a3f9c1 · Custom',
      after: h(IK.WsUnavailableMark, { name: 'Revenue', by: 'Olena Petrenko', withAction: true, renewal: { blocked: true, owners: ['Olena Petrenko'], request: function () {} }, noun: 'metrics', feature: 'metrics' }),
      rows: [{ label: 'Linked to', value: 'Campaigns HubSpot · HubSpot' }],
      access: { owner: 'Olena Petrenko', names: ['Marketing', 'Brand'], links: LINKS } });
  } });
})();
