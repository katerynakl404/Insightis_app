/* DsConnectionDialogs — the two dialogs a saved connection goes through. DevartUI Modal for every
   shell (ModalContent / ModalHeader + ModalTitle / ModalFooter, its own ✕, Esc and scrim close).
   Port of #ds-edit-dlg and #ds-disc-dlg in pages/approved/data-sources_connections-landing.html
   (the "New connection" wizard, #ds-conn-dlg, is the shared IK.ConnectDialog — the Metrics page
   opens the same one).

   IK.DsEditConnectionDialog — "Edit connection" (md): Display name + Description (optional),
     Cancel · Save; the name is focused on open; an empty name saves nothing.
     { open, onOpenChange, label, desc, onSave: function ({ label, desc }) {} }

   IK.DsDisconnectDialog — "Disconnect <label>?" (sm), the label in Text/Primary; Cancel ·
     Disconnect (destructive, focused on open).
     { open, onOpenChange, label, onConfirm }                                                     */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  function Label(p) {
    return h('label', { htmlFor: p.htmlFor, className: 'mb-1.5 block text-sm font-medium text-ink-primary' },
      p.children, p.optional ? h('span', { className: 'font-normal text-ink-secondary' }, ' (optional)') : null);
  }
  IK.DsFieldLabel = Label;

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
