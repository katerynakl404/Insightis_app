/* ConnectorMark — the brand mark for a data-source connector. Use it EVERYWHERE instead of
   D.ConnectorLogo; it takes the same props.

     h(IK.ConnectorMark, { connector: 'Stripe', size: 'xs'|'sm'|'md'|'lg', label?, className?, slug? })

   DevartUI's ConnectorLogo ships marks for 29 connectors and draws a letter tile for every
   other one. Decided 2026-10-08: where DevartUI HAS the mark it is used as it ships; where it
   does not, the original prototype's logo (pages/assets/logos, copied to ./assets) is drawn in
   the very same frame (connectorLogoVariants: size, rounded-md, object-contain) — so the
   page keeps every brand logo the original showed. Only a connector with neither falls back
   to DevartUI's letter tile — except where the original drew its own brand monogram tile
   (MONOGRAMS below: Azure DevOps), which is reproduced. The originals are also registered in
   D.CONNECTOR_LOGOS for the keys DevartUI lacks, so D.DataSourceCard's built-in logo draws them.
   `slug` forces a specific asset file name (without .svg).
   DevartUI's gap is recorded for the library in working/devart-compare/DIFFERENCES.md (A32). */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  var BASE = document.currentScript ? document.currentScript.src.replace(/ConnectorMark\.js(\?.*)?$/, '') : '';

  /* the original logo files, ./assets/<name>.svg */
  var ASSETS = [
    "actito", "activecampaign", "acuityscheduling", "acumatica", "airtable", "alloydb", "amazonrds", "amazons3",
    "amplitude", "asana", "avalara", "azureblobstorage", "azuredatalakestorage", "azuredwh", "azurefilestorage", "backup",
    "bamboohr", "bigcommerce", "bigquery", "bitbucket", "box", "constantcontact", "csv", "d365businesscentral",
    "database", "databricks", "dbt-streamline", "dearinventory", "demo", "drip", "dropbox", "dynamics",
    "dynamics365finops", "dynamicscrm", "elasticsearch", "emailoctopus", "exactonline", "exacttarget", "excelonline", "facebookads",
    "facebookpages", "firefliesai", "freshbooks", "freshcaller", "freshdesk", "freshsales", "ftp", "gemini",
    "github", "gitlab", "google", "googleads", "googleanalytics", "googleanalytics_v4", "googleapps", "googlecloudsqlmysql",
    "googlecloudsqlpostgresql", "googlecloudsqlserver", "googledrive", "googlesheets", "graphql", "grok", "heymarket", "hubdb",
    "hubspot", "insightly", "intercom", "jira", "jira_new", "keap", "linkedinads", "logger",
    "looker-studio", "magento", "mailchimp", "mailjet", "mariadb", "marketo", "mcp", "microsoft",
    "microsoftads", "mondaycom", "mongodb", "myob", "mysql", "netsuite", "netsuite_v2", "notion",
    "odata", "odbc", "onedrive", "openai", "oracle", "pinterest", "pipedrive", "podio",
    "postgresql", "quickbooks", "quickbooksdesktop", "redshift", "rest", "rocketchat", "sageaccounting", "salesforce",
    "scoro", "sdk", "sendpulse", "servicenow", "sftp", "sharepointfiles", "sharepointlists", "shiphero",
    "shipstation", "shopify", "shopify_v2", "slack", "smartsuite", "snowflake", "sql-api", "sqlazure",
    "sqlserver", "streak", "stripe", "sugar", "surveymonkey", "tiktokads", "timely", "twitterads",
    "upload", "woocommerce", "wordpress", "xero", "yammer", "zendesk", "zoho", "zohoanalytics",
    "zohobooks", "zohocreator", "zohodesk", "zohoinventory", "zohoinvoice", "zohopeople", "zohosprints", "zohoworkdrive",
    "zoom", "zuora"
  ];

  /* DevartUI's own name → mark resolution (ConnectorLogo: toSlug + ALIASES), mirrored so we
     know BEFORE rendering whether DevartUI has the mark. */
  var toSlug = function (s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); };
  var DS_ALIASES = {
    postgres: 'postgresql', pg: 'postgresql', s3: 'amazons3', aws3: 'amazons3', sfdc: 'salesforce',
    mssql: 'sqlserver', microsoftsqlserver: 'sqlserver', dynamics365: 'dynamics', dynamicscrm: 'dynamics',
    quickbooksonline: 'quickbooks', sugarcrm: 'sugar', zohocrm: 'zoho'
  };
  /* product names whose original file is named differently */
  var ASSET_ALIASES = {
    googleanalytics4: 'googleanalytics_v4', ga4: 'googleanalytics_v4', lookerstudio: 'looker-studio',
    zohocrm: 'zoho', sugarcrm: 'sugar', postgres: 'postgresql', mssql: 'sqlserver',
    microsoftsqlserver: 'sqlserver', azuresql: 'sqlazure', monday: 'mondaycom', twitter: 'twitterads',
    tiktok: 'tiktokads', facebook: 'facebookads', excel: 'excelonline', sharepoint: 'sharepointfiles',
    metaads: 'facebookads', meta: 'facebookads', restapi: 'rest'
  };
  /* product names the pages use for a connector whose mark is filed under a shorter name — resolved
     FIRST, so DevartUI's own mark is found too (the Metrics original draws Jira's logo beside
     "Jira Software Cloud", HubSpot's beside "HubSpot CRM") */
  var NAME_ALIASES = { jirasoftwarecloud: 'Jira', hubspotcrm: 'HubSpot' };
  function canon(connector) { return NAME_ALIASES[toSlug(connector)] || connector; }
  var byNorm = {};
  ASSETS.forEach(function (f) { byNorm[toSlug(f)] = f; });

  /* DevartUI's OWN marks — snapshotted before the originals are registered below. */
  var MARKS = D.CONNECTOR_LOGOS || {};
  var OWN = {};
  Object.keys(MARKS).forEach(function (k) { OWN[k] = true; });
  function dsHas(connector) {
    var s = toSlug(connector);
    return !!OWN[DS_ALIASES[s] || s];
  }

  /* D.DataSourceCard draws its OWN ConnectorLogo and takes no logo prop, so a catalog tile cannot
     be handed a ConnectorMark. ConnectorLogo looks its mark up in D.CONNECTOR_LOGOS; every key
     DevartUI has NO mark for is filled here with the original logo — never one DevartUI has — so
     the tile (and any bare ConnectorLogo) draws the same original logo ConnectorMark does. */
  if (Object.isExtensible(MARKS)) {
    var reg = function (key, file) { if (key && !MARKS[key]) MARKS[key] = BASE + 'assets/' + file + '.svg'; };
    ASSETS.forEach(function (f) { reg(toSlug(f), f); });
    Object.keys(ASSET_ALIASES).forEach(function (k) { reg(DS_ALIASES[k] || k, ASSET_ALIASES[k]); });
    Object.keys(NAME_ALIASES).forEach(function (k) {
      var t = toSlug(NAME_ALIASES[k]);
      if (!MARKS[k] && MARKS[DS_ALIASES[t] || t]) MARKS[k] = MARKS[DS_ALIASES[t] || t];
    });
  }
  function assetFor(connector, slug) {
    if (slug && ASSETS.indexOf(slug) >= 0) return slug;
    var s = toSlug(connector);
    return ASSET_ALIASES[s] || byNorm[s] || null;
  }

  /* Connectors the originals show NEITHER a DevartUI mark NOR a logo file for, but their own
     brand-coloured monogram tile: metrics-landing's MX_PROV_META points Azure DevOps at a Simple
     Icons image that does not exist, so its onerror fallback is what the original shows — the
     initials in white, 9px bold, on the brand colour. Reproduced (README rule 1a); raw by design,
     it is a third-party brand mark. */
  var MONOGRAMS = {
    azuredevops: { text: 'Az', bg: '#0078D4' } // ik-allow-raw — Azure DevOps brand blue
  };
  var MONO_INK = '#ffffff'; // ik-allow-raw — the original fallback tile's text

  IK.ConnectorMark = function ConnectorMark(p) {
    var name = canon(p.connector);
    if (name !== p.connector) p = Object.assign({}, p, { connector: name });
    if (dsHas(p.connector)) return h(D.ConnectorLogo, p);
    var file = assetFor(p.connector, p.slug);
    var mono = file ? null : MONOGRAMS[toSlug(p.slug || p.connector)];
    if (!file && !mono) return h(D.ConnectorLogo, p);
    var rest = Object.assign({}, p);
    delete rest.connector; delete rest.slug; delete rest.size; delete rest.label; delete rest.className;
    return h('span', Object.assign({
      /* D.cn (tailwind-merge), as ConnectorLogo does: a size class passed in (size-3.5) must REPLACE
         the variant's size-6, not sit beside it */
      className: (D.cn || IK.cx)(D.connectorLogoVariants({ size: p.size }), p.className),
      style: mono ? { background: mono.bg, color: MONO_INK, fontSize: '.5625rem', fontWeight: 700 } : undefined
    }, p.label ? { role: 'img', 'aria-label': p.label } : { 'aria-hidden': true }, rest),
      mono ? mono.text : h('img', { alt: '', className: 'h-full w-full object-contain', src: BASE + 'assets/' + file + '.svg' }));
  };
  IK.connectorAsset = function (connector, slug) { var f = assetFor(canon(connector), slug); return f ? BASE + 'assets/' + f + '.svg' : null; };
  IK.connectorHasDsMark = function (connector) { return dsHas(canon(connector)); };
})();
