(function () {
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  var SRC = ['now split that by channel', 'and compare to Q3', 'which channel grew fastest in EMEA and was the growth driven by new customers or by existing ones?', 'show top 5 products', 'also show margin by region'];
  function seed(n, file) { var out = []; for (var i = 0; i < n; i++) out.push({ id: i + 1, text: SRC[i % SRC.length], file: file && i === 0 ? 'targets_2026.xlsx' : null }); return out; }

  /* A working band: remove → note → undo (4s clock), reorder, expand, fold — the queue page's own moves. */
  function Band(p) {
    var it = R.useState(function () { return seed(p.n || 3, p.file); }), items = it[0], setItems = it[1];
    var nt = R.useState([]), notes = nt[0], setNotes = nt[1];
    var tl = R.useState(false), tall = tl[0], setTall = tl[1];
    var fd = R.useState(true), folded = fd[0], setFolded = fd[1];
    var seq = R.useRef(0), live = R.useRef({ items: items, notes: notes }); live.current = { items: items, notes: notes };
    function remove(id) {
      var cur = live.current.items, i = cur.map(function (x) { return x.id; }).indexOf(id); if (i < 0) return;
      var key = ++seq.current, gone = cur[i];
      IK.queueMotion.swap(IK.queueMotion.row(id), function () {
        setItems(live.current.items.filter(function (x) { return x !== gone; }));
        setNotes(live.current.notes.concat([{ key: key, index: i, item: gone }]));
      }, function () { return IK.queueMotion.note(key); });
      setTimeout(function () {
        IK.queueMotion.collapse(IK.queueMotion.note(key), function () { setNotes(function (ns) { return ns.filter(function (x) { return x.key !== key; }); }); });
      }, 4000);
    }
    function undo(key) {
      var r = live.current.notes.filter(function (x) { return x.key === key; })[0]; if (!r) return;
      IK.queueMotion.swap(IK.queueMotion.note(key), function () {
        setNotes(live.current.notes.filter(function (x) { return x.key !== key; }));
        var n = live.current.items.slice(); n.splice(Math.min(r.index, n.length), 0, r.item); setItems(n);
      }, function () { return IK.queueMotion.row(r.item.id); });
    }
    var pause = p.pause ? Object.assign({ description: items.length + ' messages are on hold' }, p.pause) : null;
    return h(D.PortalContainerProvider, { className: 'flex flex-col justify-end gap-2 pt-4' },
      h(IK.QueueBand, {
        items: items, notes: notes, head: items.length + ' queued · sends after this reply', pause: pause,
        folded: folded, onToggleFold: function () { setFolded(!folded); }, tall: tall, onToggleTall: function () { setTall(!tall); },
        onEdit: function (id) { setItems(items.filter(function (x) { return x.id !== id; })); }, onRemove: remove, onUndo: undo,
        onReorder: setItems
      }),
      h(IK.Composer, { plan: 'paid', prompt: 'rich', streaming: true, actionSlot: true, placeholder: 'Ask a follow-up — it will wait its turn', modelIcon: 'model-brain' }));
  }
  IK.story('QueueBand', { title: 'Three waiting — the band fits them', wide: true,
    description: 'Renders only when it holds something. Head: the count and when the queue leaves. Remove leaves "Message removed · Undo" in the gap (one slot, the contents swap); the note leaves on its own after 4s. Under it, the composer while a reply runs: Stop on an empty field, Send once something is typed.',
    render: function () { return h(Band, { n: 3 }); } });
  IK.story('QueueBand', { title: 'Five waiting — clipped, Expand appears', wide: true,
    description: 'Three rows tall, scrolls, pinned to its end; the edges fade while there is more. Expand (measured, not counted) points up; expanded, the band takes 50vh.',
    render: function () { return h(Band, { n: 5 }); } });
  IK.story('QueueBand', { title: 'With an attachment', wide: true, render: function () { return h(Band, { n: 2, file: true }); } });
  [['info', 'Waiting for your answer', []],
   ['error', 'The last reply didn’t finish', [{ label: 'Retry', primary: true, icon: 'retry' }, { label: 'Resume', icon: 'resume' }]],
   ['warning', 'You’re out of credits', [{ label: 'Buy Credits', primary: true, icon: 'buy' }], '2 messages are on hold — nothing was charged'],
   ['neutral', 'You stopped the reply', [{ label: 'Clear Queue', icon: 'clear' }, { label: 'Resume', primary: true, icon: 'resume' }]],
   ['neutral', '2 messages restored', [{ label: 'Clear Queue', icon: 'clear' }, { label: 'Resume', primary: true, icon: 'resume' }], 'Nothing sends until you resume']
  ].forEach(function (c) {
    IK.story('QueueBand', { title: 'Paused — ' + c[1], wide: true,
      description: 'A DevartUI Alert (' + c[0] + ') states the cause and the count; the rows fold behind "Show 2 Queued Messages" / "Hide Queue". Clear Queue only on the neutral pauses; the primary sits last.',
      render: function () { return h(Band, { n: 2, pause: { variant: c[0], title: c[1], actions: c[2], description: c[3] } }); } });
  });
})();
