/* AuthResendButton — "Resend email" with its cooldown living IN the button (check-email,
   reset-sent). Ported from auth-concept.js [data-au-resend]: on mount the button is disabled
   and reads "Resend available in Ns", counting down; at 0 it re-enables with its label.
   Demo: clicking it once available restarts the countdown (the email is "re-sent").

   <IK.AuthResendButton
     seconds={45}            // the cooldown after each send
     startIn={45}            // the cooldown left on mount (default = seconds; 0 → starts available)
     label="Resend email"
     onResend={fn}           // optional, called on each resend
   />
   D.Button primary, size lg, full width — the flow's CTA size.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h, R = window.React;

  IK.AuthResendButton = function AuthResendButton(p) {
    var secs = p.seconds == null ? 45 : p.seconds;
    var label = p.label || 'Resend email';
    var s = R.useState(p.startIn == null ? secs : p.startIn), n = s[0], setN = s[1];

    R.useEffect(function () {
      if (n <= 0) return undefined;
      var t = setTimeout(function () { setN(n - 1); }, 1000);
      return function () { clearTimeout(t); };
    }, [n]);

    function resend() {
      if (n > 0) return;
      if (p.onResend) p.onResend();
      setN(secs);
    }

    return h(D.Button, {
      type: 'button', variant: 'primary', size: 'lg', fullWidth: true,
      disabled: n > 0, onClick: resend
    }, n > 0 ? 'Resend available in ' + n + 's' : label);
  };
})();
