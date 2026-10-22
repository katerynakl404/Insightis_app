/* WsDialogs — the dialogs of shared workspaces (rules: pages/approved/workspace.rules.md). DevartUI
   Modal for every shell (ModalContent / ModalHeader + ModalTitle / ModalFooter, its own ✕, Esc and
   scrim close), the composition of the AI connectivity workspaces prototype where it fits.

   IK.WsCreateDialog — "Create workspace" (md): Workspace name, Description (optional — what it is used for,
     DevartUI TextArea, 500 characters with a counter; user, 2026-10-19), Cancel · Create. Enter in the name
     submits. An empty name or one the person already uses for a workspace is refused under the field
     (InputGroup errorText); after a refusal the field re-checks as they type. Names stop at IK.WS_NAME_MAX.
     { open, onOpenChange, taken: function (name) → bool, onCreate: function (name, description) {} }

   IK.WsEditDialog — the same dialog, "Edit workspace": the name and the description, Save (user, 2026-10-21: "едіт мав міняти і текст і опис", "едіт а не ренейм").
     { open, onOpenChange, name, desc, taken, onSave: function (name, description) {} }

   IK.WsInviteDialog — "Invite members" (sm): one email, no role picker (everyone invited is a
     Member). Refused under the field: not an email, already a member, already invited.
     { open, onOpenChange, ws, check: function (email) → null | 'member' | 'invited', onInvite }

   Pickers — the AI connectivity prototype's picker dialogs as they are: a title and a sentence under
   it, SearchField sm (focused on open), IK.PickRow rows (checkbox on the name's line, description
   under it), Cancel · the counted action; what is already there is not offered.
   IK.WsAddConnectionsDialog — "Add connections" / "Link connections to <ws>": rows = the name the
     person gave it, "Salesforce · 12 metrics · Shared in Support" (no new login). When the picks carry
     metrics, one line under the list says they go with them — no second step (user, 2026-10-20).
     Add Connection / Add N Connections.
     { open, onOpenChange, ws, connections, where: function (connId) → [names], onAdd(conns) }
   IK.WsShareFilesDialog — "Share files" / "Share files with <ws>": the person's own files not there
     yet ("CSV · 2.4 MB · Artifact"), Add File / Add N Files (the workspace page's "Add Files").
     { open, onOpenChange, ws, files, onShare(files) }
   IK.WsShareFileDialog — "Share <file>": every workspace of the person's, the ones it is in already ticked —
     untick to take it out, so sharing is managed in one place (user, 2026-10-20); several files: only the
     workspaces missing one of them, add only. A Blocked one disabled, the reason under it. + Create Workspace
     at the footer's leading edge (an in-dialog step with Back; the new one comes back ticked). The action
     only adds: the ones it is in are ticked and disabled ("Already in it"); Add to Workspace / Add to N Workspaces.
     { open, onOpenChange, file | files: [several], workspaces, onShare(addIds, removeIds), onCreate(name) → id, taken(name), createLocked }

   IK.WsAddToWorkspacesDialog — the same picker for a connection (its ⋮ on Data Sources, Connection Details):
     "Share <label>", every workspace, the ones it is in ticked (untick to take it out); when it carries
     metrics and goes somewhere new, one line under the list says they come with it — no second step
     (user, 2026-10-20). The same action labels as the file's.
     { open, onOpenChange, connection: { id, name, label, metrics }, workspaces, onAdd(addIds, removeIds), onCreate(name) → id, taken(name), createLocked }

   IK.WsConfirmDialog — a destructive confirm (sm): title, text, Cancel · <confirmLabel>
     (destructive, focused). Remove member, Revoke invitation, Remove from workspace, Stop
     sharing, Delete workspace.
     { open, onOpenChange, title, text, confirmLabel, onConfirm }                                  */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* DevartUI's ModalHeader keeps no room for the Modal's own ✕, so a long title (a long workspace
     name) ran under it; 32px at the end of the header clears it — a gap reported for дизайн DevartUI */
  var HEAD = 'pe-8';

  /* a dialog of choice cards opens with the focus on the dialog itself: moving it onto the first card's
     checkbox lit two rings at once (the card's and the box's) before anyone pressed a key */
  function quietFocus(e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.focus) e.currentTarget.focus(); }

  function focusLater(ref) {
    return function (e) { e.preventDefault(); setTimeout(function () { if (ref.current) ref.current.focus(); }, 50); };
  }
  function lead(text) {
    return h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0 break-words' }, text);
  }
  function footer(cancel, main) {
    return h(D.ModalFooter, null,
      h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: cancel }, 'Cancel'), main);
  }

  /* ── Create / Edit ───────────────────────────────────────────────────────────────────────── */
  var DESC_MAX = 500;
  function NameDialog(p) {
    var vs = R.useState(''), val = vs[0], setVal = vs[1];
    var ds = R.useState(''), desc = ds[0], setDesc = ds[1];
    var es = R.useState(null), err = es[0], setErr = es[1];
    var tried = R.useRef(false), ref = R.useRef(null);
    R.useEffect(function () { if (p.open) { setVal(p.name || ''); setDesc(p.desc || ''); setErr(null); tried.current = false; } }, [p.open]);
    function check(v) {
      var n = String(v).trim();
      if (!n) return 'Enter a workspace name';
      if (n.toLowerCase() !== String(p.name || '').trim().toLowerCase() && p.taken && p.taken(n)) return 'You already have a workspace with this name';
      return null;
    }
    function submit(e) {
      if (e) e.preventDefault();
      tried.current = true;
      var problem = check(val);
      setErr(problem);
      if (problem) { if (ref.current) ref.current.focus(); return; }
      p.onDone(String(val).trim().replace(/\s+/g, ' '), String(desc).trim());
    }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'md', onOpenAutoFocus: focusLater(ref) },
        h('form', { className: 'contents', noValidate: true, onSubmit: submit },
          h(D.ModalHeader, { className: HEAD }, h(D.ModalTitle, null, p.title)),
          h('div', { className: 'flex flex-col gap-4' },
            p.lead ? lead(p.lead) : null,
            h(D.InputGroup, { label: 'Workspace name', inputId: 'ik-ws-name', isInvalid: !!err, errorText: err || undefined },
              h(D.InputGroupInput, {
                id: 'ik-ws-name', ref: ref, value: val, placeholder: 'e.g. Sales', autoComplete: 'off', maxLength: IK.WS_NAME_MAX,
                'aria-invalid': err ? 'true' : undefined,
                onChange: function (e) { setVal(e.target.value); if (tried.current) setErr(check(e.target.value)); }
              })),
            /* what it is used for (user, 2026-10-19): optional, DevartUI TextArea with its counter */
            p.withDesc ? h(D.TextArea, {
              id: 'ik-ws-desc', rows: 3, maxLength: DESC_MAX, showCount: true, value: desc,
              label: h(IK.Fragment, null, 'Description', h('span', { className: 'font-normal text-ink-secondary' }, ' (optional)')),
              placeholder: 'What is this workspace used for?',
              onChange: function (e) { setDesc(e.target.value); }
            }) : null),
          footer(function () { p.onOpenChange(false); },
            h(D.Button, { variant: 'primary', size: 'sm', type: 'submit' }, p.action)))));
  }

  IK.WsCreateDialog = function WsCreateDialog(p) {
    return h(NameDialog, {
      open: p.open, onOpenChange: p.onOpenChange, taken: p.taken, name: '',
      title: 'Create workspace', action: 'Create', withDesc: true,
      lead: 'Add connections, metrics and files to it, then invite colleagues by email to use them in their own chats',
      onDone: p.onCreate
    });
  };
  /* the name and the description, both — not a rename (user, 2026-10-21: "едіт мав міняти і текст і опис", "едіт а не ренейм") */
  IK.WsEditDialog = function WsEditDialog(p) {
    return h(NameDialog, {
      open: p.open, onOpenChange: p.onOpenChange, taken: p.taken, name: p.name, desc: p.desc,
      title: 'Edit workspace', action: 'Save', withDesc: true, onDone: p.onSave
    });
  };

  /* ── Invite ─────────────────────────────────────────────────────────────────────────────────── */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  IK.WsInviteDialog = function WsInviteDialog(p) {
    var vs = R.useState(''), val = vs[0], setVal = vs[1];
    var es = R.useState(null), err = es[0], setErr = es[1];
    var tried = R.useRef(false), ref = R.useRef(null);
    R.useEffect(function () { if (p.open) { setVal(''); setErr(null); tried.current = false; } }, [p.open]);
    function check(v) {
      var e = String(v).trim();
      if (!EMAIL.test(e)) return 'Enter a valid email address';
      var hit = p.check ? p.check(e.toLowerCase()) : null;
      if (hit === 'member') return 'This person is already a member';
      if (hit === 'invited') return 'This person is already invited — resend the invitation from the list';
      return null;
    }
    function submit(e) {
      e.preventDefault();
      tried.current = true;
      var problem = check(val);
      setErr(problem);
      if (problem) { if (ref.current) ref.current.focus(); return; }
      p.onInvite(String(val).trim().toLowerCase());
    }
    var w = p.ws || {};
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'sm', onOpenAutoFocus: focusLater(ref) },
        h('form', { className: 'contents', noValidate: true, onSubmit: submit },
          h(D.ModalHeader, { className: HEAD }, h(D.ModalTitle, null, 'Invite members')),
          h('div', { className: 'flex flex-col gap-4' },
            lead(h(IK.Fragment, null, 'They join ', h('span', { className: 'font-medium text-ink-primary' }, w.name),
              ' as members and use what is shared there, read-only. They get an email with a link to join.')),
            h(D.InputGroup, { label: 'Email', inputId: 'ik-ws-email', isInvalid: !!err, errorText: err || undefined },
              h(D.InputGroupInput, {
                id: 'ik-ws-email', ref: ref, type: 'email', value: val, placeholder: 'name@company.com', autoComplete: 'off',
                'aria-invalid': err ? 'true' : undefined,
                onChange: function (e) { setVal(e.target.value); if (tried.current) setErr(check(e.target.value)); }
              }))),
          footer(function () { p.onOpenChange(false); },
            h(D.Button, { variant: 'primary', size: 'sm', type: 'submit' }, 'Send Invitation')))));
  };

  /* ── Pickers ──────────────────────────────────────────────────────────────────────────────────
     The AI connectivity prototype's picker dialogs, as they are (user, 2026-10-19 — "той самий
     елемент, як в конектівіті"): the title + a sentence under it, a search (SearchField sm, focused
     on open), a list of IK.PickRow (the checkbox on the name's line, the description under it),
     then the footer — Cancel · the counted action (disabled until a pick). What is already there
     is not offered. Empty: "Nothing left to …" / "No … matches “q”". */
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function head(title, sub, back) {
    return h(D.ModalHeader, { className: HEAD },
      h('div', { className: 'flex flex-col gap-1' },
        back ? h('div', { className: 'flex min-w-0 items-center gap-1' },
          h(IK.Tip, { tip: 'Back' }, h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Back', onClick: back }, h(IK.Icon, { name: 'chevron-left' }))),
          h(D.ModalTitle, { className: 'break-words' }, title))
          : h(D.ModalTitle, { className: 'break-words' }, title),
        sub ? h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0 break-words' }, sub) : null));
  }
  function search(q, setQ, placeholder) {
    return h(D.SearchField, { size: 'sm', variant: 'outline', autoFocus: true, placeholder: placeholder, 'aria-label': placeholder.replace('…', ''),
      value: q, onValueChange: setQ, onClear: function () { setQ(''); } });
  }
  function matches(q, parts) { q = String(q || '').trim().toLowerCase(); return !q || parts.join(' ').toLowerCase().indexOf(q) >= 0; }
  /* the AI connectivity picker's empty state: StatusView, transparent, the illustration, and the way to
     what is missing as a secondary action */
  function nothing(title, description, action) {
    return h(D.StatusView, { size: 'sm', surface: 'embedded', tone: 'transparent', withIconHalo: false, icon: h(D.EmptyStateIllustration),
      title: title, description: description, actions: action || undefined });
  }
  function toPage(label, icon, rel) {
    return h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', leftSlot: h(IK.Icon, { name: icon }),
      onClick: function () { location.assign(IK.wsHref(rel, { w: null, tab: null, do: null })); } }, label);
  }
  var CATALOG = 'approved/data-sources_connections-landing.html', FILES = 'approved/data-sources_files-landing.html';
  function pickList(rows, label) { return h(IK.PickList, { 'aria-label': label, className: 'max-h-80' }, rows); }
  function toggle(list, id, on) { return on ? list.concat([id]) : list.filter(function (x) { return x !== id; }); }

  /* ── Add connections (their metrics said in one line) ───────────────────────────────────────────────── */
  function addLabel(n) { return n > 1 ? 'Add ' + n + ' Connections' : 'Add Connection'; }

  IK.WsAddConnectionsDialog = function WsAddConnectionsDialog(p) {
    var ps = R.useState([]), picks = ps[0], setPicks = ps[1];
    var qs = R.useState(''), q = qs[0], setQ = qs[1];
    R.useEffect(function () { if (p.open) { setPicks([]); setQ(''); } }, [p.open]);
    var w = p.ws || { connections: [] };
    var inWs = {}; w.connections.forEach(function (c) { inWs[c.id] = true; });
    var offer = (p.connections || []).filter(function (c) { return !inWs[c.id]; });
    var chosen = offer.filter(function (c) { return picks.indexOf(c.id) >= 0; });
    var metrics = chosen.reduce(function (s, c) { return s + (c.metrics || 0); }, 0);
    function close() { p.onOpenChange(false); }
    function add() { p.onAdd(chosen); }
    function next() { if (chosen.length) add(); }
    function sub(c) {
      var also = p.where ? p.where(c.id) : [];
      return [c.name, c.metrics ? plural(c.metrics, 'metric', 'metrics') : null, also.length ? 'Shared in ' + IK.wsJoin(also) : null].filter(Boolean).join(' · ');
    }
    var shown = offer.filter(function (c) { return matches(q, [c.label, c.name]); });

    var body = h('div', { className: 'flex min-h-0 flex-col gap-3' },
      offer.length ? search(q, setQ, 'Search connections…') : null,
      !offer.length ? nothing('Nothing left to add', 'Every connection you have is already in this workspace', toPage('Create Connection', 'connections', CATALOG))
        : !shown.length ? nothing('No connection matches “' + q.trim() + '”', 'Try a different term, or connect a new data source', toPage('Create Connection', 'connections', CATALOG))
        : pickList(shown.map(function (c) {
            return h(IK.PickRow, { key: c.id, checked: picks.indexOf(c.id) >= 0, title: c.label, sub: sub(c),
              onChange: function (on) { setPicks(toggle(picks, c.id, on)); } });
          }), 'Your connections'),
      /* their metrics go with them — said here, not in a second step (user, 2026-10-20) */
      metrics > 0 ? h('div', { className: 'flex items-start gap-2' },
        h(IK.Icon, { name: 'info', size: 14, className: 'mt-0.5 flex-none text-ink-secondary' }),
        h(D.Typography, { element: 'p', textStyle: 'body12', textColor: 'secondary', className: 'm-0' },
          'Their ' + plural(metrics, 'metric', 'metrics') + ' go with them — members can use them in their chats, but can’t edit them')) : null);
    var foot = footer(close, h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: !chosen.length, onClick: next }, addLabel(chosen.length)));
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'md' },
        /* a short title; the workspace's name in the line under it (user, 2026-10-19: the title read too long) */
        head('Add connections', 'Link connections to ' + w.name),
        body, foot));
  };

  /* ── Share files ───────────────────────────────────────────────────────────────────────────── */
  function fileDesc(f) { return [String(f.type || '').toUpperCase(), f.size].filter(Boolean).join(' · '); }
  /* the Files table's origin badge, beside the name */
  function originBadge(f) {
    return f.kind === 'artifact' ? h(D.Badge, { variant: 'primary', size: 'sm' }, 'Artifact') : h(D.Badge, { variant: 'secondary', size: 'sm' }, 'Uploaded');
  }

  /* files → this workspace: the person's own files not shared here yet */
  IK.WsShareFilesDialog = function WsShareFilesDialog(p) {
    var ps = R.useState([]), picks = ps[0], setPicks = ps[1];
    var qs = R.useState(''), q = qs[0], setQ = qs[1];
    R.useEffect(function () { if (p.open) { setPicks([]); setQ(''); } }, [p.open]);
    var w = p.ws || { files: [] };
    var here = {}; w.files.forEach(function (f) { here[f.id] = true; });
    var offer = (p.files || []).filter(function (f) { return !here[f.id]; });
    var chosen = offer.filter(function (f) { return picks.indexOf(f.id) >= 0; });
    var shown = offer.filter(function (f) { return matches(q, [f.name]); });
    function close() { p.onOpenChange(false); }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'md' },
        head('Share files', 'Share files with ' + w.name),
        h('div', { className: 'flex min-h-0 flex-col gap-3' },
          offer.length ? search(q, setQ, 'Search files…') : null,
          !offer.length ? nothing('Nothing left to share', 'Every file you have is already shared here', toPage('Upload Files', 'ds-upload', FILES))
            : !shown.length ? nothing('No file matches “' + q.trim() + '”', 'Try a different term, or upload a new file', toPage('Upload Files', 'ds-upload', FILES))
            : pickList(shown.map(function (f) {
                return h(IK.PickRow, { key: f.id, checked: picks.indexOf(f.id) >= 0, title: f.name, badge: originBadge(f), sub: fileDesc(f),
                  onChange: function (on) { setPicks(toggle(picks, f.id, on)); } });
              }), 'Your files')),
        footer(close, h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: !chosen.length,
          onClick: function () { p.onShare(chosen); } }, chosen.length > 1 ? 'Add ' + chosen.length + ' Files' : 'Add File'))));
  };

  /* one file → the person's workspaces, AI connectivity's "Add workspaces": the workspaces it is not
     in yet (taking one out: a workspace's Files tab ⋮ Remove from Workspace), + Create Workspace at the footer's
     leading edge — an in-dialog create step with Back, the new workspace ticked on return. A Blocked
     workspace can't take it: its row is disabled and says why. */
  /* Adding to workspaces — one picker for a file (or the Files selection) and a connection (user, 2026-10-20:
     "це розраховувалось як екшн додати в воркспейс — а не керувати наявністю в них"): it only ADDS. Every
     workspace is listed; the ones that already have it are ticked and disabled — "Already in it" — and taking
     it out is elsewhere (a workspace's tab ⋮ Remove from Workspace). The button counts what is added: Add to
     Workspace / Add to N Workspaces. + Create Workspace at the footer's leading edge: the same name and
     description as Create workspace (user: "чому створення без опису"), and the new one comes back ticked. */
  function AddToWorkspaces(p) {
    var ps = R.useState([]), picks = ps[0], setPicks = ps[1];
    var qs = R.useState(''), q = qs[0], setQ = qs[1];
    var vs = R.useState('pick'), view = vs[0], setView = vs[1];
    var ns = R.useState(''), name = ns[0], setName = ns[1];
    var ds = R.useState(''), desc = ds[0], setDesc = ds[1];
    var es = R.useState(null), err = es[0], setErr = es[1];
    var fr = R.useState(null), fresh = fr[0], setFresh = fr[1];
    var all = p.workspaces || [];
    R.useEffect(function () { if (p.open) { setPicks([]); setQ(''); setView('pick'); setName(''); setDesc(''); setErr(null); setFresh(null); } }, [p.open]);
    var shown = all.filter(function (w) { return matches(q, [w.name]); });
    var added = all.filter(function (w) { return picks.indexOf(w.id) >= 0 && !p.has(w); });
    function close() { p.onOpenChange(false); }
    function create(e) {
      if (e) e.preventDefault();
      var n = name.trim().replace(/\s+/g, ' ');
      if (!n) { setErr('Enter a workspace name'); return; }
      if (p.taken && p.taken(n)) { setErr('You already have a workspace with this name'); return; }
      var id = p.onCreate(n, desc.trim());
      setPicks(picks.concat([id])); setName(''); setDesc(''); setErr(null); setView('pick'); setQ(''); setFresh(id);
    }
    if (view === 'create') return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'md' },
        h('form', { className: 'contents', noValidate: true, onSubmit: create },
          head('Create workspace', null, function () { setView('pick'); }),
          h('div', { className: 'flex flex-col gap-4' },
            h(D.InputGroup, { label: 'Workspace name', inputId: 'ik-ws-new', isInvalid: !!err, errorText: err || undefined },
              h(D.InputGroupInput, { id: 'ik-ws-new', autoFocus: true, value: name, placeholder: 'e.g. Sales', autoComplete: 'off', maxLength: IK.WS_NAME_MAX,
                onChange: function (e) { setName(e.target.value); if (err) setErr(null); } })),
            h(D.TextArea, {
              id: 'ik-ws-new-desc', rows: 3, maxLength: DESC_MAX, showCount: true, value: desc,
              label: h(IK.Fragment, null, 'Description', h('span', { className: 'font-normal text-ink-secondary' }, ' (optional)')),
              placeholder: 'What is this workspace used for?',
              onChange: function (e) { setDesc(e.target.value); }
            })),
          footer(function () { setView('pick'); }, h(D.Button, { variant: 'primary', size: 'sm', type: 'submit' }, 'Create')))));
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'md' },
        /* what goes with it, under the title (user, 2026-10-20: "чому не під тайтлом") */
        head(p.title, p.subtitle || null),
        h('div', { className: 'flex min-h-0 flex-col gap-3' },
          all.length ? search(q, setQ, 'Search workspaces…') : null,
          !all.length ? nothing('No workspace yet', 'Create one to share with your team')
            : !shown.length ? nothing('No workspace matches “' + q.trim() + '”', 'Try a different term, or create a new workspace')
            : pickList(shown.map(function (w) {
                var blocked = w.status === 'blocked', there = p.has(w);
                return h(IK.PickRow, { key: w.id, reveal: w.id === fresh, checked: there || picks.indexOf(w.id) >= 0, title: w.name, disabled: blocked || there,
                  sub: there ? 'Already in it' : blocked ? 'Unavailable until you upgrade to Pro' : p.sub(w),
                  onChange: function (on) { setPicks(toggle(picks, w.id, on)); } });
              }), 'Your workspaces')),
        h(D.ModalFooter, null,
          p.onCreate ? h(IK.Locked, { feature: 'workspaces', locked: !!p.createLocked, surface: 'modal', tip: 'Available on Pro' },
            h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', className: 'me-auto', leftSlot: h(IK.Icon, { name: 'plus' }),
              onClick: function () { setView('create'); } }, 'Create Workspace')) : null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: close }, 'Cancel'),
          h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: !added.length,
            onClick: function () { p.onAdd(ids(added)); } }, added.length > 1 ? 'Add to ' + added.length + ' Workspaces' : 'Add to Workspace'))));
  }
  function ids(list) { return list.map(function (w) { return w.id; }); }

  /* a file, or several (the Files page's selection) → workspaces; it is "in" one that has every one of them */
  IK.WsShareFileDialog = function WsShareFileDialog(p) {
    var list = p.files || (p.file ? [p.file] : []), f = list[0] || {};
    return h(AddToWorkspaces, { open: p.open, onOpenChange: p.onOpenChange, workspaces: p.workspaces, taken: p.taken, onCreate: p.onCreate, createLocked: p.createLocked,
      title: 'Share ' + (list.length > 1 ? list.length + ' files' : (f.name || 'the file')),
      has: function (w) { return list.every(function (x) { return w.files.some(function (y) { return y.id === x.id; }); }); },
      sub: function (w) { return plural(w.members.length, 'member', 'members') + ' · ' + plural(w.files.length, 'file', 'files'); },
      onAdd: function (added) { p.onShare(added, []); } });
  };

  /* a connection → workspaces; its metrics go with it — said under the list once one is picked */
  IK.WsAddToWorkspacesDialog = function WsAddToWorkspacesDialog(p) {
    var c = p.connection || {};
    return h(AddToWorkspaces, { open: p.open, onOpenChange: p.onOpenChange, workspaces: p.workspaces, taken: p.taken, onCreate: p.onCreate, createLocked: p.createLocked,
      title: 'Share ' + (c.label || 'the connection'),
      has: function (w) { return w.connections.some(function (x) { return x.id === c.id; }); },
      sub: function (w) { return plural(w.members.length, 'member', 'members') + ' · ' + plural(w.connections.length, 'connection', 'connections'); },
      subtitle: c.metrics > 0 ? 'Its ' + plural(c.metrics, 'metric', 'metrics') + ' go with it — members can use them in their chats, but can’t edit them' : null,
      onAdd: function (added) { p.onAdd(added, []); } });
  };

  /* ── Confirm ────────────────────────────────────────────────────────────────────────────────── */
  IK.WsConfirmDialog = function WsConfirmDialog(p) {
    var ref = R.useRef(null);
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'sm', onOpenAutoFocus: focusLater(ref) },
        h(D.ModalHeader, { className: HEAD }, h(D.ModalTitle, { className: 'break-words' }, p.title)),
        typeof p.text === 'string' ? lead(p.text) : p.text,
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { p.onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { ref: ref, variant: 'destructive', size: 'sm', type: 'button', onClick: p.onConfirm }, p.confirmLabel))));
  };
})();
