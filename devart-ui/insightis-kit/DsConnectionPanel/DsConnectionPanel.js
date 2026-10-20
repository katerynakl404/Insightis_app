/* DsConnectionPanel — "Connection Details", the side panel a connection row opens (Connections page,
   #ds-panel in the original; page-changes/data-sources_connections-landing.md → "Connection row
   sidepanel"). DevartUI Sheet from the right, on the scrim; its own ✕, Esc and the scrim close it.

     header  "Connection Details"
     body    Name (Title/16) · Data source (logo + name) · Last check (IK.DsLastCheck: the pill and, on a paid
             plan, the re-test icon beside it, as on the rows — on Free it is ABSENT, not locked:
             there is no result to show, directive 2026-10-06) · Description (when there is one)
     footer  Disconnect (destructive outline, left) · Edit (primary) — Edit is plan-locked on Free
             (IK.Locked → UpgradeModal 'connections', the padlock takes its icon slot);
             Disconnect never is

   h(IK.DsConnectionPanel, {
     connection: { name, label, desc, lastSync, status, error, busy } | null,   // null = closed
     onOpenChange, onEdit, onDisconnect, onTest, onDetails,                     // each (name)
     plan: 'free' | 'paid'                                                      // optional — default IK.usePlan()
   })

   Shared workspaces — the same panel opens a workspace's connection in place (the Workspaces list's
   menu, a workspace's Connections tab), never a page:
     mode 'workspace'  the person's own connection in a workspace: Name · Data source · Metrics (they
                       are shared with it) · Also in (other workspaces); footer = Remove from Workspace
                       (destructive outline) alone — onRemove
     mode 'shared'     a connection shared with them: Name · Data source · Workspace(s) · Shared by ·
                       Metrics; NO footer — read-only, nothing to do (absent, not disabled)
     connection: { …, metrics: n, by, wsName, wsNames, also: [names], sharedWith: [names],
                   links: { name: href } }   links — a workspace named here opens its page (LinkButton)
   Last check shows only when the connection has one (lastSync).

   IK.DsDetailField { label, children } — one label/value pair of the panel (shared shape with the
   metrics detail panel: .dp-field / .dp-label in the original).                                  */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.DsDetailField = function DsDetailField(p) {
    return h('div', { className: 'flex flex-col gap-1' },
      h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary', className: 'uppercase tracking-wider' }, p.label),
      p.children);
  };

  IK.DsConnectionPanel = function DsConnectionPanel(p) {
    /* The last connection stays rendered while the Sheet slides out, so the panel never empties mid-exit. */
    var last = R.useRef(null);
    if (p.connection) last.current = p.connection;
    var c = p.connection || last.current;
    var plan = IK.usePlan()[0];
    var free = p.plan ? p.plan === 'free' : plan === 'free';
    function call(fn) { return function () { if (fn && c) fn(c.name); }; }
    var mode = p.mode || null;
    function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
    var off = mode === 'shared' && !!c && !!(c.locked || c.muted);
    /* a workspace's panels always know the way to Metrics; the Data Sources host passes it with workspaces on */
    var mh = p.metricsHref || (mode && IK.wsMetricsHref), metricsLink = c && mh ? mh(c) : null;
    return h(D.Sheet, { open: !!p.connection, onOpenChange: p.onOpenChange },
      /* the focus lands on the panel itself, not its first control — the warning by the name would open its
         tooltip on its own (user, 2026-10-20), as Metric Details does */
      h(D.SheetContent, { side: 'right', className: 'flex flex-col gap-0 p-0', 'aria-label': 'Connection Details',
        onOpenAutoFocus: function (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.focus) e.currentTarget.focus(); } },
        h('div', { className: 'ik-dscp-head' },
          h(D.SheetTitle, null, 'Connection Details')),
        c ? h('div', { className: 'ik-dscp-body scrollbar-thin' },
          h('div', { className: 'flex flex-col gap-5' },
            /* an unavailable shared one: the warning right after the name, as on the rows */
            h(IK.DsDetailField, { label: 'Name' },
              h('div', { className: 'flex min-w-0 items-center gap-2' },
                h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary', className: 'min-w-0 break-words' }, c.label || c.name),
                off ? h(IK.WsUnavailableMark, { by: c.by, locked: !c.muted, noun: 'connections' }) : null)),
            h(IK.DsDetailField, { label: 'Data source' },
              h('div', { className: 'flex min-w-0 items-center gap-1.5 text-sm text-ink-primary' },
                h(IK.ConnectorMark, { connector: c.connector || c.name, size: 'sm', label: c.name + ' logo' }),
                h('span', null, c.name))),
            /* the count, and Add Metric for one's own (user, 2026-10-20: "в самому конекшені дати кнопку додати метрику") */
            c.metrics != null ? h(IK.DsDetailField, { label: 'Metrics' },
              h('div', { className: 'flex flex-col items-start gap-3' },
                /* none yet and it can be added → the button alone, no dash above it (user, 2026-10-20) */
                c.metrics || mode || !p.onAddMetric ? h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' },
                  /* a way into Metrics with this connection chosen (user, 2026-10-20: "чому тут метрики не клікабельні") */
                  c.metrics ? (metricsLink ? h(D.LinkButton, { href: metricsLink }, plural(c.metrics, 'metric', 'metrics')) : plural(c.metrics, 'metric', 'metrics')) : 'No metrics') : null,
                !mode && p.onAddMetric ? h(IK.Locked, { feature: 'metrics', surface: 'modal' },
                  h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'plus', size: 16 }), onClick: call(p.onAddMetric) }, 'Add Metric')) : null)) : null,
            c.lastSync == null ? null : h(IK.DsDetailField, { label: 'Last check' },
              /* the re-test icon beside the pill, as on the rows — not a separate button (locked design) */
              h(IK.DsLastCheck, { lastSync: c.lastSync, status: c.status, error: c.error, busy: c.busy, onDetails: p.onDetails ? call(p.onDetails) : undefined, onTest: free || mode || !p.onTest ? undefined : call(p.onTest) })),
            c.desc ? h(IK.DsDetailField, { label: 'Description' },
              h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'm-0' }, c.desc)) : null,
            /* Access, last, the same in every panel (user, 2026-10-20): one's own — where it is shared and Share via
               Workspace (locked while the person's workspaces are Blocked, as in the menu); a shared one — who
               shared it and where; on a workspace page — the other workspaces it is in */
            !mode && (p.onAddToWorkspace || (c.sharedWith && c.sharedWith.length)) ? h(IK.WsAccess, { names: c.sharedWith, links: c.links,
              action: p.onAddToWorkspace ? h(IK.Locked, { feature: 'workspaces', surface: 'modal', tip: 'Available on Pro', locked: !!p.wsLocked },
                h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'ws-share', size: 16 }), onClick: call(p.onAddToWorkspace) }, 'Share via Workspace')) : null })
            : mode === 'shared' ? h(IK.WsAccess, { by: c.by, names: c.wsNames || (c.wsName ? [c.wsName] : []), links: c.links })
            : mode === 'workspace' && c.also && c.also.length ? h(IK.WsAccess, { inLabel: 'Also shared in', names: c.also, links: c.links }) : null)) : null,
        /* a shared one: nothing to change — unless it can't be used, then why and what brings it back */
        mode === 'shared' ? (off ? h('div', { className: 'ik-dscp-foot' },
          h(IK.WsUnavailableNote, { renewal: p.renewal, by: c.by, locked: !c.muted, noun: 'connections', feature: 'connections' })) : null)
        : mode === 'workspace' ? h('div', { className: 'ik-dscp-foot' },
          h(D.Button, {
            variant: 'destructiveOutline', size: 'sm', type: 'button', className: 'me-auto',
            leftSlot: h(IK.Icon, { name: 'ws-remove' }), onClick: function () { if (p.onRemove && c) p.onRemove(c); }
          }, 'Remove from Workspace')) : h('div', { className: 'ik-dscp-foot' },
          h(D.Button, {
            variant: 'destructiveOutline', size: 'sm', type: 'button', className: 'me-auto',
            leftSlot: h(IK.Icon, { name: 'disconnect' }), onClick: call(p.onDisconnect)
          }, 'Disconnect'),
          h(IK.Locked, { feature: 'connection-edit', locked: free },
            h(D.Button, {
              variant: 'primary', size: 'sm', type: 'button',
              leftSlot: h(IK.Icon, { name: 'rename' }), onClick: call(p.onEdit)
            }, 'Edit')))));
  };
})();
