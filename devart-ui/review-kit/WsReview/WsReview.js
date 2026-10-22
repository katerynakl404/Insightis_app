/* WsReview — the shared-workspaces review switches (rules: pages/approved/workspace.rules.md). Not product.
   The feature is ON on every approved page (user, 2026-10-19: the Off/On switch was noise); ?ws=0 turns it off
   by address, and the page then renders exactly as approved. Every switch lives in the URL, so a link opens any
   state.

   The switches are INDEPENDENT and LIVE (user, 2026-10-19): flipping one changes only what it names,
   with no reload, and nothing made on the way is lost — the store keeps one world per Data state,
   and the rest are views over it. The set and its order stay put. One person, one world: they own
   some workspaces and were invited to others — the role is each workspace's; Role only picks which opens.

   RK.useWsQuery() → { on, others, names, trial, data, intro, w, share: 'owner', owner } — re-renders the page
                   when a switch moves (RK.wsQuery() reads it once)
   RK.setWs(patch) → URL keys (ws, wothers, trial, wdata, wintro, wowner, w, tab …): null clears; the URL follows
                   (replaceState), every useWsQuery re-renders
   RK.wsStore(q)   → the options IK.useWorkspaces takes
   RK.wsOwnsPlan(q) → true while the feature is on: this kit's Plan switch (Paid · Trial · Free)
                   replaces the page's own, so the page passes plan: false
   RK.workspaceControls({ here, ws, w }) → ReviewBar controls, in this order (the ReviewBar adds Theme):
     Plan        not on emails: Paid · Trial · Free — the person's own plan: Free also Blocks their OWN workspaces
                 (the brief: status follows the Owner's plan); Trial = paid with the trial running
     Role        an opened workspace: Owner · Member — opens the first of one's own / the first one they were
                 invited to (user, 2026-10-19: "немає перемикача чи це власник воркспейсу чи мембер"); the tab stays
     Invited     not on emails, nor on one's own workspace: Active · Blocked — the plan of the people who invited
                 them (Olena's and Mark's lapse together, so the notices meet several owners).
     Data        the Workspaces list and a workspace: Filled · Many (every list past one page: Load more) · Empty — what
                 the page shows, empty: the list without a workspace; a workspace with nothing in it (each tab's empty state)
     Owner       the chat only: Hidden · Shown — the shared row's caption "Olena Petrenko · Marketing"
     Reset Data  a button: back to the sample data (IK.wsResetData); the page reloads with its switches
   Gone: Workspaces (on/off), Shared (Tag · Tabs · Owner — Owner is the one way, 2026-10-20), Overview (Grid is
   the one layout), Names (the sample mixes long and typical names), Invitation (no invitation banner, 2026-10-20).
   here: 'data-sources' | 'files' | 'metrics' | 'chat' | 'account' | 'workspaces' | 'workspace' | 'emails' */
