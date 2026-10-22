/* Workspaces — the shared-workspaces feature's data, store and the two small pieces every surface
   of it repeats. Source: Claude Doc «Дизайн: Shared workspaces, фаза 1» (AIINS-1852); rules:
   pages/approved/workspace.rules.md.

   A workspace is an Owner's set of connections, metrics and files, shared READ-ONLY with Members
   invited by email. Roles are Owner (the creator, one, never changes) and Member. Status follows
   the Owner's plan: active | blocked (members lose access, nothing is deleted). Restored is not a
   state: it is the moment blocked turns active again, confirmed once (WsNotice 'restored').

   ── Store ─────────────────────────────────────────────────────────────────────────────────────
   One person, one world: they own some workspaces and were invited to others — the role belongs to
   the workspace, never to the person (user, 2026-10-19).
   var ws = IK.useWorkspaces({ others, names, data, plan? })
     others  'active' | 'blocked' — the invited workspaces' Owners' plan (Olena's Marketing lapses;
             Mark's Finance stays Active). The person's OWN workspaces follow their own plan: Free →
             Blocked (the brief: status follows the Owner's plan; plan defaults to IK.usePlan()).
     names   'typical' | 'long' — every sample name 80+ characters long (truncation, wrapping)
     data    'filled' | 'many' (every list past one page: Load more) | 'empty' (workspaces with nothing
             in them — each tab's empty state) | 'none' (no workspace at all)
   → { list, owned, shared, me, find(id), create(name) → id, rename, remove, addConnections(id, conns),
       removeConnection, invite(id, email), resend, revoke, removeMember, shareFile(id, file),
       unshareFile, accept(ws), requestRenewal(id) }
   One stored world per data state (sessionStorage): a workspace made on one page is there on the
   next, and plan / Invited / Names are a view over it (wsView) — flipping them never drops an edit.
   IK.wsInvitation(o) → the workspace an invitation is for (Olena's Analytics guild), in the view.

   Helpers
     IK.WS_CONNECTIONS          the person's own connections (the Data Sources seed), with metrics
     IK.WS_FILES                the person's own files (the Files page's first ten, same ids)
     IK.wsNameTaken(list, name, exceptId)   duplicate among the person's OWN workspaces
     IK.wsWhereShared(list, connId)         owned workspaces a connection is in
     IK.wsSharedItems(list, kind)           'connections' | 'metrics' | 'files' from invited
                                            workspaces, each with { ws, by }
     IK.wsHref(rel, patch)      a page URL that keeps the feature's review params (ws, wothers,
                                names, shared, trial, wdata); patch { key: value | null }
     IK.wsHrefFor(ws)           the workspace opened on the Workspaces page (approved/workspaces.html?w=) — the Owner's
                                view or the read-only one
     IK.wsJoin(names)           "Sales", "Sales and Support", "Sales, Support and Finance"
     IK.wsMetricRows(list, o)   invited workspaces' metrics as IK.MxMetricsTable rows (below)
     IK.wsFmtDate(t)            "Oct 19, 2026"
     IK.wsAgo(t)                "1 minute ago" · "4 hours ago" · "1 day ago"

   ── IK.WsSharedBy ─────────────────────────────────────────────────────────────────────────────
   h(IK.WsSharedBy, { ws: 'Marketing and Finance', by, withBy, size: 'body12' })
   The caption a shared item carries: the workspace(s) it comes from — the author is not shown by
   default (user, 2026-10-19: "автор воркспейса по дефолту не цікавить"; the details panel names
   them); withBy → "Olena Petrenko · Marketing". One line, truncated → the whole caption in a
   tooltip (DevartUI TruncatedTitleTooltip).

   ── IK.WsNotice ───────────────────────────────────────────────────────────────────────────────
   h(IK.WsNotice, { kind, ws, … })  — the feature's Alert family, one place for its copy. Every
   "unavailable" reads as "a plan fixes it", never as lost data.
     blocked-owner   warning · "<ws> is unavailable to its members", "Upgrade to Pro" as a link in the
                     sentence (IK.Locked → upgrade), dismissible — the Insightis warning's shape
     blocked-member  warning · "<ws> is unavailable" + Ask Owner to Renew → onRequest
                     (an email to the Owner); requested → Request Sent (disabled); dismissible.
                     { list: [ws, …] } groups several into ONE notice (user, 2026-10-19: one per
                     workspace looks bad at 3+): 2 → "Marketing and Brand are unavailable",
                     3+ → "3 workspaces are unavailable" with the names in the text; one owner →
                     Ask Owner to Renew, one owner or several
     restored        success · "<ws> is available again", dismissible (onDismiss)
     trial           info · when the trial ends: the person's own workspaces ({ owned }) become
                     unavailable to members, and what invited workspaces ({ sharedFrom, counts })
                     shared needs a plan — one notice for both, "See plans", dismissible
     invited         info · "<by> invited you to <ws>" + Accept Invitation → onAccept (another address, expired,
                     unavailable: toasts — IK.wsInvitationToast)
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* lucide "layers" — the workspace glyph, as in the AI connectivity workspaces prototype */
  IK.defineIcons({
    'ws-layers': '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
    'ws-users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'ws-send': '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    'ws-share': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    'ws-x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    /* lucide circle-minus: taken out of a workspace, nothing deleted (Remove from Workspace, Stop Sharing) */
    'ws-remove': '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>',
    /* lucide "log-out" — leaving a workspace one was invited to */
    'ws-leave': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    /* lucide mail-x: an invitation taken back */
    'ws-mail-x': '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m17 17 4 4"/><path d="m21 17-4 4"/>'
  });

  /* ── sample data ─────────────────────────────────────────────────────────────────────────── */
  var DAY = 864e5, NOW = Date.now();
  function N(typical, long) { return { t: typical, l: long }; }
  /* a workspace name is at most 50 characters (user, 2026-10-19) — the create / rename field stops there */
  IK.WS_NAME_MAX = 50;
  var NAMES = {
    me: N('Kateryna K.', 'Kateryna Kovalenko-Shevchuk'),
    olena: N('Olena Petrenko', 'Oleksandra Petrenko-Vasylenko'),
    mark: N('Mark Shevchenko', 'Markiian Shevchenko-Hrytsenko'),
    andrii: N('Andrii Melnyk', 'Andrii-Bohdan Melnychenko-Kovalchuk'),
    iryna: N('Iryna Bondar', 'Iryna-Solomiia Bondarenko-Tkachuk'),
    oksana: N('Oksana Lysenko', 'Oksana Lysenko-Zakharchenko'),
    sales: N('Sales', 'Sales operations — Central & Eastern Europe'),
    support: N('Support', 'Customer support quality and weekly SLA reviews'),
    marketing: N('Marketing', 'Marketing analytics — EMEA regional team'),
    finance: N('Finance', 'Finance, budgeting and board reporting'),
    product: N('Product', 'Product discovery and feature adoption'),
    brand: N('Brand', 'Brand and creative — campaigns and launch assets'),
    guild: N('Analytics guild', 'Analytics guild — definitions and dashboards'),
    f1: N('quarterly-report.csv', 'quarterly-report-q3-2026-enterprise-accounts-final-version-for-the-board.csv'),
    f2: N('revenue-forecast.xlsx', 'revenue-forecast-by-region-and-segment-trailing-twelve-months-with-scenarios.xlsx'),
    f3: N('Campaign brief — autumn launch.pdf', 'Campaign brief — autumn launch across paid social, search and partner newsletters.pdf'),
    f4: N('Leads by channel.csv', 'Leads by channel and campaign, weekly, last two quarters, deduplicated.csv')
  };
  function nm(key) { return NAMES[key].t; }
  function person(key, email) { var name = nm(key); return { name: name, email: email, initial: name.charAt(0) }; }

  /* The person's own connections — the Data Sources seed (label = what they named it). `metrics` =
     how many metric definitions sharing the connection makes visible. */
  IK.WS_CONNECTIONS = [
    { id: 'c-pg', name: 'PostgreSQL', label: 'Production DB', desc: 'Main analytics warehouse, syncs every 6 h', metrics: 0, lastSync: NOW - 2 * 3600e3, status: 'active' },
    { id: 'c-sf', name: 'Salesforce', label: 'Main CRM', desc: 'Deals, contacts & pipeline metrics', metrics: 12, lastSync: NOW - 32 * 60e3, status: 'active' },
    { id: 'c-st', name: 'Stripe', label: 'Stripe Payments', desc: 'Revenue and subscription data', metrics: 8, lastSync: NOW - 26 * 3600e3, status: 'error', error: 'API key expired or revoked (HTTP 401)' },
    { id: 'c-hs', name: 'HubSpot', label: 'Marketing Hub', desc: 'Campaign performance & lead scoring', metrics: 3, lastSync: NOW - 5 * 3600e3, status: 'active' }
  ];
  function myConn(id) { return IK.WS_CONNECTIONS.filter(function (c) { return c.id === id; })[0]; }
  /* the metric definitions each of the person's connections brings — what a workspace they share it
     into shows on its Metrics tab ([name, alias, definition]; counts match WS_CONNECTIONS) */
  IK.WS_METRIC_DEFS = {
    'c-sf': [['Pipeline value', '@pipeline_value', 'Open opportunity amount'], ['Deals won', '@deals_won', 'Closed-won deals in the period'],
             ['Win rate', '@win_rate', 'Won deals as a share of closed deals'], ['Average deal size', '@avg_deal_size', 'Mean amount of won deals'],
             ['Sales cycle length', '@sales_cycle', 'Days from created to closed-won'], ['New leads', '@new_leads', 'Leads created in the period'],
             ['Lead conversion rate', '@lead_conversion', 'Leads converted to opportunities'], ['Open opportunities', '@open_opps', 'Opportunities not yet closed'],
             ['Closed-lost deals', '@deals_lost', 'Deals marked lost in the period'], ['Quota attainment', '@quota_attainment', 'Bookings against the quota'],
             ['Activities logged', '@activities', 'Calls, emails and meetings logged'], ['Forecast amount', '@forecast', 'Committed forecast for the quarter']],
    'c-st': [['MRR', '@mrr', 'Monthly recurring revenue'], ['ARR', '@arr', 'Annual recurring revenue'], ['Churn rate', '@churn_rate', 'Subscriptions cancelled in the period'],
             ['New subscriptions', '@new_subs', 'Subscriptions started in the period'], ['Failed payments', '@failed_payments', 'Charges that did not go through'],
             ['Refunds', '@refunds', 'Amount refunded in the period'], ['Net revenue', '@net_revenue', 'Gross revenue minus refunds and fees'], ['ARPU', '@arpu', 'Average revenue per paying customer']],
    'c-hs': [['New contacts', '@new_contacts', 'Contacts created in the period'], ['Email open rate', '@email_open_rate', 'Opened emails as a share of sent'],
             ['MQLs', '@mqls', 'Marketing-qualified leads in the period']]
  };
  /* a workspace of the person's own: the metrics its connections share with it, as IK.MxMetricsTable
     rows — read-only here (they are managed on the Metrics page), no Add Metric */
  /* the Owner's metrics on a workspace page, in the Metrics page's own hierarchy — the source, its connections as
     sub-headers, their metrics (user, 2026-10-21: "а де тут ділась ієрархія?"); switched on and off as on Metrics */
  /* a connection's metrics: what it brings, then the ones made on it (Create metric — custom, off until switched on) */
  function defsOf(c) { return (IK.WS_METRIC_DEFS[c.id] || []).concat((c.made || []).map(function (m) { return [m.name, m.alias, m.desc, true]; })); }
  IK.wsOwnMetricRows = function (w) {
    var rows = [], bySrc = {}, order = [];
    w.connections.forEach(function (c) {
      if (!defsOf(c).length) return;
      if (!bySrc[c.name]) { bySrc[c.name] = []; order.push(c.name); }
      bySrc[c.name].push(c);
    });
    order.forEach(function (src) {
      var prov = 'own-' + bySrc[src][0].id;
      rows.push({ kind: 'group', prov: prov, name: src, connector: src, readOnly: true });
      bySrc[src].forEach(function (c) {
        var cid = 'own-' + c.id;
        rows.push({ kind: 'conn', id: cid, prov: prov, name: c.label, wsConn: c.id });
        defsOf(c).forEach(function (d, i) {
          rows.push({ kind: 'metric', id: cid + '-' + i, prov: prov, conn: cid, name: d[0], alias: d[1], desc: d[2], summary: d[2],
                      readOnly: true, active: d[3] ? false : i % 4 !== 3, custom: !!d[3], provider: c.name, connector: c.label });
        });
      });
    });
    return rows;
  };


  /* the person's own connections on the Metrics page (the Data Sources seed that brings metrics): a group per
     source, the connection a sub-header — wsConn: the page looks up which workspaces it is in — and its
     metrics, the person's own (switch, ⋮) */
  IK.wsMyMetricRows = function () {
    var rows = [];
    IK.WS_CONNECTIONS.forEach(function (c) {
      var defs = IK.WS_METRIC_DEFS[c.id] || [], cid = 'own-' + c.id;
      if (!defs.length) return;
      rows.push({ kind: 'group', prov: cid, name: c.name, connector: c.name });
      rows.push({ kind: 'conn', id: cid, prov: cid, name: c.label, wsConn: c.id });
      defs.forEach(function (d, i) {
        rows.push({ kind: 'metric', id: cid + '-' + i, prov: cid, conn: cid, wsConn: c.id, name: d[0], alias: d[1], desc: d[2], summary: d[2],
                    active: i % 4 !== 3, provider: c.name, connector: c.label });
      });
    });
    return rows;
  };

  /* The person's own files — the Files page's first ten (same ids), what they can share */
  IK.WS_FILES = [
    ['f1', 'quarterly-report.csv', 'csv', 'artifact', '2.4 MB', 3], ['f2', 'customer-data.xlsx', 'xlsx', 'uploaded', '890 KB', 7],
    ['f3', 'sales-metrics.xls', 'xls', 'uploaded', '1.1 MB', 14], ['f4', 'revenue-forecast.xlsx', 'xlsx', 'artifact', '1.6 MB', 21],
    ['f5', 'churn-analysis.csv', 'csv', 'artifact', '512 KB', 30], ['f6', 'marketing-spend.xlsx', 'xlsx', 'uploaded', '2.1 MB', 32],
    ['f7', 'user-signups.csv', 'csv', 'uploaded', '340 KB', 35], ['f8', 'cohort-retention.xls', 'xls', 'artifact', '780 KB', 60],
    ['f9', 'nps-survey.csv', 'csv', 'uploaded', '220 KB', 62], ['f10', 'support-tickets.xlsx', 'xlsx', 'uploaded', '1.9 MB', 64]
  ].map(function (r) { return { id: r[0], name: r[1], type: r[2], kind: r[3], size: r[4], date: NOW - r[5] * DAY }; });
  function myFile(id) { return Object.assign({}, IK.WS_FILES.filter(function (f) { return f.id === id; })[0]); }

  /* One person, one world: they own some workspaces and were invited to others — a role is a
     workspace's, never the person's (user, 2026-10-19). The seed is the TYPICAL world, all Active;
     Long names and the statuses are a VIEW over it (wsView), so flipping them never drops an edit.
       filled  own: Sales (full), Support (one connection, no files), Product (just made — nothing
               shared yet) · invited: Marketing (Olena), Brand (Olena — the same HubSpot connection and
               brief as Marketing: one item shared from two workspaces), Finance (Mark — no files)
       many    the same + 22 more (own and invited), 34 people and 6 invitations in Sales, 30 files in
               Sales and Marketing — every list past one page (Load more)
       empty   the same workspaces with nothing in them (every tab's empty state)
       none    no workspace at all (the list's empty state) */
  function seed(data) {
    if (data === 'none') return [];
    var me = person('me', 'kateryna.k@northwind.io');
    function owned(id, key, conns, members, invites, files, created) {
      return { id: id, name: nm(key), role: 'owner', owner: me, status: 'active', created: created || NOW - 40 * DAY,
               connections: conns.map(myConn), members: [me].concat(members), invites: invites, files: files };
    }
    var sales = owned('sales', 'sales', ['c-sf', 'c-st'],
      [person('andrii', 'andrii.melnyk@northwind.io'), person('iryna', 'iryna.bondar@northwind.io')],
      [{ email: 'taras.koval@northwind.io', sent: NOW - 2 * DAY }, { email: 'd.sokolova@partner-agency.com', sent: NOW - 9 * DAY }],
      [myFile('f1'), myFile('f4')]);
    sales.desc = 'Pipeline, deals and revenue for the weekly sales review';
    var support = owned('support', 'support', ['c-sf'], [person('oksana', 'oksana.lysenko@northwind.io')], [], []);
    var product = owned('product', 'product', [], [], [], [], NOW - DAY);
    var olena = person('olena', 'olena.petrenko@northwind.io');
    var marketing = {
      id: 'marketing', name: nm('marketing'), role: 'member', owner: olena, status: 'active',
      desc: 'Campaign results and website traffic across EMEA',
      members: [olena, me, person('andrii', 'andrii.melnyk@northwind.io')],
      invites: [{ email: 'roman.hnatiuk@northwind.io', sent: NOW - DAY }],
      connections: [
        /* lastSync: each its own check time, read the same on Data Sources, a workspace and the details panel */
        { id: 'a3f9c1', name: 'HubSpot', label: 'Campaigns HubSpot', desc: 'Campaign performance and leads for the EMEA team', lastSync: NOW - 40 * 60e3, metrics: [
          { name: 'Deals won', alias: '@deals_won', desc: 'Closed-won deals in the period' },
          { name: 'New contacts', alias: '@new_contacts', desc: 'Contacts created in the period', active: false },
          { name: 'Revenue', alias: '@revenue', custom: true, desc: 'Closed-won amount, net of refunds' },
          { name: 'MRR growth', alias: '@mrr_growth', custom: true, desc: 'Month-over-month change in MRR' }] },
        { id: '7b21e0', name: 'Google Analytics', label: 'Website analytics', desc: 'Traffic and sign-ups on the marketing site', lastSync: NOW - 3 * 3600e3, metrics: [
          { name: 'Sessions', alias: '@sessions', desc: 'Visits to the website' },
          { name: 'Conversion rate', alias: '@conversion_rate', desc: 'Sessions that ended in a sign-up' }] },
        /* a source the person has too: on Metrics it sits in their own Jira group, under their connections */
        { id: 'e19b04', name: 'Jira Software Cloud', label: 'Campaign tasks', desc: 'Launch tasks for every campaign', lastSync: NOW - 20 * 60e3, metrics: [
          { name: 'Sprint velocity', alias: '@sprint_velocity', desc: 'Story points done per sprint' },
          { name: 'Overdue tasks', alias: '@overdue_tasks', custom: true, desc: 'Open tasks past their due date' }] }],
      files: [
        { id: 'mf-1', name: nm('f3'), type: 'pdf', kind: 'uploaded', size: '1.1 MB', date: NOW - 4 * DAY },
        { id: 'mf-2', name: nm('f4'), type: 'csv', kind: 'artifact', size: '62 KB', date: NOW - 8 * DAY }]
    };
    var brand = {
      id: 'brand', name: nm('brand'), role: 'member', owner: olena, status: 'active',
      members: [olena, me], invites: [],
      connections: [marketing.connections[0]],
      files: [marketing.files[0]]
    };
    var mark = person('mark', 'mark.shevchenko@northwind.io');
    var finance = {
      id: 'finance', name: nm('finance'), role: 'member', owner: mark, status: 'active',
      members: [mark, me], invites: [],
      connections: [
        { id: 'c4d812', name: 'QuickBooks', label: 'Company books', desc: 'Invoices and receivables for the finance team', lastSync: NOW - 9 * 3600e3, metrics: [
          { name: 'Invoices paid', alias: '@invoices_paid', desc: 'Invoices marked paid in the period' },
          { name: 'Accounts receivable', alias: '@ar_balance', desc: 'Open receivables at the end of the period' }] }],
      files: []
    };
    /* last activity, as the AI connectivity list shows it */
    sales.active = NOW - 60e3; support.active = NOW - 35 * 60e3; product.active = NOW - 4 * 3600e3;
    marketing.active = NOW - 3600e3; brand.active = NOW - 5 * 3600e3; finance.active = NOW - DAY;
    var list = [sales, support, product, marketing, brand, finance];
    /* empty: the same workspaces with nothing in them — every tab shows its own empty state */
    if (data === 'empty') return list.map(function (w) {
      return Object.assign({}, w, { connections: [], files: [], invites: [], members: w.role === 'owner' ? [me] : [w.owner, me] });
    });
    return data === 'many' ? many(list, me) : list;
  }

  var TEAMS = ['Sales EMEA', 'Sales APAC', 'Sales Americas', 'Finance Ops', 'Board reporting', 'Customer success', 'Support tier 2',
    'Product analytics', 'Growth', 'Partnerships', 'Pricing', 'Revenue ops', 'Marketing EMEA', 'Brand', 'Content', 'Events',
    'People ops', 'Recruiting', 'Procurement', 'Legal', 'IT', 'Security'];
  var FIRST = ['Taras', 'Oksana', 'Dmytro', 'Kateryna', 'Bohdan', 'Iryna', 'Mykola', 'Yulia', 'Andrii', 'Sofiia', 'Roman', 'Nadiia',
    'Petro', 'Halyna', 'Serhii', 'Olha', 'Vasyl', 'Mariia', 'Ihor', 'Tetiana'];
  var LAST = ['Koval', 'Bondar', 'Shevchuk', 'Tkachenko', 'Kravets', 'Melnyk', 'Moroz', 'Savchenko', 'Rudenko', 'Lysenko', 'Marchenko'];
  var DOCS = ['Pipeline review', 'Churn by cohort', 'Board deck notes', 'Pricing test results', 'Quarterly forecast', 'Win-loss interviews',
    'Campaign results', 'Support SLA report', 'Renewals list', 'Territory plan'];
  function many(list, me) {
    var ppl = [], inv = [], docs = [], i;
    for (i = 0; i < 32; i++) {
      var f = FIRST[i % FIRST.length], l = LAST[(i * 7) % LAST.length], n = f + ' ' + l;
      ppl.push({ name: n, email: (f + '.' + l + (i > 19 ? i : '')).toLowerCase() + '@northwind.io', initial: n.charAt(0) });
    }
    for (i = 0; i < 6; i++) inv.push({ email: 'guest' + (i + 1) + '@partner-agency.com', sent: NOW - (i * 2 + 1) * DAY });
    for (i = 0; i < 28; i++) {
      var ext = ['pdf', 'xlsx', 'csv', 'docx'][i % 4];
      docs.push({ id: 'gf-' + i, name: DOCS[i % DOCS.length] + ' ' + (Math.floor(i / DOCS.length) + 1) + '.' + ext, type: ext,
                  kind: i % 3 ? 'uploaded' : 'artifact', size: (120 + i * 37) + ' KB', date: NOW - (i + 9) * DAY });
    }
    var out = list.map(function (w) {
      if (w.id === 'sales') return Object.assign({}, w, { members: w.members.concat(ppl), invites: w.invites.concat(inv), files: w.files.concat(docs) });
      if (w.id === 'marketing') return Object.assign({}, w, { files: w.files.concat(docs.map(function (d) { return Object.assign({}, d, { id: 'm' + d.id }); })) });
      return w;
    });
    var owners = [person('olena', 'olena.petrenko@northwind.io'), person('mark', 'mark.shevchenko@northwind.io')];
    TEAMS.forEach(function (t, j) {
      var mine = j % 2 === 0, o = mine ? me : owners[(j >> 1) % 2];
      out.push({ id: 'gen-' + j, name: t, role: mine ? 'owner' : 'member', owner: o, status: 'active', created: NOW - (60 + j) * DAY, active: NOW - (j * 5 + 2) * 3600e3,
                 connections: [], members: mine ? [me] : [o, me], invites: [], files: [] });
    });
    return out;
  }

  /* The view. Some sample names are always their long twin (a workspace up to the 50-character cap) — two workspaces (Product, one's
     own; Marketing, an invited one), a member, two files — so long and typical sit side by side with no
     switch (user, 2026-10-19); a name someone typed stays as typed. Status follows each Owner's plan (the brief): the person's OWN workspaces are
     Blocked while their plan has no Workspaces module (Free); the workspaces they were invited to
     follow the "Invited" switch — Olena's Marketing (and, with Many, half of the invited ones) is
     Blocked when her plan lapses, Mark's Finance stays Active, so both show side by side. */
  var LONG = {};
  ['product', 'marketing', 'iryna', 'f2', 'f4'].forEach(function (k) { LONG[NAMES[k].t] = NAMES[k].l; });
  function wsView(list, o) {
    function L(s) { return LONG[s] || s; }
    function P(x) { var n = L(x.name); return Object.assign({}, x, { name: n, initial: n.charAt(0) }); }
    function status(w) {
      if (w.role === 'owner') return o.plan === 'free' ? 'blocked' : 'active';
      /* Blocked: two owners' plans lapsed — Olena's and Mark's — so the notices show several owners (user,
         2026-10-19: 'а якщо овнерів кілька'; no switch for it, the sample has it) */
      var lapsed = o.others === 'blocked' ? ['olena.petrenko@northwind.io', 'mark.shevchenko@northwind.io'] : [];
      return lapsed.indexOf(w.owner.email) >= 0 ? 'blocked' : 'active';
    }
    return list.map(function (w) {
      return Object.assign({}, w, {
        name: L(w.name), owner: P(w.owner), members: w.members.map(P),
        files: w.files.map(function (f) { return Object.assign({}, f, { name: L(f.name) }); }),
        status: status(w)
      });
    });
  }

  /* ── store ─────────────────────────────────────────────────────────────────────────────────── */
  /* One stored world per data state (sessionStorage); plan, Invited and Names never touch it. */
  var KEY = 'insightis.wsw11.';
  var subs = [], cache = {};
  /* back to the sample data: every stored world dropped (created, renamed, deleted, left workspaces) */
  IK.wsResetData = function () {
    try { Object.keys(sessionStorage).forEach(function (k) { if (k.indexOf(KEY) === 0) sessionStorage.removeItem(k); }); } catch (e) {}
    cache = {};
  };
  function worldOf(o) { return ['many', 'empty', 'none'].indexOf(o.data) >= 0 ? o.data : 'filled'; }
  function load(world) {
    if (cache[world]) return cache[world];
    try { var s = JSON.parse(sessionStorage.getItem(KEY + world) || 'null'); if (s && s.list) return (cache[world] = s); } catch (e) {}
    return (cache[world] = { list: seed(world), n: 1 });
  }
  function write(world, next) {
    cache[world] = next;
    try { sessionStorage.setItem(KEY + world, JSON.stringify(next)); } catch (e) {}
    subs.slice().forEach(function (fn) { fn(Date.now()); });
  }
  function norm(s) { return String(s || '').trim().replace(/\s+/g, ' ').toLowerCase(); }

  IK.wsNameTaken = function (list, name, exceptId) {
    var n = norm(name);
    return !!n && list.some(function (w) { return w.role === 'owner' && w.id !== exceptId && norm(w.name) === n; });
  };
  IK.wsWhereShared = function (list, connId) {
    return list.filter(function (w) { return w.role === 'owner' && w.connections.some(function (c) { return c.id === connId; }); });
  };
  IK.wsJoin = function (names) {
    if (names.length < 2) return names[0] || '';
    return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  };
  IK.wsSharedItems = function (list, kind) {
    var out = [];
    list.forEach(function (w) {
      if (w.role !== 'member') return;
      var by = w.owner.name;
      if (kind === 'files') w.files.forEach(function (f) { out.push(Object.assign({ ws: w, by: by }, f)); });
      else w.connections.forEach(function (c) {
        if (kind === 'connections') out.push(Object.assign({ ws: w, by: by }, c));
        else c.metrics.forEach(function (mt) { out.push(Object.assign({ ws: w, by: by, conn: c }, mt)); });
      });
    });
    return out;
  };

  /* A Member's shared metrics as IK.MxMetricsTable rows, grouped as the person's own are: one group per
     source, each shared connection a sub-header in it (its name, who shared it, from which workspaces),
     its metrics under it, every one read-only. What is shared is a connection, so one source can hold the
     person's own connections and shared ones (user, 2026-10-19): IK.mxMergeShared puts these into the
     person's own groups. An alias the person already
     uses — or another shared connection uses too — is namespaced: alias + "__" + the connection's
     6-character id (@revenue → @revenue__a3f9c1); the person's own keeps the short form.
     own: the person's aliases ['@mrr_growth', …] · locked: unavailable on their plan (greyed + the
     plan's badge) · a Blocked workspace's rows are muted: greyed, no badge — the plan is the Owner's */
  IK.wsMetricRows = function (list, o) {
    o = o || {};
    var seen = {};
    (o.own || []).forEach(function (a) { seen[norm(a)] = (seen[norm(a)] || 0) + 2; });
    var conns = [], at = {};
    list.forEach(function (w) {
      if (w.role !== 'member' || (o.only && w.id !== o.only)) return;
      w.connections.forEach(function (c) {
        var k = w.owner.email + '/' + c.id;
        if (at[k]) { at[k].names.push(w.name); at[k].links[w.name] = IK.wsHrefFor(w); at[k].muted = at[k].muted && w.status === 'blocked'; return; }
        var lk = {}; lk[w.name] = IK.wsHrefFor(w);
        conns.push(at[k] = { w: w, c: c, names: [w.name], links: lk, muted: w.status === 'blocked' });
        c.metrics.forEach(function (m) { seen[norm(m.alias)] = (seen[norm(m.alias)] || 0) + 1; });
      });
    });
    var rows = [], groups = [], bySrc = {}, locked = !!o.locked;
    conns.forEach(function (x) {
      var g = bySrc[x.c.name];
      if (!g) groups.push(g = bySrc[x.c.name] = { name: x.c.name, conns: [] });
      g.conns.push(x);
    });
    groups.forEach(function (g) {
      var prov = 'ws-' + g.conns[0].c.id;
      rows.push({ kind: 'group', prov: prov, name: g.name, connector: g.name, readOnly: true, locked: locked,
                  muted: g.conns.every(function (x) { return x.muted; }) });
      g.conns.forEach(function (x) {
        var w = x.w, c = x.c, cid = 'ws-' + c.id, muted = x.muted;
        rows.push({ kind: 'conn', id: cid, prov: prov, name: c.label, by: w.owner.name,
                    shared: { by: w.owner.name, ws: IK.wsJoin(x.names), names: x.names, links: x.links }, locked: locked, muted: muted });
        c.metrics.forEach(function (m, i) {
          var alias = seen[norm(m.alias)] > 1 ? m.alias + '__' + c.id : m.alias;
          rows.push({ kind: 'metric', id: cid + '-' + i, prov: prov, conn: cid, name: m.name, alias: alias, summary: m.desc, desc: m.desc,
                      custom: !!m.custom, readOnly: true, locked: locked, muted: muted, active: m.active !== false, provider: c.name, connector: c.label, ws: w,
                      by: w.owner.name, wsNames: x.names, links: x.links });
        });
      });
    });
    return rows;
  };

  IK.useWorkspaces = function (o) {
    o = Object.assign({}, o || {});
    o.plan = o.plan || IK.usePlan()[0];
    var world = worldOf(o);
    var tick = R.useState(0)[1];
    R.useEffect(function () {
      subs.push(tick);
      return function () { subs = subs.filter(function (f) { return f !== tick; }); };
    }, []);
    var list = wsView(load(world).list, o);
    IK._wsList = list;
    function find(id) { return list.filter(function (w) { return w.id === id; })[0] || null; }
    function patch(id, fn) {
      var s = load(world);
      write(world, Object.assign({}, s, { list: s.list.map(function (w) { return w.id === id ? Object.assign({}, w, fn(w)) : w; }) }));
    }
    function everywhere(fn) {
      var s = load(world);
      write(world, Object.assign({}, s, { list: s.list.map(function (w) { return Object.assign({}, w, fn(w)); }) }));
    }
    var meStored = person('me', 'kateryna.k@northwind.io');
    var me = wsView([{ name: '', role: 'owner', owner: meStored, members: [], files: [] }], o)[0].owner;
    return {
      list: list, layout: o.layout || 'a', me: me, find: find,
      owned: list.filter(function (w) { return w.role === 'owner'; }),
      shared: list.filter(function (w) { return w.role === 'member'; }),
      create: function (name, desc) {
        var s = load(world), id = 'ws-' + (s.n || 1);
        var w = { id: id, name: String(name).trim().replace(/\s+/g, ' '), desc: String(desc || '').trim() || undefined, role: 'owner', owner: meStored, status: 'active', created: Date.now(),
                  connections: [], members: [meStored], invites: [], files: [] };
        write(world, Object.assign({}, s, { n: (s.n || 1) + 1, list: s.list.concat([w]) }));
        return id;
      },
      /* Edit workspace: the name and the description (an empty one clears it) */
      edit: function (id, name, desc) { patch(id, function () { return { name: name, desc: String(desc || '').trim() || undefined }; }); },
      remove: function (id) { var s = load(world); write(world, Object.assign({}, s, { list: s.list.filter(function (w) { return w.id !== id; }) })); },
      /* a Member leaves a workspace they were invited to: it is gone from their list (the Owner's stays) */
      leave: function (id) { var s = load(world); write(world, Object.assign({}, s, { list: s.list.filter(function (w) { return w.id !== id; }) })); },
      addConnections: function (id, conns) { patch(id, function (w) { return { connections: w.connections.concat(conns) }; }); },
      removeConnection: function (id, cid) { patch(id, function (w) { return { connections: w.connections.filter(function (c) { return c.id !== cid; }) }; }); },
      invite: function (id, email) { patch(id, function (w) { return { invites: [{ email: email, sent: Date.now() }].concat(w.invites) }; }); },
      resend: function (id, email) { patch(id, function (w) { return { invites: w.invites.map(function (i) { return i.email === email ? { email: email, sent: Date.now() } : i; }) }; }); },
      revoke: function (id, email) { patch(id, function (w) { return { invites: w.invites.filter(function (i) { return i.email !== email; }) }; }); },
      removeMember: function (id, email) { patch(id, function (w) { return { members: w.members.filter(function (m) { return m.email !== email; }) }; }); },
      shareFile: function (id, file) { patch(id, function (w) { return { files: w.files.concat([file]) }; }); },
      unshareFile: function (id, fid) { patch(id, function (w) { return { files: w.files.filter(function (f) { return f.id !== fid; }) }; }); },
      /* one connection / file in every workspace it is in: edited (its name, description, last check), disconnected, deleted */
      updateConnection: function (cid, o) { everywhere(function (w) { return { connections: w.connections.map(function (c) { return c.id === cid ? Object.assign({}, c, o) : c; }) }; }); },
      /* a metric made on one's connection (Create metric) goes with it into every workspace it is in */
      addMetric: function (cid, m) { everywhere(function (w) { return { connections: w.connections.map(function (c) {
        return c.id !== cid ? c : Object.assign({}, c, Array.isArray(c.metrics) ? { metrics: c.metrics.concat([m]) } : { metrics: (c.metrics || 0) + 1, made: (c.made || []).concat([m]) });
      }) }; }); },
      disconnect: function (cid) { everywhere(function (w) { return { connections: w.connections.filter(function (c) { return c.id !== cid; }) }; }); },
      deleteFile: function (fid) { everywhere(function (w) { return { files: w.files.filter(function (f) { return f.id !== fid; }) }; }); },
      /* joining from an invitation (chat landing): the invitation's workspace joins the world */
      accept: function (inv) {
        var s = load(world);
        if (!s.list.some(function (w) { return w.id === inv.id; })) write(world, Object.assign({}, s, { list: s.list.concat([inv]) }));
      },
      requestRenewal: function (id) { patch(id, function () { return { requested: true }; }); }
    };
  };
  /* IK.useWsPanelActions(ws, { free }) — what a page gives Connection details and File details opened from a workspace,
     so they are the very panels Data Sources and Files open (user, 2026-10-22: "всі панелі не залежно від місця мали
     виглядати однаково!"): no "Remove from Workspace" of their own — a workspace is left from the panel's Workspaces
     list (its ×), as everywhere; Edit · Test Connection · Disconnect · Share via Workspace · Add Metric for a connection,
     Download · Add to Chat · Share · Delete for a file, through the same dialogs.
       var pa = IK.useWsPanelActions(ws, { free });
       var x = pa.connection(c, close); h(IK.ConnectionDetails, Object.assign({ connection: x.item, onOpenChange }, x.opts))
       var y = pa.file(f, close);       h(IK.FileDetails, Object.assign({ file: y.item, onClose }, y.opts))
       c: { id, label, name, … } as the store keeps it; the item gains where it is (sharedWith, links)
       pa.createMetric(c | null)                           Create metric in place — Data Sources' Add Metric (c: preset)
       pa.shareFiles(files) · pa.deleteFiles(files, close)  a selection, as Files' bulk bar
       { seeMetrics() → fn | null }                        "See it in Metrics" after a metric is made (null: none)
       pa.dialogs                                          rendered once by the page */
  IK.useWsPanelActions = function (ws, o) {
    var free = !!(o && o.free);
    var es = R.useState(null), editC = es[0], setEditC = es[1];
    var ds = R.useState(null), discC = ds[0], setDiscC = ds[1];
    var ss = R.useState(null), shareC = ss[0], setShareC = ss[1];
    var fs = R.useState(null), shareF = fs[0], setShareF = fs[1];
    var xs = R.useState(null), delF = xs[0], setDelF = xs[1];
    var ms = R.useState(null), mxFor = ms[0], setMxFor = ms[1];
    var closeRef = R.useRef(null);
    /* a file as the store keeps it (a list shows it reformatted) */
    function stored(f) { var k = null; ws.list.some(function (w) { return w.files.some(function (x) { if (x.id === f.id) k = x; return !!k; }); }); return k || f; }
    function where(pred) { return ws.list.filter(function (w) { return w.role === 'owner' && pred(w); }); }
    function connIn(cid) { return where(function (w) { return w.connections.some(function (x) { return x.id === cid; }); }); }
    function fileIn(fid) { return where(function (w) { return w.files.some(function (x) { return x.id === fid; }); }); }
    function names(ids) { return IK.wsJoin(ids.map(function (id) { var w = ws.find(id); return w ? w.name : ''; })); }
    function bold(t) { return h('strong', null, t); }
    return {
      /* Connection details' options for one's own connection, as Data Sources gives them */
      connection: function (c, close) {
        var inWs = connIn(c.id);
        return { item: Object.assign({}, c, { sharedWith: inWs.map(function (w) { return w.name; }), links: IK.wsLinks(inWs) }), opts: {
          free: free, wsLocked: free, metricsHref: IK.wsMetricsHref,
          onEdit: function () { setEditC(c); },
          onTest: function () {
            ws.updateConnection(c.id, { busy: true });
            setTimeout(function () {
              ws.updateConnection(c.id, { busy: false, status: 'active', lastSync: Date.now() });
              D.toast.success(h(IK.Fragment, null, bold(c.label), ' checked successfully'), { description: 'Last check just now', id: c.id });
            }, 1500);
          },
          /* the failed check's Details: the error toast, as on Data Sources */
          onDetails: function () {
            D.toast.error(h(IK.Fragment, null, 'Last check failed — ', bold(c.label)), { description: 'Check failed: ' + IK.dsFailReason(c), id: c.id });
          },
          onDisconnect: function () { closeRef.current = close; setDiscC(c); },
          /* Create metric in place, as on Data Sources */
          onAddMetric: function () { setMxFor({ c: c }); },
          /* the count, whatever form the store keeps its metrics in (a list on a workspace) */
          onAddToWorkspace: function () { setShareC(Object.assign({}, c, { metrics: Array.isArray(c.metrics) ? c.metrics.length : c.metrics })); },
          onRemoveFromWorkspace: function (it) {
            ws.removeConnection(it.id, c.id);
            D.toast.success(h(IK.Fragment, null, bold(c.label), ' removed from ' + it.name));
          } } };
      },
      /* File details' options for one's own file, as Files gives them */
      file: function (f, close) {
        var inWs = fileIn(f.id);
        return { item: Object.assign({}, f, { sharedWith: inWs.map(function (w) { return w.name; }), links: IK.wsLinks(inWs) }), opts: {
          onDownload: function () { D.toast('Download started'); },
          /* a new chat with the file in it, as Files' Add to Chat */
          onAddToChat: function () { location.assign(IK.wsHref('approved/chat-landing.html', { attach: f.name, w: null, tab: null })); },
          onDelete: function () { closeRef.current = close; setDelF([f]); },
          onShare: function () { setShareF([stored(f)]); }, shareLocked: free,
          onRemoveFromWorkspace: function (it) {
            ws.unshareFile(it.id, f.id);
            D.toast.success(h(IK.Fragment, null, bold(f.name), ' removed from ' + it.name));
          } } };
      },
      shareFiles: function (list) { setShareF(list.map(stored)); },
      deleteFiles: function (list, close) { closeRef.current = close || null; setDelF(list); },
      createMetric: function (c) { setMxFor({ c: c || null }); },
      dialogs: h(IK.Fragment, null,
        h(IK.MxMetricDialog, {
          open: !!mxFor, mode: 'create',
          initial: mxFor && mxFor.c ? { connector: mxFor.c.label, link: 'connection' } : {},
          options: IK.WS_CONNECTIONS.map(function (x) { return { id: x.label, label: x.label + ' (' + x.name + ')' }; }),
          findDuplicates: function () { return { name: null, alias: null }; },
          onOpenChange: function (v) { if (!v) setMxFor(null); },
          onSave: function (v) {
            var k = IK.WS_CONNECTIONS.filter(function (x) { return x.label === v.connector; })[0] || (mxFor && mxFor.c);
            setMxFor(null);
            if (k) ws.addMetric(k.id, { name: v.name, alias: v.alias, desc: v.def });
            var see = o && o.seeMetrics ? o.seeMetrics() : null;
            D.toast.success(h(IK.Fragment, null, bold(v.name), ' is added to ', bold(k ? k.label : 'Metrics')), see ? {
              description: h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); see(); } }, 'See it in Metrics') } : undefined);
          }
        }),
        h(IK.DsEditConnectionDialog, {
          open: !!editC, label: editC && editC.label, desc: editC && (editC.desc || ''),
          onOpenChange: function (v) { if (!v) setEditC(null); },
          onSave: function (v) { var c = editC; setEditC(null); ws.updateConnection(c.id, { label: v.label, desc: v.desc }); }
        }),
        h(IK.DsDisconnectDialog, {
          open: !!discC, label: discC && discC.label,
          sharedIn: discC ? connIn(discC.id).map(function (w) { return w.name; }) : [],
          onOpenChange: function (v) { if (!v) setDiscC(null); },
          onConfirm: function () {
            var c = discC; setDiscC(null); ws.disconnect(c.id); if (closeRef.current) closeRef.current();
            D.toast.success(h(IK.Fragment, null, bold(c.label), ' disconnected'));
          }
        }),
        h(IK.WsAddToWorkspacesDialog, {
          open: !!shareC, onOpenChange: function (v) { if (!v) setShareC(null); }, connection: shareC, workspaces: ws.owned, createLocked: free,
          taken: function (n) { return IK.wsNameTaken(ws.list, n); }, onCreate: function (n, d) { return ws.create(n, d); },
          onAdd: function (ids) {
            var c = shareC; ids.forEach(function (id) { ws.addConnections(id, [c]); }); setShareC(null);
            D.toast.success(h(IK.Fragment, null, bold(c.label), ' added to ' + names(ids)), { description: IK.wsGoLink(ws, ids) });
          }
        }),
        h(IK.WsShareFileDialog, {
          open: !!shareF, onOpenChange: function (v) { if (!v) setShareF(null); }, files: shareF || [], workspaces: ws.owned, createLocked: free,
          taken: function (n) { return IK.wsNameTaken(ws.list, n); }, onCreate: function (n, d) { return ws.create(n, d); },
          onShare: function (ids) {
            var list = shareF; setShareF(null);
            ids.forEach(function (id) { var w = ws.find(id); list.forEach(function (f) { if (!w || !w.files.some(function (x) { return x.id === f.id; })) ws.shareFile(id, f); }); });
            D.toast.success(h(IK.Fragment, null, list.length === 1 ? bold(list[0].name) : list.length + ' files', ' added to ' + names(ids)), { description: IK.wsGoLink(ws, ids) });
          }
        }),
        h(IK.DsDeleteFilesDialog, {
          open: !!delF, count: delF ? delF.length : 1, onOpenChange: function (v) { if (!v) setDelF(null); },
          onConfirm: function () {
            var list = delF; setDelF(null); list.forEach(function (f) { ws.deleteFile(f.id); }); if (closeRef.current) closeRef.current();
            D.toast.success(list.length === 1 ? h(IK.Fragment, null, bold(list[0].name), ' deleted') : list.length + ' files deleted');
          }
        }))
    };
  };

  /* the invitation a signed-in person sees (chat landing): Olena's Analytics guild, not joined yet */
  /* IK.WsInvitationNotice({ ws: the store, invitation, state: 'pending'|'wrong'|'expired'|'blocked', onAccepted }) — the
     invitation where shared things show (user, 2026-10-20: "повідомлення мало давати інформацію що пошерили
     воркспейс і треба акцепт"): the chat (rule 15) and Data Sources, Files, Metrics. Accept joins it, says so,
     and calls onAccepted (the page clears the review switch) */
  /* IK.wsInvitationToast(ws, invitation, state) — an invitation that can't be accepted, said once as a toast with
     the way forward (user, 2026-10-20: "тости краще б підійшли"): another address → Switch Account · expired →
     Ask … to Resend · the workspace unavailable → Ask … to Renew */
  IK.wsInvitationToast = function (ws, inv, state) {
    var name = String(inv.owner.name).split(' ')[0];
    function asked(desc) {
      D.toast.success(h(IK.Fragment, null, 'Email sent to ', h('span', { className: 'font-medium text-ink-primary' }, inv.owner.name)), { description: desc });
    }
    var o = { id: 'ws-invitation', duration: 10000 };
    if (state === 'wrong') D.toast.warning('This invitation is for another email address', Object.assign(o, {
      description: 'It was sent to kateryna@gmail.com, and you’re signed in as ' + ws.me.email,
      action: { label: 'Switch Account', onClick: function () { location.assign(IK.pageHref('concept/auth/login.html')); } } }));
    else if (state === 'expired') D.toast.warning('This invitation has expired', Object.assign(o, {
      description: 'Invitations are valid for 14 days',
      action: { label: 'Ask Owner to Resend', onClick: function () { asked('You’ll get a new invitation by email'); } } }));
    else if (state === 'blocked') D.toast.warning('You can’t join ' + inv.name + ' right now', Object.assign(o, {
      description: 'The workspace is unavailable. The invitation stays valid until ' + fmtDate(NOW + 12 * DAY),
      action: { label: 'Ask Owner to Renew', onClick: function () { asked('You can join once the plan is renewed'); } } }));
  };

  /* IK.WsInvitationNotice({ ws: the store, invitation, state: 'pending'|'wrong'|'expired'|'blocked', onAccepted }) — the
     invitation where shared things show (user, 2026-10-20): the chat (rule 15) and Data Sources, Files, Metrics.
     Pending: the notice with Accept Invitation (joins it, says so, calls onAccepted — the page clears the review
     switch). Any other state: no notice — a toast with its action (IK.wsInvitationToast), once */
  IK.WsInvitationNotice = function WsInvitationNotice(p) {
    var inv = p.invitation, pending = !p.state || p.state === 'pending';
    R.useEffect(function () { if (inv && !pending) IK.wsInvitationToast(p.ws, inv, p.state); }, [inv && inv.id, p.state]);
    if (!inv || !pending) return null;
    return h(IK.WsNotice, {
      className: p.className, ws: inv, kind: 'invited',
      onAccept: function () {
        p.ws.accept(inv);
        D.toast.success(h(IK.Fragment, null, 'You joined ', h('span', { className: 'font-medium text-ink-primary' }, inv.name)),
          /* what joining brought — or that it brought nothing yet */
          { description: inv.connections.length || inv.files.length ? 'Its connections, metrics and files are in your lists now, marked with the people icon' : 'Nothing is shared there yet — what ' + String(inv.owner.name).split(' ')[0] + ' adds will show in your lists' });
        if (p.onAccepted) p.onAccepted();
      }
    });
  };
  IK.wsInvitation = function (o) {
    var olena = person('olena', 'olena.petrenko@northwind.io'), me = person('me', 'kateryna.k@northwind.io');
    var inv = { id: 'guild', name: nm('guild'), role: 'member', owner: olena, status: 'active', members: [olena, me], invites: [],
                connections: [], files: [] };
    return wsView([inv], Object.assign({ plan: IK.getPlan() }, o || {}))[0];
  };

  /* ── hrefs ─────────────────────────────────────────────────────────────────────────────────── */
  var KEEP = ['ws', 'wothers', 'names', 'shared', 'trial', 'wdata', 'wshare', 'wowner', 'list', 'fav'];
  IK.wsHref = function (rel, p) {
    var u = new URL(IK.pageHref(rel)), q = new URLSearchParams(location.search);
    KEEP.forEach(function (k) { if (q.get(k) && !u.searchParams.has(k)) u.searchParams.set(k, q.get(k)); });
    Object.keys(p || {}).forEach(function (k) { if (p[k] == null) u.searchParams.delete(k); else u.searchParams.set(k, p[k]); });
    return u.href;
  };
  IK.wsHrefFor = function (w) { return IK.wsHref('approved/workspaces.html', { w: w.id }); };
  /* "12 metrics" as a way in (user, 2026-10-20: "має бути лінками з предвибраним фільтром"): Metrics with its
     Provider filter on this connection — one's own (by id or the name the person gave it) or a shared one */
  /* IK.wsGoLink(ws, ids) — the toast's way to what was just added to: "Open Support" for one workspace, "Open
     Workspaces" (the list) for several (user, 2026-10-20: "бракує можливості перейти на воркспейс") */
  IK.wsGoLink = function (ws, ids) {
    var list = (ids || []).map(function (id) { return ws.find(id); }).filter(Boolean);
    if (!list.length) return null;
    var one = list.length === 1;
    return h(D.LinkButton, { href: one ? IK.wsHrefFor(list[0]) : IK.wsHref('approved/workspaces.html', { w: null, tab: null }) },
      one ? 'Open ' + list[0].name : 'Open Workspaces');
  };
  IK.wsMetricsHref = function (c) {
    if (!c) return null;
    var mine = (IK.WS_CONNECTIONS || []).filter(function (x) { return x.id === c.id || x.label === (c.label || c.name); })[0];
    var key = c.cid ? 'ws-' + c.cid : mine ? 'own-' + mine.id : c.id ? 'ws-' + c.id : null;
    return key ? IK.wsHref('approved/metrics-landing.html', { state: 'filled', provider: 'c:' + key, w: null, tab: null }) : null;
  };
  /* { name: href } for the panel's workspace links */
  IK.wsLinks = function (ws) { var o = {}; ws.forEach(function (w) { o[w.name] = IK.wsHrefFor(w); }); return o; };

  /* ── WsSearch · WsNoMatch ── the Insightis list search (Metrics, Catalog, Chats, Workspaces):
     DevartUI InputGroup lg, the magnifier, Clear search; and its "No matches found" (StatusView).
     h(IK.WsSearch, { value, onChange(text), placeholder, label }) · h(IK.WsNoMatch, { description }) */
  IK.WsSearch = function WsSearch(p) {
    return h(D.InputGroup, { size: 'lg', role: 'search' },
      h(D.InputGroupAddon, { align: 'inline-start' }, h(IK.Icon, { name: 'search', size: 20 })),
      h(D.InputGroupInput, { type: 'search', placeholder: p.placeholder, 'aria-label': p.label || p.placeholder, value: p.value,
        onChange: function (e) { p.onChange(e.target.value); } }),
      p.value ? h(IK.Tip, { tip: 'Clear search' },
        h(D.InputGroupAction, { 'aria-label': 'Clear search', onClick: function () { p.onChange(''); } }, h(IK.Icon, { name: 'x' }))) : null);
  };
  IK.WsNoMatch = function WsNoMatch(p) {
    return h(D.StatusView, { size: 'lg', surface: 'embedded', withIconHalo: false, role: 'status', icon: h(D.EmptyStateIllustration),
      title: 'No matches found', description: p.description });
  };

  /* ── WsNames ── workspace names wherever they are mentioned, each a link to its page (user,
     2026-10-19: "воркспейси з місць згадок мають вести на воркспейс"); one line, "A · B · C" — every one its own link,
     truncated with the whole list in a tooltip; a click on a link never reaches the row under it.
     h(IK.WsNames, { names: ['Marketing', 'Brand'], links: { Marketing: href }, by, className })
     by — who shared it, before the workspaces: "Olena Petrenko · Marketing · Brand"               */
  /* IK.SharedBadge — the one "Shared" mark on everything shared with the person (Tag mode, user 2026-10-19):
     a connection's tag, a file's Type, a metric's type (beside Built-in / Custom). DevartUI Badge sm,
     neutral, with the people glyph so it never reads as Uploaded or Built-in (both neutral too).
     { by } → its tooltip says who shared it: "Shared by Olena Petrenko" (user, 2026-10-19: who shared it
     lives in the tag's tooltip, not in a column; the workspace is NOT repeated there — the Workspaces column,
     or a metric group's caption, already names it). { ws } is used only when there is no { by }. */
  IK.SharedBadge = function SharedBadge(p) {
    p = p || {};
    var badge = h(D.Badge, { variant: 'secondary', size: 'sm', leftSlot: h(IK.Icon, { name: 'ws-users', size: 12 }) }, 'Shared');
    /* who and where, on two lines — as the owner mark's tooltip (user, 2026-10-20) */
    var ws = (Array.isArray(p.ws) ? p.ws : p.ws ? String(p.ws).split(/ · | and |, /) : []).filter(Boolean);
    var tip = p.by || ws.length ? h('span', { className: 'flex flex-col gap-0.5' },
      p.by ? h('span', null, 'Shared by ', h('span', { className: 'font-semibold' }, p.by)) : null,
      ws.length ? h('span', null, 'In ' + ws.join(' · ')) : null) : null;
    return h(IK.Tip, { tip: tip || 'Shared with you', wrap: true },
      h('span', { tabIndex: 0, className: IK.cx('inline-flex shrink-0 rounded-full', D.focusRing, p.className) }, badge));
  };

  /* IK.WsUnavailableBadge({ by }) — a shared item whose workspace is Blocked: 'Unavailable' (attention), the
     reason in its tooltip, naming whose plan lapsed (Connections, Files and Metrics alike) */
  /* an unavailable shared item reads like any other — its text is not greyed (user, 2026-10-19: "не фарбувати все
     і не робити сторінку неживою") — and says why in a tooltip: the sharer's plan lapsed (muted), or the person's
     own plan doesn't include shared items (locked, { locked: true, noun: 'connections' }) */
  /* both at once — the owner's plan lapsed AND the person's own plan has no shared items (Free): both are said, and that
     they need to upgrade too, or a renewal alone would not bring it back (user, 2026-10-21: "якщо накладається і
     відсутність плану і плану в користувача треба текстом прописати що користувачу потрібно і свій план оновити") */
  function alsoMine(p) { return !p.locked && (p.free != null ? !!p.free : IK.getPlan() === 'free'); }
  /* the person's own half, said whole: why and which plan (user, 2026-10-21: 'занадто скорочено не ясно що чому і на який план') */
  /* short and said as a person would (user, 2026-10-22: 'задовгий текст і не людиночитний') */
  function ownPlan() { return 'You’re on Free, so you’ll also need Starter'; }
  IK.wsUnavailableTip = function (p) {
    p = p || {};
    if (p.locked) return 'Your plan doesn’t include shared ' + (p.noun || 'items');
    var lapsed = (p.by || 'Its owner') + '’s plan no longer includes Workspaces';
    return alsoMine(p) ? lapsed + '. ' + ownPlan(p) : lapsed;
  };
  /* IK.WsUnavailableMark({ by, locked, noun }) — the one sign of a shared row that can't be used, the same on
     Connections, Files and Metrics (user, 2026-10-19: "чому тільки на метриках а не на всіх"): a warning glyph
     right after the name, always shown, as the Workspaces list marks a Blocked workspace ("консистентність"),
     the reason in its tooltip; the row itself reads and opens as usual */
  /* the row mark's popover is IK.StatusMark (its own kit component since 2026-10-22) */
  /* a shared item that can't be used: its row mark, the Problem saying why */
  /* IK.wsMarks — how every row's mark reads, set by the page: { popover, renewal(by) }. With the review switch Panels:
     New the rows' marks open the new panels' Problem popover with the way back (user, 2026-10-21: "якщо нова панель, то
     має бути і новий ворнінг-поповер на іконку ворнінга"); renewal(by) finds the renewal for that owner's workspaces */
  IK.wsMarks = { popover: false, renewal: null };
  IK.WsUnavailableMark = function WsUnavailableMark(p) {
    /* the person's own plan includes none of them (Free): every shared one is the same, the page's plan alert says it —
       no mark on each (user, 2026-10-21: "в цьому кейсі коли фрі взагалі зайва позначка"); a mark is for the one that
       differs — its owner's plan lapsed */
    if (p.locked) return null;
    var opt = IK.wsMarks || {};
    if (!p.withAction && opt.popover) p = Object.assign({ withAction: true, renewal: !p.locked && opt.renewal ? opt.renewal(p.by) : undefined }, p);
    /* on a row: the warning glyph with a plain tooltip saying why — the Problem popover was too big for a row (user,
       2026-10-20: "на макетах верни тут тултіп поки що") */
    if (!p.withAction) return h(IK.Tip, { tip: IK.wsUnavailableTip(p), wrap: true },
      h('span', { tabIndex: 0, role: 'img', 'aria-label': IK.wsUnavailableTip(p), className: IK.cx('inline-flex flex-none rounded-sm align-middle', IK.statusTone.warning.ink, D.focusRing) },
        h(IK.Icon, { name: 'warning', size: 14 })));
    /* withAction — a details panel's name: the Problem popover with the way back under it */
    return h(IK.StatusMark, { name: p.name, description: p.description, problems: [{ kind: 'warning', text: IK.wsUnavailableReason(p) }],
      action: p.withAction ? IK.wsUnavailableAction(Object.assign({ size: 'sm' }, p)) : null });
  };
  /* IK.WsAccess({ by, names, links, inLabel, note, action }) — the one "Access" section every details panel ends
     with — Connection Details, Metric Details, the file preview (user, 2026-10-20): who shared it (a shared one),
     the workspaces it is in (or a quiet dash), a note, and the action. Labels as the panels' own fields */
  /* IK.InfoHint({ text }) — the info glyph (14px, secondary) whose tooltip says the why of the line it sits on */
  IK.InfoHint = function InfoHint(p) {
    return h(IK.Tip, { tip: p.text, wrap: true },
      h('span', { tabIndex: 0, role: 'img', 'aria-label': p.text, className: IK.cx('inline-flex shrink-0 rounded-sm text-ink-secondary', D.focusRing) },
        h(IK.Icon, { name: 'info', size: 14 })));
  };
  /* IK.WsWorkspaceList({ names, links, items }) — the workspaces an item is in, each as a row (user, 2026-10-20:
     "куди пропала інформація про власника воркспейсу" · "воркспейс можна цікавіше обіграти"): its mark (the
     layers glyph in an outlined square — a workspace is not a person, so not a round avatar), its name as
     a link to it, and under it whose it is and how many are in it ("Olena Petrenko · 3 members", "You · 3
     members"). items: [{ name, href, owner, members }] — or names, looked up in the current world */
  IK.WsWorkspaceList = function WsWorkspaceList(p) {
    var world = IK._wsList || [], L = p.links || {};
    var items = p.items || (p.names || []).map(function (n) {
      var w = world.filter(function (x) { return x.name === n; })[0];
      return { id: w ? w.id : null, name: n, href: L[n] || (w ? IK.wsHrefFor(w) : null), owner: w ? (w.role === 'owner' ? 'You' : w.owner.name) : p.by, members: w ? w.members.length : null };
    });
    /* blocks — each workspace a DevartUI Card "row" across the full width: the whole block opens it (its own rest
       border, hover, focus, press), the name in plain ink, no arrow — the block itself is the way in (user, 2026-10-21) (the details-panels concept —
       user, 2026-10-20: "попробуй на сторінці з панелями — не лінками, а блочками") */
    if (p.blocks) return h('ul', { className: 'm-0 flex list-none flex-col gap-2 p-0' }, items.map(function (it) {
      var meta = [it.owner, it.members != null ? it.members + (it.members === 1 ? ' member' : ' members') : null].filter(Boolean).join(' · ');
      function go() { if (it.href) location.assign(it.href); }
      return h('li', { key: it.name, className: 'flex min-w-0' },
        h(D.Card, { variant: 'row', role: it.href ? 'link' : undefined, tabIndex: it.href ? 0 : undefined, 'aria-label': it.href ? 'Open ' + it.name : undefined,
          className: 'w-full min-w-0', onClick: it.href ? go : undefined,
          onKeyDown: it.href ? function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } } : undefined },
          h('span', { className: 'flex size-8 shrink-0 items-center justify-center rounded-md border border-stroke text-ink-secondary', 'aria-hidden': 'true' },
            h(IK.Icon, { name: 'ws-layers', size: 16 })),
          h('span', { className: 'flex min-w-0 flex-1 flex-col' },
            h(D.TruncatedTitleTooltip, { title: it.name, getTruncationTarget: function (t) { return t; } },
              h('span', { className: 'min-w-0 truncate text-sm font-medium text-ink-primary' }, it.name)),
            meta ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'min-w-0 truncate' }, meta) : null),
          /* onRemove (one's own item): Remove from Workspace on hover, as a row's ⋮ reveals — at rest on a phone or a
             touch screen; it never opens the workspace (user, 2026-10-21: "в воркспейсах дати опцію видалення на ховер") */
          p.onRemove ? h(IK.Tip, { tip: 'Remove from ' + it.name },
            /* destructive — DevartUI's red ghost (user, 2026-10-21: "дія деструктивна") */
            h(D.IconButton, { variant: 'destructiveTertiary', size: 'xs', type: 'button', 'aria-label': 'Remove from ' + it.name,
              className: 'shrink-0 opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 focus-visible:opacity-100 max-md:opacity-100 [@media(hover:none)]:opacity-100',
              onClick: function (e) { e.stopPropagation(); p.onRemove(it); }, onKeyDown: function (e) { e.stopPropagation(); } },
              h(IK.Icon, { name: 'ws-remove' }))) : null));
    }));
    /* no plaque — the mark, the name as the link (DevartUI LinkButton, at the text's 14px), its owner and members
       under it (user, 2026-10-20: "плашки забери фон — верни свою ідею з лінком") */
    return h('ul', { className: 'm-0 flex list-none flex-col gap-3 p-0' }, items.map(function (it) {
      var meta = [it.owner, it.members != null ? it.members + (it.members === 1 ? ' member' : ' members') : null].filter(Boolean).join(' \u00b7 ');
      var body = [
        /* an outlined square, no fill (user, 2026-10-20: "забери все ж заливку") */
        h('span', { key: 'm', className: 'flex size-8 shrink-0 items-center justify-center rounded-md border border-stroke text-ink-secondary', 'aria-hidden': 'true' },
          h(IK.Icon, { name: 'ws-layers', size: 16 })),
        h('span', { key: 't', className: 'flex min-w-0 flex-1 flex-col items-start text-sm' },
          h(D.TruncatedTitleTooltip, { title: it.name, getTruncationTarget: function (t) { return t; } },
            it.href ? h(D.LinkButton, { href: it.href, className: 'min-w-0 max-w-full truncate' }, it.name)
              : h('span', { className: 'min-w-0 max-w-full truncate font-medium text-ink-primary' }, it.name)),
          meta ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'min-w-0 max-w-full truncate' }, meta) : null)];
      return h('li', { key: it.name, className: 'flex min-w-0 items-center gap-3' }, body);
    }));
  };

  IK.WsAccess = function WsAccess(p) {
    /* note — the why, in an info icon beside the label (user, 2026-10-20: "можна в інфоіконку") */
    function field(label, body, note) {
      return h('div', { className: 'flex flex-col gap-1' },
        h('span', { className: 'flex items-center gap-1' },
          h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary', className: 'uppercase tracking-wider' }, label),
          note ? IK.InfoHint({ text: note }) : null), body);
    }
    var names = p.names || [];
    return h('section', { className: 'flex flex-col gap-4 border-t border-stroke pt-5', 'aria-label': 'Access' },
      h(D.Typography, { element: 'h3', textStyle: 'title14', textColor: 'primary', className: 'm-0' }, 'Access'),
      /* each workspace with whose it is (the owner per row, so no separate Shared by); in none yet → no empty
         field, only the way to share it (user, 2026-10-20: "сенс в порожньому і одразу кнопці?") */
      p.inLabel === false
        ? (p.by ? field('Owner', h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'break-words' }, p.by)) : null)
        : names.length ? field(p.inLabel || 'Shared in', h(IK.WsWorkspaceList, { names: names, links: p.links, by: p.by }), p.note) : null,
      p.action ? h('div', { className: 'flex' }, p.action) : null);
  };

  /* IK.wsRenewal(ws, ids) — asking the Owners of these (Blocked) workspaces to renew: who, whether they were
     asked already, and the ask itself (a toast says the email went) */
  IK.wsRenewal = function (ws, ids) {
    var list = (ids || []).map(function (id) { return ws.find(id); }).filter(function (w) { return w && w.status === 'blocked'; });
    var owners = []; list.forEach(function (w) { if (owners.indexOf(w.owner.name) < 0) owners.push(w.owner.name); });
    return {
      blocked: list.length > 0, owners: owners, requested: list.length > 0 && list.every(function (w) { return w.requested; }),
      request: function () {
        list.forEach(function (w) { if (!w.requested) ws.requestRenewal(w.id); });
        D.toast.success(h(IK.Fragment, null, owners.length > 1 ? 'Emails sent to ' : 'Email sent to ', h('span', { className: 'font-medium text-ink-primary' }, IK.wsJoin(owners))),
          { description: owners.length > 1 ? 'You’ll get access back as each plan is renewed' : 'You’ll get access back once the plan is renewed' });
      }
    };
  };

  /* IK.WsUnavailableNote({ renewal, locked, noun, feature }) — what a details panel of an unavailable shared item
     ends with, as Metric Details ends a library metric with "Connect …" (user, 2026-10-19: "як по цьому зрозуміти
     що конекшн недоступний"): the sharer's plan lapsed → why, and Ask <Owner> to Renew (Request Sent once asked);
     the person's own plan → why, and Upgrade to Starter */
  /* what brings an unavailable shared item back: Ask <owner> to Renew (Request Sent once asked) when its owner's plan
     lapsed, Upgrade to Starter when one's own plan has no shared items — the Note's button and the mark's popover */
  /* the way back follows the reason the tip gives (user, 2026-10-21: "якщо твій план не включає, то чому просити Олену
     про ренью — треба апгрейднути план"): one's own plan without the module → Upgrade; the owner's plan lapsed → ask them */
  /* IK.wsUnavailableReason(p) — the reason alone, where IK.wsUnavailableAction follows it and says the person's own
     half itself (a popover, a panel's note, the file preview) */
  IK.wsUnavailableReason = function (p) { return IK.wsUnavailableTip(Object.assign({}, p, { free: false })); };
  /* both at once: Ask Owner to Renew is the action; one's own plan a quieter line under it, its link the way — a
     second button read odd (user, 2026-10-21: "виглядає дивно - потрібно було б просто дати це інфо меседжем менш
     контрастним") */
  IK.wsUnavailableAction = function (p) {
    var r = p.renewal || {}, lapsed = !p.locked;
    var owner = (r.owners && r.owners[0]) || p.by || 'Its owner';
    var up = h(IK.Locked, { key: 'up', feature: p.feature || 'connections', clickOnly: true, marker: 'none', locked: true },
      h(D.Button, { variant: 'secondary', size: p.size || 'sm', type: 'button' }, 'Upgrade to Starter'));
    if (!lapsed) return up;
    var ask = r.requested
      ? h(D.Button, { key: 'ask', variant: 'secondary', size: p.size || 'sm', type: 'button', disabled: true, leftSlot: h(IK.Icon, { name: 'check' }) }, 'Request Sent')
      : r.request ? h(D.Button, { key: 'ask', variant: 'secondary', size: p.size || 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'ws-send' }), onClick: r.request },
          askLabel(r.owners && r.owners.length ? r.owners : [owner])) : null;
    if (!alsoMine(p)) return ask;
    /* information, not a way: upgrading alone brings nothing back while the owner's plan is lapsed — short, no link
       (user, 2026-10-21: "треба коротше - це інформативне") */
    return h('div', { className: 'flex flex-col items-start gap-2' }, ask,
      h(D.Typography, { element: 'p', textStyle: 'body12', textColor: 'secondary', className: 'm-0 text-pretty' }, ownPlan(p)));
  };
  IK.WsUnavailableNote = function WsUnavailableNote(p) {
    var r = p.renewal || {}, lapsed = !p.locked;
    var owner = (r.owners && r.owners[0]) || p.by || 'Its owner', name = String(owner).split(' ')[0];
    var action = IK.wsUnavailableAction(p);
    var text = !lapsed ? 'Your plan doesn’t include shared ' + (p.noun || 'items') + '. Nothing was deleted'
      : alsoMine(p) ? owner + '’s plan no longer includes Workspaces'
      : owner + '’s plan no longer includes Workspaces. Access returns when ' + name + ' renews';
    return h(D.Alert, {
      variant: 'warning', size: 'md', role: 'note', className: 'w-full', icon: h(IK.Icon, { name: 'warning' }),
      title: 'Unavailable',
      description: h('div', { className: 'flex flex-col items-start gap-3' },
        h('span', null, text),
        action)
    });
  };

  IK.WsUnavailableBadge = function WsUnavailableBadge(p) {
    return h(IK.Tip, { tip: IK.wsUnavailableTip(p), wrap: true },
      h('span', { tabIndex: 0, className: IK.cx('inline-flex shrink-0 rounded-full', D.focusRing) },
        h(D.Badge, { variant: 'attention', size: 'sm', rounded: 'full', leftSlot: h(IK.Icon, { name: 'warning', size: 12 }) }, 'Unavailable')));
  };

  /* Shared: Owner (the third way, user 2026-10-19: "варіант з кращим юх") — whose an item is, shown the same on
     Connections, Files and Metrics: a people glyph right after the name of what was shared (one's own carries
     none), and one Owner filter on every page instead of a Shared tag or type.
     IK.WsOwnerMark({ by, ws }) — the ws-users glyph, 14px, secondary ink; its tooltip says who and where, on two
     lines: "Shared by Olena Petrenko" / "In Marketing · Brand" (user, 2026-10-20: who and in which workspace) */
  IK.WsOwnerMark = function WsOwnerMark(p) {
    var by = p.by || '';
    var ws = (Array.isArray(p.ws) ? p.ws : p.ws ? String(p.ws).split(/ · | and |, /) : []).filter(Boolean);
    var tip = h('span', { className: 'flex flex-col gap-0.5' },
      h('span', null, 'Shared by ', h('span', { className: 'font-semibold' }, by)),
      ws.length ? h('span', null, 'In ' + ws.join(' \u00b7 ')) : null);
    return h(IK.Tip, { tip: tip, wrap: true },
      /* the people glyph after the name (Drive's and Dropbox's shared mark), secondary ink — seen at a glance,
         quieter than an avatar (user, 2026-10-19: the initial bubble read wrong; the filter alone hid it) */
      h('span', { tabIndex: 0, role: 'img', className: IK.cx('inline-flex shrink-0 rounded-sm text-ink-secondary', D.focusRing), 'aria-label': 'Shared by ' + by + (ws.length ? ' in ' + ws.join(', ') : '') },
        h(IK.Icon, { name: 'ws-users', size: 14 })));
  };
  /* IK.WsFilterMenu({ label, value, options: [[value, text], …], onChange }) — a filter as a pill: "Type: All ▾",
     "Owner: Anyone ▾". Shared: Owner gives Files and Metrics two of them — Type and Owner — and Connections the
     Owner one (user, 2026-10-19). A DevartUI DropdownMenu, its trigger a secondary xs pill, the chips' size */
  /* a set filter is easy to undo (user, 2026-10-20: "фільтри мають легко скидатись"): the pill names what is
     chosen and its chevron becomes × — Clear <label> — which puts it back to its first choice (All / Anyone);
     several set → IK.WsClearFilters after the pills */
  /* the menus are controlled: a press on × marks "skip" first, so the trigger it sits in doesn't open its menu */
  function useFilterMenu(p) {
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    var skip = R.useRef(false);
    return { open: open, skip: skip, props: { open: open, modal: p.defaultOpen ? false : undefined,
      onOpenChange: function (v) { if (v && skip.current) { skip.current = false; return; } setOpen(v); } } };
  }
  function clearGlyph(label, onClear, menu) {
    return h('span', { role: 'button', tabIndex: 0, 'aria-label': 'Clear ' + label, className: IK.cx('inline-flex rounded-full', D.focusRing),
      onPointerDown: function (e) { if (menu) menu.skip.current = true; e.stopPropagation(); e.preventDefault(); },
      onClick: function (e) { e.stopPropagation(); e.preventDefault(); onClear(); },
      onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); e.preventDefault(); onClear(); } } },
      h(IK.Icon, { name: 'x', size: 14 }));
  }
  /* the chevron stays when a value is chosen — the pill still opens its menu (user, 2026-10-20: "чому зник шеврон");
     × sits before it */
  function pillEnd(set, label, onClear, menu) {
    var chev = h(IK.Icon, { name: 'chevron-down', size: 14 });
    return set ? h('span', { className: 'inline-flex items-center gap-1' }, clearGlyph(label, onClear, menu), chev) : chev;
  }
  IK.WsClearFilters = function WsClearFilters(p) {
    return p.show ? h('span', { className: 'text-sm' }, h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); p.onClear(); } }, 'Clear Filters')) : null;
  };
  IK.WsFilterMenu = function WsFilterMenu(p) {
    var opts = p.options || [], v = p.value != null ? p.value : (opts[0] && opts[0][0]);
    var cur = opts.filter(function (o) { return o[0] === v; })[0] || opts[0] || [null, ''];
    var set = opts[0] && v !== opts[0][0];
    var menu = useFilterMenu(p);
    return h(D.DropdownMenu, menu.props,
      h(D.DropdownMenuTrigger, { asChild: true },
        /* the size of the FilterChips it stands for: 28px, 12px text, 12px sides (user, 2026-10-19: 'чому такі великі') */
        h(D.Button, { variant: 'secondary', size: 'xs', rounded: 'full', type: 'button', className: 'shrink-0 px-3',
          rightSlot: pillEnd(set, p.label, function () { p.onChange(opts[0][0]); }, menu) }, p.label + ': ' + cur[1])),
      h(D.DropdownMenuContent, { align: 'start' },
        /* the composer's model menu pattern: a plain item, the name, and a check on the chosen one (user,
           2026-10-19: 'в нас був подібний патерн на моделі') */
        opts.map(function (o) {
          var on = o[0] === v;
          /* o[2]: how many it would show — the menu says what each choice holds before it is picked */
          return h(D.DropdownMenuItem, { key: o[0], role: 'menuitemradio', 'aria-checked': on ? 'true' : 'false', onSelect: function () { p.onChange(o[0]); } },
            /* the count right after the name, in brackets, quieter — (0) too (user, 2026-10-20) */
            h('span', { className: 'min-w-0 flex-1 truncate font-medium text-ink-primary' }, o[1],
              o[2] != null ? h('span', { className: 'text-xs font-normal tabular-nums text-ink-secondary' }, ' (' + o[2] + ')') : null),
            h(IK.Icon, { name: 'cmp-check', className: IK.cx('text-ink-highlight', !on && 'opacity-0') }));
        })));
  };
  /* IK.WsTreeFilter({ label, value, tree, onChange, allLabel }) — a filter pill whose menu is a hierarchy (the
     Provider filter on Metrics: each source, its connections under it): "All" first, then each source — its
     mark, its name, the count — and its connections indented beneath; a check on the chosen one. The pill
     says what is chosen ("Provider: Jira Software Cloud", "Provider: Skyvia Jira") */
  IK.WsTreeFilter = function WsTreeFilter(p) {
    var v = p.value || 'all', tree = p.tree || [], label = p.allLabel || 'All', total = 0;
    tree.forEach(function (g) { total += g.count; if (g.value === v) label = g.label; g.children.forEach(function (c) { if (c.value === v) label = c.label; }); });
    function item(o, nested, mark) {
      var on = o.value === v;
      /* one 20px slot for the mark on every row: a source's mark sits in it whatever its own size, and a
         connection gets the slot empty — so its name starts exactly under its source's (user, 2026-10-20:
         "ієрархія дуже стрибає") */
      return h(D.DropdownMenuItem, { key: o.value, role: 'menuitemradio', 'aria-checked': on ? 'true' : 'false',
        onSelect: function () { p.onChange(o.value); } },
        mark || nested ? h('span', { className: 'flex size-5 shrink-0 items-center justify-center overflow-hidden', 'aria-hidden': nested ? 'true' : undefined }, mark || null) : null,
        h('span', { className: IK.cx('min-w-0 flex-1 truncate', nested ? 'text-ink-body' : 'font-medium text-ink-primary') }, o.label,
          o.count != null ? h('span', { className: 'text-xs font-normal tabular-nums text-ink-secondary' }, ' (' + o.count + ')') : null),
        h(IK.Icon, { name: 'cmp-check', className: IK.cx('text-ink-highlight', !on && 'opacity-0') }));
    }
    var menu = useFilterMenu(p);
    return h(D.DropdownMenu, menu.props,
      h(D.DropdownMenuTrigger, { asChild: true },
        h(D.Button, { variant: 'secondary', size: 'xs', rounded: 'full', type: 'button', className: 'min-w-0 max-w-64 shrink px-3',
          rightSlot: pillEnd(v !== 'all', p.label, function () { p.onChange('all'); }, menu) }, h('span', { className: 'min-w-0 truncate' }, p.label + ': ' + label))),
      h(D.DropdownMenuContent, { align: 'start', className: 'max-h-80 w-72 overflow-y-auto scrollbar-thin' },
        item({ value: 'all', label: p.allLabel || 'All', count: total }),
        tree.length ? h(D.DropdownMenuSeparator, null) : null,
        tree.map(function (g) {
          return h(IK.Fragment, { key: g.value },
            item(g, false, h(IK.ConnectorMark, { connector: g.connector, size: 'xs' })),
            g.children.map(function (c) { return item(c, true); }));
        })));
  };
  /* IK.WsOwnerFilter({ value, onChange, counts: { me, shared } }) — "Owner: Anyone ▾": Anyone · Me · Shared with me
     (no list of people), each with how many it holds */
  IK.WsOwnerFilter = function WsOwnerFilter(p) {
    var c = p.counts || null;
    return h(IK.WsFilterMenu, { label: 'Owner', value: p.value || 'any', onChange: p.onChange,
      options: [['any', 'Anyone', c ? c.me + c.shared : null], ['me', 'Me', c ? c.me : null], ['shared', 'Shared with me', c ? c.shared : null]] });
  };
  /* does an item pass the Owner filter? by = who shared it (null for one's own) */
  IK.wsOwnerPass = function (v, by) { return !v || v === 'any' || (v === 'me' ? !by : v === 'shared' ? !!by : by === v); };

  IK.WsNames = function WsNames(p) {
    var L = p.links || {}, names = p.names || [];
    function link(n, i) {
      /* the link as plain inline text (not LinkButton's inline-flex box): an atomic box is clipped at the
         cell's edge with no ellipsis; inline, the line truncates with … like any name (user, 2026-10-19) */
      return L[n] ? h(D.LinkButton, { key: n + i, href: L[n], className: 'inline', onClick: function (e) { e.stopPropagation(); } }, n) : n;
    }
    /* the ellipsis takes the colour of the line that cuts, not of the link inside it: when the names are links
       the line is the link colour, and the author and the dots between stay secondary (user, 2026-10-19) */
    var linked = names.some(function (n) { return !!L[n]; }), quiet = linked ? 'text-ink-secondary' : undefined;
    var by = p.by ? [h('span', { key: 'by', className: quiet }, p.by), h('span', { key: 'sb', className: IK.cx('px-1', quiet), 'aria-hidden': 'true' }, '\u00b7')] : [];
    var out = by.slice();
    names.forEach(function (n, i) {
      /* a middle dot between them: "Marketing and Brand" read as one name (user, 2026-10-19) */
      if (i) out.push(h('span', { key: 's' + i, className: IK.cx('px-1', quiet), 'aria-hidden': 'true' }, '\u00b7'));
      out.push(link(n, i));
    });
    /* several that don't fit the cell: the first, and the rest as "+N" — every name in its tooltip
       (user, 2026-10-19: "якщо кілька воркспейсів не поміщаються треба групувати"). The full line is
       measured off-screen, so the group only appears when the names really overflow, and goes away
       again when the cell grows. */
    var box = R.useRef(null), full = R.useRef(null), gs = R.useState(false), grouped = gs[0], setGrouped = gs[1];
    R.useLayoutEffect(function () {
      var el = box.current, m = full.current;
      if (!el || !m || names.length < 2) { if (grouped) setGrouped(false); return; }
      function check() { var g = m.scrollWidth > el.clientWidth + 1; setGrouped(function (v) { return v === g ? v : g; }); }
      check();
      if (!window.ResizeObserver) return;
      var ro = new ResizeObserver(check); ro.observe(el);
      return function () { ro.disconnect(); };
    }, [names.join('|'), p.by]);
    var all = (p.by ? [p.by] : []).concat(names).join(' \u00b7 ');
    var measurer = names.length > 1 ? h('span', { ref: full, 'aria-hidden': 'true', className: 'pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap' }, out) : null;
    if (grouped) return h('span', { ref: box, className: IK.cx('relative flex min-w-0 items-center gap-1.5', p.className) },
      measurer,
      h('span', { className: IK.cx('min-w-0 truncate', linked && 'text-ink-highlight') }, by.concat([link(names[0], 0)])),
      /* +N opens the hidden ones (user, 2026-10-19: "мав бути клікабельним"): a DevartUI DropdownMenu, each workspace
         a row with its glyph that opens the workspace; the click never reaches the table row underneath */
      /* its tooltip names every hidden one, each on its own line (user, 2026-10-20: "а якщо 2??"); the menu
         trigger sits OUTSIDE the tooltip trigger, so both get the button (the AI connectivity cell's order) */
      h(D.DropdownMenu, null,
        h(D.Tooltip, null,
          h(D.DropdownMenuTrigger, { asChild: true },
            h(D.TooltipTrigger, { asChild: true },
              h('button', { type: 'button', className: IK.cx('inline-flex shrink-0 cursor-pointer rounded-full border-0 bg-transparent p-0', D.focusRing),
                'aria-label': 'And ' + (names.length - 1) + (names.length === 2 ? ' more workspace: ' : ' more workspaces: ') + names.slice(1).join(', '),
                onClick: function (e) { e.stopPropagation(); } },
                h(D.Badge, { variant: 'secondary', size: 'sm', rounded: 'full' }, '+' + (names.length - 1))))),
          h(D.TooltipContent, { side: 'top' },
            h('span', { className: 'flex flex-col gap-0.5' }, names.slice(1).map(function (n) { return h('span', { key: n }, n); })))),
        h(D.DropdownMenuContent, { align: 'start', onClick: function (e) { e.stopPropagation(); } },
          names.slice(1).map(function (n) {
            return h(D.DropdownMenuItem, { key: n, onSelect: L[n] ? function () { location.assign(L[n]); } : undefined },
              h(IK.Icon, { name: 'ws-layers', size: 16 }), h('span', { className: 'min-w-0 truncate' }, n));
          }))));
    /* the measuring box wraps the tooltip (TruncatedTitleTooltip takes its child's ref for itself) */
    return h('span', { ref: box, className: IK.cx('relative block min-w-0', p.className) }, measurer,
      h(D.TruncatedTitleTooltip, { title: all, getTruncationTarget: function (t) { return t; } },
        h('span', { className: IK.cx('block min-w-0 truncate', linked && 'text-ink-highlight') }, out)));
  };

  /* ── WsSharedBy ────────────────────────────────────────────────────────────────────────────── */
  IK.WsSharedBy = function WsSharedBy(p) {
    var by = p.withBy && p.by;
    return h(D.TruncatedTitleTooltip, {
      title: by ? p.by + ' · ' + p.ws : p.ws, className: p.tipClassName,
      getTruncationTarget: function (t) { return t; }
    },
      h('span', {
        className: IK.cx('flex min-w-0 items-baseline overflow-hidden whitespace-nowrap', p.className),
        'aria-label': (by ? 'Shared by ' + p.by + ' from ' : 'From ') + p.ws
      },
        by ? h(D.Typography, { element: 'span', textStyle: p.size || 'body12', textColor: 'secondary', className: 'min-w-0 shrink truncate' }, p.by) : null,
        by ? h(D.Typography, { element: 'span', textStyle: p.size || 'body12', textColor: 'secondary', className: 'shrink-0 px-1', 'aria-hidden': 'true' }, '·') : null,
        h(D.Typography, { element: 'span', textStyle: p.size || 'body12', textColor: 'secondary', className: 'min-w-0 flex-1 truncate' }, p.ws)));
  };

  /* ── WsNotice ──────────────────────────────────────────────────────────────────────────────── */
  function first(name) { return String(name || '').split(' ')[0]; }
  /* whose plan lapsed: one owner by name, two by name ("Olena Petrenko’s and Mark Shevchenko’s plans"), more as
     "their owners'" — and the ask: "Ask Owner to Renew", one owner or several (one click
     asks them all; the toast names who got the email) */
  function whosePlan(owners) {
    return owners.length === 1 ? owners[0] + '’s plan no longer includes Workspaces'
      : owners.length === 2 ? owners[0] + '’s and ' + owners[1] + '’s plans no longer include Workspaces'
      : 'Their owners’ plans no longer include Workspaces';
  }
  function askLabel(owners) {
    /* names can be long: with several owners the button says 'Owners', the sentence above names them (user, 2026-10-19) */
    /* by role, not by name (user, 2026-10-21: "овнера — не Олену"): the sentence above names who */
    /* one generic text everywhere, one owner or several (user, 2026-10-21: 'всюди кнопка мала мати дженерал текст') */
    return 'Ask Owner to Renew';
  }
  function dismiss(fn) {
    return fn ? h(IK.Tip, { tip: 'Dismiss' },
      h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Dismiss', onClick: fn }, h(IK.Icon, { name: 'ws-x' }))) : null;
  }
  function act(label, onClick, o) {
    return h(D.Button, Object.assign({ variant: 'secondary', size: 'sm', type: 'button', onClick: onClick }, o || {}), label);
  }
  /* an upgrade link inside a notice's sentence: locked → the UpgradeModal → Manage plan, as Data Sources' "Upgrade to Starter" */
  function upgradeLink(label, feature) {
    var link = h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); if (!feature) IK.goUpgrade(); } }, label);
    return feature ? h(IK.Locked, { feature: feature, clickOnly: true, marker: 'none', locked: true }, link) : link;
  }
  function fmtDate(t) { return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  IK.wsFmtDate = fmtDate;
  /* "1 minute ago", "4 hours ago", "1 day ago" — the AI connectivity list's Last activity */
  IK.wsAgo = function (t) {
    var m = Math.max(0, Math.round((Date.now() - t) / 60e3));
    if (m < 1) return 'Just now';
    if (m < 60) return m + (m === 1 ? ' minute ago' : ' minutes ago');
    var hr = Math.round(m / 60); if (hr < 24) return hr + (hr === 1 ? ' hour ago' : ' hours ago');
    var d = Math.round(hr / 24); return d + (d === 1 ? ' day ago' : ' days ago');
  };

  IK.WsNotice = function WsNotice(p) {
    var phone = D.useMaxWidth(640);
    var w = p.ws || {}, k = p.kind, a;
    /* the upgrade is a link in the sentence and the notice can be dismissed — the Insightis warning
       (Data Sources' and Metrics' "Your subscription ended …": Nothing was deleted. Upgrade to …) */
    if (k === 'blocked-owner') a = {
      variant: 'warning', icon: 'warning', title: (p.inPage ? 'This workspace' : w.name) + ' is unavailable to its members',
      description: h(IK.Fragment, null, 'Your plan no longer includes Workspaces. Nothing was deleted. ',
        upgradeLink('Upgrade to Pro', 'workspaces'), ', and members get their access back within 30 minutes.'),
      actions: dismiss(p.onDismiss)
    };
    else if (k === 'blocked-member') {
      /* one workspace, or several grouped into one notice (p.list) */
      var list = p.list && p.list.length ? p.list : [w], n = list.length;
      var names = list.map(function (x) { return x.name; }), owners = [];
      list.forEach(function (x) { if (owners.indexOf(x.owner.name) < 0) owners.push(x.owner.name); });
      var oneOwner = owners.length === 1, sent = list.every(function (x) { return x.requested; });
      var plan = whosePlan(owners) + '.';
      var back = oneOwner ? 'Access returns when ' + first(owners[0]) + ' renews' : 'Access returns when ' + (owners.length === 2 ? 'they renew' : 'their owners renew');
      a = {
        variant: 'warning', icon: 'warning',
        /* on the workspace's own page (inPage) its name is the title right above: not repeated (user, 2026-10-19) */
        title: n === 1 ? (p.inPage ? 'This workspace' : names[0]) + ' is unavailable' : n === 2 ? IK.wsJoin(names) + ' are unavailable' : n + ' workspaces are unavailable',
        description: (n > 2 ? IK.wsJoin(names) + '. ' : '') + plan + ' ' + back,
        /* on the workspace's own page asking the Owner is the only way back to its data: primary, and the notice
           stays (user, 2026-10-19); on a list it is one notice among others — secondary, dismissible */
        actions: h(IK.Fragment, null,
          sent
            ? act('Request Sent', null, { disabled: true, leftSlot: h(IK.Icon, { name: 'check' }) })
            : act(askLabel(owners), p.onRequest, { variant: p.inPage ? 'primary' : 'secondary', leftSlot: h(IK.Icon, { name: 'ws-send' }) }),
          p.inPage ? null : dismiss(p.onDismiss))
      };
    }
    /* on a list page (Connections, Metrics, Files): what of THIS page can't be used, counted, and from where
       (user, 2026-10-19: the notice is about connections here, not a list of workspaces) */
    else if (k === 'blocked-items') {
      var bl = p.list || [], bn = p.count || 0, bnames = bl.map(function (x) { return x.name; }), bowners = [];
      bl.forEach(function (x) { if (bowners.indexOf(x.owner.name) < 0) bowners.push(x.owner.name); });
      var bone = bowners.length === 1, bsent = bl.every(function (x) { return x.requested; });
      var bfrom = bnames.length <= 3 ? IK.wsJoin(bnames) : bnames.slice(0, 2).join(', ') + ' and ' + (bnames.length - 2) + ' more workspaces';
      a = {
        variant: 'warning', icon: 'warning',
        title: bn === 1 ? 'A shared ' + p.noun[0] + ' is unavailable' : bn + ' shared ' + p.noun[1] + ' are unavailable',
        /* on Free the person's own plan is the other half: said here too (user, 2026-10-21) */
        description: 'From ' + bfrom + '. ' + whosePlan(bowners) + (p.free ? '. ' + ownPlan({ noun: p.noun[1] }) : ''),
        actions: h(IK.Fragment, null,
          bsent
            ? act('Request Sent', null, { disabled: true, leftSlot: h(IK.Icon, { name: 'check' }) })
            : act(askLabel(bowners), p.onRequest, { leftSlot: h(IK.Icon, { name: 'ws-send' }) }),
          dismiss(p.onDismiss))
      };
    }
    else if (k === 'restored') a = {
      variant: 'success', icon: 'check', title: (p.inPage ? 'This workspace' : w.name) + ' is available again',
      description: w.role === 'owner'
        ? 'Members have access again'
        : undefined,
      actions: dismiss(p.onDismiss)
    };
    /* the trial, said ahead and once for both sides of the person: their own workspaces stop for
       members, what was shared with them needs a plan — a heads-up, never a threat */
    else if (k === 'trial') {
      var c = p.counts || {}, owned = p.owned || [], from = p.sharedFrom || [];
      var parts = [c.connections && c.connections + (c.connections === 1 ? ' connection' : ' connections'),
                   c.metrics && c.metrics + (c.metrics === 1 ? ' metric' : ' metrics'),
                   c.files && c.files + (c.files === 1 ? ' file' : ' files')].filter(Boolean);
      var mine = owned.length ? IK.wsJoin(owned) + (owned.length > 1 ? ' become' : ' becomes') + ' unavailable to members until you choose Pro' : '';
      var theirs = from.length && parts.length ? 'the ' + IK.wsJoin(parts) + ' shared with you from ' + IK.wsJoin(from) + ' need a plan with Connectors, Metrics and Files' : '';
      a = {
        variant: 'info', icon: 'info', title: 'Your trial ends in ' + (p.days || 3) + ' days',
        description: h(IK.Fragment, null, 'After that, ' + [mine, theirs].filter(Boolean).join(', and ') + '. Nothing will be deleted. ',
          upgradeLink('See plans'), ' to keep them available.'),
        actions: dismiss(p.onDismiss)
      };
    }
    /* a Member whose own plan lacks the module: what was shared stays listed, unusable — the plan fixes it */
    else if (k === 'shared-plan') a = {
      /* the plan's notice: the wallet illustration, as "Your subscription ended" (user, 2026-10-21) */
      variant: 'warning', illu: 'wallet', title: 'Shared ' + ({ Connectors: 'connections', Files: 'files', Metrics: 'metrics', Workspaces: 'workspaces' }[p.module] || 'items') + ' need Starter',
      description: h(IK.Fragment, null, 'Your plan doesn’t include ' + (p.module || 'Connectors') + '. ',
        upgradeLink('Upgrade to Starter', p.feature || 'connections'), ' to use them in your chats'),
      actions: dismiss(p.onDismiss)
    };
    else if (k === 'invited') a = {
      variant: 'info', icon: 'ws-users', title: w.owner.name + ' invited you to ' + w.name,
      description: 'Join to use the connections, metrics and files shared there in your own chats.',
      actions: act('Accept Invitation', p.onAccept, { variant: 'primary' })
    };
    if (!a) return null;
    /* the × never leaves the first line (user, 2026-10-22: "хрестик не мав переноситись на інший рядок"): DevartUI's
       Alert lays its actions full width under the copy below 640px — right for a button, wrong for a lone ×. So the ×
       keeps its own width there, and on a phone a button goes under the copy, in it, while the × stays up top */
    var kids = !a.actions ? [] : a.actions.type === IK.Fragment ? R.Children.toArray(a.actions.props.children) : [a.actions];
    var x = kids.filter(function (k) { return k && k.type === IK.Tip; }), btns = kids.filter(function (k) { return k && k.type !== IK.Tip; });
    var below = phone && x.length && btns.length;
    return h(D.Alert, {
      variant: a.variant, size: p.size || 'md', role: 'note', className: IK.cx('ik-ws-notice', btns.length && !x.length && 'is-wrap', p.className),
      icon: a.illu ? undefined : h(IK.Icon, { name: a.icon }), illustration: a.illu ? h(IK.Icon, { name: a.illu, size: 20 }) : undefined,
      title: a.title,
      description: below ? h(IK.Fragment, null, a.description, h('span', { className: 'mt-3 flex flex-wrap gap-2' }, btns)) : a.description,
      actions: below ? h(IK.Fragment, null, x) : (a.actions || undefined),
      actionsClassName: x.length ? 'max-sm:w-auto' : undefined
    });
  };

  /* ── the Shared parts of Data Sources, Metrics and Files ─────────────────────────────────────────
     IK.wsSharedConnections(list, { locked }) → IK.WsConnections 'shared' rows, every workspace the
       person was invited to (who · which workspace on each); a Blocked workspace's are muted
     IK.wsSharedFiles(list, { locked }) → IK.WsFiles rows, the same way
     IK.WsSharedNotices({ ws, trial, free, module, feature, kind }) — above a Shared list, once each:
       unavailable on the plan (Free) · the Blocked workspaces, grouped into ONE notice (Ask … to
       Renew asks every owner not asked yet) · the trial heads-up; each can be dismissed          */
  /* a connection or a file can be shared into several workspaces the person is in: one row, its
     workspaces joined ("Marketing and Finance"); muted only when every one of them is Blocked */
  function merged(list, kind, make) {
    var out = [], at = {};
    list.forEach(function (w) {
      if (w.role !== 'member') return;
      w[kind].forEach(function (x, i) {
        var k = w.owner.email + '/' + x.id, r = at[k];
        if (r) { r.wsNames.push(w.name); r.wsIds.push(w.id); r.links[w.name] = IK.wsHrefFor(w); r.wsName = IK.wsJoin(r.wsNames); r.muted = r.muted && w.status === 'blocked'; return; }
        r = make(w, x, i); r.id = k; r.wsNames = [w.name]; r.wsIds = [w.id]; r.wsName = w.name; r.by = w.owner.name; r.muted = w.status === 'blocked';
        r.links = {};
        r.links[w.name] = IK.wsHrefFor(w);
        at[k] = r; out.push(r);
      });
    });
    return out;
  }
  IK.wsSharedConnections = function (list, o) {
    o = o || {};
    return merged(list, 'connections', function (w, c, i) {
      /* desc: the owner's description travels with it (user, 2026-10-20: 'буває дескріпшн — куди пропав?') */
      return { cid: c.id, wid: w.id, name: c.name, label: c.label, desc: c.desc, metrics: Array.isArray(c.metrics) ? c.metrics.length : c.metrics,
               status: c.status || 'active', lastSync: c.lastSync || NOW - (i + 1) * 95 * 60e3, locked: !!o.locked };
    });
  };
  IK.wsSharedFiles = function (list, o) {
    o = o || {};
    return merged(list, 'files', function (w, f) {
      return { fid: f.id, wid: w.id, name: f.name, type: f.type, origin: f.kind, size: f.size,
               date: fmtDate(f.date), time: f.date, locked: !!o.locked };
    });
  };
  /* IK.WsAlertStack({ alerts }) — several notices as one group (user, 2026-10-19: "потрібне групування
     алертів"): the first in full, the rest behind "Show N More Notices" (a DevartUI tertiary xs button with
     a chevron) — the page keeps one notice's height until the person asks for the rest */
  /* the notices as a deck (user, 2026-10-19: "об'єднувати накладаючи, а потім розгортати"): the first on top, the
     others' edges peeking under it in their own colours; the edges open the pile, "Show Less" closes it */
  var KIND_VARIANT = { trial: 'info', invited: 'info', restored: 'success' };
  /* the colour of the notice an edge stands for — the invitation is info while it waits for Accept (user, 2026-10-20:
     the edge went orange under a blue one) */
  function variantOf(el) {
    var q = (el && el.props) || {};
    if (el && el.type === IK.WsInvitationNotice) return !q.state || q.state === 'pending' ? 'info' : 'warning';
    return q.variant || KIND_VARIANT[q.kind] || 'warning';
  }
  var EDGE = { warning: 'border-alert-border-warning bg-alert-bg-warning', info: 'border-alert-border-info bg-alert-bg-info',
               success: 'border-alert-border-success bg-alert-bg-success', error: 'border-alert-border-error bg-alert-bg-error' };
  IK.WsAlertStack = function WsAlertStack(p) {
    var list = (p.alerts || []).filter(Boolean);
    var os = R.useState(false), open = os[0], setOpen = os[1];
    if (list.length < 2) return list[0] || null;
    var rest = list.length - 1, more = 'Show ' + rest + ' more ' + (rest === 1 ? 'notice' : 'notices');
    if (open) return h('div', { className: 'flex flex-col gap-3' }, list,
      h('div', { className: 'flex' },
        h(D.Button, { variant: 'tertiary', size: 'xs', type: 'button', className: '-my-1', 'aria-expanded': true,
          rightSlot: h(IK.Icon, { name: 'chevron-down', size: 14, style: { transform: 'rotate(180deg)' } }),
          onClick: function () { setOpen(false); } }, 'Show Less')));
    /* the others' cards lie behind the first, each 6px lower and 12px narrower a side — only their bottom edges show
       (user, 2026-10-19: 'погано накладаються'); an edge opens the pile (WsAlertStack in Workspaces.css) */
    var edges = list.slice(1, 3);
    return h('div', { className: 'ik-ws-deck', 'data-count': edges.length },
      h('div', { className: 'ik-ws-deck-top' }, list[0]),
      /* the edges open the pile — no extra button (user, 2026-10-19: 'кнопка виглядає зайвою'): they spread and
         brighten on hover, the first takes the focus and names what it opens */
      edges.map(function (el, i) {
        return h('button', { key: i, type: 'button', 'data-depth': i + 1, onClick: function () { setOpen(true); },
          'aria-expanded': i ? undefined : false, 'aria-label': i ? undefined : more, 'aria-hidden': i ? 'true' : undefined, tabIndex: i ? -1 : undefined,
          className: IK.cx('ik-ws-deck-edge rounded-lg border', EDGE[variantOf(el)] || EDGE.warning, !i && D.focusRing) });
      }));
  };

  IK.WsSharedNotices = function WsSharedNotices(p) {
    var ws = p.ws, shared = ws.shared;
    /* what of this page's kind can't be used because its workspace is Blocked — counted from the rows */
    var kind = p.module === 'Files' ? 'files' : p.module === 'Metrics' ? 'metrics' : 'connections';
    var noun = { connections: ['connection', 'connections'], files: ['file', 'files'], metrics: ['metric', 'metrics'] }[kind];
    var dead = (kind === 'files' ? IK.wsSharedFiles(ws.list) : IK.wsSharedConnections(ws.list)).filter(function (r) { return r.muted; });
    var deadN = kind === 'metrics' ? dead.reduce(function (a, r) { return a + (r.metrics || 0); }, 0) : dead.length;
    var deadWs = {}; dead.forEach(function (r) { (r.wsIds || []).forEach(function (id) { deadWs[id] = true; }); });
    var blocked = shared.filter(function (w) { return w.status === 'blocked' && deadWs[w.id]; });
    var of = R.useState({}), off = of[0], setOff = of[1];
    function dismiss(k) { return function () { var o = Object.assign({}, off); o[k] = true; setOff(o); }; }
    var counts = { connections: 0, metrics: 0, files: 0 };
    shared.forEach(function (w) {
      counts.connections += w.connections.length; counts.files += w.files.length;
      w.connections.forEach(function (c) { counts.metrics += Array.isArray(c.metrics) ? c.metrics.length : (c.metrics || 0); });
    });
    var out = [
      /* planCovered: the page's own "Your subscription ended … Upgrade to Starter" already says it, shared ones
         included — one upgrade notice, not two (user, 2026-10-19: "можуть об'єднатись") */
      p.free && !p.planCovered && !off.plan ? h(IK.WsNotice, { key: 'plan', kind: 'shared-plan', module: p.module, feature: p.feature, onDismiss: dismiss('plan') }) : null
    /* with the new panels the rows' warning marks say it, each with its way back in the popover — no notice on top
       (user, 2026-10-21: 'з новою панеллю не потрібен алерт про недоступність чужих - це позначено трикутником') */
    ].concat(deadN && blocked.length && !off.b && !(IK.wsMarks && IK.wsMarks.popover) ? [h(IK.WsNotice, { key: 'b', kind: 'blocked-items', count: deadN, noun: noun, list: blocked, free: p.free, onDismiss: dismiss('b'), onRequest: function () {
      var todo = blocked.filter(function (w) { return !w.requested; }), who = [];
      todo.forEach(function (w) { ws.requestRenewal(w.id); if (who.indexOf(w.owner.name) < 0) who.push(w.owner.name); });
      D.toast.success(h(IK.Fragment, null, who.length > 1 ? 'Emails sent to ' : 'Email sent to ', h('span', { className: 'font-medium text-ink-primary' }, IK.wsJoin(who))), { description: who.length > 1 ? 'You’ll get access back as each plan is renewed' : 'You’ll get access back once the plan is renewed' });
    } })] : []).concat([
      p.trial && !p.free && !off.t ? h(IK.WsNotice, { key: 't', kind: 'trial', sharedFrom: shared.map(function (w) { return w.name; }).slice(0, 3), counts: counts, onDismiss: dismiss('t') }) : null
    ]).filter(Boolean);
    /* the page's own notices (p.before — e.g. "Your subscription ended") lead the stack */
    return h(IK.WsAlertStack, { alerts: (p.before || []).filter(Boolean).concat(out) });
  };
})();
