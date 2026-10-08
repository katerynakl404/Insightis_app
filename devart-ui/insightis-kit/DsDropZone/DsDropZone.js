/* DsDropZone — the file-upload target: drag files onto it, or click anywhere on it / its Browse
   button to pick them. Port of the kit DropZone (.dsf-drop*, changes/DropZone.md; Files page rules
   1, 6, 7, 8 in page-changes/data-sources_files-landing.md). DevartUI has no drop zone; the button
   is DevartUI's Button (outline, sm).

   States: rest (dashed Stroke on Surface/Card 2) · hover and focus-within (border + glyph tint
   toward Brand/Primary, a 4% brand wash) · drag-over (solid Brand/Primary border, State/Hover fill).
   The icon sits INLINE with the title (rule 7); the helper line lists no formats (rule 8).

   h(IK.DsDropZone, {
     onBrowse: function () {},              // the zone or its button was clicked
     onFiles: function (fileList) {},       // files were dropped
     title: 'Drag & drop files here',
     sub: 'or click to browse — files you upload are available to query in chats',
     buttonLabel: 'Browse Files',
     state: 'hover' | 'focus' | 'dragover'  // stories only: pin a state
   })                                                                                              */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    'ds-upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'
  });

  IK.DsDropZone = function DsDropZone(p) {
    var d = R.useState(false), over = d[0], setOver = d[1];
    var pinned = p.state;
    var isDrag = over || pinned === 'dragover', isHover = pinned === 'hover', isFocus = pinned === 'focus';
    return h('div', {
      role: 'region', 'aria-label': 'Upload area — drag files here or browse',
      className: IK.cx('ik-dsdz', isDrag && 'is-dragover', isHover && 's-hover', isFocus && 's-focus', p.className),
      onClick: function () { if (p.onBrowse) p.onBrowse(); },
      onDragOver: function (e) { e.preventDefault(); setOver(true); },
      onDragLeave: function () { setOver(false); },
      onDrop: function (e) {
        e.preventDefault(); setOver(false);
        var files = e.dataTransfer && e.dataTransfer.files;
        if (files && files.length && p.onFiles) p.onFiles(files);
      }
    },
      h('div', { className: 'ik-dsdz-head' },
        h(IK.Icon, { name: 'ds-upload', size: 20, className: 'ik-dsdz-ic' }),
        h(D.Typography, { element: 'p', textStyle: 'title16', textColor: 'primary', align: 'center', className: 'm-0' }, p.title || 'Drag & drop files here')),
      h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', align: 'center', className: 'm-0 text-balance' },
        p.sub || 'or click to browse — files you upload are available to query in chats'),
      h(D.Button, {
        variant: 'outline', size: 'sm', type: 'button', className: 'mt-2',
        onClick: function (e) { e.stopPropagation(); if (p.onBrowse) p.onBrowse(); }
      }, p.buttonLabel || 'Browse Files'));
  };
})();
