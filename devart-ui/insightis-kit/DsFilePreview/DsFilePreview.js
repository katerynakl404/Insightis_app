/* DsFilePreview — the file preview split panel (Files page; rules 21–22 in
   page-changes/data-sources_files-landing.md). Port of dsfRenderPreview() + the kit file-preview
   family (.cp-fp-*) the chat page's file panel shares.

     head    the file name (Title/14, truncated) · Download · Close (DevartUI IconButton xs, tertiary)
     banner  "Preview truncated. Download to see the full file." — only when a SAMPLE of a bigger
             file is shown (size in MB); a full-bleed strip flush under the head, warning-toned
     body    csv / xls / xlsx → a DevartUI Table of sample rows · json / txt / md → a mono sample ·
             anything else → "There is no preview available for this file type" + Download
     meta    "2.4 MB · Artifact · 3d ago" under the content

   The panel is the THIRD column of the screen (the list narrows), 28rem wide by default and
   resizable from its left edge (320–720px, and never past viewport − 360px). Below 1024px it covers
   the main column instead of splitting it, and does not resize.

   The same actions and state as the file's row (user, 2026-10-20: "дії в таблиці та в превью співпадають"):
     menu     the row's ⋮ (DsFileMenu, the host passes its items without View / Download — Download is the
              head's icon)
     shared   Access at the end (Shared by · Shared in); one's own — where it is shared + Share via Workspace
     unavailable (a shared file: locked / muted) — no Download anywhere, the warning by its name and, at the
              foot, why and what brings it back (IK.WsUnavailableNote, renewal from the host)

   h(IK.DsFilePreview, {
     file: { id, name, size, origin, date, by?, wsNames?, sharedWith?, links?, locked?, muted? },
     width: 448, onWidthChange: function (px) {},     // optional — uncontrolled otherwise
     onClose, onDownload, onAddToChat(id) (an icon beside Download), menu: node — only when it holds something
     else (Rename, Delete), onShare, shareLocked, renewal, accessIn: false (no "Shared in")
   })                                                                                              */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'ds-download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/>',
    'ds-close': '<path d="M18 6 6 18M6 6l12 12"/>',
    'ds-warn': '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'ds-doc': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'
  });

  var ROWS = [
    ['2026-07-01', 'EMEA', '12,480', '+4.2%'], ['2026-07-01', 'AMER', '31,905', '+1.8%'],
    ['2026-07-01', 'APAC', '8,220', '-0.6%'], ['2026-06-01', 'EMEA', '11,970', '+2.1%'],
    ['2026-06-01', 'AMER', '31,340', '+3.0%'], ['2026-06-01', 'APAC', '8,270', '+1.1%'],
    ['2026-05-01', 'EMEA', '11,720', '-1.4%'], ['2026-05-01', 'AMER', '30,420', '+0.9%']
  ];
  IK.dsPreviewKind = function (name) {
    var ext = (String(name).split('.').pop() || '').toLowerCase();
    if (['csv', 'xls', 'xlsx'].indexOf(ext) !== -1) return 'table';
    if (['json', 'txt', 'md'].indexOf(ext) !== -1) return 'text';
    return 'none';
  };
  function truncated(f) { return IK.dsPreviewKind(f.name) !== 'none' && /MB$/i.test(f.size || ''); }

  /* The original's sample table gives its third column a 16rem floor (.cp-tbl-scroll), so in a
     28rem panel the table outgrows the column and scrolls sideways — reproduced. */
  var WIDE = { minWidth: '16rem', whiteSpace: 'normal' };
  function Sample() {
    return h(D.Table, { wrapperClassName: 'ik-dsfp-tbl' },
      h(D.TableHeader, null, h(D.TableRow, null, ['Date', 'Region', 'Revenue', 'Change'].map(function (c, j) { return h(D.TableHead, { key: c, style: j === 2 ? WIDE : undefined }, c); }))),
      h(D.TableBody, null, ROWS.map(function (r, i) {
        return h(D.TableRow, { key: i }, r.map(function (v, j) { return h(D.TableCell, { key: j, className: 'whitespace-nowrap', style: j === 2 ? WIDE : undefined }, v); }));
      })));
  }
  function Text() {
    var lines = ROWS.map(function (r) { return '  {"date": "' + r[0] + '", "region": "' + r[1] + '", "revenue": ' + r[2].replace(/,/g, '') + '}'; });
    return h('pre', { className: 'ik-dsfp-json' }, '[\n' + lines.join(',\n') + '\n]');
  }
  function None(p) {
    return h('div', { className: 'ik-dsfp-empty' },
      h(IK.Icon, { name: 'ds-doc', size: 40, strokeWidth: 1.5, className: 'text-ink-inactive' }),
      h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary' }, p.file.name),
      h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0 max-w-64' }, 'There is no preview available for this file type'),
      p.onDownload ? h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: p.onDownload }, 'Download') : null);
  }

  IK.DsFilePreview = function DsFilePreview(p) {
    var f = p.file;
    var ws = R.useState(null), wU = ws[0], setWU = ws[1];
    var width = p.width != null ? p.width : wU;
    var rs = R.useState(false), resizing = rs[0], setResizing = rs[1];
    function setW(px) { if (p.onWidthChange) p.onWidthChange(px); if (p.width == null) setWU(px); }
    if (!f) return null;
    var kind = IK.dsPreviewKind(f.name);
    function dl() { if (p.onDownload) p.onDownload(f.id); }
    /* a shared file that can't be used: nothing to download, the reason said (as its row and Connection Details) */
    var by = f.by || (f.shared && f.shared.by), off = !!by && !!(f.locked || f.muted);
    var names = f.wsNames || f.sharedWith || [];
    function grip(e) {
      e.preventDefault();
      setResizing(true);
      function move(ev) { setW(Math.max(320, Math.min(window.innerWidth - ev.clientX, Math.min(720, window.innerWidth - 360)))); }
      function up() { setResizing(false); document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); }
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
    }
    return h('aside', {
      className: IK.cx('ik-dsfp', resizing && 'is-resizing', p.className), 'aria-label': 'File preview',
      style: width ? { width: width + 'px' } : undefined
    },
      h('div', { className: 'ik-dsfp-grip', 'aria-hidden': 'true', onPointerDown: grip }),
      h('div', { className: 'ik-dsfp-head' },
        h('div', { className: 'flex min-w-0 flex-1 items-center gap-2' },
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, f.name),
          off ? h(IK.WsUnavailableMark, { by: by, locked: !f.muted, noun: 'files' }) : null),
        h('div', { className: 'flex flex-none items-center gap-0.5' },
          /* Add to Chat is an icon beside Download, not the lone item of a ⋮ (user, 2026-10-20: "в чому сенс 3 крапок") */
          off || !p.onAddToChat ? null : h(IK.Tip, { tip: 'Add to Chat' }, h(D.IconButton, { variant: 'tertiary', size: 'xs', 'aria-label': 'Add to Chat', onClick: function () { p.onAddToChat(f.id); } }, h(IK.Icon, { name: 'add-chat' }))),
          off ? null : h(IK.Tip, { tip: 'Download' }, h(D.IconButton, { variant: 'tertiary', size: 'xs', 'aria-label': 'Download', onClick: dl }, h(IK.Icon, { name: 'ds-download' }))),
          off ? null : p.menu || null,
          h(IK.Tip, { tip: 'Close' }, h(D.IconButton, { variant: 'tertiary', size: 'xs', 'aria-label': 'Close preview', onClick: p.onClose }, h(IK.Icon, { name: 'ds-close' }))))),
      truncated(f) && !off ? h('div', { className: 'ik-dsfp-banner' },
        h(IK.Icon, { name: 'ds-warn', size: 16, className: 'ik-dsfp-banner-ic' }),
        h('span', null, 'Preview truncated. ',
          h(D.LinkButton, { asChild: true }, h('button', { type: 'button', onClick: dl }, 'Download')),
          ' to see the full file.')) : null,
      h('div', { className: 'ik-dsfp-body' },
        kind === 'table' ? h(Sample) : kind === 'text' ? h(Text) : h(None, { file: f, onDownload: off ? null : dl }),
        h(D.Typography, { element: 'div', textStyle: 'body12', textColor: 'secondary', className: 'flex-none px-1' },
          f.size + ' · ' + (f.origin === 'artifact' ? 'Artifact' : 'Uploaded') + ' · ' + f.date),
        /* Access, as every details panel ends (user, 2026-10-20): a shared file — who shared it and where; one's own
           shared — where. Nothing when it is in no workspace */
        by || names.length || p.onShare
          ? h('div', { className: 'flex-none px-1' }, h(IK.WsAccess, { by: by, names: names, links: f.links, inLabel: p.accessIn === false ? false : undefined,
              action: !by && p.onShare ? h(IK.Locked, { feature: 'workspaces', surface: 'modal', tip: 'Available on Pro', locked: !!p.shareLocked },
                h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: 'ws-share', size: 16 }), onClick: function () { p.onShare(f.id); } }, 'Share via Workspace')) : null })) : null,
        off ? h('div', { className: 'flex-none px-1' }, h(IK.WsUnavailableNote, { renewal: p.renewal, by: by, locked: !f.muted, noun: 'files', feature: 'shared-files' })) : null));
  };
})();
