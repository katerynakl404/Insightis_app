/* MxMetricSheet — "Metric Details", the side sheet a metric opens in (#mx-panel in the original;
   page-changes/metrics-landing.md → "Sidepanel"). DevartUI Sheet (right), laid out as the
   original's three bands: header (title · active switch · close), the field list, and a footer
   whose content depends on what kind of metric it is.

   <IK.MxMetricSheet
     open={bool} onOpenChange={fn}
     metric={{ name, alias, provider, connector, desc, custom, active, kind }}
       kind  'library'  a preview chip on a data-source card (not connected yet): no switch, footer
                        = "This metric is designed for <provider>…" + Connect <provider>
             'builtin'  a built-in row of the library: switch, footer = Duplicate & Customize
             'custom'   a custom row: switch, footer = Delete (left) · Edit (right)
       connector set → "Data source" + "Linked to <connector>"; unset → "Linked to <provider>"
     onActive(on)  onConnect()  onDuplicate()  onEdit()  onDelete()
   />

   Fields: Name (Title/16) · Data source / Linked to (logo + name) · Alias (Badge) · Type (Badge:
   Custom = primary, Built-in = secondary) · Definition (Body/14). Labels are caps Label/12.
   Free plan: the switch is locked (UpgradePopover on hover, no marker); Edit, Duplicate and
   Connect are locked (UpgradeModal, padlock in the icon slot). Delete is never gated.
   Width 420px (max 90vw) — the original's panel, wider than DevartUI's default sheet.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.defineIcons({
    /* verbatim from pages/approved/metrics-landing.html */
    'mx-x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
  });

  function Field(p) {
    return h('div', { className: 'flex flex-col gap-1' },
      h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary', className: 'uppercase tracking-wider' }, p.label),
      p.children);
  }
  function Value(p) {
    return h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'primary', className: 'flex min-w-0 items-center gap-1.5' }, p.children);
  }
  function Source(p) {
    return h('span', { className: 'inline-flex items-center gap-1.5 text-ink-primary' },
      h(D.ConnectorLogo, { connector: p.logo || p.name, size: 'xs' }), p.name);
  }

  IK.MxMetricSheet = function MxMetricSheet(p) {
    var m = p.metric || {};
    var kind = m.kind || (m.custom ? 'custom' : 'builtin');
    var showSwitch = kind !== 'library';

    var footer = null;
    if (kind === 'custom') {
      footer = h('div', { className: 'flex w-full gap-2' },
        h(D.Button, { variant: 'destructiveOutline', size: 'sm', type: 'button', className: 'me-auto', leftSlot: h(IK.Icon, { name: 'delete' }), onClick: p.onDelete }, 'Delete'),
        h(IK.Locked, { feature: 'metrics', surface: 'modal' },
          h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: p.onEdit }, 'Edit')));
    } else if (kind === 'library') {
      footer = h('div', { className: 'ik-mx-connect flex flex-col gap-3' },
        h('div', { className: 'flex items-start gap-2.5' },
          h(IK.Icon, { name: 'info', size: 16, className: 'ik-mx-connect-ic' }),
          h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'ik-mx-connect-copy m-0 min-w-0 flex-1' },
            'This metric is designed for ', h('strong', { className: 'font-semibold text-ink-primary' }, m.provider),
            '. Adding a connection activates all its metrics at once — no manual setup needed.')),
        h(IK.Locked, { feature: 'metrics', surface: 'modal' },
          h(D.Button, { variant: 'primary', size: 'md', fullWidth: true, type: 'button', onClick: p.onConnect }, 'Connect ' + m.provider)));
    } else {
      footer = h('div', { className: 'flex items-start gap-3' },
        h('div', { className: 'min-w-0 flex-1' },
          h(D.Typography, { element: 'p', textStyle: 'label14', textColor: 'primary', className: 'm-0 mb-0.5' }, 'Duplicate & Customize'),
          h(D.Typography, { element: 'p', textStyle: 'body12', textColor: 'secondary', className: 'm-0 leading-normal' }, 'Create your own version with a custom formula.')),
        h(IK.Locked, { feature: 'metrics', surface: 'modal' },
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', className: 'flex-none', onClick: p.onDuplicate }, 'Duplicate')));
    }

    return h(D.Sheet, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.SheetContent, {
        side: 'right', isCloseButtonVisible: false, className: 'ik-mx-sheet flex flex-col gap-0 p-0', 'aria-describedby': undefined,
        /* focus the sheet itself, not its first control: the original moves no focus, and landing on
           the close button would open its tooltip the moment the sheet appears */
        onOpenAutoFocus: function (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.focus) e.currentTarget.focus(); }
      },
        h('div', { className: 'ik-mx-sheet-head flex flex-none items-center gap-3' },
          h(D.SheetTitle, { className: 'm-0 min-w-0 flex-1 truncate' }, 'Metric Details'),
          showSwitch ? h('div', { className: 'flex flex-none items-center gap-1.5' },
            h(IK.Locked, { feature: 'metrics', marker: 'none' },
              h('span', { className: 'inline-flex items-center' },
                h(D.Switch, { size: 'sm', checked: !!m.active, 'aria-label': m.name + ' — toggle active', onCheckedChange: p.onActive }))),
            h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary' }, m.active ? 'Active' : 'Inactive')) : null,
          h(IK.Tip, { tip: 'Close' },
            h(D.SheetClose, { asChild: true },
              h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Close panel' }, h(IK.Icon, { name: 'mx-x' }))))),
        h('div', { className: 'ik-mx-sheet-body flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto' },
          h('div', { className: 'flex flex-col gap-5' },
            h(Field, { label: 'Name' }, h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary' }, m.name)),
            m.connector ? h(Field, { label: 'Data source' }, h(Value, null, h(Source, { name: m.provider, logo: m.logo }))) : null,
            h(Field, { label: 'Linked to' }, h(Value, null, m.connector ? m.connector : h(Source, { name: m.provider, logo: m.logo }))),
            h(Field, { label: 'Alias' }, h(Value, null, h(D.Badge, { variant: 'secondary' }, m.alias || '—'))),
            h(Field, { label: 'Type' }, h(Value, null, h(D.Badge, { variant: m.custom ? 'primary' : 'secondary' }, m.custom ? 'Custom' : 'Built-in'))),
            m.desc ? h(Field, { label: 'Definition' }, h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'm-0' }, m.desc)) : null)),
        footer ? h('div', { className: 'ik-mx-sheet-foot flex-none' }, footer) : null));
  };
})();
