/* ConnectDialog — "New connection", the two-step wizard a Connect press opens. ONE component for
   every page that connects a source (the original kit's shared "ConnectWizard": #ds-conn-dlg on
   Data Sources → Connections, #mx-conn-dlg on Metrics — the same .dlg.is-lg.var-wizard markup).
   DevartUI Modal (lg) at the wizard's fixed 580px height, so stepping never makes it jump; the
   step scrolls inside it on a short screen. Focus stays put on open, as in the original.

     Step 1 of 2  the source (a 36px mark + "<Source> connection"), then the provider's own form,
                  depicted (IK.IntegrationForm). Footer: Save → "Saving…" (disabled) for 1.4 s →
     Step 2 of 2  Connection name (prefilled with the source, focused) + Description (optional).
                  Footer: Save Connection → the dialog closes, then onCreate.
   "Step N of 2" over a 4px DevartUI ProgressBar (50% → 100%). Re-opening starts again at step 1.

   h(IK.ConnectDialog, {
     open, onOpenChange,
     connector: 'PostgreSQL',   // the source being connected; '' → "New connection", an empty mark
     mark: 'logo',              // the 36px source mark — where the two originals differ:
                                //   'logo'   (Data Sources) the connector's logo (IK.ConnectorMark)
                                //            on the icon-wrapper wash
                                //   'letter' (Metrics) the source's initial, Title/12 in
                                //            Text/Secondary on Surface/Card
     onCreate: function ({ connector, label, desc }) {}   // label falls back to the connector
   })

   IK.IntegrationForm — the depiction of a provider's form alone (Account / API Key / two ticked
   options / Metadata Cache). Fixed colours, no theme response, by design: it is a picture of
   somebody else's UI.                                                                            */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  function Label(p) {
    return h('label', { htmlFor: p.htmlFor, className: 'mb-1.5 block text-sm font-medium text-ink-primary' },
      p.children, p.optional ? h('span', { className: 'font-normal text-ink-secondary' }, ' (optional)') : null);
  }

  IK.IntegrationForm = function IntegrationForm() {
    function check(label) {
      return h('div', { className: 'ik-cwf-check' },
        h('span', { className: 'ik-cwf-check-ico' },
          h('svg', { viewBox: '0 0 12 12', width: 9, height: 9, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
            h('polyline', { points: '2 6 5 9 10 3' }))),
        h('span', { className: 'ik-cwf-check-lbl' }, label));
    }
    return h('div', { className: 'ik-cwf' },
      h('div', { className: 'ik-cwf-row' },
        h('div', { className: 'ik-cwf-lbl' }, 'Account'),
        h('div', { className: 'ik-cwf-field is-empty' }, 'placeholder')),
      h('div', { className: 'ik-cwf-row' },
        h('div', { className: 'ik-cwf-lbl' }, 'API Key'),
        h('div', { className: 'ik-cwf-field' }, '••••••••••')),
      check('Use Custom Objects'),
      check('Use Custom Fields'),
      h('div', { className: 'ik-cwf-row' },
        h('div', { className: 'ik-cwf-lbl' }, 'Metadata Cache'),
        h('div', { className: 'ik-cwf-select' },
          h('span', null, 'Infinite'),
          h('svg', { viewBox: '0 0 24 24', width: 12, height: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 2, className: 'ik-cwf-chev', 'aria-hidden': 'true' },
            h('polyline', { points: '6 9 12 15 18 9' })))));
  };

  function SourceMark(p) {
    if (p.mark === 'letter') {
      return h('span', { className: 'ik-cw-mark is-letter', 'aria-hidden': 'true' },
        h(D.Typography, { element: 'span', textStyle: 'title12', textColor: 'secondary' }, (p.name[0] || '?').toUpperCase()));
    }
    return h('span', { className: 'ik-cw-mark' },
      p.name ? h(IK.ConnectorMark, { connector: p.name, label: p.name + ' logo', className: 'size-full' }) : null);
  }

  IK.ConnectDialog = function ConnectDialog(p) {
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
      var r = { connector: name, label: label.trim() || name, desc: desc.trim() };
      if (p.onOpenChange) p.onOpenChange(false);
      if (p.onCreate) p.onCreate(r);
    }
    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'lg', className: 'ik-cw', 'aria-describedby': undefined, onOpenAutoFocus: function (e) { e.preventDefault(); } },
        /* the original header row is the 32px close button's height: 10px under the title */
        h(D.ModalHeader, { className: 'mb-2.5' }, h(D.ModalTitle, null, 'New connection')),
        h('div', { className: 'ik-cw-progress' },
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Step ' + step + ' of 2'),
          h(D.ProgressBar, { value: step === 1 ? 50 : 100, 'aria-label': 'Step ' + step + ' of 2' })),
        h('div', { className: 'ik-cw-body' },
          step === 1 ? h('div', { className: 'ik-cw-step' },
            h('div', { className: 'flex items-center gap-3' },
              h(SourceMark, { mark: p.mark, name: name }),
              h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'primary' }, name ? name + ' connection' : 'New connection')),
            h(IK.IntegrationForm)) :
          h('div', { className: 'ik-cw-step' },
            h('div', { className: 'flex flex-col' },
              h(Label, { htmlFor: 'ik-cw-name' }, 'Connection name'),
              h(D.InputGroup, null, h(D.InputGroupInput, {
                id: 'ik-cw-name', ref: nameRef, value: label, placeholder: 'Connection name', autoComplete: 'off',
                onChange: function (e) { setLabel(e.target.value); }
              }))),
            h('div', { className: 'flex flex-col' },
              h(Label, { htmlFor: 'ik-cw-desc', optional: true }, 'Description'),
              h(D.TextArea, {
                id: 'ik-cw-desc', rows: 4, value: desc, placeholder: 'What is this connection used for?',
                onChange: function (e) { setDesc(e.target.value); }
              })))),
        h(D.ModalFooter, { className: 'mt-0' },
          step === 1
            ? h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: saving, onClick: next }, saving ? 'Saving…' : 'Save')
            : h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: create }, 'Save Connection'))));
  };
})();
