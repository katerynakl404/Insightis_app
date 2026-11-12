/* AcctApps — Settings → Authorized apps (AIINS-1778): the AI assistants that can reach the account, and the way to
   take that access back. A section of IK.AcctModal (the nav row comes with its `apps` prop). Built from existing
   parts only, the window's own section recipe (user, 2026-10-29: "подібніше до" My account / Current plan):

     intro    Body/14 secondary: who is listed, that revoking is immediate
     rows     one IK.AcctSection per app, hairlines between, as My account's "Delete my account": three columns —
              the assistant's real logo (IK.ConnectorMark sm, 32px — the button's height) · Title/14 name
              over Body/12 secondary "Connected <date>", no gap between them (the name leads; the date is its meta, as the email under a member's name), and under them its access (IK.AppScopes badges) · Revoke Access, always
              shown — DevartUI Button destructiveOutline sm, the Delete Account button (one action is never hidden
              behind a ⋮). Logo and button are centred on the name + date lines; the badges wrap inside the middle
              column, so nothing sits under the button (user, 2026-10-29). Below 640px that column is too narrow for a
              badge: the badges run under the whole head instead, the row's full width (the brief's phone row).
     Revoke   DevartUI ConfirmationDialog, destructive, with its ✕: Revoke Access → in flight (the button's spinner) → the row
              leaves only once the server confirms, then a success toast. A failed call keeps the dialog open with
              an error Alert inside it and the confirm button reading Try Again; the retry goes through.
     states   loading  — the intro over skeleton rows (Skeleton `pulse`: the default brand shimmer reads badly on
                         small bars — user, 2026-10-29)
              empty    — the Workspaces intro's head (IK.WsIntro, no steps): the glow, "Use Insightis from your AI
                         assistant", what it gives, How to Connect (primary, round); no intro line above it
              error    — StatusView error with Try Again; the assistants keep the access they had
     plan     the account's plan has no Authorized apps (`locked`, default: Free — IK.usePlan):
              with apps — the plan notice Connections and Metrics show when a subscription ends (DevartUI Alert
                          warning md, the wallet on its plate, "…nothing was removed" + an Upgrade to Pro link that
                          opens the upgrade popover, a ✕ to dismiss it — then the intro comes back; the button + no ✕
                          version was tried and reverted, user 2026-10-29), and each name wears the padlock — a
                          mark that opens the "Authorized apps" upgrade popover on hover, nothing on click (user,
                          2026-10-29); Revoke still works — taking access away is never gated
              none      — the same head with Upgrade to Pro beside How to Connect and "Available on the Pro plan"
                          under them, as the Workspaces intro on Free (the docs stay open on every plan)

   h(IK.AcctApps, {
     state: 'list' | 'loading' | 'empty' | 'error',
     apps: IK.ACCT_APPS,            // [{ name, scopes: [IK.APP_SCOPES keys], grantedAt }]
     locked,                        // default IK.usePlan()[0] === 'free'
     revokeFails: false,            // review: the first revoke call fails
     onUpgrade, onRetry, guideHref
   }) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* lucide 0.562.0: cloud-off (the brief's load-failed glyph), circle-alert (the revoke error) */
  IK.defineIcons({
    'apps-alert': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    'apps-x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'apps-cloud-off': '<path d="m2 2 20 20"/><path d="M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193"/><path d="M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07"/>'
  });

  /* GET /api/account/applications: a name and the three MCP scopes (offline_access never comes back) */
  IK.ACCT_APPS = [
    { name: 'Claude', scopes: ['connections:query', 'metrics:read', 'metrics:manage'], grantedAt: 'Oct 18, 2026' },
    { name: 'ChatGPT', scopes: ['connections:query', 'metrics:read'], grantedAt: 'Oct 21, 2026' }
  ];
  var SAVE_MS = 1300;

  function Intro() {
    return h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' },
      'Assistants that can reach your Insightis account. Revoking access takes effect immediately.');
  }

  /* a row: logo · the two text lines (+ what goes under them) · the button. Name (20) and date (16) sit tight — 36px
     (a 4px gap between them looked too loose: user, 2026-10-29); the 32px logo (40 read too big) and the 32px button
     sit 2px down, centred on them. Narrow (a phone): the head is one centred line and `below` runs under it
     at the row's full width */
  function Row(p) {
    if (p.narrow) return h(IK.Fragment, null,
      h('div', { className: 'flex items-center gap-3' }, p.mark, h('div', { className: 'flex min-w-0 flex-1 flex-col' }, p.children), p.action || null),
      /* the badges take the row's whole width under the head, from its left edge — under the logo too (user,
         2026-10-29: "мобайл мав краще перебудовуватись", the brief's own phone row) */
      h('div', { className: 'min-w-0' }, p.below));
    return h('div', { className: 'flex items-start gap-3' },
      h('span', { className: 'mt-0.5 flex flex-none' }, p.mark),
      h('div', { className: 'flex min-w-0 flex-1 flex-col gap-3' }, h('div', { className: 'flex min-w-0 flex-col' }, p.children), p.below),
      p.action ? h('span', { className: 'mt-0.5 flex flex-none' }, p.action) : null);
  }

  /* rows only — the caller's wrapper holds the intro first, so the first row keeps its 20px over it */
  function skeletonRows(narrow) {
    return [0, 1].map(function (i) {
      return h(IK.AcctSection, { key: i },
        h(Row, { narrow: narrow, mark: h(D.Skeleton, { animation: 'pulse', className: 'size-8 shrink-0' }),
          below: h(D.Skeleton, { animation: 'pulse', className: 'h-5 w-full max-w-72' }) },
          h(D.Skeleton, { animation: 'pulse', className: 'mt-0.5 h-4 w-20' }),
          h(D.Skeleton, { animation: 'pulse', className: 'mt-0.5 h-3 w-28' })));
    });
  }

  function Guide(p) {
    return h(D.Button, { asChild: true, variant: p.variant || 'secondary', size: 'md', rounded: 'full' },
      h('a', { href: p.href || '#', target: p.href ? '_blank' : undefined, rel: p.href ? 'noopener' : undefined,
        /* the docs page (AIINS-1779) has no URL yet */
        onClick: p.href ? undefined : function (e) { e.preventDefault(); } }, 'How to Connect'));
  }

  IK.AcctApps = function AcctApps(p) {
    var plan = IK.usePlan()[0];
    var locked = p.locked != null ? !!p.locked : plan === 'free';
    var narrow = D.useMaxWidth(640);
    var rs = R.useState(function () { return (p.apps || IK.ACCT_APPS).slice(); }), rows = rs[0], setRows = rs[1];
    var ts = R.useState(null), target = ts[0], setTarget = ts[1];
    var bs = R.useState(false), busy = bs[0], setBusy = bs[1];
    var fs = R.useState(false), failed = fs[0], setFailed = fs[1];
    var ns = R.useState(false), noticeOff = ns[0], setNoticeOff = ns[1];
    var timer = R.useRef(0);
    R.useEffect(function () { return function () { clearTimeout(timer.current); }; }, []);

    function closeDialog() { setTarget(null); setFailed(false); }
    function revoke() {
      var app = target;
      setBusy(true);
      timer.current = setTimeout(function () {
        setBusy(false);
        if (p.revokeFails && !failed) { setFailed(true); return; }
        setRows(function (cur) { return cur.filter(function (a) { return a.name !== app.name; }); });
        closeDialog();
        D.toast.success(app.name + '’s access was revoked');
      }, SAVE_MS);
    }

    var dialog = h(D.ConfirmationDialog, {
      open: !!target, onOpenChange: function (v) { if (!v) closeDialog(); },
      title: target ? 'Revoke ' + target.name + '’s access?' : '',
      description: target ? target.name + ' loses access to your Insightis account immediately, and its next request is refused. To use it again, connect it from ' + target.name + '.' : '',
      bodySlot: failed && target ? h('div', { className: 'mt-3' },
        h(D.Alert, { variant: 'error', size: 'md', role: 'alert', icon: h(IK.Icon, { name: 'apps-alert' }),
          title: 'Couldn’t revoke access', description: target.name + ' still has access. Check your connection and try again.' })) : null,
      cancelLabel: 'Cancel', confirmLabel: failed ? 'Try Again' : 'Revoke Access', variant: 'destructive',
      isCloseButtonVisible: true, isLoading: busy, onConfirm: revoke
    });

    if (p.state === 'loading') return h('div', { 'aria-busy': 'true' }, h(Intro), skeletonRows(narrow));
    if (p.state === 'error') return h(D.StatusView, {
      size: 'lg', surface: 'embedded', tone: 'error', icon: h(IK.Icon, { name: 'apps-cloud-off' }),
      title: 'Couldn’t load authorized apps', description: 'Your assistants still have the access they had. Try again in a moment',
      onRetry: p.onRetry, retryLabel: 'Try Again'
    });
    /* none yet: the Workspaces intro's head, about this module (user, 2026-10-29: "як тут") */
    if (p.state === 'empty' || !rows.length) return h(IK.Fragment, null,
      h(IK.WsIntro, {
        steps: false, note: locked ? 'Available on the Pro plan' : null,
        title: ['Use Insightis from ', h(IK.ChatKeyword, { key: 'k' }, 'your AI assistant')],
        lead: 'Connect Claude, ChatGPT or another assistant to query your data and work with your metrics where you already work',
        action: locked
          ? h('div', { className: 'flex flex-wrap justify-center gap-3' },
              h(Guide, { href: p.guideHref }),
              h(D.Button, { variant: 'primary', size: 'md', rounded: 'full', type: 'button', onClick: p.onUpgrade || IK.goUpgrade }, 'Upgrade to Pro'))
          : h(Guide, { variant: 'primary', href: p.guideHref })
      }), dialog);

    function row(a) {
      return h(IK.AcctSection, { key: a.name },
        h(Row, {
          narrow: narrow,
          mark: h(IK.ConnectorMark, { connector: a.name, size: 'sm', label: a.name + ' logo' }),
          action: h(D.Button, { variant: 'destructiveOutline', size: 'sm', className: 'flex-none', onClick: function () { setTarget(a); } }, 'Revoke Access'),
          below: h(IK.AppScopes, { look: 'badges', scopes: a.scopes, label: 'Access granted to ' + a.name })
        },
          h('div', { className: 'flex min-w-0 items-center gap-1.5' },
            h(D.Typography, { element: 'span', textStyle: 'title14', textColor: 'primary', className: 'min-w-0 truncate' }, a.name),
            /* the plan has no Authorized apps: the padlock says why the app can't reach the account. It answers the way
               every lock does — the "Authorized apps" upgrade popover (user, 2026-10-29: "це ж не той тултіп") — but on
               hover only: a mark, not a control, so no pointer and nothing on click ("чому клікабельне коли працює на
               ховер"). IK.Locked's engine, its hover handlers alone. */
            locked ? h(IK.Locked, { feature: 'assistants', locked: true, onUpgrade: p.onUpgrade }, function (lock) {
              return h('span', { ref: lock.props.ref, onPointerEnter: lock.props.onPointerEnter, onPointerLeave: lock.props.onPointerLeave,
                className: 'inline-flex text-ink-secondary', role: 'img', 'aria-label': a.name + ' is paused: available on Pro' }, h(IK.LockGlyph));
            }) : null),
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Connected ' + a.grantedAt)));
    }

    return h('div', null,
      locked && !noticeOff
        /* the plan notice of Connections and Metrics, word for word in its shape: a subscription, not a fault */
        ? h(D.Alert, {
            variant: 'warning', size: 'md', role: 'note', actionsClassName: 'max-sm:w-auto',
            illustration: h(IK.Icon, { name: 'wallet', size: 20 }),
            title: 'Your subscription ended, so these assistants can’t reach your account',
            description: h(IK.Fragment, null, 'They stay connected and nothing was removed. ',
              h(IK.Locked, { feature: 'assistants', clickOnly: true, marker: 'none', locked: true, onUpgrade: p.onUpgrade },
                h(D.LinkButton, { href: '#', onClick: function (e) { e.preventDefault(); } }, 'Upgrade to Pro')),
              ' to switch them back on.'),
            actions: h(IK.Tip, { tip: 'Dismiss' },
              h(D.IconButton, { variant: 'tertiary', size: '2xs', 'aria-label': 'Dismiss', onClick: function () { setNoticeOff(true); } },
                h(IK.Icon, { name: 'apps-x' })))
          })
        : h(Intro),
      rows.map(row),
      dialog);
  };
})();
