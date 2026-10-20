/* WsReview — the shared-workspaces review switches. Not product: the feature is OFF on every
   approved page until a reviewer turns it on here, so those pages stay exactly as approved; every
   switch lives in the URL, so a link opens any state (rules: pages/concept/workspace.rules.md).

   The switches are INDEPENDENT and LIVE (user, 2026-10-19): flipping one changes only what it names,
   with no reload, and nothing made on the way is lost — the store keeps one world per Data state,
   and the rest are views over it. The set and its order stay put. One person, one world: they own
   some workspaces and were invited to others, so there is no Owner / Member switch — the role is
   each workspace's.

   RK.useWsQuery() → { on, others, names, trial, invite, data, w, share, owner } — re-renders the page when a switch
                   moves (RK.wsQuery() reads it once)
   RK.setWs(patch) → { ws, wothers, names, trial, invite, wdata, w }: null clears; the URL follows
                   (replaceState), every useWsQuery re-renders
   RK.wsStore(q)   → the options IK.useWorkspaces takes
   RK.wsOwnsPlan(q) → true while the feature is on: this kit's Plan switch (Paid · Trial · Free)
                   replaces the page's own, so the page passes plan: false
   RK.workspaceControls({ here }) → ReviewBar controls, in this order:
     Workspaces  no switch: the feature is always on (user, 2026-10-19); ?ws=0 turns it off by address
     Plan        not on emails: Paid · Trial · Free — the person's own plan: Free also Blocks their OWN workspaces
                 (the brief: status follows the Owner's plan); Trial = paid with the trial running
     Invited     Active · Blocked — the plan of the people who invited them (Olena's Marketing
                 lapses; Mark's Finance stays Active). Blocked → Active, and Free → Paid, show the
                 "available again" confirmation: the brief's Restored is that moment
     Data        the Workspaces page: Filled · Many (every list past one page: Load more) · Empty (the
                 workspaces have nothing in them — each tab's empty state) · No workspaces (list only)
     Shared      Data Sources, Metrics, Files, the Workspaces list and page: Tag (in the one list, Shared as
                 a type/tag) · Tabs (a Shared tab) · Owner (the sharer's avatar after the name + an Owner filter)
     Owner       Data Sources, Metrics, Files, Chat: Hidden · Shown — an Owner column (You / who
                 shared it), the metric group's and the chat row's caption "Olena Petrenko · Marketing"
     Overview    an opened workspace: Row (three tiles, Members + Connections lists) · Grid (four
                 tiles two by two, the Connections list beside them)
     Names       Typical · Long
     (no Invitation switch — no invitation banner anywhere, 2026-10-20)
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
      invite: q.get('invite') || 'off',
      data: q.get('wdata') || 'filled',
      w: q.get('w') || '',
      /* Owner is the concept (user, 2026-10-20: Tag removed); Tabs stays to compare */
      /* Tabs were turned down (user, 2026-10-20: "від таб відмовились"): Owner is the one way */
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
      label: 'Data', showLabel: true, value: q.data === 'none' && here === 'workspace' ? 'empty' : q.data,
      options: [{ value: 'filled', label: 'Filled' }, { value: 'many', label: 'Many' }, { value: 'empty', label: 'Empty' }]
        .concat(here === 'workspaces' ? [{ value: 'none', label: 'No workspaces' }] : []),
      onChange: function (v) { RK.setWs({ wdata: v === 'filled' ? null : v }); }
    });
    /* where what is shared with the person shows, to compare (user, 2026-10-19): Tag — in the one list, Shared
       as a type/tag · Tabs — a Shared tab of its own · Owner — the third way: the sharer's avatar after the name
       and one Owner filter (an additional option, not a replacement) */
    /* inside a workspace there is no Shared tab to split off: Tag and Owner only, and only on an invited
       workspace's Connections, Metrics and Files — what is in one's own isn't shared with the person */
    /* Owner (the people glyph + the Owner filter) or Tabs (a Shared tab), on the lists only: inside a workspace
       everything is its Owner's, so there is nothing to tell apart (user, 2026-10-20: Tag removed) */
    /* no Shared switch: with Tabs turned down (2026-10-20) Owner is the only way — a switch with one option is none */
    /* who shared it (the brief: "who shared it and from which workspace, everywhere"), as its own
       switch — the workspaces show either way (user, 2026-10-19) */
    /* Tag: who shared it is in the Shared tag's tooltip, so the switch acts only on a Shared tab (Tabs) and
       the chat row (user, 2026-10-19) */
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
       the invitation is the email (concept/workspace-emails.html) */
    return out;
  };
})();
