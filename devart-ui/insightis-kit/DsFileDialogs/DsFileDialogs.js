/* DsFileDialogs — the Delete confirm (Files page, rule 30 in page-changes/data-sources_files-landing.md).
   DevartUI Modal — the same recipe as the sidebar's Delete chat? (IK.ChatDialogs). A file has no Rename (user,
   2026-10-20: «забирай — його не буде»), so no Rename file dialog.

   IK.DsDeleteFilesDialog (sm) — "Delete file?" / "Delete N files?", one sentence, Cancel ·
     Delete (destructive, focused on open). Deleting never happens without it.
     { open, onOpenChange, count: 1, onConfirm }                                                  */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

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
