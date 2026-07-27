/* Auth-flow concept (kit, dark). Injects the brand logo, builds the header screen-switcher,
   and wires the password toggle / live requirements / confirm-match. */

/* Current Insightis brand lockup (#lg) — mark = --logo-mark, wordmark = currentColor,
   i.e. rendered exactly like the kit sidebar (.sbx-brand-logo). */
var AU_LOGO =
  '<svg class="au-logo" viewBox="0 0 418 100" role="img" aria-label="Insightis">' +
    '<g fill="currentColor">' +
      '<path d="M400.473 31.3711C403.905 31.3711 406.789 31.9429 409.125 33.0869C411.461 34.1834 413.272 35.7095 414.56 37.6641C415.894 39.571 416.729 41.7642 417.062 44.2432L407.838 44.6719C407.6 43.3847 407.171 42.264 406.551 41.3105C405.931 40.3572 405.097 39.6427 404.048 39.166C402.999 38.6416 401.759 38.3789 400.329 38.3789C398.184 38.3789 396.563 38.808 395.467 39.666C394.37 40.5241 393.822 41.6685 393.822 43.0986C393.822 44.0998 394.06 44.9341 394.537 45.6016C395.062 46.269 395.896 46.817 397.04 47.2461C398.184 47.6275 399.709 47.9856 401.616 48.3193C405.621 48.9391 408.767 49.7489 411.056 50.75C413.392 51.7035 415.037 52.9432 415.99 54.4688C416.991 55.9466 417.492 57.7345 417.492 59.832C417.492 62.2633 416.8 64.3375 415.418 66.0537C414.083 67.7698 412.176 69.0806 409.697 69.9863C407.266 70.8444 404.406 71.2734 401.116 71.2734C397.35 71.2734 394.18 70.7253 391.605 69.6289C389.079 68.5324 387.124 67.0064 385.741 65.0518C384.359 63.0972 383.573 60.8802 383.382 58.4014L392.749 57.9727C393.083 59.9749 393.917 61.5246 395.252 62.6211C396.587 63.7176 398.565 64.2656 401.188 64.2656C403.333 64.2656 405.002 63.9321 406.193 63.2646C407.433 62.5496 408.053 61.4525 408.053 59.9746C408.053 59.1169 407.838 58.402 407.409 57.8301C406.98 57.258 406.169 56.7572 404.978 56.3281C403.786 55.8991 402.022 55.4701 399.686 55.041C395.776 54.3736 392.702 53.5628 390.461 52.6094C388.22 51.6082 386.623 50.3685 385.67 48.8906C384.764 47.4128 384.312 45.5776 384.312 43.3848C384.312 39.8093 385.67 36.9254 388.388 34.7324C391.153 32.4918 395.181 31.3711 400.473 31.3711Z"/>' +
      '<path d="M376.246 70.415H367.093V32.2295H376.246V70.415ZM376.46 27.1523H366.949V19H376.46V27.1523Z"/>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M350.297 32.2295H360.38V39.3086H350.297V58.6162C350.297 60.3801 350.679 61.6199 351.441 62.335C352.204 63.0022 353.396 63.3359 355.017 63.3359H360.38V70.415H352.228C348.414 70.415 345.601 69.5334 343.789 67.7695C342.025 66.0056 341.144 63.2406 341.144 59.4746V39.3086H335.137V32.2295H341.144V23.29H350.297V32.2295Z"/>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M305.783 37.3545C306.109 36.7073 306.49 36.1185 306.928 35.5898C308.072 34.1598 309.478 33.1108 311.146 32.4434C312.815 31.7283 314.651 31.3711 316.653 31.3711C319.466 31.3711 321.826 31.991 323.732 33.2305C325.687 34.4223 327.141 36.1147 328.095 38.3076C329.096 40.5006 329.597 43.0273 329.597 45.8877V70.415H320.443V48.1045C320.443 45.0058 319.919 42.6935 318.87 41.168C317.821 39.5948 316.176 38.8086 313.936 38.8086C311.457 38.8086 309.478 39.6184 308 41.2393C306.522 42.8601 305.783 45.2206 305.783 48.3193V70.415H296.63V19.6436H305.783V37.3545Z"/>' +
      '<path d="M266.857 31.3711C269.622 31.3711 272.007 31.991 274.009 33.2305C276.011 34.4698 277.464 36.1145 278.37 38.1641V32.2295H287.31V67.0547C287.31 70.2963 286.546 73.0377 285.021 75.2783C283.543 77.5188 281.445 79.1878 278.728 80.2842C276.058 81.4281 272.912 82 269.289 82C265.952 82 263.092 81.5473 260.708 80.6416C258.324 79.7358 256.393 78.4479 254.915 76.7793C253.485 75.1586 252.484 73.2758 251.912 71.1309L261.352 70.4873C261.828 71.9172 262.638 73.0373 263.782 73.8477C264.974 74.6581 266.81 75.0635 269.289 75.0635C272.102 75.0634 274.27 74.4198 275.796 73.1328C277.321 71.8933 278.084 69.9382 278.084 67.2686V62.4062C277.178 64.2653 275.725 65.767 273.723 66.9111C271.72 68.0076 269.479 68.5557 267 68.5557C263.854 68.5556 261.041 67.793 258.562 66.2676C256.131 64.6944 254.224 62.5256 252.842 59.7607C251.459 56.948 250.768 53.706 250.768 50.0352C250.768 46.3643 251.435 43.1459 252.77 40.3809C254.152 37.5682 256.06 35.3759 258.491 33.8027C260.922 32.1819 263.711 31.3711 266.857 31.3711ZM269.146 38.5225C266.333 38.5225 264.14 39.5714 262.566 41.6689C261.041 43.7188 260.278 46.484 260.278 49.9639C260.278 53.4439 261.065 56.2325 262.639 58.3301C264.26 60.3799 266.428 61.4052 269.146 61.4053C271.863 61.4053 274.032 60.4036 275.653 58.4014C277.274 56.3515 278.109 53.539 278.156 49.9639C278.204 47.5803 277.846 45.5542 277.083 43.8857C276.368 42.1695 275.319 40.8579 273.937 39.9521C272.602 38.9988 271.005 38.5225 269.146 38.5225Z"/>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M243.632 70.415H234.479V32.2295H243.632V70.415ZM243.847 27.1523H234.335V19H243.847V27.1523Z"/>' +
      '<path d="M210.315 31.3711C213.748 31.3711 216.632 31.9429 218.968 33.0869C221.304 34.1834 223.116 35.7095 224.403 37.6641C225.738 39.5709 226.573 41.7643 226.906 44.2432L217.681 44.6719C217.442 43.3847 217.013 42.264 216.394 41.3105C215.774 40.3573 214.939 39.6427 213.891 39.166C212.842 38.6417 211.603 38.3789 210.173 38.3789C208.028 38.3789 206.406 38.8079 205.31 39.666C204.213 40.5241 203.665 41.6685 203.665 43.0986C203.665 44.0997 203.903 44.9342 204.38 45.6016C204.904 46.2689 205.739 46.8171 206.883 47.2461C208.027 47.6275 209.553 47.9856 211.46 48.3193C215.464 48.9391 218.611 49.7489 220.899 50.75C223.235 51.7034 224.88 52.9433 225.833 54.4688C226.834 55.9466 227.335 57.7344 227.335 59.832C227.335 62.2633 226.643 64.3375 225.261 66.0537C223.926 67.7697 222.019 69.0806 219.54 69.9863C217.109 70.8444 214.248 71.2734 210.959 71.2734C207.193 71.2734 204.023 70.7254 201.448 69.6289C198.922 68.5324 196.967 67.0063 195.585 65.0518C194.202 63.0972 193.415 60.8803 193.225 58.4014L202.593 57.9727C202.926 59.9749 203.761 61.5246 205.096 62.6211C206.43 63.7173 208.409 64.2656 211.03 64.2656C213.175 64.2656 214.844 63.932 216.036 63.2646C217.276 62.5496 217.896 61.4525 217.896 59.9746C217.895 59.1168 217.681 58.402 217.252 57.8301C216.823 57.258 216.012 56.7572 214.82 56.3281C213.629 55.8991 211.865 55.47 209.529 55.041C205.62 54.3736 202.544 53.5628 200.304 52.6094C198.063 51.6083 196.466 50.3684 195.513 48.8906C194.607 47.4128 194.154 45.5775 194.154 43.3848C194.154 39.8093 195.513 36.9254 198.23 34.7324C200.995 32.4918 205.024 31.3711 210.315 31.3711Z"/>' +
      '<path d="M173.353 31.3711C176.165 31.3711 178.526 31.991 180.433 33.2305C182.387 34.47 183.865 36.1861 184.866 38.3789C185.867 40.5242 186.367 43.0273 186.367 45.8877V70.415H177.214V48.8193C177.214 46.6741 176.999 44.8626 176.57 43.3848C176.141 41.907 175.427 40.7862 174.426 40.0234C173.472 39.213 172.184 38.8076 170.563 38.8076C168.132 38.8077 166.178 39.6667 164.7 41.3828C163.27 43.099 162.555 45.5777 162.555 48.8193V70.415H153.401V32.2295H161.696L161.914 38.7656C162.298 37.755 162.774 36.8633 163.342 36.0908C164.533 34.4701 165.987 33.2784 167.703 32.5156C169.419 31.7529 171.303 31.3711 173.353 31.3711Z"/>' +
      '<path d="M142.113 70.415H132.817V19.6436H142.113V70.415Z"/>' +
    '</g>' +
    '<path class="au-logo-mark" d="M100 40.3752L85.0185 49.5197L100 58.6227L50 89L0 58.6227L14.9815 49.5197L0 40.3752L22.499 26.7072L30 31.2639L15 40.3752L50 61.6391L85 40.3752L70 31.2639L77.501 26.7072L100 40.3752ZM50 70.7525L22.4723 54.0287L14.9979 58.6227L50 79.8887L85.0021 58.6227L77.5257 54.0287L50 70.7525ZM70 40.398L50 52.5485L30 40.398L37.5175 35.831L50 43.4144L62.4825 35.831L70 40.398ZM70 22.1505L50 34.301L30 22.1505L50 10L70 22.1505ZM45 22.1484L50 25.1876L55 22.1484L50 19.1113L45 22.1484Z"/>' +
  '</svg>';

