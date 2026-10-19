/* Onboarding — the new user's first run: the state it keeps, its data, and the way between its
   screens (the brief: "ТЗ: Онбординг нового пользователя Insightis", 2026-10-07). No UI here —
   the screens are IK.OnbSetup / IK.OnbSourcePicker (steps 1–3, concept/onboarding.html) and
   IK.OnbTour over the real Metrics and Chat pages (steps 4–5).

   The flow, one numbering end to end:
     1 Role · 2 Goals · 3 Data source · 4 Metrics · 5 Chat        a connector was connected
     1 Role · 2 Goals · 3 Data source · 4 Chat                    files, or Skip for Now on step 3

   IK.onboarding — the state the brief keeps on the user (here: sessionStorage, so it survives the
   hop between pages; a deep link seeds it from the URL instead):
     { status: 'not_started' | 'in_progress' | 'completed' | 'skipped',
       step: 'role' | 'goals' | 'source' | 'tour_metrics' | 'tour_chat',
       role: id | null, goals: [id], sourceKind: 'connector' | 'files' | 'none' | null,
       source: { id, name, label } | null, files: [name] }
     IK.onboarding.get() · .set(patch) · .reset() · IK.useOnboarding() → [state, set]

   IK.onbPath(state)            'conn' | 'files' | 'skip' — which branch of the flow
   IK.onbProgress(path)         [{ id, label }] for D.StepProgress (5 or 4 steps)
   IK.onbHref(step, q)          the page of a step: 'role' | 'goals' | 'source' → concept/onboarding.html,
                                'metrics' → approved/metrics-landing.html, 'chat' → approved/chat-landing.html,
                                'done' → the new chat after the tour (onboarding over, its source in place);
                                q = { path, source, role } travels in the URL (deep links work)
   IK.onbBuiltin(sourceId)      { total, metrics: [{ name, alias, desc }] } | null
   IK.useTypedPlaceholder(lines, on)  the role's example questions typed letter by letter

   Data: IK.ONB_ROLES · IK.ONB_GOALS ([id, title, description, icon]) · IK.ONB_PROMPTS (by role) ·
   IK.ONB_CATS · IK.ONB_SOURCES (popular first) · IK.ONB_BUILTIN. Copy is the brief's, verbatim. */
