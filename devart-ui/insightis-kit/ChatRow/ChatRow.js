/* ChatRow — one conversation in a list (the Chats library; original kit .chat-row, built in
   pages/concept/chats-landing.html). Composition only: DevartUI SelectableListCard layout="row" is
   the row — Card variant="row" (rest / hover / press), the checkbox that shows while the list is
   selecting, the selected paint (State/Pressed + Brand/Primary border), the keyboard (Tab to it,
   Enter / Space act) and the ⋮ (RowMenuButton: revealed on hover, focus and while open; always
   shown below 768px and on touch; its clicks never open the row). This component adds what a
   chat row carries:

     [☐] Name [pin] …………… time [⋮]
     name  Body/14, Text/Body, one line, truncated; Text/Highlight while the chat is open in a
           side preview (preview)
     pin   pinned rows only: DevartUI PinToggle, pressed — the filled Brand/Primary pin turned 30°,
           "Unpin" on hover
     time  Body/12, Text/Secondary, tabular
     ⋮     Pin / Unpin · — · Select / Deselect · Rename · Delete (danger)
   Rename is INLINE: DevartUI InlineRename takes the name's place (Enter or blur commits, Esc /
   empty / unchanged cancel).

   A click on the row (not on a control) opens the chat — or, while the list is selecting, toggles
   the row's selection.

   h(IK.ChatRow, {
     title: 'Q1 revenue commentary', time: '2h ago',
     pinned: false, selected: false, selecting: false, preview: false,
     onOpen: function () {},              // the row was clicked (not selecting)
     onToggleSelect: function () {},      // checkbox, menu Select / Deselect, row click while selecting
     onTogglePin: function () {},         // pin and menu Pin / Unpin
     onRename: function (title) {},       // inline rename committed (trimmed, changed)
     onDelete: function () {},            // menu Delete (the page confirms if it wants to)
     menu: true,                          // false hides the ⋮
     defaultRenaming                      // stories
   })

   IK.ChatRowList { 'aria-label', selecting, className }   role=list, rows 6px apart (.chat-list
     gap .375rem); `selecting` is what shows every row's checkbox (SelectableListCard answers its
     list's group/list + data-has-selection).                                                   */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from chats-landing.html (#mi-select / #mi-deselect there are the square check /
     empty square — not the list glyphs of the shared menu dictionary in ik-core). */
  IK.defineIcons({
    'cr-select': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
    'cr-deselect': '<rect width="18" height="18" x="3" y="3" rx="2"/>'
  });

  function call(fn, a) { if (fn) fn(a); }

  IK.ChatRow = function ChatRow(p) {
    var rn = R.useState(!!p.defaultRenaming), renaming = rn[0], setRenaming = rn[1];

    var name = renaming
      ? h(D.InlineRename, {
          defaultValue: p.title || '', 'aria-label': 'Chat name',
          onCommit: function (t) { setRenaming(false); call(p.onRename, t); },
          onCancel: function () { setRenaming(false); }
        })
      : h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'ik-chatrow-name' }, p.title);

    var menu = p.menu === false ? undefined : [
      h(D.DropdownMenuItem, { key: 'pin', onSelect: function () { call(p.onTogglePin); } },
        h(IK.Icon, { name: p.pinned ? 'unpin' : 'pin', size: 16 }), p.pinned ? 'Unpin' : 'Pin'),
      h(D.DropdownMenuSeparator, { key: 'sep' }),
      h(D.DropdownMenuItem, { key: 'sel', onSelect: function () { call(p.onToggleSelect); } },
        h(IK.Icon, { name: p.selected ? 'cr-deselect' : 'cr-select', size: 16 }), p.selected ? 'Deselect' : 'Select'),
      h(D.DropdownMenuItem, { key: 'ren', onSelect: function () { setRenaming(true); } },
        h(IK.Icon, { name: 'rename', size: 16 }), 'Rename'),
      h(D.DropdownMenuItem, { key: 'del', variant: 'danger', onSelect: function () { call(p.onDelete); } },
        h(IK.Icon, { name: 'delete', size: 16 }), 'Delete')
    ];

    /* SelectableListCard renders the Card itself, so the list semantics sit on a wrapper. */
    return h('div', { role: 'listitem' },
      h(D.SelectableListCard, {
        layout: 'row',
        isSelected: !!p.selected,
        checkboxAriaLabel: 'Select ' + p.title,
        onCheckboxToggle: function () { call(p.onToggleSelect); },
        onCardClick: function () {
          if (renaming) return;
          if (p.selecting) call(p.onToggleSelect); else call(p.onOpen);
        },
        cardClassName: IK.cx('ik-chatrow', p.preview && 'is-preview', p.className),
        cardContent: h('span', { className: 'ik-chatrow-main' },
          name,
          /* one text line tall, as the ⋮ is: the 24px toggle gives 4px back, so the row stays 44px */
          p.pinned && !renaming ? h(D.PinToggle, { pressed: true, className: '-my-0.5', onPressedChange: function () { call(p.onTogglePin); } }) : null),
        rightSlot: p.time ? h('span', { className: 'ik-chatrow-time' }, p.time) : null,
        menu: menu,
        menuLabel: 'More actions'
      }));
  };

  /* A list of rows: role=list + the original's 6px stack rhythm; `selecting` shows the checkboxes. */
  IK.ChatRowList = function ChatRowList(p) {
    return h('div', {
      role: 'list', 'aria-label': p['aria-label'],
      'data-has-selection': p.selecting ? '' : undefined,
      className: IK.cx('group/list ik-chatrow-list', p.className)
    }, p.children);
  };
})();
