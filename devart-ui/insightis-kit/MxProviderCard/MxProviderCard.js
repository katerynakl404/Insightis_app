/* MxProviderCard — the Metrics empty-state data-source card (".prov-card" in the original,
   page-changes/metrics-landing.md → "Connector card" + "Hard requirements — provider card chip
   area"), its "Explore more" sibling (".prov-card.is-browse") and the metric chip it carries
   (".chip-meta").

   IK.MxProviderCard — DevartUI Card `elevated` (rounded xl: the 12px card, lift on hover)
     name        'Google Analytics'            title, one line, ellipsis
     connector   logo key for D.ConnectorLogo (default: name) — 48px (lg)
     status      'Not connected'               grey dot + Body/12 secondary
     metrics     [{ label, … }]                the preview chips — ALL of them, wrapping freely
                                               (locked rule: never hide a chip, never nowrap)
     onMetric    (metric, event) → open the metric's details
     onConnect   ()  → the Connect action. Plan-locked on Free (connections, UpgradeModal) —
                 IK.Locked puts the padlock in the button's icon slot; the card itself has no
                 marker (~50 identical cards would be ~50 identical padlocks)
     connectLabel  default 'Connect'

   IK.MxBrowseCard — DevartUI Card `ghost` (dashed, centred), the whole tile is the button
     label, sub, onClick           'Explore more Business Intelligence data sources'

   IK.MxMetricChip — the drill-in chip: label + a 10px brand chevron. Rest Surface/Page
     (dark Surface/Card 2) on Stroke/Border; hover Text/Primary on State/Hover (dark
     Surface/Chips) with a 35% brand-tinted border. DevartUI has no such chip (FilterChip is a
     radio pill), so it is built here.
     children, onClick, className

   <IK.MxProviderCard name="GitHub" metrics={[{ label: 'PRs opened' }]} onMetric={open} onConnect={c} />
   <IK.MxBrowseCard label="Explore more data sources" sub="200+ integrations available to connect" />
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.defineIcons({
    /* verbatim from pages/approved/metrics-landing.html */
    'mx-chip-chevron': '<path d="m9 6 6 6-6 6"/>',
    'mx-compass': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'
  });

  IK.MxMetricChip = function MxMetricChip(p) {
    return h('button', {
      type: 'button',
      className: IK.cx('ik-mx-chip', D.focusRing, p.className),
      onClick: p.onClick,
      'aria-haspopup': 'dialog'
    },
      p.children,
      h(IK.Icon, { name: 'mx-chip-chevron', size: 10, strokeWidth: 2.5, className: 'ik-mx-chip-arrow' }));
  };

  IK.MxProviderCard = function MxProviderCard(p) {
    var metrics = p.metrics || [];
    return h(D.Card, { variant: 'elevated', rounded: 'xl', className: p.className },
      h('div', { className: 'flex items-center gap-2' },
        h(D.ConnectorLogo, { connector: p.connector || p.name, size: 'lg' }),
        h('div', { className: 'flex min-w-0 flex-1 flex-col items-start' },
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'mb-0.5 max-w-full truncate' }, p.name),
          h('div', { className: 'inline-flex items-center gap-1' },
            h('span', { className: 'size-1.5 flex-none rounded-full bg-ink-inactive', 'aria-hidden': 'true' }),
            h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, p.status || 'Not connected')))),
      h('div', { className: 'flex flex-1 flex-wrap content-start items-center gap-1' },
        metrics.map(function (m, i) {
          return h(IK.MxMetricChip, { key: i, onClick: function (e) { if (p.onMetric) p.onMetric(m, e); } }, m.label);
        })),
      h('div', { className: 'flex items-center justify-end gap-2' },
        h(IK.Locked, { feature: 'connections', surface: 'modal' },
          h(D.Button, { variant: 'secondary', size: 'sm', fullWidth: true, type: 'button', onClick: p.onConnect }, p.connectLabel || 'Connect'))));
  };

  IK.MxBrowseCard = function MxBrowseCard(p) {
    function key(e) { if ((e.key === 'Enter' || e.key === ' ') && p.onClick) { e.preventDefault(); p.onClick(e); } }
    return h(D.Card, {
      variant: 'ghost', rounded: 'xl', role: 'button', tabIndex: 0,
      className: IK.cx(D.focusRing, p.className),
      onClick: p.onClick, onKeyDown: key
    },
      h('span', { className: 'ik-mx-browse-ic', 'aria-hidden': 'true' }, h(IK.Icon, { name: 'mx-compass', size: 16 })),
      h('div', null,
        h(D.Typography, { element: 'p', textStyle: 'title14', textColor: 'secondary', align: 'center', className: 'm-0 mb-1' }, p.label),
        h(D.Typography, { element: 'p', textStyle: 'body12', textColor: 'light', align: 'center', className: 'm-0' }, p.sub)));
  };
})();
