/* FileDetails — File details: IK.DetailsPanel filled from a file — the preview first (its truncated strip on top), the
   facts and Workspaces folded under "Details", Download · Add to Chat · Delete in the head; a shared one: no Delete;
   unavailable: why, and the way back. The preview column beside the list (the whole screen below 1024px) on Files and
   a workspace's page. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;
  /* DetailsPanel's helpers, read when a panel is built (DetailsPanel.js may load after this file) */
  function k(n) { return function () { return IK.detailsKit[n].apply(null, arguments); }; }
  var act = k('act'), call = k('call'), shareBtn = k('shareBtn');

  /* a file — o: { onDownload(id), onAddToChat(id), onDelete(id), onShare(id), shareLocked, renewal } */
  IK.fileDetails = function (f, o) {
    o = o || {};
    var by = f.by || (f.shared && f.shared.by), off = !!by && !!(f.locked || f.muted);
    var names = f.wsNames || f.sharedWith || [];
    var ext = (String(f.name).split('.').pop() || '').toUpperCase();
    function dl() { if (o.onDownload) o.onDownload(f.id); }
    return {
      title: 'File details', name: f.name, foldDetails: true,
      after: off ? h(IK.WsUnavailableMark, { by: by, locked: !f.muted, noun: 'files', feature: 'shared-files' }) : null,
      rows: [{ label: 'Type', value: ext }, f.size ? { label: 'Size', value: f.size } : null,
        /* Origin as the Files list's own tag (user, 2026-10-20: "чому не тег") */
        { label: 'Origin', value: h(IK.DsOriginBadge, { origin: f.origin }) }, f.date ? { label: 'Modified', value: f.date } : null],
      access: by ? (names.length ? { names: names, links: f.links } : null)
        : names.length || o.onShare ? { names: names, links: f.links, onRemove: o.onRemoveFromWorkspace ? function (it) { o.onRemoveFromWorkspace(it, f); } : undefined, action: o.onShare ? shareBtn('Share via Workspace', o.shareLocked, call(o.onShare, f.id)) : null } : null,
      previewBanner: off ? null : h(IK.DsFilePreviewBanner, { file: f, onDownload: dl }),
      preview: off ? h(IK.DsFileUnavailable, { by: by, locked: !f.muted, renewal: o.renewal })
        : h(IK.DsFilePreviewContent, { file: f, bare: true, onDownload: dl }),
      acts: off ? null : { main: [act('Download', 'download', { onClick: dl })], /* the ⋮ offers what the file's row offers: Add to Chat, Share via Workspace (user, 2026-10-22: 'бракує опції додати
           файл в воркспейс'), then Delete */
        more: (o.onAddToChat ? [act('Add to Chat', 'add-chat', { onClick: call(o.onAddToChat, f.id) })] : [])
          .concat(!by && o.onShare ? [act('Share via Workspace', 'ws-share', { feature: 'workspaces', locked: !!o.shareLocked, onClick: call(o.onShare, f.id) })] : []),
        danger: !by && o.onDelete ? [act('Delete', 'delete', { onClick: call(o.onDelete, f.id) })] : [],
        /* on its workspace page, the Owner: Remove from Workspace */
        specific: o.onRemoveHere ? [act('Remove from Workspace', 'ws-remove', { danger: true, onClick: call(o.onRemoveHere, f.id) })] : [] }
    };
  };

  /* IK.FileDetails — the one File details, the same wherever it opens (user, 2026-10-22).
       h(IK.FileDetails, { file, onClose, width, onWidthChange, …options })   the preview column: an aside beside the list
                                                 (.ik-dsfp), its left edge a grip that resizes it (320–720px), as the product's
       h(IK.FileDetails, { file, inline: true, style, …options })   in place (stories, the concept page)
     options: what IK.fileDetails(file, options) takes (above) */
  IK.FileDetails = function FileDetails(p) {
    var ws = R.useState(null), wU = ws[0], setWU = ws[1];
    var rs = R.useState(false), resizing = rs[0], setResizing = rs[1];
    if (!p.file) return null;
    var width = p.width != null ? p.width : wU;
    function setW(px) { if (p.onWidthChange) p.onWidthChange(px); if (p.width == null) setWU(px); }
    /* the grip on its left edge (user, 2026-10-22: 'подивись як на проді' — the product's preview resizes) */
    function grip(e) {
      e.preventDefault();
      setResizing(true);
      function move(ev) { setW(Math.max(320, Math.min(window.innerWidth - ev.clientX, Math.min(720, window.innerWidth - 360)))); }
      function up() { setResizing(false); document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); }
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
    }
    var o = Object.assign({}, p);
    ['file', 'onClose', 'inline', 'style', 'className', 'width', 'onWidthChange'].forEach(function (x) { delete o[x]; });
    var props = IK.fileDetails(p.file, o);
    if (p.inline) return h(IK.DetailsPanel, Object.assign({ inline: true, style: p.style, className: p.className }, props));
    return h('aside', { className: IK.cx('ik-dsfp', resizing && 'is-resizing'), 'aria-label': 'File preview', style: width ? { width: width + 'px' } : undefined },
      h('div', { className: 'ik-dsfp-grip', 'aria-hidden': 'true', onPointerDown: grip }),
      h(IK.DetailsPanel, Object.assign({ bare: true, onClose: p.onClose }, props)));
  };
})();
