/* Meter — label, figure, bar: how much of an allowance is gone (changes/Meter.md). Credits in the
   sidebar balance popover, storage on the Files page. The bar is DevartUI's ProgressBar (4px,
   rounded-full) — Brand/Tertiary fill, Feedback/Attention when `over`.

   Two layouts, both from the original popover:
     stacked  label on its own line, then [coin] + the figure at Title/16, then the bar
              — the subscription pool:  Subscription Credits / ◉ 5,520 of 15,000 / ▬▬▬
     inline   label · [small coin] · figure (Title/12) on one line, bar under it if there is one
              — the daily limit (bar, NO coin: a rate cap is not a wallet), purchased credits
                (coin, NO bar: the bought total is unknown, so no fraction is computable —
                page-changes/user_profile-modal.md rule 2), storage (bar)

   <IK.Meter label="Subscription Credits" value="5,520 of 15,000" percent={37} coin="brand" />
   <IK.Meter layout="inline" label="Daily Limit" value="12 of 20 today" percent={60} />
   <IK.Meter layout="inline" label="Purchased Credits" value="540 left" coin="green" />
   <IK.Meter layout="inline" label="Files" value="1.2 GB of 1 GB" percent={100} over />
     label     string
     value     the figure, as text (it carries the number; the bar is decoration)
     percent   0–100 → draws the bar; omit for no bar. `used` + `max` work too.
     coin      'brand' | 'green' | null
     layout    'stacked' (default) | 'inline'
     over      fill takes Feedback/Attention (over the limit — the figure says it in words too)
     barLabel  accessible name for the bar when the person acts on the number (storage)
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.Meter = function Meter(p) {
    var inline = p.layout === 'inline';
    var pct = p.percent != null ? p.percent : (p.used != null && p.max ? p.used / p.max * 100 : null);
    var bar = pct == null ? null : h(D.ProgressBar, {
      value: Math.max(0, Math.min(100, pct)), size: 'md', rounded: 'full',
      variant: p.over ? 'attention' : 'tertiary',
      'aria-label': p.barLabel || undefined,
      'aria-hidden': p.barLabel ? undefined : 'true'
    });
    var label = h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'min-w-0 flex-1' }, p.label);
    var rows = inline
      ? [h('div', { key: 'r', className: 'flex items-center gap-1' }, label,
          p.coin ? h(IK.Coin, { tone: p.coin, size: 'sm' }) : null,
          h(D.Typography, { element: 'span', textStyle: 'title12', textColor: 'primary', className: 'tabular-nums whitespace-nowrap' }, p.value))]
      : [h('div', { key: 'l', className: 'flex items-center' }, label),
         h('div', { key: 'v', className: 'flex items-center gap-1' },
           p.coin ? h(IK.Coin, { tone: p.coin, size: 'md' }) : null,
           h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary', className: 'tabular-nums' }, p.value))];
    return h('div', { className: IK.cx('flex w-full flex-col gap-1.5', p.className), 'data-over': p.over ? '' : undefined },
      rows, bar);
  };
})();
