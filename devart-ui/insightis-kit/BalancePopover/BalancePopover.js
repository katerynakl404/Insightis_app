/* BalancePopover — the sidebar footer's Balance row and the credits panel it opens (".sbx-tok" +
   ".sbx-pop-tokens" in the original). DevartUI Popover above the row, the panel's meters are
   IK.Meter, the coin IK.Coin, the CTAs DevartUI Buttons.

   What the panel shows follows the PLAN (chat-landing.html "Plan, in the sidebar"):
     Free  — NO monthly pool at all, a daily allowance instead: Daily Limit 12 of 20 today (bar, no
             coin), Purchased Credits 540 left (green coin, no bar). Row: "12 left". Plan "Free".
     Paid  — the monthly pool and no daily cap: Subscription Credits ◉ 5,520 of 15,000 (bar),
             Purchased Credits 540 left. Row: "9480 left". Plan "Pro".
   Order is always monthly → daily → purchased. Purchased never gets a bar or a fraction.
   A Pro plan in trial carries "Trial ends in N days" (Badge, attention) beside the plan name.

   IK.CREDITS                 { free, paid } — the demo figures above (subscription matrix)

   IK.BalancePopover          the row + its popover. Reads IK.usePlan() unless told otherwise.
     plan        'free' | 'paid'          default IK.usePlan()
     credits     override: an IK.CREDITS-shaped entry for the current plan
     trialDays   number → the trial Badge (Pro only, by contract)
     variant     'meter' (shipped) | 'combined' | 'summed' — the parked iterations, for review
     open / onOpenChange / defaultOpen    optional control
     side 'top' · align 'start'           placement (above the footer row)
     links       false → CTAs are inert buttons (review pages / stories)

   IK.BalanceRow              the trigger alone: "Balance  [wallet] N left". Spreads props + ref,
                              so it works as a PopoverTrigger asChild child.
     left        number or text
     as          'button' (default) | 'div' — an inert row (the review page's pinned triggers)

   IK.BalancePanel            the panel content alone (static, for the review page / stories)
     planName, trialDays, variant, pool {used, cap}, daily {used, cap}, purchased (left),
     purchasedTotal (combined only), left (hero total, combined / summed), links

   <IK.BalancePopover />                                        // sidebar footer, plan-driven
   <IK.BalancePanel planName="Pro" trialDays={14} pool={{ used: 3200, cap: 10000 }} purchased={0} />
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    /* lucide wallet — verbatim from the original .sbx-tok-val */
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>'
  });

  IK.CREDITS = {
    free: { planName: 'Free', daily: { used: 12, cap: 20 }, pool: null, purchased: 540, balance: 12 },
    paid: { planName: 'Pro', daily: null, pool: { used: 5520, cap: 15000 }, purchased: 540, balance: 9480 }
  };

  function n(v) { return typeof v === 'number' ? v.toLocaleString('en-US') : v; }
  function pct(a) { return a && a.cap ? Math.round(a.used / a.cap * 1000) / 10 : 0; }

  /* Box for box the original .sbx-tok (kit-theme.css): a column (4px gap) holding one row
     (label ⟷ value, 8px gap), 4px 6px padding → 26px tall; the wallet is a 12px glyph whose own
     3px content-box padding makes the 18px state-hover disc (.sbx-tok-val svg), 6px from the figure.
     `as` (optional, default 'button'): the review page's triggers are inert <div>s in the
     original — same look and hover, not a focus stop. */
  IK.BalanceRow = function BalanceRow(p) {
    var rest = Object.assign({}, p); delete rest.left; delete rest.label; delete rest.className; delete rest.as;
    var tag = p.as || 'button';
    return h(tag, Object.assign(tag === 'button' ? { type: 'button' } : {}, rest, {
      className: IK.cx('flex w-full cursor-pointer flex-col gap-1 rounded-md px-1.5 py-1 text-left',
        'transition-colors duration-fast hover:bg-state-hover pressed:bg-state-pressed', D.focusRing, p.className)
    }),
      h('span', { className: 'flex items-center justify-between gap-2' },
        h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary' }, p.label || 'Balance'),
        h('span', { className: 'inline-flex items-center gap-1.5' },
          h(IK.Icon, { name: 'wallet', size: 12, className: 'ik-bal-wallet flex-none rounded-full bg-state-hover text-ink-primary' }),
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'primary', className: 'tabular-nums' },
            (p.left == null ? '' : p.left) + ' left'))));
  };

  function Cta(p) {
    var common = { variant: p.variant, size: 'sm', rounded: 'full', fullWidth: true };
    if (p.href) return h(D.Button, Object.assign({ asChild: true }, common), h('a', { href: p.href }, p.children));
    return h(D.Button, Object.assign({ type: 'button', onClick: p.onClick }, common), p.children);
  }

  /* Iteration 2 (parked): one bar, two zones sized by pool, a legend per pool. */
  function CombinedBar(p) {
    var sub = p.pool || { used: 0, cap: 0 }, pur = p.purchasedTotal || 0, total = sub.cap + pur;
    var used = sub.used;
    var zones = [];
    if (sub.cap) zones.push(h('div', { key: 's', className: 'ik-bal-zone is-sub', style: { flexBasis: (total ? sub.cap / total * 100 : 100) + '%' } },
      h('div', { className: 'ik-bal-fill is-sub', style: { width: pct(sub) + '%' } })));
    if (pur) zones.push(h('div', { key: 'p', className: 'ik-bal-zone is-pur', style: { flexBasis: (pur / total * 100) + '%' } },
      h('div', { className: 'ik-bal-fill is-pur', style: { width: (p.purchasedUsed || 0) / pur * 100 + '%' } })));
    return h('div', { className: 'flex flex-col gap-2' },
      h('div', { className: 'ik-bal-bar', role: 'img', 'aria-label': n(used) + ' of ' + n(total) + ' credits used' }, zones),
      h('div', { className: 'flex justify-between' },
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, Math.round(total ? used / total * 100 : 0) + '% used'),
        h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, n(total) + ' total')));
  }

  function Legend(p) {
    return h('span', { className: 'inline-flex items-center gap-1.5' },
      h('span', { className: IK.cx('size-2 shrink-0 rounded-full', p.green ? 'bg-fb-green' : 'bg-brand-tertiary'), 'aria-hidden': 'true' }),
      h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, p.label + ' ',
        h('strong', { className: 'font-semibold text-ink-body' }, p.value)));
  }

  function Hero(p) {
    return h('div', { className: 'flex items-baseline gap-1' },
      h(D.Typography, { element: 'strong', textStyle: 'title20', textColor: 'primary', className: 'tabular-nums' }, n(p.left)),
      h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'left'));
  }

  IK.BalancePanel = function BalancePanel(p) {
    var v = p.variant || 'meter';
    var links = p.links !== false;
    var body = [];
    if (v === 'combined') {
      body.push(h(Hero, { key: 'hero', left: p.left }));
      body.push(h('div', { key: 'leg', className: 'flex flex-col gap-1' },
        h(Legend, { label: 'Subscription', value: n(p.pool ? p.pool.used : 0) + ' of ' + n(p.pool ? p.pool.cap : 0) }),
        h(Legend, { green: true, label: 'Purchased', value: n(p.purchasedUsed || 0) + ' of ' + n(p.purchasedTotal || 0) })));
      body.push(h(CombinedBar, { key: 'bar', pool: p.pool, purchasedTotal: p.purchasedTotal, purchasedUsed: p.purchasedUsed }));
    } else if (v === 'summed') {
      body.push(h(Hero, { key: 'hero', left: p.left }));
      if (p.pool) body.push(h(IK.Meter, { key: 'pool', layout: 'inline', coin: 'brand', label: 'Subscription Credits', value: n(p.pool.cap - p.pool.used) + ' / ' + n(p.pool.cap) }));
      body.push(h(IK.Meter, { key: 'pur', layout: 'inline', coin: 'green', label: 'Purchased Credits', value: n(p.purchased) + ' left' }));
    } else {
      if (p.pool) body.push(h(IK.Meter, { key: 'pool', coin: 'brand', label: 'Subscription Credits', value: n(p.pool.used) + ' of ' + n(p.pool.cap), percent: pct(p.pool) }));
      if (p.daily) body.push(h(IK.Meter, { key: 'day', layout: 'inline', label: 'Daily Limit', value: n(p.daily.used) + ' of ' + n(p.daily.cap) + (p.dailySuffix === false ? '' : ' today'), percent: pct(p.daily) }));
      body.push(h(IK.Meter, { key: 'pur', layout: 'inline', coin: 'green', label: 'Purchased Credits', value: n(p.purchased) + ' left' }));
    }
    return h('div', { className: IK.cx('flex w-full flex-col gap-3', p.className), role: p.role, 'aria-label': p['aria-label'] },
      h('div', { className: 'flex min-w-0 items-center gap-2 px-1' },
        h(D.Typography, { element: 'span', textStyle: 'title20', textColor: 'primary' }, p.planName),
        p.trialDays ? h(D.Badge, { variant: 'attention', size: 'sm' }, 'Trial ends in ' + p.trialDays + ' days') : null),
      h('div', { className: 'flex flex-col gap-3 px-1' }, body),
      h('div', { className: 'mt-0.5 flex flex-col gap-2' },
        h(Cta, { variant: 'primary', href: links ? IK.pageHref('approved/user_profile-modal.html?section=balance') : null, onClick: p.onBuy }, 'Buy Credits'),
        h(Cta, { variant: 'secondary', href: links ? IK.pageHref('approved/user_profile-modal.html?section=manage-plan') : null, onClick: p.onUpgrade }, 'Upgrade Plan')));
  };

  IK.BalancePopover = function BalancePopover(p) {
    var planS = IK.usePlan()[0];
    var plan = p.plan || planS;
    var c = p.credits || IK.CREDITS[plan === 'free' ? 'free' : 'paid'];
    /* Open state kept here too, so the panel can hang 4px above the sidebar FOOTER (not above the
       row) — measured when it opens (IK.sidebarFooterOffset, AccountMenu.js). */
    var trig = R.useRef(null);
    var os = R.useState(!!p.defaultOpen), ownOpen = os[0], setOwnOpen = os[1];
    var open = p.open != null ? p.open : ownOpen;
    var ctl = { open: open, onOpenChange: function (v) { setOwnOpen(v); if (p.onOpenChange) p.onOpenChange(v); } };
    var side = p.side || 'top';
    var off = p.sideOffset != null ? p.sideOffset : (side === 'top' && open && IK.sidebarFooterOffset ? IK.sidebarFooterOffset(trig.current) : 4);
    return h(D.Popover, ctl,
      h(D.PopoverTrigger, { asChild: true }, h(IK.BalanceRow, { ref: trig, left: c.balance, className: p.className })),
      h(D.PopoverContent, {
        side: side, align: p.align || 'start', sideOffset: off,
        className: 'w-60 p-4', 'aria-label': 'Subscription credits'
      },
        h(IK.BalancePanel, {
          planName: c.planName, trialDays: p.trialDays, variant: p.variant,
          pool: c.pool, daily: c.daily, purchased: c.purchased, left: c.balance, links: p.links
        })));
  };
})();