/* Screen list for the header switcher. */
var AU_SCREENS = [
  { g: 'Sign-up', items: [
    ['register.html', '1 · Create your account'],
    ['register-error.html', '✕ Email already registered'],
    ['check-email.html', '2 · Check your email'],
    ['confirm-email.html', '3 · Confirm your email'],
    ['confirmed.html', '✓ Email confirmed'],
    ['confirmed-name.html', '✓ Email confirmed (add name)'],
    ['confirm-error.html', '✕ Could not confirm'],
    ['login.html', '4 · Sign in']
  ]},
  { g: 'Password reset', items: [
    ['forgot-password.html', '1 · Reset your password'],
    ['reset-sent.html', '2 · Check your email'],
    ['reset-password.html', '3 · Set your new password'],
    ['reset-done.html', '✓ Password updated'],
    ['reset-error.html', '✕ Reset link invalid']
  ]},
  { g: 'System', items: [
    ['error.html', '✕ Error (authorize)'],
    ['illustrations.html', '◆ Illustration styles']
  ]}
];

(function () {
  document.querySelectorAll('.au-brand').forEach(function (el) { el.innerHTML = AU_LOGO; });

  /* Flag the header as concept-only scaffolding — this bar does not exist in the real product. */
  var nav = document.querySelector('.au-topnav');
  var brand = nav && nav.querySelector('.au-topnav-brand');
  if (nav && brand && !nav.querySelector('.au-concept-tag')) {
    var tag = document.createElement('span');
    tag.className = 'au-concept-tag';
    tag.textContent = 'Concept';
    tag.title = 'Preview scaffold — this header is not part of the product';
    brand.insertAdjacentElement('afterend', tag);
  }

  var current = (location.pathname.split('/').pop() || 'login.html');
  var sel = document.querySelector('[data-au-switch]');
  if (sel) {
    AU_SCREENS.forEach(function (grp) {
      var og = document.createElement('optgroup');
      og.label = grp.g;
      grp.items.forEach(function (it) {
        var o = document.createElement('option');
        o.value = it[0]; o.textContent = it[1];
        if (it[0] === current) o.selected = true;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    sel.addEventListener('change', function () { if (sel.value) location.href = sel.value; });
  }
})();

/* ===== Status illustrations — shared glyph set, 3 styles ===== */
var AU_ILLU_STYLE = 'halo';            /* halo | flat | line — style used across the live flow */
var AU_GLYPHS = {
  'triangle-alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'mail': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'mail-check': '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/>',
  'mail-x': '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8"/><path d="m22 7-8.99 5.73a2 2 0 0 1-2.02 0L2 7"/><path d="m17 17 4 4"/><path d="m21 17-4 4"/>',
  'shield-alert': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
};
function auIllu(key, state, style) {
  style = style || AU_ILLU_STYLE;
  var g = AU_GLYPHS[key] || AU_GLYPHS['triangle-alert'];
  return '<svg class="au-illu2 style-halo is-' + state + '" viewBox="0 0 112 112" fill="none" aria-hidden="true">' +
    '<circle class="ill-h1" cx="56" cy="56" r="52"/><circle class="ill-h2" cx="56" cy="56" r="40"/>' +
    '<g class="ill-glyph" transform="translate(32 32) scale(2)">' + g + '</g></svg>';
}
if (typeof window !== 'undefined') { window.auIllu = auIllu; window.AU_GLYPHS = AU_GLYPHS; }

/* Inject the illustration into every status block (replaces the old icon-circle / cartoon art). */
document.querySelectorAll('.au-status[data-illu]').forEach(function (st) {
  var state = st.classList.contains('is-error') ? 'error'
            : st.classList.contains('is-success') ? 'success' : 'info';
  var old = st.querySelector('.au-status-ic, .au-illu, .au-illu2');
  var svg = auIllu(st.getAttribute('data-illu'), state);
  if (old) { old.outerHTML = svg; } else { st.insertAdjacentHTML('afterbegin', svg); }
});

/* Password show/hide toggle (kit .au-eye — single icon at a time). */
document.querySelectorAll('[data-au-eye]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var input = btn.parentElement.querySelector('.igrp-input');
    var show = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(show));
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    if (input) input.type = show ? 'text' : 'password';
  });
});

