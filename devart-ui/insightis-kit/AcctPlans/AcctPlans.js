/* AcctPlans — the Manage plan section of the account window and the dialogs it opens. Locked
   (page-changes/user_profile-modal.md): the recommended tier carries the accent border + brand wash
   + lift AND its "Most popular" ribbon (never colour alone); the tier the account is on is not
   tinted — its disabled "Current Plan" CTA is the only marker; the period toggle swaps prices,
   was-prices and the period word in a paid plan's name.

   IK.AcctRibbon      { tone: 'solid' | 'brand' | 'accent' } — a marker on a card's top border.
                      brand / accent = DevartUI Badge (brand / green, sm). solid = the filled brand
                      "Most popular" of a credit pack — DevartUI Badge has no solid-fill variant.
   IK.AcctRibbonRow   the absolute row that straddles a card's top border (-8px, 16px in); holds 1–2
   IK.AcctPlanCard    { name, period, badges: ['50% OFF'], ribbons: [{ tone, label }], tagline,
                        price, was, per, perHidden, cta: { label, variant, disabled, onClick, id },
                        features: [], featured }
                      DevartUI Card (outline, xl corners). featured = the DS plan-card-featured roles.
   IK.AcctPlanCurrent { name, meta, onCancel, free }  "CURRENT PLAN" strip above the grid. free =
                      name only — no expiry, no Cancel Plan (a Free account has nothing to cancel).
   IK.AcctPlanHead    { title, size: 'lg' | 'sm', toggle }  "Choose a plan" + the period toggle
   IK.AcctPeriodToggle { value, onChange, size: 'md' | 'sm', icons }  Monthly / Yearly — md with the
                      two calendar glyphs (labels stay at every width: the glyphs differ by a few dots)
   IK.AcctLostList    { items }  what a downgrade takes away — a red ✕ per row
   IK.AcctConfirmDialog { open, onOpenChange, title, text, items, cancelLabel, confirmLabel,
                        confirmVariant: 'destructive' | 'primary', onConfirm }
                      DevartUI Modal (sm): warning glyph + title, the sentence, the lost list, footer
   IK.AcctYearlyDialog { open, onOpenChange, sent, onSend }  Modal (md) — the support-request form
                      (note TextArea) → "Request sent" + Done. Closing clears the note.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from the original Manage plan / dialog markup. */
  IK.defineIcons({
    'acctp-cal': '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    'acctp-cal-year': '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    'acctp-warn': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'acctp-tick': '<path d="M20 6 9 17l-5-5"/>',
    'acctp-cross': '<path d="M18 6 6 18M6 6l12 12"/>'
  });

  IK.AcctRibbon = function AcctRibbon(p) {
    if (p.tone === 'solid') return h('span', { className: 'ik-acct-ribbon' }, p.children);
    return h(D.Badge, { variant: p.tone === 'accent' ? 'green' : 'brand', size: 'sm' }, p.children);
  };

  IK.AcctRibbonRow = function AcctRibbonRow(p) {
    return h('div', { className: 'ik-acct-ribbons' }, p.children);
  };

  IK.AcctPlanCard = function AcctPlanCard(p) {
    var cta = p.cta || {};
    return h(D.Card, {
      variant: 'outline', rounded: 'xl',
      className: IK.cx('relative gap-1.5 p-5', p.featured && 'ik-acct-plan-featured border-plan-card-featured-border')
    },
      p.ribbons && p.ribbons.length ? h(IK.AcctRibbonRow, null, p.ribbons.map(function (r) {
        return h(IK.AcctRibbon, { key: r.label, tone: r.tone }, r.label);
      })) : null,
      h('div', { className: 'flex min-h-7 flex-wrap items-center gap-1.5' },
        h(D.Typography, { element: 'span', textStyle: 'title20', textColor: 'primary' }, p.period ? p.name + ' ' : p.name, p.period ? h('span', null, p.period) : null),
        (p.badges || []).map(function (b) { return h(D.Badge, { key: b, variant: 'success', size: 'sm', rounded: 'rounded' }, b); })),
      h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'secondary', className: 'mb-3' }, p.tagline),
      h('div', { className: 'flex flex-wrap items-baseline gap-y-0.5' },
        h(D.Typography, { element: 'span', textStyle: 'title30', textColor: 'primary', className: 'tabular-nums' }, p.price),
        p.was ? h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'light', lineThrough: true, className: 'ms-2 tabular-nums' }, p.was) : null,
        h(D.Typography, {
          element: 'span', textStyle: 'body12', textColor: 'secondary', className: IK.cx('mb-3 basis-full', p.perHidden && 'invisible'),
          'aria-hidden': p.perHidden || p.per === ' ' ? 'true' : undefined
        }, p.per)),
      h(D.Button, {
        id: cta.id, variant: cta.variant || 'outline', size: 'md', fullWidth: true,
        disabled: !!cta.disabled, 'aria-disabled': cta.disabled ? 'true' : undefined, onClick: cta.onClick
      }, cta.label),
      h('ul', { className: 'mt-4 flex flex-col gap-2' },
        (p.features || []).map(function (f) {
          return h('li', { key: f, className: 'flex items-start gap-2' },
            h('span', { className: 'flex h-4 flex-none items-center text-brand-primary', 'aria-hidden': 'true' },
              h(IK.Icon, { name: 'acctp-tick', size: 14, strokeWidth: 3 })),
            h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'body' }, f));
        })));
  };

  IK.AcctPlanCurrent = function AcctPlanCurrent(p) {
    return h('div', { className: 'mb-5 flex flex-wrap items-center gap-4 rounded-xl border border-stroke bg-surface-card px-4 py-3.5' },
      h('div', { className: 'flex min-w-0 flex-1 flex-col gap-1' },
        h(D.Typography, { element: 'span', textStyle: 'title12', textColor: 'secondary', className: 'ik-acct-eyebrow uppercase' }, 'Current plan'),
        /* Below 768px the name and the expiry stack (the separator goes). They keep the 8px gap: the
           original's tighter 2px phone gap is overridden by its own base rule, declared later. */
        h('span', { className: 'flex flex-wrap items-baseline gap-2 max-md:flex-col' },
          h(D.Typography, { element: 'span', textStyle: 'title16', textColor: 'primary' }, p.free ? 'Free' : p.name),
          p.free ? null : h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'max-md:hidden', 'aria-hidden': 'true' }, '·'),
          p.free ? null : h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, p.meta))),
      p.free ? null : h(D.Button, { variant: 'secondary', size: 'sm', className: 'flex-none', onClick: p.onCancel }, 'Cancel Plan'));
  };

  IK.AcctPeriodToggle = function AcctPeriodToggle(p) {
    var md = p.size !== 'sm';
    function trig(v, label, icon) {
      return h(D.SegmentedControlTrigger, { value: v, 'aria-label': md ? label : undefined },
        p.icons ? h(IK.Icon, { name: icon }) : null, p.icons ? h('span', null, label) : label);
    }
    return h(D.SegmentedControl, { value: p.value, onValueChange: p.onChange, size: md ? 'md' : 'sm' },
      h(D.SegmentedControlList, { 'aria-label': 'Billing period' },
        trig('monthly', 'Monthly', 'acctp-cal'), trig('yearly', 'Yearly', 'acctp-cal-year')));
  };

  IK.AcctPlanHead = function AcctPlanHead(p) {
    var lg = p.size !== 'sm';
    var title = h(D.Typography, { element: 'div', textStyle: lg ? 'title20' : 'title14', textColor: 'primary', className: lg ? undefined : 'flex-1' }, p.title || 'Choose a plan');
    return h('div', { className: IK.cx('flex flex-wrap items-center justify-between gap-3', lg && 'min-h-9') },
      lg ? h('div', { className: 'min-w-0 flex-1 pr-4' }, title) : title,
      h('div', { className: 'flex-none' }, p.toggle));
  };

  IK.AcctLostList = function AcctLostList(p) {
    return h('ul', { className: 'flex flex-col gap-1.5' },
      (p.items || []).map(function (f) {
        return h('li', { key: f, className: 'flex items-start gap-2' },
          h('span', { className: 'flex h-5 flex-none items-center text-fb-red-text', 'aria-hidden': 'true' },
            h(IK.Icon, { name: 'acctp-cross', size: 14, strokeWidth: 3 })),
          h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' }, f));
      }));
  };

  function DlgTitle(p) {
    return h(D.ModalHeader, { className: 'flex-row items-center gap-3 pe-10' },
      p.warn ? h(IK.Icon, { name: 'acctp-warn', size: 20, className: 'text-fb-attention' }) : null,
      h(D.ModalTitle, { className: 'min-w-0 flex-1' }, p.children));
  }

  IK.AcctConfirmDialog = function AcctConfirmDialog(p) {
    function close() { if (p.onOpenChange) p.onOpenChange(false); }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'sm', closeButtonProps: { 'aria-label': 'Close' } },
        h(DlgTitle, { warn: p.warn !== false }, p.title),
        h('div', { className: 'flex flex-col gap-3' },
          h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' }, p.text),
          h(IK.AcctLostList, { items: p.items })),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'md', onClick: close }, p.cancelLabel),
          h(D.Button, { variant: p.confirmVariant || 'primary', size: 'md', onClick: function () { if (p.onConfirm) p.onConfirm(); close(); } }, p.confirmLabel))));
  };

  IK.AcctYearlyDialog = function AcctYearlyDialog(p) {
    function close() { if (p.onOpenChange) p.onOpenChange(false); }
    var sent = !!p.sent;
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'md', closeButtonProps: { 'aria-label': 'Close' } },
        h(DlgTitle, { warn: false }, sent ? 'Request sent' : 'Switch to yearly billing'),
        sent
          ? h('div', { className: 'flex flex-col gap-2' },
              h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' },
                'Support will contact you within one business day to move your Starter subscription to yearly billing. Your current plan stays active in the meantime.'))
          : h('div', { className: 'flex flex-col gap-3.5' },
              h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body' },
                'Monthly plans can\'t switch to yearly automatically. Send a request and support will apply it to your Starter plan.'),
              h('label', { className: 'flex flex-col gap-1.5' },
                h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'body' }, 'Note for support (optional)'),
                h(D.TextArea, { rows: 3, placeholder: 'Seat count, preferred start date, PO number…' }))),
        h(D.ModalFooter, null,
          sent ? null : h(D.Button, { variant: 'secondary', size: 'md', onClick: close }, 'Cancel'),
          sent
            ? h(D.Button, { variant: 'primary', size: 'md', onClick: close }, 'Done')
            : h(D.Button, { variant: 'primary', size: 'md', onClick: p.onSend }, 'Send Request'))));
  };
})();
