/* DsFilesTable — the Files library list (Files page). Port of dsfRenderTable() in
   pages/approved/data-sources_files-landing.html; locked rules 2, 3, 10, 13, 15, 20, 21, 24–26 in
   page-changes/data-sources_files-landing.md.

     ≥ 768px  DevartUI Table: ☐ (select all / some / none) · Name (IK.DsFileMark + name) · Type
              (Badge — Artifact = primary, Uploaded = secondary) · Size · Modified (sortable,
              newest first by default) · Actions (TableActionsCell: the ⋮ menu, revealed on row
              hover / focus / while open). A row opens the file preview (row-body click only — not
              the checkbox, not the menu); the previewed row is pressed and its name highlighted.
     < 768px  a card stack: mark + name + date under it · origin Badge · ⋮ (always shown); the
              checkbox column slides in only while selecting (or on a selected card).
     empty    the SAME table, one row: StatusView "No files yet" + Browse Files — the columns stay
              and nothing jumps when the first upload lands. (< 768px the original shows a blank
              card here — its card form hides the spanning cell — and so does this.)
   The ⋮ menu: Add to Chat · Rename · Download · Delete (danger), each with its 16px glyph.

   h(IK.DsFilesTable, {
     files: [{ id, name, type, origin: 'artifact' | 'uploaded', size, date, selected }],
     allState: true | 'indeterminate' | false,   // header checkbox (over the whole filtered set)
     editing: false,                             // selection mode (cards show their checkbox)
     previewId: 'f3',
     sortDir: 'desc' | 'asc', onSort,
     onToggle(id), onToggleAll(), onOpen(id), onAction(action, id),   // action: add-to-chat | rename | download | delete
     empty: false, onBrowse,                      // first-run empty library
     layout: 'table' | 'cards'                    // optional — default follows the viewport (< 768px = cards)
   })
   IK.DsFileMenu { id, onAction, defaultOpen, size } — the ⋮ and its menu alone.
   IK.DsFilesSkeleton — the loading library: 3 chip ghosts, a count ghost, the table with 5 ghost rows. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'ds-kebab': { fill: true, inner: '<circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/>' }
  });

  function OriginBadge(p) {
    return p.origin === 'artifact'
      ? h(D.Badge, { variant: 'primary', size: 'sm' }, 'Artifact')
      : h(D.Badge, { variant: 'secondary', size: 'sm' }, 'Uploaded');
  }

  IK.DsFileMenu = function DsFileMenu(p) {
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    function act(a) { return function () { if (p.onAction) p.onAction(a, p.id); }; }
    return h(D.DropdownMenu, { open: open, onOpenChange: setOpen, modal: false },
      h(IK.Tip, { tip: 'More actions' },
        h(D.DropdownMenuTrigger, { asChild: true },
          h(D.IconButton, { variant: 'tertiary', size: p.size || '2xs', 'aria-label': 'More actions', className: p.triggerClassName },
            h(IK.Icon, { name: 'ds-kebab', size: p.size === 'md' ? 16 : 14 })))),
      h(D.DropdownMenuContent, { side: 'bottom', align: 'end', sideOffset: 8, onClick: function (e) { e.stopPropagation(); } },
        h(D.DropdownMenuItem, { onSelect: act('add-to-chat') }, h(IK.Icon, { name: 'add-chat', size: 16 }), 'Add to Chat'),
        h(D.DropdownMenuItem, { onSelect: act('rename') }, h(IK.Icon, { name: 'rename', size: 16 }), 'Rename'),
        h(D.DropdownMenuItem, { onSelect: act('download') }, h(IK.Icon, { name: 'download', size: 16 }), 'Download'),
        h(D.DropdownMenuItem, { variant: 'danger', onSelect: act('delete') }, h(IK.Icon, { name: 'delete', size: 16 }), 'Delete')));
  };

  function stop(e) { e.stopPropagation(); }
  function fromControl(e) { return e.target.closest && e.target.closest('[role="checkbox"],[data-slot="table-actions-cell"],.ik-dsft-act,[role="menu"],.ik-dsft-cb'); }

  function EmptyRow(p) {
    return h(D.TableRow, null,
      h(D.TableCell, { colSpan: 6, className: 'p-0' },
        h(D.StatusView, {
          size: 'lg', surface: 'embedded', withIconHalo: false, icon: h(D.EmptyStateIllustration),
          title: 'No files yet', description: 'Files you upload or create in chats will appear here',
          actions: h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: p.onBrowse }, 'Browse Files')
        })));
  }

  function TableView(p) {
    var files = p.files || [];
    return h(D.Table, { wrapperClassName: 'ik-dsft' },
      h(D.TableHeader, null,
        h(D.TableRow, null,
          h(D.TableHead, { className: 'ik-dsft-cbcol' },
            h(D.Checkbox, { checked: p.allState || false, onCheckedChange: function () { if (p.onToggleAll) p.onToggleAll(); }, 'aria-label': 'Select all files' })),
          h(D.TableHead, null, 'Name'),
          h(D.TableHead, null, 'Type'),
          h(D.TableHead, null, 'Size'),
          h(D.TableHead, { sortable: true, sortDirection: p.sortDir || 'desc', onSort: p.onSort }, 'Modified'),
          h(D.TableHead, { className: 'text-right' }, 'Actions'))),
      h(D.TableBody, null,
        p.empty ? h(EmptyRow, { onBrowse: p.onBrowse }) : files.map(function (f) {
          var preview = f.id === p.previewId;
          return h(D.TableRow, {
            key: f.id, 'data-interactive': '', 'data-id': f.id,
            className: IK.cx((f.selected || preview) && 'is-selected', preview && 'ik-dsft-preview'),
            onClick: function (e) { if (!fromControl(e) && p.onOpen) p.onOpen(f.id); }
          },
            h(D.TableCell, { className: 'ik-dsft-cbcol', onClick: stop },
              h(D.Checkbox, { checked: !!f.selected, onCheckedChange: function () { if (p.onToggle) p.onToggle(f.id); }, 'aria-label': 'Select ' + f.name })),
            h(D.TableCell, null,
              h('div', { className: 'flex min-w-0 items-center gap-2.5' },
                h(IK.DsFileMark, { type: f.type }),
                h('span', { className: 'ik-dsft-name min-w-0 truncate font-medium text-ink-primary' }, f.name))),
            h(D.TableCell, null, h(OriginBadge, { origin: f.origin })),
            h(D.TableCell, { className: 'whitespace-nowrap tabular-nums' }, f.size),
            h(D.TableCell, { className: 'whitespace-nowrap tabular-nums' }, f.date),
            h(D.TableActionsCell, { onClick: stop },
              h(IK.DsFileMenu, { id: f.id, onAction: p.onAction })));
        })));
  }

  function CardView(p) {
    var files = p.files || [];
    /* The original's card form hides every cell but name / type / actions, so the empty row's one
       spanning cell disappears and a blank card is all that is left on a phone — reproduced. */
    if (p.empty) return h('div', { className: 'ik-dsft-cards' }, h('div', { className: 'ik-dsft-card', 'aria-hidden': 'true' }));
    return h('div', { className: IK.cx('ik-dsft-cards', p.editing && 'is-editing'), role: 'list' }, files.map(function (f) {
      var preview = f.id === p.previewId;
      return h('div', {
        key: f.id, role: 'listitem', 'data-id': f.id,
        className: IK.cx('ik-dsft-card', f.selected && 'is-selected', preview && 'is-preview'),
        onClick: function (e) { if (!fromControl(e) && p.onOpen) p.onOpen(f.id); }
      },
        h('span', { className: 'ik-dsft-cb', onClick: stop },
          h(D.Checkbox, { checked: !!f.selected, onCheckedChange: function () { if (p.onToggle) p.onToggle(f.id); }, 'aria-label': 'Select ' + f.name })),
        h('div', { className: 'flex min-w-0 items-center gap-2.5' },
          h(IK.DsFileMark, { type: f.type }),
          h('div', { className: 'flex min-w-0 flex-1 flex-col gap-0.5' },
            h('span', { className: 'ik-dsft-name min-w-0 truncate text-sm font-medium text-ink-primary' }, f.name),
            h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, f.date))),
        h(OriginBadge, { origin: f.origin }),
        h('span', { className: 'ik-dsft-act', onClick: stop }, h(IK.DsFileMenu, { id: f.id, onAction: p.onAction, size: 'md' })));
    }));
  }

  IK.DsFilesTable = function DsFilesTable(p) {
    var narrow = D.useMaxWidth(768);
    var phone = p.layout ? p.layout === 'cards' : narrow;
    return phone ? h(CardView, p) : h(TableView, p);
  };

  var SKEL = [['10rem', '3.5rem', '3rem', '4.5rem'], ['8rem', '4.25rem', '3.5rem', '4rem'], ['11rem', '3.5rem', '2.75rem', '5rem'],
              ['7.5rem', '4.25rem', '3.25rem', '4.5rem'], ['9rem', '3.5rem', '3rem', '4.25rem']];
  /* The ghosts are the original's own: its name-cell mark ghost has no size, so only the bar shows,
     10px in (the cell's gap). Below 768px the table is a card stack, so the ghosts are cards too:
     [name bar | badge ghost | ⋮ ghost]. */
  function ghost(w, ht, cls, rounded) { return h(D.Skeleton, { rounded: rounded || 'sm', className: IK.cx('block', cls), style: { width: w, height: ht } }); }
  IK.DsFilesSkeleton = function DsFilesSkeleton(p) {
    var narrow = D.useMaxWidth(768);
    var phone = p && p.layout ? p.layout === 'cards' : narrow;
    var cbx = ghost('1.125rem', '1.125rem');
    var list = phone
      ? h('div', { className: 'ik-dsft-cards' }, SKEL.map(function (r, i) {
          return h('div', { key: i, className: 'ik-dsft-card' },
            h('div', { className: 'flex items-center gap-2.5' }, h('span'), ghost(r[0], '.875rem')),
            ghost(r[1], '1.125rem', null, 'full'),
            ghost('1.25rem', '1.25rem'));
        }))
      : h(D.Table, { wrapperClassName: 'ik-dsft' },
          h(D.TableHeader, null, h(D.TableRow, null,
            h(D.TableHead, { className: 'ik-dsft-cbcol' }, cbx),
            h(D.TableHead, null, 'Name'), h(D.TableHead, null, 'Type'), h(D.TableHead, null, 'Size'),
            h(D.TableHead, null, 'Modified'), h(D.TableHead, { className: 'text-right' }, 'Actions'))),
          h(D.TableBody, null, SKEL.map(function (r, i) {
            return h(D.TableRow, { key: i },
              h(D.TableCell, { className: 'ik-dsft-cbcol' }, cbx),
              h(D.TableCell, null, h('div', { className: 'flex items-center gap-2.5' }, h('span'), ghost(r[0], '.875rem'))),
              h(D.TableCell, null, ghost(r[1], '1.125rem', null, 'full')),
              h(D.TableCell, null, ghost(r[2], '.8125rem')),
              h(D.TableCell, null, ghost(r[3], '.8125rem')),
              h(D.TableCell, null, ghost('1.25rem', '1.25rem', 'ms-auto')));
          })));
    return h('div', { className: 'flex flex-col gap-2', 'aria-hidden': 'true' },
      h('div', { className: 'flex items-center gap-1.5' },
        ['3rem', '4.5rem', '4.75rem'].map(function (w, i) { return h(D.Skeleton, { key: i, rounded: 'full', className: 'h-7', style: { width: w } }); })),
      h('div', { className: 'flex min-h-11 items-center py-1.5' }, ghost('3.5rem', '.875rem')),
      list);
  };
})();