/* Terms checkbox (kit .cbx). */
document.querySelectorAll('[data-au-cbx]').forEach(function (cb) {
  function toggle() {
    var on = cb.getAttribute('aria-checked') !== 'true';
    cb.setAttribute('aria-checked', String(on));
    cb.classList.toggle('on', on);
  }
  cb.addEventListener('click', toggle);
  cb.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
});

/* Live password requirements. */
var AU_RULES = {
  min: function (v) { return v.length >= 8; },
  upper: function (v) { return /[A-Z]/.test(v); },
  lower: function (v) { return /[a-z]/.test(v); },
  digit: function (v) { return /[0-9]/.test(v); },
  symbol: function (v) { return /[^A-Za-z0-9]/.test(v); }
};
document.querySelectorAll('[data-au-req]').forEach(function (list) {
  var input = document.getElementById(list.getAttribute('data-au-req'));
  if (!input) return;
  var fill = list.querySelector('[data-au-req-fill]');
  var levelEl = list.querySelector('[data-au-req-level]');
  var rules = list.querySelectorAll('li[data-rule]');
  function update() {
    var v = input.value, met = 0;
    rules.forEach(function (li) {
      var r = li.getAttribute('data-rule');
      var ok = !!(AU_RULES[r] && AU_RULES[r](v));
      li.classList.toggle('is-met', ok);
      if (ok) met++;
    });
    var total = rules.length || 5;
    var level = met === 0 ? 'none' : met < 3 ? 'weak' : met < total ? 'fair' : 'strong';
    list.setAttribute('data-level', level);
    if (fill) fill.style.width = Math.round(met / total * 100) + '%';
    if (levelEl) levelEl.textContent = met === 0 ? ''
      : level === 'weak' ? 'Weak' : level === 'fair' ? 'Fair' : 'Strong';
  }
  function reveal() { list.classList.add('is-open'); }
  input.addEventListener('focus', reveal);
  input.addEventListener('blur', function () { list.classList.remove('is-open'); });
  input.addEventListener('input', function () { reveal(); update(); });
  if (input.value) reveal();
  update();
});

