/* DsStorageMark — the storage statement on the Files page: one glyph beside the title, and the
   allowance behind it (page-changes/data-sources_files-landing.md → "Storage mark (2026-10-06)").
   Most days the number is irrelevant, so it is a mark, not a meter row; the day it matters it
   turns into a warning.

     within   info glyph, Icon/Rest → Icon/Hover; tooltip "38.6 MB of 50 MB used"
     over     warning glyph, Feedback/Attention → its hover step; tooltip "52.5 MB of 50 MB — over
              the limit"
   A CLICK (never the hover — the tooltip answers the hover) opens the plain upgrade-popover shell
   (IK.UpgradePopover tone="plain"): "Storage" / "Storage is full" + the plan the allowance BELONGS
   to (Free / Pro), the IK.Meter (Files · "38.6 MB of 50 MB", Feedback/Attention fill when over),
   and on Free only the "Extend the Limit" CTA — on a paid plan more storage is not what is for sale.

   h(IK.DsStorageMark, {
     usedMb: 38.6, capMb: 50, capLabel: '50 MB',
     planName: 'Free',            // the badge — whose allowance this is
     cta: true,                   // show "Extend the Limit" (Free)
     defaultOpen: false           // stories: start with the popover open
   })
   IK.dsFormatMb(mb) → '38.6 MB' · '1.1 GB'                                                        */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.dsFormatMb = function (mb) {
    return mb >= 1024 ? (mb / 1024).toFixed(1) + ' GB' : mb.toFixed(1).replace(/\.0$/, '') + ' MB';
  };

  IK.DsStorageMark = function DsStorageMark(p) {
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    var ref = R.useRef(null);
    var used = p.usedMb || 0, cap = p.capMb || 1;
    var over = used > cap;
    var pct = Math.min(100, Math.round(used / cap * 100));
    var fig = IK.dsFormatMb(used) + ' of ' + p.capLabel;
    return h(IK.Fragment, null,
      h(IK.Tip, { tip: fig + (over ? ' — over the limit' : ' used') },
        h('button', {
          ref: ref, type: 'button', 'aria-label': 'Storage', 'aria-haspopup': 'dialog', 'aria-expanded': open,
          className: IK.cx('ik-dssm', over && 'is-over', D.focusRing),
          onClick: function () { setOpen(!open); }
        }, h(IK.Icon, { name: over ? 'warning' : 'info', size: 16 }))),
      h(IK.UpgradePopover, {
        open: open, onOpenChange: setOpen, anchorRef: ref, side: 'bottom', align: 'start', tone: 'plain',
        name: over ? 'Storage is full' : 'Storage', plan: p.planName,
        cta: !!p.cta, ctaLabel: 'Extend the Limit'
      }, h(IK.Meter, { layout: 'inline', label: 'Files', value: fig, percent: pct, over: over, barLabel: 'Storage used' })));
  };
})();