(function () {
  'use strict';
  var IK = window.InsightisKit, R = window.React;

  /* lucide, as the brief names them */
  IK.defineIcons({
    'onb-crown': '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
    'onb-trending-up': '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    'onb-megaphone': '<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/>',
    'onb-coins': '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    'onb-box': '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    'onb-chart-pie': '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
    'onb-settings-2': '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
    'onb-target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'onb-chart-line': '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    'onb-file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    'onb-message-circle-question': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    'onb-bell-ring': '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/>',
    'onb-message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'onb-workflow': '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
    'onb-upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    'onb-file': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>'
  });

  IK.ONB_ROLES = [
    ['exec', 'Founder or executive', 'Company-wide KPIs and growth', 'onb-crown'],
    ['sales', 'Sales', 'Pipeline, deals and forecasts', 'onb-trending-up'],
    ['marketing', 'Marketing', 'Campaigns, leads and spend', 'onb-megaphone'],
    ['finance', 'Finance', 'Revenue, costs and cash', 'onb-coins'],
    ['product', 'Product', 'Usage, adoption and retention', 'onb-box'],
    ['data', 'Data & analytics', 'Reporting and ad-hoc analysis', 'onb-chart-pie'],
    ['ops', 'Operations', 'Processes, orders and support', 'onb-settings-2'],
    ['other', 'Something else', 'We will keep things general', 'ellipsis']
  ];
  IK.ONB_GOALS = [
    ['kpi', 'Track key metrics', 'Keep an eye on the numbers that matter', 'onb-target'],
    ['trends', 'Spot trends and anomalies', 'Learn what changed and why', 'onb-chart-line'],
    ['reports', 'Build reports for my team', 'Share answers as charts and tables', 'onb-file-text'],
    ['adhoc', 'Ask ad-hoc questions', 'Get answers without writing SQL', 'onb-message-circle-question'],
    ['forecast', 'Forecast and plan', 'Project revenue, demand or budget', 'onb-trending-up'],
    ['alerts', 'Get alerted about changes', 'Hear about it when a metric moves', 'onb-bell-ring']
  ];
  IK.ONB_PROMPTS = {
    exec: ['How did revenue change vs last quarter?', 'What needs my attention this week?'],
    sales: ['Which deals are at risk this month?', 'Show win rate by sales rep'],
    marketing: ['Which campaigns had the best ROAS?', 'Show leads by channel for the last 30 days'],
    finance: ['How did MRR change month over month?', 'Show revenue by product line'],
    product: ['Which features drive retention?', 'Show the weekly active users trend'],
    data: ['Find anomalies in last week’s numbers', 'Compare this month with last month'],
    ops: ['Where are orders getting delayed?', 'Show resolution time by team'],
    other: ['What needs my attention?', 'Show key trends']
  };

  /* ── state ── */
  var KEY = 'insightis.onboarding';
  var EMPTY = { status: 'not_started', step: 'role', role: null, goals: [], sourceKind: null, source: null, files: [] };
  var subs = [];
  function read() {
    try { var v = JSON.parse(sessionStorage.getItem(KEY) || 'null'); return v ? Object.assign({}, EMPTY, v) : Object.assign({}, EMPTY); }
    catch (e) { return Object.assign({}, EMPTY); }
  }
  var cur = read();
  function write(next) {
    cur = next;
    try { sessionStorage.setItem(KEY, JSON.stringify(cur)); } catch (e) {}
    subs.slice().forEach(function (fn) { fn(cur); });
  }
  IK.onboarding = {
    get: function () { return cur; },
    set: function (patch) { write(Object.assign({}, cur, typeof patch === 'function' ? patch(cur) : patch)); },
    reset: function () { write(Object.assign({}, EMPTY)); }
  };
  IK.useOnboarding = function () {
    var s = R.useState(cur), v = s[0], setV = s[1];
    R.useEffect(function () {
      subs.push(setV); setV(cur);
      return function () { subs = subs.filter(function (f) { return f !== setV; }); };
    }, []);
    return [v, IK.onboarding.set];
  };

  /* ── the flow ── */
  IK.onbPath = function (s) { return s.sourceKind === 'connector' ? 'conn' : s.sourceKind === 'files' ? 'files' : 'skip'; };
  IK.onbProgress = function (path) {
    var steps = [{ id: 'role', label: 'Role' }, { id: 'goals', label: 'Goals' }, { id: 'source', label: 'Data source' }];
    if (path !== 'files' && path !== 'skip') steps.push({ id: 'metrics', label: 'Metrics' });
    steps.push({ id: 'chat', label: 'Chat' });
    return steps;
  };
  var PAGE = { role: 'concept/onboarding.html', goals: 'concept/onboarding.html', source: 'concept/onboarding.html',
               metrics: 'approved/metrics-landing.html', chat: 'approved/chat-landing.html', done: 'approved/chat-landing.html' };
  IK.onbHref = function (step, q) {
    q = q || {};
    var u = new URL(IK.pageHref(PAGE[step] || PAGE.role));
    if (PAGE[step] === PAGE.role) u.searchParams.set('step', step);
    else u.searchParams.set('onb', step);
    ['path', 'source', 'role'].forEach(function (k) { if (q[k]) u.searchParams.set(k, q[k]); });
    return u.href;
  };

  IK.onbSource = function (id) {
    for (var i = 0; i < IK.ONB_SOURCES.length; i++) if (IK.ONB_SOURCES[i].id === id) return IK.ONB_SOURCES[i];
    return null;
  };
  IK.onbBuiltin = function (id) { var s = IK.onbSource(id); return IK.ONB_BUILTIN[id] || (s && IK.ONB_BUILTIN[s.sprite]) || null; };

  /* The role's example questions, typed into a placeholder letter by letter and held, in turn. */
  IK.useTypedPlaceholder = function (lines, on) {
    var s = R.useState(''), text = s[0], setText = s[1];
    R.useEffect(function () {
      if (!on || !lines || !lines.length) { setText(''); return; }
      var li = 0, ci = 0, hold = 0;
      var t = setInterval(function () {
        if (hold > 0) { if (!--hold) { li = (li + 1) % lines.length; ci = 0; } return; }
        var line = lines[li]; ci++;
        setText(line.slice(0, ci) + (ci < line.length ? '|' : ''));
        if (ci >= line.length) hold = 28;
      }, 45);
      return function () { clearInterval(t); };
    }, [on, (lines || []).join('\n')]);
    return text;
  };

  /* ── data (generated from the onboarding concept's data.js: the app's connector list with its
     categories and popular flags, and a sample of each source's built-in metrics) ── */
  IK.ONB_CATS = ["Business Intelligence","Commerce","Communication","IT Operations","Marketing","Productivity","Sales & CRM","Storage & Files","Support","Other"];
  IK.ONB_SOURCES = [
    {"id":"rst_github","name":"GitHub","cat":"IT Operations","popular":true,"sprite":"rst_github","dark":false},
    {"id":"googleanalytics","name":"Google Analytics","cat":"Business Intelligence","popular":true,"sprite":"googleanalytics","dark":false},
    {"id":"bigquery","name":"Google BigQuery","cat":"IT Operations","popular":true,"sprite":"bigquery","dark":false},
    {"id":"googlesheets","name":"Google Sheets","cat":"Productivity","popular":true,"sprite":"googlesheets","dark":false},
    {"id":"hubspot","name":"HubSpot","cat":"Sales & CRM","popular":true,"sprite":"hubspot","dark":false},
    {"id":"mailchimp","name":"Mailchimp","cat":"Marketing","popular":true,"sprite":"mailchimp","dark":true},
    {"id":"mysql","name":"MySQL","cat":"IT Operations","popular":true,"sprite":"mysql","dark":false},
    {"id":"oracle","name":"Oracle","cat":"IT Operations","popular":true,"sprite":"oracle","dark":false},
    {"id":"postgresql","name":"PostgreSQL","cat":"IT Operations","popular":true,"sprite":"postgresql","dark":false},
    {"id":"redshift","name":"Redshift","cat":"IT Operations","popular":true,"sprite":"redshift","dark":false},
    {"id":"salesforce","name":"Salesforce","cat":"Sales & CRM","popular":true,"sprite":"salesforce","dark":false},
    {"id":"rst_slack","name":"Slack","cat":"Communication","popular":true,"sprite":"rst_slack","dark":false},
    {"id":"snowflake","name":"Snowflake","cat":"IT Operations","popular":true,"sprite":"snowflake","dark":false},
    {"id":"sqlserver","name":"SQL Server","cat":"IT Operations","popular":true,"sprite":"sqlserver","dark":false},
    {"id":"stripe","name":"Stripe","cat":"Commerce","popular":true,"sprite":"stripe","dark":false},
    {"id":"activecampaign","name":"ActiveCampaign","cat":"Marketing","popular":false,"sprite":"activecampaign","dark":false},
    {"id":"rst_acuityscheduling","name":"Acuity Scheduling","cat":"Sales & CRM","popular":false,"sprite":"rst_acuityscheduling","dark":false},
    {"id":"acumatica","name":"Acumatica","cat":"Commerce","popular":false,"sprite":"acumatica","dark":false},
    {"id":"hbr_affinity","name":"Affinity","cat":"Sales & CRM","popular":false,"sprite":"hbr_affinity","dark":false},
    {"id":"rst_aftership","name":"AfterShip","cat":"Commerce","popular":false,"sprite":"rst_aftership","dark":false},
    {"id":"hbr_agile_crm","name":"Agile CRM","cat":"Sales & CRM","popular":false,"sprite":"hbr_agile_crm","dark":false},
    {"id":"rst_aha","name":"Aha!","cat":"Productivity","popular":false,"sprite":"rst_aha","dark":false},
    {"id":"airtable","name":"Airtable","cat":"Other","popular":false,"sprite":"airtable","dark":false},
    {"id":"alloydb","name":"AlloyDB","cat":"IT Operations","popular":false,"sprite":"alloydb","dark":false},
    {"id":"amplitude","name":"Amplitude","cat":"Business Intelligence","popular":false,"sprite":"amplitude","dark":false},
    {"id":"asana","name":"Asana","cat":"Productivity","popular":false,"sprite":"asana","dark":false},
    {"id":"avalara","name":"Avalara","cat":"Commerce","popular":false,"sprite":"avalara","dark":false},
    {"id":"hbr_aweber","name":"AWeber","cat":"Marketing","popular":false,"sprite":"hbr_aweber","dark":false},
    {"id":"hbr_azure_app_insights","name":"Azure Application Insights","cat":"IT Operations","popular":false,"sprite":"hbr_azure_app_insights","dark":false},
    {"id":"hbr_azure_devops","name":"Azure DevOps","cat":"IT Operations","popular":false,"sprite":"hbr_azure_devops","dark":true},
    {"id":"azuredwh","name":"Azure Synapse Analytics","cat":"IT Operations","popular":false,"sprite":"azuredwh","dark":false},
    {"id":"bamboohr","name":"BambooHR","cat":"Other","popular":false,"sprite":"bamboohr","dark":false},
    {"id":"bigcommerce","name":"BigCommerce","cat":"Commerce","popular":false,"sprite":"bigcommerce","dark":true},
    {"id":"hbr_booqable","name":"Booqable","cat":"Commerce","popular":false,"sprite":"hbr_booqable","dark":true},
    {"id":"hbr_sendinblue","name":"Brevo","cat":"Marketing","popular":false,"sprite":"hbr_sendinblue","dark":false},
    {"id":"rst_calendly","name":"Calendly","cat":"Sales & CRM","popular":false,"sprite":"rst_calendly","dark":false},
    {"id":"rst_callrail","name":"CallRail","cat":"Marketing","popular":false,"sprite":"rst_callrail","dark":false},
    {"id":"hbr_campaign_monitor","name":"Campaign Monitor","cat":"Marketing","popular":false,"sprite":"hbr_campaign_monitor","dark":false},
    {"id":"rst_capsule","name":"Capsule","cat":"Sales & CRM","popular":false,"sprite":"rst_capsule","dark":false},
    {"id":"hbr_chargebee","name":"Chargebee","cat":"Commerce","popular":false,"sprite":"hbr_chargebee","dark":false},
    {"id":"hbr_chargeover","name":"ChargeOver","cat":"Commerce","popular":false,"sprite":"hbr_chargeover","dark":false},
    {"id":"hbr_chartmogul","name":"ChartMogul","cat":"Commerce","popular":false,"sprite":"hbr_chartmogul","dark":false},
    {"id":"dearinventory","name":"Cin7 Core Inventory","cat":"Commerce","popular":false,"sprite":"dearinventory","dark":false},
    {"id":"hbr_cleverreach","name":"CleverReach","cat":"Marketing","popular":false,"sprite":"hbr_cleverreach","dark":false},
    {"id":"hbr_clicksend","name":"ClickSend","cat":"Communication","popular":false,"sprite":"hbr_clicksend","dark":false},
    {"id":"hbr_clickup","name":"ClickUp","cat":"Productivity","popular":false,"sprite":"hbr_clickup","dark":false},
    {"id":"hbr_clockify","name":"Clockify","cat":"Productivity","popular":false,"sprite":"hbr_clockify","dark":false},
    {"id":"hbr_close","name":"Close","cat":"Sales & CRM","popular":false,"sprite":"hbr_close","dark":false},
    {"id":"rst_confluence_cloud","name":"Confluence Cloud","cat":"Productivity","popular":false,"sprite":"rst_confluence_cloud","dark":false},
    {"id":"hbr_constantcontact","name":"Constant Contact","cat":"Marketing","popular":false,"sprite":"hbr_constantcontact","dark":false},
    {"id":"hbr_customerio","name":"Customer.io","cat":"Marketing","popular":false,"sprite":"hbr_customerio","dark":false},
    {"id":"databricks","name":"Databricks","cat":"IT Operations","popular":false,"sprite":"databricks","dark":false},
    {"id":"rst_delighted","name":"Delighted","cat":"Sales & CRM","popular":false,"sprite":"rst_delighted","dark":false},
    {"id":"hbr_digitalocean","name":"DigitalOcean","cat":"IT Operations","popular":false,"sprite":"hbr_digitalocean","dark":false},
    {"id":"hbr_discourse","name":"Discourse","cat":"Communication","popular":false,"sprite":"hbr_discourse","dark":false},
    {"id":"rst_drip","name":"Drip","cat":"Marketing","popular":false,"sprite":"rst_drip","dark":false},
    {"id":"dynamicscrm","name":"Dynamics 365","cat":"Sales & CRM","popular":false,"sprite":"dynamicscrm","dark":false},
    {"id":"d365businesscentral","name":"Dynamics 365 Business Central","cat":"Sales & CRM","popular":false,"sprite":"d365businesscentral","dark":false},
    {"id":"dynamics365finops","name":"Dynamics 365 Finance & Ops","cat":"Sales & CRM","popular":false,"sprite":"dynamics365finops","dark":false},
    {"id":"elasticsearch","name":"Elasticsearch","cat":"IT Operations","popular":false,"sprite":"elasticsearch","dark":false},
    {"id":"emailoctopus","name":"EmailOctopus","cat":"Marketing","popular":false,"sprite":"emailoctopus","dark":true},
    {"id":"rst_everhour","name":"Everhour","cat":"Productivity","popular":false,"sprite":"rst_everhour","dark":false},
    {"id":"exactonline","name":"Exact Online","cat":"Commerce","popular":false,"sprite":"exactonline","dark":false},
    {"id":"excelonline","name":"Excel Online","cat":"Productivity","popular":false,"sprite":"excelonline","dark":false},
    {"id":"facebookads","name":"Facebook Ads","cat":"Marketing","popular":false,"sprite":"facebookads","dark":false},
    {"id":"facebookpages","name":"Facebook Pages","cat":"Marketing","popular":false,"sprite":"facebookpages","dark":false},
    {"id":"firefliesai","name":"Fireflies.ai","cat":"Other","popular":false,"sprite":"firefliesai","dark":false},
    {"id":"rst_float","name":"Float","cat":"Productivity","popular":false,"sprite":"rst_float","dark":false},
    {"id":"hbr_followupboss","name":"Follow Up Boss","cat":"Sales & CRM","popular":false,"sprite":"hbr_followupboss","dark":false},
    {"id":"hbr_formcrafts","name":"FormCrafts","cat":"Sales & CRM","popular":false,"sprite":"hbr_formcrafts","dark":false},
    {"id":"rst_formstack","name":"Formstack","cat":"Sales & CRM","popular":false,"sprite":"rst_formstack","dark":false},
    {"id":"rst_formstack_documents","name":"Formstack Documents","cat":"Sales & CRM","popular":false,"sprite":"rst_formstack_documents","dark":true},
    {"id":"freshbooks","name":"FreshBooks","cat":"Commerce","popular":false,"sprite":"freshbooks","dark":false},
    {"id":"freshdesk","name":"Freshdesk","cat":"Support","popular":false,"sprite":"freshdesk","dark":false},
    {"id":"freshsales","name":"Freshsales Classic","cat":"Sales & CRM","popular":false,"sprite":"freshsales","dark":false},
    {"id":"hbr_freshsales_suite","name":"Freshsales Suite","cat":"Sales & CRM","popular":false,"sprite":"hbr_freshsales_suite","dark":false},
    {"id":"hbr_freshservice","name":"Freshservice","cat":"Support","popular":false,"sprite":"hbr_freshservice","dark":false},
    {"id":"hbr_front","name":"Front","cat":"Communication","popular":false,"sprite":"hbr_front","dark":true},
    {"id":"hbr_fullstory","name":"FullStory","cat":"Business Intelligence","popular":false,"sprite":"hbr_fullstory","dark":true},
    {"id":"googleapps","name":"G Suite","cat":"Other","popular":false,"sprite":"googleapps","dark":false},
    {"id":"hbr_getresponse","name":"GetResponse","cat":"Marketing","popular":false,"sprite":"hbr_getresponse","dark":false},
    {"id":"hbr_gmail","name":"Gmail","cat":"Communication","popular":false,"sprite":"hbr_gmail","dark":false},
    {"id":"hbr_gong","name":"Gong","cat":"Support","popular":false,"sprite":"hbr_gong","dark":false},
    {"id":"googleads","name":"Google Ads","cat":"Marketing","popular":false,"sprite":"googleads","dark":false},
    {"id":"googleanalytics_v4","name":"Google Analytics 4","cat":"Business Intelligence","popular":false,"sprite":"googleanalytics_v4","dark":false},
    {"id":"graphql","name":"GraphQL","cat":"IT Operations","popular":false,"sprite":"graphql","dark":true},
    {"id":"hbr_greenhouse","name":"Greenhouse","cat":"Other","popular":false,"sprite":"hbr_greenhouse","dark":false},
    {"id":"rst_harvest","name":"Harvest","cat":"Productivity","popular":false,"sprite":"rst_harvest","dark":false},
    {"id":"hbr_helpscout","name":"Help Scout","cat":"Support","popular":false,"sprite":"hbr_helpscout","dark":false},
    {"id":"hbr_helpdesk","name":"HelpDesk","cat":"Support","popular":false,"sprite":"hbr_helpdesk","dark":false},
    {"id":"heymarket","name":"Heymarket","cat":"Communication","popular":false,"sprite":"heymarket","dark":false},
    {"id":"hbr_hive","name":"Hive","cat":"Productivity","popular":false,"sprite":"hbr_hive","dark":false},
    {"id":"hubdb","name":"HubDB","cat":"IT Operations","popular":false,"sprite":"hubdb","dark":false},
    {"id":"insightly","name":"Insightly CRM","cat":"Sales & CRM","popular":false,"sprite":"insightly","dark":false},
    {"id":"hbr_intercom","name":"Intercom","cat":"Support","popular":false,"sprite":"hbr_intercom","dark":true},
    {"id":"rst_iterable","name":"Iterable","cat":"Marketing","popular":false,"sprite":"rst_iterable","dark":false},
    {"id":"rst_jibble","name":"Jibble","cat":"Productivity","popular":false,"sprite":"rst_jibble","dark":false},
    {"id":"jira_new","name":"Jira","cat":"Productivity","popular":false,"sprite":"jira_new","dark":false},
    {"id":"jira","name":"Jira (deprecated)","cat":"Productivity","popular":false,"sprite":"jira","dark":false},
    {"id":"hbr_jira_service_management","name":"Jira Service Management","cat":"Support","popular":false,"sprite":"hbr_jira_service_management","dark":false},
    {"id":"hbr_jira_software_cloud","name":"Jira Software Cloud","cat":"Productivity","popular":false,"sprite":"hbr_jira_software_cloud","dark":false},
    {"id":"hbr_jotform","name":"Jotform","cat":"Sales & CRM","popular":false,"sprite":"hbr_jotform","dark":false},
    {"id":"keap","name":"Keap","cat":"Sales & CRM","popular":false,"sprite":"keap","dark":false},
    {"id":"hbr_convertkit","name":"Kit","cat":"Marketing","popular":false,"sprite":"hbr_convertkit","dark":false},
    {"id":"hbr_klaviyo","name":"Klaviyo","cat":"Marketing","popular":false,"sprite":"hbr_klaviyo","dark":false},
    {"id":"linkedinads","name":"LinkedIn Ads","cat":"Marketing","popular":false,"sprite":"linkedinads","dark":false},
    {"id":"hbr_lionobytes","name":"LionOBytes","cat":"Sales & CRM","popular":false,"sprite":"hbr_lionobytes","dark":false},
    {"id":"magento","name":"Magento","cat":"Commerce","popular":false,"sprite":"magento","dark":false},
    {"id":"hbr_mailerlite","name":"MailerLite","cat":"Marketing","popular":false,"sprite":"hbr_mailerlite","dark":false},
    {"id":"rst_mailgun","name":"Mailgun","cat":"Communication","popular":false,"sprite":"rst_mailgun","dark":false},
    {"id":"rst_mailjet","name":"Mailjet","cat":"Communication","popular":false,"sprite":"rst_mailjet","dark":false},
    {"id":"exacttarget","name":"Marketing Cloud","cat":"Marketing","popular":false,"sprite":"exacttarget","dark":false},
    {"id":"marketo","name":"Marketo","cat":"Marketing","popular":false,"sprite":"marketo","dark":false},
    {"id":"rst_chargify","name":"Maxio Advanced Billing","cat":"Commerce","popular":false,"sprite":"rst_chargify","dark":true},
    {"id":"microsoftads","name":"Microsoft Ads","cat":"Marketing","popular":false,"sprite":"microsoftads","dark":false},
    {"id":"mondaycom","name":"Monday.com","cat":"Productivity","popular":false,"sprite":"mondaycom","dark":false},
    {"id":"hbr_motion","name":"Motion","cat":"Productivity","popular":false,"sprite":"hbr_motion","dark":true},
    {"id":"hbr_myhours","name":"My Hours","cat":"Productivity","popular":false,"sprite":"hbr_myhours","dark":false},
    {"id":"netsuite","name":"NetSuite","cat":"Commerce","popular":false,"sprite":"netsuite","dark":false},
    {"id":"netsuite_v2","name":"NetSuite V2","cat":"Commerce","popular":false,"sprite":"netsuite_v2","dark":false},
    {"id":"rst_nimble","name":"Nimble","cat":"Sales & CRM","popular":false,"sprite":"rst_nimble","dark":false},
    {"id":"notion","name":"Notion","cat":"Productivity","popular":false,"sprite":"notion","dark":false},
    {"id":"rst_okta","name":"Okta","cat":"IT Operations","popular":false,"sprite":"rst_okta","dark":true},
    {"id":"rst_onfleet","name":"Onfleet","cat":"Communication","popular":false,"sprite":"rst_onfleet","dark":false},
    {"id":"rst_outbrain","name":"Outbrain","cat":"Marketing","popular":false,"sprite":"rst_outbrain","dark":false},
    {"id":"hbr_outreach","name":"Outreach","cat":"Sales & CRM","popular":false,"sprite":"hbr_outreach","dark":false},
    {"id":"hbr_paddle","name":"Paddle","cat":"Commerce","popular":false,"sprite":"hbr_paddle","dark":false},
    {"id":"hbr_pagerduty","name":"PagerDuty","cat":"Support","popular":false,"sprite":"hbr_pagerduty","dark":false},
    {"id":"hbr_paymo","name":"Paymo","cat":"Productivity","popular":false,"sprite":"hbr_paymo","dark":true},
    {"id":"hbr_persistiq","name":"PersistIQ","cat":"Sales & CRM","popular":false,"sprite":"hbr_persistiq","dark":false},
    {"id":"pinterest","name":"Pinterest","cat":"Marketing","popular":false,"sprite":"pinterest","dark":false},
    {"id":"pipedrive","name":"Pipedrive","cat":"Sales & CRM","popular":false,"sprite":"pipedrive","dark":false},
    {"id":"hbr_pipeline_crm","name":"Pipeline CRM","cat":"Sales & CRM","popular":false,"sprite":"hbr_pipeline_crm","dark":false},
    {"id":"hbr_pipeliner","name":"Pipeliner CRM","cat":"Sales & CRM","popular":false,"sprite":"hbr_pipeliner","dark":true},
    {"id":"podio","name":"Podio","cat":"Productivity","popular":false,"sprite":"podio","dark":false},
    {"id":"rst_prodpad","name":"ProdPad","cat":"Productivity","popular":false,"sprite":"rst_prodpad","dark":false},
    {"id":"hbr_productive","name":"Productive.io","cat":"Productivity","popular":false,"sprite":"hbr_productive","dark":false},
    {"id":"hbr_qualtrics","name":"Qualtrics","cat":"Sales & CRM","popular":false,"sprite":"hbr_qualtrics","dark":false},
    {"id":"quickbooksdesktop","name":"QuickBooks Desktop","cat":"Commerce","popular":false,"sprite":"quickbooksdesktop","dark":false},
    {"id":"quickbooks","name":"QuickBooks Online","cat":"Commerce","popular":false,"sprite":"quickbooks","dark":false},
    {"id":"hbr_quickbookstime","name":"QuickBooks Time","cat":"Productivity","popular":false,"sprite":"hbr_quickbookstime","dark":false},
    {"id":"rst_recharge","name":"Recharge","cat":"Commerce","popular":false,"sprite":"rst_recharge","dark":true},
    {"id":"rst_recurly","name":"Recurly","cat":"Commerce","popular":false,"sprite":"rst_recurly","dark":false},
    {"id":"rst_repairshopr","name":"RepairShopr","cat":"Support","popular":false,"sprite":"rst_repairshopr","dark":false},
    {"id":"hbr_reply","name":"Reply","cat":"Sales & CRM","popular":false,"sprite":"hbr_reply","dark":false},
    {"id":"rest","name":"REST","cat":"IT Operations","popular":false,"sprite":"rest","dark":false},
    {"id":"sageaccounting","name":"Sage Accounting","cat":"Commerce","popular":false,"sprite":"sageaccounting","dark":true},
    {"id":"scoro","name":"Scoro","cat":"Productivity","popular":false,"sprite":"scoro","dark":true},
    {"id":"hbr_segment","name":"Segment","cat":"IT Operations","popular":false,"sprite":"hbr_segment","dark":false},
    {"id":"hbr_sendcloud","name":"Sendcloud","cat":"Commerce","popular":false,"sprite":"hbr_sendcloud","dark":false},
    {"id":"hbr_sendgrid","name":"SendGrid","cat":"Communication","popular":false,"sprite":"hbr_sendgrid","dark":false},
    {"id":"sendpulse","name":"SendPulse","cat":"Marketing","popular":false,"sprite":"sendpulse","dark":false},
    {"id":"servicenow","name":"ServiceNow","cat":"Support","popular":false,"sprite":"servicenow","dark":false},
    {"id":"sharepointlists","name":"SharePoint Lists","cat":"Storage & Files","popular":false,"sprite":"sharepointlists","dark":false},
    {"id":"rst_shippo","name":"Shippo","cat":"Commerce","popular":false,"sprite":"rst_shippo","dark":false},
    {"id":"shipstation","name":"ShipStation","cat":"Commerce","popular":false,"sprite":"shipstation","dark":true},
    {"id":"shopify_v2","name":"Shopify","cat":"Commerce","popular":false,"sprite":"shopify_v2","dark":false},
    {"id":"shopify","name":"Shopify (Legacy)","cat":"Commerce","popular":false,"sprite":"shopify","dark":false},
    {"id":"hbr_smartsheet","name":"Smartsheet","cat":"Productivity","popular":false,"sprite":"hbr_smartsheet","dark":true},
    {"id":"smartsuite","name":"SmartSuite","cat":"Productivity","popular":false,"sprite":"smartsuite","dark":false},
    {"id":"hbr_square","name":"Square","cat":"Commerce","popular":false,"sprite":"hbr_square","dark":true},
    {"id":"rst_starshipit","name":"Starshipit","cat":"Commerce","popular":false,"sprite":"rst_starshipit","dark":false},
    {"id":"streak","name":"Streak","cat":"Sales & CRM","popular":false,"sprite":"streak","dark":false},
    {"id":"sugar","name":"SugarAI","cat":"Sales & CRM","popular":false,"sprite":"sugar","dark":true},
    {"id":"surveymonkey","name":"SurveyMonkey","cat":"Sales & CRM","popular":false,"sprite":"surveymonkey","dark":false},
    {"id":"rst_survicate","name":"Survicate","cat":"Sales & CRM","popular":false,"sprite":"rst_survicate","dark":true},
    {"id":"hbr_teamwork","name":"Teamwork","cat":"Productivity","popular":false,"sprite":"hbr_teamwork","dark":true},
    {"id":"hbr_teamwork_crm","name":"Teamwork CRM","cat":"Sales & CRM","popular":false,"sprite":"hbr_teamwork_crm","dark":true},
    {"id":"hbr_teamwork_desk","name":"Teamwork Desk","cat":"Support","popular":false,"sprite":"hbr_teamwork_desk","dark":true},
    {"id":"hbr_tempo","name":"Tempo","cat":"Productivity","popular":false,"sprite":"hbr_tempo","dark":true},
    {"id":"hbr_thinkific","name":"Thinkific","cat":"Other","popular":false,"sprite":"hbr_thinkific","dark":true},
    {"id":"tiktokads","name":"TikTok Ads","cat":"Marketing","popular":false,"sprite":"tiktokads","dark":true},
    {"id":"rst_timely","name":"Timely","cat":"Productivity","popular":false,"sprite":"rst_timely","dark":false},
    {"id":"hbr_tmetric","name":"TMetric","cat":"Productivity","popular":false,"sprite":"hbr_tmetric","dark":false},
    {"id":"rst_todoist","name":"Todoist","cat":"Productivity","popular":false,"sprite":"rst_todoist","dark":false},
    {"id":"hbr_toggl_track","name":"Toggl Track","cat":"Productivity","popular":false,"sprite":"hbr_toggl_track","dark":false},
    {"id":"hbr_trello","name":"Trello","cat":"Productivity","popular":false,"sprite":"hbr_trello","dark":false},
    {"id":"rst_twilio","name":"Twilio","cat":"Communication","popular":false,"sprite":"rst_twilio","dark":false},
    {"id":"rst_typeform","name":"Typeform","cat":"Sales & CRM","popular":false,"sprite":"rst_typeform","dark":false},
    {"id":"hbr_unbounce","name":"Unbounce","cat":"Marketing","popular":false,"sprite":"hbr_unbounce","dark":true},
    {"id":"hbr_uservoice","name":"UserVoice","cat":"Support","popular":false,"sprite":"hbr_uservoice","dark":false},
    {"id":"woocommerce","name":"WooCommerce","cat":"Commerce","popular":false,"sprite":"woocommerce","dark":false},
    {"id":"wordpress","name":"WordPress","cat":"Other","popular":false,"sprite":"wordpress","dark":true},
    {"id":"hbr_wrike","name":"Wrike","cat":"Productivity","popular":false,"sprite":"hbr_wrike","dark":false},
    {"id":"twitterads","name":"X Ads","cat":"Marketing","popular":false,"sprite":"twitterads","dark":true},
    {"id":"xero","name":"Xero","cat":"Commerce","popular":false,"sprite":"xero","dark":false},
    {"id":"rst_yotpo","name":"Yotpo","cat":"Commerce","popular":false,"sprite":"rst_yotpo","dark":false},
    {"id":"hbr_zammad","name":"Zammad","cat":"Support","popular":false,"sprite":"hbr_zammad","dark":false},
    {"id":"zendesk","name":"Zendesk","cat":"Support","popular":false,"sprite":"zendesk","dark":true},
    {"id":"hbr_zendesksell","name":"Zendesk Sell","cat":"Sales & CRM","popular":false,"sprite":"hbr_zendesksell","dark":false},
    {"id":"zohoanalytics","name":"Zoho Analytics","cat":"Business Intelligence","popular":false,"sprite":"zohoanalytics","dark":true},
    {"id":"hbr_zoho_billing","name":"Zoho Billing","cat":"Commerce","popular":false,"sprite":"hbr_zoho_billing","dark":false},
    {"id":"zohobooks","name":"Zoho Books","cat":"Commerce","popular":false,"sprite":"zohobooks","dark":false},
    {"id":"zohocreator","name":"Zoho Creator","cat":"Other","popular":false,"sprite":"zohocreator","dark":false},
    {"id":"zoho","name":"Zoho CRM","cat":"Sales & CRM","popular":false,"sprite":"zoho","dark":false},
    {"id":"zohodesk","name":"Zoho Desk","cat":"Support","popular":false,"sprite":"zohodesk","dark":false},
    {"id":"zohoinventory","name":"Zoho Inventory","cat":"Commerce","popular":false,"sprite":"zohoinventory","dark":false},
    {"id":"zohoinvoice","name":"Zoho Invoice","cat":"Commerce","popular":false,"sprite":"zohoinvoice","dark":false},
    {"id":"hbr_zoho_learn","name":"Zoho Learn","cat":"Other","popular":false,"sprite":"hbr_zoho_learn","dark":false},
    {"id":"zohopeople","name":"Zoho People","cat":"Other","popular":false,"sprite":"zohopeople","dark":false},
    {"id":"hbr_zoho_projects","name":"Zoho Projects","cat":"Other","popular":false,"sprite":"hbr_zoho_projects","dark":false},
    {"id":"zohosprints","name":"Zoho Sprints","cat":"Other","popular":false,"sprite":"zohosprints","dark":false},
    {"id":"hbr_zulip","name":"Zulip","cat":"Communication","popular":false,"sprite":"hbr_zulip","dark":false},
    {"id":"zuora","name":"Zuora","cat":"Commerce","popular":false,"sprite":"zuora","dark":false}
  ];
  IK.ONB_BUILTIN = {
    "hubspot": { total: 25, metrics: [
      {"name":"MRR (derived)","alias":"@hs_saas_mrr","desc":"Monthly Recurring Revenue. HubSpot's native \"Monthly recurring revenue\" field is 0 on every deal, so MRR is DERIVED by SaaS convention: sum each deal's \"Annual contract value\" (ACV) and divide by 12."},
      {"name":"ARR (derived)","alias":"@hs_saas_arr","desc":"Annual Recurring Revenue. The native \"Annual recurring revenue\" field is 0 on every deal, so ARR is DERIVED by convention as the SUM of \"Annual contract value\" (ACV) across deals."},
      {"name":"Average ACV per deal","alias":"@hs_saas_avg_acv","desc":"Average Annual Contract Value per deal. Defined as AVG of \"Annual contract value\" (ACV) across deals - NOT AVG of \"Amount\"."},
      {"name":"ACV realization rate (%)","alias":"@hs_acv_realization_rate","desc":"How much of headline deal \"Amount\" is realized as annual contract value. Defined as 100 * SUM(\"Annual contract value\") / SUM(\"Amount\") across deals, as a percentage."},
      {"name":"Probability-weighted pipeline value","alias":"@hs_weighted_pipeline","desc":"Probability-weighted value of the OPEN pipeline. Use HubSpot's PRECOMPUTED \"Weighted amount\" column (= \"Amount\" x \"Deal probability\") and sum it over open deals (\"Is Deal Closed?\" = false)."},
      {"name":"Value-weighted win probability (%)","alias":"@hs_value_weighted_win_probability","desc":"The deal-size-weighted average win probability of the OPEN pipeline. Defined as 100 * SUM(\"Weighted amount\") / SUM(\"Amount\") over open deals — a dollar-weighted probability, NOT a plain AVG(\"Deal probability\")."},
      {"name":"Pipeline amount-vs-weighted gap","alias":"@hs_amount_weighted_gap","desc":"Risk-adjusted shortfall of the OPEN pipeline = gross \"Amount\" minus probability-weighted \"Weighted amount\". SELECT SUM(\"Amount\") - SUM(\"Weighted amount\") FROM \"Deals\" WHERE \"Is Deal Closed?\" = false."},
      {"name":"High-probability pipeline value","alias":"@hs_high_prob_pipeline","desc":"Gross \"Amount\" of OPEN deals whose \"Deal probability\" >= 0.8. \"Deal probability\" is on a 0-1 scale, so the threshold is 0.8 (= 80%), NOT 80."},
      {"name":"Qualified pipeline value (ACV)","alias":"@hs_qualified_pipeline_value","desc":"Qualified pipeline = SUM of \"Annual contract value\" (ACV, NOT \"Amount\") over deals whose \"Deal Stage\" is beyond 'Appointment Scheduled' — the exact set 'Qualified To Buy','Presentation Scheduled','Decision Maker Bought-In','Contract Sent'. SELECT SUM(\"Annual contract value\") FROM \"Deals\" WHERE \"Deal Stage\" IN ('Qualified To Buy','Presentation Scheduled','Decision Maker Bought-In','Contract Sent')."},
      {"name":"Late-stage pipeline value","alias":"@hs_late_stage_pipeline_value","desc":"Late-stage (a.k.a. commit) pipeline = SUM of \"Amount\" over deals in the EXACT stage set 'Decision Maker Bought-In','Contract Sent' (the two stages just before close). 'Presentation Scheduled' is NOT late-stage here. SELECT SUM(\"Amount\") FROM \"Deals\" WHERE \"Deal Stage\" IN ('Decision Maker Bought-In','Contract Sent')."},
      {"name":"Late-stage share of pipeline value (%)","alias":"@hs_late_stage_value_share","desc":"Percentage of total open-pipeline \"Amount\" that sits in the late stages 'Decision Maker Bought-In','Contract Sent'. By VALUE, not by deal count."},
      {"name":"Pipeline scheduled to close in period","alias":"@hs_pipeline_closing_in_period","desc":"Total \"Amount\" of deals whose \"Close Date\" falls within the requested period (:start to :end), dated by \"Close Date\". SELECT SUM(\"Amount\") FROM \"Deals\" WHERE \"Close Date\" >= :start AND \"Close Date\" <= :end."} ] },
    "stripe": { total: 60, metrics: [
      {"name":"MRR (monthly recurring revenue)","alias":"@str_mrr","desc":"Monthly Recurring Revenue, in DOLLARS. Compute from \"SubscriptionItems\" (NOT the embedded \"Subscriptions\".\"Plan_Amount\", which is NULL for multi-item subscriptions and undercounts)."},
      {"name":"ARR (annual recurring revenue)","alias":"@str_arr","desc":"Annual Recurring Revenue, in DOLLARS = MRR x 12, computed from \"SubscriptionItems\" of ACTIVE subscriptions. Normalize each item to annual (monthly prices x12, yearly prices x1), using \"Price_UnitAmount\" x \"Quantity\"."},
      {"name":"ARPU (avg MRR per active customer)","alias":"@str_arpu","desc":"Average Revenue Per User = MRR (dollars) divided by the number of DISTINCT customers with an ACTIVE subscription. Numerator = monthly-normalized MRR over active subscription items (SELECT SUM(CASE WHEN si.\"Price_Recurring_Interval\"='year' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"/12.0 WHEN si.\"Price_Recurring_Interval\"='month' THEN si.\"Price_UnitAmount\"*si.\"Quantity\" WHEN si.\"Price_Recurring_Interval\"='week' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"*52.0/12.0 WHEN si.\"Price_Recurring_Interval\"='day' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"*365.0/12.0 ELSE 0 END)/100.0 ... /100)."},
      {"name":"MRR including trialing subscriptions","alias":"@str_mrr_including_trials","desc":"MRR variant that INCLUDES trialing subscriptions (committed but not yet paying). Same monthly-normalized item-based calculation as MRR, but filter \"Subscriptions\".\"Status\" IN ('Active','Trialing')."},
      {"name":"MRR concentration in top subscription (%)","alias":"@str_mrr_concentration","desc":"Share of total active MRR contributed by the single largest subscription. Compute per-subscription monthly MRR (item-based, normalized) for active subs, then 100 * MAX(subscription MRR) / SUM(subscription MRR)."},
      {"name":"Share of MRR from annual plans (%)","alias":"@str_share_mrr_annual_plans","desc":"Percentage of active monthly-normalized MRR that comes from YEARLY-interval subscription items (\"Price_Recurring_Interval\" = 'year'), vs all active MRR. Numerator = active MRR from year items only; denominator = all active MRR (both in cents; ratio is a percentage)."},
      {"name":"Gross payment volume","alias":"@str_gross_payment_volume","desc":"Total value of SUCCEEDED charges, in DOLLARS. Filter \"Charges\".\"Status\" = 'Succeeded' (Title-case; do NOT include the 1 failed charge)."},
      {"name":"Net revenue (succeeded - refunds)","alias":"@str_net_revenue","desc":"Net revenue in DOLLARS = succeeded charge \"Amount\" minus \"AmountRefunded\", filtered to \"Status\" = 'Succeeded'. Amounts in CENTS -> divide EACH sum by 100 separately (this connector drops parentheses around a subtraction before a trailing /100)."},
      {"name":"Net revenue margin (%)","alias":"@str_net_revenue_margin","desc":"Net revenue as a percentage of gross succeeded volume = 100 - (refunds as a % of succeeded charge amount). Avoid parenthesized subtraction before division; compute as 100.0 - 100.0*SUM(\"AmountRefunded\")/SUM(\"Amount\") over succeeded charges."},
      {"name":"Total refunds","alias":"@str_total_refunds","desc":"Total value of SUCCEEDED refunds, in DOLLARS, from the \"Refunds\" table. Filter \"Status\" = 'Succeeded'; amounts in CENTS -> /100."},
      {"name":"Refund rate by amount (%)","alias":"@str_refund_rate_amount","desc":"Refunded amount as a percentage of total charged amount. SELECT 100.0 * SUM(\"AmountRefunded\") / NULLIF(SUM(\"Amount\"),0) FROM \"Charges\"."},
      {"name":"Refund rate by count (%)","alias":"@str_refund_rate_count","desc":"Percentage of charges that were refunded, by COUNT (not amount). SELECT 100.0 * SUM(CASE WHEN \"Refunded\" = true THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Charges\"."} ] },
    "googleanalytics_v4": { total: 44, metrics: [
      {"name":"Direct-traffic session share (%)","alias":"@ga4_direct_session_share_pct","desc":"Share of sessions from Direct traffic = 100 * direct sessions / all sessions. Two queries: numerator SELECT SUM(\"Sessions\") FROM \"CompleteAnalytics\" WHERE \"SessionDefaultChannelGroup\" = 'Direct' AND \"Date\" >= :start AND \"Date\" <= :end; denominator the same without the channel filter."},
      {"name":"Desktop session share (%)","alias":"@ga4_desktop_session_share_pct","desc":"Share of sessions on desktop = 100 * desktop sessions / all sessions. Two queries: numerator SELECT SUM(\"Sessions\") FROM \"CompleteAnalytics\" WHERE \"DeviceCategory\" = 'desktop' AND \"Date\" >= :start AND \"Date\" <= :end; denominator the same without the device filter."},
      {"name":"Top channel by key events [breakdown]","alias":"@ga4_top_channel_by_key_events","desc":"Channel group driving the most key events (conversions). Canonical: SELECT \"SessionDefaultChannelGroup\", SUM(\"KeyEvents\") k FROM \"CompleteAnalytics\" WHERE \"Date\" >= :start AND \"Date\" <= :end GROUP BY \"SessionDefaultChannelGroup\" ORDER BY k DESC."},
      {"name":"Average engagement time per session (sec)","alias":"@ga4_avg_engagement_time_sec","desc":"Pooled engagement seconds per session = SUM(\"UserEngagementDuration\") / SUM(\"Sessions\") over the period, in ONE query. \"UserEngagementDuration\" is total engaged seconds."},
      {"name":"Engagement rate (%)","alias":"@ga4_engagement_rate_pct","desc":"Pooled engagement rate = 100 * SUM(\"EngagedSessions\") / SUM(\"Sessions\") over the period, in ONE query. Gotcha: do NOT average the per-row \"EngagementRate\" column (a 0-1 fraction) - recompute pooled and express 0-100."},
      {"name":"Bounce rate (%)","alias":"@ga4_bounce_rate_pct","desc":"Pooled bounce rate = 100 * (1 - SUM(\"EngagedSessions\") / SUM(\"Sessions\")) over the period, in ONE query. Gotcha: in GA4, bounce = NOT-engaged session (the inverse of engagement rate) - it is NOT the old Universal Analytics single-page definition; do not average the per-row \"BounceRate\" column."},
      {"name":"New-user share (%)","alias":"@ga4_new_user_share_pct","desc":"Share of users who are new = 100.0 * SUM(\"NewUsers\") / SUM(\"TotalUsers\") over the period, in ONE query. Report the percentage with decimals, not rounded to a whole number."},
      {"name":"Session key-event rate (%)","alias":"@ga4_session_key_event_rate_pct","desc":"Share of sessions with a key event = 100 * SUM(\"KeyEvents\") / SUM(\"Sessions\") over the period, in ONE query (approximation: key events per 100 sessions; do not average the per-row \"SessionKeyEventRate\"). Use EXACTLY the date window :start..:end and filter ONLY on \"Date\" - do NOT filter on \"Year\"/\"Month\"/other date dimensions (they change GA4's user deduplication and return different totals)."},
      {"name":"Organic-search session share (%)","alias":"@ga4_organic_session_share_pct","desc":"Share of sessions from organic search = 100 * organic sessions / all sessions. Two queries: numerator SELECT SUM(\"Sessions\") FROM \"CompleteAnalytics\" WHERE \"SessionDefaultChannelGroup\" = 'Organic Search' AND \"Date\" >= :start AND \"Date\" <= :end; denominator the same without the channel filter."},
      {"name":"Top channel by sessions [breakdown]","alias":"@ga4_top_channel_by_sessions","desc":"Default channel group driving the most sessions. Canonical: SELECT \"SessionDefaultChannelGroup\", SUM(\"Sessions\") s FROM \"CompleteAnalytics\" WHERE \"Date\" >= :start AND \"Date\" <= :end GROUP BY \"SessionDefaultChannelGroup\" ORDER BY s DESC."},
      {"name":"Top device category by sessions [breakdown]","alias":"@ga4_top_device_by_sessions","desc":"Device category with the most sessions. Canonical: SELECT \"DeviceCategory\", SUM(\"Sessions\") s FROM \"CompleteAnalytics\" WHERE \"Date\" >= :start AND \"Date\" <= :end GROUP BY \"DeviceCategory\" ORDER BY s DESC."},
      {"name":"Month-over-month session change (%)","alias":"@ga4_mom_session_change_pct","desc":"Month-over-month session change, expressed as a percent: 100 * (latest full calendar month's sessions / previous full calendar month's sessions - 1). Anchor on :end: the 'latest' month is the calendar month immediately before :end, and 'previous' is the calendar month before that."} ] },
    "googleanalytics": { total: 44, metrics: [
      {"name":"Direct-traffic session share (%)","alias":"@ga_direct_session_share_pct","desc":"Share of sessions from Direct traffic = 100 * direct sessions / all sessions. Two queries: numerator SELECT SUM(\"Sessions\") FROM \"CompleteAnalytics\" WHERE \"SessionDefaultChannelGroup\" = 'Direct' AND \"Date\" >= :start AND \"Date\" <= :end; denominator the same without the channel filter."},
      {"name":"Desktop session share (%)","alias":"@ga_desktop_session_share_pct","desc":"Share of sessions on desktop = 100 * desktop sessions / all sessions. Two queries: numerator SELECT SUM(\"Sessions\") FROM \"CompleteAnalytics\" WHERE \"DeviceCategory\" = 'desktop' AND \"Date\" >= :start AND \"Date\" <= :end; denominator the same without the device filter."},
      {"name":"Top channel by key events [breakdown]","alias":"@ga_top_channel_by_key_events","desc":"Channel group driving the most key events (conversions). Canonical: SELECT \"SessionDefaultChannelGroup\", SUM(\"KeyEvents\") k FROM \"CompleteAnalytics\" WHERE \"Date\" >= :start AND \"Date\" <= :end GROUP BY \"SessionDefaultChannelGroup\" ORDER BY k DESC."},
      {"name":"Average engagement time per session (sec)","alias":"@ga_avg_engagement_time_sec","desc":"Pooled engagement seconds per session = SUM(\"UserEngagementDuration\") / SUM(\"Sessions\") over the period, in ONE query. \"UserEngagementDuration\" is total engaged seconds."},
      {"name":"Engagement rate (%)","alias":"@ga_engagement_rate_pct","desc":"Pooled engagement rate = 100 * SUM(\"EngagedSessions\") / SUM(\"Sessions\") over the period, in ONE query. Gotcha: do NOT average the per-row \"EngagementRate\" column (a 0-1 fraction) - recompute pooled and express 0-100."},
      {"name":"Bounce rate (%)","alias":"@ga_bounce_rate_pct","desc":"Pooled bounce rate = 100 * (1 - SUM(\"EngagedSessions\") / SUM(\"Sessions\")) over the period, in ONE query. Gotcha: in GA4, bounce = NOT-engaged session (the inverse of engagement rate) - it is NOT the old Universal Analytics single-page definition; do not average the per-row \"BounceRate\" column."},
      {"name":"New-user share (%)","alias":"@ga_new_user_share_pct","desc":"Share of users who are new = 100.0 * SUM(\"NewUsers\") / SUM(\"TotalUsers\") over the period, in ONE query. Report the percentage with decimals, not rounded to a whole number."},
      {"name":"Session key-event rate (%)","alias":"@ga_session_key_event_rate_pct","desc":"Share of sessions with a key event = 100 * SUM(\"KeyEvents\") / SUM(\"Sessions\") over the period, in ONE query (approximation: key events per 100 sessions; do not average the per-row \"SessionKeyEventRate\"). Use EXACTLY the date window :start..:end and filter ONLY on \"Date\" - do NOT filter on \"Year\"/\"Month\"/other date dimensions (they change GA4's user deduplication and return different totals)."},
      {"name":"Organic-search session share (%)","alias":"@ga_organic_session_share_pct","desc":"Share of sessions from organic search = 100 * organic sessions / all sessions. Two queries: numerator SELECT SUM(\"Sessions\") FROM \"CompleteAnalytics\" WHERE \"SessionDefaultChannelGroup\" = 'Organic Search' AND \"Date\" >= :start AND \"Date\" <= :end; denominator the same without the channel filter."},
      {"name":"Top channel by sessions [breakdown]","alias":"@ga_top_channel_by_sessions","desc":"Default channel group driving the most sessions. Canonical: SELECT \"SessionDefaultChannelGroup\", SUM(\"Sessions\") s FROM \"CompleteAnalytics\" WHERE \"Date\" >= :start AND \"Date\" <= :end GROUP BY \"SessionDefaultChannelGroup\" ORDER BY s DESC."},
      {"name":"Top device category by sessions [breakdown]","alias":"@ga_top_device_by_sessions","desc":"Device category with the most sessions. Canonical: SELECT \"DeviceCategory\", SUM(\"Sessions\") s FROM \"CompleteAnalytics\" WHERE \"Date\" >= :start AND \"Date\" <= :end GROUP BY \"DeviceCategory\" ORDER BY s DESC."},
      {"name":"Month-over-month session change (%)","alias":"@ga_mom_session_change_pct","desc":"Month-over-month session change, expressed as a percent: 100 * (latest full calendar month's sessions / previous full calendar month's sessions - 1). Anchor on :end: the 'latest' month is the calendar month immediately before :end, and 'previous' is the calendar month before that."} ] },
    "salesforce": { total: 25, metrics: [
      {"name":"MRR (won)","alias":"@sf_mrr_won","desc":"Monthly Recurring Revenue. Salesforce has NO native recurring/term field, so apply this CONVENTION: treat each WON opportunity's \"Amount\" as its Annual Contract Value (ACV); ARR = SUM of won \"Amount\"; MRR = ARR / 12."},
      {"name":"Total ARR (won)","alias":"@sf_total_arr_won","desc":"Annual Recurring Revenue. CONVENTION: treat each WON opportunity's \"Amount\" as its annual contract value; ARR = SUM of won \"Amount\"."},
      {"name":"Average ACV per won deal","alias":"@sf_avg_acv_won","desc":"Average Annual Contract Value of won deals. CONVENTION: each won opportunity's \"Amount\" IS its ACV."},
      {"name":"Net-new ARR (new customers)","alias":"@sf_net_new_arr","desc":"Recurring revenue from brand-new customers. CONVENTION: won \"Amount\" = ARR contribution."},
      {"name":"Expansion ARR (upgrades)","alias":"@sf_expansion_arr","desc":"Recurring-revenue growth from existing customers. CONVENTION: won \"Amount\" = ARR contribution."},
      {"name":"Bookings won in period","alias":"@sf_bookings_won_in_period","desc":"Total contract value WON within the requested period (:start to :end), dated by \"CloseDate\" (NOT CreatedDate, which is a dead import date). CONVENTION: won \"Amount\" = booking value."},
      {"name":"Customer logo count (distinct won accounts)","alias":"@sf_won_logo_count","desc":"Number of DISTINCT customer accounts with at least one won deal. SELECT COUNT(DISTINCT \"AccountId\") FROM \"Opportunity\" WHERE \"IsWon\" = true."},
      {"name":"Win rate by count (%)","alias":"@sf_win_rate_by_count","desc":"Share of CLOSED opportunities that were won, by count. SELECT 100.0 * SUM(CASE WHEN \"IsWon\" = true THEN 1 ELSE 0 END) / NULLIF(SUM(CASE WHEN \"IsClosed\" = true THEN 1 ELSE 0 END),0) FROM \"Opportunity\"."},
      {"name":"Win rate by value (%)","alias":"@sf_win_rate_by_value","desc":"Share of CLOSED-opportunity VALUE that was won. SELECT 100.0 * SUM(CASE WHEN \"IsWon\" = true THEN \"Amount\" ELSE 0 END) / NULLIF(SUM(CASE WHEN \"IsClosed\" = true THEN \"Amount\" ELSE 0 END),0) FROM \"Opportunity\"."},
      {"name":"Pipeline coverage ratio","alias":"@sf_pipeline_coverage_ratio","desc":"Open pipeline value divided by won revenue (a coverage multiple, e.g. 0.6x). SELECT 1.0 * SUM(CASE WHEN \"IsClosed\" = false THEN \"Amount\" ELSE 0 END) / NULLIF(SUM(CASE WHEN \"IsWon\" = true THEN \"Amount\" ELSE 0 END),0) FROM \"Opportunity\"."},
      {"name":"Late-stage pipeline share (%)","alias":"@sf_late_stage_pipeline_share","desc":"Percentage of OPEN pipeline VALUE that sits in late stages (Proposal/Price Quote, Negotiation/Review). SELECT 100.0 * SUM(CASE WHEN \"IsClosed\" = false AND \"StageName\" IN ('Proposal/Price Quote','Negotiation/Review') THEN \"Amount\" ELSE 0 END) / NULLIF(SUM(CASE WHEN \"IsClosed\" = false THEN \"Amount\" ELSE 0 END),0) FROM \"Opportunity\"."},
      {"name":"Lead conversion rate (%)","alias":"@sf_lead_conversion_rate","desc":"Percentage of leads that converted. Use the Status value, NOT the \"IsConverted\" flag (which is false on every row here)."} ] },
    "shopify_v2": { total: 96, metrics: [
      {"name":"Gross order revenue","alias":"@shp_gross_ord_rev","desc":"The total amount billed to customers on orders placed in the period, before any refunds are deducted. It is the sum of each order's total price, which already includes merchandise, shipping, taxes and any additional fees."},
      {"name":"Net revenue after refunds","alias":"@shp_net_rev_after_refunds","desc":"Revenue the business actually keeps from orders placed in the period: everything billed on those orders minus everything refunded back on them. Compute it as the sum of order totals minus the sum of refunded amounts."},
      {"name":"Merchandise revenue (subtotal)","alias":"@shp_merch_subtotal_rev","desc":"The value of the goods themselves on orders placed in the period, after line and cart discounts have been applied and excluding tax, shipping and duties. It is the sum of each order's subtotal."},
      {"name":"Average order value","alias":"@shp_avg_ord_value","desc":"The typical amount billed per order placed in the period: total order value divided by the number of orders. It is the headline measure of how much a single checkout is worth, including tax and shipping."},
      {"name":"Largest single order","alias":"@shp_largest_ord_value","desc":"The value of the biggest single order placed in the period, measured on the order's total price. It gives the ceiling of the order-value distribution and is the natural companion to average order value when revenue is concentrated."},
      {"name":"Tax share of revenue","alias":"@shp_tax_share_rev","desc":"How much of the money billed to customers is tax rather than value the business earns, expressed as a percentage. Divide the total tax charged on orders in the period by the total billed on those same orders."},
      {"name":"Refunded share of revenue","alias":"@shp_refunded_rev_share","desc":"The percentage of billed revenue that was given back to customers, measured on orders placed in the period. Divide total refunded amounts by total order value for the same orders."},
      {"name":"Collected share of billed revenue","alias":"@shp_collected_rev_share","desc":"How much of what was billed has actually been received, as a percentage. Divide the total received across orders placed in the period by the total billed on those orders."},
      {"name":"Best revenue month","alias":"@shp_top_rev_month","desc":"The single calendar month inside the period that produced the most billed revenue, returned as a year-month label. Group the period's orders by the year and month of their creation date, sum order totals within each group, and return the label of the largest group."},
      {"name":"Orders placed","alias":"@shp_ord_placed","desc":"How many real customer orders the store took during the reporting window. Counts rows in Orders whose creation timestamp falls inside the window, excluding anything flagged as a test transaction."},
      {"name":"Orders per active day","alias":"@shp_ord_per_active_day","desc":"Average order intake on the days the store actually took orders, which separates genuine daily throughput from long idle stretches that would flatten a naive orders-per-calendar-day figure. Divide orders created in the window by the number of distinct calendar dates on which at least one order was created."},
      {"name":"Peak month concentration","alias":"@shp_peak_month_ord_conc","desc":"How lopsided order intake is across the calendar months the window covers: the share of all orders that fall into the single busiest month. Even spread would put this near the reciprocal of the number of months in the window, while a high value means one month carries the whole period."} ] },
    "googleads": { total: 25, metrics: [
      {"name":"Total ad spend","alias":"@gads_total_cost","desc":"Total advertising cost in currency = SUM(\"Metrics_CostMicros\") / 1000000.0 FROM \"CampaignsReport\". Gotcha: cost is stored in MICROS (millionths); divide by 1,000,000 to get currency."},
      {"name":"Total conversions value","alias":"@gads_total_conversions_value","desc":"Total value attributed to conversions = SUM(\"Metrics_ConversionsValue\") FROM \"CampaignsReport\". Gotcha: ConversionsValue is already in currency units (NOT micros); do not divide."},
      {"name":"Average cost per click (CPC)","alias":"@gads_avg_cpc","desc":"Average cost per click = total cost / total clicks = (SUM(\"Metrics_CostMicros\")/1000000.0) / SUM(\"Metrics_Clicks\") FROM \"CampaignsReport\". Compute in ONE query."},
      {"name":"Cost per conversion (CPA)","alias":"@gads_cost_per_conversion","desc":"Cost per conversion (CPA), ACCOUNT-LEVEL = total cost / total conversions, in ONE query: SELECT (SUM(\"Metrics_CostMicros\")/1000000.0) / SUM(\"Metrics_Conversions\") FROM \"CampaignsReport\". Rules: (1) \"CampaignsReport\" already holds account-level totals, so this is computed over all rows with no date filter."},
      {"name":"Search channel spend","alias":"@gads_search_channel_cost","desc":"Ad spend on the SEARCH channel = SUM(\"Metrics_CostMicros\")/1000000.0 FROM \"CampaignsReport\" WHERE \"AdvertisingChannelType\" = 'SEARCH'. Micros/1e6."},
      {"name":"Performance Max spend","alias":"@gads_pmax_channel_cost","desc":"Ad spend on the PERFORMANCE_MAX channel = SUM(\"Metrics_CostMicros\")/1000000.0 FROM \"CampaignsReport\" WHERE \"AdvertisingChannelType\" = 'PERFORMANCE_MAX'. Micros/1e6."},
      {"name":"Total daily budget","alias":"@gads_total_daily_budget","desc":"Sum of configured daily budgets = SUM(\"AmountMicros\")/1000000.0 FROM \"CampaignBudgets\". Micros/1e6; AmountMicros is the daily budget per budget record."},
      {"name":"Total impressions","alias":"@gads_total_impressions","desc":"Total ad impressions = SUM(\"Metrics_Impressions\") FROM \"CampaignsReport\"."},
      {"name":"Total clicks","alias":"@gads_total_clicks","desc":"Total ad clicks = SUM(\"Metrics_Clicks\") FROM \"CampaignsReport\"."},
      {"name":"Total conversions","alias":"@gads_total_conversions","desc":"Total conversions = SUM(\"Metrics_Conversions\") FROM \"CampaignsReport\"."},
      {"name":"Total interactions","alias":"@gads_total_interactions","desc":"Total interactions (clicks + other engagements) = SUM(\"Metrics_Interactions\") FROM \"CampaignsReport\"."},
      {"name":"Enabled campaign count","alias":"@gads_enabled_campaign_count","desc":"Number of enabled campaigns = COUNT(*) FROM \"CampaignsReport\" WHERE \"Status\" = 'ENABLED'."} ] },
    "facebookads": { total: 25, metrics: [
      {"name":"Total ad spend","alias":"@fads_total_spend","desc":"Total advertising spend = SUM(\"Spend\") FROM \"CampaignInsights\". \"Spend\" is decimal currency (NOT cents)."},
      {"name":"Average cost per click (CPC)","alias":"@fads_avg_cpc","desc":"Pooled average CPC = SUM(\"Spend\") / SUM(\"Clicks\") FROM \"CampaignInsights\", in ONE query. Gotcha: do NOT average the per-row \"Cpc\" column - that weights small campaigns equally; recompute from pooled sums."},
      {"name":"Effective CPM","alias":"@fads_effective_cpm","desc":"Pooled cost per 1000 impressions = 1000 * SUM(\"Spend\") / SUM(\"Impressions\") FROM \"CampaignInsights\", in ONE query. Gotcha: do NOT average the per-row \"Cpm\" column; recompute pooled."},
      {"name":"Cost per conversion (CPA)","alias":"@fads_cost_per_conversion","desc":"Pooled CPA = SUM(\"Spend\") / SUM(\"Conversions\") FROM \"CampaignInsights\", in ONE query. Gotcha: do NOT average the per-row \"CostPerConversion\" column and do NOT compute per-campaign CPA and average - single pooled figure."},
      {"name":"Cost per link click","alias":"@fads_cost_per_link_click","desc":"Pooled cost per inline link click = SUM(\"Spend\") / SUM(\"InlineLinkClicks\") FROM \"CampaignInsights\", in ONE query. Link clicks (clicks to the destination) are a subset of all \"Clicks\" (which include likes, comments, profile clicks)."},
      {"name":"Account lifetime spend","alias":"@fads_account_lifetime_spend","desc":"Lifetime amount spent across ad accounts = SUM(\"AmountSpent\") / 100.0 FROM \"Accounts\". Gotcha: \"AmountSpent\" is in MINOR currency units (cents) - divide by 100."},
      {"name":"Outstanding account balance","alias":"@fads_account_balance","desc":"Current unbilled balance = SUM(\"Balance\") / 100.0 FROM \"Accounts\". \"Balance\" is in MINOR units (cents)."},
      {"name":"Total configured daily budget","alias":"@fads_total_daily_budget","desc":"Sum of campaign daily budgets = SUM(\"DailyBudgetCent\") / 100.0 FROM \"Campaigns\". Gotcha: the column is explicitly in CENTS (\"DailyBudgetCent\") - divide by 100; campaigns using adset-level or lifetime budgets have it null."},
      {"name":"Total impressions","alias":"@fads_total_impressions","desc":"Total ad impressions = SUM(\"Impressions\") FROM \"CampaignInsights\"."},
      {"name":"Total clicks (all)","alias":"@fads_total_clicks","desc":"Total clicks (all click types incl. likes/comments/profile clicks) = SUM(\"Clicks\") FROM \"CampaignInsights\". For destination clicks only, use \"InlineLinkClicks\" instead."},
      {"name":"Total conversions","alias":"@fads_total_conversions","desc":"Total conversions = SUM(\"Conversions\") FROM \"CampaignInsights\"."},
      {"name":"Total reach (sum of campaign reach)","alias":"@fads_total_reach_sum","desc":"Sum of per-campaign reach = SUM(\"Reach\") FROM \"CampaignInsights\". Gotcha: reach is unique people PER CAMPAIGN; summing double-counts people reached by several campaigns - this metric is defined as the simple sum (true dedup across campaigns is not available via this connector)."} ] },
    "linkedinads": { total: 54, metrics: [
      {"name":"Total configured daily budget","alias":"@lads_total_daily_budget_configured","desc":"Sum of campaign daily budgets = SUM(\"DailyBudget_Amount\") FROM \"Campaigns\" - ONE simple query, no filters. Gotchas: amounts are DECIMAL DOLLARS (not cents/micros); sum every campaign regardless of currency code rather than splitting or refusing; campaigns with no budget are NULL and are simply absent from SUM; include every status."},
      {"name":"Average unit-cost bid","alias":"@lads_avg_unit_cost_bid","desc":"Average configured bid = AVG(\"UnitCost_Amount\") FROM \"Campaigns\" (rows with a bid; AVG ignores nulls). DECIMAL dollars."},
      {"name":"Completed campaign share (%)","alias":"@lads_completed_campaign_share_pct","desc":"Share of campaigns in 'Completed' status = 100 * count(Status='Completed') / count(all). TWO queries on \"Campaigns\"."},
      {"name":"Sponsored InMail campaign share (%)","alias":"@lads_inmail_campaign_share_pct","desc":"Share of campaigns of type SponsoredInmails = 100 * count(Type='SponsoredInmails') / count(all). TWO queries on \"Campaigns\"."},
      {"name":"CPM-billed campaign share (%)","alias":"@lads_cpm_campaign_share_pct","desc":"Share of campaigns billed by impressions = 100 * count(CostType='CPM') / count(all). TWO queries on \"Campaigns\"."},
      {"name":"Daily-budget coverage (%)","alias":"@lads_budget_coverage_pct","desc":"Share of campaigns that have a daily budget configured = 100 * COUNT(\"DailyBudget_Amount\") / COUNT(*). TWO queries on \"Campaigns\"."},
      {"name":"Decommissioned campaign-group share (%)","alias":"@lads_decommissioned_group_share_pct","desc":"Share of campaign groups removed or pending deletion = 100 * count(Status IN ('REMOVED','PENDING_DELETION')) / count(all) on \"CampaignGroups\". Gotcha: these two statuses are UPPER_SNAKE while others ('Paused', 'Active','Draft') are Title-case - exact match required."},
      {"name":"Active campaign-group share (%)","alias":"@lads_active_group_share_pct","desc":"Share of campaign groups currently Active = 100 * count(Status='Active') / count(all) on \"CampaignGroups\". 'Active' is Title-case here (unlike REMOVED/PENDING_DELETION)."},
      {"name":"Top campaign type [breakdown]","alias":"@lads_top_campaign_type","desc":"Most common campaign type. Canonical: SELECT \"Type\", COUNT(*) n FROM \"Campaigns\" GROUP BY \"Type\" ORDER BY n DESC."},
      {"name":"Revenue-oriented conversion share (%)","alias":"@lads_revenue_conversion_share_pct","desc":"Share of conversion actions tracking revenue intent = 100 * count(Type IN ('Purchase','SignUp')) / count(all) on \"Conversions\". TWO queries."},
      {"name":"Conversion type diversity","alias":"@lads_conversion_type_diversity","desc":"Number of distinct conversion action types configured = COUNT(DISTINCT \"Type\") FROM \"Conversions\"."},
      {"name":"Organic impressions","alias":"@lads_organic_impressions","desc":"Total organic post impressions = SUM(\"ImpressionCount\") FROM \"ShareDailyStatistics\" over the pinned window. Always filter ONLY on \"Date\" with the exact window :start..:end (the table updates live through today, so an unpinned query drifts)."} ] },
    "mailchimp": { total: 25, metrics: [
      {"name":"Open rate (unique) (%)","alias":"@mc_open_rate","desc":"Unique open rate = unique opens divided by delivered emails, as a percentage. Delivered is approximated by \"EmailsSent\" (drafts have EmailsSent = 0 and are excluded naturally)."},
      {"name":"Total open rate (%)","alias":"@mc_total_open_rate","desc":"Total open rate = TOTAL opens (including repeat opens) divided by delivered emails, as a percentage. Uses \"Summary_Opens\" (all opens, not unique) over \"EmailsSent\"."},
      {"name":"Click rate (%)","alias":"@mc_click_rate","desc":"Click rate = unique subscriber clicks divided by delivered emails, as a percentage. Use \"Summary_SubscriberClicks\" (unique clickers) over \"EmailsSent\", NOT \"Summary_Clicks\" (total clicks) and NOT RecipientCount."},
      {"name":"Click-to-open rate (CTOR) (%)","alias":"@mc_click_to_open_rate","desc":"Click-to-open rate (CTOR) = unique subscriber clicks divided by UNIQUE OPENS, as a percentage — engagement among those who opened, NOT among those delivered. SELECT 100.0 * SUM(\"Summary_SubscriberClicks\") / NULLIF(SUM(\"Summary_UniqueOpens\"),0) FROM \"Campaigns\"."},
      {"name":"Total click rate (%)","alias":"@mc_total_click_rate","desc":"Total click rate = TOTAL clicks (including repeat clicks) divided by delivered emails, as a percentage. Uses \"Summary_Clicks\" over \"EmailsSent\"."},
      {"name":"Repeat open factor","alias":"@mc_repeat_open_factor","desc":"Average number of opens per unique opener = total opens divided by unique opens. SELECT CAST(SUM(\"Summary_Opens\") AS FLOAT) / NULLIF(SUM(\"Summary_UniqueOpens\"),0) FROM \"Campaigns\"."},
      {"name":"Clicks per clicker","alias":"@mc_clicks_per_clicker","desc":"Average number of clicks per unique clicker = total clicks divided by unique subscriber clicks. SELECT CAST(SUM(\"Summary_Clicks\") AS FLOAT) / NULLIF(SUM(\"Summary_SubscriberClicks\"),0) FROM \"Campaigns\"."},
      {"name":"Total emails sent","alias":"@mc_total_emails_sent","desc":"Total number of emails delivered across all campaigns = SUM of \"EmailsSent\" over \"Campaigns\". SELECT SUM(\"EmailsSent\") FROM \"Campaigns\"."},
      {"name":"Total unique opens","alias":"@mc_total_unique_opens","desc":"Total unique opens across all campaigns = SUM of \"Summary_UniqueOpens\" over \"Campaigns\" (unique openers, summed per campaign). SELECT SUM(\"Summary_UniqueOpens\") FROM \"Campaigns\"."},
      {"name":"Sent campaign count","alias":"@mc_sent_campaign_count","desc":"Number of campaigns actually sent = COUNT of \"Campaigns\" with \"EmailsSent\" > 0 (drafts, with EmailsSent = 0, are excluded). SELECT COUNT(*) FROM \"Campaigns\" WHERE \"EmailsSent\" > 0."},
      {"name":"Average emails per sent campaign","alias":"@mc_avg_emails_per_sent_campaign","desc":"Average delivered volume per SENT campaign = AVG of \"EmailsSent\" over campaigns with \"EmailsSent\" > 0 (exclude drafts). SELECT AVG(\"EmailsSent\") FROM \"Campaigns\" WHERE \"EmailsSent\" > 0."},
      {"name":"Top campaign by unique opens [breakdown]","alias":"@mc_top_campaign_by_unique_opens","desc":"The campaign that generated the most unique opens. SELECT \"Title\", SUM(\"Summary_UniqueOpens\") AS v FROM \"Campaigns\" GROUP BY \"Title\"."} ] },
    "zoho": { total: 24, metrics: [
      {"name":"Open pipeline value","alias":"@zcrm_open_pipeline_value","desc":"Total value of deals still in play. SUM(\"Amount\") FROM \"Deals\" WHERE \"Stage\" NOT IN ('CLOSED WON','CLOSED LOST','Closed-Missed'). 'ON HOLD' deals count as open but paused."},
      {"name":"Open deal count","alias":"@zcrm_open_deal_count","desc":"Number of deals not yet closed. SELECT COUNT(*) FROM \"Deals\" WHERE \"Stage\" NOT IN ('CLOSED WON','CLOSED LOST','Closed-Missed')."},
      {"name":"Weighted pipeline value","alias":"@zcrm_weighted_pipeline_value","desc":"Probability-adjusted pipeline. SUM(\"Expected Revenue\") FROM \"Deals\" WHERE \"Stage\" NOT IN ('CLOSED WON','CLOSED LOST','Closed-Missed')."},
      {"name":"New pipeline created","alias":"@zcrm_new_pipeline_created","desc":"Value of deals created within the period, regardless of current stage. SUM(\"Amount\") FROM \"Deals\" WHERE \"Created Time\" >= :start AND \"Created Time\" < :end_exclusive."},
      {"name":"Win rate (by count)","alias":"@zcrm_win_rate_count","desc":"Share of closed deals that were won, by count. SELECT 100.0 * SUM(CASE WHEN \"Stage\"='CLOSED WON' THEN 1 ELSE 0 END) / NULLIF(SUM(CASE WHEN \"Stage\" IN ('CLOSED WON','CLOSED LOST','Closed-Missed') THEN 1 ELSE 0 END),0) FROM \"Deals\" WHERE \"Closing Date\" >= :start AND \"Closing Date\" <= :end."},
      {"name":"Win rate (by value)","alias":"@zcrm_win_rate_value","desc":"Share of closed-deal value that was won. SELECT 100.0 * SUM(CASE WHEN \"Stage\"='CLOSED WON' THEN \"Amount\" ELSE 0 END) / NULLIF(SUM(CASE WHEN \"Stage\" IN ('CLOSED WON','CLOSED LOST','Closed-Missed') THEN \"Amount\" ELSE 0 END),0) FROM \"Deals\" WHERE \"Closing Date\" >= :start AND \"Closing Date\" <= :end."},
      {"name":"Average sales cycle (days)","alias":"@zcrm_average_sales_cycle_days","desc":"Average days to win a deal. AVG(\"Sales Cycle Duration\") FROM \"Deals\" WHERE \"Stage\"='CLOSED WON' AND \"Closing Date\" BETWEEN :start AND :end."},
      {"name":"New-business revenue","alias":"@zcrm_new_business_revenue","desc":"Won revenue from new-license deals. SUM(\"Amount\") FROM \"Deals\" WHERE \"Stage\"='CLOSED WON' AND \"Deal Type\"='New License' AND \"Closing Date\" BETWEEN :start AND :end."},
      {"name":"Renewal revenue","alias":"@zcrm_renewal_revenue","desc":"Won revenue from renewals. SUM(\"Amount\") FROM \"Deals\" WHERE \"Stage\"='CLOSED WON' AND \"Deal Type\"='Renewal' AND \"Closing Date\" BETWEEN :start AND :end."},
      {"name":"Average lost deal size","alias":"@zcrm_avg_lost_deal_size","desc":"Mean value of lost deals. AVG(\"Amount\") FROM \"Deals\" WHERE \"Stage\" IN ('CLOSED LOST','Closed-Missed') AND \"Amount\" > 0 AND \"Closing Date\" BETWEEN :start AND :end."},
      {"name":"Renewal deals won","alias":"@zcrm_renewal_deal_count","desc":"Count of renewal deals won in the period. SELECT COUNT(*) FROM \"Deals\" WHERE \"Stage\"='CLOSED WON' AND \"Deal Type\"='Renewal' AND \"Closing Date\" BETWEEN :start AND :end."},
      {"name":"Pipeline by stage [breakdown]","alias":"@zcrm_pipeline_by_stage","desc":"Open pipeline grouped by stage; the top stage is the one holding the most value. SELECT \"Stage\", SUM(\"Amount\") AS value FROM \"Deals\" WHERE \"Stage\" NOT IN ('CLOSED WON','CLOSED LOST','Closed-Missed') GROUP BY \"Stage\" ORDER BY value DESC."} ] },
    "hbr_chargebee": { total: 25, metrics: [
      {"name":"MRR (active)","alias":"@chb_mrr","desc":"Monthly Recurring Revenue in the account currency (EUR). Use Chargebee's native \"MRR\" field on \"Subscriptions\" (already monthly-normalized), summed over ACTIVE subscriptions only, divided by 100 (MRR is stored in cents)."},
      {"name":"ARR (active)","alias":"@chb_arr","desc":"Annual Recurring Revenue = active MRR x 12, in currency units. SELECT SUM(\"MRR\")*12/100.0 FROM \"Subscriptions\" WHERE \"Status\" = 'Active'."},
      {"name":"ARPU (MRR per active customer)","alias":"@chb_arpu","desc":"Average Revenue Per User = active MRR (currency units) divided by the number of DISTINCT customers with an ACTIVE subscription. Numerator SQL: SELECT SUM(\"MRR\")/100.0 FROM \"Subscriptions\" WHERE \"Status\" = 'Active'."},
      {"name":"MRR incl. non-renewing","alias":"@chb_mrr_incl_non_renewing","desc":"MRR variant that also counts NON-RENEWING subscriptions (still paying until term end), not just active. Filter \"Status\" IN ('Active','Non Renewing') and sum native \"MRR\" / 100."},
      {"name":"Average MRR per active subscription","alias":"@chb_avg_mrr_per_active_sub","desc":"Average native \"MRR\" per ACTIVE subscription, in currency units. SELECT SUM(\"MRR\")/100.0/NULLIF(COUNT(*),0) FROM \"Subscriptions\" WHERE \"Status\" = 'Active'."},
      {"name":"MRR concentration in top subscription (%)","alias":"@chb_mrr_concentration","desc":"Share of active MRR contributed by the single largest active subscription. SELECT 100.0 * MAX(\"MRR\") / NULLIF(SUM(\"MRR\"),0) FROM \"Subscriptions\" WHERE \"Status\" = 'Active'."},
      {"name":"Active subscription rate (%)","alias":"@chb_active_subscription_rate","desc":"Percentage of subscriptions that are Active. SELECT 100.0 * SUM(CASE WHEN \"Status\" = 'Active' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Subscriptions\"."},
      {"name":"Subscription churn rate (%)","alias":"@chb_churn_rate","desc":"Percentage of subscriptions that are Cancelled. SELECT 100.0 * SUM(CASE WHEN \"Status\" = 'Cancelled' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Subscriptions\". 'Cancelled' is Title-case (not 'cancelled')."},
      {"name":"In-trial subscription share (%)","alias":"@chb_trial_subscription_share","desc":"Percentage of subscriptions currently in trial. SELECT 100.0 * SUM(CASE WHEN \"Status\" = 'In Trial' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Subscriptions\"."},
      {"name":"Non-renewing subscription share (%)","alias":"@chb_non_renewing_share","desc":"Percentage of subscriptions set to not renew (cancel at term end). SELECT 100.0 * SUM(CASE WHEN \"Status\" = 'Non Renewing' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Subscriptions\"."},
      {"name":"Annual billing share (%)","alias":"@chb_annual_plan_share","desc":"Percentage of subscriptions billed annually. SELECT 100.0 * SUM(CASE WHEN \"BillingPeriodUnit\" = 'year' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Subscriptions\"."},
      {"name":"Active subscription count","alias":"@chb_active_subscription_count","desc":"Number of subscriptions in Active status. SELECT COUNT(*) FROM \"Subscriptions\" WHERE \"Status\" = 'Active'."} ] }
  };
})();
