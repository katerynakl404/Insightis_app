/* PlanLock — the marker a plan-locked control wears. One marker everywhere, one colour, one shape
   (changes/UpgradePopover.md → "Glyph per state"). Two forms, and the rule is the word:

     IK.PlanLock  — the DevartUI Badge (primary) carrying the plan NAME, optionally led by the padlock.
                    Wide, quiet places that are already full of words: a menu row, the popover head
                    (beside the feature name), the modal eyebrow (above the headline).
     IK.LockGlyph — the padlock alone, 14px, currentColor. Where the name does not fit: a button
                    (it LEADS — its icon slot, or prepended), a row in a list (it TRAILS at the
                    right-hand edge, the row keeps its own icon), a table cell, composer chrome.
                    currentColor on purpose: white on a primary button, body ink on a tertiary one.

   Locked is not disabled — see Locked/Locked.js for the trigger behaviour. These two are only the
   marks; IK.Locked places them for you (marker: 'lead' | 'trail' | 'badge' | 'none').

   <IK.PlanLock plan="Starter" />                    Badge, plan name only (popover head / eyebrow)
   <IK.PlanLock plan="Starter" glyph />              Badge with the padlock in front (a menu row)
   <IK.PlanLock plan="Pro" size="md" />              28px Badge, beside a button
   <IK.LockGlyph />                                  the padlock alone
   <IK.LockGlyph className="ms-auto" />              trailing in a row
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.LockGlyph = function LockGlyph(p) {
    return h(IK.Icon, { name: 'lock', size: p.size || 14, className: IK.cx('ik-lock-glyph', p.className), label: p.label });
  };

  IK.PlanLock = function PlanLock(p) {
    var size = p.size || 'sm';
    return h(D.Badge, {
      variant: 'primary', size: size, rounded: p.rounded,
      className: IK.cx('ik-plan-lock', p.className),
      leftSlot: p.glyph ? h(IK.Icon, { name: 'lock', size: size === 'sm' ? 12 : 14 }) : null,
      'data-plan': p.plan
    }, p.plan);
  };
})();
