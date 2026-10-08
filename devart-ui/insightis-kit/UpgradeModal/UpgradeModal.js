/* UpgradeModal — what a plan-locked ACTION answers a PRESS with (U3; changes/UpgradeModal.md).
   The popover answers a hover; someone who pressed Connect, Edit or Create had already decided to
   do something, so the reply is "one rung louder": the plan Badge as an eyebrow, the headline,
   the sentence, EVERY benefit, and the standard dialog footer — Cancel, then Upgrade to Unlock.

   It is DevartUI's Modal, not a new surface: ModalContent (size md) → ModalHeader (eyebrow +
   ModalTitle) → body → ModalFooter, with the same brand wash the UpgradePopover wears.

   Usually opened for you by h(IK.Locked, { feature, surface: 'modal' }, button). Directly:

   <IK.UpgradeModal
     feature="connections"        // key of IK.PLAN_FEATURES (or an object)
     open={open} onOpenChange={setOpen}
     returnFocusRef={triggerRef}  // focus goes back here on close (the trigger is where the person was)
     onUpgrade={fn}               // default IK.goUpgrade() → Settings → Manage plan
   />
   Also: title / lead / benefits / plan overrides. Esc, the scrim, the ✕ and Cancel close it;
   opening puts focus on the primary button.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.UpgradeModal = function UpgradeModal(p) {
    var f = IK.resolvePlanFeature ? IK.resolvePlanFeature(p) : (IK.planFeature(p.feature) || {});
    var primary = R.useRef(null);
    function close() { if (p.onOpenChange) p.onOpenChange(false); }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, {
        size: 'md', className: 'ik-upmodal',
        onOpenAutoFocus: function (e) { e.preventDefault(); if (primary.current) primary.current.focus(); },
        onCloseAutoFocus: function (e) {
          var t = p.returnFocusRef && p.returnFocusRef.current;
          if (t && t.focus) { e.preventDefault(); t.focus(); }
        }
      },
        h(D.ModalHeader, { className: 'items-start gap-2 pe-10' },
          f.plan ? h(IK.PlanLock, { plan: f.plan }) : null,
          h(D.ModalTitle, null, f.title)),
        h('div', { className: 'flex flex-col gap-4' },
          f.lead ? h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'body', className: 'm-0' }, f.lead) : null,
          h(IK.FeatList, { items: f.benefits || [], size: 'md' })),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: close }, 'Cancel'),
          h(D.Button, {
            ref: primary, variant: 'primary', size: 'sm', type: 'button',
            onClick: function (e) { close(); (p.onUpgrade || IK.goUpgrade)(e); }
          }, 'Upgrade to Unlock'))));
  };
})();
