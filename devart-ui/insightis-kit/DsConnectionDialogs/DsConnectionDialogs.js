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
     { open, onOpenChange, label, onConfirm, sharedIn }
     sharedIn — shared workspaces (the brief, AIINS-1882): the names of the workspaces it is shared into →
       a warning Alert "Shared in Sales and Support" (no member count): members lose it and its
       metrics, and after reconnecting it has to be added to them again. Unshared → as today.                                                     */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Field labels are DevartUI's own (InputGroup / TextArea `label`); this only adds the quiet suffix */
  function optional(text) {
    return h(IK.Fragment, null, text, h('span', { className: 'font-normal text-ink-secondary' }, ' (optional)'));
  }

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
          h(D.InputGroup, { label: 'Display name', inputId: 'ik-dsed-name' }, h(D.InputGroupInput, {
            id: 'ik-dsed-name', ref: nameRef, value: label, placeholder: 'Connection name', autoComplete: 'off',
            onChange: function (e) { setLabel(e.target.value); }
          })),
          h(D.TextArea, {
            id: 'ik-dsed-desc', rows: 3, value: desc, label: optional('Description'), placeholder: 'Optional description',
            onChange: function (e) { setDesc(e.target.value); }
          })),
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
        /* the sentence and the shared warning as one block, 12px apart (as the account's confirms) */
        h('div', { className: 'flex flex-col gap-3' },
        h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary', className: 'm-0' },
          'This connection will be removed. Your existing metric data will be preserved and a new connection can be created at any time.'),
        p.sharedIn && p.sharedIn.length ? h(D.Alert, {
          variant: 'warning', size: 'sm', role: 'note', icon: h(IK.Icon, { name: 'warning' }),
          title: 'Shared in ' + IK.wsJoin(p.sharedIn),
          description: 'Their members lose this connection and its metrics. If you connect it again, add it to these workspaces again.'
        }) : null),
        h(D.ModalFooter, null,
          h(D.Button, { variant: 'secondary', size: 'sm', type: 'button', onClick: function () { p.onOpenChange(false); } }, 'Cancel'),
          h(D.Button, { ref: ref, variant: 'destructive', size: 'sm', type: 'button', onClick: p.onConfirm }, 'Disconnect'))));
  };
})();
