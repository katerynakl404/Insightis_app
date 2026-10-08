/* AcctSettings — the account window's plain sections, the same on every page that hosts the
   window (user_profile-modal + the balance-versions concept). Each renders the CONTENT of one
   section — one or more IK.AcctSection blocks — for IK.AcctModal's body. Copy verbatim from the
   original; Title Case on buttons ("Change Password" included — a user decision,
   page-changes/user_profile-modal.md), Sentence case on labels.

   IK.AcctMyAccount      { email, onChangePassword }
                         Your email + Change Password (link) · Delete my account + Delete Account
                         (destructiveOutline) · Theme — Light / Dark / System segmented control.
                         The Theme control is a local choice only, exactly like the original's
                         (it does not switch the page theme); below 768px it drops to icons.
   IK.AcctChangePassword { onCancel }  two DevartUI PasswordInputs + Cancel / Change Password
   IK.AcctFeedback       {}            Your feedback (TextArea, 5 rows) + Attach File / Send Feedback
   IK.AcctBilling        { plan: { name, price }, next: { amount, date }, rows: [[date, desc, amount]],
                           onChangePlan }
                         Current plan + Change Plan · Payment method + Update · Billing history
                         (next charge + the invoice table, a Download link per row)
   IK.AcctTable          { columns: [{ label, align }], rows: [[cell…]] } — DevartUI Table, compact
                         density, used by Billing history and Balance → Credit usage
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from the original My account / Feedback markup. */
  IK.defineIcons({
    'accts-sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    'accts-moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    'accts-system': '<path d="M5.5 20H8"/><path d="M17 9h.01"/><rect width="10" height="16" x="12" y="4" rx="2"/><path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4"/><circle cx="17" cy="15" r="1"/>',
    'accts-clip': '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>'
  });

  var THEMES = [
    { value: 'light', label: 'Light', icon: 'accts-sun' },
    { value: 'dark', label: 'Dark', icon: 'accts-moon' },
    { value: 'system', label: 'System', icon: 'accts-system' }
  ];

  IK.AcctMyAccount = function AcctMyAccount(p) {
    var t = R.useState('light'), theme = t[0], setTheme = t[1];
    return h(IK.Fragment, null,
      h(IK.AcctSection, null,
        h(IK.AcctFieldRow, {
          title: 'Your email', value: p.email || 'andriil@devart.com',
          action: h(D.Typography, { element: 'span', textStyle: 'body14' },
            h(D.LinkButton, { asChild: true },
              h('button', { type: 'button', onClick: p.onChangePassword }, 'Change Password')))
        })),
      h(IK.AcctSection, { row: true },
        h('div', null,
          h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, 'Delete my account'),
          h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'secondary', className: 'mt-1' },
            'The datasets and chat sessions will also be permanently cleared')),
        h(D.Button, { variant: 'destructiveOutline', size: 'sm', className: 'ms-auto flex-none' }, 'Delete Account')),
      h(IK.AcctSection, null,
        h('div', { className: 'flex flex-col gap-2' },
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary' }, 'Theme'),
          h(D.SegmentedControl, { value: theme, onValueChange: setTheme, size: 'md' },
            h(D.SegmentedControlList, { 'aria-label': 'Theme', className: 'flex w-full' },
              THEMES.map(function (o) {
                return h(D.SegmentedControlTrigger, { key: o.value, value: o.value, 'aria-label': o.label },
                  h(IK.Icon, { name: o.icon }), h('span', { className: 'max-md:hidden' }, o.label));
              }))))));
  };

  function Pw(p) {
    return h('div', { className: 'flex flex-col gap-1.5' },
      h(D.Typography, { element: 'label', htmlFor: p.id, textStyle: 'body14', textColor: 'secondary' }, p.label),
      h(D.PasswordInput, {
        id: p.id, placeholder: p.placeholder, autoComplete: p.autoComplete,
        toggleShowLabel: 'Show ' + p.which + ' password', toggleHideLabel: 'Hide ' + p.which + ' password'
      }));
  }

  IK.AcctChangePassword = function AcctChangePassword(p) {
    return h(IK.AcctSection, { divider: false, pb: 'none' },
      h(Pw, { id: 'chpw-current', label: 'Current password', placeholder: 'Enter current password', autoComplete: 'current-password', which: 'current' }),
      h(Pw, { id: 'chpw-new', label: 'New password', placeholder: 'Enter new password', autoComplete: 'new-password', which: 'new' }),
      h('div', { className: 'mt-1 flex justify-end gap-2' },
        h(D.Button, { variant: 'secondary', size: 'sm', onClick: p.onCancel }, 'Cancel'),
        h(D.Button, { variant: 'primary', size: 'sm' }, 'Change Password')));
  };

  IK.AcctFeedback = function AcctFeedback() {
    return h(IK.AcctSection, { divider: false, pb: 'none' },
      h('div', null,
        h(D.Typography, { element: 'label', htmlFor: 'fb-msg', textStyle: 'title14', textColor: 'primary', className: 'mb-1.5 block' }, 'Your feedback'),
        h(D.TextArea, { id: 'fb-msg', rows: 5 })),
      h('div', { className: 'flex items-center justify-end gap-2' },
        h(D.Button, { variant: 'secondary', size: 'sm', leftSlot: h(IK.Icon, { name: 'accts-clip' }) }, 'Attach File'),
        h(D.Button, { variant: 'primary', size: 'sm' }, 'Send Feedback')));
  };

  IK.AcctTable = function AcctTable(p) {
    function align(c) { return c && c.align === 'right' ? 'text-right' : undefined; }
    return h(D.Table, { density: 'compact' },
      h(D.TableHeader, null,
        h(D.TableRow, null, p.columns.map(function (c, i) {
          return h(D.TableHead, { key: i, className: align(c) }, c.label);
        }))),
      h(D.TableBody, null, p.rows.map(function (r, i) {
        return h(D.TableRow, { key: i }, r.map(function (cell, k) {
          return h(D.TableCell, { key: k, className: align(p.columns[k]) }, cell);
        }));
      })));
  };

  function strong(t) { return h('strong', { className: 'font-semibold text-ink-primary' }, t); }

  IK.AcctBilling = function AcctBilling(p) {
    var plan = p.plan || { name: 'Starter', price: '$7.99 / user / month' };
    var next = p.next || { amount: '$7.99', date: 'Sep 30, 2026' };
    var rows = p.rows || [];
    return h(IK.Fragment, null,
      h(IK.AcctSection, null,
        h(IK.AcctFieldRow, {
          title: 'Current plan', value: h(IK.Fragment, null, strong(plan.name), ' · ' + plan.price),
          action: h(D.Button, { variant: 'secondary', size: 'sm', onClick: p.onChangePlan }, 'Change Plan')
        })),
      h(IK.AcctSection, null,
        h(IK.AcctFieldRow, {
          title: 'Payment method', value: 'Visa ending in 4242 · expires 08 / 27',
          action: h(D.Button, { variant: 'secondary', size: 'sm' }, 'Update')
        })),
      h(IK.AcctSection, { divider: false, pb: 'none' },
        h('div', { className: 'flex flex-wrap items-center justify-between gap-2.5' },
          h(D.Typography, { element: 'div', textStyle: 'title14', textColor: 'primary' }, 'Billing history'),
          h(D.Typography, { element: 'div', textStyle: 'body14', textColor: 'body' }, 'Next charge ', strong(next.amount), ' · ' + next.date)),
        h(IK.AcctTable, {
          columns: [{ label: 'Date' }, { label: 'Description' }, { label: 'Amount' }, { label: 'Invoice', align: 'right' }],
          rows: rows.map(function (r) {
            return r.concat([h(D.LinkButton, { asChild: true }, h('button', { type: 'button' }, 'Download'))]);
          })
        })));
  };
})();
