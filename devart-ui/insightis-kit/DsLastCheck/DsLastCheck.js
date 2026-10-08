/* DsLastCheck — the "Last check" status of a saved connection (Connections table, mobile card,
   detail panel). Port of dsSyncHtml() in pages/approved/data-sources_connections-landing.html;
   locked design: page-changes/data-sources_connections-landing.md → "Last check + Test
   connection". A listed connection IS connected, so there is no connected / synced badge: the
   relative time is the anchor, and a glyph carries the outcome of the last check.

     healthy  DevartUI Badge (secondary, sm, pill) — success circle-tick + "2 hours ago";
              tooltip = the exact time ("Oct 8, 2:14 PM")
     failed   the same Badge in error, and the whole pill is a BUTTON: circle-✕ + time; tooltip
              "Check failed: <reason> · <exact time>"; a click opens the error toast (onDetails)
     testing  the same pill with a spinner, "Testing…" — same height, so the row cannot jump

   h(IK.DsLastCheck, {
     lastSync: 1696760000000,          // ms timestamp of the last check
     status: 'active' | 'error',
     error: 'API key expired or revoked (HTTP 401)',
     busy: false,                      // a check is running
     onDetails: function () {}         // failed pill click → the page's error toast
   })

   Helpers (shared with the page and the panel):
     IK.dsRelTime(ts)  → 'just now' · '32 min ago' · '2 hours ago' · '1 day ago' · 'Oct 2'
     IK.dsAbsTime(ts)  → 'Oct 8, 2:14 PM'
     IK.dsFailReason(c)→ '<error> · <abs time>'                                                      */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  /* The same two paths the toast uses (kit-kit.js TOAST_ICONS) — the pill and the toast it opens
     read as one status. */
  IK.defineIcons({
    'ds-ok': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'ds-err': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>'
  });

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  IK.dsRelTime = function (ts) {
    var s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return 'just now';
    var m = Math.floor(s / 60);
    if (m < 60) return m + ' min ago';
    var hr = Math.floor(m / 60);
    if (hr < 24) return hr + (hr === 1 ? ' hour ago' : ' hours ago');
    var d = Math.floor(hr / 24);
    if (d < 7) return d + (d === 1 ? ' day ago' : ' days ago');
    var dt = new Date(ts);
    return MONTHS[dt.getMonth()] + ' ' + dt.getDate();
  };
  IK.dsAbsTime = function (ts) {
    var dt = new Date(ts), hh = dt.getHours(), mm = dt.getMinutes();
    var ap = hh >= 12 ? 'PM' : 'AM', h12 = hh % 12 || 12;
    return MONTHS[dt.getMonth()] + ' ' + dt.getDate() + ', ' + h12 + ':' + (mm < 10 ? '0' + mm : mm) + ' ' + ap;
  };
  IK.dsFailReason = function (c) { return (c.error || 'Unknown error') + ' · ' + IK.dsAbsTime(c.lastSync); };

  IK.DsLastCheck = function DsLastCheck(p) {
    var time = IK.dsRelTime(p.lastSync);
    var pill;
    if (p.busy) {
      pill = h(D.Badge, { variant: 'secondary', size: 'sm', rounded: 'full', leftSlot: h(D.Spinner, { size: 'xs', color: 'accent', label: 'Testing' }) }, 'Testing…');
    } else if (p.status === 'error') {
      pill = h(IK.Tip, { tip: 'Check failed: ' + IK.dsFailReason(p) },
        h('button', {
          type: 'button', className: IK.cx('ik-dslc-btn', D.focusRing),
          'aria-label': 'Last check failed ' + time + ' — view details',
          onClick: function (e) { e.stopPropagation(); if (p.onDetails) p.onDetails(); }
        }, h(D.Badge, { variant: 'error', size: 'sm', rounded: 'full', leftSlot: h(IK.Icon, { name: 'ds-err', size: 12 }) }, time)));
    } else {
      pill = h(IK.Tip, { tip: IK.dsAbsTime(p.lastSync) },
        h(D.Badge, { variant: 'secondary', size: 'sm', rounded: 'full', leftSlot: h(IK.Icon, { name: 'ds-ok', size: 12 }) }, time));
    }
    return h('div', { className: IK.cx('ik-dslc', p.className) }, pill);
  };
})();
