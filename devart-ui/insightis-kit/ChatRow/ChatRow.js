/* ChatRow — one conversation in a list (the Chats library; original kit .chat-row, built in
   pages/concept/chats-landing.html). DevartUI Card variant="row" is the row recipe itself — softened
   rest border + rest shadow; State/Hover + the brand-tinted hover border + the hover shadow on hover
   and while its menu is open; a 1% press — so this component only adds what a chat row carries:

     [☐] Name …………… [pin] time [⋮]
     ☐     only while the list is selecting (selecting) — the original's checkbox slot is
           display:none outside .chat-list.is-selecting, even on a row that is still selected
     name  Body/14, Text/Body, one line, truncated; Text/Highlight while the chat is open in a
           side preview (preview)
     pin   pinned rows only: the filled pin in Brand/Primary (tilted 30°, straightens on hover),
           a button — "Unpin"
     time  Body/12, Text/Secondary, tabular
     ⋮     revealed on hover, keyboard focus and while its menu is open; below 768px (and on touch)
           always shown, at the card-stack size (IconButton md, 36px — kit-theme.css ≤767px
           ".iconbtn[data-kbp]"). Menu: Pin / Unpin · — · Select / Deselect · Rename · Delete
           (danger), its right edge 4px inside the ⋮ (".chat-row .kbp-menu{right:.25rem}").
           The ⋮ takes only a text line's height (negative block margin), so the Card row stays at
           its one-line 44px (py-3 around a 20px line) instead of growing to 50 / 62px around it —
           the original row is a fixed 2.75rem with the 24 / 36px ⋮ centred in it.
   Selected: State/Pressed fill + a Brand/Primary border (selected wins over hover).
   Rename is INLINE: the name turns into a field at its intrinsic width (Enter or blur commits,
   Esc cancels, empty keeps the old name).

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
     touch,                               // default: below 768px — the ⋮ always shown at 36px; true / false forces it (stories)
     defaultMenuOpen, defaultRenaming     // stories
   })

   IK.ChatRowList { 'aria-label', className }   role=list, rows 6px apart (.chat-list gap .375rem)  */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from chats-landing.html (#mi-select / #mi-deselect there are the square check /
     empty square — not the list glyphs of the shared menu dictionary in ik-core). */
  IK.defineIcons({
    'cr-kebab': { fill: true, inner: '<circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/>' },
    'cr-pin-filled': { fill: true, inner: '<g stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></g>' },
    'cr-select': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
    'cr-deselect': '<rect width="18" height="18" x="3" y="3" rx="2"/>'
  });

  function call(fn, a) { if (fn) fn(a); }

  IK.ChatRow = function ChatRow(p) {
    var m = R.useState(!!p.defaultMenuOpen), menuOpen = m[0], setMenuOpen = m[1];
    var rn = R.useState(!!p.defaultRenaming), renaming = rn[0], setRenaming = rn[1];
    var vs = R.useState(p.title || ''), val = vs[0], setVal = vs[1];
    var inputRef = R.useRef(null), done = R.useRef(false), renameReq = R.useRef(false);
    var phone = p.touch != null ? !!p.touch : D.useMaxWidth(768);

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

    return h(D.Card, {
      variant: 'row', fullWidth: true, role: 'listitem', tabIndex: 0,
      className: IK.cx('ik-chatrow', phone && 'is-touch', p.selected && 'is-selected', p.preview && 'is-preview', menuOpen && 'is-menu-open', p.className),
      onClick: onRowClick, onKeyDown: onKey, 'aria-selected': p.selecting ? !!p.selected : undefined
    },
      p.selecting ? h(D.Checkbox, {
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
        : h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'ik-chatrow-name' }, p.title),
      p.pinned && !renaming ? h(IK.Tip, { tip: 'Unpin' },
        h('button', {
          type: 'button', className: IK.cx('ik-chatrow-pin', D.focusRing), 'aria-label': 'Unpin', 'aria-pressed': 'true',
          onClick: function (e) { e.stopPropagation(); call(p.onTogglePin); }
        }, h(IK.Icon, { name: 'cr-pin-filled', size: 14 }))) : null,
      p.time ? h('span', { className: 'ik-chatrow-time' }, p.time) : null,
      p.menu === false ? null : h(D.DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, modal: false },
        h(IK.Tip, { tip: 'More actions' },
          h(D.DropdownMenuTrigger, { asChild: true },
            h(D.IconButton, { variant: 'tertiary', size: phone ? 'md' : '2xs', 'aria-label': 'More actions', className: IK.cx('ik-chatrow-more', phone ? '-my-2' : '-my-0.5'), onClick: function (e) { e.stopPropagation(); } },
              h(IK.Icon, { name: 'cr-kebab', size: phone ? 16 : 14 })))),
        h(D.DropdownMenuContent, {
          side: 'bottom', align: 'end', sideOffset: 8, alignOffset: 4, onClick: function (e) { e.stopPropagation(); },
          onCloseAutoFocus: function (e) { if (renameReq.current) { renameReq.current = false; e.preventDefault(); } }
        },
          h(D.DropdownMenuItem, { onSelect: function () { call(p.onTogglePin); } },
            h(IK.Icon, { name: p.pinned ? 'unpin' : 'pin', size: 16 }), p.pinned ? 'Unpin' : 'Pin'),
          h(D.DropdownMenuSeparator),
          h(D.DropdownMenuItem, { onSelect: function () { call(p.onToggleSelect); } },
            h(IK.Icon, { name: p.selected ? 'cr-deselect' : 'cr-select', size: 16 }), p.selected ? 'Deselect' : 'Select'),
          h(D.DropdownMenuItem, { onSelect: function () { renameReq.current = true; setRenaming(true); } },
            h(IK.Icon, { name: 'rename', size: 16 }), 'Rename'),
          h(D.DropdownMenuItem, { variant: 'danger', onSelect: function () { call(p.onDelete); } },
            h(IK.Icon, { name: 'delete', size: 16 }), 'Delete'))));
  };

  /* A list of rows: role=list + the original's 6px stack rhythm. */
  IK.ChatRowList = function ChatRowList(p) {
    return h('div', { role: 'list', 'aria-label': p['aria-label'], className: IK.cx('ik-chatrow-list', p.className) }, p.children);
  };
})();
