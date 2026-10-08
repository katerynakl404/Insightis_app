/* AcctBalance — the Balance section of the account window: the credit balance block, the Buy
   credits block and the parts both are made of. Locked rules (page-changes/user_profile-modal.md):
   the hero reads "N left" (never "credits"), Purchased NEVER gets a bar or a used-of fraction,
   the daily limit is a second bar on the Subscription pool with NO coin, order is always
   monthly → daily → Purchased. Bars are DevartUI ProgressBar (lg, rounded-full).

   IK.AcctBalanceHead  { badges: [{ label, variant: 'primary' | 'attention' }], wrap }
                       "Your credit balance" + the plan / trial Badges (sm, 4px corners — the kit's badge-sm)
   IK.AcctBalanceHero  { amount, unit: ' left', icon: 'wallet' | 'alert' | null, onUpgrade,
                         gap: 2 | 3, ctaHideOnPhone }
                       [icon] 827 left ··· [Upgrade Plan]. icon 'alert' = the concept's exhausted
                       red alert disc. ctaHideOnPhone: the CTA drops out below 768px — the
                       concept page then shows IK.AcctBalanceCtaRow under the pools instead.
   IK.AcctBalanceCtaRow { onUpgrade } — the phone-only full-width Upgrade Plan row (concept page)
   IK.AcctPool         { name, coin: 'brand' | 'green', left, meta, percent, barLabel }
                       the shipped list row: name · coin · "N left" ··· "X of Y used", bar under it
                       when `percent` is given (Subscription, Daily limit); Purchased = head only
   IK.AcctPoolV3       { name, left, exhausted, percent, tone: 'brand' | 'green', foot: [l, r] }
                       retired V3: name ··· "N left" (red when exhausted), bar, used / reset foot
   IK.AcctPoolB        { name, coin, amount, percent, foot: [l, r], note }
                       retired Version B: name ··· coin amount, bar + foot, or a note (Purchased)
   IK.AcctComboBar     { legend: [{ tone, name, value, extra }], zones: [{ tone, basis, fill }],
                         exhausted, label, summary: { full, short, right } }
                       retired V2: legend · one two-zone bar · "N% of total credits used" / "N left"
   IK.AcctBuyCredits   { packs, empty, tray: 'page' | 'card2', hidden, onBuy }
                       "Buy credits" + its line, then the packs in a tinted tray (3-up, 1-up ≤600px)
                       or, `empty`, the same tray holding "No credit packs are available right now".
                       `hidden` keeps the title + line and drops the tray (the concept's Version B).
   IK.AcctCreditPack   { name, price, credits, popular, onBuy }  one pack — DevartUI Card + Button
   IK.ACCT_PACKS       Small 5,000 $9.99 · Medium 12,500 $19.99 (Most popular) · Large 20,000 $29.99
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  /* Verbatim from the original Balance markup. */
  IK.defineIcons({
    'acctb-wallet': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    'acctb-alert': '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
    'acctb-coins': '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>'
  });

  IK.ACCT_PACKS = [
    { name: 'Small', price: '$9.99', credits: '5,000' },
    { name: 'Medium', price: '$19.99', credits: '12,500', popular: true },
    { name: 'Large', price: '$29.99', credits: '20,000' }
  ];

  IK.AcctBalanceHead = function AcctBalanceHead(p) {
    return h('div', { className: IK.cx('flex items-center gap-2', p.wrap !== false && 'flex-wrap') },
      h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, 'Your credit balance'),
      (p.badges || []).map(function (b) {
        return h(D.Badge, { key: b.label, variant: b.variant || 'primary', size: 'sm', rounded: 'rounded' }, b.label);
      }));
  };

  IK.AcctBalanceHero = function AcctBalanceHero(p) {
    var ic = null;
    if (p.icon === 'wallet') ic = h('div', { className: 'flex size-9 flex-none items-center justify-center rounded-full bg-state-hover text-ink-secondary', 'aria-hidden': 'true' },
      h(IK.Icon, { name: 'acctb-wallet', size: 20 }));
    if (p.icon === 'alert') ic = h('div', { className: 'flex size-9 flex-none items-center justify-center rounded-full bg-fb-red/10 text-fb-red-text', 'aria-hidden': 'true' },
      h(IK.Icon, { name: 'acctb-alert', size: 20 }));
    return h('div', { className: IK.cx('mt-3 flex flex-wrap items-center', p.gap === 3 ? 'gap-3' : 'gap-2') },
      ic,
      h(D.Typography, { element: 'div', textStyle: 'title24', textColor: 'primary', className: 'flex-1' }, p.amount,
        h(D.Typography, { element: 'span', textStyle: 'heading20', textColor: 'secondary' }, p.unit == null ? ' left' : p.unit)),
      h('div', { className: IK.cx('flex flex-none justify-end gap-2', p.ctaHideOnPhone && 'max-md:hidden') },
        h(D.Button, { variant: 'secondary', size: 'sm', onClick: p.onUpgrade }, 'Upgrade Plan')));
  };

  IK.AcctBalanceCtaRow = function AcctBalanceCtaRow(p) {
    return h('div', { className: 'hidden w-full gap-2 max-md:flex' },
      h(D.Button, { variant: 'secondary', size: 'sm', className: 'flex-1', onClick: p.onUpgrade }, 'Upgrade Plan'));
  };

  function Bar(p) {
    return h(D.ProgressBar, { value: p.percent, size: 'lg', rounded: 'full', variant: p.variant || 'tertiary', 'aria-label': p.label });
  }

  IK.AcctPool = function AcctPool(p) {
    return h('div', { className: 'flex flex-col gap-1.5' },
      h('div', { className: 'flex items-center gap-2' },
        h(D.Typography, { element: 'span', textStyle: 'title12', textColor: 'primary' }, p.name),
        p.coin ? h(IK.Coin, { tone: p.coin, size: 'xs', className: '-mr-1' }) : null,
        h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'primary', className: 'tabular-nums' }, p.left),
        p.meta ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'ms-auto' }, p.meta) : null),
      p.percent != null ? h(Bar, { percent: p.percent, label: p.barLabel }) : null);
  };

  IK.AcctPoolV3 = function AcctPoolV3(p) {
    var bad = p.exhausted;
    return h('div', { className: 'flex flex-col gap-1.5' },
      h('div', { className: 'flex items-center justify-between gap-2' },
        h(D.Typography, { element: 'span', textStyle: 'title12', textColor: 'primary' }, p.name),
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: bad ? 'destructive' : 'secondary' },
          h('strong', { className: IK.cx('font-semibold', bad ? 'text-fb-red-text' : 'text-ink-body') }, p.left), ' left')),
      h(Bar, { percent: p.percent, label: p.barLabel, variant: bad ? 'destructive' : (p.tone === 'green' ? 'green' : 'tertiary') }),
      h('div', { className: 'flex justify-between gap-2' },
        (p.foot || []).map(function (t, i) { return h(D.Typography, { key: i, element: 'span', textStyle: 'body12', textColor: 'secondary' }, t); })));
  };

  IK.AcctPoolB = function AcctPoolB(p) {
    return h('div', { className: 'flex flex-col gap-1.5' },
      h('div', { className: 'flex items-center gap-2' },
        h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary' }, p.name),
        h(IK.Coin, { tone: p.coin, size: 'sm', className: 'ms-auto' }),
        h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'primary', className: 'tabular-nums' }, p.amount)),
      p.percent != null ? h(Bar, { percent: p.percent, label: p.barLabel }) : null,
      p.foot ? h('div', { className: 'flex justify-between gap-2' },
        p.foot.map(function (t, i) { return h(D.Typography, { key: i, element: 'span', textStyle: 'body12', textColor: 'secondary' }, t); })) : null,
      p.note ? h(D.Typography, { element: 'div', textStyle: 'body12', textColor: 'secondary' }, p.note) : null);
  };

  IK.AcctComboBar = function AcctComboBar(p) {
    var s = p.summary || {};
    return h('div', { className: 'mt-3' },
      h('div', { className: 'mb-2 flex flex-wrap gap-y-1' },
        (p.legend || []).map(function (l, i) {
          var pur = l.tone === 'green';
          return h(D.Typography, {
            key: i, element: 'span', textStyle: 'body12', textColor: 'secondary',
            className: IK.cx('inline-flex items-center gap-1.5 self-start', i > 0 && 'ms-3 border-l border-stroke ps-3')
          },
            h('span', { className: IK.cx('size-2 flex-none rounded-full', pur ? 'bg-fb-green' : 'bg-brand-tertiary'), 'aria-hidden': 'true' }),
            l.name + ' ',
            h('span', null, h('strong', { className: 'font-semibold text-ink-body' }, l.value), h('span', { className: 'ms-1' }, 'used')),
            l.extra ? h(IK.Fragment, null, ' ', h('span', null, l.extra)) : null);
        })),
      h('div', { className: 'ik-acct-combo', role: 'img', 'aria-label': p.label },
        (p.zones || []).map(function (z, i) {
          var zp = z.tone === 'green';
          return h('div', { key: i, className: IK.cx('ik-acct-zone', zp ? 'is-pur' : 'is-sub'), style: { flexBasis: z.basis } },
            h('div', { className: IK.cx('ik-acct-fill', p.exhausted ? 'is-red' : (zp ? 'is-pur' : 'is-sub')), style: { width: z.fill } }));
        })),
      h('div', { className: 'mt-2 flex justify-between' },
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' },
          h('span', { className: 'max-md:hidden' }, s.full), h('span', { className: 'hidden max-md:inline' }, s.short)),
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, s.right)));
  };

  IK.AcctCreditPack = function AcctCreditPack(p) {
    return h(D.Card, { variant: 'outline', className: 'relative gap-1' },
      p.popular ? h(IK.AcctRibbonRow, null, h(IK.AcctRibbon, { tone: 'solid' }, 'Most popular')) : null,
      h('div', { className: 'flex items-baseline justify-between gap-2' },
        h(D.Typography, { element: 'div', textStyle: 'title12', textColor: 'secondary' }, p.name),
        h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'body' }, p.price)),
      h(D.Typography, { element: 'div', textStyle: 'title20', textColor: 'primary' }, p.credits + ' ',
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'credits')),
      /* No extra air above Buy: the original's margin-top sits inside an unclosed comment, so the
         pack runs at its 4px gap throughout — reproduced as drawn. */
      h(D.Button, { variant: 'secondary', size: 'sm', fullWidth: true, onClick: p.onBuy }, 'Buy'));
  };

  IK.AcctBuyCredits = function AcctBuyCredits(p) {
    var card2 = p.tray === 'card2';
    var tray = IK.cx('ik-acct-tray', card2 ? 'bg-surface-card2' : 'bg-surface-page');
    var body = null;
    if (p.empty) {
      body = h('div', { className: IK.cx(tray, 'is-empty') },
        h(D.StatusView, {
          size: 'sm', surface: 'embedded', withIconHalo: false,
          icon: h(IK.Icon, { name: 'acctb-coins', size: 32, strokeWidth: 1.5, className: 'text-ink-inactive' }),
          description: 'No credit packs are available right now'
        }));
    } else if (!p.hidden) {
      body = h('div', { className: tray },
        (p.packs || IK.ACCT_PACKS).map(function (k) { return h(IK.AcctCreditPack, Object.assign({ key: k.name, onBuy: p.onBuy }, k)); }));
    }
    return h(IK.AcctSection, { gap: 4, pt: 5, divider: false, id: p.id },
      h('div', { className: 'flex flex-col gap-1' },
        h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, 'Buy credits'),
        h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'secondary' },
          'Purchased credits never expire — they\'re used only after your monthly credits run out.')),
      body);
  };
})();
