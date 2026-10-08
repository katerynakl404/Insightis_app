/* DsFileMark — the file-type mark: a coloured SQUARE carrying the extension (original .dsf-file-ic,
   a shared kit atom — Files table, file preview, attachments). LOCKED (CLAUDE.md "Type / icon marks
   are SQUARE"): the box is 1:1 and never stretches to fit its label; a label that does not fit
   changes, the box does not.

     csv          Brand/Tertiary
     xls · xlsx   Feedback/Green
     anything else Brand/Tertiary
   Label: Overline (10px / 600 / caps / +.08em) in Content/On-solid.

   h(IK.DsFileMark, { type: 'xlsx' })             // 32px (the Files table)
   h(IK.DsFileMark, { type: 'csv', size: 'sm' })   // 24px
     type   extension, lower-case ('csv', 'xls', 'xlsx', …) — the label is its upper-case
     label  override the text (e.g. a per-type short form)
     size   'md' 32px (default) · 'sm' 24px                                                       */
(function () {
  'use strict';
  var IK = window.InsightisKit, h = IK.h;
  var GREEN = { xls: 1, xlsx: 1 };
  IK.DsFileMark = function DsFileMark(p) {
    var t = String(p.type || '').toLowerCase();
    var small = p.size === 'sm';
    return h('span', {
      className: IK.cx('ik-dsfm', GREEN[t] && 'is-green', small && 'is-sm', p.className),
      'aria-hidden': p.label ? undefined : 'true'
    }, p.label || t.toUpperCase());
  };
})();
