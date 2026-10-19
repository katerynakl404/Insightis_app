/* AskUserPanel — the assistant asking for a decision before it can go on (changes/AskUserPanel.md;
   the original's ".cfc" + its behaviour in pages/kit-kit.js §11). The component is the WHOLE card —
   it carries its own surface — and IK.AskUserLayer floats it over the thread, above the composer.

     top      the question (Title/14) · "Esc to cancel" (gone ≤ 600px) · Dismiss (IconButton xs, tip)
              several questions: the stepper takes the question's place — DevartUI StepProgress:
              a 24px bar per question (tooltip = its short title; filled once answered and while on
              screen; a button to it) + "Question N of M"
     options  DevartUI ChoiceCard, one row recipe for every variant (≤ 6 per question, "Other"
              counted — nothing scrolls):
              single  the row IS a button: pressing it is the answer (chosen = brand border + 5% wash)
              multi   label + description, a DevartUI Checkbox on the right
              Other   boxed like the rest; pressing it opens a field INSIDE its box (TextArea, 2 rows)
     footer   the primary, bottom-right, disabled until the question on screen has an answer:
              Submit — or Next while another question is still open; Back bottom-left from the
              second question on. Enter in the Other field sends (Shift+Enter breaks the line).
   A pick in a stepped card moves on to the next open question; when none is left the card is
   answered → onAnswer([{ question, answer }]) (a multi answer is an array). Esc → onDismiss.

   h(IK.AskUserLayer, null, h(IK.AskUserPanel, {
     question, options: [{ label, badge, description }], multi, other,   // one question
     steps: [{ title, question, options, multi, other }],                 // …or several
     label,                                                               // group name (several)
     onAnswer, onDismiss,
     escape: false                                                        // Esc does nothing (chat_page-queue's
                                                                          // copy never wired it, though the card says it)
   }))
   IK.ASK_VARIANTS — the five the chat pages show: single · steps · multi · six · revenue (queue D1).
   IK.useScrollFade(ref) → { hasMore, hasAbove, clipped } for any scroller (the kit's scroll fade). */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({ 'ask-x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' });

  IK.ASK_VARIANTS = {
    single: { question: 'Which chart type would you prefer for monthly revenue?', other: true, options: [
      { label: 'Line', badge: 'Recommended', description: 'Shows the trend over time — best for spotting direction and patterns across months' },
      { label: 'Bar', description: 'Each month as a separate bar — better for comparing exact values month to month' },
      { label: 'Area', description: 'A line with the area below filled — emphasises magnitude and volume over time' }] },
    steps: { label: 'Report planning questions', steps: [
      { title: 'Time period', question: 'What time period should the report cover?', options: [
        { label: 'Last month', description: 'The most recent complete month' },
        { label: 'Last quarter', description: 'The last three months' },
        { label: 'Year to date', description: 'From January 1 to today' },
        { label: 'Custom period', description: 'Specify your own date range' }] },
      { title: 'Audience', question: 'Who is this report for?', other: true, options: [
        { label: 'Team', description: 'Operational detail for contributors and team leads' },
        { label: 'Management', description: 'Summary and KPIs for directors and executives' },
        { label: 'Clients', description: 'Polished, high-level insight for external stakeholders' }] },
      { title: 'Sections', question: 'Which sections should the report include? Select one or more.', multi: true, options: [
        { label: 'Summary', description: 'The headline numbers in two or three lines' },
        { label: 'KPIs', description: 'Each tracked metric against its target' },
        { label: 'Trends', description: 'How the numbers moved over the period' },
        { label: 'Recommendations', description: 'What to do next, based on the data' }] },
      { title: 'Format', question: 'Which format should the report use?', options: [
        { label: 'Table', description: 'Exact values, easy to scan and compare' },
        { label: 'Chart', description: 'Trends and proportions at a glance' },
        { label: 'Text', description: 'A written summary of the findings' }] }] },
    multi: { question: 'Which Jira data should the analysis include? Select one or more.', multi: true, options: [
      { label: 'Issues', description: 'Status, assignee, priority, dates, descriptions and custom fields' },
      { label: 'Sprints', description: 'Sprint names, start and end dates, state (active / closed)' },
      { label: 'Worklogs', description: 'Hours logged, who logged them, when, and on which issues' },
      { label: 'Comments', description: 'Comment text, author, timestamps and discussion history' }] },
    six: { question: 'Which metric should the second chart show?', other: true, options: [
      { label: 'Revenue', badge: 'Recommended', description: 'Total sales per month' },
      { label: 'Orders', description: 'How many orders were placed' },
      { label: 'Average order value', description: 'Revenue divided by orders' },
      { label: 'New customers', description: 'First-time buyers per month' },
      { label: 'Churn rate', description: 'Share of customers who stopped buying' }] },
    revenue: { question: 'Which revenue field best represents the business performance you want to track?', other: true, options: [
      { label: 'Net revenue', badge: 'Recommended', description: 'Revenue after deductions — profit-generating revenue and financial health.' },
      { label: 'Gross revenue', description: 'Revenue before deductions (costs, returns, discounts) — top-line sales volume and reach.' }] }
  };

  /* The kit's scroll fade, measured: is there more below / above the fold, and is the box clipped at all. */
  IK.useScrollFade = function useScrollFade(ref, deps) {
    var s = R.useState({ hasMore: false, hasAbove: false, clipped: false }), st = s[0], set = s[1];
    R.useLayoutEffect(function () {
      var el = ref.current; if (!el) return;
      function sync() {
        var n = { hasAbove: el.scrollTop > 1, hasMore: el.scrollHeight - el.scrollTop - el.clientHeight > 1, clipped: el.scrollHeight - el.clientHeight > 1 };
        set(function (o) { return o.hasAbove === n.hasAbove && o.hasMore === n.hasMore && o.clipped === n.clipped ? o : n; });
      }
      sync();
      el.addEventListener('scroll', sync, { passive: true });
      var ro = window.ResizeObserver ? new ResizeObserver(sync) : null;
      if (ro) { ro.observe(el); for (var i = 0; i < el.children.length; i++) ro.observe(el.children[i]); }
      return function () { el.removeEventListener('scroll', sync); if (ro) ro.disconnect(); };
    }, deps || []);
    return st;
  };
  IK.scrollFadeClass = function (f) { return IK.cx('ik-fade', f.hasMore && 'has-more', f.hasAbove && 'has-above'); };

  function emptyAnswer() { return { pick: null, other: false, text: '', ticks: {} }; }
  function hasAnswer(a, q) {
    if (!a) return false;
    if (q.multi) return Object.keys(a.ticks).some(function (k) { return a.ticks[k]; });
    if (a.other) return !!a.text.trim();
    return a.pick != null;
  }
  function answerOf(a, q) {
    if (q.multi) return q.options.filter(function (o, i) { return a.ticks[i]; }).map(function (o) { return o.label; });
    if (a.other) return a.text.trim() || null;
    return a.pick != null ? q.options[a.pick].label : null;
  }

  /* One question's option list — every row is DevartUI's ChoiceCard: a single answer is a button
     (pressing it IS the answer), a multi answer a Checkbox row, Other an expandable card. */
  function Options(p) {
    var q = p.q, a = p.a, taRef = R.useRef(null);
    var ref = R.useRef(null), fade = IK.useScrollFade(ref, [q, a.other]);
    R.useEffect(function () { p.onFade(fade); });
    R.useEffect(function () {
      if (a.other && taRef.current) {
        taRef.current.focus({ preventScroll: true });
        var box = taRef.current.closest('[data-slot="choice-card"]'); if (box && box.scrollIntoView) box.scrollIntoView({ block: 'nearest' });
      }
    }, [a.other]);
    var rows = q.options.map(function (o, i) {
      if (q.multi) {
        return h(D.ChoiceCard, {
          key: i, indicator: 'checkbox', name: p.name, selected: !!a.ticks[i], title: o.label, badge: o.badge, description: o.description,
          onSelect: function (v) { var t = Object.assign({}, a.ticks); t[i] = !!v; p.onChange(Object.assign({}, a, { ticks: t })); }
        });
      }
      return h(D.ChoiceCard, {
        key: i, selected: a.pick === i && !a.other, title: o.label, badge: o.badge, description: o.description,
        onSelect: function () { p.onPick(i); }
      });
    });
    if (q.other) {
      rows.push(h(D.ChoiceCard, {
        key: 'other', title: 'Other', selected: !!a.other,
        onSelect: function () { p.onChange(Object.assign({}, a, { other: !a.other, pick: null })); }
      },
          h(D.TextArea, {
            ref: taRef, rows: 2, placeholder: 'Write your answer…', 'aria-label': 'Your answer', value: a.text,
            onChange: function (e) { p.onChange(Object.assign({}, a, { text: e.target.value })); },
            onKeyDown: function (e) {
              if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return;
              if (!a.text.trim()) return;
              e.preventDefault(); p.onSubmit();
            }
          })));
    }
    return h('div', { ref: ref, className: 'ik-ask-opts', role: q.multi ? 'group' : undefined, 'aria-labelledby': q.multi ? p.qid : undefined }, rows);
  }

  IK.AskUserPanel = function AskUserPanel(p) {
    var stepped = !!(p.steps && p.steps.length);
    var qs = stepped ? p.steps : [{ question: p.question, options: p.options || [], multi: p.multi, other: p.other }];
    var ids = R.useRef('ik-ask-' + Math.random().toString(36).slice(2, 8)).current;
    var as = R.useState(function () { return qs.map(emptyAnswer); }), answers = as[0], setAnswers = as[1];
    var ds = R.useState(function () { return qs.map(function () { return false; }); }), done = ds[0], setDone = ds[1];
    var cs = R.useState(0), cur = cs[0], setCur = cs[1];
    var fs = R.useState({}), fade = fs[0], setFade = fs[1];
    var cardRef = R.useRef(null), qRefs = R.useRef([]);
    var cb = R.useRef(p); cb.current = p;

    R.useEffect(function () {
      function esc(e) { if (e.key === 'Escape' && cb.current.escape !== false && cb.current.onDismiss) cb.current.onDismiss(); }
      document.addEventListener('keydown', esc);
      return function () { document.removeEventListener('keydown', esc); };
    }, []);

    function setAnswer(i, a) { setAnswers(function (prev) { var n = prev.slice(); n[i] = a; return n; }); }
    function send(finalAnswers) {
      if (cb.current.onAnswer) cb.current.onAnswer(qs.map(function (q, i) { return { question: q.question, answer: answerOf(finalAnswers[i], q) }; }));
    }
    function go(i) {
      var card = cardRef.current;
      var had = card && card.contains(document.activeElement) && document.activeElement !== document.body;
      var onStepper = had && document.activeElement.closest && document.activeElement.closest('.ik-ask-stepper');
      setCur(i);
      if (had && !onStepper) setTimeout(function () { var q = qRefs.current[i]; if (q) q.focus(); }, 0);
    }
    /* The question on screen is answered: on to the next one still open; none left → answered. */
    function resolve(finalAnswers) {
      if (!stepped) { send(finalAnswers); return; }
      var nd = done.slice(); nd[cur] = true; setDone(nd);
      for (var k = 1; k < qs.length; k++) { var j = (cur + k) % qs.length; if (!nd[j]) { go(j); return; } }
      send(finalAnswers);
    }
    function pick(i) {
      var a = Object.assign({}, emptyAnswer(), { pick: i });
      var next = answers.slice(); next[cur] = a; setAnswers(next);
      resolve(next);
    }
    var q = qs[cur], a = answers[cur];
    var ready = hasAnswer(a, q);
    var primary = stepped && qs.some(function (x, j) { return j !== cur && !done[j]; }) ? 'Next' : 'Submit';
    function submit() { if (hasAnswer(answers[cur], qs[cur])) resolve(answers); }

    var dismiss = h('span', { className: 'ik-ask-top-r' },
      h('span', { className: 'ik-ask-esc' }, 'Esc to cancel'),
      h(IK.Tip, { tip: 'Dismiss' },
        h(D.IconButton, { variant: 'tertiary', size: 'xs', type: 'button', 'aria-label': 'Dismiss', onClick: function () { if (p.onDismiss) p.onDismiss(); } },
          h(IK.Icon, { name: 'ask-x' }))));

    var top = stepped
      ? h('div', { className: 'ik-ask-top' },
          h(D.StepProgress, {
            className: 'ik-ask-stepper', 'aria-label': 'Questions',
            steps: qs.map(function (s, j) { return { id: String(j), label: s.title }; }),
            current: cur,
            isStepDone: function (j) { return done[j]; },
            counter: function (n, t) { return 'Question ' + n + ' of ' + t; },
            onStepSelect: go,
            getStepAriaLabel: function (j, st) {
              return (qs[j].title ? qs[j].title + ', ' : '') + 'question ' + (j + 1) + ' of ' + qs.length + (st.done ? ', answered' : '');
            }
          }),
          dismiss)
      : h('div', { className: 'ik-ask-top' }, h('p', { className: 'ik-ask-q', id: ids + '-q' }, q.question), dismiss);

    var opts = h(Options, {
      key: cur, q: q, a: a, name: ids + '-' + cur, qid: ids + '-q' + (stepped ? cur : ''),
      onPick: pick, onChange: function (na) { setAnswer(cur, na); }, onSubmit: submit,
      onFade: function (f) { if (f.hasMore !== fade.hasMore || f.hasAbove !== fade.hasAbove) setFade(f); }
    });
    var body = stepped
      ? h('div', { className: 'ik-ask-panel', role: 'group', 'aria-labelledby': ids + '-q' + cur },
          h('p', { className: 'ik-ask-q', id: ids + '-q' + cur, tabIndex: -1, ref: function (n) { qRefs.current[cur] = n; } }, q.question),
          opts)
      : opts;

    return h('div', {
      ref: cardRef, className: IK.cx('ik-ask', IK.scrollFadeClass(fade), p.className), role: 'group',
      'aria-labelledby': stepped ? undefined : ids + '-q', 'aria-label': stepped ? (p.label || 'Questions') : undefined
    },
      top,
      body,
      h('div', { className: 'ik-ask-foot' },
        stepped && cur > 0 ? h(D.Button, { variant: 'tertiary', size: 'sm', type: 'button', className: 'me-auto', onClick: function () { go(cur - 1); } }, 'Back') : null,
        h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: !ready, onClick: submit }, primary)));
  };

  /* Floats a card over the chat column: bottom-aligned, on the composer's measure. */
  IK.AskUserLayer = function AskUserLayer(p) {
    return h('div', { className: IK.cx('ik-ask-layer', p.className) }, p.children);
  };
})();
