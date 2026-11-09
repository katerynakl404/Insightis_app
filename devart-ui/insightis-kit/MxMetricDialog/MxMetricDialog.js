/* MxMetricDialog — "Create metric" / "Edit metric" (#mx-add-dlg in the original;
   page-changes/metrics-landing.md → "Create Metric popup"). DevartUI Modal (md, 30rem): Name,
   Alias (@ addon), Definition (1500 max, counted), Link to (Data Source | Connection), and the
   data source / connection picker; Cancel · Save.

   <IK.MxMetricDialog
     open={bool} onOpenChange={fn}
     mode="create" | "edit"                 title "Create metric" / "Edit metric"
     target={{ kind: 'datasource' | 'connection', name }}   create only: made from a data source or a
                                                 connection (its Add Metric) — the title names it ("Create
                                                 metric for Skyvia Jira") and there is no Link to and no
                                                 picker: where it goes is known
     connectionOnly                         create in a shared workspace (its own Create Metric): no Link to, the
                                            Connection picker alone — a data source is not shared, only a
                                            connection; pass the workspace's own connections as options
     initial={{ name, alias, def, connector, link }}   prefill (edit) — alias without the @; link: where the
                                                 metric is linked now ('datasource' | 'connection')
     options={[{ id: 'Skyvia Jira', label: 'Skyvia Jira (Jira Software Cloud)' }]}   the connections
     sources={[{ id: 'GitHub', label: 'GitHub' }]}   the data sources (options when left out)
     findDuplicates={(name, alias) => ({ name: 'MRR growth' | null, alias: '@mrr_growth' | null })}
     onSave={({ name, alias, def, connector, link }) => …}   alias comes back WITH the @ ('' when empty)
     sharedAlias={(alias) => ({ alias: '@revenue', long: '@revenue__a3f9c1', ws: 'Marketing' }) | null}
   />   sharedAlias (shared workspaces): an alias already shared with the person → a warning Alert sm
        under the field while typing — theirs will be @revenue, the shared one @revenue__a3f9c1

   Save with an empty Name puts focus in Name and does nothing else. A name or alias that already
   belongs to another of the user's metrics is NOT a sentence under the form: the colliding field
   is marked (red border, aria-invalid) and focused with its text selected, and an error toast —
   "Metric not saved", naming the value(s) — explains it. Re-pressing Save morphs that one toast
   (one id). A field's mark clears on its next keystroke; closing the dialog clears both marks and
   dismisses the toast.

   Link to (user, 2026-11-09): Create from a data source or a connection has none (target); Create
   with nothing chosen opens on Data Source; Edit always has it, opened on where the metric is linked,
   so a metric can be moved to another data source or connection — the same Edit wherever it opens,
   a workspace included. A shared workspace's own Create Metric (connectionOnly) has no Link to: the
   Connection picker alone, the workspace's connections — none yet, and its list says "No connections
   added to this workspace".
   The body is DevartUI's ModalBody: its scrollbar sits in the dialog's own padding (§176). The picker's label, placeholder
   and list follow it (Data Source / Connection, "Select a data source…" / "Select a connection…");
   each side keeps its own pick, so flipping back restores it. target is read when the dialog opens.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  var DUP_TOAST = 'ik-mx-dup';
  var NO_OPTIONS = [];
  function norm(v) { return (v || '').trim().toLowerCase(); }

  /* Fields carry DevartUI's own label (InputGroup / TextArea / Autocomplete `label`). A SegmentedControl
     has none, so its caption is set the way InputGroup sets its label: Text/Body, medium, text-sm, 4px over it. */
  function GroupLabel(p) {
    return h(D.Typography, { element: 'span', variant: 'span', textColor: 'body', weight: 'medium', className: 'mb-1 block text-sm' }, p.children);
  }

  IK.MxMetricDialog = function MxMetricDialog(p) {
    var init = p.initial || {};
    var options = p.options || NO_OPTIONS;
    var sources = p.sources || options;
    var s = R.useState({}), f = s[0], setF = s[1];
    var e = R.useState({}), err = e[0], setErr = e[1];
    var lt = R.useState('datasource'), link = lt[0], setLink = lt[1];
    /* the data source / connection it is made for — kept from the open, so the form does not change while it closes */
    var tg = R.useState(null), target = tg[0], setTarget = tg[1];
    var nameRef = R.useRef(null), aliasRef = R.useRef(null);

    R.useEffect(function () {
      if (!p.open) return;
      var l = p.connectionOnly || init.link === 'connection' ? 'connection' : 'datasource';
      /* a prefilled one reads as its bare name (the original writes the value, not the option label, into the trigger) */
      var pick = {}; if (init.connector) pick[l] = { id: init.connector, label: init.connector };
      setF({ name: init.name || '', alias: (init.alias || '').replace(/^@/, ''), def: init.def || '', pick: pick });
      setErr({}); setLink(l); setTarget(p.mode !== 'edit' && p.target ? p.target : null);
    }, [p.open]);
    /* each side of Link to keeps its own pick */
    function setPick(v) {
      setF(function (o) { var n = Object.assign({}, o); n.pick = Object.assign({}, o.pick); n.pick[link] = v || null; return n; });
    }

    function set(k, v) {
      setF(function (o) { var n = Object.assign({}, o); n[k] = v; return n; });
      if (k === 'name' || k === 'alias') setErr(function (o) { var n = Object.assign({}, o); delete n[k]; return n; });
    }
    function close() { if (p.onOpenChange) p.onOpenChange(false); }
    function onOpenChange(v) {
      if (!v) { setErr({}); D.toast.dismiss(DUP_TOAST); }
      if (p.onOpenChange) p.onOpenChange(v);
    }
    function save() {
      var name = (f.name || '').trim(), alias = (f.alias || '').trim();
      if (!name) { if (nameRef.current) nameRef.current.focus(); return; }
      var hit = p.findDuplicates ? p.findDuplicates(name, alias) : { name: null, alias: null };
      if (hit.name || hit.alias) {
        setErr({ name: !!hit.name, alias: !!hit.alias });
        var desc = hit.name && hit.alias
          ? h(IK.Fragment, null, 'The name ', h('strong', null, hit.name), ' and the alias ', h('strong', null, hit.alias), ' both belong to another metric — change the highlighted fields')
          : hit.name
            ? h(IK.Fragment, null, 'The name ', h('strong', null, hit.name), ' already belongs to another metric — change the highlighted field')
            : h(IK.Fragment, null, 'The alias ', h('strong', null, hit.alias), ' already belongs to another metric — change the highlighted field');
        D.toast.error('Metric not saved', { id: DUP_TOAST, description: desc });
        var first = hit.name ? nameRef.current : aliasRef.current;
        if (first) { first.focus(); first.select(); }
        return;
      }
      var picked = (f.pick || {})[link];
      if (p.onSave) p.onSave({ name: name, alias: alias ? '@' + alias.replace(/^@/, '') : '', def: (f.def || '').trim(),
        connector: target ? target.name : picked ? String(picked.id).trim() : '', link: target ? target.kind : link });
      D.toast.dismiss(DUP_TOAST);
      close();
    }

    /* the pick is kept as the option itself (or the prefilled bare name), so the Autocomplete gets the same object
       every render — it syncs its text from the value, and a new object each time would loop */
    var selected = (f.pick || {})[link] || null;
    var isConn = link === 'connection';
    var title = p.mode === 'edit' ? 'Edit metric' : target ? 'Create metric for ' + target.name : 'Create metric';

    return h(D.Modal, { open: !!p.open, onOpenChange: onOpenChange },
      h(D.ModalContent, {
        size: 'md', 'aria-describedby': undefined,
        onOpenAutoFocus: function (ev) { ev.preventDefault(); setTimeout(function () { if (nameRef.current) nameRef.current.focus(); }, 50); }
      },
        h(D.ModalHeader, { className: 'pe-10' }, h(D.ModalTitle, null, title)),
        /* DevartUI's body: its bar sits in the dialog's own padding, the fields inset alike on both sides (§176) */
        h(D.ModalBody, { className: 'gap-4' },
          h(D.InputGroup, { size: 'md', isInvalid: !!err.name, label: 'Name', inputId: 'ik-mx-name' },
            h(D.InputGroupInput, { id: 'ik-mx-name', ref: nameRef, type: 'text', placeholder: 'Net revenue', value: f.name || '', onChange: function (ev) { set('name', ev.target.value); } })),
          h('div', { className: 'flex flex-col gap-2' },
            h(D.InputGroup, { size: 'md', isInvalid: !!err.alias, label: 'Alias', inputId: 'ik-mx-alias' },
              h(D.InputGroupAddon, { align: 'inline-start', 'aria-hidden': 'true' }, '@'),
              h(D.InputGroupInput, { id: 'ik-mx-alias', ref: aliasRef, type: 'text', placeholder: 'net_revenue', value: f.alias || '', onChange: function (ev) { set('alias', ev.target.value); } })),
            /* shared workspaces: the alias is already shared with the person — said while typing, not
               an error: theirs wins the short form, the shared one keeps a long one */
            (function () {
              var hit = p.sharedAlias && !err.alias ? p.sharedAlias(f.alias) : null;
              return hit ? h(D.Alert, { variant: 'warning', size: 'sm', role: 'status', icon: h(IK.Icon, { name: 'warning' }),
                title: hit.alias + ' is already shared in ' + hit.ws,
                description: 'Yours will be ' + hit.alias + '; the shared one stays available as ' + hit.long + '.' }) : null;
            })()),
          h(D.TextArea, {
            id: 'ik-mx-def', rows: 4, maxLength: 1500, showCount: true, label: 'Definition', placeholder: 'Describe how to compute this metric…',
            value: f.def || '', onChange: function (ev) { set('def', ev.target.value); }
          }),
          /* made for a data source or a connection: where it goes is known — no Link to, no picker */
          /* a shared workspace's own Create Metric: no Link to either — the Connection picker alone (user, 2026-11-09) */
          target || p.connectionOnly ? null : h('div', null,
            h(GroupLabel, null, 'Link to'),
            h(D.SegmentedControl, { size: 'md', value: link, onValueChange: function (v) { if (v) setLink(v); } },
              h(D.SegmentedControlList, { 'aria-label': 'Link to', className: 'flex w-full' },
                h(D.SegmentedControlTrigger, { value: 'datasource' }, 'Data Source'),
                h(D.SegmentedControlTrigger, { value: 'connection' }, 'Connection')))),
          target ? null : h(D.Autocomplete, {
            key: link, id: 'ik-mx-connector', size: 'lg', options: isConn ? options : sources, value: selected, label: isConn ? 'Connection' : 'Data Source',
            placeholder: isConn ? 'Select a connection…' : 'Select a data source…',
            /* a workspace with nothing added yet: its list says so (user, 2026-11-09) */
            noOptionsText: p.connectionOnly && !options.length ? 'No connections added to this workspace' : undefined,
            onChange: function (ev, v) { setPick(v); }
          })),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: save }, 'Save'))));
  };

  /* IK.useMxDeleteConfirm() — Delete a metric asks first, as a file's Delete does (user, 2026-10-23: "видалення метрик через
     підтвердження"): the Metrics page's ⋮ and its panel, a workspace's Metrics tab; then "<name> deleted" (IK.wsToast).
       var del = IK.useMxDeleteConfirm();  del.ask(metric, run);  …  del.dialog */
  IK.useMxDeleteConfirm = function () {
    var s = R.useState(null), q = s[0], set = s[1];
    return { ask: function (m, run) { set({ m: m, run: run }); }, dialog: h(D.ConfirmationDialog, {
      open: !!q, variant: 'destructive', cancelLabel: 'Cancel', confirmLabel: 'Delete',
      title: q ? 'Delete ' + q.m.name + '?' : '', description: 'This action can’t be undone. The metric will be permanently removed.',
      onOpenChange: function (o) { if (!o) set(null); },
      onConfirm: function () { var x = q; set(null); x.run(); IK.wsToast.deleted([x.m.name]); } }) };
  };
})();
