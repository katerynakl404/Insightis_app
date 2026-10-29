(function () {
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;
  /* A section body as the window draws it: card surface, 20px padding. */
  function Body(p) { return h('div', { className: 'flex w-full flex-col rounded-lg border border-stroke bg-surface-card p-5' }, p.children, h(D.Toaster)); }
  IK.story('AcctApps', { title: 'List', wide: true,
    description: 'The window’s own section rows (My account): the assistant’s real logo, its name, “Connected <date>” and its access (AppScopes badges); Revoke Access always shown on the right (Button destructiveOutline sm, as Delete Account) → ConfirmationDialog, destructive, with its ✕.',
    render: function () { return h(Body, null, h(IK.AcctApps, { state: 'list', locked: false })); } });
  IK.story('AcctApps', { title: 'Revoke fails once', wide: true,
    description: 'The first call fails: the dialog stays open with an error Alert, the confirm button reads Try Again; the retry goes through, the row leaves and a toast confirms.',
    render: function () { return h(Body, null, h(IK.AcctApps, { state: 'list', locked: false, revokeFails: true })); } });
  IK.story('AcctApps', { title: 'Loading', wide: true,
    render: function () { return h(Body, null, h(IK.AcctApps, { state: 'loading', locked: false })); } });
  IK.story('AcctApps', { title: 'Empty', wide: true,
    description: 'The Workspaces intro’s head without its steps (IK.WsIntro): the glow, “Use Insightis from your AI assistant”, one line on what it does, How to Connect → the docs page (AIINS-1779, no URL yet).',
    render: function () { return h(Body, null, h(IK.AcctApps, { state: 'empty', locked: false })); } });
  IK.story('AcctApps', { title: 'Load failed', wide: true,
    render: function () { return h(Body, null, h(IK.AcctApps, { state: 'error', locked: false, onRetry: function () {} })); } });
  IK.story('AcctApps', { title: 'Plan without Authorized apps — apps connected', wide: true,
    description: 'The plan notice Connections and Metrics show when a subscription ends (Alert warning md, the wallet, Upgrade to Pro → the upgrade popover, ✕ dismisses it); each name wears the padlock (a tooltip, nothing to click). Revoke still works.',
    render: function () { return h(Body, null, h(IK.AcctApps, { state: 'list', locked: true, onUpgrade: function () {} })); } });
  IK.story('AcctApps', { title: 'Plan without Authorized apps — none yet', wide: true,
    description: 'The empty state about what Pro opens: Upgrade to Pro + How to Connect (the docs are open on every plan).',
    render: function () { return h(Body, null, h(IK.AcctApps, { state: 'empty', locked: true })); } });
})();
