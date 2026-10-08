/* UpgradePopover — what a plan-locked control answers a HOVER (or a tap) with: the feature's name,
   the plan Badge, the two strongest benefits, one CTA. U2 in the Free-plan brief; contract in
   changes/UpgradePopover.md. DevartUI Popover in the Insightis brand skin (the fading
   brand-tertiary wash + a tinted hairline), w-72 = the 18rem roomy width.

   Pages rarely use this directly — h(IK.Locked, { feature }, trigger) wires it to any trigger.
   Three exports:

   IK.UpgradePanel   the panel's content, static (stories, review pages, a custom host)
     feature         key of IK.PLAN_FEATURES, or a { plan, name, benefits } object
     name / plan / benefits   override the catalogue entry
     children        replaces the benefits list (a live-data body, e.g. a storage IK.Meter)
     cta             false hides the CTA (nothing left to upgrade to) · default true
     ctaLabel        'Upgrade to Unlock'
     onUpgrade       CTA click; default → IK.goUpgrade() (Settings → Manage plan)

   IK.UpgradePopover the anchored popover (controlled)
     open, onOpenChange
     anchorRef       ref to the trigger's DOM node (Radix virtual anchor — the trigger keeps its
                     own element and semantics)
     side            'right' for a row in a list (the list stays readable), 'bottom' for a button,
                     'top' for a control whose own menu opens upward. Radix flips on collision.
     align           'start'
     tone            'brand' (default) | 'plain' — plain = the same shell on Surface/Card, for a
                     panel that reports an allowance instead of selling (Files storage meter)
     autoFocus       move focus into the panel on open (true when opened from the keyboard)
     onPanelEnter / onPanelLeave   pointer handlers — the engine keeps the panel open while the
                     pointer travels from the trigger into it (160 ms grace)
     …UpgradePanel props
     Esc closes and returns focus to the anchor; an outside click closes; the anchor itself is not
     "outside" (its own click toggles).

   IK.FeatList       the ticked benefits list. { items: [], size: 'sm' | 'md' }

   IK.goUpgrade()    the one destination every upgrade CTA leads to. Stories set
                     IK.UPGRADE_NAVIGATES = false so the demos stay inert, as in the original kit.

   <IK.UpgradePanel feature="model-pro" />
   <IK.UpgradePanel feature="connections" tone="plain" name="Storage" plan="Free" ctaLabel="Extend the Limit">
     <IK.Meter label="Files" value="38.6 MB of 50 MB" percent={77} />
   </IK.UpgradePanel>
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.goUpgrade = function () {
    if (IK.UPGRADE_NAVIGATES === false) return;
    location.href = IK.planUrl();
  };

  IK.FeatList = function FeatList(p) {
    var md = p.size === 'md';
    return h('ul', { className: IK.cx('m-0 flex list-none flex-col gap-2 p-0', p.className) },
      (p.items || []).map(function (b, i) {
        return h('li', { key: i, className: IK.cx('flex items-start gap-2 text-ink-body', md ? 'text-sm' : 'text-xs') },
          h(IK.Icon, { name: 'check', size: 14, strokeWidth: 3, className: IK.cx('text-brand-primary', md ? 'mt-0.5' : 'mt-px') }),
          h('span', { className: 'min-w-0' }, b));
      }));
  };

  function resolve(p) {
    var f = IK.planFeature(p.feature) || {};
    return {
      name: p.name != null ? p.name : f.name,
      plan: p.plan != null ? p.plan : f.plan,
      benefits: p.benefits || f.benefits || [],
      title: p.title != null ? p.title : f.title,
      lead: p.lead != null ? p.lead : f.lead
    };
  }
  IK.resolvePlanFeature = resolve;

  IK.UpgradePanel = function UpgradePanel(p) {
    var f = resolve(p);
    var onUp = p.onUpgrade || IK.goUpgrade;
    return h('div', { className: 'flex flex-col gap-3' },
      h('div', { className: 'flex min-w-0 items-center gap-2' },
        h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0' }, f.name),
        f.plan ? h(IK.PlanLock, { plan: f.plan }) : null),
      p.children != null ? p.children : h(IK.FeatList, { items: f.benefits.slice(0, 2) }),
      p.cta === false ? null : h(D.Button, {
        variant: 'primary', size: 'sm', fullWidth: true, type: 'button',
        onClick: function (e) { if (p.onCta) p.onCta(e); onUp(e); }
      }, p.ctaLabel || 'Upgrade to Unlock'));
  };

  IK.UpgradePopover = function UpgradePopover(p) {
    var escRef = R.useRef(false);
    var anchorRef = p.anchorRef;
    var plain = p.tone === 'plain';
    function contains(t) { var a = anchorRef && anchorRef.current; return !!(a && t && a.contains(t)); }
    return h(D.Popover, { open: !!p.open, onOpenChange: p.onOpenChange },
      anchorRef ? h(D.PopoverAnchor, { virtualRef: anchorRef }) : null,
      h(D.PopoverContent, {
        side: p.side || 'bottom', align: p.align || 'start', sideOffset: 8, collisionPadding: 8,
        className: IK.cx('ik-upop', plain && 'is-plain', p.className),
        role: 'dialog', 'aria-label': resolve(p).name,
        onOpenAutoFocus: function (e) { if (!p.autoFocus) e.preventDefault(); },
        onEscapeKeyDown: function () { escRef.current = true; },
        onCloseAutoFocus: function (e) {
          e.preventDefault();
          if (escRef.current && anchorRef && anchorRef.current && anchorRef.current.focus) anchorRef.current.focus();
          escRef.current = false;
        },
        /* The anchor is not "outside": its own click toggles the panel. */
        onPointerDownOutside: function (e) { if (contains(e.target)) e.preventDefault(); },
        /* Focus moving elsewhere does not close it: a menu row hands focus to its menu the moment
           the pointer leaves for the panel, and that must not kill the panel on the way. It closes
           on the pointer leaving (grace), an outside click, Esc or a scroll — the original's set. */
        onFocusOutside: function (e) { e.preventDefault(); },
        onPointerEnter: p.onPanelEnter,
        onPointerLeave: p.onPanelLeave
      },
        h(IK.UpgradePanel, {
          feature: p.feature, name: p.name, plan: p.plan, benefits: p.benefits,
          cta: p.cta, ctaLabel: p.ctaLabel, onCta: function () { if (p.onOpenChange) p.onOpenChange(false); },
          onUpgrade: p.onUpgrade
        }, p.children)));
  };
})();
