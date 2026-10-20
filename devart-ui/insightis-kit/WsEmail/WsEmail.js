/* WsEmail — the two shared-workspaces emails, as the message reads in a mail client: the envelope
   (From · To · Subject) over the letter — the Insightis logo, a heading, the sentences, one button,
   a small footnote. DevartUI Card + Typography + Avatar + Button. Names wrap, never truncate.

     invitation  to the invited address, account or not (the brief, AIINS-1866): who invited, to
                 which workspace, what to do — sign in or create an account with this email — and
                 when it runs out (14 days)
     renewal     a Member's request to the Owner of a Blocked workspace (Ask … to Renew): who asked,
                 why members lost access, that nothing was deleted, Upgrade Plan

   h(IK.WsEmail, { kind: 'invitation' | 'renewal', ws, from: { name, email, initial }, to, expires })   */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  function line(label, value) {
    return h('div', { className: 'flex min-w-0 gap-2' },
      h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'secondary', className: 'w-16 shrink-0' }, label),
      h(D.Typography, { element: 'span', textStyle: 'body14', textColor: 'body', className: 'min-w-0 break-words' }, value));
  }
  function p(text) { return h(D.Typography, { element: 'p', textStyle: 'body16', textColor: 'body', className: 'm-0 break-words' }, text); }
  function b(text) { return h('span', { className: 'font-medium text-ink-primary' }, text); }

  IK.WsEmail = function WsEmail(o) {
    var w = o.ws, from = o.from, inv = o.kind !== 'renewal';
    var subject = inv ? from.name + ' invited you to ' + w.name + ' on Insightis' : from.name + ' asked you to renew ' + w.name;
    var body = inv ? [
      p(h(IK.Fragment, null, b(from.name), ' (' + from.email + ') invited you to ', b(w.name),
        ' — a workspace where they share connections, metrics and files you can use in your own chats.')),
      p(h(IK.Fragment, null, 'Sign in or create an account with ', b(o.to), ' to accept.'))
    ] : [
      p(h(IK.Fragment, null, b(from.name), ' (' + from.email + ') is a member of ', b(w.name), ' and asked you to renew it.')),
      p('Your plan no longer includes Workspaces, so its members can’t use what you shared there. Nothing was deleted — upgrade to Pro and they get access back within 30 minutes.')
    ];
    return h(D.Card, { variant: 'outline', className: 'flex w-full max-w-2xl flex-col overflow-hidden p-0' },
      h('div', { className: 'flex flex-col gap-1 border-b border-stroke px-6 py-4' },
        line('From', 'Insightis'),
        line('To', o.to),
        line('Subject', h('span', { className: 'font-medium text-ink-primary' }, subject))),
      h('div', { className: 'flex flex-col gap-6 px-6 py-8 sm:px-10' },
        h(IK.Logo, { height: 24, label: 'Insightis' }),
        h('div', { className: 'flex items-center gap-3' },
          h(D.Avatar, { size: 'md', className: 'shrink-0' }, h(D.AvatarFallback, { rounded: 'full', className: 'font-semibold' }, from.initial)),
          h(D.Typography, { element: 'h1', textStyle: 'title20', textColor: 'primary', className: 'm-0 min-w-0 break-words' },
            inv ? 'Join ' + w.name : w.name + ' is unavailable to its members')),
        h.apply(null, ['div', { className: 'flex flex-col gap-4' }].concat(body)),
        h('div', null, h(D.Button, { variant: 'primary', size: 'md', type: 'button' }, inv ? 'Accept Invitation' : 'Upgrade Plan')),
        h(D.Typography, { element: 'p', textStyle: 'body12', textColor: 'secondary', className: 'm-0 break-words' },
          inv ? 'This invitation expires on ' + IK.wsFmtDate(o.expires) + '. If you didn’t expect it, you can ignore this email.'
              : 'You’re receiving this because you own ' + w.name + ' on Insightis.')));
  };
})();
