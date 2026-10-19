(function () {
  var IK = window.InsightisKit, h = IK.h;
  function log(c) { console.log('[story] open', c.id); }
  function Lib(p) { return h(IK.ChatLibrary, Object.assign({ initial: IK.CHATLIB_DEMO, onOpen: log }, p)); }

  IK.story('ChatLibrary', { title: 'Default — count + Select, pinned rows first', wide: true,
    description: 'Hover a row for its ⋮ and the hover lift; the pin unpins; type in the search to filter live.',
    render: function () { return h(Lib); } });
  IK.story('ChatLibrary', { title: 'Selecting, nothing picked — Delete inactive', wide: true,
    render: function () { return h(Lib, { defaultSelecting: true }); } });
  IK.story('ChatLibrary', { title: 'Selecting, some picked — row click / checkbox toggles', wide: true,
    render: function () { return h(Lib, { defaultSelected: ['c2', 'c5'] }); } });
  IK.story('ChatLibrary', { title: 'Selecting, all picked — Deselect all', wide: true,
    render: function () { return h(Lib, { defaultSelected: IK.CHATLIB_DEMO.map(function (c) { return c.id; }) }); } });
  IK.story('ChatLibrary', { title: 'Search with results — the ✕ clears it', wide: true,
    render: function () { return h(Lib, { defaultQuery: 'q' }); } });
  IK.story('ChatLibrary', { title: 'Search, no matches — meta row hidden, no CTA', wide: true,
    render: function () { return h(Lib, { defaultQuery: 'zzz' }); } });
  IK.story('ChatLibrary', { title: 'No chats — search and meta row hidden; New Chat adds a row', wide: true,
    render: function () { return h(Lib, { initial: [] }); } });
  IK.story('ChatLibrary', { title: 'One chat — "1 conversation"', wide: true,
    render: function () { return h(Lib, { initial: [{ id: 'n1', title: 'New conversation', time: 'Just now' }] }); } });
  IK.story('ChatLibrary', { title: 'Narrow column (phone width)', wide: true,
    description: 'Below 768px of WINDOW width (and on touch) every row shows its ⋮ at rest (DevartUI RowMenuButton); narrow the window to see it.',
    render: function () { return h('div', { style: { maxWidth: '351px' } }, h(Lib)); } });
})();
