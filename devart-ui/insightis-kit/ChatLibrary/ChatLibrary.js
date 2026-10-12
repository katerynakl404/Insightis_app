/* ChatLibrary — the body of the Chats library (pages/concept/chats-landing.html, below its title):
   the search field, the meta row and the list of IK.ChatRow, with its own selection mode and its
   two empty states. All DevartUI underneath — InputGroup, MetaRow, LinkButton, Button, StatusView —
   this component owns only the list's state and the order the pieces show in.

     search   InputGroup lg: leading magnifier, live filter on input (name contains, trimmed, any
              case), a trailing ✕ "Clear search" (tooltip) only while the field holds text — it
              empties the field and puts focus back in it. Hidden when there are no chats at all.
     meta     view       "N conversation(s)" · Select (enters selection mode with nothing picked)
              selecting  "N selected" (every selected chat, filtered out or not) · Select all /
                         Deselect all (the VISIBLE rows) · Delete (destructiveTertiary, inactive at 0)
                         · ✕ "Exit selection" (clears the selection). Hidden while no row is visible.
     list     pinned rows first, then the rest, each group in its original order. A row opens its
              chat (onOpen) — or, while selecting, toggles itself. Row menu: Pin/Unpin · Select /
              Deselect (enters selection mode) · Rename (inline) · Delete — immediate, no confirm
              (the original deletes at once, row and bulk alike). Bulk Delete leaves selection mode.
     empty    no match  the fading result cards + "No matches found" + 'No conversations match "q"
                        — try a different search' (no CTA; the search stays, the meta row goes)
              no chats  the chat bubble + "No conversations yet" + secondary "New Chat", which adds
                        a "New conversation · Just now" row
              Either one leaves selection mode — the selection itself is kept (as in the original).

   Spacing (original .cl-page rhythm): blocks 12px apart, the list 2px under the block above it —
   the meta row and its list read as one unit. While selecting, the meta row is sticky under the
   ReviewBar (--ik-bar-h) on the page colour — inert inside an overflow:hidden main column, which is
   how chats-landing renders it.

   h(IK.ChatLibrary, {
     initial: [{ id, title, time, pinned }],     // the seed (the component owns the list after that)
     onOpen: function (chat) {},                 // a row was clicked (not selecting)
     defaultQuery: '', defaultSelecting: false, defaultSelected: ['c2'],   // stories / deep links
     className
   })

   IK.CHATLIB_DEMO   the original's ten chats (three pinned), verbatim — for the page and the stories */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.CHATLIB_DEMO = [
    { id: 'c1', title: 'Q1 revenue commentary draft', time: '2h ago', pinned: true },
    { id: 'c2', title: 'Onboarding cohort summary', time: 'Yesterday', pinned: true },
    { id: 'c3', title: 'Churn deep-dive', time: 'Mon', pinned: true },
    { id: 'c4', title: 'Top movers — weekly', time: '3d ago' },
    { id: 'c5', title: 'Q4 GTM retro', time: '4d ago' },
    { id: 'c6', title: 'NPS survey synthesis', time: 'last week' },
    { id: 'c7', title: 'Activation funnel hypotheses', time: 'last week' },
    { id: 'c8', title: 'ARR by segment — Mar', time: '2 weeks ago' },
    { id: 'c9', title: 'Pricing experiment readout', time: 'Mar 14' },
    { id: 'c10', title: 'Support ticket themes — Feb', time: 'Feb 28' }
  ];

  /* Verbatim from chats-landing.html. */
  IK.defineIcons({
    'clib-search': '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    'clib-clear': '<path d="M18 6 6 18M6 6l12 12"/>',
    'clib-empty': '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>'
  });

  function seed(list, selected) {
    var sel = {}; (selected || []).forEach(function (id) { sel[id] = true; });
    return (list || []).map(function (c) { return { id: c.id, title: c.title, time: c.time, pinned: !!c.pinned, selected: !!sel[c.id] }; });
  }

  IK.ChatLibrary = function ChatLibrary(p) {
    var cs = R.useState(function () { return seed(p.initial, p.defaultSelected); }), chats = cs[0], setChats = cs[1];
    var es = R.useState(!!p.defaultSelecting || !!(p.defaultSelected && p.defaultSelected.length)), selecting = es[0], setSelecting = es[1];
    var qs = R.useState(p.defaultQuery || ''), query = qs[0], setQuery = qs[1];
    var inputRef = R.useRef(null), newN = R.useRef(0);

    var q = query.trim().toLowerCase();
    var visible = chats.filter(function (c) { return !q || c.title.toLowerCase().indexOf(q) !== -1; });
    var sorted = visible.filter(function (c) { return c.pinned; }).concat(visible.filter(function (c) { return !c.pinned; }));
    var selectedCount = chats.filter(function (c) { return c.selected; }).length;
    var allVisibleSelected = visible.length > 0 && visible.every(function (c) { return c.selected; });
    var noMatch = !visible.length && chats.length > 0 && !!query.trim();
    var empty = !visible.length && !noMatch;

    /* An empty list has no rows to act on: selection mode ends (the original's render does it). */
    R.useEffect(function () { if (!visible.length && selecting) setSelecting(false); });

    function patch(id, ch) { setChats(function (l) { return l.map(function (c) { return c.id === id ? Object.assign({}, c, ch) : c; }); }); }
    function remove(id) { setChats(function (l) { return l.filter(function (c) { return c.id !== id; }); }); }
    function exitSelecting() { setSelecting(false); setChats(function (l) { return l.map(function (c) { return c.selected ? Object.assign({}, c, { selected: false }) : c; }); }); }
    function toggleAll() {
      if (!visible.length) return;
      var ids = {}; visible.forEach(function (c) { ids[c.id] = 1; });
      setChats(function (l) { return l.map(function (c) { return ids[c.id] ? Object.assign({}, c, { selected: !allVisibleSelected }) : c; }); });
    }
    function deleteSelected() {
      if (!selectedCount) return;
      setChats(function (l) { return l.filter(function (c) { return !c.selected; }); });
      setSelecting(false);
    }
    function newChat() {
      newN.current += 1;
      var id = 'new-' + newN.current;
      setChats(function (l) { return [{ id: id, title: 'New conversation', time: 'Just now', pinned: false, selected: false }].concat(l); });
      setSelecting(false);
    }
    function clearSearch() {
      setQuery('');
      var el = inputRef.current; if (el) el.focus();
    }

    var search = chats.length ? h(D.InputGroup, { size: 'lg', role: 'search' },
      h(D.InputGroupAddon, null, h(IK.Icon, { name: 'clib-search', size: 20 })),
      h(D.InputGroupInput, {
        ref: inputRef, type: 'search', value: query, placeholder: 'Search conversations…', 'aria-label': 'Search conversations',
        onChange: function (e) { setQuery(e.target.value); }
      }),
      query ? h(IK.Tip, { tip: 'Clear search' },
        h(D.InputGroupAction, { 'aria-label': 'Clear search', onClick: clearSearch }, h(IK.Icon, { name: 'clib-clear', size: 16 }))) : null) : null;

    var meta = null;
    if (visible.length) {
      var noun = visible.length === 1 ? 'conversation' : 'conversations';
      meta = selecting
        ? h(D.MetaRow, { className: 'ik-chatlib-meta is-selecting', onClear: exitSelecting, clearLabel: 'Exit selection' },
            h(D.MetaRowCount, null, selectedCount + ' selected'),
            h(D.LinkButton, { asChild: true },
              h('button', { type: 'button', onClick: toggleAll }, allVisibleSelected ? 'Deselect all' : 'Select all')),
            h(D.MetaRowEnd, null,
              h(D.Button, {
                variant: 'destructiveTertiary', size: 'sm', type: 'button', 'aria-disabled': selectedCount === 0 || undefined,
                leftSlot: h(IK.Icon, { name: 'delete' }), onClick: deleteSelected
              }, 'Delete')))
        : h(D.MetaRow, { className: 'ik-chatlib-meta' },
            h(D.MetaRowCount, null, visible.length + ' ' + noun),
            h(D.LinkButton, { asChild: true },
              h('button', { type: 'button', onClick: function () { setSelecting(true); } }, 'Select')));
    }

    var list;
    if (noMatch) {
      list = h(D.StatusView, {
        size: 'lg', surface: 'embedded', withIconHalo: false, role: 'status',
        icon: h(D.EmptyStateIllustration, { className: 'mb-1' }),
        title: 'No matches found',
        description: 'No conversations match "' + query.trim() + '" — try a different search'
      });
    } else if (empty) {
      list = h(D.StatusView, {
        size: 'lg', surface: 'embedded', withIconHalo: false, role: 'status',
        icon: h(IK.Icon, { name: 'clib-empty', size: 48, strokeWidth: 1.5, className: 'mb-1 text-ink-inactive' }),
        title: 'No conversations yet',
        description: 'Start a new chat to explore your data and surface insights',
        actions: h(D.Button, { variant: 'secondary', size: 'md', type: 'button', leftSlot: h(IK.Icon, { name: 'plus' }), onClick: newChat }, 'New Chat')
      });
    } else {
      list = h(IK.ChatRowList, { 'aria-label': 'Conversations' }, sorted.map(function (c) {
        return h(IK.ChatRow, {
          key: c.id, title: c.title, time: c.time, pinned: c.pinned, selected: c.selected, selecting: selecting,
          onOpen: function () { if (p.onOpen) p.onOpen(c); },
          onToggleSelect: function () { setSelecting(true); patch(c.id, { selected: !c.selected }); },
          onTogglePin: function () { patch(c.id, { pinned: !c.pinned }); },
          onRename: function (t) { patch(c.id, { title: t }); },
          onDelete: function () { remove(c.id); }
        });
      }));
    }

    return h('div', { className: IK.cx('ik-chatlib', p.className) },
      search, meta, h('div', { className: 'ik-chatlib-list' }, list));
  };
})();
