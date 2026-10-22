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
   The ⋮ menu: Add to Chat · Download · Delete (danger), each with its 16px glyph — a file has no Rename (user, 2026-10-20: «забирай — його не буде»).

   h(IK.DsFilesTable, {
     files: [{ id, name, type, origin: 'artifact' | 'uploaded', size, date, selected }],
     allState: true | 'indeterminate' | false,   // header checkbox (over the whole filtered set)
     editing: false,                             // selection mode (cards show their checkbox)
     previewId: 'f3',
     sortDir: 'desc' | 'asc', onSort,
     onToggle(id), onToggleAll(), onOpen(id), onAction(action, id),   // action: add-to-chat | rename | download | delete
     empty: false, onBrowse,                      // first-run empty library
     layout: 'table' | 'cards',                   // optional — default follows the viewport (< 768px = cards)
     // shared workspaces (all optional; the Files page itself passes none of them):
     selectable: false,                           // no checkbox column (a workspace's files, Shared)
     caption: function (f) → node,                // under the name — IK.WsSharedBy; the name then
                                                  // truncates with its full text in a tooltip
     menuItems: ['view', 'download', …],          // which ⋮ items, in order — keys below
     menuLock: { share: lockedProps },            // IK.Locked props per item (a Blocked workspace)
     // a file with shared: { ws } is shared with the person (review switch Shared: Tag): tagged "Shared"
     // beside its name (tooltip: from which workspaces), no checkbox, its own menu (f.menu)
     // wsCol: a Workspaces column after Name — where one's own is shared into (f.sharedWith), where a
     // shared one comes from; tag: false → no Shared tag (review switch Shared: Tabs / Workspaces
     // column); ownerCol (review switch Owner: Shown): an Owner column — "You" or f.by
     // a file with locked: true is unavailable on the plan — greyed name, the plan's padlock badge
     // (IK.Locked 'shared-files' → upgrade) in place of its origin, no ⋮; muted: true (a Blocked
     // workspace's file) — greyed name, no ⋮, its origin badge stays
   })
   IK.DsFileMenu { id, onAction, defaultOpen, items, lock } — the ⋮ and its menu alone (DevartUI
     RowMenuButton). items (default add-to-chat · rename · download · delete) from: view ·
     add-to-chat · share ("Share via Workspace") · rename · download · stop-sharing (danger) ·
     delete (danger).
   IK.DsFilesSkeleton — the loading library: 3 chip ghosts, a count ghost, the table with 5 ghost rows. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* a shared file the plan can't open: muted, no plan tag — the "needs a plan" notice says why (user,
     2026-10-19: "не треба тегу стартер"); Type keeps the type ("як тут опинився план?") */

  /* a shared file that can't be used: the warning right after its name, as everywhere (IK.WsUnavailableMark) */
  function unavailableMark(f) {
    return f.shared || f.by ? h(IK.WsUnavailableMark, { by: f.by || (f.shared && f.shared.by), locked: !f.muted, noun: 'files' }) : null;
  }
  function UnavailableBadge(p) {
    var from = (p.file.wsNames || [p.file.shared && p.file.shared.ws]).filter(Boolean);
    return h(IK.Tip, { tip: IK.wsUnavailableTip({ by: p.file.by || (p.file.shared && p.file.shared.by), locked: !p.file.muted, noun: 'files' }), wrap: true },
      h('span', { tabIndex: 0, className: IK.cx('inline-flex shrink-0 rounded-full', D.focusRing) },
        h(D.Badge, { variant: 'attention', size: 'sm', rounded: 'full', leftSlot: h(IK.Icon, { name: 'warning', size: 12 }) }, 'Unavailable')));
  }

  /* Tag mode (p.tag): a shared file's Type is Shared, beside Artifact and Uploaded (user, 2026-10-19) */
  function OriginBadge(p) {
    if (p.shared) return h(IK.SharedBadge, { by: p.shared.by, ws: p.shared.ws });
    return p.origin === 'artifact'
      ? h(D.Badge, { variant: 'primary', size: 'sm' }, 'Artifact')
      : h(D.Badge, { variant: 'secondary', size: 'sm' }, 'Uploaded');
  }

  /* DevartUI RowMenuButton: the row ⋮, its tooltip and its menu; always shown here (reveal: false —
     the table and the cards show it at rest). */
  var MENU = {
    'view': ['view-only', 'View'],
    'add-to-chat': ['add-chat', 'Add to Chat'],
    'share': ['ws-share', 'Share via Workspace'],
    'download': ['download', 'Download'],
    'stop-sharing': ['ws-remove', 'Remove from Workspace', true],
    'delete': ['delete', 'Delete', true]
  };
  var DEFAULT_ITEMS = ['add-to-chat', 'download', 'delete'];
  IK.DsFileMenu = function DsFileMenu(p) {
    function act(a) { return function () { if (p.onAction) p.onAction(a, p.id); }; }
    var items = (p.items || DEFAULT_ITEMS).filter(function (k) { return MENU[k]; });
    return h(D.RowMenuButton, { reveal: false, defaultOpen: p.defaultOpen, className: p.triggerClassName },
      items.map(function (k) {
        var m = MENU[k], item = h(D.DropdownMenuItem, { key: k, variant: m[2] ? 'danger' : undefined, onSelect: act(k) },
          h(IK.Icon, { name: m[0], size: 16 }), m[1]);
        return p.lock && p.lock[k] ? h(IK.Locked, Object.assign({ key: k }, p.lock[k]), item) : item;
      }));
  };

  function stop(e) { e.stopPropagation(); }
  function fromControl(e) { return e.target.closest && e.target.closest('[role="checkbox"],[data-slot="table-actions-cell"],.ik-dsft-act,[role="menu"],.ik-dsft-cb'); }

  function EmptyRow(p) {
    return h(D.TableRow, null,
      h(D.TableCell, { colSpan: 7, className: 'p-0' },
        h(D.StatusView, {
          size: 'lg', surface: 'embedded', withIconHalo: false, icon: h(D.EmptyStateIllustration),
          title: 'No files yet', description: 'Files you upload or create in chats will appear here',
          actions: h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: p.onBrowse }, 'Browse Files')
        })));
  }

  /* the name, and under it the caption a shared file carries (who shared it, from which workspace);
     a captioned name truncates with the whole name in a tooltip (TruncatedTitleTooltip) */

  function NameBlock(p) {
    var f = p.noTag ? Object.assign({}, p.file, { shared: null }) : p.file, name = h('span', { className: IK.cx('ik-dsft-name min-w-0 truncate font-medium text-ink-primary', p.small && 'text-sm') }, f.name);
    /* beside the name: the Owner mark (Shared: Owner) and, its workspace Blocked, Unavailable — in every mode */
    var raw = p.file, extras = [
      p.ownerMark && (raw.shared || raw.by) ? h(IK.WsOwnerMark, { key: 'o', by: raw.by || raw.shared.by, ws: raw.wsNames || (raw.shared && raw.shared.ws) || raw.wsName }) : null,
      raw.locked || raw.muted ? h(IK.Fragment, { key: 'u' }, unavailableMark(raw)) : null
    ].filter(Boolean);
    if (!p.caption && !extras.length) return name;
    var cap = p.caption ? p.caption(f) : null;
    var line = h(D.TruncatedTitleTooltip, { title: f.name, getTruncationTarget: function (t) { return t; } }, name);
    return h('div', { className: 'flex min-w-0 flex-1 flex-col gap-0.5' },
      /* the tooltip's box fills its parent: a parent sized by the name keeps the mark right after it, as on
         Connections (user, 2026-10-19: 'чому не біля імені') */
      extras.length ? h('div', { className: 'flex min-w-0 items-center gap-2' }, h('span', { className: 'flex min-w-0' }, line), extras) : line,
      cap);
  }

  function TableView(p) {
    var files = p.files || [], sel = p.selectable !== false;
    /* with Owner / Workspaces the row has 7–8 columns: a fixed layout in proportion, the name truncating, so
       the table never scrolls sideways (user, 2026-10-19); without them the original auto layout */
    /* and with the preview open beside it (previewId): the list is half the width, the name truncates as in the product,
       the other columns keep fixed widths that hold their content — no sideways scroll (user, 2026-10-22: 'респонсив по
       файлам виглядає невірно при відкритій панелі - подивись як на проді') */
    var tight = !!p.previewId && !(p.ownerCol || p.wsCol);
    var fixed = !!(p.ownerCol || p.wsCol) || tight;
    function w(pc, rem) { return fixed ? { style: { width: tight && rem ? rem : pc } } : null; }
    return h(D.Table, { wrapperClassName: 'ik-dsft', layout: fixed ? 'fixed' : undefined },
      h(D.TableHeader, null,
        h(D.TableRow, null,
          /* fixed layout: the checkbox column takes DevartUI's control width (its 1px auto-fit would collapse) */
          sel ? h(D.TableHead, fixed ? { width: 'control' } : { className: 'ik-dsft-cbcol' },
            h(D.Checkbox, { checked: p.allState || false, onCheckedChange: function () { if (p.onToggleAll) p.onToggleAll(); }, 'aria-label': 'Select all files' })) : null,
          /* Name takes what the others leave, so no spare width is spread onto the checkbox column (as the
             Workspaces list: the control column stays 48px) */
          h(D.TableHead, null, 'Name'),
          p.ownerCol ? h(D.TableHead, w('14%'), 'Owner') : null,
          p.wsCol ? h(D.TableHead, w('14%'), 'Workspaces') : null,
          h(D.TableHead, w('11%', '7rem'), 'Type'),
          h(D.TableHead, w('9%', '5.5rem'), 'Size'),
          p.onSort ? h(D.TableHead, Object.assign({ sortable: true, sortDirection: p.sortDir || 'desc', onSort: p.onSort }, w('12%', '8.5rem')), 'Modified')
            : h(D.TableHead, w('12%', '8.5rem'), 'Modified'),
          /* Actions: its head's width, never a share that clips it */
          h(D.TableHead, Object.assign({ className: 'text-right' }, w('5.5rem', '5.5rem')), 'Actions'))),
      h(D.TableBody, null,
        p.empty ? h(EmptyRow, { onBrowse: p.onBrowse }) : files.map(function (f) {
          var preview = f.id === p.previewId;
          return h(D.TableRow, {
            key: f.id, 'data-interactive': '', 'data-id': f.id,
            className: IK.cx((f.selected || preview) && 'is-selected', preview && 'ik-dsft-preview'),
            onClick: function (e) { if (!fromControl(e) && p.onOpen) p.onOpen(f.id); }
          },
            sel ? h(D.TableCell, { className: 'ik-dsft-cbcol', onClick: stop }, f.shared
              /* a shared file can't be picked (only its owner deletes or shares it): its checkbox is there,
                 disabled, and says why — the column stays whole, as the Workspaces list (user, 2026-10-19) */
              ? h(IK.Tip, { tip: 'Only ' + (f.by || (f.shared && f.shared.by) || 'its owner') + ' can delete or share it', wrap: true },
                  h(D.Checkbox, { 'aria-label': f.name + ' — only ' + (f.by || (f.shared && f.shared.by) || 'its owner') + ' can delete or share it', checked: false, disabled: true })) :
              h(D.Checkbox, { checked: !!f.selected, onCheckedChange: function () { if (p.onToggle) p.onToggle(f.id); }, 'aria-label': 'Select ' + f.name })) : null,
            h(D.TableCell, null,
              h('div', { className: 'flex min-w-0 items-center gap-2.5' },
                h(IK.DsFileMark, { type: f.type }),
                h(NameBlock, { file: f, caption: p.caption, noTag: p.tag !== undefined, ownerMark: p.ownerMark }))),
            p.ownerCol ? h(D.TableCell, { className: 'truncate text-ink-secondary' },
              f.by || (f.shared && f.shared.by) || 'You') : null,
            p.wsCol ? h(D.TableCell, { className: 'max-w-0 text-ink-secondary' }, (function () {
              var names = f.wsNames || (f.sharedWith && f.sharedWith.length ? f.sharedWith : f.wsName ? [f.wsName] : []);
              return names.length ? h(IK.WsNames, { names: names, links: f.links }) : h('span', { className: 'text-ink-inactive' }, '—'); /* in no workspace: a quiet dash */
            })()) : null,
            h(D.TableCell, null, h(OriginBadge, { origin: f.origin, shared: p.tag && (f.shared || f.by) ? { by: f.by || f.shared.by } : null })),
            h(D.TableCell, { className: 'whitespace-nowrap tabular-nums' }, f.size),
            h(D.TableCell, { className: 'whitespace-nowrap tabular-nums' }, f.date),
            h(D.TableActionsCell, { onClick: stop },
              f.locked || f.muted ? null : h(IK.DsFileMenu, { id: f.id, onAction: p.onAction, items: f.menu || p.menuItems, lock: f.shared ? null : p.menuLock })));
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
        p.selectable !== false && !f.shared ? h('span', { className: 'ik-dsft-cb', onClick: stop },
          h(D.Checkbox, { checked: !!f.selected, onCheckedChange: function () { if (p.onToggle) p.onToggle(f.id); }, 'aria-label': 'Select ' + f.name })) : null,
        h('div', { className: 'flex min-w-0 items-center gap-2.5' },
          h(IK.DsFileMark, { type: f.type }),
          /* the name (with the owner glyph and Unavailable, as in the table), the date, and the workspaces — where
             one's own is shared, where a shared one comes from (the table's Workspaces column; the phone lost it) */
          h(NameBlock, { file: f, small: true, ownerMark: p.ownerMark, caption: function (x) {
            var wsn = x.wsNames || x.sharedWith || null;
            return h('div', { className: 'flex min-w-0 flex-col gap-0.5' },
              h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, x.date),
              /* the workspaces only where the table has its Workspaces column (Tabs' Shared tab); else the preview says it */
              p.wsCol && wsn && wsn.length ? h(IK.WsNames, { names: wsn, links: x.links, className: 'text-xs text-ink-secondary' }) : null);
          } })),
        h(OriginBadge, { origin: f.origin, shared: p.tag && (f.shared || f.by) ? { by: f.by || f.shared.by } : null }),
        f.locked || f.muted ? null : h('span', { className: 'ik-dsft-act', onClick: stop }, h(IK.DsFileMenu, { id: f.id, onAction: p.onAction, items: f.menu || p.menuItems, lock: f.shared ? null : p.menuLock })));
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
