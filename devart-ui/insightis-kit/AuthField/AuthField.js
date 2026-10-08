/* AuthField — the two fields of the auth flow, at the original's .igrp.is-xl (44px) size.
   Ported from pages/concept/auth/*.html + auth-concept.js (eye toggle, live password
   requirements, confirm-password matching).

   <IK.AuthField kind="email" id="log-email" defaultValue="you@example.com" />
     D.InputGroup xl + mail glyph + email input (placeholder / name "Email").

   <IK.AuthField kind="password" id="reg-pw"
     placeholder="Password"            // also the accessible name (the original has no visible label)
     autoComplete="new-password"       // current-password (default) | new-password
     strength                          // floats the strength hint beside the field while it is
                                       // focused: bar + level + the 5-rule policy checklist
     matches={pw}                      // confirm field: invalid ("Passwords do not match") while
                                       // it holds a value that differs from `matches`
     defaultValue="" onValueChange={fn}
   />
     D.PasswordInput xl — its own lock glyph and show/hide toggle (DevartUI owns the eye).

   The hint: hidden until the field is focused, closes on blur (as in prod). Beside the field
   on wide screens; above it, field-wide, at ≤960px where the centred card leaves no room at
   its side — the original's breakpoint. It never takes focus or pointer events, so it can
   overlay the field above without blocking typing.

   IK.AuthField.Strength({ value }) — the hint's content on its own (storybook).
   IK.AuthField.RULES — the policy (8 chars + upper / lower / digit / symbol), from the app's
   PasswordRequirementsList, copy verbatim from the original.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h, R = window.React;

  var RULES = [
    { key: 'min',    label: 'At least 8 characters', test: function (v) { return v.length >= 8; } },
    { key: 'upper',  label: '1+ uppercase (A–Z)',    test: function (v) { return /[A-Z]/.test(v); } },
    { key: 'lower',  label: '1+ lowercase (a–z)',    test: function (v) { return /[a-z]/.test(v); } },
    { key: 'digit',  label: '1+ number (0–9)',       test: function (v) { return /[0-9]/.test(v); } },
    { key: 'symbol', label: '1+ symbol (!@#$)',      test: function (v) { return /[^A-Za-z0-9]/.test(v); } }
  ];
  /* level → label, label ink (Typography textColor), bar fill (ProgressBar variant) */
  var LEVELS = {
    none:   { label: '',       ink: 'light',       bar: 'tertiary' },
    weak:   { label: 'Weak',   ink: 'destructive', bar: 'destructive' },
    fair:   { label: 'Fair',   ink: 'warning',     bar: 'attention' },
    strong: { label: 'Strong', ink: 'success',     bar: 'green' }
  };

  function levelOf(met) {
    return met === 0 ? 'none' : met < 3 ? 'weak' : met < RULES.length ? 'fair' : 'strong';
  }

  function Strength(p) {
    var v = p.value || '';
    var met = 0;
    var rows = RULES.map(function (r) { var ok = r.test(v); if (ok) met++; return { r: r, ok: ok }; });
    var level = LEVELS[levelOf(met)];
    return h('div', { className: 'flex flex-col gap-2.5', 'aria-live': 'polite', 'data-level': levelOf(met) },
      h('div', { className: 'flex items-center justify-between gap-2' },
        h(D.Typography, { element: 'span', textStyle: 'label12', textColor: 'secondary' }, 'Password strength'),
        h(D.Typography, { element: 'span', textStyle: 'title12', textColor: level.ink }, level.label)),
      h(D.ProgressBar, {
        value: Math.round(met / RULES.length * 100), variant: level.bar, size: 'lg', rounded: 'full',
        'aria-label': 'Password strength'
      }),
      h('ul', { className: 'm-0 flex list-none flex-col gap-1.5 p-0' },
        rows.map(function (x) {
          /* the tick is the original's own text glyph (::before "✓", AuthField.css), not an icon */
          return h('li', { key: x.r.key, className: IK.cx('ik-auth-req-item flex items-center gap-2', x.ok ? 'is-met text-ink-body' : 'text-ink-secondary') },
            h('span', null, x.r.label, h('span', { className: 'sr-only' }, x.ok ? ' — met' : ' — not met')));
        })));
  }

  /* ≤960px: no room beside the centred card — the original's own breakpoint for this hint. */
  var NARROW = '(max-width: 960px)';
  function useNarrow() {
    var mq = R.useMemo(function () { return window.matchMedia(NARROW); }, []);
    var s = R.useState(mq.matches), narrow = s[0], set = s[1];
    R.useEffect(function () {
      function on() { set(mq.matches); }
      mq.addEventListener('change', on);
      return function () { mq.removeEventListener('change', on); };
    }, [mq]);
    return narrow;
  }

  function EmailField(p) {
    return h(D.InputGroup, { size: 'xl', isInvalid: !!p.errorText, errorText: p.errorText },
      h(D.InputGroupAddon, { align: 'inline-start' }, h(IK.Icon, { name: 'mail' })),
      h(D.InputGroupInput, {
        id: p.id, type: 'email', autoComplete: 'email',
        placeholder: p.placeholder || 'Email', 'aria-label': p.placeholder || 'Email',
        defaultValue: p.defaultValue
      }));
  }

  function PasswordField(p) {
    var s = R.useState(p.defaultValue || ''), v = s[0], setV = s[1];
    var f = R.useState(false), focused = f[0], setFocused = f[1];
    var narrow = useNarrow();
    var name = p.placeholder || 'Password';
    var mismatch = p.matches != null && v.length > 0 && v !== p.matches;
    var errorText = mismatch ? 'Passwords do not match' : p.errorText;

    var field = h(D.PasswordInput, {
      id: p.id, value: v, placeholder: name, 'aria-label': name,
      autoComplete: p.autoComplete || 'current-password',
      inputGroupProps: { size: 'xl', isInvalid: !!errorText, errorText: errorText },
      onChange: function (e) { setV(e.target.value); if (p.onValueChange) p.onValueChange(e.target.value); },
      onFocus: function () { setFocused(true); },
      onBlur: function () { setFocused(false); }
    });
    if (!p.strength) return field;

    /* The content is unmounted on blur rather than animated out. The original hides the hint
       instantly too — and it matters here: DevartUI's Popover defers its outside-press check to
       the next document `click`, and a D.Checkbox inside a <form> (Terms, right below this
       field) dispatches its bubbling `click` from an effect — while a closing popover is still
       mounted the two meet inside React's commit and React logs a flushSync error. */
    return h(D.Popover, { open: focused },
      h(D.PopoverAnchor, { asChild: true }, h('div', { className: 'flex flex-col' }, field)),
      focused && h(D.PopoverContent, {
        /* 10px beside the field / 6px above it — the original's left:calc(100% + .625rem) / bottom:calc(100% + .375rem) */
        side: narrow ? 'top' : 'right', align: 'start', sideOffset: narrow ? 6 : 10, avoidCollisions: false,
        'aria-label': 'Password strength',
        className: IK.cx('pointer-events-none', narrow ? 'ik-auth-strength-top' : 'w-60'),
        onOpenAutoFocus: function (e) { e.preventDefault(); },
        onCloseAutoFocus: function (e) { e.preventDefault(); }
      }, h(Strength, { value: v })));
  }

  IK.AuthField = function AuthField(p) {
    return p.kind === 'password' ? h(PasswordField, p) : h(EmailField, p);
  };
  IK.AuthField.Strength = Strength;
  IK.AuthField.RULES = RULES;
})();
