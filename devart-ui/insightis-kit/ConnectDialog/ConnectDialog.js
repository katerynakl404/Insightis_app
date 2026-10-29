/* ConnectDialog — "New connection", the two-step wizard a Connect press opens. ONE component for
   every page that connects a source (the original kit's shared "ConnectWizard": #ds-conn-dlg on
   Data Sources → Connections, #mx-conn-dlg on Metrics — the same .dlg.is-lg.var-wizard markup).
   DevartUI Modal (lg) at the wizard's fixed 580px height, so stepping never makes it jump; the
   step scrolls inside it on a short screen. Focus stays put on open, as in the original.

     Step 1 of 2  the source (a 36px mark + "<Source> connection"), then the provider's own form,
                  depicted (IK.IntegrationForm). Footer: Save → "Saving…" (disabled) for 1.4 s →
     Step 2 of 2  Connection name (prefilled with the source, focused) + Description (optional).
                  Footer: Save Connection → the dialog closes, then onCreate.
   "Step N of 2" over one bar per step — DevartUI StepProgress, the same atom as every other
   multi-step flow (the chat's question card, the onboarding). Footer, as DevartUI's Modal sets it:
   Cancel (secondary, closes) first, the step's confirming action last. Re-opening starts again at step 1.

   h(IK.ConnectDialog, {
     open, onOpenChange,
     connector: 'PostgreSQL',   // the source being connected; '' → "New connection", an empty mark
     mark: 'logo',              // the 36px source mark — where the two originals differ:
                                //   'logo'   (Data Sources) the connector's logo (IK.ConnectorMark)
                                //            on the icon-wrapper wash
                                //   'letter' (Metrics) the source's initial, Title/12 in
                                //            Text/Secondary on Surface/Card
     onCreate: function ({ connector, label, desc }) {},  // label falls back to the connector
     authError: false           // the provider refuses the first Save (an expired or declined
                                //   authorization): step 1 turns into the error with Retry, which
                                //   returns to the form; the second Save goes through
   })

   IK.IntegrationForm — the depiction of a provider's form alone (Account / API Key / two ticked
   options / Metadata Cache). Fixed colours, no theme response, by design: it is a picture of
   somebody else's UI.                                                                            */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Field labels are DevartUI's own (InputGroup / TextArea `label`); this only adds the quiet suffix */
  function optional(text) {
    return h(IK.Fragment, null, text, h('span', { className: 'font-normal text-ink-secondary' }, ' (optional)'));
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
    var fs = R.useState(false), failed = fs[0], setFailed = fs[1];
    var tries = R.useRef(0);
    var nameRef = R.useRef(null), timer = R.useRef(0);
    var name = p.connector || '';
    R.useEffect(function () {
      if (!p.open) return;
      setStep(1); setSaving(false); setLabel(name); setDesc(''); setFailed(false); tries.current = 0;
      return function () { clearTimeout(timer.current); };
    }, [p.open, name]);
    function next() {
      setSaving(true);
      timer.current = setTimeout(function () {
        if (p.authError && tries.current++ === 0) { setSaving(false); setFailed(true); return; }
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
          h(D.StepProgress, { labelPosition: 'top', size: 'sm', label: 'Step ' + step + ' of 2', current: step - 1, 'aria-label': 'New connection steps',
            steps: [{ title: 'Connection', done: step > 1 }, { title: 'Details' }] })),
        h('div', { className: 'ik-cw-body' },
          step === 1 && failed ? h('div', { className: 'ik-cw-step ik-cw-fail' },
            h(D.StatusView, {
              size: 'md', surface: 'embedded', role: 'alert',
              icon: h(IK.Icon, { name: 'warning' }),
              title: name ? 'Couldn’t connect to ' + name : 'Couldn’t connect',
              description: 'The authorization expired or access was declined. Try again to sign in.'
            })) :
          step === 1 ? h('div', { className: 'ik-cw-step' },
            h('div', { className: 'flex items-center gap-3' },
              h(SourceMark, { mark: p.mark, name: name }),
              h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'primary' }, name ? name + ' connection' : 'New connection')),
            h(IK.IntegrationForm)) :
          h('div', { className: 'ik-cw-step' },
            h(D.InputGroup, { label: 'Connection name', inputId: 'ik-cw-name' }, h(D.InputGroupInput, {
              id: 'ik-cw-name', ref: nameRef, value: label, placeholder: 'Connection name', autoComplete: 'off',
              onChange: function (e) { setLabel(e.target.value); }
            })),
            h(D.TextArea, {
              id: 'ik-cw-desc', rows: 4, value: desc, label: optional('Description'), placeholder: 'What is this connection used for?',
              onChange: function (e) { setDesc(e.target.value); }
            }))),
        h(D.ModalFooter, { className: 'mt-0' },
          h(D.ModalClose, { asChild: true }, h(D.Button, { variant: 'secondary', size: 'sm', type: 'button' }, 'Cancel')),
          step === 1 && failed
            ? h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: function () { setFailed(false); } }, 'Retry')
            : step === 1
            ? h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: saving, onClick: next }, saving ? 'Saving…' : 'Save')
            : h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: create }, 'Save Connection'))));
  };
})();
