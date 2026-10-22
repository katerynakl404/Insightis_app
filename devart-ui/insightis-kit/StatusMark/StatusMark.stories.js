(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  /* a name with its mark beside it, as a list row or a panel shows it */
  function Named(p) {
    return h('div', { className: 'flex items-center gap-2 text-sm font-medium text-ink-primary' }, p.name, h(IK.StatusMark, Object.assign({ name: p.name }, p.mark)));
  }
  var DESC = 'Campaign performance and leads for the EMEA team, synced from the Marketing Hub portal every hour. Owned by the growth team; ask Olena before changing its scopes.';

  IK.story('StatusMark', { title: 'Description only — ⓘ', description: 'Hover (300ms) or focus the glyph: the description, five lines at most.', render: function () {
    return h(Named, { name: 'Campaigns HubSpot', mark: { description: DESC } });
  } });
  IK.story('StatusMark', { title: 'A warning — the amber triangle', render: function () {
    return h(Named, { name: 'Campaigns HubSpot', mark: { problems: [{ kind: 'warning', text: 'Olena Petrenko’s plan no longer includes Workspaces' }] } });
  } });
  IK.story('StatusMark', { title: 'An error — the red cross', render: function () {
    return h(Named, { name: 'Stripe Payments', mark: { problems: [{ kind: 'error', text: 'API key expired or revoked (HTTP 401)' }] } });
  } });
  IK.story('StatusMark', { title: 'Several problems — the worst wins the glyph', description: 'Problems (N) list each in its own tone; the glyph is the worst of them.', render: function () {
    return h(Named, { name: 'Stripe Payments', mark: { description: 'Revenue and subscription data', problems: [
      { kind: 'error', text: 'API key expired or revoked (HTTP 401)' },
      { kind: 'warning', text: 'Last check failed 26 hours ago' }] } });
  } });
  IK.story('StatusMark', { title: 'With the way back — an action under the problem', description: 'As Connection details names an unavailable shared connection: Ask Owner to Renew, and the person’s own plan in a quieter line.', render: function () {
    return h(Named, { name: 'Campaigns HubSpot', mark: { problems: [{ kind: 'warning', text: 'Olena Petrenko’s plan no longer includes Workspaces' }],
      action: h('div', { className: 'flex flex-col items-start gap-2' },
        h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'ws-send' }) }, 'Ask Owner to Renew'),
        h(D.Typography, { element: 'p', textStyle: 'body12', textColor: 'secondary', className: 'm-0' }, 'You’re on Free, so you’ll also need Starter')) } });
  } });
  IK.story('StatusMark', { title: 'Open — the popover as it reads', render: function () {
    return h('div', { className: 'pb-48' }, h(Named, { name: 'Campaigns HubSpot', mark: { defaultOpen: true, description: DESC, problems: [{ kind: 'warning', text: 'Olena Petrenko’s plan no longer includes Workspaces' }] } }));
  } });
  IK.story('StatusMark', { title: 'Nothing to say — no glyph', render: function () {
    return h(Named, { name: 'Main CRM', mark: {} });
  } });
  IK.story('StatusMark', { title: 'Phone (< 640px) — open this page at 375px', description: 'The popover (20rem) stays inside the screen: DevartUI Popover shifts it from the edge.', render: function () {
    return h('div', { className: 'w-80' }, h(Named, { name: 'Campaigns HubSpot', mark: { description: DESC, problems: [{ kind: 'warning', text: 'Olena Petrenko’s plan no longer includes Workspaces' }] } }));
  } });
})();
