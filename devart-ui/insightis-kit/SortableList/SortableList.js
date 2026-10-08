/* SortableList — drag-to-reorder for any list (port of kit-kit.js §4 "Sortable list" + its
   kit-theme.css rules; first consumer: the message queue in pages/concept/chat_page-queue.html).
   Generic on purpose: it knows nothing about what the rows are. Pointer drag (mouse, pen and touch
   in one path) by a HANDLE, and the same move from the keyboard: Alt+↑ / Alt+↓ on a focused row.
   It never reorders anyone's data — it reports one move and the owner re-renders.

     drag     pressing the handle lifts the row out of the flow (fixed, Surface/Card + the hover-lift
              shadow, grabbing cursor) and leaves a dashed, brand-tinted gap where it will land; the
              gap jumps once the pointer crosses a sibling's MIDLINE (no flicker on a boundary).
              Rows that are not rendered (a clamped list's hidden tail) never take part.
     drop     onReorder(from, to); focus stays on the moved row
     keyboard Alt+↑ / Alt+↓ on the focused row → onReorder(from, from ∓ 1); focus follows the row

   h(IK.SortableList, {
     items: queue,                                   // anything
     getKey: function (item) { return item.id; },
     onReorder: function (from, to) {},              // move items[from] to index `to`
     renderItem: function (item, index, handle) {    // `handle` = props for the drag handle element
       return h(IK.Fragment, null,
         h('button', Object.assign({ type: 'button' }, handle), gripIcon),   // aria-label "Drag to reorder"
         item.text);
     },
     as: 'ul',                                       // list element (li rows) — or 'div'
     className, itemClassName, 'aria-label'
   })
   IK.SortHandle { handle, className, children } — a ready-made grip button (IconButton tertiary 2xs,
   six-dot glyph) to drop into renderItem: h(IK.SortHandle, { handle: handle }).               */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'sort-grip': { fill: true, inner: '<circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>' }
  });

  IK.SortHandle = function SortHandle(p) {
    return h(D.IconButton, Object.assign({ variant: 'tertiary', size: '2xs', className: p.className }, p.handle),
      p.children || h(IK.Icon, { name: 'sort-grip', size: 14 }));
  };

  IK.SortableList = function SortableList(p) {
    var items = p.items || [];
    var getKey = p.getKey || function (it, i) { return it && it.id != null ? it.id : i; };
    var ds = R.useState(null), drag = ds[0], setDrag = ds[1];   // { key, from, over, top, left, width, height, dy }
    var listRef = R.useRef(null), dragRef = R.useRef(null), focusKey = R.useRef(null);
    var Tag = p.as || 'ul', ItemTag = Tag === 'ul' || Tag === 'ol' ? 'li' : 'div';

    /* After a move, focus follows the row that moved. */
    R.useEffect(function () {
      if (focusKey.current == null || !listRef.current) return;
      var el = listRef.current.querySelector('[data-sort-key="' + String(focusKey.current).replace(/"/g, '\\"') + '"]');
      focusKey.current = null;
      if (el) el.focus();
    });

    function rowsOnScreen(exceptKey) {
      return [].filter.call(listRef.current ? listRef.current.children : [], function (n) {
        return n.hasAttribute('data-sort-key') && n.getAttribute('data-sort-key') !== String(exceptKey) && n.getBoundingClientRect().height > 0;
      });
    }

    function start(e, key, index) {
      if (e.button) return;
      e.preventDefault();
      var row = e.currentTarget.closest('[data-sort-key]');
      if (!row) return;
      var r = row.getBoundingClientRect();
      var d = { key: key, from: index, over: index, top: r.top, left: r.left, width: r.width, height: r.height, startY: e.clientY, dy: 0 };
      dragRef.current = d; setDrag(d);
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
      function move(ev) {
        var cur = dragRef.current; if (!cur) return;
        var dy = ev.clientY - cur.startY;
        var sibs = rowsOnScreen(cur.key), over = null;
        for (var i = 0; i < sibs.length; i++) {
          var b = sibs[i].getBoundingClientRect();
          if (ev.clientY < b.top + b.height / 2) { over = i; break; }
        }
        if (over == null) over = sibs.length;
        var next = Object.assign({}, cur, { dy: dy, over: over });
        dragRef.current = next; setDrag(next);
      }
      function end() {
        document.removeEventListener('pointermove', move, true);
        document.removeEventListener('pointerup', end, true);
        document.removeEventListener('pointercancel', end, true);
        var cur = dragRef.current; dragRef.current = null; setDrag(null);
        if (!cur) return;
        focusKey.current = cur.key;
        if (cur.over !== cur.from && p.onReorder) p.onReorder(cur.from, cur.over);
      }
      document.addEventListener('pointermove', move, true);
      document.addEventListener('pointerup', end, true);
      document.addEventListener('pointercancel', end, true);
    }

    function onKey(e, key, index) {
      if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
      var to = index + (e.key === 'ArrowUp' ? -1 : 1);
      if (to < 0 || to >= items.length) return;
      e.preventDefault();
      focusKey.current = key;
      if (p.onReorder) p.onReorder(index, to);
    }

    /* Render order while dragging: the other rows with the gap at `over`, and the lifted row last
       (it is position:fixed, so where it sits in the DOM does not move it). */
    var rows = items.map(function (it, i) {
      var key = getKey(it, i);
      var lifted = drag && drag.key === key;
      var handle = {
        'data-sort-handle': '', 'aria-label': 'Drag to reorder', tabIndex: -1,
        onPointerDown: function (e) { start(e, key, i); }
      };
      return h(ItemTag, {
        key: key, 'data-sort-key': String(key), tabIndex: 0,
        className: IK.cx('ik-sort-item', p.itemClassName, lifted && 'is-dragging'),
        style: lifted ? { position: 'fixed', top: (drag.top + drag.dy) + 'px', left: drag.left + 'px', width: drag.width + 'px', zIndex: 50, pointerEvents: 'none' } : undefined,
        onKeyDown: function (e) { onKey(e, key, i); }
      }, p.renderItem(it, i, handle));
    });
    if (drag) {
      var liftedRow = rows.splice(drag.from, 1)[0];
      rows.splice(drag.over, 0, h(ItemTag, { key: '__ik-sort-ph', className: 'ik-sort-ph', 'aria-hidden': 'true', style: { height: drag.height + 'px' } }));
      rows.push(liftedRow);
    }
    return h(Tag, { ref: listRef, 'data-sortable': '', 'aria-label': p['aria-label'], className: IK.cx('ik-sort-list', p.className) }, rows);
  };
})();
