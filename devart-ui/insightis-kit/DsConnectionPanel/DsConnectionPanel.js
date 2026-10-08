/* DsConnectionPanel — "Connection Details", the side panel a connection row opens (Connections page,
   #ds-panel in the original; page-changes/data-sources_connections-landing.md → "Connection row
   sidepanel"). DevartUI Sheet from the right, on the scrim; its own ✕, Esc and the scrim close it.

     header  "Connection Details"
     body    Name (Title/16) · Data source (logo + name) · Last check (IK.DsLastCheck, and on a paid
             plan a "Test Connection" button at the far edge — on Free it is ABSENT, not locked:
             there is no result to show, directive 2026-10-06) · Description (when there is one)
     footer  Disconnect (destructive outline, left) · Edit (primary) — Edit is plan-locked on Free
             (IK.Locked → UpgradeModal 'connections', the padlock takes its icon slot);
             Disconnect never is

   h(IK.DsConnectionPanel, {
     connection: { name, label, desc, lastSync, status, error, busy } | null,   // null = closed
     onOpenChange, onEdit, onDisconnect, onTest, onDetails,                     // each (name)
     plan: 'free' | 'paid'                                                      // optional — default IK.usePlan()
   })

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
    return h(D.Sheet, { open: !!p.connection, onOpenChange: p.onOpenChange },
      h(D.SheetContent, { side: 'right', className: 'flex flex-col gap-0 p-0', 'aria-label': 'Connection Details' },
        h('div', { className: 'ik-dscp-head' },
          h(D.SheetTitle, null, 'Connection Details')),
        c ? h('div', { className: 'ik-dscp-body' },
          h('div', { className: 'flex flex-col gap-5' },
            h(IK.DsDetailField, { label: 'Name' },
              h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary' }, c.label || c.name)),
            h(IK.DsDetailField, { label: 'Data source' },
              h('div', { className: 'flex min-w-0 items-center gap-1.5 text-sm text-ink-primary' },
                h(D.ConnectorLogo, { connector: c.connector || c.name, size: 'sm', label: c.name + ' logo' }),
                h('span', null, c.name))),
            h(IK.DsDetailField, { label: 'Last check' },
              h('div', { className: 'flex flex-wrap items-center gap-2' },
                h(IK.DsLastCheck, { lastSync: c.lastSync, status: c.status, error: c.error, busy: c.busy, onDetails: call(p.onDetails) }),
                free ? null : h(D.Button, {
                  variant: 'secondary', size: 'xs', type: 'button', className: 'ms-auto',
                  leftSlot: h(IK.Icon, { name: 'test-conn' }), onClick: call(p.onTest)
                }, 'Test Connection'))),
            c.desc ? h(IK.DsDetailField, { label: 'Description' },
              h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'm-0' }, c.desc)) : null)) : null,
        h('div', { className: 'ik-dscp-foot' },
          h(D.Button, {
            variant: 'destructiveOutline', size: 'sm', type: 'button', className: 'me-auto',
            leftSlot: h(IK.Icon, { name: 'disconnect' }), onClick: call(p.onDisconnect)
          }, 'Disconnect'),
          h(IK.Locked, { feature: 'connections', surface: 'modal', locked: free },
            h(D.Button, {
              variant: 'primary', size: 'sm', type: 'button',
              leftSlot: h(IK.Icon, { name: 'rename' }), onClick: call(p.onEdit)
            }, 'Edit')))));
  };
})();
