/* QueueItem — one waiting message in the queue band (changes/QueueItem.md; the original ".mqi").
   Deliberately NOT a box: borderless, transparent, on the band's own surface — a line of text with
   a number in front of it, never something that reads as a second input.

     lead     the order number (DevartUI Counter, at rest) — on hover / focus it fades out and the
              drag grip takes its box (the grip is a surface you drag, not a button: no pill)
     body     the message in full (rows wrap, nothing truncates) and, UNDER it, an attachment as a
              secondary Badge with a file glyph (truncated at 11rem)
     actions  Edit · Remove (IconButton tertiary 2xs, tooltips) — revealed on hover / focus-within
              from 1024px up, always shown below
   The number and the actions sit on the FIRST line of a wrapped message. Hover / focus-within:
   State/Hover; keyboard focus on the row: an inset ring.

   It is the content of an IK.SortableList row (renderItem): IK.QueueBand renders it.
   h(IK.QueueItem, { item: { id, text, file }, index, handle, onEdit, onRemove, motion })
     motion   'entering' (prod's enter: 150ms, 4px up) · 'sending' (the mirrored exit) — the row
              leaving for the thread */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  /* Verbatim from the original queue markup. */
  IK.defineIcons({
    'qi-grip': { fill: true, inner: '<circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>' },
    'qi-edit': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    'qi-x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'qi-file': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'
  });

  /* The attachment chip — also what a sent message carries in the thread. */
  IK.QueueFileBadge = function QueueFileBadge(p) {
    return h(D.Badge, { variant: 'secondary', size: 'sm', className: 'ik-qi-file', leftSlot: h(IK.Icon, { name: 'qi-file', size: 12 }) }, p.name);
  };

  IK.QueueItem = function QueueItem(p) {
    var it = p.item;
    return h('div', { className: IK.cx('ik-qi', p.motion && 'is-' + p.motion) },
      h('span', { className: 'ik-qi-lead' },
        h(D.Counter, { className: 'ik-qi-num' }, p.index + 1),
        h('button', Object.assign({ type: 'button', className: 'ik-qi-grip' }, p.handle || {}), h(IK.Icon, { name: 'qi-grip', size: 14 }))),
      h('span', { className: 'ik-qi-body' },
        h('span', { className: 'ik-qi-text' }, it.text),
        it.file ? h(IK.QueueFileBadge, { name: it.file }) : null),
      h('span', { className: 'ik-qi-acts' },
        h(IK.Tip, { tip: 'Edit' },
          h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Edit queued message', onClick: function () { if (p.onEdit) p.onEdit(it.id); } },
            h(IK.Icon, { name: 'qi-edit' }))),
        h(IK.Tip, { tip: 'Remove' },
          h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Remove from queue', onClick: function () { if (p.onRemove) p.onRemove(it.id); } },
            h(IK.Icon, { name: 'qi-x' })))));
  };
})();