/* Resend-email countdown — the timer lives IN the button (disabled + "Resend available in Ns"),
   then the button re-enables. Demo: clicking once available restarts the countdown. */
document.querySelectorAll('[data-au-resend]').forEach(function (btn) {
  var secs = parseInt(btn.getAttribute('data-au-resend-secs'), 10) || 45;
  var label = btn.textContent.trim();
  var timer;
  function tick(n) {
    if (n > 0) {
      btn.disabled = true; btn.classList.add('s-disabled');
      btn.textContent = 'Resend available in ' + n + 's';
      timer = setTimeout(function () { tick(n - 1); }, 1000);
    } else {
      btn.disabled = false; btn.classList.remove('s-disabled');
      btn.textContent = label;
    }
  }
  btn.addEventListener('click', function () { if (!btn.disabled) { clearTimeout(timer); tick(secs); } });
  tick(secs);
});

/* Confirm-password match. */
document.querySelectorAll('[data-au-confirm]').forEach(function (confirm) {
  var pw = document.getElementById(confirm.getAttribute('data-au-confirm'));
  var msg = document.querySelector('[data-au-confirm-msg="' + confirm.id + '"]');
  var group = confirm.closest('.igrp');
  function check() {
    var mismatch = confirm.value.length > 0 && pw && confirm.value !== pw.value;
    if (group) group.classList.toggle('s-error', mismatch);
    if (msg) msg.textContent = mismatch ? 'Passwords do not match' : '';
  }
  confirm.addEventListener('input', check);
  if (pw) pw.addEventListener('input', check);
});
