/* AuthTerms — the Terms of Service consent row on register (and register-error).
   The original is a kit .cbx toggled by auth-concept.js [data-au-cbx]; here D.Checkbox with its
   label, the link inside it. Sits in IK.AuthCard.Row, the 28px row login's
   "Forgot password?" also uses, so the CTA below lands at the same Y on both screens.

   <IK.AuthTerms href="https://insightis-landing.vercel.app/security/terms" defaultChecked={false} />
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.AuthTerms = function AuthTerms(p) {
    return h(IK.AuthCard.Row, null,
      h(D.Checkbox, {
        name: 'terms', defaultChecked: p.defaultChecked, checked: p.checked, onCheckedChange: p.onCheckedChange,
        labelPosition: 'left',   /* box first, then the words — DevartUI's default puts the box after */
        label: h(IK.Fragment, null, 'I accept ',
          h(D.LinkButton, {
            href: p.href || 'https://insightis-landing.vercel.app/security/terms', target: '_blank', rel: 'noopener'
          }, 'Terms of Service'))
      }));
  };
})();
