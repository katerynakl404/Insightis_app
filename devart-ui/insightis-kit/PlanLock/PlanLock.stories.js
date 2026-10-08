(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.story('PlanLock', { title: 'Badge — the plan NAME', description: 'Popover head, modal eyebrow, a wide menu row. sm (20px) in rows, md (28px) beside a button.',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-3' },
        h(IK.PlanLock, { plan: 'Starter' }),
        h(IK.PlanLock, { plan: 'Pro' }),
        h(IK.PlanLock, { plan: 'Starter', glyph: true }),
        h(IK.PlanLock, { plan: 'Pro', glyph: true }),
        h(IK.PlanLock, { plan: 'Starter', size: 'md' }),
        h(IK.PlanLock, { plan: 'Pro', size: 'md', glyph: true }));
    } });

  IK.story('PlanLock', { title: 'LockGlyph — the padlock alone, currentColor',
    description: 'A button LEADS with it (its icon slot); white on primary, body ink on tertiary.',
    render: function () {
      return h('div', { className: 'flex flex-wrap items-center gap-3' },
        h(D.Button, { variant: 'primary', size: 'sm', leftSlot: h(IK.LockGlyph) }, 'Create Connection'),
        h(D.Button, { variant: 'secondary', size: 'sm', leftSlot: h(IK.LockGlyph) }, 'Connect'),
        h(D.Button, { variant: 'tertiary', size: 'xs', leftSlot: h(IK.LockGlyph) }, 'Add Metric'),
        h(D.IconButton, { variant: 'tertiary', size: 'sm', 'aria-label': 'Locked action' }, h(IK.LockGlyph)),
        h('span', { className: 'inline-flex items-center gap-1 text-sm text-ink-body' }, h(IK.LockGlyph), 'table cell'));
    } });

  IK.story('PlanLock', { title: 'In a menu — the row TRAILS the padlock, keeps its own icon',
    description: 'Open the menu: the marker sits at the right-hand edge; the row icons still say which row is which.',
    render: function () {
      return h(D.DropdownMenu, null,
        h(D.DropdownMenuTrigger, { asChild: true }, h(D.Button, { variant: 'secondary', size: 'sm' }, 'Open menu')),
        h(D.DropdownMenuContent, { align: 'start', className: 'w-56' },
          h(IK.Locked, { feature: 'connection-edit', locked: true },
            h(D.DropdownMenuItem, null, h(IK.Icon, { name: 'rename' }), 'Edit')),
          h(IK.Locked, { feature: 'connection-test', locked: true, marker: 'badge' },
            h(D.DropdownMenuItem, null, h(IK.Icon, { name: 'test-conn' }), 'Test connection')),
          h(D.DropdownMenuItem, { variant: 'danger' }, h(IK.Icon, { name: 'disconnect' }), 'Disconnect')));
    } });
})();
