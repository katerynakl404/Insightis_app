/* DsConnectionDialogs — the three dialogs a saved connection goes through. DevartUI Modal for every
   shell (ModalContent / ModalHeader + ModalTitle / ModalFooter, its own ✕, Esc and scrim close).
   Port of #ds-conn-dlg, #ds-edit-dlg and #ds-disc-dlg in
   pages/approved/data-sources_connections-landing.html (the "New connection" wizard is the kit's
   shared ConnectWizard — the Metrics page opens the same one).

   IK.DsConnectDialog — "New connection", two steps in one fixed-height shell (it never jumps):
     1  the provider's own form, depicted (IK.DsIntegrationForm), under the source's logo + name;
        footer Save → "Saving…" (disabled) for 1.4 s → step 2
     2  Connection name (prefilled with the connector) + Description (optional); footer
        Save Connection → onCreate({ connector, label, desc })
     "Step 1 of 2" / "Step 2 of 2" over a 4px progress strip (DevartUI ProgressBar).
     { open, onOpenChange, connector: 'PostgreSQL', onCreate }

   IK.DsEditConnectionDialog — "Edit connection" (md): Display name + Description (optional),
     Cancel · Save; the name is focused on open; an empty name saves nothing.
     { open, onOpenChange, label, desc, onSave: function ({ label, desc }) {} }

   IK.DsDisconnectDialog — "Disconnect <label>?" (sm), the label in Text/Primary; Cancel ·
     Disconnect (destructive, focused on open).
     { open, onOpenChange, label, onConfirm }

   IK.DsIntegrationForm — the depiction of a provider's form (Account / API Key / two checked
     options / Metadata Cache). Fixed colours, no theme response, by design: it is a picture of
     somebody else's UI.                                                                          */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  function Label(p) {
    return h('label', { htmlFor: p.htmlFor, className: 'mb-1.5 block text-sm font-medium text-ink-primary' },
      p.children, p.optional ? h('span', { className: 'font-normal text-ink-secondary' }, ' (optional)') : null);
  }
  IK.DsFieldLabel = Label;

  IK.DsIntegrationForm = function DsIntegrationForm() {
    function check(label) {
      return h('div', { className: 'ik-dsif-check' },
        h('span', { className: 'ik-dsif-check-ico' },
          h('svg', { viewBox: '0 0 12 12', width: 9, height: 9, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
            h('polyline', { points: '2 6 5 9 10 3' }))),
        h('span', { className: 'ik-dsif-check-lbl' }, label));
    }
    return h('div', { className: 'ik-dsif' },
      h('div', { className: 'ik-dsif-row' },
        h('div', { className: 'ik-dsif-lbl' }, 'Account'),
        h('div', { className: 'ik-dsif-field is-empty' }, 'placeholder')),
      h('div', { className: 'ik-dsif-row' },
        h('div', { className: 'ik-dsif-lbl' }, 'API Key'),
        h('div', { className: 'ik-dsif-field' }, '••••••••••')),
      check('Use Custom Objects'),
      check('Use Custom Fields'),
      h('div', { className: 'ik-dsif-row' },
        h('div', { className: 'ik-dsif-lbl' }, 'Metadata Cache'),
        h('div', { className: 'ik-dsif-select' },
          h('span', null, 'Infinite'),
          h('svg', { viewBox: '0 0 24 24', width: 12, height: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 2, className: 'ik-dsif-chev', 'aria-hidden': 'true' },
            h('polyline', { points: '6 9 12 15 18 9' })))));
  };

  IK.DsConnectDialog = function DsConnectDialog(p) {
    var st = R.useState(1), step = st[0], setStep = st[1];
    var sv = R.useState(false), saving = sv[0], setSaving = sv[1];
    var ls = R.useState(''), label = ls[0], setLabel = ls[1];
    var ds = R.useState(''), desc = ds[0], setDesc = ds[1];
    var nameRef = R.useRef(null), timer = R.useRef(0);
    var name = p.connector || '';
    R.useEffect(function () {
      if (!p.open) return;
      setStep(1); setSaving(false); setLabel(name); setDesc('');
      return function () { clearTimeout(timer.current); };
    }, [p.open, name]);
    function next() {
      setSaving(true);
      timer.current = setTimeout(function () {
        setStep(2); setSaving(false);
        setTimeout(function () { if (nameRef.current) nameRef.current.focus(); }, 50);
      }, 1400);
    }
    function create() {
      if (p.onCreate) p.onCreate({ connector: name, label: label.trim() || name, desc: desc.trim() });
    }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'lg', className: 'ik-dscw', onOpenAutoFocus: function (e) { e.preventDefault(); } },
        h(D.ModalHeader, { className: 'mb-2' }, h(D.ModalTitle, null, 'New connection')),
        h('div', { className: 'ik-dscw-progress' },
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Step ' + step + ' of 2'),
          h(D.ProgressBar, { value: step === 1 ? 50 : 100, 'aria-label': 'Step ' + step + ' of 2' })),
        h('div', { className: 'ik-dscw-body' },
          step === 1 ? h('div', { className: 'ik-dscw-step' },
            h('div', { className: 'flex items-center gap-3' },
              h('span', { className: 'ik-dscw-logo' }, name ? h(D.ConnectorLogo, { connector: name, label: name + ' logo', className: 'size-full' }) : null),
              h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'primary' }, name ? name + ' connection' : 'New connection')),
            h(IK.DsIntegrationForm)) :
          h('div', { className: 'ik-dscw-step' },
            h('div', { className: 'flex flex-col' },
              h(Label, { htmlFor: 'ik-dscw-name' }, 'Connection name'),
              h(D.InputGroup, null, h(D.InputGroupInput, {
                id: 'ik-dscw-name', ref: nameRef, value: label, placeholder: 'Connection name', autoComplete: 'off',
                onChange: function (e) { setLabel(e.target.value); }
              }))),
            h('div', { className: 'flex flex-col' },
              h(Label, { htmlFor: 'ik-dscw-desc', optional: true }, 'Description'),
              h(D.TextArea, {
                id: 'ik-dscw-desc', rows: 4, value: desc, placeholder: 'What is this connection used for?',
                onChange: function (e) { setDesc(e.target.value); }
              })))),
        h(D.ModalFooter, { className: 'mt-0' },
          step === 1
            ? h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: saving, onClick: next }, saving ? 'Saving…' : 'Save')
            : h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: create }, 'Save Connection'))));
  };

  IK.DsEditConnectionDialog = function DsEditConnectionDialog(p) {
    var ls = R.useState(''), label = ls[0], setLabel = ls[1];
    var ds = R.useState(''), desc = ds[0], setDesc = ds[1];
    var nameRef = R.useRef(null);
    R.useEffect(function () { if (p.open) { setLabel(p.label || ''); setDesc(p.desc || ''); } }, [p.open]);
    function save() {
      var l = label.trim();
      if (!l) return;
      if (p.onSave) p.onSave({ label: l, desc: desc.trim() });
    }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, {
        size: 'md',
        onOpenAutoFocus: function (e) { e.preventDefault(); setTimeout(function () { if (nameRef.current) nameRef.current.focus(); }, 50); }
      },
        h(D.ModalHeader, null, h(D.ModalTitle, null, 'Edit connection')),
        h('div', { className: 'flex flex-col gap-4' },
          h('div', { className: 'flex flex-col' },
            h(Label, { htmlFor: 'ik-dsed-name' }, 'Display name'),
            h(D.InputGroup, null, h(D.InputGroupInput, {
              id: 'ik-dsed-name', ref: nameRef, value: label, placeholder: 'Connection name', autoComplete: 'off',
              onChange: function (e) { setLabel(e.target.value); }
            }))),
          h('div', { className: 'flex flex-col' },
            h(Label, { htmlFor: 'ik-dsed-desc', optional: true }, 'Description'),
            h(D.TextArea, {
              id: 'ik-dsed-desc', rows: 3, value: desc, placeholder: 'Optional description',
              onChange: function (e) { setDesc(e.target.value); }
            }))),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { p.onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: save }, 'Save'))));
  };

  IK.DsDisconnectDialog = function DsDisconnectDialog(p) {
    var ref = R.useRef(null);
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, {
        size: 'sm',
        onOpenAutoFocus: function (e) { e.preventDefault(); setTimeout(function () { if (ref.current) ref.current.focus(); }, 50); }
      },
        h(D.ModalHeader, null, h(D.ModalTitle, null, 'Disconnect ', h('span', { className: 'text-ink-primary' }, p.label), '?')),
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' },
          'This connection will be removed. Your existing metric data will be preserved and a new connection can be created at any time.'),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { p.onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { ref: ref, variant: 'destructive', size: 'sm', type: 'button', onClick: p.onConfirm }, 'Disconnect'))));
  };
})();
