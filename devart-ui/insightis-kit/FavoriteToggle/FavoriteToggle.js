/* FavoriteToggle — a star that marks an item a favourite. DevartUI has the same control for pinning
   (D.PinToggle: a 2xs IconButton, aria-pressed, tertiary → primaryTertiary when on, the glyph filled,
   its tooltip the action) but no star; this is that control with a star, the same API, until дизайн
   DevartUI has one (a candidate: it is the PinToggle with another glyph).

   h(IK.FavoriteToggle, { pressed, onPressedChange(next), size: '2xs' | 'xs', reveal, label })
     pressed          on: filled star, primaryTertiary; off: outline star, tertiary
     reveal           off → shown on its row's hover / focus only (a D.Card row is group/row), always on
                      touch and below 768px — the reveal DevartUI's RowMenuButton does; on is always shown
     label            what is starred, for the screen reader ("Add MRR growth to Favorites")
   The click never reaches the row (it does not open what the row opens). Not plan-gated: keeping a list
   of favourites changes nothing the plan sells.
   Motion (user, 2026-10-21: "бракує анімацій при лайку і його забиранні"): set — the star pops (grows, tilts,
   settles) as it fills; taken back — it dips and comes back empty. Only on a click, never on mount; none under
   prefers-reduced-motion. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    /* lucide star */
    'fav-star': '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>'
  });

  var REVEAL = 'opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 focus-visible:opacity-100 max-md:opacity-100 [@media(hover:none)]:opacity-100';

  IK.FavoriteToggle = function FavoriteToggle(p) {
    var on = !!p.pressed, what = p.label ? p.label + ' ' : '';
    var as = R.useState(null), anim = as[0], setAnim = as[1];
    var tip = on ? 'Remove from Favorites' : 'Add to Favorites';
    return h(IK.Tip, { tip: tip },
      h(D.IconButton, {
        type: 'button', size: p.size || '2xs', variant: on ? 'primaryTertiary' : 'tertiary',
        'aria-pressed': on, 'aria-label': on ? 'Remove ' + what + 'from Favorites' : 'Add ' + what + 'to Favorites',
        className: IK.cx('ik-fav', anim && 'is-' + anim, p.reveal && !on && !anim && REVEAL, p.className),
        onClick: function (e) { e.stopPropagation(); setAnim(on ? 'unset' : 'set'); if (p.onPressedChange) p.onPressedChange(!on); },
        onAnimationEnd: function () { setAnim(null); },
        onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }
      }, h(IK.Icon, { name: 'fav-star' })));
  };
})();
