/* AppsReview — the review jump between the two screens of AIINS-1778, as the brief's own mock-up had it
   ("Consent · Identity" / "Authorized apps · Settings"). Not product: in the product the consent screen is opened by
   the assistant, never from Insightis. Both pages sit one folder under pages/, so the links are the same shape.

   RK.appsScreenControl('consent' | 'settings') → a ReviewBar control, first on both pages:
     Screen   Consent (concept/assistant-consent.html) · Settings (approved/user_profile-modal.html?section=authorized-apps) */
(function () {
  'use strict';
  var RK = window.ReviewKit;
  var HREF = {
    consent: '../concept/assistant-consent.html',
    settings: '../approved/user_profile-modal.html?section=authorized-apps'
  };

  RK.appsScreenControl = function (here) {
    return {
      label: 'Screen', showLabel: true, value: here,
      options: [{ value: 'consent', label: 'Consent' }, { value: 'settings', label: 'Settings' }],
      onChange: function (v) { if (v !== here) location.assign(HREF[v]); }
    };
  };
})();
