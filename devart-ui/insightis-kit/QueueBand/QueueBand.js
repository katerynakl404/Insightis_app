/* QueueBand — the strip between the thread and the composer that holds the follow-ups typed while the
   assistant is still answering (changes/QueueBand.md; the original ".mqb"). Same surface family as
   the composer under it (Surface/Card, hairline, 16px corner) so band + composer read as one stack.
   It renders only when it holds something; the page keeps its (empty) host so the composer column
   keeps the original's rhythm.

     head     list glyph · "N queued · sends after this reply" · Expand (IconButton xs) — Expand
              exists only while the list is measured as CLIPPED (or already expanded); it points up
              (the band grows upward) and turns back down once open
     list     IK.QueueItem rows in an IK.SortableList (drag by the grip, Alt+↑/↓, Delete removes);
              three rows tall, scrolls, pinned to its END; both edges fade while there is more;
              Expanded: the band's own ceiling (50vh) instead of three rows
     notes    "Message removed · Undo" in the gap a removed row left, each with its own clock
     paused   a DevartUI Alert (info / error / warning / neutral) states the cause and the count; the
              rows fold away behind "Show N Queued Messages" / "Hide Queue" (tertiary brand xs);
              actions are xs Buttons with a leading glyph, secondary first, the primary last

   h(IK.QueueBand, {
     items: [{ id, text, file }], notes: [{ key, index }],
     head: '2 queued · sends after this reply',
     pause: { variant: 'info'|'error'|'warning'|'neutral', title, description,
              actions: [{ label, icon: 'resume'|'retry'|'clear'|'buy', primary, onClick }] } | null,
     folded, onToggleFold, tall, onToggleTall,
     motion: { [id]: 'entering' | 'sending' },
     onEdit(id), onRemove(id), onUndo(key), onReorder(items)
   })
   IK.queueMotion — the kit's list moves, DOM-side like the original (the page hands over heights):
     .swap(el, commit, find)   one slot whose contents change (row → note, note → row): row-swap-out,
                               commit (flushSync), then the new element row-swap-in from the old height
     .collapse(el, done)       a note leaving: row-out, then done()
     .row(key) / .note(key)    the elements to animate */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'qb-list': '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    'qb-chev': '<path d="m6 9 6 6 6-6"/>',
    /* Alert glyphs follow the VARIANT (Toast's own marks); neutral is the circled stop. */
    'qb-v-info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    'qb-v-warning': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    'qb-v-error': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    'qb-v-neutral': '<circle cx="12" cy="12" r="10"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/>',
    /* Action verbs. */
    'qb-resume': '<path d="m7 4 12 8-12 8z"/>',
    'qb-retry': '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>',
    'qb-clear': '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    'qb-buy': '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2a2.8 2.8 0 0 0-2.5-1.2c-1.5 0-2.5.8-2.5 2s1 1.8 2.5 2 2.5.7 2.5 2-1 2-2.5 2a2.8 2.8 0 0 1-2.5-1.2"/><path d="M12 6.2v11.6"/>'
  });

  /* ── Motion ─────────────────────────────────────────────────────────────────────────────── */
  function onceEnd(el, cls, done) {
    var settled = false;
    function settle() { if (settled) return; settled = true; done(); }
    el.classList.add(cls);
    el.addEventListener('animationend', function (e) { if (e.target === el) settle(); });
    setTimeout(settle, 600);   /* backstop: a re-render or a hidden tab can swallow animationend */
  }
  IK.queueMotion = {
    row: function (id) { return document.querySelector('.ik-qb-list > [data-sort-key="' + id + '"]'); },
    note: function (key) { return document.querySelector('.ik-qb-list > [data-sort-key="note-' + key + '"]'); },
    collapse: function (el, done) {
      if (!el) { done(); return; }
      el.style.setProperty('--row-height', el.offsetHeight + 'px');
      onceEnd(el, 'animate-row-out', done);
    },
    swap: function (el, commit, find) {
      if (!el) { commit(); return; }
      var from = el.offsetHeight;
      onceEnd(el, 'ik-row-swap-out', function () {
        (window.ReactDOM && window.ReactDOM.flushSync ? window.ReactDOM.flushSync : function (f) { f(); })(commit);
        var next = find();
        if (!next) return;
        next.style.setProperty('--row-from', from + 'px');
        next.style.setProperty('--row-height', next.offsetHeight + 'px');
        onceEnd(next, 'animate-row-swap-in', function () {
          next.classList.remove('animate-row-swap-in');
          next.style.removeProperty('--row-from');
          next.style.removeProperty('--row-height');
        });
      });
    }
  };

  function Note(p) {
    return h('div', { className: 'ik-qb-note' },
      h('span', null, 'Message removed'),
      h(D.LinkButton, { asChild: true }, h('button', { type: 'button', onClick: function () { p.onUndo(p.k); } }, 'Undo')));
  }

  IK.QueueBand = function QueueBand(p) {
    var items = p.items || [], notes = (p.notes || []).slice().sort(function (a, b) { return a.index - b.index; });
    var wrap = R.useRef(null), listEl = R.useRef(null);
    /* The list element is SortableList's own <ul>; found after each render. */
    R.useLayoutEffect(function () { listEl.current = wrap.current ? wrap.current.querySelector('.ik-qb-list') : null; });
    var fade = IK.useScrollFade(listEl, [items.length, notes.length, p.tall, p.folded, !!p.pause]);
    /* "The last one must be visible": a scrolling queue is pinned to its END. */
    R.useLayoutEffect(function () {
      function pin() { var l = listEl.current; if (l) l.scrollTop = l.scrollHeight; }
      pin();
      /* Web fonts change the row heights after the first paint — land on the end again once they are in. */
      var alive = true;
      if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(function () { if (alive) pin(); });
      return function () { alive = false; };
    }, [items, p.notes, p.tall, p.folded]);
    if (!items.length) return null;

    var rows = items.map(function (it) { return { kind: 'item', id: it.id, item: it }; });
    for (var n = 0; n < notes.length; n++) rows.splice(Math.min(notes[n].index + n, rows.length), 0, { kind: 'note', id: 'note-' + notes[n].key, key: notes[n].key });
    var numbers = {}, k = 0;
    rows.forEach(function (r) { if (r.kind === 'item') numbers[r.id] = k++; });

    function reorder(from, to) {
      var next = rows.slice(), moved = next.splice(from, 1)[0];
      next.splice(to, 0, moved);
      if (p.onReorder) p.onReorder(next.filter(function (r) { return r.kind === 'item'; }).map(function (r) { return r.item; }));
    }
    function onKey(e) {
      if (e.key !== 'Delete') return;
      var li = e.target.closest && e.target.closest('[data-sort-key]');
      if (!li || li !== e.target) return;
      var id = li.getAttribute('data-sort-key');
      var it = items.filter(function (x) { return String(x.id) === id; })[0];
      if (it && p.onRemove) { e.preventDefault(); p.onRemove(it.id); }
    }

    var pause = p.pause, folded = !!pause && !!p.folded, count = items.length;
    var acts = pause && pause.actions && pause.actions.length
      ? pause.actions.slice().sort(function (a, b) { return (a.primary ? 1 : 0) - (b.primary ? 1 : 0); }).map(function (a) {
          return h(D.Button, {
            key: a.label, variant: a.primary ? 'primary' : 'secondary', size: 'xs', type: 'button', onClick: a.onClick,
            leftSlot: a.icon ? h(IK.Icon, { name: 'qb-' + a.icon }) : undefined
          }, a.label);
        })
      : null;
    var tallOn = !!p.tall;

    return h('div', {
      ref: wrap, onKeyDown: onKey,
      className: IK.cx('ik-qb', IK.scrollFadeClass(fade), folded && 'is-folded', (fade.clipped || tallOn) && 'has-expand')
    },
      pause ? h(D.Alert, {
        variant: pause.variant, size: 'sm', title: pause.title, description: pause.description,
        icon: h(IK.Icon, { name: 'qb-v-' + pause.variant }), actions: acts, actionsClassName: 'ik-qb-acts'
      }) : null,
      pause ? h(D.Button, {
        variant: 'primaryTertiary', size: 'xs', type: 'button', className: 'ik-qb-fold', 'aria-expanded': folded ? 'false' : 'true',
        onClick: p.onToggleFold
      }, folded ? 'Show ' + count + (count === 1 ? ' Queued Message' : ' Queued Messages') : 'Hide Queue') : null,
      pause ? null : h('div', { className: 'ik-qb-head' },
        h(IK.Icon, { name: 'qb-list', size: 16, className: 'ik-qb-head-ic' }),
        h('span', { className: 'ik-qb-head-t' }, p.head),
        h(IK.Tip, { tip: tallOn ? 'Collapse' : 'Expand' },
          h(D.IconButton, {
            variant: 'tertiary', size: 'xs', type: 'button', className: 'ik-qb-head-act', 'aria-expanded': tallOn ? 'true' : 'false',
            'aria-label': tallOn ? 'Collapse the queue' : 'Expand the queue', onClick: p.onToggleTall
          }, h(IK.Icon, { name: 'qb-chev' })))),
      h(IK.SortableList, {
        items: rows, getKey: function (r) { return r.id; }, onReorder: reorder,
        className: IK.cx('ik-qb-list', tallOn && 'is-tall'), itemClassName: 'ik-qb-row',
        renderItem: function (r, i, handle) {
          if (r.kind === 'note') return h(Note, { k: r.key, onUndo: p.onUndo });
          return h(IK.QueueItem, {
            item: r.item, index: numbers[r.id], handle: handle, motion: p.motion ? p.motion[r.id] : null,
            onEdit: p.onEdit, onRemove: p.onRemove
          });
        }
      }));
  };
})();
