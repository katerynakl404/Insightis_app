(function () {
  var IK = window.InsightisKit, h = IK.h;
  function Foot(p) { return h('div', { className: IK.cx('flex flex-col gap-2 rounded-md border border-stroke bg-surface-card p-2', p.narrow ? 'w-12' : 'w-60') }, p.children); }

  IK.story('AccountMenu', { title: 'Interactive — expanded sidebar', description: 'Opens above the row. Account / Support, Resources ↗ (new tab), theme Light · Dark · System (↑/↓ to reach it, ←/→ to change), Log out.',
    render: function () { return h('div', { className: 'pt-96' }, h(Foot, null, h(IK.AccountMenu))); } });
  IK.story('AccountMenu', { title: 'Interactive — icon rail', description: 'The row is the avatar alone; the menu opens to the right.',
    render: function () { return h('div', { className: 'pt-80' }, h(Foot, { narrow: true }, h(IK.AccountMenu, { collapsed: true }))); } });
  IK.story('AccountMenu', { title: 'Interactive — classic glyphs (chat page)', description: 'iconSet "classic": Balance, Leave feedback, Resources, Dark and System in the older lucide drawings chat_page-landing still uses.',
    render: function () { return h('div', { className: 'pt-96' }, h(Foot, null, h(IK.AccountMenu, { iconSet: 'classic' }))); } });
  IK.story('AccountMenu', { title: 'User row — Free / Paid meta', render: function () {
    return h(Foot, null,
      h(IK.UserRow, { name: 'Kateryna K.', initial: 'K', meta: 'Admin · Free' }),
      h(IK.UserRow, { name: 'Kateryna K.', initial: 'K', meta: 'Admin · Pro' }),
      h(IK.UserRow, { name: 'A much longer display name than fits', initial: 'A', meta: 'Admin · Pro' }));
  } });
  IK.story('AccountMenu', { title: 'User row — collapsed', render: function () {
    return h(Foot, { narrow: true }, h(IK.UserRow, { name: 'Kateryna K.', initial: 'K', collapsed: true }));
  } });
})();
