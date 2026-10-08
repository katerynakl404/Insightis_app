/* DsFileDialogs — Rename file and the Delete confirm (Files page, rules 29–30 in
   page-changes/data-sources_files-landing.md). DevartUI Modal for both — the same recipe as the
   sidebar's Rename chat / Delete chat? (IK.ChatDialogs).

   IK.DsRenameFileDialog (md) — "Rename file", "Give your file a recognizable name", the name
     prefilled with the BASENAME preselected (the extension stays out of the selection, so typing
     replaces the meaningful part); Enter or Save saves, an empty name saves nothing.
     { open, onOpenChange, name, onSave: function (newName) {} }

   IK.DsDeleteFilesDialog (sm) — "Delete file?" / "Delete N files?", one sentence, Cancel ·
     Delete (destructive, focused on open). Deleting never happens without it.
     { open, onOpenChange, count: 1, onConfirm }                                                  */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.DsRenameFileDialog = function DsRenameFileDialog(p) {
    var v = R.useState(p.name || ''), val = v[0], setVal = v[1];
    var ref = R.useRef(null);
    /* Prefill, then focus with the BASENAME selected — once the value is in the field (selecting
       before React has written it selects nothing, or everything). */
    R.useEffect(function () {
      if (!p.open) return;
      setVal(p.name || '');
      var t = setTimeout(function () {
        var el = ref.current; if (!el) return;
        var name = p.name || '', dot = name.lastIndexOf('.');
        el.focus(); el.setSelectionRange(0, dot > 0 ? dot : name.length);
      }, 60);
      return function () { clearTimeout(t); };
    }, [p.open, p.name]);
    function save() {
      var n = (val || '').trim();
      if (n && p.onSave) p.onSave(n);
      else if (p.onOpenChange) p.onOpenChange(false);
    }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, {
        size: 'md',
        onOpenAutoFocus: function (e) { e.preventDefault(); }
      },
        h(D.ModalHeader, null, h(D.ModalTitle, null, 'Rename file')),
        h('div', { className: 'flex flex-col gap-3' },
          h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' }, 'Give your file a recognizable name'),
          h(D.InputGroup, null,
            h(D.InputGroupInput, {
              ref: ref, value: val, placeholder: 'File name', autoComplete: 'off', 'aria-label': 'File name',
              onChange: function (e) { setVal(e.target.value); },
              onKeyDown: function (e) { if (e.key === 'Enter') { e.preventDefault(); save(); } }
            }))),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { p.onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: save }, 'Save'))));
  };

  IK.DsDeleteFilesDialog = function DsDeleteFilesDialog(p) {
    var ref = R.useRef(null);
    var many = (p.count || 1) > 1;
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, {
        size: 'sm',
        onOpenAutoFocus: function (e) { e.preventDefault(); setTimeout(function () { if (ref.current) ref.current.focus(); }, 50); }
      },
        h(D.ModalHeader, null, h(D.ModalTitle, null, many ? 'Delete ' + p.count + ' files?' : 'Delete file?')),
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' },
          many ? 'This action can\'t be undone. The selected files will be permanently removed.'
               : 'This action can\'t be undone. The file will be permanently removed.'),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { p.onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { ref: ref, variant: 'destructive', size: 'sm', type: 'button', onClick: p.onConfirm }, 'Delete'))));
  };
})();
