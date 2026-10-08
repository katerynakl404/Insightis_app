/* MxMetricDialog — "Create metric" / "Edit metric" (#mx-add-dlg in the original;
   page-changes/metrics-landing.md → "Create Metric popup"). DevartUI Modal (md, 30rem): Name,
   Alias (@ addon), Definition (1500 max, counted), Link to (Data Source | Connection), and the
   data source / connection picker; Cancel · Save.

   <IK.MxMetricDialog
     open={bool} onOpenChange={fn}
     mode="create" | "edit"                 title "Create metric" / "Edit metric"
     initial={{ name, alias, def, connector }}   prefill (edit) — alias without the @
     options={[{ id: 'Skyvia Jira', label: 'Skyvia Jira (Jira Software Cloud)' }]}
     findDuplicates={(name, alias) => ({ name: 'MRR growth' | null, alias: '@mrr_growth' | null })}
     onSave={({ name, alias, def, connector }) => …}   alias comes back WITH the @ ('' when empty)
   />

   Save with an empty Name puts focus in Name and does nothing else. A name or alias that already
   belongs to another of the user's metrics is NOT a sentence under the form: the colliding field
   is marked (red border, aria-invalid) and focused with its text selected, and an error toast —
   "Metric not saved", naming the value(s) — explains it. Re-pressing Save morphs that one toast
   (one id). A field's mark clears on its next keystroke; closing the dialog clears both marks and
   dismisses the toast. Link to resets to Data Source on every open; its label and the picker's
   placeholder follow it (Data Source / Connection, "Select a data source…" / "Select a connection…").
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  var DUP_TOAST = 'ik-mx-dup';
  var NO_OPTIONS = [];
  function norm(v) { return (v || '').trim().toLowerCase(); }

  function Label(p) {
    return h(D.Typography, { element: p.htmlFor ? 'label' : 'span', htmlFor: p.htmlFor, textStyle: 'label14', textColor: 'primary', className: 'mb-1.5 block' }, p.children);
  }

  IK.MxMetricDialog = function MxMetricDialog(p) {
    var init = p.initial || {};
    var options = p.options || NO_OPTIONS;
    var s = R.useState({}), f = s[0], setF = s[1];
    var e = R.useState({}), err = e[0], setErr = e[1];
    var lt = R.useState('datasource'), link = lt[0], setLink = lt[1];
    var nameRef = R.useRef(null), aliasRef = R.useRef(null);

    R.useEffect(function () {
      if (!p.open) return;
      setF({ name: init.name || '', alias: (init.alias || '').replace(/^@/, ''), def: init.def || '', connector: init.connector || '', connectorLabel: init.connector || '' });
      setErr({}); setLink('datasource');
    }, [p.open]);

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
      if (p.onSave) p.onSave({ name: name, alias: alias ? '@' + alias.replace(/^@/, '') : '', def: (f.def || '').trim(), connector: (f.connector || '').trim() });
      D.toast.dismiss(DUP_TOAST);
      close();
    }

    /* a prefilled connection reads as its bare name (the original writes the value, not the option
       label, into the trigger); one picked from the list reads as the option */
    /* memoised: the Autocomplete syncs its text from the value, so a new object every render would
       loop */
    var selected = R.useMemo(function () {
      var hit = null;
      options.forEach(function (o) { if (o.id === f.connector && o.label === f.connectorLabel) hit = o; });
      return hit || (f.connector ? { id: f.connector, label: f.connectorLabel || f.connector } : null);
    }, [f.connector, f.connectorLabel, options]);
    var isConn = link === 'connection';

    return h(D.Modal, { open: !!p.open, onOpenChange: onOpenChange },
      h(D.ModalContent, {
        size: 'md', 'aria-describedby': undefined,
        onOpenAutoFocus: function (ev) { ev.preventDefault(); setTimeout(function () { if (nameRef.current) nameRef.current.focus(); }, 50); }
      },
        h(D.ModalHeader, { className: 'pe-10' }, h(D.ModalTitle, null, p.mode === 'edit' ? 'Edit metric' : 'Create metric')),
        h('div', { className: 'flex min-h-0 flex-col gap-4 overflow-y-auto' },
          h('div', null,
            h(Label, { htmlFor: 'ik-mx-name' }, 'Name'),
            h(D.InputGroup, { size: 'md', isInvalid: !!err.name },
              h(D.InputGroupInput, { id: 'ik-mx-name', ref: nameRef, type: 'text', placeholder: 'Net revenue', value: f.name || '', onChange: function (ev) { set('name', ev.target.value); } }))),
          h('div', null,
            h(Label, { htmlFor: 'ik-mx-alias' }, 'Alias'),
            h(D.InputGroup, { size: 'md', isInvalid: !!err.alias },
              h(D.InputGroupAddon, { align: 'inline-start', 'aria-hidden': 'true' }, '@'),
              h(D.InputGroupInput, { id: 'ik-mx-alias', ref: aliasRef, type: 'text', placeholder: 'net_revenue', value: f.alias || '', onChange: function (ev) { set('alias', ev.target.value); } }))),
          h('div', null,
            h(Label, { htmlFor: 'ik-mx-def' }, 'Definition'),
            h(D.TextArea, {
              id: 'ik-mx-def', rows: 4, maxLength: 1500, showCount: true, placeholder: 'Describe how to compute this metric…',
              value: f.def || '', onChange: function (ev) { set('def', ev.target.value); }
            })),
          h('div', null,
            h(Label, null, 'Link to'),
            h(D.SegmentedControl, { size: 'md', value: link, onValueChange: setLink },
              h(D.SegmentedControlList, { 'aria-label': 'Link to', className: 'flex w-full' },
                h(D.SegmentedControlTrigger, { value: 'datasource' }, 'Data Source'),
                h(D.SegmentedControlTrigger, { value: 'connection' }, 'Connection')))),
          h('div', null,
            h(Label, { htmlFor: 'ik-mx-connector' }, isConn ? 'Connection' : 'Data Source'),
            h(D.Autocomplete, {
              id: 'ik-mx-connector', size: 'lg', options: options, value: selected,
              placeholder: isConn ? 'Select a connection…' : 'Select a data source…',
              onChange: function (ev, v) { set('connector', v ? v.id : ''); set('connectorLabel', v ? v.label : ''); }
            }))),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: save }, 'Save'))));
  };
})();
