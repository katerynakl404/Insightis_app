/* Coin — the Insightis credit coin: a flat disc carrying the white mark. It marks a WALLET, never a
   rate limit (the daily-limit meter carries no coin — page-changes/user_profile-modal.md rule 5).
   Brand (teal) = the subscription pool, green = purchased credits.

   Style 1 (Flat) is the chosen, shipped coin. Styles 2–4 are the parked concepts from
   pages/concept/coin-review.html, kept so that review page can still be rebuilt. The artwork is
   the original SVGs copied verbatim into Coin/assets/ (illustrations, not UI colour).

   <IK.Coin />                          brand, style 1, 28px (the subscription meter's coin)
   <IK.Coin tone="green" size="sm" />   20px (the purchased row)
   <IK.Coin size={120} variant={3} />   any px size, any of the four styles
     tone     'brand' | 'green'                   default 'brand'
     variant  1 | 2 | 3 | 4                        default 1
     size     'xs' 16 · 'sm' 20 · 'md' 28 · 'lg' 36 · or a number (px)
     label    accessible name; default decorative (aria-hidden)
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, h = IK.h;
  var SIZES = { xs: 'size-4', sm: 'size-5', md: 'size-7', lg: 'size-9' };

  IK.Coin = function Coin(p) {
    var tone = p.tone === 'green' ? 'green' : 'brand';
    var v = [1, 2, 3, 4].indexOf(+p.variant) >= 0 ? +p.variant : 1;
    var size = p.size == null ? 'md' : p.size;
    var num = typeof size === 'number';
    var art = 'ik-coin-' + tone + '-' + v;            /* ik-coin-brand-1 … ik-coin-green-4 */
    return h('span', {
      className: IK.cx('ik-coin', art, !num && SIZES[size], p.className),
      style: num ? { width: size, height: size } : undefined,
      role: p.label ? 'img' : undefined,
      'aria-label': p.label || undefined,
      'aria-hidden': p.label ? undefined : 'true'
    });
  };
})();
