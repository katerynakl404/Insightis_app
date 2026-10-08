/* AuthIllustration — the status artwork of the auth flow (pages/concept/auth/*).
   Ported verbatim from auth-concept.js `auIllu()`: the "Halo" style — two concentric tinted
   discs (r 52 / r 40 on a 112 box) with a lucide glyph scaled ×2 in the middle, drawn at
   104px. The original kept three style packs (Soft / Line / Flat pop); only Halo ships in
   the flow and on its showcase page, so only Halo is ported.

   The glyph is the illustration's own artwork, not an icon of the kit, so its markup lives
   in this file (IK.AuthIllustration.GLYPHS) rather than in the shared icon dictionary.

   <IK.AuthIllustration
     glyph="mail"            // triangle-alert | mail | mail-check | mail-x | shield-alert |
                             // shield-check | circle-check (unknown → triangle-alert)
     tone="info"             // error | info | success — the accent: --fb-red / --brand-primary / --fb-green
     size={104}              // rendered px (the artwork is a 112 box)
   />
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, h = IK.h;

  /* verbatim from auth-concept.js AU_GLYPHS */
  var GLYPHS = {
    'triangle-alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'mail': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    'mail-check': '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/>',
    'mail-x': '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8"/><path d="m22 7-8.99 5.73a2 2 0 0 1-2.02 0L2 7"/><path d="m17 17 4 4"/><path d="m21 17-4 4"/>',
    'shield-alert': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
  };
  var TONES = ['error', 'info', 'success'];

  IK.AuthIllustration = function AuthIllustration(p) {
    var tone = TONES.indexOf(p.tone) >= 0 ? p.tone : 'info';
    var size = p.size || 104;
    return h('svg', {
      className: IK.cx('ik-auth-illu', 'is-' + tone, p.className),
      width: size, height: size, viewBox: '0 0 112 112', fill: 'none',
      'aria-hidden': 'true', focusable: 'false'
    },
      h('circle', { className: 'ik-auth-illu-h1', cx: 56, cy: 56, r: 52 }),
      h('circle', { className: 'ik-auth-illu-h2', cx: 56, cy: 56, r: 40 }),
      h('g', {
        className: 'ik-auth-illu-glyph', transform: 'translate(32 32) scale(2)',
        dangerouslySetInnerHTML: { __html: GLYPHS[p.glyph] || GLYPHS['triangle-alert'] }
      }));
  };
  IK.AuthIllustration.GLYPHS = GLYPHS;
  IK.AuthIllustration.TONES = TONES;
})();
