/* MetricDetails — Metric details: IK.DetailsPanel filled from a metric — Active, the mark, name, alias and type, its
   definition, Linked to, Workspaces ("Goes with its connection, <name>" — the name opening Connection details over it),
   Edit · Duplicate · Delete (custom) or Duplicate & Customize (built-in); a library metric: Connect; a shared one:
   read-only, who shared it and where. One panel on Metrics and a workspace's Metrics tab. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  /* DetailsPanel's helpers, read when a panel is built (DetailsPanel.js may load after this file) */
  function k(n) { return function () { return IK.detailsKit[n].apply(null, arguments); }; }
  var act = k('act'), call = k('call'), plural = k('plural'), shareBtn = k('shareBtn'), lockBtn = k('lockBtn');

  /* a metric — o: { free, renewal, onActive(on), onEdit, onDuplicate, onDelete, onConnect, workspaces, onShare, shareLocked,
                      onOpenConnection }
     onOpenConnection  the other way (user, 2026-10-22: "метрики не можна видаляти напряму з воркспейсу а в тексті пояснення
                 сам конекшн клікабельний і відкриватиме поверх конекшн превью"): no Share here — a metric is not added to or
                 taken out of a workspace by itself; the connection's name in "Goes with its connection, <name>" is a link
                 that opens the connection's details over this panel, where it is shared or taken out
     workspaces  true (the page has workspaces): one's own metric always ends with Workspaces, as the concept's — that
                 it goes with its connection (the note), where that connection is (or the button alone), Share <connection>
                 (user, 2026-10-22: "там навіть нема пояснення про те що метрики шеряться разом з конекшеном", "саме для
                 нових зроби як на концептах"); without it, the section only once the connection is in a workspace */
  IK.metricDetails = function (m, o) {
    o = o || {};
    var kind = m.kind || (m.custom ? 'custom' : 'builtin'), free = !!o.free;
    var off = kind === 'readonly' && !!(m.locked || m.muted), by = m.by || (m.ws && m.ws.owner && m.ws.owner.name);
    var control = kind === 'library' || kind === 'readonly' ? null : h('div', { className: 'flex items-center gap-1.5' },
      h(IK.Locked, { feature: 'metrics', marker: 'none' },
        h('span', { className: 'inline-flex items-center' }, h(D.Switch, { size: 'sm', checked: !!m.active, 'aria-label': m.name + ' — toggle active', onCheckedChange: o.onActive }))),
      h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary' }, m.active ? 'Active' : 'Inactive'));
    var names = m.wsNames || [], conn = m.connector || m.provider;
    var own = kind === 'custom' || kind === 'builtin';
    return {
      title: 'Metric details', control: control,
      mark: h(IK.ConnectorMark, { connector: m.logo || m.provider, size: 'md' }), name: m.name,
      meta: h('span', { className: 'flex flex-wrap items-center gap-2' },
        h(D.Badge, { variant: 'secondary', size: 'sm' }, m.alias || '—'),
        h(D.Badge, { variant: m.custom ? 'primary' : 'secondary', size: 'sm' }, m.custom ? 'Custom' : 'Built-in')),
      after: off ? h(IK.WsUnavailableMark, { by: by, locked: !m.muted, noun: 'metrics', feature: 'metrics', renewal: o.renewal, withAction: true }) : null,
      description: m.desc ? { label: 'Definition', text: m.desc } : null,
      rows: [{ label: 'Linked to', value: m.connector ? m.connector + ' \u00b7 ' + m.provider : m.provider }],
      access: kind === 'readonly' ? (names.length ? { names: names, links: m.links } : null)
        /* Link: no "Not shared yet" — the note and its link say it (user, 2026-10-22: "забери текст нот шерд") */
        : own && (o.workspaces || names.length) ? { names: names, links: m.links, empty: o.onOpenConnection ? false : 'Not shared yet',
            note: o.onOpenConnection && conn
              ? { label: h(IK.Fragment, null, 'Goes with its connection, ', h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); o.onOpenConnection(); } }, conn)),
                  text: 'Every workspace ' + conn + ' is in sees this metric — open the connection to share it or take it out of a workspace' }
              : { label: 'Goes with its connection' + (conn ? ', ' + conn : ''), text: 'Every workspace ' + (conn || 'its connection') + ' is in sees this metric — share or remove the connection to change that' },
            action: o.onShare && !o.onOpenConnection ? shareBtn('Share ' + (conn || 'Connection'), o.shareLocked, o.onShare) : null } : null,
      acts: kind === 'custom' ? { main: [act('Edit', 'rename', { feature: 'metrics', locked: free, onClick: o.onEdit })], more: [act('Duplicate', 'copy', { feature: 'metrics', locked: free, onClick: o.onDuplicate })], danger: [act('Delete', 'delete', { onClick: o.onDelete })] }
        : kind === 'builtin' ? { specific: [act('Duplicate & Customize', 'copy', { short: 'Duplicate', tip: 'Duplicate & Customize — your own copy with a custom formula', feature: 'metrics', locked: free, onClick: o.onDuplicate })], mainVariant: 'secondary',
            note: h('div', { className: 'flex min-w-0 flex-col' },
              h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'primary' }, 'Duplicate & Customize'),
              h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Your own copy with a custom formula')) } : null,
      /* not connected yet: why and Connect, pinned at the bottom (the product's own block) */
      foot: kind === 'library' ? { block: h('div', { className: 'ik-mx-connect flex flex-col gap-3' },
        h('div', { className: 'flex items-start gap-2.5' },
          h(IK.Icon, { name: 'info', size: 16, className: 'ik-mx-connect-ic' }),
          h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'ik-mx-connect-copy m-0 min-w-0 flex-1' },
            'This metric is designed for ', h('strong', { className: 'font-semibold text-ink-primary' }, m.provider),
            '. Adding a connection activates all its metrics at once — no manual setup needed.')),
        h(IK.Locked, { feature: 'metrics', surface: 'modal' },
          h(D.Button, { variant: 'primary', size: 'md', className: 'w-full', type: 'button', onClick: o.onConnect }, 'Connect ' + m.provider))) } : null
    };
  };

  /* IK.MetricDetails — the one Metric details, the same wherever it opens (user, 2026-10-22: "всі панелі не залежно від місця мали
     виглядати однаково!"); only the handlers come from the page.
       h(IK.MetricDetails, { metric, onOpenChange, …options })   a Sheet; metric null → closed — it keeps the last one, and its
                                                              options, while it slides out
       h(IK.MetricDetails, { metric, inline: true, style, …options })   in place (stories, the concept page)
     options: what IK.metricDetails(metric, options) takes (above) */
  IK.MetricDetails = function MetricDetails(p) {
    var last = R.useRef(null);
    var o = Object.assign({}, p);
    ['metric', 'onOpenChange', 'inline', 'style', 'className'].forEach(function (x) { delete o[x]; });
    if (p.metric) last.current = { it: p.metric, o: o };
    if (!last.current) return null;
    var props = IK.metricDetails(last.current.it, p.metric ? o : last.current.o);
    if (p.inline) return h(IK.DetailsPanel, Object.assign({ inline: true, style: p.style, className: p.className }, props));
    return h(IK.DetailsPanel, Object.assign({ open: !!p.metric, onOpenChange: p.onOpenChange }, props));
  };
})();
