/* ChatRow — one conversation in a list (the Chats library; original kit .chat-row, built in
   pages/concept/chats-landing.html). DevartUI Card variant="row" is the row recipe itself — softened
   rest border + rest shadow; State/Hover + the brand-tinted hover border + the hover shadow on hover
   and while its menu is open; a 1% press — so this component only adds what a chat row carries:

     [☐] Name …………… [pin] time [⋮]
     ☐     only while the list is selecting (selecting) — or always on a selected row
     name  one line, truncated; Text/Highlight while the chat is open in a side preview (preview)
     pin   pinned rows only: the filled pin in Brand/Primary (tilted 30°, straightens on hover),
           a button — "Unpin"
     time  Body/12, Text/Secondary, tabular
     ⋮     revealed on hover, keyboard focus and while its menu is open (always on touch). Menu:
           Pin / Unpin · — · Select / Deselect · Rename · Delete (danger)
   Selected: State/Pressed fill + a Brand/Primary border (selected wins over hover).
   Rename is INLINE: the name turns into a field (Enter or blur commits, Esc cancels, empty keeps
   the old name).

   A click on the row (not on a control) opens the chat — or, while the list is selecting, toggles
   the row's selection.

   h(IK.ChatRow, {
     title: 'Q1 revenue commentary', time: '2h ago',
     pinned: false, selected: false, selecting: false, preview: false,
     onOpen: function () {},              // the row was clicked (not selecting)
     onToggleSelect: function () {},      // checkbox, menu Select / Deselect, row click while selecting
     onTogglePin: function () {},         // pin button and menu Pin / Unpin
     onRename: function (title) {},       // inline rename committed
     onDelete: function () {},            // menu Delete (the page confirms if it wants to)
     menu: true,                          // false hides the ⋮
     defaultMenuOpen, defaultRenaming     // stories
   })                                                                                              */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'cr-kebab': { fill: true, inner: '<circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/>' },
    'cr-pin-filled': { fill: true, inner: '<g stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></g>' }
  });

  function call(fn, a) { if (fn) fn(a); }

  IK.ChatRow = function ChatRow(p) {
    var m = R.useState(!!p.defaultMenuOpen), menuOpen = m[0], setMenuOpen = m[1];
    var rn = R.useState(!!p.defaultRenaming), renaming = rn[0], setRenaming = rn[1];
    var vs = R.useState(p.title || ''), val = vs[0], setVal = vs[1];
    var inputRef = R.useRef(null), done = R.useRef(false), renameReq = R.useRef(false);

    R.useEffect(function () {
      if (!renaming) return;
      done.current = false;
      setVal(p.title || '');
      setTimeout(function () { var el = inputRef.current; if (el) { el.focus(); el.select(); } }, 0);
    }, [renaming]);
    function commit() {
      if (done.current) return;
      done.current = true;
      var t = (val || '').trim();
      setRenaming(false);
      if (t && t !== p.title) call(p.onRename, t);
    }
    function cancel() { done.current = true; setRenaming(false); }

    function onRowClick(e) {
      if (renaming) return;
      if (e.target.closest && e.target.closest('button,[role="checkbox"],input,[role="menu"]')) return;
      if (p.selecting) call(p.onToggleSelect); else call(p.onOpen);
    }
    function onKey(e) {
      if (e.target !== e.currentTarget) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRowClick(e); }
    }

    var showCbx = p.selecting || p.selected;
    return h(D.Card, {
      variant: 'row', fullWidth: true, role: 'listitem', tabIndex: 0,
      className: IK.cx('ik-chatrow', p.selected && 'is-selected', p.preview && 'is-preview', menuOpen && 'is-menu-open', p.className),
      onClick: onRowClick, onKeyDown: onKey, 'aria-selected': p.selecting ? !!p.selected : undefined
    },
      showCbx ? h(D.Checkbox, {
        checked: !!p.selected, 'aria-label': 'Select ' + p.title,
        onCheckedChange: function () { call(p.onToggleSelect); }, onClick: function (e) { e.stopPropagation(); }
      }) : null,
      renaming
        ? h('input', {
            ref: inputRef, type: 'text', value: val, className: 'ik-chatrow-input', 'aria-label': 'Chat name',
            onChange: function (e) { setVal(e.target.value); },
            onKeyDown: function (e) { e.stopPropagation(); if (e.key === 'Enter') commit(); else if (e.key === 'Escape') cancel(); },
            onBlur: commit, onClick: function (e) { e.stopPropagation(); }
          })
        : h('span', { className: 'ik-chatrow-name' }, p.title),
      p.pinned && !renaming ? h(IK.Tip, { tip: 'Unpin' },
        h('button', {
          type: 'button', className: IK.cx('ik-chatrow-pin', D.focusRing), 'aria-label': 'Unpin', 'aria-pressed': 'true',
          onClick: function (e) { e.stopPropagation(); call(p.onTogglePin); }
        }, h(IK.Icon, { name: 'cr-pin-filled', size: 14 }))) : null,
      p.time ? h('span', { className: 'ik-chatrow-time' }, p.time) : null,
      p.menu === false ? null : h(D.DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, modal: false },
        h(IK.Tip, { tip: 'More actions' },
          h(D.DropdownMenuTrigger, { asChild: true },
            h(D.IconButton, { variant: 'tertiary', size: '2xs', 'aria-label': 'More actions', className: 'ik-chatrow-more', onClick: function (e) { e.stopPropagation(); } },
              h(IK.Icon, { name: 'cr-kebab', size: 14 })))),
        h(D.DropdownMenuContent, {
          side: 'bottom', align: 'end', sideOffset: 8, onClick: function (e) { e.stopPropagation(); },
          onCloseAutoFocus: function (e) { if (renameReq.current) { renameReq.current = false; e.preventDefault(); } }
        },
          h(D.DropdownMenuItem, { onSelect: function () { call(p.onTogglePin); } },
            h(IK.Icon, { name: p.pinned ? 'unpin' : 'pin', size: 16 }), p.pinned ? 'Unpin' : 'Pin'),
          h(D.DropdownMenuSeparator),
          h(D.DropdownMenuItem, { onSelect: function () { call(p.onToggleSelect); } },
            h(IK.Icon, { name: p.selected ? 'deselect' : 'select', size: 16 }), p.selected ? 'Deselect' : 'Select'),
          h(D.DropdownMenuItem, { onSelect: function () { renameReq.current = true; setRenaming(true); } },
            h(IK.Icon, { name: 'rename', size: 16 }), 'Rename'),
          h(D.DropdownMenuItem, { variant: 'danger', onSelect: function () { call(p.onDelete); } },
            h(IK.Icon, { name: 'delete', size: 16 }), 'Delete'))));
  };

  /* A list of rows: role=list + the 8px stack rhythm. Selecting reveals every row's checkbox. */
  IK.ChatRowList = function ChatRowList(p) {
    return h('div', { role: 'list', 'aria-label': p['aria-label'], className: IK.cx('ik-chatrow-list', p.className) }, p.children);
  };
})();
