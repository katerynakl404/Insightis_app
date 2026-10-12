(function () {
  var IK = window.InsightisKit, R = window.React, h = IK.h;
  function List(p) {
    var s = R.useState(p.items), items = s[0], setItems = s[1];
    return h('div', { className: 'ik-qb' },
      h(IK.SortableList, {
        items: items, getKey: function (it) { return it.id; }, className: 'ik-qb-list is-tall', itemClassName: 'ik-qb-row',
        onReorder: function (from, to) { var n = items.slice(), m = n.splice(from, 1)[0]; n.splice(to, 0, m); setItems(n); },
        renderItem: function (it, i, handle) { return h(IK.QueueItem, { item: it, index: i, handle: handle, motion: p.motion && i === 0 ? p.motion : null }); }
      }));
  }
  IK.story('QueueItem', { title: 'Rows — rest / hover / focus', wide: true,
    description: 'Not a box: a number (DevartUI Counter) and a line of text. Hover or focus: State/Hover, the grip takes the number’s box, Edit / Remove fade in (always shown below 1024px). Drag by the grip or Alt+↑/↓ on a focused row.',
    render: function () {
      return h(List, { items: [
        { id: 1, text: 'now split that by channel' },
        { id: 2, text: 'which channel grew fastest in EMEA and was the growth driven by new customers or by existing ones?' },
        { id: 3, text: 'and compare to Q3' }] });
    } });
  IK.story('QueueItem', { title: 'With an attachment — under its own text', wide: true,
    description: 'A secondary Badge with the file glyph, truncated at 11rem; it stays linked to the message wherever it moves.',
    render: function () { return h(List, { items: [{ id: 1, text: 'now split that by channel', file: 'targets_2026.xlsx' }, { id: 2, text: 'and compare to Q3' }] }); } });
  IK.story('QueueItem', { title: 'Leaving for the thread — is-sending', wide: true,
    description: 'Prod’s exit: 150ms, 4px up, then the row is gone and the rest renumber.',
    render: function () { return h(List, { motion: 'sending', items: [{ id: 1, text: 'now split that by channel' }, { id: 2, text: 'and compare to Q3' }] }); } });
})();