(function () {
  'use strict';
  var IK = window.InsightisKit, RK = window.ReviewKit, R = window.React, D = window.DevartUI, h = IK.h;

  var subs = [];

  function read() {
    var q = new URLSearchParams(location.search);
    return {
      /* the feature is always on in this branch (user, 2026-10-19: the Off/On switch was noise); ?ws=0 still turns it off */
      on: q.get('ws') !== '0',
      others: q.get('wothers') === 'blocked' ? 'blocked' : 'active',
      names: q.get('names') || 'typical',
      trial: q.get('trial') === '1',
      data: q.get('wdata') || 'filled',
      /* the look of the list before the first workspace (IK.WsIntro) — variants to choose from (user, 2026-10-23) */
      intro: q.get('wintro') || 'cards',
      w: q.get('w') || '',
      /* Owner is the one way (user, 2026-10-20: Tag removed; Tabs turned down — "від таб відмовились") */
      share: 'owner',
      owner: q.get('wowner') === '1'
    };
  }
  RK.wsQuery = read;
  RK.setWs = function (patch) {
    var u = new URL(location.href);
    Object.keys(patch).forEach(function (k) { if (patch[k] == null) u.searchParams.delete(k); else u.searchParams.set(k, patch[k]); });
    history.replaceState(null, '', u);
    var v = read();
    subs.slice().forEach(function (fn) { fn(v); });
  };
  RK.useWsQuery = function () {
    var s = R.useState(read), set = s[1];
    R.useEffect(function () {
      subs.push(set);
      return function () { subs = subs.filter(function (f) { return f !== set; }); };
    }, []);
    return s[0];
  };
  RK.wsStore = function (q) { return { others: q.others, names: q.names, data: q.data }; };
  RK.wsOwnsPlan = function (q) { return !!q.on; };

  RK.workspaceControls = function (o) {
    var q = read(), here = o.here, out = [];
    if (!q.on) return out;
    var plan = IK.getPlan();
    /* the emails don't change with the person's plan */
    if (here !== 'emails') out.push({
      label: 'Plan', showLabel: true, value: q.trial && plan === 'paid' ? 'trial' : plan,
      options: [{ value: 'paid', label: 'Paid' }, { value: 'trial', label: 'Trial' }, { value: 'free', label: 'Free' }],
      onChange: function (v) { IK.setPlan(v === 'free' ? 'free' : 'paid'); RK.setWs({ trial: v === 'trial' ? '1' : null }); }
    });
    /* an opened workspace: who sees it — Owner opens the first of one's own, Member the first one is invited to
       (user, 2026-10-19: "немає перемикача чи це власник воркспейсу чи мембер"); the tab stays */
    var mine = here === 'workspace' && o.w && o.w.role === 'owner';
    if (here === 'workspace' && o.ws) out.push({
      label: 'Role', showLabel: true, value: mine ? 'owner' : 'member',
      options: [{ value: 'owner', label: 'Owner', disabled: !o.ws.owned.length }, { value: 'member', label: 'Member', disabled: !o.ws.shared.length }],
      onChange: function (v) { var t = v === 'owner' ? o.ws.owned[0] : o.ws.shared[0]; if (t) RK.setWs({ w: t.id }); }
    });
    /* Invited: the plan of the people who invited the person — nothing on one's own workspace */
    if (here !== 'emails' && !mine) out.push({
      label: 'Invited', showLabel: true, value: q.others,
      options: [{ value: 'active', label: 'Active' }, { value: 'blocked', label: 'Blocked' }],
      onChange: function (v) { RK.setWs({ wothers: v === 'active' ? null : v }); }
    });
    /* Data acts on the Workspaces page only for now; No workspaces is a list state (an opened
       workspace can't have none) */
    if (here === 'workspaces' || here === 'workspace') out.push({
      /* Empty is what this page shows, empty (user, 2026-10-23: 'як цей стан міг назватись емпті?'): on the list, no workspace
         at all (wdata=none); on a workspace, nothing in it (wdata=empty) — the list has no 'workspaces with nothing in them' */
      label: 'Data', showLabel: true,
      value: here === 'workspaces' ? (q.data === 'none' ? 'empty' : q.data === 'empty' ? 'filled' : q.data) : (q.data === 'none' ? 'empty' : q.data),
      options: [{ value: 'filled', label: 'Filled' }, { value: 'many', label: 'Many' }, { value: 'empty', label: 'Empty' }],
      onChange: function (v) { RK.setWs({ wdata: v === 'filled' ? null : v === 'empty' && here === 'workspaces' ? 'none' : v }); }
    });
    /* Intro — only where it acts: the list with no workspace */
    if (here === 'workspaces' && q.data === 'none') out.push({
      label: 'Intro', showLabel: true, value: q.intro,
      options: [{ value: 'cards', label: 'Cards' }, { value: 'path', label: 'Path' }, { value: 'orbit', label: 'Orbit' }],
      onChange: function (v) { RK.setWs({ wintro: v === 'cards' ? null : v }); }
    });
    /* no Shared switch: Owner is the one way (user, 2026-10-20: Tag removed, Tabs turned down) — the people glyph
       after a shared item's name and one Owner filter, on the lists; a switch with one option is none */
    /* Owner — who shared it (the brief: "who shared it and from which workspace, everywhere"), as its own switch:
       on the chat row only — everywhere else the glyph's tooltip names them */
    if (here === 'chat') out.push({
      label: 'Owner', showLabel: true, value: q.owner ? 'shown' : 'hidden',
      options: [{ value: 'hidden', label: 'Hidden' }, { value: 'shown', label: 'Shown' }],
      onChange: function (v) { RK.setWs({ wowner: v === 'shown' ? '1' : null }); }
    });
    /* no Overview switch: Grid is the one layout (user, 2026-10-19: "лиши грід") */
    /* no Names switch (user, 2026-10-19): the sample data already mixes long names with typical ones */
    /* Reset Data (user, 2026-10-19: 'має бути опція ресет дані'): back to the sample — what was created,
       renamed, deleted or left on any page goes; the page reloads with the switches it has */
    out.push({ label: 'Reset data', node: h(D.Button, { variant: 'tertiary', size: 'xs', type: 'button', className: 'shrink-0',
      onClick: function () { IK.wsResetData(); location.reload(); } }, 'Reset Data') });
    /* no Invitation switch: no invitation banner anywhere (user, 2026-10-20: "банер запрошення ніде не треба") —
       the invitation is the email (approved/workspace-emails.html) */
    return out;
  };
})();
