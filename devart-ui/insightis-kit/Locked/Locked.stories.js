(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  IK.UPGRADE_NAVIGATES = false;

  function PlanSwitch() {
    var pl = IK.usePlan(), plan = pl[0], setPlan = pl[1];
    return h(D.SegmentedControl, { value: plan, onValueChange: setPlan },
      h(D.SegmentedControlList, { 'aria-label': 'Plan' },
        h(D.SegmentedControlTrigger, { value: 'paid', size: 'md' }, 'Paid'),
        h(D.SegmentedControlTrigger, { value: 'free', size: 'md' }, 'Free')));
  }
  function Kebab(p) {
    return h(D.DropdownMenu, null,
      h(D.DropdownMenuTrigger, { asChild: true },
        h(D.IconButton, { variant: 'tertiary', size: 'sm', 'aria-label': p.label || 'More actions' }, h(IK.Icon, { name: 'ellipsis' }))),
      h(D.DropdownMenuContent, { align: 'start', className: 'w-56' }, p.children));
  }
  function connMenu(locked) {
    return [
      h(IK.Locked, { key: 'e', feature: 'connection-edit', locked: locked },
        h(D.DropdownMenuItem, null, h(IK.Icon, { name: 'rename' }), 'Edit')),
      h(IK.Locked, { key: 't', feature: 'connection-test', locked: locked },
        h(D.DropdownMenuItem, null, h(IK.Icon, { name: 'test-conn' }), 'Test connection')),
      h(D.DropdownMenuSeparator, { key: 's' }),
      /* Removing what you already have is never a paid feature. */
      h(D.DropdownMenuItem, { key: 'd', variant: 'danger' }, h(IK.Icon, { name: 'disconnect' }), 'Disconnect')
    ];
  }

  IK.story('Locked', { title: 'Follows the plan — Paid ⇄ Free', wide: true,
    description: 'No `locked` prop: IK.usePlan() decides. Paid = the controls untouched; Free = locked, marked by shape, and each explains itself.',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-4' },
        h(PlanSwitch),
        h(IK.Locked, { feature: 'connections', surface: 'modal' },
          h(D.Button, { variant: 'primary', size: 'sm', leftSlot: h(IK.Icon, { name: 'plus' }) }, 'Create Connection')),
        h(Kebab, { label: 'Connection actions' }, connMenu()),
        h(IK.Locked, { feature: 'metrics', marker: 'none' },
          h('label', { className: 'flex items-center gap-2 rounded-md px-2 py-1 text-sm text-ink-body hover:bg-state-hover' },
            h(D.Switch, { defaultChecked: true, 'aria-label': 'Use MRR in chats' }), 'MRR')));
    } });

  IK.story('Locked', { title: 'Action button → the modal (a press)', description: 'Buttons keep every colour; the padlock takes their icon slot (replaces it, or is prepended). Hover does nothing — `tip` can name the plan in one line.',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-3' },
        h(IK.Locked, { feature: 'connections', surface: 'modal', locked: true },
          h(D.Button, { variant: 'primary', size: 'sm', leftSlot: h(IK.Icon, { name: 'plus' }) }, 'Create Connection')),
        h(IK.Locked, { feature: 'connections', surface: 'modal', locked: true },
          h(D.Button, { variant: 'secondary', size: 'sm' }, 'Connect')),
        h(IK.Locked, { feature: 'metrics', surface: 'modal', locked: true, tip: 'On the Starter plan' },
          h(D.Button, { variant: 'tertiary', size: 'xs', leftSlot: h(IK.Icon, { name: 'plus' }) }, 'Add Metric')),
        h(IK.Locked, { feature: 'metrics', surface: 'modal', locked: true },
          h(D.LinkButton, { href: '#' }, 'Create a custom metric →')));
    } });

  IK.story('Locked', { title: 'Menu rows → the popover, BESIDE the row', description: 'Hover a locked row (300 ms) or click it: the panel opens to the side so the list stays readable; the pointer can travel into it; the menu stays open. Label dims to Text/Secondary, the hover stays, the padlock trails.',
    render: function () { return h(Kebab, { label: 'Connection actions' }, connMenu(true)); } });

  IK.story('Locked', { title: 'Selection list — models', description: 'Insightis Light stays selectable (Free has it); Medium and Pro each name themselves in their own panel.',
    render: function () {
      function Models() {
        var s = R.useState('Insightis Light'), sel = s[0], setSel = s[1];
        function row(name, feature) {
          var item = h(D.DropdownMenuItem, { onSelect: function () { setSel(name); } },
            h('span', { className: 'min-w-0 flex-1' }, name),
            sel === name ? h(IK.Icon, { name: 'check', className: 'text-brand-primary' }) : null);
          return feature ? h(IK.Locked, { key: name, feature: feature, locked: true }, item) : h(IK.Fragment, { key: name }, item);
        }
        return h(D.DropdownMenu, null,
          h(D.DropdownMenuTrigger, { asChild: true }, h(D.Button, { variant: 'tertiary', size: 'sm', rightSlot: h(IK.Icon, { name: 'chevron-down' }) }, sel)),
          h(D.DropdownMenuContent, { align: 'start', className: 'w-56' },
            h(D.DropdownMenuLabel, null, 'Model'),
            row('Insightis Light'), row('Insightis Medium', 'model-medium'), row('Insightis Pro', 'model-pro')));
      }
      return h(Models);
    } });

  IK.story('Locked', { title: 'Switch row — no padlock', description: 'The WRAP is locked, never the switch: the switch sits inert at disabled opacity; the row keeps its hover and opens the popover.',
    render: function () {
      return h('div', { className: 'flex w-72 flex-col gap-1' },
        ['MRR', 'Win rate', 'Churn'].map(function (n, i) {
          return h(IK.Locked, { key: n, feature: 'metrics', locked: true, marker: 'none' },
            h('div', { className: 'flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-ink-body hover:bg-state-hover', role: 'button', tabIndex: 0 },
              n, h(D.Switch, { defaultChecked: i === 0, 'aria-label': 'Use ' + n })));
        }));
    } });

  IK.story('Locked', { title: 'Composer control — reads disabled, opens upward', description: 'The one control drawn disabled (its menu leads nowhere on Free): Text/Inactive, not-allowed, no hover surface; the padlock replaces its glyph; hover still opens the panel, above it. Render-prop form.',
    render: function () {
      function Conn(p) {
        return h(IK.Locked, { feature: 'connections', locked: p.locked, menuTrigger: true, look: 'disabled', side: 'top' }, function (lock) {
          return h(D.DropdownMenu, null,
            h(D.DropdownMenuTrigger, Object.assign({ asChild: true }, lock.props),
              h(D.Button, { variant: 'tertiary', size: 'sm', leftSlot: lock.locked ? lock.glyph : h(IK.Icon, { name: 'connections' }), rightSlot: h(IK.Icon, { name: 'chevron-down' }) }, 'Connections')),
            h(D.DropdownMenuContent, { side: 'top', align: 'start' },
              h(D.DropdownMenuLabel, null, 'Connections'),
              h(D.DropdownMenuItem, null, 'Production DB'),
              h(D.DropdownMenuItem, null, 'Main CRM')));
        });
      }
      return h('div', { className: 'flex items-center gap-6 pt-24' },
        h('span', { className: 'flex flex-col items-start gap-1' }, h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Free'), h(Conn, { locked: true })),
        h('span', { className: 'flex flex-col items-start gap-1' }, h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Paid'), h(Conn, { locked: false })));
    } });

  IK.story('Locked', { title: 'Catalog tile — click only, modal', description: 'A target bigger than its label answers the CLICK, never the hover (a panel under a passing pointer reads as grabbing). No padlock of its own.',
    render: function () {
      return h('div', { className: 'grid w-96 grid-cols-3 gap-3' },
        ['Salesforce', 'HubSpot', 'PostgreSQL'].map(function (c) {
          return h(IK.Locked, { key: c, feature: 'connections', surface: 'modal', clickOnly: true, locked: true },
            h(D.DataSourceCard, { connector: c }));
        }));
    } });

  IK.story('Locked', { title: 'Locked ≠ disabled', description: 'Disabled: no hover surface, not-allowed, Text/Inactive, a tooltip says why. Locked: full colour, hover, pointer, and a panel that says what turns it on.',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-3' },
        h(IK.Tip, { tip: 'Select a connection first' },
          h(D.Button, { variant: 'secondary', size: 'sm', 'aria-disabled': 'true', onClick: function (e) { e.preventDefault(); } }, 'Test (disabled)')),
        h(IK.Locked, { feature: 'connection-test', locked: true },
          h(D.Button, { variant: 'secondary', size: 'sm' }, 'Test (locked)')));
    } });

  IK.story('Locked', { title: 'Hook — IK.useLock', description: 'Same engine; the page renders lock.overlay itself.',
    render: function () {
      function Demo() {
        var lock = IK.useLock('metrics', { locked: true, surface: 'modal' });
        return h(IK.Fragment, null,
          h(D.Button, Object.assign({ variant: 'primary', size: 'sm' }, lock.props, { leftSlot: lock.locked ? lock.glyph : h(IK.Icon, { name: 'plus' }) }), 'Create Metric'),
          lock.overlay);
      }
      return h(Demo);
    } });
})();
